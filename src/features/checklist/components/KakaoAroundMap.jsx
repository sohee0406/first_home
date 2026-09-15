import { useEffect, useRef, useState } from "react";

import { loadKakaoMap } from "../../../utils/kakaoMapLoader";

/* --------------------------------
   SVG → Data URI
--------------------------------- */

function svgToDataUri(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

/* --------------------------------
   초록색 핀 마커
   집 / 시설 모두 동일하게 사용
--------------------------------- */

function createPinMarkerImage(kakao) {
  const svg = `
    <svg
      width="28"
      height="36"
      viewBox="0 0 28 36"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- 초록색 핀 -->
      <path
        d="
          M14 1
          C7.4 1 2 6.3 2 12.8
          C2 21.8 14 35 14 35
          C14 35 26 21.8 26 12.8
          C26 6.3 20.6 1 14 1
          Z
        "
        fill="#26D383"
      />

      <!-- 작은 흰색 체크 -->
      <path
        d="M9.5 14.8 L12.5 17.8 L18.8 11.8"
        fill="none"
        stroke="#FFFFFF"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `;

  return new kakao.maps.MarkerImage(
    svgToDataUri(svg),
    new kakao.maps.Size(28, 36),
    {
      offset: new kakao.maps.Point(14, 36),
    },
  );
}

/* --------------------------------
   컴포넌트
--------------------------------- */

export default function KakaoAroundMap({
  address,
  facilities = [],
  onCountsChange,
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const houseMarkerRef = useRef(null);
  const facilityMarkersRef = useRef([]);

  const infoWindowRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState("");

  /* --------------------------------
     지도 초기화
--------------------------------- */

  useEffect(() => {
    let cancelled = false;

    async function initMap() {
      try {
        setError("");
        setIsReady(false);

        const kakao = await loadKakaoMap();

        if (cancelled || !mapContainerRef.current) {
          return;
        }

        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
          if (cancelled) return;

          if (status !== kakao.maps.services.Status.OK || !result?.[0]) {
            setError("주소를 지도에서 찾을 수 없습니다.");
            return;
          }

          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          const map = new kakao.maps.Map(mapContainerRef.current, {
            center: coords,
            level: 4,
          });

          mapRef.current = map;

          /* -----------------------------
               시설용 정보창
            ----------------------------- */

          infoWindowRef.current = new kakao.maps.InfoWindow({
            zIndex: 30,
          });

          /* -----------------------------
               우리 집 마커
               클릭 이벤트 없음
            ----------------------------- */

          houseMarkerRef.current = new kakao.maps.Marker({
            position: coords,
            map,
            image: createPinMarkerImage(kakao),
            zIndex: 20,
          });

          setIsReady(true);
        });
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          setError(err?.message || "카카오 지도를 불러오지 못했습니다.");
        }
      }
    }

    if (address) {
      initMap();
    }

    return () => {
      cancelled = true;
    };
  }, [address]);

  /* --------------------------------
     주변 시설 검색
--------------------------------- */

  useEffect(() => {
    if (!isReady || !mapRef.current || !address) {
      return;
    }

    let cancelled = false;

    async function searchFacilities() {
      try {
        const kakao = await loadKakaoMap();

        if (cancelled) return;

        const map = mapRef.current;

        /* -----------------------------
           기존 시설 마커 제거
        ----------------------------- */

        facilityMarkersRef.current.forEach((marker) => {
          marker.setMap(null);
        });

        facilityMarkersRef.current = [];

        /* -----------------------------
           시설이 없으면 종료
        ----------------------------- */

        if (!facilities || facilities.length === 0) {
          onCountsChange?.({});
          return;
        }

        const geocoder = new kakao.maps.services.Geocoder();

        /* -----------------------------
           집 주소 좌표 가져오기
        ----------------------------- */

        geocoder.addressSearch(address, (result, status) => {
          if (status !== kakao.maps.services.Status.OK || !result?.[0]) {
            return;
          }

          if (cancelled) return;

          const center = new kakao.maps.LatLng(result[0].y, result[0].x);

          const countResult = {};

          /* -----------------------------
               시설마다 검색
            ----------------------------- */

          const searchPromises = facilities.map(
            (facility) =>
              new Promise((resolve) => {
                const query = facility.query || facility.name;

                if (!query) {
                  countResult[facility.name] = 0;

                  resolve();
                  return;
                }

                const places = new kakao.maps.services.Places();

                places.keywordSearch(
                  query,
                  (results, searchStatus) => {
                    if (cancelled) {
                      resolve();
                      return;
                    }

                    /* -------------------------
                           검색 실패
                        ------------------------- */

                    if (searchStatus !== kakao.maps.services.Status.OK) {
                      countResult[facility.name] = 0;

                      resolve();
                      return;
                    }

                    /* -------------------------
                           1km 이내 결과만 사용
                        ------------------------- */

                    const filteredResults = results.filter((place) => {
                      const distance = getDistance(
                        center.getLat(),
                        center.getLng(),
                        Number(place.y),
                        Number(place.x),
                      );

                      return distance <= 1000;
                    });

                    countResult[facility.name] = filteredResults.length;

                    /* -------------------------
                           검색 결과 마커 생성

                           모든 시설 = 같은 초록 핀
                        ------------------------- */

                    filteredResults.forEach((place) => {
                      const position = new kakao.maps.LatLng(place.y, place.x);

                      const marker = new kakao.maps.Marker({
                        map,
                        position,

                        // 모든 시설을
                        // 집과 동일한 핀으로 표시
                        image: createPinMarkerImage(kakao),

                        zIndex: 10,
                      });

                      /* -----------------------
                               시설 마커 클릭
                            ----------------------- */

                      kakao.maps.event.addListener(marker, "click", () => {
                        if (!infoWindowRef.current) {
                          return;
                        }

                        const placeName = escapeHtml(
                          place.place_name || facility.name,
                        );

                        const addressName = escapeHtml(
                          place.road_address_name || place.address_name || "",
                        );

                        infoWindowRef.current.setContent(
                          `
                                    <div
                                      style="
                                        padding:10px 12px;
                                        font-size:12px;
                                        line-height:1.5;
                                        min-width:150px;
                                        max-width:220px;
                                      "
                                    >
                                      <div
                                        style="
                                          font-weight:700;
                                          font-size:13px;
                                          margin-bottom:3px;
                                          color:#222;
                                        "
                                      >
                                        ${placeName}
                                      </div>

                                      ${
                                        addressName
                                          ? `
                                            <div
                                              style="
                                                color:#666;
                                                word-break:keep-all;
                                              "
                                            >
                                              ${addressName}
                                            </div>
                                          `
                                          : ""
                                      }
                                    </div>
                                  `,
                        );

                        infoWindowRef.current.open(map, marker);
                      });

                      facilityMarkersRef.current.push(marker);
                    });

                    resolve();
                  },
                  {
                    location: center,
                    radius: 1000,
                    size: 15,
                  },
                );
              }),
          );

          /* -----------------------------
               모든 검색 완료 후 개수 전달
            ----------------------------- */

          Promise.all(searchPromises).then(() => {
            if (!cancelled) {
              onCountsChange?.(countResult);
            }
          });
        });
      } catch (err) {
        console.error("주변 시설 검색 실패:", err);
      }
    }

    searchFacilities();

    return () => {
      cancelled = true;
    };
  }, [
    isReady,
    address,
    facilities
      ?.map(
        (facility) => `${facility.id}-${facility.name}-${facility.query || ""}`,
      )
      .join("|"),
  ]);

  /* --------------------------------
     정리
--------------------------------- */

  useEffect(() => {
    return () => {
      facilityMarkersRef.current.forEach((marker) => {
        marker.setMap(null);
      });

      facilityMarkersRef.current = [];

      if (houseMarkerRef.current) {
        houseMarkerRef.current.setMap(null);
      }

      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
    };
  }, []);

  /* --------------------------------
     화면
--------------------------------- */

  return (
    <div className="relative w-full">
      <div
        ref={mapContainerRef}
        className="w-full h-[320px] rounded-2xl overflow-hidden bg-gray-100"
      />

      {error && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gray-100 px-5 text-center">
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      )}
    </div>
  );
}

/* --------------------------------
   거리 계산
   단위: m
--------------------------------- */

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000;

  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/* --------------------------------
   HTML 안전 처리
--------------------------------- */

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

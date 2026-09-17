import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Check, ExternalLink } from "lucide-react";

const ADDRESS_CHECK_STORAGE_KEY = "firstHomeAddressCheck";

export default function AdminHelperPage() {
  const navigate = useNavigate();

  // 생활 정리 탭 상태
  const [activeTab, setActiveTab] = useState("전기");

  // 주소변경 체크리스트
  // 처음 방문했을 때는 전부 체크되지 않은 상태
  const [addressCheck, setAddressCheck] = useState({
    bank: false,
    telecom: false,
    insurance: false,
    company: false,
    mail: false,
  });

  // 1분 TIP 배너 표시 여부
  const [showTip, setShowTip] = useState(true);

  // 전체보기 토글 상태
  const [showAllTasks, setShowAllTasks] = useState(false);

  // 로컬스토리지에 저장된 체크 상태 불러오기
  useEffect(() => {
    try {
      const savedAddressCheck = localStorage.getItem(ADDRESS_CHECK_STORAGE_KEY);

      if (savedAddressCheck) {
        const parsedAddressCheck = JSON.parse(savedAddressCheck);

        setAddressCheck({
          bank: Boolean(parsedAddressCheck.bank),
          telecom: Boolean(parsedAddressCheck.telecom),
          insurance: Boolean(parsedAddressCheck.insurance),
          company: Boolean(parsedAddressCheck.company),
          mail: Boolean(parsedAddressCheck.mail),
        });
      }
    } catch (error) {
      console.error("주소변경 체크 상태를 불러오지 못했습니다.", error);
    }
  }, []);

  // 체크 상태 변경 + 로컬스토리지 저장
  const toggleAddressCheck = (key) => {
    setAddressCheck((prev) => {
      const updatedAddressCheck = {
        ...prev,
        [key]: !prev[key],
      };

      try {
        localStorage.setItem(
          ADDRESS_CHECK_STORAGE_KEY,
          JSON.stringify(updatedAddressCheck),
        );
      } catch (error) {
        console.error("주소변경 체크 상태를 저장하지 못했습니다.", error);
      }

      return updatedAddressCheck;
    });
  };

  // 생활 정리 탭별 안내 텍스트
  const utilityContents = {
    전기: "한전ON 홈페이지나 모바일 앱을 통해 전기 사용 신청 및 명의 변경을 확인하세요.",
    가스: "도시가스 관할 고객센터에 연락하거나 지역별 도시가스 홈페이지에서 명의 변경을 확인하세요.",
    수도: "거주 지역의 상수도사업소 또는 관할 행정기관에서 수도 사용 및 명의 변경을 확인하세요.",
    관리비:
      "관리사무소에 방문하거나 연락하여 입주자 명의 및 관리비 납부 정보를 변경하세요.",
    인터넷:
      "이용 중인 통신사 고객센터를 통해 이전 설치 또는 명의 변경 및 해지를 신청하세요.",
  };

  // 실제로 연결할 수 있는 공식 홈페이지
  const utilityLinks = {
    전기: "https://online.kepco.co.kr/",
  };

  const openExternalLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-8 pb-12 max-w-md mx-auto flex flex-col justify-between">
      <div className="space-y-6">
        {/* =========================
            1. 상단 타이틀
        ========================= */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-snug">
            입주를 완료했나요?
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            이사했다고 끝이 아니예요!
            <br />
            지금 필요한{" "}
            <span style={{ color: "#25D383" }} className="font-semibold">
              행정절차
            </span>
            를 확인해보세요
          </p>
        </div>

        {/* =========================
            2. 지금 해야 할 일
        ========================= */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900">
              지금 해야 할 일
            </h2>

            <button
              type="button"
              onClick={() => setShowAllTasks(!showAllTasks)}
              className="text-xs text-gray-400 font-medium"
            >
              {showAllTasks ? "접기" : "전체보기"}
            </button>
          </div>

          {/* 기본 2개 */}
          <div className="grid grid-cols-2 gap-3">
            {/* =========================
                전입신고
            ========================= */}
            <div
              onClick={() => navigate("/admin/moveIn")}
              className="bg-white p-4 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center text-xs font-semibold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">
                    <span className="mr-0.5">★</span>
                    중요
                  </span>

                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <h3 className="font-bold text-gray-900 text-base">전입신고</h3>

                <p className="text-xs text-gray-400 mt-0.5">
                  입주 후 14일 이내
                </p>

                <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                  새로운 주소로 주민등록을 이전하는 신고입니다
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/admin/moveIn");
                }}
                className="mt-4 w-full py-2.5 rounded-xl text-xs font-semibold text-gray-800"
                style={{ backgroundColor: "#EAFEF1" }}
              >
                온라인 신청하기
              </button>
            </div>

            {/* =========================
                확정일자
            ========================= */}
            <div
              onClick={() => navigate("/admin/fixedDate")}
              className="bg-white p-4 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center text-xs font-semibold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">
                    <span className="mr-0.5">★</span>
                    중요
                  </span>

                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <h3 className="font-bold text-gray-900 text-base">확정일자</h3>

                <p className="text-xs text-gray-400 mt-0.5">&nbsp;</p>

                <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                  임대차 계약서에 확정일자를 받아두세요
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/admin/fixedDate");
                }}
                className="mt-4 w-full py-2.5 rounded-xl text-xs font-semibold text-gray-800"
                style={{ backgroundColor: "#EAFEF1" }}
              >
                확인방법 알아보기
              </button>
            </div>
          </div>

          {/* =========================
              전체보기 추가 항목
          ========================= */}
          {showAllTasks && (
            <div className="grid grid-cols-2 gap-3 mt-3">
              {/* =========================
                  임대차 신고
              ========================= */}
              <div
                onClick={() => navigate("/admin/rentalReport")}
                className="bg-white p-4 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center text-xs font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                      필수
                    </span>

                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>

                  <h3 className="font-bold text-gray-900 text-base">
                    임대차 신고
                  </h3>

                  <p className="text-xs text-gray-400 mt-0.5">
                    계약 체결 후 30일 이내
                  </p>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                    보증금 또는 월세 변동 시 꼭 신고하세요
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/admin/rentalReport");
                  }}
                  className="mt-4 w-full py-2.5 rounded-xl text-xs font-semibold text-gray-800"
                  style={{ backgroundColor: "#EAFEF1" }}
                >
                  부동산거래관리시스템
                </button>
              </div>

              {/* =========================
                  차량 주차 등록
              ========================= */}
              <div
                onClick={() => navigate("/admin/parking")}
                className="bg-white p-4 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center text-xs font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                      선택
                    </span>

                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>

                  <h3 className="font-bold text-gray-900 text-base">
                    차량 주차 등록
                  </h3>

                  <p className="text-xs text-gray-400 mt-0.5">입주 즉시</p>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                    관리사무소에 방문하여 차량등록을 하세요
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/admin/parking");
                  }}
                  className="mt-4 w-full py-2.5 rounded-xl text-xs font-semibold text-gray-800"
                  style={{ backgroundColor: "#EAFEF1" }}
                >
                  관리사무소 연락처
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =========================
            3. 생활 정리
        ========================= */}
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-1">생활 정리</h2>

          <p className="text-xs text-gray-400 mb-3">
            사용 신청 및 명의 변경등 생활에 필요한 것들을 확인해보세요
          </p>

          <div className="grid grid-cols-5 gap-1.5">
            {["전기", "가스", "수도", "관리비", "인터넷"].map((tab) => {
              const isSelected = activeTab === tab;

              return (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all text-center ${
                    isSelected ? "text-white" : "bg-gray-100 text-gray-600"
                  }`}
                  style={isSelected ? { backgroundColor: "#25D383" } : {}}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* 탭 컨텐츠 */}
          <div className="mt-3 bg-white p-4 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100">
            <h4 className="font-bold text-gray-900 text-sm mb-1">
              {activeTab} 사용자 명의 변경/신청은
            </h4>

            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              {utilityContents[activeTab]}
            </p>

            {utilityLinks[activeTab] ? (
              <button
                type="button"
                onClick={() => openExternalLink(utilityLinks[activeTab])}
                className="px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5"
                style={{
                  backgroundColor: "#EAFEF1",
                  color: "#25D383",
                }}
              >
                홈페이지 바로가기
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 bg-gray-100"
              >
                관할 기관 확인하기
              </button>
            )}
          </div>
        </div>

        {/* =========================
            4. 주소변경
        ========================= */}
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-1">주소변경</h2>

          <p className="text-xs text-gray-400 mb-3">
            이사 후 변경해야 하는 주소를 확인하고 체크해보세요
          </p>

          <div className="bg-white p-4 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 grid grid-cols-2 gap-y-3 gap-x-4">
            {[
              { key: "bank", label: "은행 / 카드" },
              { key: "company", label: "회사 / 학교" },
              { key: "telecom", label: "통신사" },
              { key: "mail", label: "우편물" },
              { key: "insurance", label: "보험" },
            ].map((item) => {
              const checked = addressCheck[item.key];

              return (
                <div
                  key={item.key}
                  onClick={() => toggleAddressCheck(item.key)}
                  className="flex items-center space-x-3 cursor-pointer py-1"
                >
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center border transition-all"
                    style={
                      checked
                        ? {
                            backgroundColor: "#25D383",
                            borderColor: "#25D383",
                          }
                        : {
                            borderColor: "#D1D5DB",
                          }
                    }
                  >
                    {checked && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>

                  <span className="text-sm text-gray-800">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================
            5. 1분 TIP
        ========================= */}
        {showTip && (
          <div
            className="p-4 rounded-2xl relative shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-amber-100"
            style={{ backgroundColor: "#FFFAEB" }}
          >
            <div className="flex items-start space-x-3">
              <span className="text-amber-500 font-bold text-lg">💡</span>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-700 text-sm">
                    1분 TIP
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowTip(false)}
                    className="text-amber-400"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-xs text-amber-600 mt-1 leading-relaxed">
                  주소 변경은 각 기관별로 진행해야 해요
                  <br />
                  이사 후 필요한 기관의 등록 주소를 변경해주세요
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

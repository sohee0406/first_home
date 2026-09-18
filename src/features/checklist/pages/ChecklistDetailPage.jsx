import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { X, AlertCircle, Check, Camera, ImagePlus } from "lucide-react";

import {
  getChecklistItemById,
  getDetailContent,
  getRequiredChecklistKey,
  getChecklistMemoKey,
} from "../data/onSiteChecklistData";

export default function ChecklistDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const houseId = searchParams.get("houseId");

  const requiredStorageKey = getRequiredChecklistKey(houseId);
  const memoStorageKey = getChecklistMemoKey(id, houseId);

  const fileInputRef = useRef(null);

  // id에 해당하는 항목 정보
  const item = getChecklistItemById(id);
  const data =
    getDetailContent(item) || getDetailContent(getChecklistItemById("water"));

  // ==========================================
  // 필수항목 상태 (집마다 따로 저장)
  // ==========================================
  const [isRequired, setIsRequired] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(requiredStorageKey) || "[]",
      );

      return Array.isArray(saved) && saved.includes(id);
    } catch {
      return false;
    }
  });

  // ==========================================
  // 주의사항 박스
  // ==========================================
  const [showWarning, setShowWarning] = useState(true);

  // ==========================================
  // 메모 (집마다, 항목마다 따로 저장)
  // ==========================================
  const [memo, setMemo] = useState(() => {
    return localStorage.getItem(memoStorageKey) || "";
  });
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [memoInput, setMemoInput] = useState("");

  // 대상 집이 바뀌면 해당 집에 저장된 값을 다시 불러옴
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(requiredStorageKey) || "[]",
      );

      setIsRequired(Array.isArray(saved) && saved.includes(id));
    } catch {
      setIsRequired(false);
    }

    setMemo(localStorage.getItem(memoStorageKey) || "");
  }, [requiredStorageKey, memoStorageKey, id]);

  // ==========================================
  // 사진
  // ==========================================
  const [images, setImages] = useState([]);

  // ==========================================
  // 필수항목 추가 / 해제
  // ==========================================
  const handleRequiredToggle = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(requiredStorageKey) || "[]",
      );

      const currentItems = Array.isArray(saved) ? saved : [];

      let nextItems;

      if (isRequired) {
        nextItems = currentItems.filter((itemId) => itemId !== id);
      } else {
        nextItems = currentItems.includes(id)
          ? currentItems
          : [...currentItems, id];
      }

      localStorage.setItem(requiredStorageKey, JSON.stringify(nextItems));

      window.dispatchEvent(new Event("requiredChecklistChanged"));

      setIsRequired(!isRequired);
    } catch (error) {
      console.error("필수항목 저장 실패:", error);
    }
  };

  // ==========================================
  // 메모 수정
  // ==========================================
  const handleEditMemo = () => {
    setMemoInput(memo);
    setIsEditingMemo(true);
  };

  // ==========================================
  // 메모 저장 (localStorage.setItem 적용)
  // ==========================================
  const handleSaveMemo = () => {
    const trimmedMemo = memoInput.trim();
    setMemo(trimmedMemo);
    localStorage.setItem(memoStorageKey, trimmedMemo); // 브라우저 저장소에 기록
    setIsEditingMemo(false);
  };

  // ==========================================
  // 사진 추가
  // ==========================================
  const handleAddImages = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      return;
    }

    const newImages = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);

    e.target.value = "";
  };

  // ==========================================
  // 사진 삭제
  // ==========================================
  const handleRemoveImage = (imageId) => {
    setImages((prev) => {
      const target = prev.find((image) => image.id === imageId);

      if (target) {
        URL.revokeObjectURL(target.url);
      }

      return prev.filter((image) => image.id !== imageId);
    });
  };

  // ==========================================
  // 확인 완료
  // ==========================================
  const handleComplete = () => {
    navigate(-1);
  };

  return (
    <div className="mx-auto max-w-md bg-white px-4 pb-24 pt-4">
      {/* ========================================== */}
      {/* 필수항목 추가 */}
      {/* ========================================== */}
      <section className="mb-6">
        <button
          type="button"
          onClick={handleRequiredToggle}
          className={`flex w-full items-center justify-between rounded-2xl border p-4 transition ${
            isRequired
              ? "border-[#BDEFD2] bg-[#EAFEF1]"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                isRequired
                  ? "bg-[#26D383] text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {isRequired ? (
                <Check className="h-5 w-5" strokeWidth={3} />
              ) : (
                <span className="text-[20px]">+</span>
              )}
            </div>

            <div className="text-left">
              <p
                className={`text-[15px] font-bold ${
                  isRequired ? "text-[#26D383]" : "text-gray-800"
                }`}
              >
                {isRequired ? "필수항목으로 추가됨" : "필수항목 추가하기"}
              </p>

              <p className="mt-1 text-[12px] text-gray-400">
                {isRequired
                  ? "필수확인 목록에서 확인할 수 있어요."
                  : "중요하게 확인할 항목으로 등록하세요."}
              </p>
            </div>
          </div>

          <span
            className={`text-[12px] font-bold ${
              isRequired ? "text-gray-500" : "text-[#26D383]"
            }`}
          >
            {isRequired ? "해제" : "추가"}
          </span>
        </button>
      </section>

      <div className="mt-5 mb-4">
        <h1 className="mt-1 text-[24px] font-bold text-gray-950">
          {item?.title || "확인 항목"}
        </h1>
      </div>

      {/* ========================================== */}
      {/* 메모 */}
      {/* ========================================== */}
      <section className="mb-10">
        <div className="mb-4">
          <h3 className="text-[18px] font-bold text-gray-950">메모</h3>

          <p className="mt-1 text-[12px] text-gray-400">
            현장에서 확인한 내용을 기록해보세요.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 p-4  shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          {isEditingMemo ? (
            <>
              <textarea
                value={memoInput}
                onChange={(e) => setMemoInput(e.target.value)}
                placeholder="확인한 내용을 자유롭게 작성해주세요."
                rows={5}
                autoFocus
                className="w-full resize-none rounded-xl bg-gray-50 p-4 text-[14px] leading-relaxed outline-none ring-1 ring-[#26D383]"
              />

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingMemo(false)}
                  className="flex-1 rounded-xl bg-gray-100 py-3 text-[14px] font-bold text-gray-500"
                >
                  취소
                </button>

                <button
                  type="button"
                  onClick={handleSaveMemo}
                  className="flex-1 rounded-xl bg-[#26D383] py-3 text-[14px] font-bold text-white"
                >
                  저장
                </button>
              </div>
            </>
          ) : (
            <>
              {memo ? (
                <div className="mb-3 rounded-xl bg-gray-50 p-4 text-[14px] leading-relaxed">
                  {memo}
                </div>
              ) : (
                <div className="mb-3 flex min-h-[110px] items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50">
                  <p className="text-[14px] text-gray-400">
                    작성한 메모가 없어요.
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleEditMemo}
                className="w-full rounded-xl bg-gray-100 py-3 text-[14px] font-bold text-gray-700"
              >
                {memo ? "메모 수정" : "메모 작성"}
              </button>
            </>
          )}
        </div>
      </section>

      {/* ========================================== */}
      {/* 왜 확인해야 하나요? */}
      {/* ========================================== */}
      <section className="mb-10">
        <h3 className="mb-4 text-[18px] font-bold text-gray-950">
          왜 확인해야 하나요?
        </h3>

        <p className="text-[14px] leading-7 text-gray-600">{data.whyText}</p>
      </section>

      {/* ========================================== */}
      {/* 어떻게 확인하나요? */}
      {/* ========================================== */}
      <section className="mb-10">
        <h3 className="mb-4 text-[18px] font-bold text-gray-950">
          어떻게 확인하나요?
        </h3>

        <ol className="list-inside list-decimal space-y-3 text-[14px] leading-7 text-gray-700">
          {data.howSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        {/* ========================================== */}
        {/* 주의사항 */}
        {/* ========================================== */}
        {showWarning && (
          <div className="relative mt-5 rounded-xl border border-red-100 bg-red-50 p-4 text-red-600">
            <button
              type="button"
              onClick={() => setShowWarning(false)}
              className="absolute right-3 top-3"
              aria-label="닫기"
            >
              <X className="h-4 w-4 text-red-400" />
            </button>

            <div className="flex gap-2 pr-5">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

              <div>
                <p className="text-[14px] font-bold">이런 경우 주의하세요!</p>

                <p className="mt-1 text-[13px] leading-6">{data.warningText}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================== */}
      {/* 사진 */}
      {/* ========================================== */}
      <section className="mb-10">
        <div className="mb-4">
          <h3 className="text-[18px] font-bold text-gray-950">사진</h3>

          <p className="mt-1 text-[12px] text-gray-400">
            현장에서 확인한 내용을 사진으로 남겨보세요.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleAddImages}
          className="hidden"
        />

        {images.length === 0 ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex min-h-[200px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50"
          >
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#EAFEF1] text-[#26D383]">
              <Camera className="h-7 w-7" />
            </div>

            <p className="text-[14px] font-bold text-gray-700">
              사진을 추가해주세요
            </p>

            <p className="mt-1 text-[12px] text-gray-400">
              집 상태를 사진으로 기록해두면
              <br />
              나중에 확인하기 편해요.
            </p>

            <div className="mt-4 rounded-xl bg-[#26D383] px-4 py-2 text-[13px] font-bold text-white">
              사진 추가하기
            </div>
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100"
              >
                <img
                  src={image.url}
                  alt="첨부 사진"
                  className="h-full w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveImage(image.id)}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-gray-400"
            >
              <ImagePlus className="mb-2 h-6 w-6" />

              <span className="text-[12px]">사진 추가</span>
            </button>
          </div>
        )}
      </section>

      {/* ========================================== */}
      {/* 확인 */}
      {/* ========================================== */}
      <button
        type="button"
        onClick={handleComplete}
        className="w-full rounded-2xl bg-[#26D383] py-4 text-[16px] font-bold text-white"
      >
        확인
      </button>
    </div>
  );
}

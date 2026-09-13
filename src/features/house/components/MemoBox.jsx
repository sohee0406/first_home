import { useState } from "react";

export default function MemoBox({ memo = "", onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempMemo, setTempMemo] = useState(memo);

  const hasMemo = memo.trim().length > 0;

  // 메모 작성/수정 시작
  const handleEdit = () => {
    setTempMemo(memo);
    setIsEditing(true);
  };

  // 메모 저장
  const handleSave = () => {
    onSave(tempMemo.trim());
    setIsEditing(false);
  };

  // 취소
  const handleCancel = () => {
    setTempMemo(memo);
    setIsEditing(false);
  };

  return (
    <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4">

      {/* =========================
          헤더
      ========================= */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[15px] font-bold text-gray-900">
          메모
        </span>

        {!isEditing && hasMemo && (
          <button
            onClick={handleEdit}
            className="text-[13px] font-medium text-gray-500"
          >
            수정
          </button>
        )}
      </div>

      {/* =========================
          입력 모드
      ========================= */}
      {isEditing ? (
        <div>

          <textarea
            value={tempMemo}
            onChange={(e) => setTempMemo(e.target.value)}
            placeholder="이 집에 대한 메모를 남겨보세요."
            maxLength={300}
            autoFocus
            className="
              w-full
              min-h-[130px]
              resize-none
              rounded-xl
              bg-gray-50
              border
              border-gray-200
              px-4
              py-3
              text-[15px]
              leading-[1.55]
              text-gray-800
              placeholder:text-gray-400
              outline-none
              focus:border-gray-400
            "
          />

          <div className="flex justify-between items-center mt-2">
            <span className="text-[11px] text-gray-400">
              {tempMemo.length}/300
            </span>

            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="
                  h-[38px]
                  px-4
                  rounded-lg
                  bg-gray-100
                  text-[13px]
                  font-medium
                  text-gray-600
                "
              >
                취소
              </button>

              <button
                onClick={handleSave}
                className="
                  h-[38px]
                  px-4
                  rounded-lg
                  bg-[#26D383]
                  text-[13px]
                  font-semibold
                  text-white
                  active:scale-[0.97]
                  transition-transform
                "
              >
                저장
              </button>
            </div>
          </div>

        </div>
      ) : (

        /* =========================
           메모 보기 모드
        ========================= */
        hasMemo ? (
          <button
            onClick={handleEdit}
            className="
              w-full
              text-left
              rounded-xl
              bg-gray-50
              px-4
              py-3.5
              active:scale-[0.99]
              transition-transform
            "
          >
            <p
              className="
                text-[15px]
                leading-[1.55]
                text-gray-800
                whitespace-pre-line
                break-words
              "
            >
              {memo}
            </p>
          </button>
        ) : (

          /* =========================
             메모 없음
          ========================= */
          <button
            onClick={handleEdit}
            className="
              w-full
              flex
              items-center
              justify-between
              rounded-xl
              bg-gray-50
              px-4
              py-4
              text-left
              active:scale-[0.99]
              transition-transform
            "
          >
            <div>
              <p className="text-[14px] font-medium text-gray-600">
                이 집에 메모를 남겨보세요
              </p>

              <p className="mt-1 text-[12px] text-gray-400">
                마음에 들었던 점이나 아쉬운 점을 기록할 수 있어요
              </p>
            </div>

            <span className="text-[21px] font-light text-gray-400">
              +
            </span>
          </button>
        )
      )}
    </div>
  );
}
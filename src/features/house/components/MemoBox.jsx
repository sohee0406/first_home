import { useEffect, useState } from "react";
import { Pencil, Check, X } from "lucide-react";

export default function MemoBox({ memo = "", onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(memo || "");

  useEffect(() => {
    setValue(memo || "");
  }, [memo]);

  const handleEdit = () => {
    setValue(memo || "");
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmedValue = value.trim();

    if (onSave) {
      onSave(trimmedValue);
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(memo || "");
    setIsEditing(false);
  };

  return (
    <div className="border border-gray-100 rounded-xl p-4  shadow-[0_1px_5px_rgba(0,0,0,0.04)]">
      {/* 메모 헤더 */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-[15px] text-gray-900">메모</span>

        {!isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="flex items-center gap-1 text-[13px] text-gray-500"
          >
            <Pencil size={14} strokeWidth={1.7} />
            수정
          </button>
        )}
      </div>

      {/* 수정 중 */}
      {isEditing ? (
        <div className="mt-3">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="이 집에 대한 메모를 작성해주세요."
            maxLength={300}
            autoFocus
            className="
              w-full
              min-h-[110px]
              resize-none
              rounded-xl
              bg-gray-50
              border
              border-gray-200
              p-3
              text-[14px]
              text-gray-800
              leading-relaxed
              outline-none
              focus:border-[#26D383]
            "
          />

          <div className="flex items-center justify-between mt-2">
            <span className="text-[11px] text-gray-400">
              {value.length}/300
            </span>

            <div className="flex gap-2">
              {/* 취소 */}
              <button
                type="button"
                onClick={handleCancel}
                className="
                  flex
                  items-center
                  gap-1
                  px-3
                  py-2
                  rounded-lg
                  bg-gray-100
                  text-[12px]
                  text-gray-600
                "
              >
                <X size={13} />
                취소
              </button>

              {/* 저장 */}
              <button
                type="button"
                onClick={handleSave}
                className="
                  flex
                  items-center
                  gap-1
                  px-3
                  py-2
                  rounded-lg
                  bg-[#26D383]
                  text-[12px]
                  text-white
                  font-semibold
                "
              >
                <Check size={13} />
                저장
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* 메모 보기 */
        <div className="mt-3">
          {memo ? (
            <button
              type="button"
              onClick={handleEdit}
              className="w-full text-left"
            >
              <p className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                {memo}
              </p>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEdit}
              className="w-full text-left"
            >
              <p className="text-[13px] text-gray-400">작성한 메모가 없어요</p>

              <p className="text-[12px] text-gray-300 mt-1">
                이 집에 대한 메모를 남겨보세요.
              </p>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

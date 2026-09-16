import { useEffect, useRef, useState } from "react";

const PROFILE_STORAGE_KEY = "first_home_profile";

export default function ProfileCard({ name }) {
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [profileName, setProfileName] = useState(name || "");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

    if (!savedProfile) {
      return;
    }

    try {
      const parsedProfile = JSON.parse(savedProfile);

      if (parsedProfile.name) {
        setProfileName(parsedProfile.name);
      }

      if (parsedProfile.image) {
        setProfileImage(parsedProfile.image);
      }
    } catch (error) {
      console.error("프로필 정보를 불러오지 못했습니다.", error);
    }
  }, []);

  // 사진 선택
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);

    // 같은 파일을 다시 선택할 수 있도록 초기화
    e.target.value = "";
  };

  // 사진 삭제
  const handleImageDelete = () => {
    setProfileImage("");
  };

  // 저장
  const handleSave = () => {
    const trimmedName = profileName.trim();

    if (!trimmedName) {
      return;
    }

    const profileData = {
      name: trimmedName,
      image: profileImage,
    };

    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));

    setProfileName(trimmedName);
    setIsEditing(false);
  };

  // 취소
  const handleCancel = () => {
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);

        setProfileName(parsedProfile.name || name || "");

        setProfileImage(parsedProfile.image || "");
      } catch (error) {
        setProfileName(name || "");
        setProfileImage("");
      }
    } else {
      setProfileName(name || "");
      setProfileImage("");
    }

    setIsEditing(false);
  };

  return (
    <div className="mb-6">
      {!isEditing ? (
        // 일반 상태
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 shrink-0 overflow-hidden flex items-center justify-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt="프로필"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-emerald-50" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-lg">
              {profileName || name}님
            </p>

            <p className="text-sm text-gray-500 mt-0.5">
              당신의 자취 생활을 응원해요
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="
              shrink-0
              px-3
              py-1.5
              rounded-lg
              bg-gray-100
              text-gray-600
              text-xs
              font-semibold
            "
          >
            수정
          </button>
        </div>
      ) : (
        // 수정 상태
        <div className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-gray-900">프로필 수정</p>

            <button
              type="button"
              onClick={handleCancel}
              className="text-xs text-gray-400"
            >
              취소
            </button>
          </div>

          {/* 프로필 사진 */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="
                  relative
                  w-20
                  h-20
                  rounded-2xl
                  bg-emerald-50
                  overflow-hidden
                  flex
                  items-center
                  justify-center
                "
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="프로필"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-50" />
                )}

                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    사진 변경
                  </span>
                </div>
              </button>

              {/* 사진 삭제 버튼 */}
              {profileImage && (
                <button
                  type="button"
                  onClick={handleImageDelete}
                  className="
                    absolute
                    -top-2
                    -right-2
                    w-6
                    h-6
                    rounded-full
                    bg-gray-800
                    text-white
                    text-xs
                    flex
                    items-center
                    justify-center
                    shadow-sm
                  "
                  aria-label="프로필 사진 삭제"
                >
                  ×
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {/* 사진 삭제 텍스트 버튼 */}
            {profileImage && (
              <button
                type="button"
                onClick={handleImageDelete}
                className="
                  mt-2
                  text-xs
                  text-red-500
                  font-medium
                "
              >
                사진 삭제
              </button>
            )}
          </div>

          {/* 이름 */}
          <div className="mt-5">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              이름
            </label>

            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              maxLength={10}
              placeholder="이름을 입력해주세요"
              className="
                w-full
                h-11
                px-3
                rounded-xl
                border
                border-gray-200
                text-sm
                text-gray-900
                outline-none
                focus:border-emerald-500
              "
            />
          </div>

          {/* 저장 */}
          <button
            type="button"
            onClick={handleSave}
            disabled={!profileName.trim()}
            className="
              w-full
              h-11
              mt-4
              rounded-xl
              bg-emerald-500
              text-white
              text-sm
              font-semibold
              disabled:bg-gray-200
              disabled:text-gray-400
            "
          >
            저장
          </button>
        </div>
      )}
    </div>
  );
}

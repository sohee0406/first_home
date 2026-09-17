import { useNavigate } from "react-router-dom";
import {
  Home,
  Heart,
  FileText,
  CheckSquare,
  FileCheck,
  Truck,
  User,
  Bell,
  PhoneCall,
  ChevronRight,
  ClipboardList,
} from "lucide-react";
import ProfileCard from "../components/ProfileCard";
import { useHouse } from "../../house/context/HouseContext";

export default function MyPage() {
  const navigate = useNavigate();

  const { houses } = useHouse();

  // 등록한 집 개수
  const registeredHouseCount = houses.length;

  // 찜한 집 개수
  const likedHouseCount = houses.filter(
    (house) => house.isWished === true,
  ).length;

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* 프로필 */}
      <ProfileCard name="김한국" />

      {/* 상단 통계 카드 */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* 등록한 집 */}
        <button
          type="button"
          onClick={() => navigate("/houses?tab=registered")}
          className="
            bg-emerald-50/60
            p-4
            rounded-2xl
            flex
            items-center
            justify-between
            cursor-pointer
            text-left
            w-full
          "
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
              <Home className="w-5 h-5" />
            </div>

            <div>
              <p className="text-xs text-gray-500 font-medium">등록한 집</p>

              <p className="text-base font-bold text-gray-900 mt-0.5">
                {registeredHouseCount}개
              </p>
            </div>
          </div>

          <ChevronRight className="w-4 h-4 text-emerald-500" />
        </button>

        {/* 찜한 집 */}
        <button
          type="button"
          onClick={() => navigate("/houses?tab=liked")}
          className="
            bg-emerald-50/60
            p-4
            rounded-2xl
            flex
            items-center
            justify-between
            cursor-pointer
            text-left
            w-full
          "
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>

            <div>
              <p className="text-xs text-gray-500 font-medium">찜한 집</p>

              <p className="text-base font-bold text-gray-900 mt-0.5">
                {likedHouseCount}개
              </p>
            </div>
          </div>

          <ChevronRight className="w-4 h-4 text-emerald-500" />
        </button>
      </div>

      {/* 첫 자취 안내 카드 */}
      <div
        onClick={() => navigate("/checklist")}
        className="
          border
          border-gray-100
          rounded-2xl
          p-4
          mb-6
          shadow-sm
          cursor-pointer
        "
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bold text-gray-900 text-sm">
              첫 자취, 뭘 확인해야 할까요?
            </p>

            <p className="text-xs text-gray-500 mt-1">
              집을 구하기 전, 미리 확인해보세요
            </p>
          </div>

          <ClipboardList className="w-6 h-6 text-emerald-500" />
        </div>

        <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3 mt-3">
          <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <CheckSquare className="w-4 h-4 text-emerald-500" />
            체크리스트 둘러보기
          </span>

          <ChevronRight className="w-4 h-4 text-emerald-500" />
        </div>
      </div>

      {/* 내 집 기록 */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-gray-900 mb-3">내 집 기록</h2>

        <div className="space-y-2.5">
          <div
            onClick={() => navigate("/records/progress")}
            className="
              flex
              items-center
              justify-between
              p-4
              rounded-2xl
              border
              border-gray-100
              bg-white
              shadow-sm
              cursor-pointer
            "
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-700" />
              <span className="font-semibold text-gray-900 text-sm">
                현재 진행중
              </span>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div
            onClick={() => navigate("/records/inspection")}
            className="
              flex
              items-center
              justify-between
              p-4
              rounded-2xl
              border
              border-gray-100
              bg-white
              shadow-sm
              cursor-pointer
            "
          >
            <div className="flex items-center gap-3">
              <CheckSquare className="w-5 h-5 text-gray-700" />
              <span className="font-semibold text-gray-900 text-sm">
                점검 완료
              </span>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div
            onClick={() => navigate("/records/contract")}
            className="
              flex
              items-center
              justify-between
              p-4
              rounded-2xl
              border
              border-gray-100
              bg-white
              shadow-sm
              cursor-pointer
            "
          >
            <div className="flex items-center gap-3">
              <FileCheck className="w-5 h-5 text-gray-700" />
              <span className="font-semibold text-gray-900 text-sm">
                계약 완료
              </span>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div
            onClick={() => navigate("/records/moving")}
            className="
              flex
              items-center
              justify-between
              p-4
              rounded-2xl
              border
              border-gray-100
              bg-white
              shadow-sm
              cursor-pointer
            "
          >
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-gray-700" />
              <span className="font-semibold text-gray-900 text-sm">
                입주 완료
              </span>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* 내 정보 */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-3">내 정보</h2>

        <div className="space-y-2.5">
          <div
            className="
              flex
              items-center
              justify-between
              p-4
              rounded-2xl
              border
              border-gray-100
              bg-white
              shadow-sm
              cursor-pointer
            "
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-700" />

              <span className="font-semibold text-gray-900 text-sm">
                개인정보 수정
              </span>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div
            onClick={() => navigate("/settings/notification")}
            className="
              flex
              items-center
              justify-between
              p-4
              rounded-2xl
              border
              border-gray-100
              bg-white
              shadow-sm
              cursor-pointer
            "
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-700" />

              <span className="font-semibold text-gray-900 text-sm">
                알림 설정
              </span>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div
            onClick={() => navigate("/support")}
            className="
              flex
              items-center
              justify-between
              p-4
              rounded-2xl
              border
              border-gray-100
              bg-white
              shadow-sm
              cursor-pointer
            "
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-gray-700" />

              <span className="font-semibold text-gray-900 text-sm">
                고객센터
              </span>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

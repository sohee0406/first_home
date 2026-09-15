import TopHeader from "../../components/layout/TopHeader";
import GreetingBanner from "./components/GreetingBanner";
import OngoingHouseCard from "./components/OngoingHouseCard";
import FirstMoveGuideCard from "./components/FirstMoveGuideCard";
import RecommendedChecklist from "./components/RecommendedChecklist";
import TodayTipCard from "./components/TodayTipCard";
import RecentHouseSection from "./components/RecentHouseSection";

// 임시 더미 데이터 (추후 API/Context 연동으로 교체)
const DUMMY_HOUSES = [
  { id: 1, name: "ㅁㅁ동 ㅇㅇ빌라", deposit: "1,000", rent: 40 },
  { id: 2, name: "ㅁㅁ동 ㅇㅇ빌라", deposit: "1,000", rent: 40 },
];

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      <TopHeader />
      <div className="flex flex-col gap-10 pb-4">
        <GreetingBanner />
        <OngoingHouseCard />
        <FirstMoveGuideCard />
        <RecommendedChecklist />
        <TodayTipCard />
        <RecentHouseSection title="최근 등록된 집" />

        <RecentHouseSection title="찜한 집" isWished />
      </div>
    </div>
  );
}

import TopHeader from "../../components/layout/TopHeader";
import GreetingBanner from "./components/GreetingBanner";
import OngoingHouseCard from "./components/OngoingHouseCard";
import FirstMoveGuideCard from "./components/FirstMoveGuideCard";
import RecommendedChecklist from "./components/RecommendedChecklist";
import TodayTipCard from "./components/TodayTipCard";
import RecentHouseSection from "./components/RecentHouseSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto min-h-screen  bg-white">
        <TopHeader />

        <div className="flex flex-col gap-10  pb-8">
          <GreetingBanner />
          <OngoingHouseCard />
          <FirstMoveGuideCard />
          <RecommendedChecklist />
          <TodayTipCard />

          <RecentHouseSection title="최근 등록된 집" />

          <RecentHouseSection title="찜한 집" isWished />
        </div>
      </div>
    </div>
  );
}

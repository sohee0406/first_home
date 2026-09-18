import TopHeader from "../../components/layout/TopHeader";
import GreetingBanner from "./components/GreetingBanner";
import OngoingHouseCard from "./components/OngoingHouseCard";
import FirstMoveGuideCard from "./components/FirstMoveGuideCard";
import RecommendedChecklist from "./components/RecommendedChecklist";
import TodayTipCard from "./components/TodayTipCard";
import RecentHouseSection from "./components/RecentHouseSection";

export default function HomePage() {
  return (
    <div className="  max-w-[393px] mx-auto">
      <div className="  bg-white">
        <TopHeader />
        <GreetingBanner />

        <div className="flex flex-col mt-6 gap-16">
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

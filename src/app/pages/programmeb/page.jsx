import ProgramCardSection from "../../component/layout/program-card";
import HonorsCardSection from "../../component/layout/honors";
import CampingOutdoors from "../../component/layout/programcamp";
import CommunityService from "../../component/layout/community";
import Cta from "../../component/layout/cta";
import Investure from "../../component/layout/investure";
import Carousel from "../../component/layout/carousel";
export default function ProgrammeB() {
  return (
    <div>
      <Carousel />
      <ProgramCardSection />
      <HonorsCardSection />
      <CampingOutdoors />
      <CommunityService />
      <Cta />

      <Investure />
    </div>
  );
}

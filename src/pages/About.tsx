import AboutIntro from "@/components/about/AboutIntro";
import AtAGlance from "@/components/about/AtAGlance";
import CompanyJourney from "@/components/about/CompanyJourney";
import LocationPanel from "@/components/about/LocationPanel";
import MissionVision from "@/components/about/MissionVision";
import OperatingPrinciples from "@/components/about/OperatingPrinciples";

export default function About() {
  return (
    <div className="bg-white">
      <AboutIntro />
      <CompanyJourney />
      <LocationPanel />
      <OperatingPrinciples />
      <AtAGlance />
      <MissionVision />
    </div>
  );
}

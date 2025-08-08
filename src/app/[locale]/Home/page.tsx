import AnimatedBar from "./components/AnimatedBar/page";
import { CentralizePresence } from "./components/CentralizePresence";
import { TryNow } from "./components/TryNow";
import { WhyUs } from "./components/WhyUs";
import { PublicContainer } from "@/components/PublicContainer";
import FeedbackPopup from "@/app/[locale]/(protected)/dashboard/admin/components/FeedbackPopup";

export default function Home() {
  return (
    <PublicContainer>
      <CentralizePresence />
      <AnimatedBar />
      <WhyUs />
      {/* deploy with group blocks feature */}
      {/* <GroubBlock /> */}
      <TryNow />
      <FeedbackPopup />
    </PublicContainer>
  );
}

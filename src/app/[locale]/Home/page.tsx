import AnimatedBar from "./components/AnimatedBar/page";
import { CentralizePresence } from "./components/CentralizePresence";
import { TryNow } from "./components/TryNow";
import { WhyUs } from "./components/WhyUs";

export default function Home() {
  return (
    <div>
      <CentralizePresence />
      <AnimatedBar />
      <WhyUs />
      {/* deploy with group blocks feature */}
      {/* <GroubBlock /> */}
      <TryNow />
    </div>
  );
}

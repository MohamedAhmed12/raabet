import AnimatedBar from "./components/AnimatedBar/page";
import { CentralizePresence } from "./components/CentralizePresence/page";
import { GroubBlock } from "./components/GroubBlock/page";
import { TryNow } from "./components/TryNow/page";
import { WhyUs } from "./components/WhyUs/page";

export default function Home() {
  
  return (
    <>
      <CentralizePresence />
      <AnimatedBar />
      <WhyUs />
      <GroubBlock />
      <TryNow />
    </>
  );
}

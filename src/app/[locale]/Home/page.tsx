import AnimatedBar from "./components/AnimatedBar/page";
import { CentralizePresence } from "./components/CentralizePresence";
import { TryNow } from "./components/TryNow";
import { WhyUs } from "./components/WhyUs";
import { PublicContainer } from "@/components/PublicContainer";

export default function Home() {
  const test = () => {
    throw new Error("Test Sentry 22Break");
  };
  return (
    <PublicContainer>
      <button onClick={() => test()}>
        aaa
      </button>
      <CentralizePresence />
      <AnimatedBar />
      <WhyUs />
      {/* deploy with group blocks feature */}
      {/* <GroubBlock /> */}
      <TryNow />
    </PublicContainer>
  );
}

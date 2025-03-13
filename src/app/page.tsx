import AnimatedBar from "@/components/AnimatedBar/page";
import { CentralizePresence } from "@/components/Home/CentralizePresence/page";
import { TryNow } from "@/components/Home/TryNow/page";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <CentralizePresence />
      <AnimatedBar />
      <TryNow />
    </>
  );
}

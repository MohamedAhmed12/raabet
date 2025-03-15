import FeatureShowcase from "@/components/FeatureShowcase/page";
import { CentralizePresence } from "./components/CentralizePresence/page";
import { TryNow } from "./components/TryNow/page";

export default function Home() {
  return (
    <>
      <CentralizePresence />
      <FeatureShowcase/>
      <TryNow />
    </>
  );
}

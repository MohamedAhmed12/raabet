import { Suspense, lazy } from "react";
import { PublicContainer } from "@/components/PublicContainer";

// Lazy load heavy components
const AnimatedBar = lazy(() => import("./components/AnimatedBar/page"));
const CentralizePresence = lazy(
  () => import("./components/CentralizePresence")
);
const TryNow = lazy(() => import("./components/TryNow"));
const WhyUs = lazy(() => import("./components/WhyUs"));

export default function Home() {
  return (
    <PublicContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <CentralizePresence />
      </Suspense>
      <Suspense fallback={<div>Loading animation...</div>}>
        <AnimatedBar />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <WhyUs />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <TryNow />
      </Suspense>
    </PublicContainer>
  );
}

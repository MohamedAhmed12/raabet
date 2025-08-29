import { Suspense, lazy } from "react";
import { PublicContainer } from "@/components/PublicContainer";
import Loading from "@/app/loading";

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
      <Suspense fallback={<Loading />}>
        <CentralizePresence />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <AnimatedBar />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <WhyUs />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <TryNow />
      </Suspense>
    </PublicContainer>
  );
}

import { GroubBlock } from "./GroubBlock/page";
import { WhyUs } from "./WhyUs/page";

const FeatureShowcase = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <WhyUs/>
      <GroubBlock/>
    </div>
  );
};

export default FeatureShowcase;

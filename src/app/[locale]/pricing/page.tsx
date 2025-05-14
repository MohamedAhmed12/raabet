import { FeaturesCard } from "./FeaturesCard";
import { PlansCard } from "./PlansCard";

export default async function Pricing() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center mt-16">
        <h1 className="text-7xl font-extrabold text-deep-blue-gray text-center mb-8 capitalize">
          <span className="relative">
            <span className="relative inline-block z-[1]">plans</span>
            <div className="absolute inset-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] bg-light-orange"></div>
          </span>
          {" & pricing"}
        </h1>
        <span className="text-lg text-center max-w-[625px] mb-8">
          Subscribe to Premium to give your link in bio superpowers, or choose
          to go Pro and supercharge your entire team.
        </span>
      </div>
      <div className="flex justify-center mt-[50px] px-[7vw] pb-16">
        <FeaturesCard />
        <PlansCard />
      </div>
    </div>
  );
}

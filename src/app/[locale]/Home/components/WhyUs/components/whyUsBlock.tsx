import {FeatureCard} from "./FeatureCard";

export const WhyUsBlock = () => {
  return (
    <div className="flex flex-col w-1/2">
      <div className="flex w-full">
        <FeatureCard
          src="/images/gears.png"
          alt="Customization"
          Title="More customizable"
          label="More options to design your page, and have it match your brand"
          className="bg-blue-200"
        />
        <FeatureCard
          src="/images/grids-types.png"
          alt="Powerfull"
          Title="More powerful"
          label="Greater variety of block layouts and more options for organization"
          className="bg-yellow-200"
        />
      </div>

      <div className="flex w-full">
        <FeatureCard
          src="/images/payment-ticket.png"
          alt="affordable"
          Title="More affordable"
          label="More affordable than most competing platforms"
          className="bg-orange-200"
        />
        <FeatureCard
          src="/images/u_ur-team.png"
          alt="multi-Profile"
          Title="Great for teams"
          label="Easily manage multiple profiles with the plan"
          className="bg-red-200"
        />
      </div>
    </div>
  );
};

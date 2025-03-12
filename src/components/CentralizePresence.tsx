import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";

export default function CentralizePresence() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      {/* Left Side - Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center font-noto items-center text-center md:text-left px-[7vw] min-h-[calc(100vh-70px-72px)]">
        {/* Star Rating */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="text-yellow-400" />
          ))}
        </div>
        <p className="text-lg font-semibold text-gray-700 mb-6">
          Loved by <span className="text-blue-600">10,000+</span> users
        </p>
        <h1 className="text-7xl">
          Centralize your online
          <span>
            
          </span>
          <span className="relative">
            <span className="relative inline-block z-[1]">
              presence
            </span>
            <div className="absolute inset-0 absolute top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] bg-[#7ed0ff]"></div>
          </span>
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Gather your socials, music, videos, and more on a beautiful
          link-in-bio page. Claim your name today!
        </p>

        {/* Input Field and Claim Button */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="flex bg-white text-gray-700 p-2 rounded-lg border border-gray-300">
            <span className="px-3 font-semibold">liinks.co/</span>
            <Input type="text" placeholder="yourname" className="w-40" />
          </div>
          <Button className="bg-blue-600 text-white hover:bg-blue-500">
            Claim
          </Button>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative flex flex-row-reverse w-full md:w-1/2 min-h-[calc(100vh-70px-72px)]">
        {/* Image */}
        <img
          src="https://d1ym67wyom4bkd.cloudfront.net/assets/bundles/db9264c8bc4385992e0f73e2eb736dbc6cb1dfaf/graphics/hero-graphic.png"
          alt="Hero Image"
          className="w-full h-auto md:h-[85%] md:max-h-[40vw] md:w-[675] py-8 px-[7vw] md:p-0 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2"
        />

        {/* Sibling div */}
        <div className="w-full md:w-1/2 border-l border-[#1d1d28] bg-[#7ed0ff]" />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
// import { Button } from "./ui/button";
import { Prosbar } from "@/components/Prosbar";
import { Button } from "@/components/ui/button";
import { ReviewsSlider } from "./ReviewsSlider";

export default function AnimatedBar() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/data/reviews.json")
      .then((res) => res.json())
      .then((data) => {
        // Shuffle the array and take 6 random reviews
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 6);
        setReviews(shuffled);
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  return (
    <>
      <Prosbar bgColorClass="bg-light-orange" />

      {/* Reviews Section */}
      <div className="relative flex flex-col justify-center items-center h-screen w-full overflow-hidden py-10 bg-[#D7A9FF] space-3">
        {/* Heading */}
        <div className="text-[65px] text-deep-blue-gray font-bold leading-[1.1] mb-10 ">
          <h2 >What are people</h2>
          <span className="relative inline-block pr-4">
            <span className="relative z-[2]">saying</span>
            <div className="absolute top-11 bottom-2 left-0 right-0 bg-white z-[1]" />
          </span>
          <span>about us?</span>
        </div>
        <ReviewsSlider reviews={reviews} speed={15} />
        <div className="h-4"></div> {/* Spacer */}
        <ReviewsSlider reviews={reviews} speed={25} />
        <Button className="text-white px-7 py-6 rounded-4xl font-bold mt-8 bg-deep-blue-gray hover:bg-deep-blue-gray">
          Get Started
        </Button>
      </div>
    </>
  );
}

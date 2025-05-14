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
        <div className="text-[64px] text-deep-blue-gray font-bold leading-[1.1] mb-10 ">
          <h2 className="font-bold">What are people</h2>
          <span className="relative inline-block z-[1]">
            <span className="relative font-bold">saying</span>
            <div className="absolute inset-0 top-15 bottom-4 left-0 right-0 bg-white -z-10" />
          </span>
          <span>about us?</span>
        </div>
        <ReviewsSlider reviews={reviews} speed={25} />
        <div className="h-10"></div> {/* Spacer */}
        <ReviewsSlider reviews={reviews} speed={15} />
        <Button className="bg-deep-blue-gray text-white px-6 py-3 rounded-4xl font-bold mt-8">
          Get Started
        </Button>
      </div>
    </>
  );
}

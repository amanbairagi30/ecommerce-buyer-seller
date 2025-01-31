import { heroImg } from "@/constants/image";
import { IconConfetti } from "@tabler/icons-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { StarIcon } from "lucide-react";

export default function Hero() {
  return (
    <>
      <div className="max-w-7xl mx-auto ">
        <div className="flex bg-orange-200 drop-shadow-sm rounded-b-[4rem] relative h-[34rem] ">
          <Image
            src={heroImg}
            className="absolute bottom-0 size-[28rem] object-contain right-5"
            alt="hero banner"
          />
          <div className="flex flex-col ml-20 mt-20 gap-4">
            <div>
              <div className="bg-orange-500 w-fit flex items-center gap-2 text-white rounded-full px-4 py-1 text-sm font-primary">
                <span className="font-bold">40%</span> off today{" "}
                <IconConfetti className="size-4" />
              </div>
            </div>

            <div className="text-7xl font-heading font-bold">
              Explore fashion <br /> in{" "}
              <span className="font-serif tracking-normal">style .</span>
            </div>
            <div className="text-lg font-primary w-[70%]">
              Discover timeless fashion for men and women. From everyday
              essentials to statement pieces, we&apos;ve got you covered.
            </div>

            <div className="flex gap-4">
              <Button className="bg-orange-500 rounded-3xl px-6 h-16 w-36 text-lg hover:bg-orange-600">
                Shop Now
              </Button>
              <Button className="h-16 min-w-36 bg-orange-100 hover:bg-orange-100/80 text-foreground rounded-3xl px-6 max-w-fit text-lg">
                Explore Collections
              </Button>
            </div>

            {/* add the stars review from customer
             */}
            <div className="flex flex-col mt-4 gap-2">
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 fill-orange-500 text-orange-500" />

                <StarIcon className="w-5 h-5 fill-orange-500 text-orange-500" />
                <StarIcon className="w-5 h-5 fill-orange-500 text-orange-500" />
                <StarIcon className="w-5 h-5 fill-orange-500 text-orange-500" />
                <StarIcon className="w-5 h-5 fill-orange-500 text-orange-500" />
              </div>
              <div className="text-sm flex gap-1 font-primary">
                Rated by <span className="font-bold">1000+</span> customers.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

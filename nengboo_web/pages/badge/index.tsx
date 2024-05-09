import React from "react";
import { BadgeData } from "@/utils/badgeData";
import BadgeIcons from "@/components/badge/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const index = () => {
  return (
    <div>
      <div className="w-[428px] h-[600px] bg-white grid grid-cols-3 justify-items-center">
        {BadgeData.map((data) => (
          <BadgeIcons data={data} />
        ))}
      </div>
      <div className="w-[100%] h-[50px] grid place-items-center">
        <Link href={"/badge/1"} className="w-[70%]">
          <Button className="w-[100%] bg-sky-500 hover:bg-sky-600">
            나무 보러가기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default index;

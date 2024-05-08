import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeData } from "@/utils/badgeData";
import BadgeIcons from "@/components/badge/badge";

const index = () => {
  return (
    <div>
      <div className="w-[428px] h-[816px] bg-white grid grid-cols-3 justify-items-center">
        {BadgeData.map((data) => (
          <BadgeIcons data={data} />
        ))}
      </div>
    </div>
  );
};

export default index;

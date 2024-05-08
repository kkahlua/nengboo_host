import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeData } from "@/utils/badgeData";

const index = () => {
  return (
    <div>
      <div className="w-[428px] h-[816px] bg-white grid grid-cols-3 justify-items-center">
        {BadgeData.map((data) => (
          <Link href={`/badge/${data.id}`} key={data.id}>
            <div className="w-[100px] h-[137px] flex-col justify-center items-center inline-flex">
              <div className="w-[100px] h-[100px] p-[5px] justify-center items-center inline-flex">
                <Image
                  src={data.image}
                  alt={`Reward Picture ${data.id}`}
                  style={
                    data.selected
                      ? {}
                      : { filter: "grayscale(1)", opacity: "50%" }
                  }
                  priority
                />
              </div>
              <div
                className={`self-stretch py-1 ${
                  data.selected ? "bg-indigo-50" : "bg-zinc-100"
                } rounded justify-center items-center gap-2.5 inline-flex`}
              >
                <div
                  className={`text-center ${
                    data.selected ? "text-sky-500" : "text-neutral-600"
                  } text-xs font-bold font-['Pretendard'] leading-[21px]`}
                >
                  {data.name}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default index;

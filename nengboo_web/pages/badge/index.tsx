import React, { useEffect, useState } from "react";
import { BadgeData } from "@/utils/badgeData";
import BadgeIcons from "@/components/badge/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getUserInfo } from "@/utils/actions";

const index = () => {
  const [isAcheived, setIsacheived] = useState({});

  useEffect(() => {
    const initMain = async () => {
      const data = await getUserInfo();
      if (data) {
        setIsacheived({
          attend: data[0].badge_attendance,
          expday: data[0].badge_expiration_day,
          meat: data[0].badge_meat,
          vege: data[0].badge_vegetable,
          fish: data[0].badge_fish,
          milk: data[0].badge_milk,
          refri: data[0].badge_refrigerator,
          recipe: data[0].badge_recipe,
        });
      }
    };
    initMain();
  }, []);

  return (
    <div>
      <div className="w-[428px] h-[600px] bg-white grid grid-cols-3 justify-items-center">
        <Link
          href={`/badge/${BadgeData[0].id}?achieved=${isAcheived.attend}`}
          key={BadgeData[0].id}
          className="w-[100px] h-[140px]"
        >
          <div className="transition ease-in-out w-[100px] h-[137px] flex-col justify-center items-center inline-flex hover:scale-110">
            <div className="w-[100px] h-[100px] p-[5px] justify-center items-center inline-flex">
              <Image
                src={BadgeData[0].image}
                alt={`Reward Picture ${BadgeData[0].id}`}
                className={`${isAcheived.attend ? "" : "opacity-50 grayscale"}`}
                priority
              />
            </div>
            <div
              className={`self-stretch py-1 ${
                isAcheived.attend ? "bg-indigo-50" : "bg-zinc-100"
              } rounded justify-center items-center gap-2.5 inline-flex`}
            >
              <div
                className={`text-center ${
                  isAcheived.attend ? "text-sky-500" : "text-neutral-600"
                } text-xs font-bold font-['Pretendard'] leading-[21px]`}
              >
                {BadgeData[0].name}
              </div>
            </div>
          </div>
        </Link>
        <Link
          href={`/badge/${BadgeData[1].id}?achieved=${isAcheived.expday}`}
          key={BadgeData[1].id}
          className="w-[100px] h-[140px]"
        >
          <div className="transition ease-in-out w-[100px] h-[137px] flex-col justify-center items-center inline-flex hover:scale-110">
            <div className="w-[100px] h-[100px] p-[5px] justify-center items-center inline-flex">
              <Image
                src={BadgeData[1].image}
                alt={`Reward Picture ${BadgeData[1].id}`}
                className={`${isAcheived.expday ? "" : "opacity-50 grayscale"}`}
                priority
              />
            </div>
            <div
              className={`self-stretch py-1 ${
                isAcheived.expday ? "bg-indigo-50" : "bg-zinc-100"
              } rounded justify-center items-center gap-2.5 inline-flex`}
            >
              <div
                className={`text-center ${
                  isAcheived.expday ? "text-sky-500" : "text-neutral-600"
                } text-xs font-bold font-['Pretendard'] leading-[21px]`}
              >
                {BadgeData[1].name}
              </div>
            </div>
          </div>
        </Link>
        <Link
          href={`/badge/${BadgeData[2].id}?achieved=${isAcheived.meat}`}
          key={BadgeData[2].id}
          className="w-[100px] h-[140px]"
        >
          <div className="transition ease-in-out w-[100px] h-[137px] flex-col justify-center items-center inline-flex hover:scale-110">
            <div className="w-[100px] h-[100px] p-[5px] justify-center items-center inline-flex">
              <Image
                src={BadgeData[2].image}
                alt={`Reward Picture ${BadgeData[2].id}`}
                className={`${isAcheived.meat ? "" : "opacity-50 grayscale"}`}
                priority
              />
            </div>
            <div
              className={`self-stretch py-1 ${
                isAcheived.meat ? "bg-indigo-50" : "bg-zinc-100"
              } rounded justify-center items-center gap-2.5 inline-flex`}
            >
              <div
                className={`text-center ${
                  isAcheived.meat ? "text-sky-500" : "text-neutral-600"
                } text-xs font-bold font-['Pretendard'] leading-[21px]`}
              >
                {BadgeData[2].name}
              </div>
            </div>
          </div>
        </Link>
        <Link
          href={`/badge/${BadgeData[3].id}?achieved=${isAcheived.vege}`}
          key={BadgeData[3].id}
          className="w-[100px] h-[140px]"
        >
          <div className="transition ease-in-out w-[100px] h-[137px] flex-col justify-center items-center inline-flex hover:scale-110">
            <div className="w-[100px] h-[100px] p-[5px] justify-center items-center inline-flex">
              <Image
                src={BadgeData[3].image}
                alt={`Reward Picture ${BadgeData[3].id}`}
                className={`${isAcheived.vege ? "" : "opacity-50 grayscale"}`}
                priority
              />
            </div>
            <div
              className={`self-stretch py-1 ${
                isAcheived.vege ? "bg-indigo-50" : "bg-zinc-100"
              } rounded justify-center items-center gap-2.5 inline-flex`}
            >
              <div
                className={`text-center ${
                  isAcheived.vege ? "text-sky-500" : "text-neutral-600"
                } text-xs font-bold font-['Pretendard'] leading-[21px]`}
              >
                {BadgeData[3].name}
              </div>
            </div>
          </div>
        </Link>
        <Link
          href={`/badge/${BadgeData[4].id}?achieved=${isAcheived.fish}`}
          key={BadgeData[4].id}
          className="w-[100px] h-[140px]"
        >
          <div className="transition ease-in-out w-[100px] h-[137px] flex-col justify-center items-center inline-flex hover:scale-110">
            <div className="w-[100px] h-[100px] p-[5px] justify-center items-center inline-flex">
              <Image
                src={BadgeData[4].image}
                alt={`Reward Picture ${BadgeData[4].id}`}
                className={`${isAcheived.fish ? "" : "opacity-50 grayscale"}`}
                priority
              />
            </div>
            <div
              className={`self-stretch py-1 ${
                isAcheived.fish ? "bg-indigo-50" : "bg-zinc-100"
              } rounded justify-center items-center gap-2.5 inline-flex`}
            >
              <div
                className={`text-center ${
                  isAcheived.fish ? "text-sky-500" : "text-neutral-600"
                } text-xs font-bold font-['Pretendard'] leading-[21px]`}
              >
                {BadgeData[4].name}
              </div>
            </div>
          </div>
        </Link>
        <Link
          href={`/badge/${BadgeData[5].id}?achieved=${isAcheived.milk}`}
          key={BadgeData[5].id}
          className="w-[100px] h-[140px]"
        >
          <div className="transition ease-in-out w-[100px] h-[137px] flex-col justify-center items-center inline-flex hover:scale-110">
            <div className="w-[100px] h-[100px] p-[5px] justify-center items-center inline-flex">
              <Image
                src={BadgeData[5].image}
                alt={`Reward Picture ${BadgeData[5].id}`}
                className={`${isAcheived.milk ? "" : "opacity-50 grayscale"}`}
                priority
              />
            </div>
            <div
              className={`self-stretch py-1 ${
                isAcheived.milk ? "bg-indigo-50" : "bg-zinc-100"
              } rounded justify-center items-center gap-2.5 inline-flex`}
            >
              <div
                className={`text-center ${
                  isAcheived.milk ? "text-sky-500" : "text-neutral-600"
                } text-xs font-bold font-['Pretendard'] leading-[21px]`}
              >
                {BadgeData[5].name}
              </div>
            </div>
          </div>
        </Link>
        <Link
          href={`/badge/${BadgeData[6].id}?achieved=${isAcheived.refri}`}
          key={BadgeData[6].id}
          className="w-[100px] h-[140px]"
        >
          <div className="transition ease-in-out w-[100px] h-[137px] flex-col justify-center items-center inline-flex hover:scale-110">
            <div className="w-[100px] h-[100px] p-[5px] justify-center items-center inline-flex">
              <Image
                src={BadgeData[6].image}
                alt={`Reward Picture ${BadgeData[6].id}`}
                className={`${isAcheived.refri ? "" : "opacity-50 grayscale"}`}
                priority
              />
            </div>
            <div
              className={`self-stretch py-1 ${
                isAcheived.refri ? "bg-indigo-50" : "bg-zinc-100"
              } rounded justify-center items-center gap-2.5 inline-flex`}
            >
              <div
                className={`text-center ${
                  isAcheived.refri ? "text-sky-500" : "text-neutral-600"
                } text-xs font-bold font-['Pretendard'] leading-[21px]`}
              >
                {BadgeData[6].name}
              </div>
            </div>
          </div>
        </Link>
        <Link
          href={`/badge/${BadgeData[7].id}?achieved=${isAcheived.recipe}`}
          key={BadgeData[7].id}
          className="w-[100px] h-[140px]"
        >
          <div className="transition ease-in-out w-[100px] h-[137px] flex-col justify-center items-center inline-flex hover:scale-110">
            <div className="w-[100px] h-[100px] p-[5px] justify-center items-center inline-flex">
              <Image
                src={BadgeData[7].image}
                alt={`Reward Picture ${BadgeData[7].id}`}
                className={`${isAcheived.recipe ? "" : "opacity-50 grayscale"}`}
                priority
              />
            </div>
            <div
              className={`self-stretch py-1 ${
                isAcheived.recipe ? "bg-indigo-50" : "bg-zinc-100"
              } rounded justify-center items-center gap-2.5 inline-flex`}
            >
              <div
                className={`text-center ${
                  isAcheived.recipe ? "text-sky-500" : "text-neutral-600"
                } text-xs font-bold font-['Pretendard'] leading-[21px]`}
              >
                {BadgeData[7].name}
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="w-[100%] h-[50px] grid place-items-center">
        <Link href={"/badge/forest"} className="w-[70%]">
          <Button className="w-[100%] bg-sky-500 hover:bg-sky-600">
            나무 보러가기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default index;

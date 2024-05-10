import { useRouter } from "next/router";
import Image from "next/image";
import { BadgeData } from "@/utils/badgeData";

const index = () => {
  const router = useRouter();
  const num = parseInt(router.query.id) - 1;
  const achieved = parseInt(router.query.achieved);
  return (
    <div>
      <div className="w-[428px] h-[816px] bg-white grid place-items-center">
        <Image
          src={BadgeData[num].image}
          alt="non"
          className={`w-[280] h-[280] ${
            achieved ? "" : "opacity-50 grayscale"
          }`}
          priority
        />
        <div
          className={`${
            achieved ? "text-sky-500" : "text-neutral-600"
          } text-[32px] font-bold font-['Pretendard']`}
        >
          {BadgeData[num].name}
        </div>
        <div className="w-[250px] text-center text-neutral-500 text-2xl font-medium font-['Pretendard']">
          {achieved ? BadgeData[num].content : BadgeData[num].fail_content}
        </div>
        <div className="h-[250px]"></div>
      </div>
    </div>
  );
};

export default index;

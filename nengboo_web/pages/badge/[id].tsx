import { useRouter } from "next/router";
import Image from "next/image";
import { BadgeData } from "@/utils/badgeData";

const index = () => {
  const router = useRouter();
  const num = parseInt(router.query.id) - 1;

  return (
    <div>
      <div className="w-[428px] h-[816px] bg-white grid place-items-center">
        <Image
          src={BadgeData[num].image}
          alt="non"
          style={{ width: 280, height: 280 }}
          priority
        />
        <div className="text-sky-500 text-[32px] font-bold font-['Pretendard']">
          {BadgeData[num].name}
        </div>
        <div className="w-[250px] text-center text-neutral-500 text-2xl font-medium font-['Pretendard']">
          {BadgeData[num].content}
        </div>
        <div className="h-[250px]"></div>
      </div>
    </div>
  );
};

export default index;

import Image from "next/image";
import { useRouter } from "next/router";
import arrowLeft from "@/public/arrowLeft.svg";

export const TextHeader = () => {
  const router = useRouter();
  return (
    <div className="flex mt-16 mb-14">
      <Image
        src={arrowLeft}
        alt="BackButton"
        className="mr-2"
        width={9}
        height={18}
        onClick={() => router.back()}
      />
      <div className="relative grow justify-center">
        <div className="text-neutral-900 text-2xl font-bold text-center">
          AI 추천 레시피
        </div>
      </div>
    </div>
  );
};

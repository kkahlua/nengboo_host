import Image from "next/image";
import { googleLogin, kakaoLogin } from "@/utils/actions";

import pretendard from "@/styles/fonts";

export default function Home() {
  return (
    <div className={pretendard.className}>
      <div className=" mt-96 items-center justify-center ">
        <div className="flex items-center justify-center">
          <div>
            <Image
              src="/logoTop.svg"
              width={47}
              height={26}
              className="mb-1"
              alt="logo Image"
            />
            <Image
              src="/logoBottom.svg"
              width={47}
              height={35}
              alt="logo Image"
            />
          </div>
        </div>

        <div className="flex items-center justify-center mb-16">
          <div className="w-[90px] h-10 text-blue-500 text-[32px] font-medium  text-center">
            냉부해
          </div>
        </div>

        <div className="flex items-center justify-center mb-10">
          <p className="w-[120px] h-4 text-neutral-400 text-base font-normal font-['Apple Braille']">
            SNS 간편 로그인
          </p>
        </div>

        <div className="flex items-center justify-center mb-5">
          <Image
            src="/googleLoginImage.svg"
            width={190}
            height={40}
            onClick={googleLogin}
            alt="google Image"
          />
        </div>

        <div className="flex items-center justify-center">
          <Image
            src="/kakaoLoginImage.svg"
            width={190}
            height={40}
            onClick={kakaoLogin}
            alt="kakao Image"
          />
        </div>
      </div>
    </div>
  );
}

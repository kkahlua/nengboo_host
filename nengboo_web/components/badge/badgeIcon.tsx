import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BadgeData } from "@/utils/badgeData";
import Image from "next/image";

export function BadgeIcon({ data }) {
  return (
    <AlertDialog>
      {/* 클릭 전 보이는 아이콘 영역 */}
      <AlertDialogTrigger asChild>
        <div className="transition ease-in-out w-[100px] h-[137px] flex-col justify-center items-center inline-flex active:scale-110">
          <div className="w-[100px] h-[100px] p-[5px] justify-center items-center inline-flex">
            <Image
              src={data.image}
              alt={`Reward Picture ${data.id}`}
              priority
            />
          </div>
          <div
            className={`self-stretch py-1 bg-indigo-50 rounded justify-center items-center gap-2.5 inline-flex`}
          >
            <div
              className={`text-center text-sky-500 text-xs font-bold font-['Pretendard'] leading-[21px]`}
            >
              {data.name}
            </div>
          </div>
        </div>
      </AlertDialogTrigger>

      {/* 팝업 창 화면 */}
      <AlertDialogContent className="rounded-lg w-[90%] h-[90%]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sky-500 text-[32px] font-bold font-['Pretendard'] my-[20px]">
            {data.name}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Image
              src={data.image}
              alt="non"
              className={`w-[280] h-[280]`}
              priority
            />
            <div className="mt-[30px] text-center text-neutral-500 text-2xl text-wrap font-medium font-['Pretendard']">
              {data.content}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* 나가는 액션을 위한 나가기 버튼 */}
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-sky-500 hover:bg-sky-600">
            <p className="text-white font-semibold font-['Pretendard']">닫기</p>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

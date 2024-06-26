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
import Image from "next/image";

export function BadgeIcon({ id, name, content, fail_content, img, achieved }) {
  return (
    <AlertDialog>
      {/* 클릭 전 보이는 아이콘 영역 */}
      <AlertDialogTrigger asChild>
        <div className="transition ease-in-out w-[100px] h-[137px] flex-col justify-center items-center inline-flex active:scale-110">
          <div className="w-[100px] h-[100px] p-[5px] justify-center items-center inline-flex">
            <Image
              src={img}
              alt={`Reward Picture ${id}`}
              className={`${achieved ? "" : "opacity-50 grayscale"}`}
              priority
            />
          </div>
          <div
            className={`self-stretch py-1  ${
              achieved ? "bg-indigo-50" : "bg-zinc-100"
            } rounded justify-center items-center gap-2.5 inline-flex`}
          >
            <div
              className={`text-center  ${
                achieved ? "text-sky-500" : "text-neutral-600"
              } text-xs font-bold font-['Pretendard'] leading-[21px]`}
            >
              {name}
            </div>
          </div>
        </div>
      </AlertDialogTrigger>

      {/* 팝업 창 화면 */}
      <AlertDialogContent className="rounded-lg w-[90%] h-[90%]">
        <AlertDialogHeader>
          <AlertDialogTitle
            className={`${
              achieved ? "text-sky-500" : "text-neutral-600"
            } text-[32px] font-bold font-['Pretendard'] my-[20px]`}
          >
            {name}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Image
              src={img}
              alt="non"
              className={`w-[280] h-[280] ${
                achieved ? "" : "opacity-50 grayscale"
              }`}
              priority
            />
            <div className="mt-[30px] text-center text-neutral-500 text-2xl text-wrap font-medium font-['Pretendard']">
              {achieved ? content : fail_content}
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

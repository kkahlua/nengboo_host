import Link from "next/link";
import Image from "next/image";

const BadgeIcons = ({ data }) => {
  return (
    <Link
      href={`/badge/${data.id}?achieved=${data.achieved}`}
      key={data.id}
      className="w-[100px] h-[140px]"
    >
      <div className="transition ease-in-out w-[100px] h-[137px] flex-col justify-center items-center inline-flex hover:scale-110">
        <div className="w-[100px] h-[100px] p-[5px] justify-center items-center inline-flex">
          <Image
            src={data.image}
            alt={`Reward Picture ${data.id}`}
            style={
              data.achieved ? {} : { filter: "grayscale(1)", opacity: "50%" }
            }
            priority
          />
        </div>
        <div
          className={`self-stretch py-1 ${
            data.achieved ? "bg-indigo-50" : "bg-zinc-100"
          } rounded justify-center items-center gap-2.5 inline-flex`}
        >
          <div
            className={`text-center ${
              data.achieved ? "text-sky-500" : "text-neutral-600"
            } text-xs font-bold font-['Pretendard'] leading-[21px]`}
          >
            {data.name}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BadgeIcons;

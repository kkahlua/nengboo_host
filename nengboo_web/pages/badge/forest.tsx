import Image from "next/image";
import { useState } from "react";
import forest_1 from "@/public/badge/forest_11.png";
import forest_2 from "@/public/badge/forest_22.png";
import forest_3 from "@/public/badge/forest_33.png";
import forest_4 from "@/public/badge/forest_44.png";
import forest_5 from "@/public/badge/forest_55.png";
import forest_bg from "@/public/badge/forest_bg.jpg";

const Forest = () => {
  const [exp, setExp] = useState(10000000);

  return (
    <div className="grid place-items-center">
      <div className="bg-sky-100 w-[350px] h-[250px] my-[50px] relative rounded-lg">
        <Image
          src={forest_1}
          alt="Image_1"
          className={`absolute top-0 left-0 w-[350px] h-[250px] ${
            exp < 100 ? "grayscale" : ""
          }`}
        />
        <Image
          src={forest_2}
          alt="Image_2"
          className={`absolute top-0 left-0 w-[350px] h-[250px] ${
            exp < 1000 ? "grayscale" : ""
          }`}
        />
        <Image
          src={forest_3}
          alt="Image_3"
          className={`absolute top-0 left-0 w-[350px] h-[250px] ${
            exp < 10000 ? "grayscale" : ""
          }`}
        />
        <Image
          src={forest_4}
          alt="Image_3"
          className={`absolute top-0 left-0 w-[350px] h-[250px] ${
            exp < 1000000 ? "grayscale" : ""
          }`}
        />
        <Image
          src={forest_5}
          alt="Image_3"
          className={`absolute top-0 left-0 w-[350px] h-[250px] ${
            exp < 10000000 ? "grayscale" : ""
          }`}
        />
      </div>
      <div className="bg-yellow-300 w-[350px] h-[100px]"></div>
    </div>
  );
};

export default Forest;

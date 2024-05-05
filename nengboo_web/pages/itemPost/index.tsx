import React, { useState, ChangeEvent, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { json } from "stream/consumers";
import { useUserStore } from "@/store/user";

import { getUserInfo, updateUser } from "@/utils/actions";
export default function ItemPost() {
  const [barcode, setBarcode] = useState("");
  const [itemNameValue, setItemNameValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [hashtag, setHashTag] = useState("");
  const [hashtagsArr, setHashtagsArr] = useState<string[]>([]);
  const [keeping, setKeeping] = useState("light");
  const [memo, setMemo] = useState("");
  // const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleCancel = () => {
    setItemNameValue("");
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    const RegNotNum = /[^0-9]/g;
    const onlyNum = value.replace(RegNotNum, ""); // 숫자가 아닌 경우 ''

    let DataFormat: any;
    let RegDateFmt: any;

    if (onlyNum.length <= 6) {
      // 000000 -> 0000-00
      DataFormat = "$1-$2";
      RegDateFmt = /([0-9]{4})([0-9]+)/;
    } else if (onlyNum.length <= 8) {
      // 00000000 -> 0000-00-00
      DataFormat = "$1-$2-$3";
      RegDateFmt = /([0-9]{4})([0-9]{2})([0-9]+)/;
    }

    const newDate = onlyNum.replace(RegDateFmt, DataFormat);

    setDateValue(newDate); // YYYY-MM-DD
  };

  const onChangeHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashTag(e.target.value);
  };

  const onKeyUp = useCallback(
    (e: { keyCode: number }) => {
      if (e.keyCode === 13 && hashtag.trim() !== "") {
        setHashtagsArr((prevHashtags) => [...prevHashtags, hashtag]);
        setHashTag("");
      }
    },
    [hashtag]
  );

  const removeHashtag = (indexToRemove: number) => {
    setHashtagsArr((prevHashtags) =>
      prevHashtags.filter((_, index) => index !== indexToRemove)
    );
  };
  const handleSelectChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    // 선택된 값으로 keeping 상태를 업데이트합니다.
    setKeeping(e.target.value);
  };

  const handleMemoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value);
  };

  const handleSubmit = async () => {
    await updateUser();
    const userData = await getUserInfo();

    const data = {
      barcode: barcode,
      product_name: itemNameValue,
      product_expiration_date: dateValue,
      product_quantity: quantity,
      product_type: hashtagsArr,
      product_frozen_storage: keeping,
      product_memo: memo,
      user_id: userData[0].user_id,
    };

    console.log(JSON.stringify(data));

    try {
      const response = await fetch("/api/itemPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to server");
      }

      // Handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-6 mt-1">
        <Image src="/back.svg" width={9} height={18} alt="backImg" />
        <h2 className="text-2xl font-bold ">상품 등록</h2>
        <div></div>
      </div>
      <div className="px-6 pt-5">
        <div className="py-9 px-5 gap-4 flex items-center border-solid border border-border-color rounded-lg">
          <div>
            <Image
              src="/dummyImg.svg"
              width={100}
              height={100}
              alt="dummyImg"
            />
          </div>
          <div>
            <div className="flex items-center w-[228px] h-[30px] border-solid border border-gray-200 rounded-lg mb-1.5 text-sm">
              <p className="pl-1">{barcode}</p>
            </div>

            <div className="flex w-[228px] h-[40px] max-w-sm items-center rounded-lg border border-gray-200 mb-2.5 text-sm">
              <Input
                className="w-[180px] h-auto shrink-0 border-none pl-2.5 focus-visible:ring-0"
                placeholder="상품명을 입력해주세요."
                type="text"
                value={itemNameValue}
                onChange={(e) => setItemNameValue(e.target.value)}
              />
              <div
                className="flex items-center justify-end flex-grow pr-2"
                onClick={handleCancel}
              >
                <Image
                  src="/cancel.svg"
                  width={24}
                  height={24}
                  alt="cancelImg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-6 py-4">
        <h2 className="text-sm">상품 정보</h2>
      </div>
      <div className="px-6">
        <div className="flex w-full h-[52px] max-w-sm items-center rounded-lg border border-gray-200 px-2.5 py-2.5 mb-2.5">
          <Image src="/date.svg" width={24} height={24} alt="dateImg" />
          <Input
            className="w-[330px] shrink-0 border-none text-base pl-[15px] focus-visible:ring-0"
            placeholder="2024"
            type="date"
            value={dateValue}
            onChange={handleDateChange}
          />
        </div>
        <div className="flex w-full h-[52px] max-w-sm items-center rounded-lg border border-gray-200 px-2.5 py-2.5 mb-2.5">
          <div className="flex items-center">
            <Image
              src="/quantity.svg"
              width={24}
              height={24}
              alt="quantityImg"
            />
            <p className="pl-1 text-base pl-[15px]">수량</p>
          </div>
          <div className="flex items-center justify-end flex-grow gap-2">
            <Image
              src="/minus.svg"
              width={24}
              height={24}
              alt="minusImg"
              onClick={handleDecrement}
            />
            <p>{quantity}</p>
            <Image
              src="/plus.svg"
              width={24}
              height={24}
              alt="plusImg"
              onClick={handleIncrement}
            />
          </div>
        </div>

        <div className="flex w-full h-[52px] max-w-sm items-center rounded-lg border border-gray-200 px-2.5 py-2.5 mb-2.5">
          <div className="flex items-center w-full ">
            <Image src="/tag.svg" width={24} height={24} alt="tagImg" />

            {hashtagsArr.map((tag, index) => (
              <div
                key={index}
                className=" flex items-center bg-btn-post-color text-white text-base py-1 px-3 rounded-[15px] mr-2 mb-2 cursor-pointer "
                onClick={() => removeHashtag(index)}
              >
                {tag}
              </div>
            ))}
            <Input
              className="w-fit shrink-0 border-none text-base pl-[15px] focus-visible:ring-0"
              type="text"
              value={hashtag}
              onChange={onChangeHashtag}
              onKeyUp={onKeyUp}
              placeholder="해시태그 입력"
            />
          </div>
        </div>

        <div className="flex w-full h-[52px] max-w-sm items-center rounded-lg border border-gray-200 px-2.5 py-2.5 mb-2.5">
          <div className="flex items-center">
            <Image src="/keep.svg" width={24} height={24} alt="keepImg" />
            <p className="text-base pl-[15px]">보관 방법</p>
          </div>
          <div className="flex items-center justify-end flex-grow">
            {/* <Select onValueChange={handleSelectChange} defaultValue={keeping}>
              <SelectTrigger className="w-[112px] h-[37px] border-none text-xs focus-visible:ring-0">
                <SelectValue placeholder="보관" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">냉장 보관</SelectItem>
                <SelectItem value="dark">냉동 보관</SelectItem>
                <SelectItem value="system">실온 보관</SelectItem>
              </SelectContent>
            </Select> */}
            <select
              onChange={handleSelectChange}
              defaultValue={keeping}
              className="w-[112px] h-[37px] border-none text-xs focus-visible:ring-0"
            >
              <option value="light">냉장 보관</option>
              <option value="dark">냉동 보관</option>
              <option value="system">실온 보관</option>
            </select>
          </div>
        </div>
        <div className="flex w-full h-[52px] max-w-sm items-center rounded-lg border border-gray-200  px-2.5 py-2.5">
          <Image src="/memo.svg" width={24} height={24} alt="memoImg" />
          <Input
            className="w-[330px] shrink-0 border-none text-base pl-[15px] focus-visible:ring-0"
            placeholder="메모를 입력해주세요."
            type="text"
            value={memo}
            onChange={handleMemoChange}
          />
        </div>
      </div>
      <div className="flex items-center justify-center px-6 gap-2 pt-[52px]">
        <Button className="flex-grow bg-btn-cancel-color text-btn-cancel-text h-14 text-base">
          <Link href="/login">취소</Link>
        </Button>
        <Button
          className="flex-grow bg-btn-post-color h-14 text-base"
          onClick={handleSubmit}
        >
          {/* <Link href="/itemDetail">등록</Link> */}
          등록
        </Button>
      </div>
    </div>
  );
}

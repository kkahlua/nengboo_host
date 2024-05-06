import { useState, ChangeEvent, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
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
import { useUserStore } from "@/store/user";
import { supabase } from "@/utils/supabase";

export default function ItemDetail() {
  const [product, setProduct] = useState(null);
  const [barcode, setBarcode] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [itemNameValue, setItemNameValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [hashtag, setHashTag] = useState("");
  const [hashtagsArr, setHashtagsArr] = useState<string[]>([]);
  const [keeping, setKeeping] = useState("light");
  const [memo, setMemo] = useState("");
  const router = useRouter();

  const { product_id } = router.query;
  console.log(product_id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Supabase에서 데이터 조회
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("product_id", product_id)
          .single();
        // console.log("data.product_name : ", data.product_name);
        const findCreatedDate = new Date(data.product_created_date);
        const formattedDate = `${findCreatedDate.getFullYear()}-${(
          findCreatedDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${findCreatedDate
          .getDate()
          .toString()
          .padStart(2, "0")}`;

        setCreatedDate(formattedDate);
        setItemNameValue(data.product_name);
        setDateValue(data.product_expiration_date);
        setQuantity(data.product_quantity);
        // setHashTag(data.product_type);
        // 해시태그를 구분하여 배열로 저장
        if (data.product_type) {
          const hashtags = data.product_type.split(","); // '테스트1,테스트2' -> ["테스트1", "테스트2"]
          setHashtagsArr(hashtags);
        }
        setKeeping(data.product_frozen_storage);
        setMemo(data.product_memo);

        if (error) {
          throw error;
        }

        setProduct(data); // 조회된 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    if (product_id) {
      fetchProduct(); // product_id가 있을 때만 데이터 조회
    }
  }, [product_id]);

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
    const data = {
      // barcode: barcode,
      product_name: itemNameValue,
      product_expiration_date: dateValue,
      product_quantity: quantity,
      product_type: hashtagsArr.join(","),
      product_frozen_storage: keeping,
      product_memo: memo,
      product_updated_date: new Date().toISOString(),
    };
    console.log(JSON.stringify(data));
    try {
      const { error } = await supabase
        .from("products")
        .update(data)
        .eq("product_id", product_id);

      if (error) {
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
        <h2 className="text-2xl font-bold">상품 상세정보</h2>
        <Image src="/delete.svg" width={34} height={34} alt="deleteImg" />
      </div>
      <div className="pt-[15px] pb-[10px] px-6">
        <p className="text-xs">{createdDate}</p>
      </div>
      <div className="flex items-center justify-center">
        <Image src="/dummyImg.svg" width={130} height={135} alt="dummyImg" />
      </div>
      <div className="px-6 pt-[39px]">
        <div className="flex w-full h-[52px] max-w-sm items-center rounded-lg border border-gray-200  px-2.5 py-2.5 mb-2.5">
          <Image src="/itemName.svg" width={24} height={24} alt="itemNameImg" />
          <Input
            className="w-[330px] shrink-0 border-none text-base pl-[15px] text-base"
            type="text"
            value={itemNameValue}
            placeholder="햇감자"
            onChange={(e) => setItemNameValue(e.target.value)}
          />
        </div>
        <div className="flex w-full h-[52px] max-w-sm items-center rounded-lg border border-gray-200 px-2.5 py-2.5 mb-2.5">
          <Image src="/date.svg" width={24} height={24} alt="dateImg" />
          <Input
            className="w-[330px] shrink-0 border-none text-base pl-[15px] text-base"
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
          저장
          {/* <Link href="/login">저장</Link> */}
        </Button>
      </div>
    </div>
  );
}

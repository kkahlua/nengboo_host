import React from "react"
import Image from "next/image"

import arrowLeft from "../../public/arrowLeft.svg"
import search from "../../public/search.svg"

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: () => void
  value: string
}

const SearchBar = ({ onChange, onSearch, value }) => {
  return (
    <div className="flex items-center">
      <Image src={arrowLeft} alt="BackButton" className="mr-2" width={9} height={18} />
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="상품명을 입력해주세요."
          className="flex px-4 py-3 w-full justify-center items-center rounded-lg border border-1 border-gray-400 input-no-focus"
          style={{
            outline: "none",
          }}
          value={value}
          onChange={onChange}
        />
        <Image
          onClick={onSearch}
          src={search}
          alt="Search"
          width={24}
          height={24}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default SearchBar

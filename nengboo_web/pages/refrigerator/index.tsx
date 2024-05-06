import React, { useState } from "react"
import Image from "next/image"

import SearchBar from "../../components/ui/SearchBar"

import coldImg from "../../public/cold.png"
import cancelImg from "../../public/cancel.png"

const refrigerator = () => {
  const dummyData = [
    {
      id: 1,
      name: "사과",
      qty: "6",
      exp: "2024-05-10",
      dday: "D - 10",
      image: "https://picsum.photos/150x150",
    },
    {
      id: 2,
      name: "소세지",
      qty: "1",
      exp: "2024-05-07",
      dday: "D - 7",
      image: "https://picsum.photos/150x150",
    },
    {
      id: 3,
      name: "양파",
      qty: "6",
      exp: "2024-05-15",
      dday: "D - 15",
      image: "https://picsum.photos/150x150",
    },
    {
      id: 4,
      name: "코카콜라",
      qty: "2",
      exp: "2024-05-03",
      dday: "D - 3",
      image: "https://picsum.photos/150x150",
    },
  ]

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showRecentSearches, setShowRecentSearches] = useState<boolean>(false)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setShowRecentSearches(true)
  }

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== "") {
      setSearchTerm("")
      setRecentSearches((prevSearches) => [searchTerm, ...prevSearches])
      setShowRecentSearches(false)
    }
  }

  const handleDeleteRecentSearch = (index: number) => {
    setRecentSearches((prevSearches) => prevSearches.filter((_, i) => i !== index))
  }

  const handleClearRecentSearches = () => {
    setRecentSearches([])
  }

  const filteredData = dummyData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar onChange={handleSearch} onSearch={handleSearchSubmit} value={searchTerm} />
      {recentSearches.length > 0 ? (
        <div className="mt-8">
          <p className="text-black mb-2">최근 검색어</p>
          <div className="flex flex-wrap">
            {recentSearches.map((search, index) => (
              <div key={index} className="relative mr-2 mb-2">
                <button
                  onClick={() => handleDeleteRecentSearch(index)}
                  className="absolute right-0 top-0 p-1"
                >
                  <Image src={cancelImg} alt="Delete" width={12} height={12} />
                </button>
                <span className="bg-black-200 py-1 px-2 rounded-lg text-sm mr-1">{search}</span>
              </div>
            ))}
          </div>
          <button
            onClick={handleClearRecentSearches}
            className="mt-2 text-black hover:text-black text-sm"
          >
            모든 검색어 삭제
          </button>
        </div>
      ) : searchTerm ? (
        <div className="mt-8 flex flex-col text-center text-black absolute">
          <p className="text-left mb-4" style={{ color: "#C3BFBF", textAlign: "left" }}>
            검색 결과
          </p>
          <p style={{ textAlign: "left" }}>검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center">
          <Image src={coldImg} alt="ColdBgImg" className="mx-auto" />
          <div className="mt-4 text-center text-black">
            <p>냉장고가 비어있어요.</p>
            <p>상품을 등록해주세요.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default refrigerator

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { supabase } from "@/utils/supabase"
import { useRouter } from "next/router"
import useDebounce from "@/hooks/useDebouce"

import arrowLeft from "@/public/arrowLeft.svg"
import search from "@/public/search.svg"

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: () => void
  value: string
}

const SearchBar = ({ onChange, onSearch, value }: SearchBarProps) => {
  const router = useRouter()
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [productIds, setProductIds] = useState<string[]>([])

  const debouncedValue = useDebounce(value, 100)

  useEffect(() => {
    const fetchProductIds = async () => {
      try {
        const { data: products, error } = await supabase.from("products").select("product_id")
        if (error) {
          throw error
        } else {
          const ids = products.map((product) => product.product_id)
          setProductIds(ids)
        }
      } catch (error) {
        console.error("Error: ", error.message)
      }
    }

    fetchProductIds()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }

  const handleSearch = () => {
    onSearch(value)
    const searchValue = debouncedValue.trim()
    if (searchValue !== "") {
      setSearchHistory((prevHistory) => {
        if (!prevHistory.includes(searchValue)) {
          return [searchValue, ...prevHistory]
        }
        return prevHistory
      })
      router.push({
        pathname: "/itemSearch",
        query: { searchTerm: searchValue },
      })
    }
  }

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      router.push("/refrigerator")
    }
  }

  return (
    <div className="flex items-center">
      <div onClick={handleGoBack}>
        <Image src={arrowLeft} alt="BackButton" className="mr-2" width={9} height={18} />
      </div>

      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="상품명을 입력해주세요."
          className="flex px-4 py-3 w-full justify-center items-center rounded-lg border border-1 border-gray-400 input-no-focus"
          style={{
            outline: "none",
          }}
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch()
            }
          }}
        />
        <Image
          onClick={handleSearch}
          src={search}
          alt="Search"
          width={24}
          height={24}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        />
      </div>

      <div className="absolute top-full left-0 mt-1 bg-white w-full shadow-md rounded-b-lg">
        {searchHistory.map((term, index) => (
          <div
            key={index}
            className="p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => router.push(`/itemSearch?${product_id}`)}
          >
            {term}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchBar

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { debounce } from "lodash"
import { supabase } from "../../utils/supabase"

import SearchBar from "../../components/ui/SearchBar"

import coldImg from "../../public/cold.svg"
import cancelImg from "../../public/cancel.svg"

const Refrigerator = () => {
  const [products, setProducts] = useState([])
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [recentSearches, setRecentSearches] = useState<
    { product_name: string; product_id: string }[]
  >([])
  const [showRecentSearches, setShowRecentSearches] = useState<boolean>(false)
  const [searchedOnce, setSearchedOnce] = useState<boolean>(false)

  const fetchProducts = useCallback(async () => {
    try {
      const { data: products, error } = await supabase
        .from("products")
        .select("product_name, product_expiration_date, product_memo, product_quantity, product_id")
      if (error) {
        throw error
      } else {
        setProducts(products)
        console.log(products)
      }
    } catch (error) {
      console.error("물품 조회 에러: ", error.message)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchFilteredData = useCallback(
    debounce(async (term) => {
      try {
        let query = supabase
          .from("products")
          .select(
            "product_name, product_expiration_date, product_memo, product_quantity, product_id"
          )
          .or(`product_name.ilike.*${term}*, product_memo.ilike.*${term}*`)
        const { data: filteredProducts, error } = await query
        if (error) {
          throw error
        } else {
          setFilteredData(filteredProducts)
        }
      } catch (error) {
        console.error("물품 검색 에러: ", error.message)
      }
      setSearchedOnce(true)
    }, 200),
    []
  )

  useEffect(() => {
    if (searchTerm) {
      fetchFilteredData(searchTerm)
    }
  }, [searchTerm, fetchFilteredData])

  const handleSearch = (event) => {
    const value = event.target.value
    setSearchTerm(value)
    setShowRecentSearches(value.trim() === "")
    setSearchedOnce(false)
  }

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== "") {
      const newSearch = { product_name: searchTerm, product_id: searchTerm }
      setRecentSearches((prevSearches) => {
        const filteredSearches = prevSearches.filter((search) => search.product_name !== searchTerm)
        return [newSearch, ...filteredSearches]
      })
      setShowRecentSearches(true)
    }
  }

  const handleDeleteRecentSearch = (productId: string) => {
    setRecentSearches((prevSearches) =>
      prevSearches.filter((search) => search.product_id !== productId)
    )
  }

  const handleClearRecentSearches = () => {
    setRecentSearches([])
  }

  console.log("화면 렌더링 시 filteredData 상태: ", filteredData)

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen ">
      <SearchBar onChange={handleSearch} onSearch={handleSearchSubmit} value={searchTerm} />
      {!showRecentSearches && recentSearches.length > 0 ? (
        <div className="mt-8">
          <p className="text-black mb-2">최근 검색어</p>
          <div className="flex flex-wrap">
            {recentSearches.map((search, index) => (
              <div key={index} className=" flex items-center mb-2">
                <div className="relative flex items-center justify-between text-center">
                  <span className="bg-black-200 py-1 px-2 rounded-lg text-sm ">
                    {search.product_name}
                  </span>
                  <button onClick={() => handleDeleteRecentSearch(index)} className="p-1">
                    <Image src={cancelImg} alt="Delete" width={12} height={12} />
                  </button>
                </div>
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
      ) : filteredData.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 mt-8">
          {filteredData.map((product) => (
            <div key={product.product_id} className="flex flex-col">
              <Link href={`/itemDetail/${product.product_id}`}>
                <div>
                  <Image
                    src={product.image}
                    width={150}
                    height={150}
                    alt={product.product_name}
                    className="mx-auto"
                  />
                  <div className="flex justify-between mt-2 text-center">
                    <p>{product.product_name}</p>
                    <p>수량: {product.product_quantity}</p>
                  </div>
                  <div className="flex justify-between mt-2 text-center">
                    <p>{product.product_expiration_date}</p>
                    <p>디데이</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : searchTerm && searchedOnce ? (
        <div className="mt-8 flex flex-col text-center text-black">
          <p className="mb-4" style={{ color: "#C3BFBF", textAlign: "left" }}>
            검색 결과
          </p>
          <p style={{ textAlign: "left" }}>검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center my-auto">
          <Image src={coldImg} alt="ColdBgImg" width={290} height={290} className="mx-auto" />
          <div className="mt-12 text-xl text-center text-black">
            <p>냉장고가 비어있어요.</p>
            <p>상품을 등록해주세요.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Refrigerator

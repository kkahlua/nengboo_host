import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { debounce } from "lodash"
import { useRouter } from "next/router"

import { supabase } from "@/utils/supabase"
import SearchBar from "@/components/ui/SearchBar"

const ItemSearch = () => {
  const [filteredData, setFilteredData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const fetchFilteredData = useCallback(
    debounce(async (term) => {
      try {
        let query = supabase.from("products").select("*").eq("product_name", term)
        const { data: filteredProducts, error } = await query
        if (error) {
          throw error
        } else {
          setFilteredData(filteredProducts)
        }
      } catch (error) {
        console.error("물품 검색 에러: ", error.message)
      }
    }, 200),
    []
  )

  useEffect(() => {
    if (searchTerm) {
      fetchFilteredData(searchTerm)
    } else {
      setFilteredData([])
    }
  }, [searchTerm, fetchFilteredData])

  const handleSearch = (event) => {
    const value = event.target.value
    setSearchTerm(value)
  }

  const handleSearchSubmit = async (searchTerm) => {
    try {
      const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .ilike("product_name", `%${searchTerm}%`)
        .single()

      if (error) {
        throw error
      } else {
        setFilteredData([products])
        router.push(`/itemSearch?${product_id}`)
      }
    } catch (error) {
      console.error("검색어를 불러오는 중 에러 발생: ", error.message)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
      <SearchBar onChange={handleSearch} onSearch={handleSearchSubmit} value={searchTerm} />
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 mt-8">
          {filteredData.map((product) => (
            <div key={product.product_id} className="flex flex-col">
              <div onClick={() => router.push(`/itemDetail?${product.product_id}`)}>
                <div>
                  <Image
                    src={product.image_url}
                    width={150}
                    height={150}
                    alt={product.product_name}
                    className="mx-auto cursor-pointer"
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
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col text-center text-black">
          <p className="mb-4 text-gray-400 text-left">검색 결과</p>
          <p className="text-left">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  )
}

export default ItemSearch

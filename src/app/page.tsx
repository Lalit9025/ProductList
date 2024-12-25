'use client'

import React, { useEffect, useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { Filters } from '@/components/filters'
import { getProducts } from '@/utils/api'
import type {  FilterState } from '@/types/product'
import '../styles/product-listing.css'
import Link from 'next/link'
import ProductList from '../utils/productList.json'

export default function ProductListingPage() {
  const [products, setProducts] = useState<any>([])
  const [filteredProducts, setFilteredProducts] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts()
        setProducts(data.products)
        console.log("PRODUCTlIST", data.products);
        console.log("pRODUCT", ProductList.products)
        setFilteredProducts(data.products)
      } catch (err) {
        setError('Failed to load products. Please try again later.')
        setProducts(ProductList.products)
        setFilteredProducts(ProductList.products)

      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...products]

    if (filters.type === 'onSale') {
      filtered = filtered.filter((product) => product.onSale)
    } else if (filters.type === 'normal') {
      filtered = filtered.filter((product) => !product.onSale)
    }

    filtered = filtered.filter(
      (product) =>
        product.salePrice >= filters.priceRange.min && product.salePrice <= filters.priceRange.max
    )

    setFilteredProducts(filtered)
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }



  return (
    <div className="container">
    
      <div className="layout">
        <aside>
          <Filters onFilterChange={handleFilterChange} products={products} />
        </aside>
        <main>
          <div className="product-grid">
            {filteredProducts.map((product) => {
              return <Link href = {`/product/${product.sku}`} className='product_link'>
                <ProductCard key={product.sku} product={product} />
              </Link>;
            })}
          </div>
          {filteredProducts.length === 0 && (
            <div className="no-results">
              No products match your selected filters.
            </div>
          )}
        </main>
      </div>
    </div>
  )
}


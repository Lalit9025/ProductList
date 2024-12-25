'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { Product } from '@/types/product'
import { getProduct } from '@/utils/api'
import styles from '@/styles/product-detail.module.css'

export default function ProductPage({ params }: { params: { sku: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState('65"')

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProduct(params.sku)
        setProduct(data)
      } catch (err) {
        setError('Failed to load product. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.sku])

  if (loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (error || !product) {
    return <div className={styles.error}>{error}</div>
  }

  const sizes = ['55"', '65"', '77"']

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
          />
        </div>
      </div>
      <div className="div side">
      <div className={styles.details}>
          <div className={styles.header}>
            <h1 className={styles.productName}>{product.name}</h1>
            <div className={styles.modelInfo}>
               SKU: {product.sku}
            </div>
            
          </div>
        </div>

        <div className={styles.pricing}>
            <div className={styles.mainPrice}>
              <span className={styles.currentPrice}>${product.salePrice}</span>
              {product.onSale && (
                <span className={styles.savings}>
                  Save ${product.regularPrice - product.salePrice}
                </span>
              )}
            </div>
            {product.onSale && (
              <div className={styles.originalPrice}>
                Was ${product.regularPrice}
              </div>
            )}
            <div className={styles.financing}>
              <span className={styles.monthlyPrice}>${(product.salePrice / 24).toFixed(2)}/mo.*</span>
              <span className={styles.financingInfo}>
                suggested payments with<br />
                24-Month Financing.
              </span>
            </div>
          </div>

          <div className={styles.options}>
            <div className={styles.optionSection}>
              <span className={styles.optionLabel}>Screen Size Class:</span>
              <div className={styles.sizeSelector}>
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`${styles.sizeOption} ${selectedSize === size ? styles.selected : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
      </div>
    </div>
    
  )
}


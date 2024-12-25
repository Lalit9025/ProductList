import axios from 'axios'
import type { Product, ProductsResponse } from '@/types/product'

const API_KEY = 'xB7rDkDCldT2DlTp7jsHaJU7'
const BASE_URL = 'https://api.bestbuy.com/v1'

export async function getProducts(): Promise<ProductsResponse> {
  try {
    const response = await axios.get(
      `${BASE_URL}/products(categoryPath.name="All Flat-Screen TVs")?format=json&show=sku,name,salePrice,image,regularPrice,onSale&sort=salePrice&apiKey=${API_KEY}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }
}

export async function getProduct(sku: string): Promise<Product> {
  try {
    const response = await axios.get(`${BASE_URL}/products/${sku}.json?apiKey=${API_KEY}`)
    return response.data
  } catch (error) {
    console.error('Error fetching product:', error)
    throw new Error('Failed to fetch product')
  }
}


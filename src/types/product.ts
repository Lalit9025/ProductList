export interface Product {
    sku: string
    name: string
    salePrice: number
    regularPrice: number
    onSale: boolean
    image: string
  }
  
  export interface ProductsResponse {
    products: Product[]
    total: number
    currentPage: number
    totalPages: number
  }
  
  export interface PriceRange {
    min: number
    max: number
  }
  
  export interface FilterState {
    type: 'all' | 'onSale' | 'normal'
    priceRange: PriceRange
  }
  
  
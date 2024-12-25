import React, { useState, useMemo } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import type { FilterState, PriceRange, Product } from '@/types/product'
import '../styles/filters.css'

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void
  products: Product[]
}

export function Filters({ onFilterChange, products }: FiltersProps) {
  const [type, setType] = useState<'all' | 'onSale' | 'normal'>('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedRanges, setSelectedRanges] = useState<number[]>([])

  const priceRanges = useMemo(() => {
    if (!products.length) return []

    const prices = products.map(p => p.salePrice).sort((a, b) => a - b)
    const minPrice = Math.floor(prices[0])
    const maxPrice = Math.ceil(prices[prices.length - 1])
    const range = maxPrice - minPrice
    const step = Math.ceil(range / 8)

    const ranges = []
    for (let i = 0; i < 7; i++) {
      const min = minPrice + (step * i)
      const max = minPrice + (step * (i + 1)) - 0.01
      ranges.push({
        label: `$${min.toFixed(0)} - $${max.toFixed(2)}`,
        min,
        max
      })
    }
    ranges.push({
      label: `$${(minPrice + (step * 7)).toFixed(0)} and Up`,
      min: minPrice + (step * 7),
      max: Infinity
    })

    return ranges
  }, [products])

  const handleTypeChange = (value: 'all' | 'onSale' | 'normal') => {
    setType(value)
    onFilterChange({
      type: value,
      priceRange: getPriceRange()
    })
  }

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilterChange({
      type,
      priceRange: getPriceRange()
    })
  }

  const handleRangeToggle = (index: number) => {
    setSelectedRanges(prev => {
      const newRanges = prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
      
      if (newRanges.length > 0) {
        setMinPrice('')
        setMaxPrice('')
      }
      
      return newRanges
    })

    onFilterChange({
      type,
      priceRange: getPriceRange(index)
    })
  }

  const getPriceRange = (toggledIndex?: number): PriceRange => {
    if (minPrice || maxPrice) {
      return {
        min: Number(minPrice) || 0,
        max: Number(maxPrice) || Infinity
      }
    }

    if (typeof toggledIndex === 'number') {
      const newRanges = selectedRanges.includes(toggledIndex)
        ? selectedRanges.filter(i => i !== toggledIndex)
        : [...selectedRanges, toggledIndex]

      if (newRanges.length === 0) {
        return { min: 0, max: Infinity }
      }

      return {
        min: Math.min(...newRanges.map(i => priceRanges[i].min)),
        max: Math.max(...newRanges.map(i => priceRanges[i].max))
      }
    }

    if (selectedRanges.length === 0) {
      return { min: 0, max: Infinity }
    }

    return {
      min: Math.min(...selectedRanges.map(i => priceRanges[i].min)),
      max: Math.max(...selectedRanges.map(i => priceRanges[i].max))
    }
  }

  return (
    <div className="filters-container">
      <div className="filter-section">
        <h3 className="filter-title">TV Type</h3>
        <div className="checkbox-list">
          <Checkbox
            label="All TVs"
            checked={type === 'all'}
            onChange={() => handleTypeChange('all')}
          />
          <Checkbox
            label="On Sale"
            checked={type === 'onSale'}
            onChange={() => handleTypeChange('onSale')}
          />
          <Checkbox
            label="Normal"
            checked={type === 'normal'}
            onChange={() => handleTypeChange('normal')}
          />
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Price</h3>
        <form onSubmit={handlePriceSubmit}>
          <div className="price-inputs">
            <Input
              type="number"
              placeholder="min."
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="price-input"
            />
            <span>to</span>
            <Input
              type="number"
              placeholder="max."
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="price-input"
            />
            <Button type="submit" variant="ghost">
              →
            </Button>
          </div>

          <div className="checkbox-list">
            {priceRanges.map((range, index) => (
              <Checkbox
                key={range.label}
                label={range.label}
                checked={selectedRanges.includes(index)}
                onChange={() => handleRangeToggle(index)}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}


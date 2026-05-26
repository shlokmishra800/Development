import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineAdjustments, HiOutlineX } from 'react-icons/hi'
import ProductCard from '../components/ProductCard'
import { getProductsByCategory } from '../data/products'

const Men = () => {
  const [sortBy, setSortBy] = useState('featured')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [priceRange, setPriceRange] = useState([0, 300])

  const products = useMemo(() => getProductsByCategory('men'), [])

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38']
  const colors = ['White', 'Black', 'Navy', 'Gray', 'Blue', 'Khaki', 'Olive']

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by size
    if (selectedSizes.length > 0) {
      result = result.filter(product => 
        product.sizes.some(size => selectedSizes.includes(size))
      )
    }

    // Filter by color
    if (selectedColors.length > 0) {
      result = result.filter(product =>
        product.colors.some(color => 
          selectedColors.some(selected => 
            color.toLowerCase().includes(selected.toLowerCase())
          )
        )
      )
    }

    // Filter by price
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result.reverse()
        break
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [products, selectedSizes, selectedColors, priceRange, sortBy])

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
  }

  const clearFilters = () => {
    setSelectedSizes([])
    setSelectedColors([])
    setPriceRange([0, 300])
  }

  const hasActiveFilters = selectedSizes.length > 0 || selectedColors.length > 0 || priceRange[0] > 0 || priceRange[1] < 300

  return (
    <div className="min-h-screen bg-gradient-to-b from-men-light via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 to-blue-50/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-4"
            >
              Men's Collection
            </motion.span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900">
              Refined Essentials for the
              <span className="block mt-2 bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                Modern Man
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of premium menswear designed for comfort, 
              style, and lasting quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilterOpen(!filterOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  filterOpen || hasActiveFilters
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <HiOutlineAdjustments className="w-5 h-5" />
                Filters
                {hasActiveFilters && (
                  <span className="w-5 h-5 bg-white text-gray-900 rounded-full text-xs flex items-center justify-center font-semibold">
                    {selectedSizes.length + selectedColors.length}
                  </span>
                )}
              </motion.button>

              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Clear all
                </motion.button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {filteredProducts.length} products
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-gray-400"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Filters Panel */}
          <motion.div
            initial={false}
            animate={{ height: filterOpen ? 'auto' : 0, opacity: filterOpen ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100 shadow-sm">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Sizes */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedSizes.includes(size)
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Color</h4>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedColors.includes(color)
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Active Filters Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedSizes.map((size) => (
                <motion.span
                  key={size}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  Size: {size}
                  <button onClick={() => toggleSize(size)} className="p-0.5 hover:bg-gray-200 rounded-full">
                    <HiOutlineX className="w-4 h-4" />
                  </button>
                </motion.span>
              ))}
              {selectedColors.map((color) => (
                <motion.span
                  key={color}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {color}
                  <button onClick={() => toggleColor(color)} className="p-0.5 hover:bg-gray-200 rounded-full">
                    <HiOutlineX className="w-4 h-4" />
                  </button>
                </motion.span>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index % 5} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
              <button onClick={clearFilters} className="btn-primary">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Men

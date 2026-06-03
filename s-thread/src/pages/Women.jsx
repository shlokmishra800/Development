import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineAdjustments, HiOutlineX } from 'react-icons/hi'
import ProductCard from '../components/ProductCard'
import { getProductsByCategory } from '../data/products'

const Women = () => {
  const [sortBy, setSortBy] = useState('featured')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [priceRange, setPriceRange] = useState([0, 300])

  const products = useMemo(() => getProductsByCategory('women'), [])

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '24', '25', '26', '27', '28', '29', '30', '31', '32']
  const colors = ['White', 'Black', 'Pink', 'Blush', 'Navy', 'Cream', 'Burgundy', 'Rose']

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (selectedSizes.length > 0) {
      result = result.filter(product => 
        product.sizes.some(size => selectedSizes.includes(size))
      )
    }

    if (selectedColors.length > 0) {
      result = result.filter(product =>
        product.colors.some(color => 
          selectedColors.some(selected => 
            color.toLowerCase().includes(selected.toLowerCase())
          )
        )
      )
    }

    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

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
    <div className="min-h-screen bg-gradient-to-b from-women-light via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-rose-50/30" />
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
              className="inline-block px-4 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium mb-4"
            >
              Women's Collection
            </motion.span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900">
              Elegant Styles for
              <span className="block mt-2 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Every Occasion
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our stunning collection of women's fashion, from everyday essentials 
              to show-stopping statement pieces.
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
                    ? 'border-pink-500 bg-pink-500 text-white'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <HiOutlineAdjustments className="w-5 h-5" />
                Filters
                {hasActiveFilters && (
                  <span className="w-5 h-5 bg-white text-pink-500 rounded-full text-xs flex items-center justify-center font-semibold">
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
                className="px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-pink-300"
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
            <div className="bg-white rounded-2xl p-6 mb-8 border border-pink-100 shadow-sm">
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
                            ? 'bg-pink-500 text-white'
                            : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
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
                            ? 'bg-pink-500 text-white'
                            : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
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
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-pink-500"
                    />
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
                  className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 rounded-full text-sm text-pink-700"
                >
                  Size: {size}
                  <button onClick={() => toggleSize(size)} className="p-0.5 hover:bg-pink-200 rounded-full">
                    <HiOutlineX className="w-4 h-4" />
                  </button>
                </motion.span>
              ))}
              {selectedColors.map((color) => (
                <motion.span
                  key={color}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 rounded-full text-sm text-pink-700"
                >
                  {color}
                  <button onClick={() => toggleColor(color)} className="p-0.5 hover:bg-pink-200 rounded-full">
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
              <div className="text-6xl mb-4">💝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
              <button onClick={clearFilters} className="btn-primary bg-pink-500 hover:bg-pink-600">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Women

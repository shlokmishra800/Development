import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineHeart, HiHeart, HiOutlineShoppingBag, HiOutlineStar } from 'react-icons/hi'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product, index = 0 }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[Math.floor(product.sizes.length / 2)], // Default to middle size
      color: product.colors[0]
    })
  }

  const handleLike = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`}>
        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="group relative bg-white rounded-2xl overflow-hidden card-hover"
        >
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {discount > 0 && (
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                  -{discount}%
                </span>
              )}
              {product.featured && (
                <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-semibold rounded-full">
                  Featured
                </span>
              )}
            </div>

            {/* Like Button */}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 text-gray-700 hover:bg-white'
              }`}
            >
              {isLiked ? (
                <HiHeart className="w-5 h-5" />
              ) : (
                <HiOutlineHeart className="w-5 h-5" />
              )}
            </motion.button>

            {/* Quick Add Button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleQuickAdd}
              className="absolute bottom-4 left-4 right-4 py-3 bg-white text-gray-900 font-medium rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-gray-50 transition-colors"
            >
              <HiOutlineShoppingBag className="w-5 h-5" />
              Quick Add
            </motion.button>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-medium text-gray-900 truncate group-hover:text-gray-700 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 capitalize mt-0.5">{product.category}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                {product.originalPrice && (
                  <p className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <HiOutlineStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) 
                        ? 'text-amber-400 fill-amber-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviews})
              </span>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 1 && (
              <div className="flex items-center gap-1 mt-3">
                <span className="text-xs text-gray-500">{product.colors.length} colors</span>
              </div>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default ProductCard

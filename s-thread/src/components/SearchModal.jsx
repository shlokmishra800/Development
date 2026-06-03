import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineSearch, HiOutlineX, HiOutlineMicrophone } from 'react-icons/hi'
import { searchProducts } from '../data/products'

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isListening, setIsListening] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchProducts(query)
      setResults(searchResults.slice(0, 8))
    } else {
      setResults([])
    }
  }, [query])

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser. Please try Chrome.')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setQuery(transcript)
      setIsListening(false)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
    onClose()
    setQuery('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          onKeyDown={handleKeyDown}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="w-full max-w-2xl mx-auto mt-20 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center p-4 border-b border-gray-100">
                <HiOutlineSearch className="w-6 h-6 text-gray-400 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 text-lg outline-none placeholder:text-gray-400"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleVoiceSearch}
                  className={`p-2 rounded-full mr-2 transition-colors ${
                    isListening 
                      ? 'bg-red-100 text-red-500' 
                      : 'hover:bg-gray-100 text-gray-500'
                  }`}
                >
                  <HiOutlineMicrophone className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
                >
                  <HiOutlineX className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Voice Listening Indicator */}
              {isListening && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-3 bg-red-50 text-red-600 text-sm flex items-center"
                >
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
                  Listening... Speak now
                </motion.div>
              )}

              {/* Results */}
              {results.length > 0 && (
                <div className="max-h-96 overflow-y-auto custom-scrollbar">
                  {results.map((product, index) => (
                    <motion.button
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors text-left"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div className="ml-4 flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                      </div>
                      <span className="font-semibold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* No Results */}
              {query && results.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <p>No products found for "{query}"</p>
                </div>
              )}

              {/* Quick Links */}
              {!query && (
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-3">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Dresses', 'Shirts', 'Kids Wear', 'Jackets', 'Summer Collection'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchModal

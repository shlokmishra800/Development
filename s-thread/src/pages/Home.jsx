import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiOutlineSparkles } from 'react-icons/hi'
import ProductCard from '../components/ProductCard'
import { products, getFeaturedProducts } from '../data/products'

const Home = () => {
  const [featuredProducts] = useState(getFeaturedProducts())
  const [allProducts] = useState(products)

  const categories = [
    {
      name: 'Men',
      path: '/men',
      image: 'https://i.pinimg.com/736x/1c/9c/f9/1c9cf9df2e430c561a0f5f731632ad44.jpg',
      gradient: 'from-sky-100 to-blue-50',
      description: 'Refined essentials for the modern man'
    },
    {
      name: 'Women',
      path: '/women',
      image: 'https://i.pinimg.com/736x/9c/e5/52/9ce55242223c16bb6956d1f8fe2f47f7.jpg',
      gradient: 'from-pink-100 to-rose-50',
      description: 'Elegant styles for every occasion'
    },
    {
      name: 'Children',
      path: '/children',
      image: 'https://tse4.mm.bing.net/th/id/OIP.H44jsEtzS2pIY-9gk5gdngHaLL?r=0&cb=thfvnextfalcon&w=1100&h=1661&rs=1&pid=ImgDetMain&o=7&rm=3',
      gradient: 'from-yellow-100 via-orange-50 to-green-50',
      description: 'Playful designs for little ones'
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-pink-100/30 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/5 rounded-full text-sm font-medium text-gray-700 mb-6"
              >
                <HiOutlineSparkles className="w-4 h-4" />
                New Summer Collection 2024
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight"
              >
                <span className="gradient-text">Elevate</span> Your
                <br />
                <span className="text-gray-900">Everyday Style</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0"
              >
                Discover premium clothing crafted with care for men, women, and children. 
                Where quality meets timeless fashion.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to="/women">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    Shop Women
                    <HiArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/men">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    Shop Men
                  </motion.button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12 grid grid-cols-3 gap-8"
              >
                {[
                  { value: '50K+', label: 'Happy Customers' },
                  { value: '500+', label: 'Premium Products' },
                  { value: '4.9', label: 'Average Rating' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="space-y-4"
                >
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="https://tse4.mm.bing.net/th/id/OIP.Np6mCIMcQWro4nReRwq9PAAAAA?r=0&cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3"
                      alt="Fashion"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="https://tse2.mm.bing.net/th/id/OIP.qDoCmumAbJq4xp5S11b-IQHaLK?r=0&cb=thfvnextfalcon&w=679&h=1024&rs=1&pid=ImgDetMain&o=7&rm=3"
                      alt="Fashion"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  className="space-y-4 mt-8"
                >
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="https://5.imimg.com/data5/ANDROID/Default/2023/9/345838953/HT/QG/ZB/159822368/product-500x500.jpg"
                      alt="Fashion"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="https://5.imimg.com/data5/SELLER/Default/2023/9/343979125/LD/WZ/NT/88899317/bownbee-printed-half-sleeve-pure-cotton-shirt-and-pure-cotton-kurti-with-pant-dupatta-for-girls-1000x1000.jpg"
                      alt="Fashion"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Free Shipping</div>
                    <div className="text-sm text-gray-500">On orders over $50</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">
              Shop by Category
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated collections for every member of your family
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={category.path}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${category.gradient} p-6 h-96 group`}
                  >
                    <div className="relative z-10">
                      <h3 className="text-2xl font-display font-bold text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mt-2">{category.description}</p>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center gap-2 mt-4 text-gray-900 font-medium"
                      >
                        Shop Now <HiArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                    
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="absolute bottom-0 right-0 w-2/3 h-4/5 object-cover object-top rounded-tl-3xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">
                Featured Collection
              </h2>
              <p className="mt-3 text-gray-600">
                Handpicked styles our customers love
              </p>
            </div>
            <Link to="/" className="mt-4 sm:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center gap-2"
              >
                View All
                <HiArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.slice(0, 8).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">
              Explore All Products
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Browse our complete collection of premium clothing
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {allProducts.slice(0, 15).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index % 5} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/men">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Load More Products
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🚚',
                title: 'Free Shipping',
                description: 'On all orders over $50'
              },
              {
                icon: '↩️',
                title: 'Easy Returns',
                description: '30-day return policy'
              },
              {
                icon: '🔒',
                title: 'Secure Payment',
                description: '100% secure checkout'
              },
              {
                icon: '💬',
                title: '24/7 Support',
                description: 'Here to help anytime'
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

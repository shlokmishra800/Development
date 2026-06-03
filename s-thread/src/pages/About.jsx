import { motion } from 'framer-motion'
import myphoto from './myphoto.jpeg'
import { HiOutlineHeart, HiOutlineGlobe, HiOutlineSparkles, HiOutlineUserGroup } from 'react-icons/hi'

const About = () => {
  const values = [
    {
      icon: HiOutlineHeart,
      title: 'Quality First',
      description: 'We believe in crafting clothing that lasts. Every piece is made with premium materials and meticulous attention to detail.'
    },
    {
      icon: HiOutlineGlobe,
      title: 'Sustainability',
      description: 'We\'re committed to reducing our environmental footprint through eco-friendly practices and responsible sourcing.'
    },
    {
      icon: HiOutlineSparkles,
      title: 'Timeless Design',
      description: 'Our designs blend contemporary trends with classic elegance, creating pieces that transcend seasonal fashion.'
    },
    {
      icon: HiOutlineUserGroup,
      title: 'Family Focus',
      description: 'From kids to adults, we create clothing that brings families together with style and comfort for everyone.'
    },
  ]

  const team = [
    {
      name: 'Shlok Mishra',
      role: 'Founder & Creative Director',
      image: myphoto ,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700 mb-6"
            >
              Our Story
            </motion.span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight">
              Fashion That Brings
              <span className="block gradient-text">Families Together</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              S-Thread was born from a simple idea: everyone deserves to look and feel their best. 
              We create premium clothing that celebrates individuality while bringing families 
              together through shared style and quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">
                Crafted with Care, Worn with Pride
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded with a passion for quality and design, S-Thread has grown from a small 
                  boutique into a beloved destination for fashion-forward families. Our journey 
                  began with a commitment to creating clothing that doesn't just look good—it 
                  feels good and stands the test of time.
                </p>
                <p>
                  Every thread we weave, every stitch we make, reflects our dedication to 
                  excellence. We work with skilled artisans and sustainable suppliers to bring 
                  you pieces that you'll treasure for years to come.
                </p>
                <p>
                  Today, S-Thread serves thousands of happy customers worldwide, but our mission 
                  remains the same: to help you express your unique style with confidence and comfort.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://i.pinimg.com/736x/94/b0/28/94b028132e7ca9321acb0656955cad46.jpg"
                  alt="Fashion"
                  className="rounded-2xl shadow-lg"
                />
                <img
                  src="https://tse1.explicit.bing.net/th/id/OIP.aK8VzY9mwIt7jAW424Dr1wHaLH?r=0&cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Fashion"
                  className="rounded-2xl shadow-lg mt-8"
                />
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6"
              >
                <div className="text-4xl font-bold gradient-text">10+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">
              Our Values
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at S-Thread
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '50K+', label: 'Happy Customers' },
              { value: '500+', label: 'Products' },
              { value: '30+', label: 'Countries' },
              { value: '99%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl sm:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">
              Meet the Creator
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              The passionate individual behind S-Thread
            </p>
          </motion.div>

          <div className="flex justify-center">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-100 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6">
              Ready to Elevate Your Style?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Explore our collections and discover the perfect pieces for you and your family.
            </p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block btn-primary text-lg"
            >
              Shop Now
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Creator Credit */}
      <section className="py-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">
            Created with ❤️ by <span className="font-semibold text-gray-700">Shlok Mishra</span>
          </p>
        </div>
      </section>
    </div>
  )
}

export default About

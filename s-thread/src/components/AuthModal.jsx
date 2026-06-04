import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineX, HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook, FaApple } from 'react-icons/fa'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const AuthModal = ({ isOpen, onClose, mode, setMode, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  // Check if SDK keys are configured
  const checkConfigured = (provider) => {
    const googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    const facebookId = import.meta.env.VITE_FACEBOOK_APP_ID
    const appleId = import.meta.env.VITE_APPLE_CLIENT_ID

    if (provider === 'google') {
      return googleId && !googleId.includes('YOUR_') && !googleId.includes('placeholder')
    }
    if (provider === 'facebook') {
      return facebookId && !facebookId.includes('YOUR_') && !facebookId.includes('placeholder')
    }
    if (provider === 'apple') {
      return appleId && !appleId.includes('YOUR_') && !appleId.includes('placeholder')
    }
    return false
  }

  // Handle Google Login Callback
  const handleGoogleCredentialResponse = async (response) => {
    setIsLoading(true)
    setError(null)
    try {
      // Decode the Google ID token JWT on client to extract name and email
      const base64Url = response.credential.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      const payload = JSON.parse(jsonPayload)

      if (!payload.email) {
        throw new Error('Google account email not shared.')
      }

      await submitSocialLogin(payload.name, payload.email, 'google')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Google authentication failed.')
      setIsLoading(false)
    }
  }

  // Initialize Google Identity Services
  useEffect(() => {
    if (isOpen && window.google && checkConfigured('google')) {
      try {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse
        })
      } catch (err) {
        console.error('Error initializing Google SDK:', err)
      }
    }
  }, [isOpen])

  // Real Social Login Triggers
  const handleSocialLogin = (provider) => {
    setError(null)
    
    if (provider === 'google') {
      if (!checkConfigured('google')) {
        setError('Google Login requires configuration. Please set your real Google Client ID in s-thread/.env')
        return
      }
      if (window.google) {
        window.google.accounts.id.prompt()
      } else {
        setError('Google SDK failed to load. Please check your internet connection.')
      }
    } 
    
    else if (provider === 'facebook') {
      if (!checkConfigured('facebook')) {
        setError('Facebook Login requires configuration. Please set your real Facebook App ID in s-thread/.env')
        return
      }
      if (window.FB) {
        try {
          window.FB.init({
            appId: import.meta.env.VITE_FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v18.0'
          })

          window.FB.login((response) => {
            if (response.authResponse) {
              window.FB.api('/me', { fields: 'name,email' }, async (profile) => {
                if (profile.email) {
                  await submitSocialLogin(profile.name, profile.email, 'facebook')
                } else {
                  setError('Could not retrieve email address from Facebook account.')
                }
              })
            }
          }, { scope: 'public_profile,email' })
        } catch (err) {
          setError('Facebook Sign-In failed: ' + err.message)
        }
      } else {
        setError('Facebook SDK failed to load. Please check your internet connection.')
      }
    } 
    
    else if (provider === 'apple') {
      if (!checkConfigured('apple')) {
        setError('Apple Sign-In requires configuration. Please set your real Apple Client ID in s-thread/.env')
        return
      }
      if (window.AppleID) {
        try {
          window.AppleID.auth.init({
            clientId: import.meta.env.VITE_APPLE_CLIENT_ID,
            scope: 'name email',
            redirectURI: window.location.origin,
            usePopup: true
          })

          window.AppleID.auth.signIn()
            .then(async (response) => {
              const base64Url = response.authorization.id_token.split('.')[1]
              const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
              const jsonPayload = decodeURIComponent(
                atob(base64)
                  .split('')
                  .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                  .join('')
              )
              const payload = JSON.parse(jsonPayload)
              await submitSocialLogin(payload.email.split('@')[0], payload.email, 'apple')
            })
            .catch((err) => {
              console.error(err)
              setError('Apple Login cancelled or failed.')
            })
        } catch (err) {
          setError('Apple Sign-In failed: ' + err.message)
        }
      } else {
        setError('Apple Sign-In SDK failed to load. Please check your internet connection.')
      }
    }
  }

  // Common endpoint submission
  const submitSocialLogin = async (name, email, provider) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/auth/social-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, provider })
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Social authentication failed.')
      }

      // Save session credentials
      localStorage.setItem('s-thread-token', data.token)
      localStorage.setItem('s-thread-user', JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email
      }))

      if (onSuccess) {
        onSuccess(`Welcome back, ${data.name}! Login successful.`, 'success')
      }

      onClose()
    } catch (err) {
      console.error(err)
      setError(err.message || 'Social verification failed.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register'
      const payload = mode === 'login'
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password }

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed. Please check your credentials.')
      }

      localStorage.setItem('s-thread-token', data.token)
      localStorage.setItem('s-thread-user', JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email
      }))

      const successMessage = mode === 'login'
        ? `Welcome back, ${data.name}! Login successful.`
        : `Account created successfully! Welcome to S-Thread, ${data.name}.`

      if (onSuccess) {
        onSuccess(successMessage, 'success')
      }

      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
      onClose()
    } catch (err) {
      console.error(err)
      setError(err.message || 'Network error: could not connect to server.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 pb-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full text-gray-500"
              >
                <HiOutlineX className="w-5 h-5" />
              </motion.button>
              
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-display font-bold text-xl">S</span>
                </div>
                <h2 className="text-2xl font-display font-bold text-gray-900">
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {mode === 'login' 
                    ? 'Sign in to continue shopping' 
                    : 'Join S-Thread for exclusive offers'}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">
              {error && (
                <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-2.5 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}
              {mode === 'signup' && (
                <div className="relative">
                  <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="w-5 h-5" />
                  ) : (
                    <HiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {mode === 'signup' && (
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none transition-all"
                    required
                  />
                </div>
              )}

              {mode === 'login' && (
                <div className="flex justify-end">
                  <button type="button" className="text-sm text-gray-600 hover:text-gray-900">
                    Forgot Password?
                  </button>
                </div>
              )}

              <motion.button
                whileHover={isLoading ? {} : { scale: 1.02 }}
                whileTap={isLoading ? {} : { scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full btn-primary py-3 flex items-center justify-center gap-2 ${
                  isLoading ? 'opacity-80 cursor-not-allowed' : ''
                }`}
              >
                {isLoading && (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                {mode === 'login' 
                  ? (isLoading ? 'Signing In...' : 'Sign In') 
                  : (isLoading ? 'Creating Account...' : 'Create Account')}
              </motion.button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-3 gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  className="flex items-center justify-center py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <FcGoogle className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleSocialLogin('facebook')}
                  className="flex items-center justify-center py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <FaFacebook className="w-5 h-5 text-blue-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleSocialLogin('apple')}
                  className="flex items-center justify-center py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <FaApple className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Toggle Mode */}
              <p className="text-center text-gray-600 mt-6">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="font-semibold text-gray-900 hover:underline"
                >
                  {mode === 'login' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AuthModal

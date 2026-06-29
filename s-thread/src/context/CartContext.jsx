import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.size === action.payload.size
      )
      
      if (existingIndex > -1) {
        const updatedItems = [...state.items]
        updatedItems[existingIndex].quantity += 1
        return { ...state, items: updatedItems }
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      }
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(
          item => !(item.id === action.payload.id && item.size === action.payload.size)
        )
      }
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      }
    
    case 'CLEAR_CART':
      return { ...state, items: [] }
    
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    
    case 'SET_CART_OPEN':
      return { ...state, isOpen: action.payload }
    
    default:
      return state
  }
}

const initialState = {
  items: [],
  isOpen: false
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    const savedCart = localStorage.getItem('s-thread-cart')
    return savedCart ? { ...initialState, items: JSON.parse(savedCart) } : initialState
  })
  
  useEffect(() => {
    localStorage.setItem('s-thread-cart', JSON.stringify(state.items))
  }, [state.items])
  
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
    dispatch({ type: 'SET_CART_OPEN', payload: true })
  }
  
  const removeFromCart = (id, size) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id, size } })
  }
  
  const updateQuantity = (id, size, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } })
  }
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  
  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }
  
  const setCartOpen = (isOpen) => {
    dispatch({ type: 'SET_CART_OPEN', payload: isOpen })
  }
  
  const cartTotal = state.items.reduce(
    (total, item) => total + item.price * item.quantity, 0
  )
  
  const cartCount = state.items.reduce(
    (count, item) => count + item.quantity, 0
  )
  
  return (
    <CartContext.Provider value={{
      cart: state.items,
      isCartOpen: state.isOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
      setCartOpen,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

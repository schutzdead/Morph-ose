const initialState = [];

export const initializer = (initialValue = initialState) => {
    if(typeof window !== 'undefined') return JSON.parse(localStorage.getItem("localCart")) || initialValue;
}
        
export function cartReducer(state, action) {
    switch (action.type) {
      case 'ADD_TO_CART': {
        return state.find((article) => article.id === action.id && article.size === action.size)
            ? state.map((article) => 
                article.id === action.id && article.size === action.size
                ? {
                    ...article,
                    quantity:action.quantity
                }
                : article)
            :[...state, {
                id: action.id,
                quantity: action.quantity,
                size: action.size,
                sizeId: action.sizeId,
                title: action.title,
                price : action.price,
                reference: action.reference,
                promo_price: action.promo_price,
                picture: action.picture,
                stock: action.stock
            }]
      }

      case 'REMOVE_FROM_CART': {
        return state.filter(t => 
          (t.id !== action.id && t.size !== action.size) ||
          (t.id === action.id && t.size !== action.size) ||
          (t.id !== action.id && t.size === action.size)
          )
      }   

      case 'UPDATE_CART': {
        return state.find((article) => article.id === action.id && article.size === action.size)
            ? state.map((article) => 
                article.id === action.id && article.size === action.size
                ? {
                    ...article,
                    quantity:action.quantity
                }
                : article)
            : ''
      }   

      case "CLEAR_CART":
        return initialState;

    default:
        return state;
    }
  };

export const removeCart = (art) => ({
    type: 'REMOVE_FROM_CART',
    id:art.id,
    size:art.size
})



import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const newPrice = action.price || 0; // Set a default value of 0 if price is not provided
  return [
    ...state,
    {
      id: action.id,
      name: action.name,
      qty: action.qty,
      size: action.size,
      price: newPrice,
      img: action.img,
    },
  ];
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "DROP":
            let empArray = []
            return empArray
            case "UPDATE":
                let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr
        default:
            console.log("Error in Reducer");
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []); // Pass an empty array as the initial state

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);



// import React, { useState, useContext, createContext } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartData, setCartData] = useState([]);

//   return (
//     <CartContext.Provider value={{ cartData, setCartData }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context.cartData;
// };

// export const useDispatchCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useDispatchCart must be used within a CartProvider');
//   }
//   return context.setCartData;
// };



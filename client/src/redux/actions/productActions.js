import t from '../types/productTypes'
import axios from "axios";
import {store} from '../index'
import productTypes from '../types/productTypes';


export const fetchProducts = () => {
    return (dispatch) => {
        axios.get('/api/v1/products')
            .then(({ data }) => dispatch({ type: productTypes.FETCH_PRODUCTS, products: data }))
            .catch((error) => {
                console.error('Error fetching products:', error);
                alert('Ошибка при получении продуктов');
            });
    };
};

export const fetchProduct = (productId) => {
    return (dispatch) => {
        axios.get(`/api/v1/products/${productId}`)
            .then(({ data }) => {
                dispatch({ type: productTypes.FETCH_PRODUCT, product: data });
            })
            .catch((error) => {
                console.error(`Error fetching product with ID ${productId}:`, error);
                if (error.response) {
                    console.error(error.response.data);
                    console.error(error.response.status);
                    console.error(error.response.headers);
                } else if (error.request) {
                    console.error(error.request);
                } else {
                    console.error('Error', error.message);
                }
                alert('Ошибка при получении продукта');
            });
    };
};


export const deleteProduct = (productId) => {
    return (dispatch) => {
        axios.delete(`/api/v1/products/${productId}`)
            .then((response) => {
                if (response.data.deletedProduct) {
                    alert(`Продукт ${response.data.deletedProduct.title} был удален`);
                    dispatch({ type: t.DELETE_PRODUCT, productId });
                } else {
                    alert(`Продукт с ID ${productId} не найден`);
                }
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
                console.error('Error details:', error.response.data);
                alert("Ошибка при удалении продукта");
            });
    };
};


export const getProducts = () => {
    return (dispatch) => {
        axios("/api/v1/products")
            .then(({data}) => dispatch({type: t.GET_PRODUCTS, products: data}))
    }
}

export const addToCart = (product) => {
    const cart = {...store.getState()?.products.cart}
    let newCart
    alert("Продукт добавлен в корзину!")
    if (cart[product._id]) {
        newCart = {...cart, [product._id]: {...product, count: cart[product._id].count + 1}}
    } else {
        newCart = {...cart, [product._id]: {...product, count: 1} }
    }
    localStorage.setItem('cart', JSON.stringify(newCart))
    return {type: t.UPDATE_CART, cart: newCart}
}


export const removeFromCart = (product) => {
    let cart = {...store.getState()?.products.cart}

    if(cart[product._id]) {
        if(cart[product._id].count > 1) {
            cart = {...cart, [product._id]: {...product, count: cart[product._id].count-1}}
        }else{
            delete cart[product._id]
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    return {type: t.UPDATE_CART, cart}
}

export const removeAllFromCart = (id) => {
    return(dispatch, getState) => {
        const store = getState()
        let {cart} = store.products
        delete cart[id]
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({type: t.UPDATE_CART, cart})
    }
}

export const clearCart = () => {
    localStorage.removeItem('cart')
    return {type: t.UPDATE_CART, cart: {}}
}

// export const getRates = () => {
//     return (dispatch) => {
//         axios("https://api.exchangerate.host/latest?base=USD&symbols=RUB,KGS,USD")
//             .then(({data}) => dispatch({type: t.GET_RATES, rates: data.rates}))
//     }
// }



export const getRates = () => {
    return (dispatch) => {
        axios("https://api.exchangerate.host/latest?base=USD&symbols=RUB,KGS,USD")
            .then(({ data }) => {
                dispatch({ type: t.GET_RATES, rates: data.rates });
            })
            .catch((error) => {
                console.error("Ошибка при получении данных о курсах обмена:", error);
            });
    };
}


export const changeRate = (rate) => {
    return {type: t.CHANGE_RATE, current: rate}
}

export const sortByPrice = () => {
    return (dispatch, getState) => {
        const store = getState()
        const {sortByPrice, products, cart} = store.products
        let sortedProducts
        let sortedCart

        if (sortByPrice > 0) {
            sortedProducts = products.sort((a, b) => a.price - b.price)
            sortedCart = Object.fromEntries(Object.entries(cart).sort((a, b) => a[1].price - b[1].price))
        }else{
            sortedProducts = products.sort((a, b) => b.price - a.price)
            sortedCart = Object.fromEntries(Object.entries(cart).sort((a, b) => b[1].price - a[1].price))
        }
        dispatch({type: t.CHANGE_SORT, products:sortedProducts, cart: sortedCart})
    }
}

export const changeSearchValue = (value) => {
    return {type: t.CHANGE_SEARCH_VALUE, searchValue: value}

}


export const orderPlacing = () => ({
    type: productTypes.ORDER_PLACING,
  });
  
  export const orderSuccess = () => ({
    type: productTypes.ORDER_SUCCESS,
});

export const orderFailure = () => ({
    type: productTypes.ORDER_FAILURE,
});

export const orderProduct = ({ userId, productIds, totalAmount }) => {
    return async (dispatch, getState) => {
      try {
        const state = getState();
        const { products, auth } = state;
  
        if (!auth || !auth.user || !auth.user._id) {
          console.error("Пользователь не аутентифицирован. Состояние аутентификации:", auth);
          throw new Error('Пользователь не аутентифицирован');
        }
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`
          }
        };
  
        const orderData = {
          userId,
          productIds,
          totalAmount
        };
  
        dispatch({ type: productTypes.ORDER_PLACING });
  
        try {
          const response = await axios.post('/api/v1/orders', orderData, config);
  
          dispatch({ type: productTypes.ORDER_SUCCESS, payload: response.data });
  
          return response.data;
        } catch (error) {
          console.error('Ошибка при размещении заказа:', error.response);
          dispatch({ type: productTypes.ORDER_FAILURE, error: error.response.data });
        }
      } catch (error) {
        console.error('Ошибка при размещении заказа:', error);
        dispatch({ type: productTypes.ORDER_FAILURE, error });
      }
    };
  };
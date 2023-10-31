import t from '../types/productTypes'
import axios from "axios";
import {store} from '../index'

export const getProducts = () => {
    return (dispatch) => {
        axios("/api/v1/products")
            .then(({data}) => dispatch({type: t.GET_PRODUCTS, products: data}))
    }
}

export const addToCart = (product) => {
    const cart = {...store.getState()?.products.cart}
    let newCart
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
                // Здесь вы можете выполнить другие действия при ошибке, если необходимо
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
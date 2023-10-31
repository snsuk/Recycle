import t from "../types/productTypes"

const initialState = {
    products: [],
    cart: JSON.parse(localStorage.getItem('cart')) || {},
    rates: {},
    currentRate: ["USD", "$"],
    sortByPrice: 1,
    searchValue: "",
    isLoading: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case t.GET_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                products: action.products
            }

        case t.UPDATE_CART:
            return {
                ...state,
                cart: action.cart
            }

        case t.GET_RATES:
            return {
                ...state,
                rates: action.rates
            }

        case t.CHANGE_RATE:
            return {
                ...state,
                currentRate: action.current
            }

        case t.CHANGE_SORT:
            return {
                ...state,
                products: action.products,
                cart: action.cart,
                sortByPrice: -state.sortByPrice
            }

        case t.CHANGE_SEARCH_VALUE:
            return {
                ...state,
                searchValue: action.searchValue
            }

        default: return state
    }
}

export default reducer
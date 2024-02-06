import t from "../types/productTypes"

const initialState = {
    products: [],
    cart: JSON.parse(localStorage.getItem('cart')) || {},
    rates: {},
    currentRate: ["USD", "$"],
    sortByPrice: 1,
    searchValue: "",
    isLoading: true,
    messages: {},
    chats: [],
    comments: [],
    productComments: {},
    orderSuccess: false
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

        case t.DELETE_PRODUCT:
            const deletedProductId = action.deletedProduct ? action.deletedProduct._id : null;
            if (!deletedProductId) {
                return state;
            }

            const updatedProducts = state.products.filter(product => product._id !== deletedProductId);
            return {
                ...state,
                products: updatedProducts,
            };


        case t.CHANGE_SEARCH_VALUE:
            return {
                ...state,
                searchValue: action.searchValue
            };

        case t.FETCH_MESSAGES:
            return {
                ...state,
                messages: {
                    ...state.messages,
                        [action.chatId]: action.messages
                }
            };
    
        case t.ADD_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.message.chat]: [...state.messages[action.message.chat], action.message]
                }
            };
    
        case t.DELETE_MESSAGE:
            return {
                    ...state,
                    messages: {
                        ...state.messages,
                        [action.message.chat]: state.messages[action.message.chat].filter(message => message._id !== action.message._id)
                    }
            };
    
            case t.FETCH_COMMENTS:
                return {
                    ...state,
                    productComments: {
                    ...state.productComments,
                    [action.productId]: action.comments,
                    },
                };

          
                case t.ADD_COMMENT:
                    const updatedComments = state.productComments[action.productId]
                      ? [...state.productComments[action.productId], action.comment]
                      : [action.comment];
                    return {
                      ...state,
                      productComments: {
                        ...state.productComments,
                        [action.productId]: updatedComments,
                      },
                    };
                  
                  
                  
                case t.CLEAR_COMMENTS:
                        return {
                          ...state,
                          productComments: {
                            ...state.productComments,
                            [action.productId]: [], 
                          },
                };
                      
                  
          
              case t.DELETE_COMMENT:
                return {
                  ...state,
                  productComments: {
                    ...state.productComments,
                    [action.productId]: (state.productComments[action.productId] || []).filter(
                      (comment) => comment._id !== action.commentId
                    ),
                  },
                };
                

        case t.FETCH_PRODUCT:
            return {
                ...state,
                product: action.product
            };
            
            case t.FETCH_CHATS:
                return {
                    ...state,
                    chats: action.chats,
                };
    
            case t.ADD_CHAT:
                return {
                    ...state,
                    chats: [...state.chats, action.chat],
                };
            
                case t.ORDER_SUCCESS:
                    console.log('ORDER_SUCCESS received.');
                    return {
                        ...state,
                        orderSuccess: true,
                    };
                
                case t.ORDER_FAILURE:
                    console.log('ORDER_FAILURE received.');
                    return {
                        ...state,
                        orderSuccess: false,
                    };
                

        default: return state
    }
}

export default reducer
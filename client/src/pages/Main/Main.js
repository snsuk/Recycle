import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";
import {changeSearchValue} from '../../redux/actions/productActions';

const Main = () => {
    const dispatch = useDispatch()
    const {products, cart, searchValue} = useSelector(s => s.products)

    useEffect(() => {
        return () => dispatch(changeSearchValue(''))
    }, [dispatch])
    return (
        <div className="mx-2 my-2 p-6 text-center flex ml-auto">
            {
                !products
                    .filter(it => it.title && it.title.toLowerCase().includes(searchValue && searchValue.toLowerCase()) || (searchValue && searchValue.trim()) === ''
                    ).length && <div className="text-center text-2xl">Не найдено!</div>
            }
            <div className="grid px-8 sm:px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {
                    products
                        .filter(it => it.title && it.title.toLowerCase().includes(searchValue && searchValue.toLowerCase()) || (searchValue && searchValue.trim()) === '').map(product => {
                        const count = cart[product._id]?.count || 0
                        return <ProductCard key={product._id} product={product} count={count} />
                    })
                }
            </div>
        </div>
    )

}

export default Main
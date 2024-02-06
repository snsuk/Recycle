import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartRow from "../../components/CartRow/CartRow";
import { clearCart } from "../../redux/actions/productActions";

const Cart = () => {
  const { cart } = useSelector((s) => s.products);
  const dispatch = useDispatch();

  return (
    <section className="container mx-auto sm:p-6 font-mono">
      {!!Object.keys(cart).length ? (
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3 md:w-96">Название</th>
                  <th className="px-4 py-3">Количество</th>
                  <th className="px-4 py-3">Общая стоимость</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {Object.values(cart).map((product) => (
                  <CartRow key={product._id} product={product} />
                ))}
              </tbody>
              <tfoot>
                <tr className="text-gray-700">
                  <td className="px-4 py-3 border"></td>
                  <td className="px-4 py-3 text-md font-semibold border text-center">
                    <button
                      onClick={() => dispatch(clearCart())}
                      className="px-6 py-2 text-white font-semibold bg-red-600 rounded-xl"
                    >
                      Очистить
                    </button>
                  </td>
                  <td className="px-4 py-3 text-md border">
                    <span className="px-2 py-1 font-semibold text-lg leading-tight text-green-700 bg-green-100 rounded-sm">
                      Итого: &nbsp;
                      {Object.values(cart).reduce((acc, it) => {
                        return acc + it.price * it.count;
                      }, 0)}{" "}
                      сом
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center text-3xl font-black">Корзина пустая</div>
      )}
    </section>
  );
};

export default Cart;

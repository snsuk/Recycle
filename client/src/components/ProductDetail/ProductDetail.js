import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams} from 'react-router-dom';
import { fetchProduct, orderProduct } from '../../redux/actions/productActions';
import { addComment, fetchComments } from '../../redux/actions/commentActions';
import CommentForm from '../CommentForm/CommentForm';
import ProductButtons from '../ProductButtons/ProductButtons';
import { createChat } from '../../redux/actions/chatActions';

const ProductDetail = (count) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  
  const { user, isAuth } = useSelector((state) => state.auth);
  const product = useSelector((state) => state.products.product);
  const productSpecificComments = useSelector((state) => state.products.productComments[productId] || []);
  const { isLoading } = useSelector((state) => state.chats) || {};
  const [showAllComments, setShowAllComments] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);



  useEffect(() => {
    dispatch(fetchProduct(productId));
    dispatch(fetchComments(productId));
  }, [dispatch, productId]);

  const handleOrderProduct = async () => {
    if (!user || !user._id) {
      console.error('Пользователь не аутентифицирован или отсутствует идентификатор пользователя');
      navigate("/signin");
      return;
    }
  
    try {
      await dispatch(orderProduct({ userId: user._id, productIds: [product._id], totalAmount: product.price }));
      dispatch(createChat([product.seller], product._id));
      setOrderConfirmed(true); // Подтверждение успешного заказа
      setTimeout(() => setOrderConfirmed(false), 3000); // Скрыть подтверждение через 3 секунды
    } catch (error) {
      console.error('Ошибка при размещении заказа:', error);
    }
  };
  
  const handleCommentSubmit = async (commentData) => {
    if (product && product._id) {
      try {
        await dispatch(addComment(product._id, commentData.text));
        await dispatch(fetchComments(productId));
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };
  

  const handleContactSeller = async () => {
    const sellerId = product?.seller;
    if (!sellerId) {
      console.error('Seller ID is undefined or null');
      return;
    }

    try {
      const response = await fetch('/api/v1/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ participants: [sellerId] }),
      });

      if (!response.ok) {
        console.error('Failed to create chat');
        return;
      }

      const chatData = await response.json();

      navigate(`/chat/${chatData.chat._id}`);
    } catch (error) {
      console.error('Error during contacting seller:', error);
    }
  };

  if (!isAuth) {
    return (
      <div className="container mx-auto max-w-2xl mt-8">
        <div className="text-center">
          <p className="text-red-500">Для просмотра этой страницы необходимо авторизоваться.</p>
          <p className="text-blue-500">Если у вас уже есть аккаунт, <Link to="/signin" className="text-blue-500 hover:underline">войдите.</Link></p>
          <p className="text-blue-500">Если у вас нет аккаунта, <Link to="/signup" className="text-blue-500 hover:underline">зарегистрируйтесь</Link>.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!product || !product._id) {
    return <div className="text-red-500">Product not found</div>;
  }

  const sellerInfo = product.seller ? (
    <div className="text-sm text-gray-500 pb-3 flex items-center justify-center">
      Seller: {product.seller.name}
    </div>
  ) : null;

  return (
    <div className="container mx-auto max-w-2xl mt-8">
      <div className="shadow-lg rounded-lg bg-gray-100 h-full flex flex-col justify-between pb-6">
        <img
          className="object-cover h-72 w-full rounded-t-lg mt-2"
          src={product.image || ''}
          alt={product.title || 'No title'}
        />
        <div className="py-4 px-6 text-center flex-grow">
          <h3 className="text-xl mb-3">{product.title}</h3>
          <div className="mb-3">Цена: {product.price} сом</div>
          <div className="mb-3">Описание: {product.description}</div>
          <div className="flex justify-center">
            <ProductButtons product={product} count={count} />
          </div>
        </div>
        {sellerInfo}
        <div className="flex justify-center">
          <button onClick={handleContactSeller} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Связаться с продавцом
          </button>
        </div>
        <div className="flex justify-center">
          <button onClick={handleOrderProduct} className="bg-green-500 text-white mt-5 px-4 py-2 rounded-md">
            Заказать продукт
          </button>
          {orderConfirmed && <div className="mt-7 ml-3 text-green-600">Заказ успешно размещен!</div>}
        </div>
      </div>
      <div className="bg-gray-100 py-4 px-6 rounded-b-lg">
      <div className="bg-gray-100 py-4 px-6 rounded-b-lg">
        <h4 className="text-xl mb-2">Комментарии ({productSpecificComments.length}):</h4>
        <ul>
          {(showAllComments ? productSpecificComments : productSpecificComments.slice(0, 2)).map((comment, index) => (
            <li key={index}>{comment.text}</li>
          ))}
        </ul>
        {productSpecificComments.length > 2 && (
          <button onClick={() => setShowAllComments(!showAllComments)} className="text-blue-500 mt-2">
            {showAllComments ? "Скрыть комментарии" : `Посмотреть все комментарии (${productSpecificComments.length - 2} ещё)`}
          </button>
        )}
      </div>

      </div>
      {isAuth && <CommentForm productId={product._id} onCommentSubmit={handleCommentSubmit} />}
    </div>
  );
};

export default ProductDetail;

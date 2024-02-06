import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts  } from "../../redux/actions/productActions"
import EditProductForm from "../../components/EditProductForm/EditProductForm";

const AdminPage = () => {
    const dispatch = useDispatch();
    const {products, searchValue} = useSelector((state) => state.products);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const {register, handleSubmit} = useForm();
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
    };

    const handleCancelEdit = () => {
        setSelectedProduct(null);
    };

    const handleUpdateProduct = async (updatedProductData) => {
        try {
            await fetch(`/api/v1/products/${selectedProduct._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProductData),
            });

            dispatch(fetchProducts());

            handleCancelEdit();
        } catch (error) {
            console.error("Error updating product:", error.message);
        }
    };



    const handleDeleteProduct = (productId) => {
        dispatch(deleteProduct(productId));
    };


    useEffect(() => {
        axios.get('/api/v1/auth/admin/users')
            .then(response => {
                if (response.data && response.data.users) {
                    setUsers(response.data.users);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const signUpSubmit = (data) => {
        axios.post('api/v1/auth/signup', data)
            .then(() => {
                alert("Пользователь добавлен!");
            })
            .catch(e => alert(e.response?.data?.message || "Ошибка"));
    };

    const handleDeleteUser = (userId) => {
        axios.delete(`/api/v1/auth/admin/users/${userId}`)
            .then((response) => {
                alert(`Пользователь ${response.data.email} был удалён`)
            })
            .then(response => {
                if (response.data && response.data.user) {
                    setUsers(users.filter(user => user._id !== userId));
                }
            })
            .catch(error => {
                console.error("Error deleting user:", error);
                console.error('Error details:', error.response.data);
                alert("Ошибка при удалении пользователя");
            });
    };


    const handleSearch = () => {
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filteredUsers);
    };

    const handleSearches = () => {
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filteredProducts);
    }

    return (
        <div className="flex flex-col lg:flex-row">
          <div className="container border mb-10 mt-10 bg-white px-10 m-5 lg:mr-20 py-4 lg:rounded-xl w-full lg:w-screen shadow-md ">
            <div className="flex justify-center">
              <h1 className="text-center text-2xl font-semibold text-gray-600 mt-10 lg:mr-5">Управление пользователями</h1>
              <img src="https://cdn4.iconfinder.com/data/icons/help-and-support-2/64/manage-account-profile-personal-submit-512.png" width="100" />
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center w-full ">
              <form onSubmit={handleSubmit(signUpSubmit)} className="mt-10 lg:w-1/2">
                <div className="bg-white px-10 m-5 py-8 rounded-xl w-full lg:max-w-sm lg:w-screen shadow-md ">
                  <div className="space-y-4 ">
                    <h1 className="text-center text-2xl font-semibold text-gray-600">Добавить пользователя</h1>
                    <div>
                      <label htmlFor="name" className="block mb-1 text-gray-600 font-semibold">Username</label>
                      <input {...register('name')} type="text" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" id="name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">Email</label>
                      <input {...register('email')} type="email" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" id="email" />
                    </div>
                    <div>
                      <label htmlFor="password" className="block mb-1 text-gray-600 font-semibold">Password</label>
                      <input {...register('password')} type="password" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" id="password" />
                    </div>
                    <div>
                      <label htmlFor="role" className="block mb-1 text-gray-600 font-semibold">Роль</label>
                      <select {...register('role')} className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full">
                        <option placeholder="choose"></option>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                        <option value="moderator">moderator</option>
                        <option value="seller">seller</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="userType" className="block mb-3 mt-3 text-gray-600 font-semibold">User Type</label>
                    <select {...register('userType')} className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full">
                      <option placeholder="choose"></option>
                      <option value="individual">Individual</option>
                      <option value="legal">Legal</option>
                    </select>
                  </div>
                </div>
                <button className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">Добавить пользователя</button>
              </form>
              <form className="mt-10 lg:w-1/2 bg-white px-10 m-5 py-8 rounded-xl w-full lg:max-w-sm lg:w-screen shadow-md ">
                <h1 className="text-center text-2xl font-semibold text-gray-600 m-10">Удалить пользователя</h1>
                <input className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" type="text" placeholder="Введите имя или email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide" type="button" onClick={handleSearch}>
                  Поиск
                </button>
      
                {filteredUsers.map(user => (
                  <div className="container mt-4 border-2 p-2" key={user._id}>
                    <p>{user.name} ({user.email}) </p>
                    <button className="mt-3 w-full m-1 p-3 bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide" onClick={() => handleDeleteUser(user._id)}>Удалить пользователя</button>
                  </div>
                ))}
              </form>
            </div>
      
            <div className="flex justify-center mt-20">
              <h1 className="text-center text-2xl font-semibold text-gray-600 mt-10 lg:mr-5">Управление продуктами</h1>
              <img src="https://cdn3.iconfinder.com/data/icons/metaverse-effect/64/ar-store-shopping-3d-model-product-mystery-box-512.png" width="100" />
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <div className="container mt-10 mb-20 bg-white px-10 py-8 rounded-xl shadow-md max-w-sm w-full lg:ml-20">
                  <h1 className="text-center text-2xl font-semibold text-gray-600 mb-5">Удалить продукт</h1>
                  <input {...register('searchTerm')} type="text" className="bg-indigo-50 px-8 py-2 outline-none rounded-md w-full" placeholder="Введите название продукта" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <button className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide" type="button" onClick={handleSearches}>
                    Поиск
                  </button>
      
                  {filteredProducts.map(product => (
                    <div className="container mt-4 border-2 p-2" key={product._id}>
                      <p>{product.title} - Price: {product.price}</p>
                      <button className="mt-3 w-full m-1 p-3 bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide" onClick={() => handleDeleteProduct(product._id)}>
                        Удалить продукт
                      </button>
                    </div>
                  ))}
                </div>
              </div>
      
              <div className="lg:w-1/2">
                {selectedProduct && (
                  <EditProductForm product={selectedProduct} onCancel={handleCancelEdit} onUpdate={handleUpdateProduct} />
                )}
      
                <div className="container mt-10 mb-20 bg-white px-10 m-5 py-8 rounded-xl shadow-md max-w-sm w-full lg:ml-20">
                  {products.map((product) => (
                    <div key={product._id} className="mb-4">
                      <p>{product.title}</p>
                      <button className="mt-3 w-full m-1 p-3 bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide" onClick={() => handleEditProduct(product)}>
                        Редактировать
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
      export default AdminPage;
      
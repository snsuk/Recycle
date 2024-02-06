import t from '../types/productTypes';
import axios from "axios";

export const fetchMessages = (chatId) => {
    return (dispatch) => {
        axios.get(`/api/v1/messages/${chatId}`)
            .then(({ data }) => dispatch({ type: t.FETCH_MESSAGES, chatId, messages: data }))
            .catch((error) => {
                console.error('Error fetching messages:', error);
                alert('Ошибка при получении сообщений');
            });
    };
};

export const addMessage = (message) => {
    return { type: t.ADD_MESSAGE, message };
};

export const deleteMessage = (messageId) => {
    return (dispatch) => {
        axios.delete(`/api/v1/messages/${messageId}`)
            .then((response) => {
                if (response.data.deletedMessage) {
                    alert('Сообщение было удалено');
                    dispatch({ type: t.DELETE_MESSAGE, messageId });
                } else {
                    alert(`Сообщение с ID ${messageId} не найдено`);
                }
            })
            .catch((error) => {
                console.error("Error deleting message:", error);
                console.error('Error details:', error.response.data);
                alert("Ошибка при удалении сообщения");
            });
    };
};
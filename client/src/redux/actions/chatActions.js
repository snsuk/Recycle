import t from '../types/productTypes';
import axios from "axios";

export const fetchChats = () => {
    return (dispatch) => {
        axios.get('/api/v1/chats')
            .then(({ data }) => dispatch({ type: t.FETCH_CHATS, chats: data }))
            .catch((error) => {
                console.error('Error fetching chats:', error);
                alert('Ошибка при получении чатов');
            });
    };
};

export const addChat = (chat) => {
    return { type: t.ADD_CHAT, chat };
};

export const deleteChat = (chatId) => {
    return (dispatch) => {
        axios.delete(`/api/v1/chats/${chatId}`)
            .then((response) => {
                if (response.data.deletedChat) {
                    alert(`Чат ${response.data.deletedChat.title} был удален`);
                    dispatch({ type: t.DELETE_CHAT, chatId });
                } else {
                    alert(`Чат с ID ${chatId} не найден`);
                }
            })
            .catch((error) => {
                console.error("Error deleting chat:", error);
                console.error('Error details:', error.response.data);
                alert("Ошибка при удалении чата");
            });
    };
};

export const createChat = (participants) => {
    return (dispatch) => {
      axios.post('/api/v1/chats', { participants })
        .then(({ data }) => dispatch({ type: t.CREATE_CHAT, chat: data }))
        .catch((error) => {
          console.error('Error creating chat:', error);
          alert('Ошибка при создании чата');
        });
    };
  };


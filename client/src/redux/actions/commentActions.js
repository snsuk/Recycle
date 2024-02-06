import t from '../types/productTypes';
import axios from 'axios';

export const fetchComments = (productId) => async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/v1/comments?productId=${productId}`);
      dispatch({ type: t.FETCH_COMMENTS, productId, comments: data });
      return data; 
    } catch (error) {
      console.error('Error fetching comments:', error);
      return []; 
    }
  };
  
  
  

  export const addComment = (productId, text) => {
    return async (dispatch) => {
      if (!productId || !text) {
        console.error('Invalid comment data:', { productId, text });
        return;
      }
      axios.post('/api/v1/comments', { productId, text }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(({ data }) => {
          dispatch({ type: t.ADD_COMMENT, productId, comment: data.comment });
          alert('Комментарий добавлен');
        })
        .catch((error) => {
          console.error('Error adding comment:', error);
          alert('Ошибка при добавлении комментария');
        });
    };
  };
  

  export const deleteComment = (commentId, productId) => {
    return (dispatch) => {
      axios
        .delete(`/api/v1/comments/${commentId}`)
        .then((response) => {
          if (response.data.deletedComment) {
            alert('Комментарий был удален');
            dispatch({ type: t.DELETE_COMMENT, commentId, productId });
          } else {
            alert(`Комментарий с ID ${commentId} не найден`);
          }
        })
        .catch((error) => {
          console.error('Error deleting comment:', error);
          console.error('Error details:', error.response.data);
          alert('Ошибка при удалении комментария');
        });
    };
  };
  

import React, { useState } from 'react';

const CommentForm = ({ productId, onCommentSubmit }) => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onCommentSubmit && typeof onCommentSubmit === 'function') {
      if (text.trim()) {
        onCommentSubmit({ productId, text });
        setText('');
      } else {
        alert('Please enter comment text');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        rows="4"
        cols="50"
        placeholder="Оставьте комментарий"
        value={text}
        onChange={handleTextChange}
        className="w-full p-2 border rounded"
      ></textarea>
      <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Отправить</button>
    </form>
  );
};

export default CommentForm;
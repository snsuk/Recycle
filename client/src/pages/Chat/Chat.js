import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Chat = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log('Chat ID:', chatId);
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/v1/chats/${chatId}/messages`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Ошибка при загрузке сообщений чата:', error);
        console.log('Error response data:', error.response.data);
      }
    };

    fetchMessages();
  }, [chatId]);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(`/api/v1/chats/${chatId}/messages`, { text: newMessage });
      setMessages([...messages, response.data.message]);
      setNewMessage(''); 
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto my-10 border rounded-lg overflow-hidden shadow-lg">
      <div className="bg-gray-200 p-5">
        <h1 className="text-xl font-semibold">Чат</h1>
      </div>
      <div className="flex-grow overflow-auto p-20 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="bg-white p-3 rounded-lg shadow">
            {message.content && <>{message.content}</>}

            {console.log("Sender:", message.sender)}
            {message.sender?.name && message.sender?.isSeller && (
              <p className="text-sm text-gray-500">Продавец: {message.sender.name}</p>
            )}
          </div>
        ))}
      </div>
      <div className="bg-gray-100 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder="Введите сообщение"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

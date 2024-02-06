import Chat from "../models/chatModel.js";

export const sendMessage = async (req, res) => {
    try {
      const { chatId } = req.params;
      const { text, senderId } = req.body;
  
      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ message: "Чат не найден" });
      }
  
      chat.messages.push({
        text,
        sender: senderId,
      });
  
      await chat.save();
  
      res.json({ message: "Сообщение отправлено", chat });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка отправки сообщения", error });
    }
  };
  
export const createChat = async (req, res) => {
    try {
        const { participants } = req.body;
        const newChat = new Chat({ participants });
        const chat = await newChat.save();
        res.json({ message: "Чат создан", chat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка создания чата", error });
    }
};

export const getChats = async (req, res) => {
    try {
        const chats = await Chat.find({}).populate('participants', 'name email');
        res.json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка получения чатов", error });
    }
};

export const getChatById = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const chat = await Chat.findById(chatId).populate('participants', 'name email');
        if (!chat) {
            return res.status(404).json({ message: 'Чат не найден' });
        }
        res.json(chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка получения чата', error });
    }
};

export const updateChat = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const { participants } = req.body;

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { participants },
            { new: true, runValidators: true }
        );

        if (!updatedChat) {
            return res.status(404).json({ message: 'Чат не найден' });
        }

        res.json({ message: 'Чат обновлен', chat: updatedChat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка обновления чата', error });
    }
};

export const deleteChat = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const deletedChat = await Chat.findByIdAndDelete(chatId);

        if (!deletedChat) {
            return res.status(404).json({ message: 'Чат не найден' });
        }

        res.json({ message: 'Чат успешно удален', deletedChat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка удаления чата', error });
    }
};

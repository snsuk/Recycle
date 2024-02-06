import Message from "../models/messageModel.js";

export const getMessagesByChatId = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const messages = await Message.find({ chat: chatId }).populate('sender', 'name email');
        res.json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении сообщений чата", error });
    }
};


export const createMessageForChat = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const { text } = req.body; 

        const { _id: sender } = req.user;

        const newMessage = new Message({ sender, chat: chatId, content: text }); 
        const message = await newMessage.save();

        res.status(201).json({ message: "Сообщение отправлено", message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при отправке сообщения", error });
    }
};




export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({}).populate('sender', 'name email');
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка получения сообщений", error });
    }
};


export const updateMessage = async (req, res) => {
    try {
        const messageId = req.params.messageId;
        const { sender, chat, content } = req.body;

        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { sender, chat, content },
            { new: true, runValidators: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({ message: 'Сообщение не найдено' });
        }

        res.json({ message: 'Сообщение обновлено', message: updatedMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка обновления сообщения', error });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const messageId = req.params.messageId;
        const deletedMessage = await Message.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({ message: 'Сообщение не найдено' });
        }

        res.json({ message: 'Сообщение успешно удалено', deletedMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка удаления сообщения', error });
    }
};

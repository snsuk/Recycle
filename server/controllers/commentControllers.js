import Comment from '../models/commentModel.js';

export const addComment = async (req, res) => {
    try {
        console.log('Request received for adding comment:', req.body);

        console.log('User from req.user:', req.user);

        const { productId, text } = req.body;
        const user = req.user;

        if (!user || !user._id) {
            return res.status(400).json({ message: 'Пользователь не идентифицирован' });
        }
        if (!text || !productId) {
            return res.status(400).json({ message: 'Некорректные данные комментария' });
        }

        const newComment = new Comment({
            user: user._id,
            product: productId,
            text,
        });

        await newComment.save();
        res.status(201).json({ comment: newComment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};


export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate('user', 'name email');
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка получения комментариев", error });
    }
};

export const getCommentById = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findById(commentId).populate('user', 'name email');
        if (!comment) {
            return res.status(404).json({ message: 'Комментарий не найден' });
        }
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка получения комментария', error });
    }
};

export const updateComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { user, product, text } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { user, product, text },
            { new: true, runValidators: true }
        );

        if (!updatedComment) {
            return res.status(404).json({ message: 'Комментарий не найден' });
        }

        res.json({ message: 'Комментарий обновлен', comment: updatedComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка обновления комментария', error });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ message: 'Комментарий не найден' });
        }

        res.json({ message: 'Комментарий успешно удален', deletedComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка удаления комментария', error });
    }
};


const { Book, Review } = require("../models");

const getAllBook = async (req, res, next) => {
    try {
        const books = await Book.findAll({
            include: [
                {
                    model: Review,
                    as: "reviews",
                    attributes: ["id", "body", "userId", "createdAt"],
                },
            ],
        });
        res.status(200).json(books);
    } catch (error) {
        next(error.message);
    }
};

const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.bookId, {
            include: [
                {
                    model: Review,
                    as: "reviews",
                    attributes: ["id", "body", "userId", "createdAt"],
                },
            ],
        });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

const createBook = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const book = await Book.create({
            ...req.body,
            userId,
        });

        res.status(201).json({
            message: "Book created successfully",
            data: book,
        });
    } catch (error) {
        next(error);
    }
};

const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        await book.update(req.body);

        return res.status(200).json({
            message: "Book updated successfully",
            data: book,
        });
    } catch (error) {
        next(error);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        await book.destroy();

        return res.status(200).json({
            message: "Book deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = BookController = {
    getAllBook,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};

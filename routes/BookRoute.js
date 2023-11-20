const express = require("express");
const BookContoller = require("../controllers/BookController");
const { adminMiddleware, authMiddleware } = require("../middlewares/auth");

const router = express.Router();

router.get("/books", BookContoller.getAllBook);
router.get("/books/:bookId", BookContoller.getBookById);
router.post(
    "/books",
    authMiddleware,
    adminMiddleware,
    BookContoller.createBook
);
router.patch(
    "/books/:bookId",
    authMiddleware,
    adminMiddleware,
    BookContoller.updateBook
);

router.delete(
    "/books/:bookId",
    authMiddleware,
    adminMiddleware,
    BookContoller.deleteBook
);

module.exports = router;

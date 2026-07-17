const express = require("express");
let {books} = require("../data/books.json")
let {users} = require("../data/users.json")

const { UserModel, BookModel } = require("../models/index");
const { getAllBooks, getBookById, getAllIssuedBooks, addNewBook, updateBookById, deleteBookById} = require("../controllers/book-controller");


// const UserModel = require("../models/user-model");
// const BookModel = require("../models/book-model");

const routers = express.Router();


// get all books
// routers.get("/books", (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: books
//     });
// });

routers.get("/books", getAllBooks);



// get book by ID
// routers.get("/books/:id", (req, res) => {
//     const { id } = req.params;
//     const book = books.find((each) => each.id === id);
//     if (!book) {
//         return res.status(404).json({
//             success: false,
//             message: "Book not found"
//         });
//     }
//     res.status(200).json({
//         success: true,
//         data: book
//     });
// });

routers.get("/books/:id", getBookById);



// add new book
// routers.post("/books", (req, res) => {
//     const { id, name, author, publisher, genre, price } = req.body;

//     if (!id || !name || !author || !publisher || !genre || !price) {
//         return res.status(400).json({
//             success: false,
//             message: "Please provide all the required fields"
//         });
//     }   

//     const existingBook = books.find((book) => book.id === id);

//     if (existingBook) {
//         return res.status(400).json({
//             success: false,
//             message: "Book with the same ID already exists"
//         });
//     }

//     books.push({ id, name, author, publisher, genre, price });
//     res.status(201).json({
//         success: true,
//         message: "Book added successfully"
//     });
// });

 routers.post("/books", addNewBook);


// update book by ID
// routers.put("/books/:id", (req, res) => {
//     const { id } = req.params;
//     const data = req.body;

//     const book = books.find((each) => each.id === id);

//     if (!book) {
//         return res.status(404).json({
//             success: false,
//             message: `Book not found ${id}` 
//         });
//     }
//     if (!data) {
//         return res.status(400).json({
//             success: false,
//             message: "Please provide data to update"
//         });
//     }

//     books = books.map((each) => {
//         if (each.id === id) {
//             return { ...each, ...data };
//         }
//         return each;
//     });

//     res.status(200).json({
//         success: true,
//         message: "Book updated successfully"
//     });
// });

 routers.put("/books/:id", updateBookById);




// delete book by ID
// routers.delete("/books/:id", (req, res) => {
//     const { id } = req.params;  

//     const book = books.find((each) => each.id === id);

//     if (!book) {    
//         return res.status(404).json({
//             success: false,
//             message: `Book not found ${id}`
//         });
//     }

//     books = books.filter((each) => each.id !== id);

//     res.status(200).json({
//         success: true,
//         message: "Book deleted successfully"
//     });
// });

routers.delete("/books/:id", deleteBookById);





// get all issued books
// routers.get("/books/issued/for-user", (req, res) => {

//     const userWithIssuedBooks = users.filter((each) => {
//         if(each.issuedBook){
//             return each;
//         }
//     });

//     const issuedBooks = [];

//     userWithIssuedBooks.forEach((each) => {
//         const book = books.find((book) => book.id === each.issuedBook);
//         book.issuedBy = each.name;
//         book.issuedDate = each.issuedDate;
//         book.returnDate = each.returnDate;
//         issuedBooks.push(book);
//     });

//     if(!issuedBooks ===0){
//         return res.status(404).json({
//             success: false,
//             message: "No issued books found"
//         });
//     }

//     res.status(200).json({
//         success: true,
//         data: issuedBooks
//     });
// });

routers.get("/books/issued/for-user", getAllIssuedBooks);


exports = module.exports = routers;
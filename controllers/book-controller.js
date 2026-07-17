const {UserModel, BookModel} = require("../models/index");
const IssuedBook = require("../dtos/book-dto");

exports.getAllBooks = async(req,res)=>{
    const books = await BookModel.find();

    if(!books.length===0){
        return res.status(404).json({
            success: false,
            message: "No books found"
        });
    }

    res.status(200).json({
        success: true,
        data: books
    });
}


exports.getBookById = async(req,res)=>{
    const {id} = req.params;
    const book = await BookModel.findById(id);

    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id: ${id}`
        });
    }

    res.status(200).json({
        success: true,
        data: book
    });
}


exports.getAllIssuedBooks = async(req,res)=>{
    const users = await UserModel.find({
        issuedBook: {$exists: true}
    }).populate("issuedBook");

    const issuedBooks = users.map((each)=>{
        return new IssuedBook(each);
    }); 
    if(!issuedBooks.length===0){
        return res.status(404).json({
            success: false,
            message: "No issued books found"
        });
    }
    res.status(200).json({
        success: true,
        data: issuedBooks
    });
}


exports.addNewBook = async(req,res)=>{
    const data = req.body.data;
    // console.log("Incoming data:", data);

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide book data"
        });
    }
    const book = await BookModel.create(data);

    res.status(201).json({
        success: true,
        data: book
    });
}

exports.updateBookById = async(req,res)=>{
    const {id} = req.params;
    const data = req.body;

    if(!data || object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide book data"
        });
    }

    // const book = await BookModel.findById(id);

    // if(!book){
    //     return res.status(404).json({
    //         success: false,
    //         message: `Book not found for id: ${id}`
    //     });
    // }

    // object.assign(book, data);
    // await book.save();

    // res.status(200).json({
    //     success: true,
    //     data: book
    // });

    const book = await BookModel.findOneAndUpdate({_id: id}, data, {new: true});

    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id: ${id}`
        });
    }

    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book
    });
}


exports.deleteBookById = async(req,res)=>{
    const {id} = req.params;
    const book = await BookModel.findByIdAndDelete(id);

    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id: ${id}`
        });
    }

    res.status(200).json({
        success: true,
        message: "Book deleted successfully"
    });
}
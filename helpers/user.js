var mongoose = require('mongoose')
var bookSchema = require('../models/userschema')
var loginSchema = require('../models/login')
var validator = require('validator')

exports.signIn = async (req, res) => {
    loginSchema.find({ name: req.body.name, password: req.body.password }).then((response) => {
        res.json({ status: true, message: 'Login Successfully', data: response })
    })
}

// add books
exports.addBooks = async (req, res) => {
    try {
        var title = req.body.title
        var author = req.body.author
        var description = req.body.description
        var publicationYear = req.body.publicationYear
        var ISBN = req.body.ISBN

        // Validation
        const errors = [];
        if (!title || validator.isEmpty(title)) {
            errors.push('Title is required and cannot be empty.');
        }
        if (!author || validator.isEmpty(author)) {
            errors.push('Author is required and cannot be empty.');
        }
        if (!publicationYear || !validator.isNumeric(publicationYear)) {
            errors.push('Publication year must be a valid number.');
        }
        if (!ISBN || !validator.isISBN(ISBN)) {
            errors.push('Invalid ISBN format.');
        }

        if (errors.length > 0) {
            return res.json({ message: errors, status: false });
        }
        bookSchema.find({ ISBN: req.body.ISBN }).then((foundNumber) => {
            if (foundNumber.length > 0) {
                res.json({ message: "ISBN Number is invalid or already exists", status: false })
            }
            else {
                bookSchema.create({
                    title: title,
                    author: author,
                    description: description,
                    publicationYear: publicationYear,
                    ISBN: ISBN
                }).then((addedData) => {
                    if (!addedData)
                        res.status(400).json({ message: "Please fill the required fields", status: false })
                    else
                        res.status(201).json({ message: "Successfully Added", status: true, data: addedData })

                })
            }
        })
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}

//list particular books
exports.particularList = async (req, res) => {
    try {
        bookSchema.find({ ISBN: req.body.ISBN }).then((selectedList) => {
            if (!selectedList)
                res.status(400).json({ message: 'Invalid Data', status: false })
            else
                res.status(201).json({ message: 'Selected books details', status: true, data: selectedList })
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//list all books
exports.booksList = async (req, res) => {
    try {
        bookSchema.find({}).sort({ _id: -1 }).then((list) => {
            if (list == null || !list)
                res.status(400).json({ message: 'Datas not found', status: false })
            else
                res.status(201).json({ status: true, data: list })
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update books data
exports.updateBooks = async (req, res) => {
    try {
        bookSchema.findOne({ ISBN: req.body.ISBN }).then((data) => {
            if (data) {
                bookSchema.updateMany({ ISBN: req.body.ISBN }, { title: req.body.title, author: req.body.author, description: req.body.description, publicationYear: req.body.publicationYear, ISBN: req.body.ISBN }, { new: true }).then((updateData) => {
                    if (updateData.modifiedCount == 0)
                        res.status(400).json({ message: 'Datas not Updated', status: false })
                    else
                        res.status(201).json({ message: 'Successfully Updated', data: updateData, status: true })
                })
            }
            else {
                res.json({ message: 'Datas not found', status: false })
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//delete books
exports.deleteBooks = async (req, res) => {
    try {
        await bookSchema.deleteOne({ ISBN: req.body.ISBN }).then((deleted) => {
            if (deleted.deletedCount == 0)
                res.status(400).json({ message: 'Datas not found', status: false })
            else
                res.status(201).json({ message: 'Successfully Deleted', data: deleted, status: true })
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//search books
exports.searchBooks = async (req, res) => {
    try {
        const { query } = req.query;
        let search = {
            $or: [
                { title: new RegExp(query, 'i') },
                { author: new RegExp(query, 'i') },
                { publicationYear: query }
            ]
        };
        console.log(search)

        const books = await bookSchema.find(search);
        res.status(201).json({ status: true, data: books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const Book = require('../models/book');
const HttpError = require('../models/http-error');

////////// BOOKS //////////
////////// POST //////////
const createBook = async (req, res, next) => {
  const {
    title,
    description,
    author: {
      name: author
    },
    genre: {
      name: genre
    },
    imagePath,
    seriesName,
    seriesNumber,
    featured
  } = req.body;
  let book;

  try {
    book = await Book.create({
      title,
      description,
      author: {
        name: author
      },
      genre: {
        name: genre
      },
      imagePath,
      seriesName,
      seriesNumber,
      featured,
    });
  } catch (err) {
    const error = new HttpError(
      'Creating book failed, please try again later.',
      500
    );
    return next(error);
  }
  res.status(201).json(book);
};
////////// GET //////////
// ALL //
const getAllBooks = async (req, res, next) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching books failed, please try again later.',
      500
    );
    return next(error);
  }
  res.status(200).json(books);
};
// ID //
const getBookById = async (req, res, next) => {
  let book;
  try {
    book = await Book.findOne({ _id: req.params.bid });
  } catch (err) {
    const error = new HttpError(
      'Fetching book failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!book) {
    const error = new HttpError(
      'Could not find a book for the provided id.',
      404
    );
    return next(error);
  }
  res.status(200).json(book);
};
// TITLE //
const getBookByTitle = async (req, res, next) => {
  let book;
  try {
    book = await Book.findOne({ title: req.params.title });
  } catch (err) {
    const error = new HttpError(
      'Fetching book failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!book) {
    const error = new HttpError(
      'Could not find a book for the provided title.',
      404
    );
    return next(error);
  }
  res.status(200).json(book);
};
// AUTHOR NAME //
const getAuthorByName = async (req, res, next) => {
  let author;
  try {
    author = await Book.find({ 'author.name': req.params.authorName });
  } catch (err) {
    const error = new HttpError(
      'Fetching author failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!author) {
    const error = new HttpError(
      'Could not find an author for the provided name.',
      404
    );
    return next(error);
  }
  res.status(200).json(author);
};
// GENRE NAME //
const getGenreByName = async (req, res, next) => {
  let genre;
  try {
    genre = await Book.find({ 'genre.name': req.params.genreName });
  } catch (err) {
    const error = new HttpError(
      'Fetching genre failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!genre) {
    const error = new HttpError(
      'Could not find an genre for the provided name.',
      404
    );
    return next(error);
  }
  res.status(200).json(genre);
};


////////// PATCH //////////
// ID //
const updateBookById = async (req, res, next) => {
  let updatedBook;
  try {
    updatedBook = await Book.findOneAndUpdate(
      { _id: req.params.bid },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          author: req.body.author,
          genre: req.body.genre,
          imagePath: req.body.imagePath,
          seriesName: req.body.seriesName,
          seriesNumber: req.body.seriesNumber,
          featured: req.body.featured,
        },
      },
      { new: true }
    );
  } catch (err) {
    const error = new HttpError(
      'Updating book failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!updatedBook) {
    const error = new HttpError(
      'Could not find a book for the provided id.',
      404
    );
    return next(error);
  }
  res.status(200).json(updatedBook);
};
// TITLE //
const updateBookByTitle = async (req, res, next) => {
  let updatedBook;
  try {
    updatedBook = await Book.findOneAndUpdate(
      { title: req.params.title },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          author: req.body.author,
          genre: req.body.genre,
          imagePath: req.body.imagePath,
          seriesName: req.body.seriesName,
          seriesNumber: req.body.seriesNumber,
          featured: req.body.featured
        },
      },
      { new: true }
    );
  } catch (err) {
    const error = new HttpError(
      'Updating book failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!updatedBook) {
    const error = new HttpError(
      'Could not find a book for the provided title.',
      404
    );
    return next(error);
  }
  res.status(200).json(updatedBook);
};

////////// DELETE //////////
// ID //
const deleteBookById = async (req, res, next) => {
  let deletedBook;
  let bid = req.params.bid;
  try {
    deletedBook = await Book.findOneAndRemove({ _id: bid });
  } catch (err) {
    const error = new HttpError(
      'Deleting book failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!deletedBook) {
    const error = new HttpError(
      'Could not find a book for the provided id.',
      404
    );
    return next(error);
  }
  res.status(200).send(`Book ${bid} was deleted.`);
};
// TITLE //
const deleteBookByTitle = async (req, res, next) => {
  let deletedBook;
  let title = req.params.title;
  try {
    deletedBook = await Book.findOneAndRemove({
      title: req.params.title,
    });
  } catch (err) {
    const error = new HttpError(
      'Deleting book failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!deletedBook) {
    const error = new HttpError(
      'Could not find a book for the provided title.',
      404
    );
    return next(error);
  }
  res.status(200).send(`${title} was deleted.`);
};

exports.createBook = createBook;
exports.getAllBooks = getAllBooks;
exports.getBookById = getBookById;
exports.getBookByTitle = getBookByTitle;
exports.getAuthorByName = getAuthorByName;
exports.getGenreByName = getGenreByName;
exports.updateBookById = updateBookById;
exports.updateBookByTitle = updateBookByTitle;
exports.deleteBookById = deleteBookById;
exports.deleteBookByTitle = deleteBookByTitle;


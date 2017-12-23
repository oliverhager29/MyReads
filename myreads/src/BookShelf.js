import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './App.css'
import Book from "./Book";

class BookShelf extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        shelf: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        handler: PropTypes.func
    }

    render() {
        const handler = this.props.handler
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map(function (book, index) {
                                return (
                                    <li key={book.id}>
                                        <Book
                                            thumbnailUrl={(book.imageLinks?book.imageLinks.thumbnail:"")}
                                            title={book.title}
                                            authors={(book.authors?book.authors:[])}
                                            shelf={(book.shelf?book.shelf:"none")}
                                            id={book.id}
                                            handler={handler}
                                        />
                                    </li>
                                )
                            }
                        )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf
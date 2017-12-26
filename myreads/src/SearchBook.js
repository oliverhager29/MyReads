import React, {Component} from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Book from "./Book";
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBook extends Component {
    state = {
        query: "",
        books: [],
    }

    static propTypes = {
        shelves: PropTypes.array.isRequired,
        bookSets: PropTypes.array.isRequired,
        updateBookHandler: PropTypes.func.isRequired
    }

    handleChange(event) {
        const newValue=event.target.value.trim()
        this.setState({query: newValue, books: this.state.books});
        const shelves = this.props.shelves
        const bookSets = this.props.bookSets
        if(newValue.length>0) {
            BooksAPI.search(newValue).then(
                (books) => {
                    if(books && books instanceof Array) {
                        for (let h = 0; h < books.length; h++) {
                            books[h].shelf = "none"
                            for (let i = 0; i < shelves.length; i++) {
                                const bookSet = bookSets[i];
                                if (bookSet.find((b) => (b.id === books[h].id))) {
                                    books[h].shelf = shelves[i]
                                }
                            }
                        }
                        this.setState({query: newValue, books: books})
                    }
                    else {
                        this.setState({query: newValue, books: []})
                    }
                }
            )
        }
        else {
            this.setState({query: newValue, books: []})
        }

    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render() {
        const updateBookHandler = this.props.updateBookHandler
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"
                          className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                          NOTES: The search from BooksAPI is limited to a particular set of search terms.
                          You can find these search terms here:
                          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                          you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" placeholder="Search by title or author" value={this.state.query}
                               onChange={(event) => this.handleChange(event)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map(function (book, index) {
                                return (
                                <li key={book.id}>
                                    <Book
                                        thumbnailUrl={(book.imageLinks?book.imageLinks.thumbnail:"")}
                                        title={book.title}
                                        authors={(book.authors?book.authors:[])}
                                        shelf={(book.shelf?book.shelf:"none")}
                                        averageRating={(book.averageRating?book.averageRating:0)}
                                        ratingsCount={(book.ratingsCount?book.ratingsCount:0)}
                                        id={(book.id?book.id:"none")}
                                        updateBookHandler={updateBookHandler}
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

export default SearchBook
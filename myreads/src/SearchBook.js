import React, {Component} from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Book from "./Book";
import { Link } from 'react-router-dom'

class SearchBook extends Component {
    state = {
        query: "",
        books: [],
    }

    handleChange(event) {
        const newValue=event.target.value.trim()
        this.setState({query: newValue, books: this.state.books});
        if(newValue.length>0) {
            BooksAPI.search(newValue).then(
                (books) => {
                    this.setState({query: newValue, books: books})
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
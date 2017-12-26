import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './App.css'
import BookShelf from "./BookShelf";

class BookShelves extends Component {
    static propTypes = {
        titles: PropTypes.array.isRequired,
        shelves: PropTypes.array.isRequired,
        bookSets: PropTypes.array.isRequired,
        updateBookHandler: PropTypes.func.isRequired
    }

    render() {
        const {titles, shelves, bookSets, updateBookHandler} = this.props
        return (
                <div className="list-books-content">
                    <div>
                        {shelves.map(function (shelf, index) {
                                return (
                                        <BookShelf
                                            key={(shelf?shelf:"none")}
                                            title={titles[index]}
                                            shelf={(shelf?shelf:"none")}
                                            books={bookSets.length<=index?[]:bookSets[index]}
                                            updateBookHandler={updateBookHandler}
                                        />
                                )
                            }
                        )
                        }
                    </div>
                </div>
        )
    }
}

export default BookShelves
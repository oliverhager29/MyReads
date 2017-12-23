import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookShelf from "./BookShelf";

class BookShelves extends Component {
    static propTypes = {
        titles: PropTypes.array.isRequired,
        shelves: PropTypes.array.isRequired
    }

    state = {
        titles: [],
        shelves: [],
        bookSets: [],
        handler: null
    }

    constructor(props) {
        super(props);
        this.state.handler = this.handler.bind(this);
    }

    handler() {
        this.setState({titles: this.props.titles, shelves: this.props.shelves})
        BooksAPI.getAll().then(
            (books) => {
                const bookSets=[]
                for(let i=0; i<this.state.shelves.length; i++) {
                    const bookSet=books.filter((b)=>(b.shelf && b.shelf===this.state.shelves[i]))
                    bookSets.push(bookSet)
                }
                this.setState({bookSets: bookSets})
            }
        )
    }

    componentDidMount()  {
        this.handler()
    }

    render() {
        const {titles, shelves, bookSets, handler} = this.state
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
                                            handler={handler}
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
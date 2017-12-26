import React from 'react'
import './App.css'
import SearchBook from "./SearchBook";
import BookShelves from "./BookShelves";
import {BrowserRouter, Route, Redirect, Switch, Link} from 'react-router-dom'
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
    state = {
        titles: ["Currently Reading", "Want to Read", "Read"],
        shelves: ["currentlyReading", "wantToRead", "read"],
        bookSets: [],
        updateBookHandler: null
    }

    constructor(props) {
        super(props);
        this.state.updateBookHandler = this.updateBookHandler.bind(this);
    }

    updateBookHandler(bookToUpdate, shelf) {
        const bookSets = this.state.bookSets
        const shelves = this.state.shelves
        BooksAPI.update(bookToUpdate, shelf).then(
            (result) => {
                const newBooks=[]
                var found = false
                for(let i=0; i<shelves.length; i++) {
                    for (let j = 0; j < bookSets[i].length; j++) {
                        const newBook = bookSets[i][j]
                        if(newBook.id===bookToUpdate.id) {
                            found = true
                        }
                        newBooks.push(newBook)
                    }
                }
                if(!found) {
                    newBooks.push(bookToUpdate)
                }
                const newBookSets=[]
                for(let i=0; i<shelves.length; i++) {
                    const shelf=shelves[i]
                    const resultShelf = result[shelves[i]]
                    const filteredBooks = newBooks.filter( (book)=>resultShelf.indexOf(book.id)>-1 )
                    const newBookSet=
                        filteredBooks.map(function(book) {
                            book.shelf=shelf;
                            return book;
                    })
                    newBookSets.push(newBookSet)
                }
                this.setState({bookSets: newBookSets})
            }
        )
    }

    readAllBooksHandler() {
        const shelves = this.state.shelves
        BooksAPI.getAll().then(
            (books) => {
                const bookSets=[]
                for(let i=0; i<shelves.length; i++) {
                    const bookSet=books.filter((b)=>(b.shelf && b.shelf===shelves[i]))
                    bookSets.push(bookSet)
                }
                this.setState({bookSets: bookSets})
            }
        )
    }

    componentDidMount()  {
        this.readAllBooksHandler()
    }

    render() {
        const titles = this.state.titles
        const shelves = this.state.shelves
        const bookSets = this.state.bookSets
        const updateBookHandler = this.state.updateBookHandler

        return (
          <div className="app">
              <BrowserRouter>
                  <Switch>
              <Route exact path="/search"
                     render={() => (<SearchBook updateBookHandler={updateBookHandler} shelves={shelves} bookSets={bookSets}/>
                         )}/>
              <Route exact path="/"
                     render={() => (
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <BookShelves
                        titles={titles}
                        shelves={shelves}
                        bookSets={bookSets}
                        updateBookHandler={updateBookHandler}
                    />
                    <div className="open-search">
                    <Link to="/search"
                              className="open-search">
                            Add a book
                    </Link>
                    </div>
                </div>
                         )}/>
                      <Redirect from='*' to='/' />
                  </Switch>
              </BrowserRouter>

          </div>
        )
    }
}

export default BooksApp

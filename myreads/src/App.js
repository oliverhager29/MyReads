import React from 'react'
import './App.css'
import SearchBook from "./SearchBook";
import BookShelves from "./BookShelves";
import {BrowserRouter, Route, Redirect, Switch, Link} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    const titles=["Currently Reading", "Want to Read", "Read"]
    const shelves=["currentlyReading", "wantToRead", "read"]
    return (
      <div className="app">
          <BrowserRouter>
              <Switch>
          <Route exact path="/search"
                 render={() => (<SearchBook/>
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

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './App.css'
import * as BooksAPI from "./BooksAPI";
// import * as BooksAPI from './BooksAPI'

class Book extends Component {
    static propTypes = {
        thumbnailUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.array.isRequired,
        shelf: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        handler: PropTypes.func
    }

    state = {
        // book.imageLinks.thumbnail
        thumbnailUrl: "",
        // book.title
        title: "",
        // book.authors
        authors: [],
        // book.shelf
        shelf: "none",
        // book.id
        id: ""
    }

    constructor(props) {
        super(props);

        this.state = {
            thumbnailUrl: props.thumbnailUrl,
            title: props.title,
            authors: props.authors,
            shelf: props.shelf,
            id: props.id
        };
    }

    //handleChange(event) {
    handleChange = (event) => {
        const bookToUpdate = {id: this.state.id};
        const shelf = event.target.value;
        BooksAPI.update(bookToUpdate, event.target.value).then(
            (result) => {
                this.setState({shelf: shelf});
                if(this.props.handler) {
                    this.props.handler();
                }
            }
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render() {
        const {thumbnailUrl, title, authors, shelf} = this.state
        console.log(thumbnailUrl)
        const divStyle = {
            width: 128,
            height: 193,
            backgroundImage: 'url(' + thumbnailUrl + ')'
        };
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={divStyle}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={this.handleChange}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors.join(',')}</div>
            </div>
        )
    }
}

export default Book
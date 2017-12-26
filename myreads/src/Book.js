import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './App.css'
import Rating from "react-rating"

class Book extends Component {
    static propTypes = {
        thumbnailUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.array.isRequired,
        shelf: PropTypes.string.isRequired,
        averageRating: PropTypes.number.isRequired,
        ratingsCount: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        updateBookHandler: PropTypes.func
    }

    state = {
        shelf: "none"
    }

    constructor(props) {
        super(props);
        this.state = {
            shelf: props.shelf
        };
    }

    updateShelf(shelf) {
        if(this.props.updateBookHandler) {
            this.props.updateBookHandler({thumbnailUrl: this.props.thumbnailUrl, title: this.props.title,
                authors: this.props.authors, shelf: shelf,
                averageRating: this.props.averageRating, ratingsCount: this.props.ratingsCount,
                id: this.props.id}, shelf)
        }
        this.setState({shelf: shelf})
    }

    handleChange = (event) => {
        this.updateShelf(event.target.value);
    }


    handleSubmit = (e) => {
        e.preventDefault()
    }

    render() {
        const {thumbnailUrl, title, authors, averageRating, ratingsCount} = this.props
        const newShelf = this.state.shelf
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
                        <select value={newShelf} onChange={this.handleChange}>
                            <option value="" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors.join(',')}</div>
                <div>
                    <Rating
                        initialRate={averageRating}
                        readonly
                    />
                    <br/>
                    {ratingsCount} {ratingsCount===1?'Rating':'Ratings'}
                </div>
            </div>
        )
    }
}

export default Book
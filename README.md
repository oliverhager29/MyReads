MyReads is a React application keeping track of books being currently read, want to read or already read.

The main page consists of three bookshelves (currently read, want to read, read) of books. Each book may be moved into another bookshelf or removed (by selecting none). New books may be added by clicking on the plus button that leads to a book search page (substring of title/author). For each found book the shelf may be changed. the main page may be reached by clicking the arrow button or using the browsers back button. React Router 4 is used to have two distinct URLs (/ for main page and /search for the search page). It also guarantees that the back button leads back to the main page. 

For reading book information and persisting the shelf status the Udacity Book API is used. The following REST services are used:
1. getAll - reads all books with their information and shelf status for the main page
2. search - searches books by title/author  substring
3. update - updates the shelf for a specific book when the user selects the book menu

Instructions to run:
install latest node js and npm
git clone https://github.com/oliverhager29/MyReads
cd MyReads/myreads
# installs all necessary node js packages
npm install
cd src
# starts web container with React app
npm start

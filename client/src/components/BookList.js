import React, {useState} from 'react';
 import { gql,useQuery } from '@apollo/client';  
 import {getBooks} from "./queries/queries";
 import BookDetails from './BookDetails';


function BookList(props) {
    const {loading, data} = useQuery(getBooks);

    const [bookID, setbookID] = useState(null)

    const onChange = (e) => {
        e.preventDefault();
        setbookID(e.target.getAttribute('value'));
        
    }
 

  

    const displayBooks = () =>{
        if(loading){
            return (
                <div>Books Loading</div>
            )
        }
        else{
            console.log(data);
            return (
                data.books.map(book => {
                    return <li name="bookName" key={book.id} value={book.id}
                     onClick={onChange}>{book.name}</li>
                })
            )
        }
    }

    return (
        
        <div className="booklist">
            <ul>
                {displayBooks()}
            </ul>
            <BookDetails bookId={bookID} />
        </div>
    )
}

export default BookList;

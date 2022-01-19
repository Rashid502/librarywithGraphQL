import React, {useState, useEffect} from 'react'
import { gql,useQuery, useMutation } from '@apollo/client';  
import {getAuthors,ADD_BOOK, getBooks} from "./queries/queries";


function AddBook() {
    const {loading, data} = useQuery(getAuthors);

    const [ADDBook] = useMutation(ADD_BOOK);

    // useEffect(() => {
    //     if (book === null) {
    //         setBook({
    //         name:"",
    //         genre:"",
    //         authorId:""
    //       });
    //     } else {
    //         setBook(book);
    //     }
    //   }, [book]);

    const [book, setBook] = useState({
        name:"",
        genre:"",
        authorId:""
    });

    const {name, genre, authorId} = book;

    const onChange = (e) =>
    setBook({...book, [e.target.name]: e.target.value});

    const loadAuthors = () => {
        if(loading){
            return(
                <option disabled>Loading Authors...</option>
            )
        }
        if(!loading){
            let authors = data.authors;
            return authors.map(author => {
                return <option key={author.id} value={author.id} >{author.name}</option>
            })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(book.authorId);
        ADDBook({ variables: { name:book.name, genre:book.genre, authorId:book.authorId },
            refetchQueries:[{query:getBooks}] } );
    }
   
    return (
        <form onSubmit={onSubmit}>
            <div className="field">
                <label>Book Name:</label>
                <input type="text" name="name" value={name} onChange={onChange}></input>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" name="genre" value={genre} onChange={onChange}></input>
            </div>
            <div className="field">
                <label>Author:</label>
                <select name="authorId" value={authorId} onChange={onChange}>
                    <option>Select Author</option>
                    {loadAuthors()}
                </select>
            </div>
            <div className="button-container">
                <button className="addButton">Add Book</button>
            </div>
           
        </form>
    )
}

export default AddBook

import React, {useState} from 'react'
import { gql,useQuery, useMutation } from '@apollo/client';  
import {GET_BOOK} from "./queries/queries"

const BookDetails = (props) => {

    const {data} = useQuery(GET_BOOK, {
        variables: { id:props.bookId }
      });
    
    // if(error){
    //     console.log(error.message)
    // }
    const displayBookDetail = () =>{
        console.log("in Book Detail" + props.bookId)
        console.log(data)
        if(data){
            if(data.book){
                return (
                    <div className="book-details">
                            <h3>{data.book.name}</h3>
                            <h5>{data.book.genre}</h5>
                            <h5>{data.book.author.name}</h5>
                            <ul>
                            {
                                data.book.author.books.map( book => 
                                     <li>{book.name}</li>
                                )
                            }
                            </ul>
                        </div>
                )
            }
            
             
        }
        // if(data.loading){
        //     return (<div>Loading Book</div>)
        // }
        // else{
        //     console.log(data)
        //     // return book.map()
        // }
    }
    return (
        <div>
            {displayBookDetail()}
        </div>
    )
}

export default BookDetails

import { gql } from '@apollo/client';  

const getAuthors = gql`
{
    authors{
        name
        id
    }
}
`

const getBooks = gql`
{
    books{
        name
        id
    }
}
`

const GET_BOOK = gql`
   query Book($id:ID){
        book(id:$id){
            name
            id
            genre
            author{
                name
                age
                id
                books{
                    name
                }
            }
        }
    }
`

const ADD_BOOK = gql`
    mutation($name:String!, $genre:String!, $authorId:ID!){
        addBook(name:$name, genre:$genre, authorId:$authorId){
            name
        }
    } 
`

export {getAuthors, getBooks,ADD_BOOK,GET_BOOK}
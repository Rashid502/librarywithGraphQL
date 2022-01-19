const { query } = require("express");
const graphql = require("graphql");
const _ = require("loadsh");

const Book = require("../models/Book");
const Author = require("../models/Author");

// var books = [
//     {name:"Data Science", genre:"A1", id:"1", authorId:"1"},
//     {name:"Data Structure", genre:"D1", id:"2", authorId:"2"},
//     {name:"Basic Programming Tips", genre:"B1", id:"3", authorId:"3"},
//     {name:"React Fundamentals", genre:"R1", id:"4", authorId:"2"},
// ]
// var authors = [
//     {name:"Jamsheed", age:"25", id:"1"},
//     {name:"Tayyeb", age:"27", id:"2"},
//     {name:"Irfan", age:"27", id:"3"},
//     {name:"Rashid", age:"25", id:"4"},
// ]

const {GraphQLObjectType, GraphQLString,
     GraphQLSchema, GraphQLID,
     GraphQLInt,GraphQLList,
    GraphQLNonNull} = graphql;


const BookType = new GraphQLObjectType({
    name:"Book",
    fields : () => ({
        id: { type: GraphQLID}, 
        name:{type: new GraphQLNonNull(GraphQLString)},
        genre:{type: new GraphQLNonNull(GraphQLString)},
        author:{
            type:AuthorType,
            resolve(parent){
               // return _.find(authors, {id:parent.authorId})
               return Author.findById(parent.authorId);
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields : () => ({
        id: { type: GraphQLID}, 
        name:{type: new GraphQLNonNull(GraphQLString)},
        age:{type: new GraphQLNonNull(GraphQLInt)},
        books: {
            type:GraphQLList(BookType),
            resolve(parent, args){
               // return _.filter(books, {authorId:parent.id})
               return Book.find({authorId:parent.id});
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType", 
    fields:{
        book:{
            type: BookType,
            args: {id:{type : GraphQLID}},
            resolve(parent, args){
               // return _.find(books, {id:args.id});
               console.log("In Api: " + args.id);
               return Book.findById(args.id);
            }
        },
        author:{
            type: AuthorType,
            args: {id:{type : GraphQLID}},
            resolve(parent, args){
               // return _.find(authors, {id:args.id});
               return Author.findById(args.id);
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent, args){
              //  return books;
              console.log("In books")
              return Book.find({});
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent, args){
             //   return authors;
             return Author.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:"mutation",
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({
                    name:args.name,
                    age:args.age
                });
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})
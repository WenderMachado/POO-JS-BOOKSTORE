const Author = require("../Classes/Author")
const Book = require("../Classes/Book")
const Order = require("../Classes/Order")
const Poster = require("../Classes/Poster")
const User = require("../Classes/User")
const Database = require("../database")

module.exports = class App {
  static #database = new Database()

  createUser(name, email, password){
    const user = new User(name, email, password)

    App.#database.saveUsers(user)
  }

  getUsers(){
    App.#database.find(`users`)
  }

  createAuthor(name, nationality, bio){
    const author = new Author(name, nationality, bio)
    App.#database.saveAuthor(author)
  }

  getAuhor(){
    return App.#database.find(`authors`)
  }

  createBook(title, synopsis , genre, pages, author, description, price, inStock){
    const book = new Book(title, synopsis , genre, pages, author, description, price, inStock)
    App.#database.saveBook(book)
  }
  addBook(bookName, quantity){
    App.#database.addBooksToStock(bookName, quantity)
  }

  createPoster(name, description, height, width, price, inStock){
    const poster = new Poster(name, height, width, description, price, inStock)
    App.#database.savePoster(poster)
  }
  addPoster(posterName, quantity){
    App.#database.addPostersToStock(posterName, quantity)
  }

  createOrder(items, user){
    const order = new Order(items, user)
    App.#database.saveOrder(order)
    order.data.items.forEach(({product, quantity})=>{
      if(product instanceof Book ){
        App.#database.removeBooksFromStock(product.name, quantity)
      }else if (product instanceof poster){
        App.#database.removePostersFromStock(product.name, quantity)
      }
    })
  }

  getOrders(){
    return App.#database.find(`orders`)
  }

  showDatabase(){
    App.#database.showStorage()
  }
}
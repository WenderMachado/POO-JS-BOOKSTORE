module.exports = class Database{
  #storage = {
    authors: [],
    books: [],
    posters: [],
    orders: [],
    users: []
  }


  find(key){
    return this.#storage[key]
  }

  saveAuthor(author){
    this.#storage.authors.push(author)
  }

  saveBook(book){
    const bookExist = this.findBookByName(book.name)

    if(!bookExist){
        this.#storage.books.push(book)
    }
  }
  findBookByName(bookName){
      return this.#storage.books.find( b => b.name === bookName )
  }
  addBooksToStock(bookName, quantity){
      const book = this.findBookByName(bookName)
      book?.addBooksToStock(quantity)
  }
  removeBooksFromStock(bookName, quantity){
    const bookRemoved = this.findBookByName(bookName)
    bookRemoved?.removeBooksFromStock(quantity)
  }
  
  findPosterByName(posterName){
      return this.#storage.posters.find( p => p.name === posterName)
  }
   savePoster(poster){
    const posterExist = this.findPosterByName(poster.name)

    if(!posterExist){
        this.#storage.posters.push(poster)
    }
  }
  addPostersToStock(posterName, quantity){
      const poster = this.findPosterByName(posterName)
      poster?.addPostersToStock(quantity)
  }
  removePostersFromStock(posterName, quantity){
    const PosterRemoved = this.findPosterByName(posterName)
    PosterRemoved?.removePostersFromStock(quantity)
  }

  saveUsers(user){
    const userExists = this.#storage.users.find(u => u.email === user.email)
    if(!userExists){
      this.#storage.users.push(user)
    }
  }
   saveOrder(order){
      this.#storage.orders.push(order)
    }

      showStorage(){
      console.table(this.#storage.authors)
      console.table(this.#storage.books)
      console.table(this.#storage.posters)
      console.table(this.#storage.users)
      console.table(this.#storage.orders.map(order => order.data))
    }
}
c
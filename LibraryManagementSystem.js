class Book{
    constructor(title,authorInfo, genre, publisherInfo, isbn){
        this.Title = title;
        this.Author = authorInfo;
        this.BookGenre = genre;
        this.Publication = publisherInfo;
        this.ISBN = isbn;
    }

    getTitle(){
        return this.Title;
    }

    setTitle(bookTitle){
        this.Title = bookTitle;
    }

    getAuthor(){
        return this.Author;
    }

    setAuthor(newAuthor){
        this.Author = newAuthor;
    }

    getBookGenre(){
        return this.BookGenre;
    }

    setBookGenre(genre){
        this.BookGenre = genre;
    }

    getPublication(){
        return this.Publication;
    }

    setPublication(newPublication){
        this.Publication = newPublication;
    }
   

    getISBN(){
        return this.ISBN;
    }

    setISBN(newISBN){
        this.ISBN = newISBN;
    }
}


class Author{
    constructor(name,bio){
        this.Name = name;
        this.Bio = bio;
    }

    getName(){
        return this.Name;
    }

    setName(authorName){
        this.Name = authorName;
    }

    getBio(){
        return this.Bio;
    }

    setBio(details){
        this.Bio = details;
    }
}


class BranchInventory{
    constructor(book){
        this.Book = book;
        this.BookCount = 1;
    }
}


class Branch{
    constructor(name, location, hoursOfOperation){
        this.BranchName = name;
        this.Location = location;
        this.HoursOfOperation = hoursOfOperation;
        this.BookInventory = [];
    }

    //getter and Setters

    //methods
    AddBookToBranch(book){
        let found = false;

       this.BookInventory.forEach(books =>{
        if(books.Book.Title == book.Title){
            books.BookCount +=1;
            found = true;
        }
       });

       if(!found){
           let inventory = new BranchInventory(book);
            this.BookInventory.push(inventory);
       }

    }

    CheckBookOut(book){
        this.BookInventory.forEach(books =>{
         if(books.Book.Title == book.Title){             
             if(books.BookCount>0)
             {
             books.BookCount -=1;
            }
         }
        });

    }

    TotalBooksInBranch(){
        return this.AvailableBooks.count();
    }
}


class Genre{
    constructor(genre){
        this.GenreType = genre;
    }

    getBookGenre(){
        return this.GenreType;
    }
}


class Publisher{
    constructor(companyName, datePublished, copyright){
        this.PublishingCompany = companyName;
        this.PublishedDate = datePublished;
        this.Copyright = copyright;
    }

    getPublishingCompany(){
        return this.PublishingCompany;
    }

    setPublishingCompany(newCompany){
        this.PublishingCompany = newCompany;
    }

    getPublishedDate(){
        return this.PublishedDate;
    }

    setPublishedDate(newDate){
        this.PublishedDate = newDate;
    }

    getCopyright(){
        return this.Copyright;
    }

    setCopyright(newCopyright){
        this.Copyright = newCopyright;
    }
    
}

class LibraryManagement{  
    AddBookToLibrary(book,branch){
        branch.AddBookToBranch(book);      
    }

    IsBookAvailableForCheckOut(book,branch){
        let found = false
        branch.BookInventory.forEach(bookInfo=> {
            if( bookInfo.Book.Title == book.Title && bookInfo.BookCount>0)
            {
                found= true;               
            }
        });

        return found;
    }

    //create a method that allows users to check out a book
    CheckOutBookFromBranch(book, branch){
        if(this.IsBookAvailableForCheckOut(book,branch))
        {
            branch.CheckBookOut(book);
            console.log(`You have checked out ${book.Title}.  This book is due back in 7 days!!  Thank you for using ${branch.BranchName} library.  Happy Reading!`);
            
        }
        else{
            const notfoundMessage = `Sorry the book you requested, ${book.Title} , is not available.  
            Please check back in 7 days for availability status.  
            You may like these other book in that Genre. `;

            let referenceBooks="";
            branch.BookInventory.forEach(element=> {
                             if(element.Book.BookGenre.GenreType == book.BookGenre.GenreType && element.Book.Title != book.Title){ 
                                referenceBooks = `${referenceBooks}, ${element.Book.Title}`;
                             }
                        });
            
            console.log(`${notfoundMessage} ${referenceBooks}`);
            
        }
    }

}


//Test Run
const eastBranches = new Branch("East Branch","123 Main St.","Sunday - Friday 8AM - 5 PM");
const westBranches = new Branch("West Branch","123 AppleTree St.","Sunday - Friday 8AM - 4 PM");

const libraryTest = new LibraryManagement();
libraryTest.AddBookToLibrary(new Book("Javascript: Definitive Guide", new Author("David Flanagan", "Lorem Epsum"),new Genre("Computer Programming"),new Publisher("O'Reilly Media","6/9/2020",""),1491952024),eastBranches);
libraryTest.AddBookToLibrary(new Book("Professional Javascript for Web Developers", new Author("Nicholas C. Zakas", "Lorem Epsum"),new Genre("Computer Programming"),new Publisher("Wrox","10/15/2019",""),1119366445),westBranches);
libraryTest.AddBookToLibrary(new Book("Eloquent Javascript", new Author("Marijn Haverbeke", "Lorem Epsum"),new Genre("Computer Programming"),new Publisher("No Starch Press","12/4/2018",""),1593279509),eastBranches);
libraryTest.AddBookToLibrary(new Book("Eloquent Javascript", new Author("Marijn Haverbeke", "Lorem Epsum"),new Genre("Computer Programming"),new Publisher("No Starch Press","12/4/2018",""),1593279509),eastBranches);
libraryTest.AddBookToLibrary(new Book("Eloquent Javascript", new Author("Marijn Haverbeke", "Lorem Epsum"),new Genre("Computer Programming"),new Publisher("No Starch Press","12/4/2018",""),1593279509),eastBranches);

const bookToSearch =new Book("Eloquent Javascript", new Author("Marijn Haverbeke", "Lorem Epsum"),new Genre("Computer Programming"),new Publisher());

libraryTest.CheckOutBookFromBranch(bookToSearch,eastBranches);
libraryTest.CheckOutBookFromBranch(bookToSearch,eastBranches);


const failedBookToSearch =new Book("DodgeBall Fundementals", new Author("Luke Broock", "Lorem Epsum"),new Genre("Gaming"),new Publisher("ESPN Media",'5/4/1998',''));

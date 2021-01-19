
class LibraryManagement{  
    constructor(){
        this.BookInventory = [];
        this.CheckedOutBooks = [];
    }

    AddBookToBranch(book){
        let found = false;

       this.BookInventory.forEach(books =>{
        if(books.Book.Title == book.Title){
            books.Copies +=1;
            found = true;
        }
       });

       if(!found){
           let inventory = new BranchInventory(book);
            this.BookInventory.push(inventory);
       }

    }

    CheckBookOut(book,user){
        this.BookInventory.forEach(books =>{
         if(books.Book.Title == book.Title){             
             if(books.Copies>0)
             {
                this.CheckedOutBooks.push(new CheckOut(book, user));
                books.Copies -=1;             
            }
         }
        });

    }

    TotalBooksInBranch(){
        return this.AvailableBooks.count();
    }
}

class LibraryUser{
    constructor(userName, userAddress){
        this.Name = userName;
        this.Address = userAddress;
    }

    CreateNewLibraryCard(){
        this.CardId = new Date().getTime();//Math.floor(Date.now() / 1000);
    }

    GetLibraryCardId(){
        return this.CardId;
    }
}

class CheckOut{
    constructor(book, user){
        this.Book = book;
        this.User = user;
    }
}

class Book{
    constructor(title,authorInfo, genre, publisherInfo, isbn){
        this.Title = title;
        this.Author = authorInfo;
        this.BookGenre = genre;
        this.Publication = publisherInfo;
        this.ISBN = isbn;
    }

    GetTitle(){
        return this.Title;
    }

    SetTitle(bookTitle){
        this.Title = bookTitle;
    }

    GetAuthor(){
        return this.Author;
    }

    SetAuthor(newAuthor){
        this.Author = newAuthor;
    }

    GetBookGenre(){
        return this.BookGenre;
    }

    SetBookGenre(genre){
        this.BookGenre = genre;
    }

    GetPublication(){
        return this.Publication;
    }

    SetPublication(newPublication){
        this.Publication = newPublication;
    }

    GetISBN(){
        return this.ISBN;
    }

    SetISBN(newISBN){
        this.ISBN = newISBN;
    }
}


class Author{
    constructor(name,bio){
        this.Name = name;
        this.Bio = bio;
    }

    GetName(){
        return this.Name;
    }

    SetName(authorName){
        this.Name = authorName;
    }

    GetBio(){
        return this.Bio;
    }

    SetBio(details){
        this.Bio = details;
    }
}


class BranchInventory{
    constructor(book){
        this.Book = book;
        this.Copies = 1;
    }
}


class Branch extends LibraryManagement{
    constructor(name, location, hoursOfOperation){
        super();
        this.BranchName = name;
        this.Location = location;
        this.HoursOfOperation = hoursOfOperation;
        //this.BookInventory = [];
    }

    //getter and Setters
    GetBranchName(){
        return this.BranchName;
    }
    SetBranchName(newName){
        this.BranchName =newName;
    }
    
    GetLocation(){
        return this.Location;
    }
    SetLocation(newLocation){
        this.Location =newLocation;
    }

    GetHoursOfOperation(){
        return this.HoursOfOperation;
    }
    SetBranchName(newHours){
        this.HoursOfOperation =newHours;
    }

    AddBookToLibrary(book){
        this.AddBookToBranch(book);      
    }

    IsBookAvailableForCheckOut(book){
        let found = false
        this.BookInventory.forEach(bookInfo=> {
            if( bookInfo.Book.Title == book.Title && bookInfo.Copies>0)
            {
                found= true;               
            }
        });

        return found;
    }

    //create a method that allows users to check out a book
    CheckOutBookFromBranch(book,user){
        if(this.IsBookAvailableForCheckOut(book))
        {
            this.CheckBookOut(book,user);
            console.log(`Good News, ${user.Name}!  You have checked out ${book.Title}.  This book is due back in 7 days!!  Thank you for using ${this.BranchName} library.  Happy Reading!`);
            
        }
        else{
            const notfoundMessage = `Sorry the book you requested, ${book.Title} , is not available.  
            Please check back in 7 days for availability status.  
            You may like these other book in that Genre. `;

            let referenceBooks="";
            this.BookInventory.forEach(element=> {
                             if(element.Book.BookGenre.GenreType == book.BookGenre.GenreType && element.Book.Title != book.Title){ 
                                referenceBooks = `${referenceBooks}, ${element.Book.Title}`;
                             }
                        });
            
            console.log(`${notfoundMessage} ${referenceBooks}`);
            
        }
    }

    UsersStatus(user){
        this.CheckedOutBooks.forEach(element=>{
            if(element.User == user){
                console.log(`Hello ${user.Name}, you have the following book checked out: ${
                    element.Book.Title
                }`);
                
            }
        });
    }
}


class Genre{
    constructor(genre){
        this.GenreType = genre;
    }

    GetBookGenre(){
        return this.GenreType;
    }

    SetBookGenre(newGenre){
        this.GenreType = newGenre;
    }
}


class Publisher{
    constructor(companyName, datePublished, copyright){
        this.PublishingCompany = companyName;
        this.PublishedDate = datePublished;
        this.Copyright = copyright;
    }

    GetPublishingCompany(){
        return this.PublishingCompany;
    }

    SetPublishingCompany(newCompany){
        this.PublishingCompany = newCompany;
    }

    GetPublishedDate(){
        return this.PublishedDate;
    }

    SetPublishedDate(newDate){
        this.PublishedDate = newDate;
    }

    GetCopyright(){
        return this.Copyright;
    }

    SetCopyright(newCopyright){
        this.Copyright = newCopyright;
    }
    
}



//Test Run

//Branch Setup
const eastBranches = new Branch("East Branch","123 Main St.","Sunday - Friday 8AM - 5 PM");
const westBranches = new Branch("West Branch","123 AppleTree St.","Sunday - Friday 8AM - 4 PM");

//User Setup
const user = new LibraryUser("John Doe", "111 Main st.");
const user2 = new LibraryUser("Jane Doe", "111 Main st.");

user.CreateNewLibraryCard();
console.log(`User 1 card ID is: ${user.GetLibraryCardId()}`);
user2.CreateNewLibraryCard();
console.log(`User 2 card ID is: ${user2.GetLibraryCardId()}`);

//Book List
const listOfBooks = [
    new Book("Eloquent Javascript", new Author("Marijn Haverbeke", "Lorem Epsum"),new Genre("Computer Programming"),new Publisher("No Starch Press","12/4/2018",""),1593279509),
    new Book("Eloquent Javascript", new Author("Marijn Haverbeke", "Lorem Epsum"),new Genre("Computer Programming"),new Publisher("No Starch Press","12/4/2018",""),1593279509),
    new Book("Javascript: Definitive Guide", new Author("David Flanagan", "Lorem Epsum"),new Genre("Computer Programming"),new Publisher("O'Reilly Media","6/9/2020",""),1491952024),
    new Book("Eloquent Javascript", new Author("Marijn Haverbeke", "Lorem Epsum"),new Genre("Computer Programming"),new Publisher("No Starch Press","12/4/2018",""),1593279509),

    new Book("What The Dog Saw and Other Adventures", new Author("Malcolm Gladwell", "Lorem Epsum"),new Genre("Psychology"),new Publisher("Back Bay Books","5/4/2010",""),9780316076203),
    new Book("Eloquent Javascript", new Author("Marijn Haverbeke", "Lorem Epsum"),new Genre("Computer Programming"),new Publisher("No Starch Press","12/4/2018",""),1593279509),
    new Book("Eloquent Javascript", new Author("Marijn Haverbeke", "Lorem Epsum"),new Genre("Computer Programming"),new Publisher("No Starch Press","12/4/2018",""),1593279509),
    new Book("Eloquent Javascript", new Author("Marijn Haverbeke", "Lorem Epsum"),new Genre("Computer Programming"),new Publisher("No Starch Press","12/4/2018",""),1593279509),
    new Book("Eloquent Javascript", new Author("Marijn Haverbeke", "Lorem Epsum"),new Genre("Computer Programming"),new Publisher("No Starch Press","12/4/2018",""),1593279509),
];

const failedBookToSearch =new Book("DodgeBall Fundementals", new Author("Luke Broock", "Lorem Epsum"),new Genre("Gaming"),new Publisher("ESPN Media",'5/4/1998',''));

//Add book to Branch
eastBranches.AddBookToLibrary(listOfBooks[0]);
eastBranches.AddBookToLibrary(listOfBooks[1]);
eastBranches.AddBookToLibrary(listOfBooks[2]);
eastBranches.AddBookToLibrary(listOfBooks[3]);

westBranches.AddBookToLibrary(listOfBooks[4]);
westBranches.AddBookToLibrary(listOfBooks[5]);
westBranches.AddBookToLibrary(listOfBooks[6]);
westBranches.AddBookToLibrary(listOfBooks[7]);

//Check out from Branch
eastBranches.CheckOutBookFromBranch(listOfBooks[0],user);
eastBranches.CheckOutBookFromBranch(listOfBooks[2],user);
eastBranches.CheckOutBookFromBranch(listOfBooks[1],user2);
eastBranches.CheckOutBookFromBranch(failedBookToSearch,user2);

westBranches.CheckOutBookFromBranch(listOfBooks[4],user2);

//Print user's checked out books from Branch.
eastBranches.UsersStatus(user);
westBranches.UsersStatus(user2);

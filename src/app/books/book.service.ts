import { Injectable } from '@angular/core';
import { Book } from './book';
import { generateBooks } from './book-generator';

@Injectable({ providedIn: 'root' })
export class BookService {
    private readonly myBooks: Book[] = [
    {
        id: 1,
        title: 'STEEL BALL RUN JoJos Bizarre Adventure vol.1',
        author: 'Hirohiko Araki',
        year: 2026,
        available: true,
        genre: 'Manga',
        rating: 5,
        pages: 310,
        favorite: false,
      },
      {
        id: 2,
        title: 'STEEL BALL RUN JoJos Bizarre Adventure vol.2',
        author: 'Hirohiko Araki',
        year: 2026,
        available: false,
        genre: 'Manga',
        rating: 5,
        pages: 394,
        favorite: false,
      },
      {
        id: 3,
        title: 'STEEL BALL RUN JoJos Bizarre Adventure vol.3',
        author: 'Hirohiko Araki',
        year: 2026,
        available: true,
        genre: 'Manga',
        rating: 5,
        pages: 394,
        favorite: false,
      },
      {
        id: 4,
        title: 'STEEL BALL RUN JoJos Bizarre Adventure vol.4',
        author: 'Hirohiko Araki',
        year: 2026,
        available: false,
        genre: 'Manga',
        rating: 5,
        pages: 520,
        favorite: false,
      },
  ];

  readonly maxBorrowed: number = 10;
  private books: Book[] = this.limitBorrowed(this.myBooks.concat(generateBooks(40, 4)));

  limitBorrowed(books: Book[]): Book[] {
    let borrowedCount = 0;

    return books.map(book => {
      if (book.available) {
        return book;
      }

      borrowedCount++;

      if (borrowedCount > this.maxBorrowed) {
        return { ...book, available: true };
      }

      return book;
    });
  }

  getBooks(): Book[] {
    return [...this.books];
  }

  addBook(book: Book): void {
    const maxId = Math.max(0, ...this.books.map(b => b.id));
    this.books = [{ ...book, id: maxId + 1 }, ...this.books];
  }

  updateBook(updated: Book): void {
    this.books = this.books.map(book => book.id === updated.id ? updated : book);
  }

  deleteBook(id: number): void {
    this.books = this.books.filter(book => book.id !== id);
  }

  borrowedBooks(): Book[] {
    return this.books.filter(book => !book.available);
  }

  borrowBook(id: number): boolean {
    if (!this.canBorrowBook(id)) return false;
  
    this.books = this.books.map(book =>
      book.id === id ? { ...book, available: false } : book
    );
    return true;
  }
  canBorrowBook(id: number): boolean {
    const book = this.getBookById(id);
    return !!book && book.available &&
      this.borrowedBooks().length < this.maxBorrowed;
  }
  getBookById(id: number): Book | undefined {
    return this.books.find(book => book.id === id);
  }
  getAvailableBooks(): Book[] {
    return this.books.filter(book => book.available);
  }
  
  getFavoriteBooks(): Book[] {
    return this.books.filter(book => book.favorite);
  }
  getTotalBooksCount(): number {
    return this.books.length;
  }
 

  getBorrowedBooksCount(): number {
    return this.borrowedBooks().length;
  }
  countAvailableBooks(): number {
    return this.books.filter(book => book.available).length;
  }
  countFavoriteBooks(): number {
    return this.books.filter(book => book.favorite).length;
  }
  countAllBooks(): number {
    return this.books.length;
  }

  returnBook(id: number): void {
    this.books = this.books.map(book => book.id === id ? { ...book, available: true } : book);
  }

  toggleFavorite(id: number): void {
    this.books = this.books.map(book => book.id === id ? { ...book, favorite: !book.favorite } : book);
  }
  getFilteredBooks(
    searchText: string,
    availability: string,
    sortBy: string
  ): Book[] {
    const text = searchText.trim().toLowerCase();
  
    let result = this.books.filter(book =>
      book.title.toLowerCase().includes(text) ||
      book.author.toLowerCase().includes(text)
    );
  
    if (availability === 'available') {
      result = result.filter(book => book.available);
    } else if (availability === 'borrowed') {
      result = result.filter(book => !book.available);
    }
  
    switch (sortBy) {
      case 'title':
        result = [...result].sort((a, b) =>
          a.title.localeCompare(b.title));
        break;
      case 'year':
        result = [...result].sort((a, b) => b.year - a.year);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }
  
    return result;
  }
}

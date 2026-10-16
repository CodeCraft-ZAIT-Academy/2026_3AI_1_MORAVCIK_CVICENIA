import { Injectable } from '@angular/core';
import { Book } from './book';
import { generateBooks } from './book-generator';

@Injectable({ providedIn: 'root' })
export class BookService {
  myBooks: Book[] = [
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
    if (this.borrowedBooks().length >= this.maxBorrowed) return false;
    this.books = this.books.map(book => book.id === id ? { ...book, available: false } : book);
    return true;
  }

  returnBook(id: number): void {
    this.books = this.books.map(book => book.id === id ? { ...book, available: true } : book);
  }

  toggleFavorite(id: number): void {
    this.books = this.books.map(book => book.id === id ? { ...book, favorite: !book.favorite } : book);
  }
}

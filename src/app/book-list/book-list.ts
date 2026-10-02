import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookCard } from '../book-card/book-card';
import { Book } from '../book';
import { generateBooks } from '../book-generator';
import {Cart} from '../cart/cart';

@Component({
  selector: 'app-book-list',
  imports: [BookCard, Cart, MatButtonModule, MatIconModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  myBooks: Book[] = [
    {
      id: 1,
      title: 'STEEL BALL RUN JoJos Bizarre Adventure vol.1',
      author: 'Hirohiko Araki',
      year: 2026,
      available: true,
      genre: 'Manga'
     , rating: 5,
      pages: 310,
      favorite: false
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
      favorite: false
    },
    {
      id: 3,
      title: 'STEEL BALL RUN JoJos Bizarre Adventure vol.3',
      author: 'Hirohiko Araki',
      year: 2026,
      available: false,
      genre: 'Manga',
      rating: 5,
      pages: 394,
      favorite: false
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
      favorite: false
    }
  ];

  books: Book[] = this.myBooks.concat(generateBooks(40, 4));
  borrowedBooks(): Book[] {
    return this.books.filter(book => !book.available);
  }

  borrow(book: Book): void {
    const index = this.books.indexOf(book);
    this.books[index] = { ...book, available: false };
  }

  giveBack(book: Book): void {
    const index = this.books.indexOf(book);
    this.books[index] = { ...book, available: true };
  }

  currentPage: number = 1;
  pageSize: number = 5;

  pageCount(): number {
    return Math.ceil(this.books.length / this.pageSize);
  }

  isOnCurrentPage(index: number): boolean {
    const start = (this.currentPage - 1) * this.pageSize;
    return index >= start && index < start + this.pageSize;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.pageCount()) {
      this.currentPage++;
    }
  }
}
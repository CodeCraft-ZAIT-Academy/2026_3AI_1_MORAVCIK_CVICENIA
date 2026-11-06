import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookService } from '../../../books/book.service'; 
import { Book } from '../../../books/book';

@Component({
  selector: 'app-admin-books',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './admin-books.html',
  styleUrl: './admin-books.css'
})
export class AdminBooks {
  private bookService = inject(BookService);

  readonly books = this.bookService.books; 
  readonly confirmingDeleteId = signal<number | undefined>(undefined);

  askDelete(book: Book): void {
    this.confirmingDeleteId.set(book.id);
  }

  cancelDelete(): void {
    this.confirmingDeleteId.set(undefined);
  }

  confirmDelete(book: Book): void {
    this.bookService.deleteBook(book.id);
    this.confirmingDeleteId.set(undefined);
  }
}
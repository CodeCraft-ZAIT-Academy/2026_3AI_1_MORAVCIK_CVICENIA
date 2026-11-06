import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BookDetail } from '../book-detail/book-detail';
import { BookService } from '../../book.service';

@Component({
  selector: 'app-book-page',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule, BookDetail],
  templateUrl: './book-page.html',
  styleUrl: './book-page.css',
})
export class BookPage {
  id = input.required<string>();

  private bookService = inject(BookService);
  readonly book = computed(() => this.bookService.getBookById(Number(this.id())));

  borrow(id: number): void {
    if (!this.bookService.borrowBook(id)) {
      alert('Knihu teraz nie je možné vypožičať.');
    }
  }

  giveBack(id: number): void {
    this.bookService.returnBook(id);
  }

  toggleFavorite(id: number): void {
    this.bookService.toggleFavorite(id);
  }
}
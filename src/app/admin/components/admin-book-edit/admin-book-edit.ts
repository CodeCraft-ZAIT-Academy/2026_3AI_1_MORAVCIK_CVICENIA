import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '../../../books/book.service';
import { Book } from '../../../books/book';
import { BookForm } from '../../../books/components/book-form/book-form';

@Component({
  selector: 'app-admin-book-edit',
  standalone: true,
  imports: [CommonModule, BookForm],
  templateUrl: './admin-book-edit.html',
  styleUrl: './admin-book-edit.css'
})
export class AdminBookEdit {
  private router = inject(Router);
  private bookService = inject(BookService);

  
  id = input<string>();

  readonly isEditMode = computed(() => this.id() !== undefined);
  readonly book = computed(() => this.bookService.getBookById(Number(this.id())));

  save(book: Book): void {
    if (this.isEditMode()) {
      this.bookService.updateBook(book);
    } else {
      this.bookService.addBook(book);
    }
    this.cancel(); 
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }
}

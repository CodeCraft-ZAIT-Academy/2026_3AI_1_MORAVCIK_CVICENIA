import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookDetail } from '../book-detail/book-detail';
import { Book } from '../../book';
import { BookForm } from '../book-form/book-form';
import { getGenreColor } from '../../genre-colors';

@Component({
  selector: 'app-book-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, BookDetail, BookForm],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css'
})
export class BookCard {
  book = input.required<Book>();
  borrowed = output<void>();
  returned = output<void>();

  showDetails: boolean = false;
 

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  favoriteToggled = output<void>();

  toggleFavorite(): void {
  this.favoriteToggled.emit();
}
 

genreColor(): string {
  return getGenreColor(this.book().genre);
}
  borrow(): void {
    this.borrowed.emit();
  }

  giveBack(): void {
    this.returned.emit();
  }
  edited = output<Book>();

  editing: boolean = false;

  startEdit(): void {
    this.editing = true;
  }

  saveEdit(book: Book): void {
    this.edited.emit(book);
    this.editing = false;
  }

  cancelEdit(): void {
    this.editing = false;
  }
  deleted = output<void>();

  confirmingDelete: boolean = false;

  askDelete(): void {
    this.confirmingDelete = true;
  }

  cancelDelete(): void {
    this.confirmingDelete = false;
  }

  confirmDelete(): void {
    this.deleted.emit();
  }
}

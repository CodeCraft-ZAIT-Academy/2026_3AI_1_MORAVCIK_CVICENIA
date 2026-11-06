import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { BookCard } from '../book-card/book-card';
import { Book } from '../../book';
import { BookService } from '../../book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    BookCard,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  private bookService = inject(BookService);
  
  readonly books = this.bookService.books;
  readonly borrowedBooks = this.bookService.borrowedBooks;
  readonly maxBorrowed = this.bookService.maxBorrowed;
  readonly totalBooks = computed(() => this.books().length);
  readonly availableBooks = this.bookService.availableBooks;
  readonly favoritesOnly = signal(false);

  readonly searchText = signal('');
  readonly availability = signal('all');
  readonly sortBy = signal('none');

  readonly visibleBooks = computed(() => {
    const list = this.bookService.getFilteredBooks(
      this.searchText(),
      this.availability(),
      this.sortBy()
    );
    return this.favoritesOnly() ? list.filter(b => b.favorite) : list;
  });

  clearSearch(): void {
    this.searchText.set('');
    this.firstPage();
  }

  borrow(book: Book): void {
    if (!this.bookService.borrowBook(book.id)) {
      alert('Knihu teraz nie je možné vypožičať.');
    }
  }

  giveBack(book: Book): void {
    this.bookService.returnBook(book.id);
  }

  toggleFavorite(book: Book): void {
    this.bookService.toggleFavorite(book.id);
  }

  readonly currentPage = signal(1);
  readonly pageSize = signal(5);
  readonly pageSizes =[5, 10, 20];

  readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.visibleBooks().length / this.pageSize()))
  );

  isOnCurrentPage(index: number): boolean {
    const start = (this.currentPage() - 1) * this.pageSize();
    return index >= start && index < start + this.pageSize();
  }

  previousPage(): void {
    this.currentPage.update(p => Math.max(1, p - 1));
  }

  nextPage(): void {
    this.currentPage.update(p => Math.min(this.pageCount(), p + 1));
  }

  firstPage(): void { 
    this.currentPage.set(1); 
  }

  lastPage(): void { 
    this.currentPage.set(this.pageCount()); 
  }

  goToPage(page: number): void {
    this.currentPage.set(Math.max(1, Math.min(page, this.pageCount())));
  }

  setPageSize(size: number): void {
    this.pageSize.set(size);
    this.firstPage();
  }

  readonly firstShown = computed(() =>
    (this.currentPage() - 1) * this.pageSize() + 1
  );

  readonly lastShown = computed(() =>
    Math.min(this.currentPage() * this.pageSize(), this.visibleBooks().length)
  );

  readonly pages = computed(() =>
    Array.from({ length: this.pageCount() }, (_, i) => i + 1)
  );
}

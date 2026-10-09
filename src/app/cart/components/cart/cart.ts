import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../../../books/book';

@Component({
  selector: 'app-cart',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  books = input.required<Book[]>();
  returned = output<Book>();

  giveBack(book: Book): void {
    this.returned.emit(book);
  }
}
import { Component } from '@angular/core';
import { BookCard } from '../book-card/book-card';
import { Book } from '../book';

@Component({
  selector: 'app-book-list',
  imports: [BookCard],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  books: Book[] = [
    {
      id: 1,
      title: 'STEEL BALL RUN JoJos Bizarre Adventure vol.1',
      author: 'Hirohiko Araki',
      year: 2026,
      available: true,
      genre: 'Manga'
    },
    {
      id: 2,
      title: 'STEEL BALL RUN JoJos Bizarre Adventure vol.2',
      author: 'Hirohiko Araki',
      year: 2026,
      available: false,
      genre: 'Manga'
    },
    {
      id: 3,
      title: 'STEEL BALL RUN JoJos Bizarre Adventure vol.3',
      author: 'Hirohiko Araki',
      year: 2026,
      available: true,
      genre: 'Manga'
    }
  ];
}
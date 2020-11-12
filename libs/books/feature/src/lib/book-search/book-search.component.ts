import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  progressBar: boolean;
  snackBarRef: any;
  bookTitle: string;
  readingList$ = this.store.select(getReadingList);
  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private _snackBar: MatSnackBar,
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    this.bookTitle = book.title;
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.progressBar = true;
      setTimeout(() => {
        this.progressBar = false;
      }, 1000);
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
  openSnackBar(message: string, action: string) {
    
    this.readingList$.subscribe(data => {
      data.map(d => {
        if (d.title === this.bookTitle) {
          this.snackBarRef = this._snackBar.open('Added to reading list  '+ this.bookTitle, 'Undo', {
            duration: 3000
          });
          this.snackBarRef.onAction().subscribe(() => {
            this.store.dispatch(removeFromReadingList({ item: d }));
          });
        }
      });
    });
  }
}

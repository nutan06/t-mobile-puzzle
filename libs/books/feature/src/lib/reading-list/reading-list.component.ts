import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, addToReadingList,   ReadingListBook , getAllBooks,} from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit{
  readingList$ = this.store.select(getReadingList);
  bookTitle: string;
  snackBarRef: any ;
  books: ReadingListBook[];
  private readonly storeBooks: Store;

  constructor(
    private snackBar: MatSnackBar,
    private readonly store: Store) {}

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
    
  }

  
  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.bookTitle = item.title;
  }

  openSnackBarReadingList(message: string, action: string) {
    const that = this;
    this.snackBar.open(message, action, {
      duration: 3000,
    });
    this.books.map(book => {    
      if(book.title === this.bookTitle) {      
        this.snackBarRef = this.snackBar.open('Removed from reading list'+ book.title, 'Undo');
        this.snackBarRef.onAction().subscribe(() => { 
        this.store.dispatch(addToReadingList({book}));
      });
    }
  });
}
}
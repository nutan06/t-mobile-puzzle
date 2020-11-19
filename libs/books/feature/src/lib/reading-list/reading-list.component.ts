import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList,updateFinished } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private store: Store) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }
  updateFinished(item){
    const params: Update<ReadingListItem> = {
      id: item.bookId,
      changes:{
        finished: true,
        finishedDate: ''+ new Date()
      }
    };
    this.store.dispatch(updateFinished({ item: params }));
  }
}

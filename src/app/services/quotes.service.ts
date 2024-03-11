import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Quote } from '../interfaces/Quote.interface';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  firestore = inject(Firestore);
  quotesCollection = collection(this.firestore, 'quotes');

  getQuotes(): Observable<Quote[]> {
    return collectionData(this.quotesCollection, {
      idField: 'id',
    }) as Observable<Quote[]>;
  }
}

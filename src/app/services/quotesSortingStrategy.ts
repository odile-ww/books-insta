import { Injectable } from '@angular/core';
import { Quote } from '../interfaces/Quote.interface';
import { QuoteSortingStrategy } from '../interfaces/QuotesSortingStrategy';

@Injectable({
  providedIn: 'root',
})
export class SortByTitleStrategy implements QuoteSortingStrategy {
  sort(quotes: Quote[]): Quote[] {
    return quotes
      .slice()
      .sort((a, b) => (a.title || '').localeCompare(b.title || ''));
  }
}

@Injectable({
  providedIn: 'root',
})
export class SortByAuthorStrategy implements QuoteSortingStrategy {
  sort(quotes: Quote[]): Quote[] {
    return quotes
      .slice()
      .sort((a, b) => (a.author || '').localeCompare(b.author || ''));
  }
}

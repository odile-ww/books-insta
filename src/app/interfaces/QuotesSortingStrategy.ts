import { Quote } from './Quote.interface';

export interface QuoteSortingStrategy {
  sort(products: Quote[]): Quote[];
}

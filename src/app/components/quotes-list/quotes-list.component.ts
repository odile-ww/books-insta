import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { QuotesService } from '../../services/quotes.service';
import { Quote } from '../../interfaces/Quote.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-quotes-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quotes-list.component.html',
  styleUrl: './quotes-list.component.css',
})
export class QuotesListComponent implements OnInit, OnDestroy {
  quotes: Quote[] = [];
  isLoggedIn: boolean;
  filteredBy: string;
  sortedBy: string;

  constructor(
    protected quotesService: QuotesService,
    protected authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getQuotes();
    this.checkIfUserLoggedIn();
  }

  checkIfUserLoggedIn() {
    //TO DO: use later for individual page
    this.authService.userObservable.subscribe((user: string) => {
      if (user) {
        this.isLoggedIn = true;
      }
    });
  }

  getQuotes(): void {
    this.quotesService.getQuotes().subscribe((quotes) => {
      this.quotes = quotes;
      this.filteredBy = '';
      this.sortedBy = '';
    });
  }

  sortQuotes(strategy: 'title' | 'author'): void {
    this.quotes = this.quotesService.sort(this.quotes, strategy);
    this.sortedBy = strategy;
  }

  filterQuotes(strategy: 'keyword', keyword: string): void {
    this.quotes = this.quotesService.sort(this.quotes, strategy, keyword);
    this.filteredBy = keyword;
  }

  onSubmit(form: NgForm): void {
    const searchTerm = form.value?.search.trim();
    searchTerm && this.filterQuotes('keyword', searchTerm);
  }

  clear(): void {
    // TODO: get quotes memoized on first page load instead
    this.getQuotes();
  }

  ngOnDestroy(): void {
    // TODO: unsubscribe from subsciptions
  }
}

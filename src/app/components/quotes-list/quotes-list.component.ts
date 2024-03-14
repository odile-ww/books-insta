import { Component, OnInit, inject } from '@angular/core';
import { QuotesService } from '../../services/quotes.service';
import { Quote } from '../../interfaces/Quote.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-quotes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotes-list.component.html',
  styleUrl: './quotes-list.component.css',
})
export class QuotesListComponent implements OnInit {
  quotes: Quote[] = [];
  isLoggedIn: boolean;

  quotesService = inject(QuotesService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.quotesService.getQuotes().subscribe((quotes) => {
      this.quotes = quotes;
    });

    this.authService.userObservable.subscribe((user: string) => {
      if (user) {
        this.isLoggedIn = true;
      }
    });
  }
  sortQuotes(strategy: 'title' | 'author') {
    this.quotes = this.quotesService.sort(this.quotes, strategy);
  }
}

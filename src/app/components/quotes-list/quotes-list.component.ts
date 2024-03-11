import { Component, OnInit, inject } from '@angular/core';
import { QuotesService } from '../../services/quotes.service';
import { Quote } from '../../interfaces/Quote.interface';
import { CommonModule } from '@angular/common';

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

  ngOnInit(): void {
    this.quotesService.getQuotes().subscribe((quotes) => {
      this.quotes = quotes;
    });
  }
}

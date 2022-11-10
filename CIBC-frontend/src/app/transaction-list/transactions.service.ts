import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';

export type Currency = 'CAD' | 'USD';
export type Status = 'COMPLETE' | 'INCOMPLETE' | 'IN PROGRESS' | 'PENDING';

export interface ITransactionService{
  id: string;
  date: number;
  Amount: number;
  CurrencyCD: Currency;
  Comments: string;
  status: Status
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  constructor(
    private http: HttpClient
  ) { }

  getTransactions(startDate: string, endDate: string) {
    const API_URL=`http://localhost:3000/transactions?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<ITransactionService[]>(API_URL);
  }

  sendTransactions(result: Object) {
    const API_URL=`http://localhost:3000/transactions`;
    return this.http.post(API_URL, result);
  }

  normalizeDate(date: Date) {
    return date.toISOString().split('T')[0];
  }
}

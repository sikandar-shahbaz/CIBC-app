import { Component, OnInit, Inject } from '@angular/core';
import { TransactionsService, ITransactionService } from './transactions.service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactionList$?: Observable<ITransactionService[]>;
  startDate: string = "1970-01-01";
  endDate: any = this.normalizeDate(new Date());

  constructor(
    private transactionData: TransactionsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTransactionList();
  }

  getTransactionList() {
    this.transactionList$ = this.transactionData.getTransactions(this.startDate, this.endDate).pipe(
      map((response) => {
        if(Array.isArray(response)) {
          return response.filter(response => response.status !== 'PENDING');
        }
        return [];
      })
    );
  }

  formatDate(milliseconds: number) {
    const date = new Date(milliseconds)
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
  }

  normalizeDate(date: Date) {
    return date.toISOString().split('T')[0];
  }

  dateChanged($event: any, isStartDate: Boolean) {
    if (isStartDate) {
      this.startDate = this.normalizeDate($event.target.value);
    } else {
      this.endDate = this.normalizeDate($event.target.value);
    }
  }

  openDialog(transaction: ITransactionService): void {
    const dialogRef = this.dialog.open(TransactionDetailComponent, {
      width: '600px',
      data: transaction
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.transactionData.sendTransactions(result).subscribe((success) => {
          if(success) {
            this.getTransactionList();
          }
        });
      }
    });
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TransactionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
  
  }

  comments: string = this.data.Comments;
  
  formatDate(milliseconds: number) {
    const date = new Date(milliseconds)
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

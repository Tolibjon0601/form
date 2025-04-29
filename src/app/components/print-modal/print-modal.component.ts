import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DocumentModel } from './../../models/document.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-print-modal',
  templateUrl: './print-modal.component.html',
  styleUrls: ['./print-modal.component.scss'],
  imports: [
    CommonModule ,
    MatDialogModule,
    MatButtonModule
  ]
})
export class PrintModalComponent {

  constructor(
    public dialogRef: MatDialogRef<PrintModalComponent>,
    @Inject(MAT_DIALOG_DATA) public document: DocumentModel
  ) {}

  print(): void {
    window.print();
  }

  close(): void {
    this.dialogRef.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentModel } from '../../models/document.model';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PrintModalComponent } from '../print-modal/print-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent implements OnInit {
  documents: DocumentModel[] = [];

  constructor(
    private dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    const data = localStorage.getItem('documents');
    if (data) {
      this.documents = JSON.parse(data);
    }
  }

  viewFile(fileUrl?: string): void {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  }

  onRowDoubleClick(document: DocumentModel): void {
    this.router.navigate(['/edit', document.registrationNumber]);
  }

  printDocument(document: DocumentModel): void {
    this.dialog.open(PrintModalComponent, {
      width: '600px',
      data: document,
    });
  }
  print(): void {
    window.print();
  }
}

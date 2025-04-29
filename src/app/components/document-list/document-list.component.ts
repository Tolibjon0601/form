import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DocumentModel } from '../../models/document.model';
import { RouterModule } from '@angular/router';
import { DocumentService } from './../../services/service';
import { MatDialog } from '@angular/material/dialog';
import { PrintModalComponent } from '../print-modal/print-modal.component';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [
  CommonModule,
    RouterModule
  ],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {

  documents$!: Observable<DocumentModel[]>;

  constructor(private documentService: DocumentService,  private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.documents$ = this.documentService.getDocuments();
  }

  viewFile(fileUrl?: string): void {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  }

  onRowDoubleClick(document: DocumentModel): void {
    console.log('Hujjat ochildi (tahrir uchun):', document);
  }

  printDocument(document: DocumentModel): void {
    this.dialog.open(PrintModalComponent, {
      width: '600px',
      data: document
    });
  }
}

import { Injectable } from '@angular/core';
import { DocumentModel } from '../models/document.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private documents: DocumentModel[] = [];
  private documentsSubject: BehaviorSubject<DocumentModel[]> = new BehaviorSubject<DocumentModel[]>([]);

  constructor() {}

  // Hujjatlar ro'yxatini kuzatish
  getDocuments(): Observable<DocumentModel[]> {
    return this.documentsSubject.asObservable();
  }

  // Yangi hujjat qo'shish
  addDocument(document: DocumentModel): void {
    document.id = this.generateId();
    this.documents.push(document);
    this.updateDocuments();
  }

  // Hujjatni yangilash
  updateDocument(updatedDocument: DocumentModel): void {
    const index = this.documents.findIndex(doc => doc.id === updatedDocument.id);
    if (index !== -1) {
      this.documents[index] = updatedDocument;
      this.updateDocuments();
    }
  }

  // Hujjatni o'chirish
  deleteDocument(id: number): void {
    this.documents = this.documents.filter(doc => doc.id !== id);
    this.updateDocuments();
  }

  // Bitta hujjatni olish
  getDocumentById(id: number): DocumentModel | undefined {
    return this.documents.find(doc => doc.id === id);
  }

  // Private: hujjatlar ro'yxatini yangilash
  private updateDocuments(): void {
    this.documentsSubject.next([...this.documents]);
  }

  // Private: ID generator
  private generateId(): number {
    return this.documents.length > 0 ? Math.max(...this.documents.map(doc => doc.id)) + 1 : 1;
  }
}

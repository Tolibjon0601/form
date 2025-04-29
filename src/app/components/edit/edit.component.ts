import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-edit-document',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatRadioModule,
  ],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditDocumentComponent implements OnInit {
  editForm!: FormGroup;
  documentId!: string;
  fileError: string = '';
  selectedFile: File | null = null;
  existingDocument: any = null; // 🔥 eski hujjatni saqlash

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.documentId = this.route.snapshot.paramMap.get('id') || '';

    const data = localStorage.getItem('documents');
    if (data) {
      const documents = JSON.parse(data);
      const document = documents.find((d: any) => d.registrationNumber === this.documentId);
      if (document) {
        this.existingDocument = document; // 🔥 saqlaymiz
        this.buildForm();
        this.editForm.patchValue(document);
      } else {
        alert('Hujjat topilmadi.');
        this.router.navigate(['/list']);
      }
    } else {
      alert('Hujjatlar topilmadi.');
      this.router.navigate(['/list']);
    }
  }

  buildForm(): void {
    this.editForm = this.fb.group({
      registrationNumber: ['', Validators.required],
      registrationDate: ['', Validators.required],
      outgoingNumber: [''],
      outgoingDate: [''],
      correspondent: ['', Validators.required],
      subject: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(1000)]],
      access: [false],
      control: [false],
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.fileError = '';
    if (file) {
      const allowedFormats = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (!allowedFormats.includes(file.type)) {
        this.fileError = 'Noto‘g‘ri format.';
      }
      if (file.size > 1 * 1024 * 1024) {
        this.fileError += ' Fayl hajmi 1MB dan oshmasligi kerak!';
      }
      if (!this.fileError) {
        this.selectedFile = file;
      } else {
        this.selectedFile = null;
      }
    }
  }

  onSubmit(): void {
    if (this.editForm.invalid || this.fileError) {
      this.editForm.markAllAsTouched();
      return;
    }

    const updatedDocument = {
      ...this.editForm.value,
      fileName: this.selectedFile ? this.selectedFile.name : this.existingDocument.fileName,
      fileUrl: this.selectedFile ? URL.createObjectURL(this.selectedFile) : this.existingDocument.fileUrl,
    };

    const data = localStorage.getItem('documents');
    if (data) {
      let documents = JSON.parse(data);
      const index = documents.findIndex((d: any) => d.registrationNumber === this.documentId);
      if (index !== -1) {
        documents[index] = { ...documents[index], ...updatedDocument };
        localStorage.setItem('documents', JSON.stringify(documents));
        this.snackBar.open('✅ Hujjat muvaffaqiyatli yangilandi.', 'Yopish', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.router.navigate(['/list']);
      }
    }
  }
}

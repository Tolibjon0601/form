import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { DocumentModel } from '../../models/document.model';
import { DocumentService } from './../../services/service';
import { Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-document-form',
  standalone: true,
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss'],
  imports: [
CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export class DocumentFormComponent {
  documentForm: FormGroup;
  fileError: string = '';
  selectedFile: File | null = null;
  isSaved: boolean = false;

  deliveryMethods: string[] = ['Курьер', 'Email', 'Телефонограмма.'];
  correspondents: string[] = ['ЦБ', 'ГНИ', 'ТСЖ.'];

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const today = new Date();
    this.documentForm = this.fb.group({
      registrationNumber: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9-_]+$/)]],
      registrationDate: [today, Validators.required],
      outgoingNumber: ['', [Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9-_]*$/)]],
      outgoingDate: [null],
      deliveryMethod: [''],
      correspondent: ['', Validators.required],
      subject: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(1000)]],
      executionDate: [null],
      access: [false],
      control: [false],
      file: [null]
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
        this.fileError += ' Fayl hajmi 1MB dan oshmasligi kerak!.';
      }
      if (!this.fileError) {
        this.selectedFile = file;
      } else {
        this.selectedFile = null;
      }
    }
  }

  onSubmit(): void {
    if (this.documentForm.invalid || this.fileError) {
      this.documentForm.markAllAsTouched();
      this.snackBar.open('❗ Iltimos, barcha  maydonlarni to‘ldiring!', 'Yopish', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'  ,
        panelClass: ['snackbar-error']
      });
      return;
    }


    const formValues = this.documentForm.value as DocumentModel;
    formValues.fileName = this.selectedFile ? this.selectedFile.name : undefined;
    formValues.fileUrl = this.selectedFile ? URL.createObjectURL(this.selectedFile) : undefined;

    this.documentService.addDocument(formValues);
    this.isSaved = true;
    this.snackBar.open('✅ Hujjat muvaffaqiyatli saqlandi!', 'Yopish', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'  ,
      panelClass: ['snackbar-success']
    });    this.router.navigate(['/list']);

  }

  closeForm(): void {
    console.log('Forma yopildi.');
  }
}

export interface DocumentModel {
  id: number;
  registrationNumber: string;
  registrationDate: Date;
  outgoingNumber?: string;
  outgoingDate?: Date;
  deliveryMethod?: string;
  correspondent: string;
  subject: string;
  description?: string;
  executionDate?: Date;
  access: boolean;
  control: boolean;
  fileName?: string;
  fileUrl?: string;
}

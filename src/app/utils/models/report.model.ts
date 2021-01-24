export interface Report {
  _id: string;
  name: string;
  from: Date;
  to: Date;
  format: string;
  createdAt?: string;
}

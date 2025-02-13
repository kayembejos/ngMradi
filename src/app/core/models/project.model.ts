export interface Project<T> {
  id: string;
  title: string;
  description: string;
  uid: string;
  contributors?: string[];
  createdAt: T;
  updatedAt: T;
}

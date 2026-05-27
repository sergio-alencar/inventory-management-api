export interface PagedResponse<T> {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

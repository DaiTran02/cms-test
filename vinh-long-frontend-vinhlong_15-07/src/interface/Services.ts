export interface ApiService {
  payload?: any;
  params?: {};
  promise: (query?: string) => string;
  queryString?: string;
}

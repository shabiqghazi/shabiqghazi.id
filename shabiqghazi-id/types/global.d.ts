export type Any = unknown;
export type AnyObject = Record<string, Any>;

export interface IBaseParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

export interface IBaseResponse {
  data: Any;
  error?: IStrapiError;
  meta?: IStrapiMeta;
}

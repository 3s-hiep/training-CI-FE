/**
 * Pagination
 * @prop {number} current - current page number
 * @prop {number} totalPages - total pages number
 * @prop {number} size - total number
 * @prop {number} limit - per page data limit
 * @prop {number} range - a number of page shown at left/right side of current page in pagination
 */
export interface Pagination {
  current: number;
  totalPages: number;
  size: number;
  limit: number;
  range: number;
  previous?: number;
}

/**
 * Pagination and Filter
 * @prop {number} page - page number
 * @prop {number} limit - per page data limit
 * @prop {string} order - order (ASC, DESC)
 */
// TODO to be removed
export interface PaginationFilter {
  page: number;
  limit: number;
  order?: string;
}

/**
 * Dual-state selection
 */
export interface Selectable {
  checked: boolean;
}

/**
 * Tri-state selection
 * @prop {"all" | "partial" | "none"} checked - checked status all|partial|none
 */
export interface TriSelectable {
  checked: "all" | "partial" | "none";
}

export interface ListWithPagination<T> extends Pagination {
  data: T[];
}

export interface SelectableListWithPagination<T> extends Pagination, TriSelectable {
  data: (T & Selectable)[];
}

export interface Order {
  sortName?: string;
  order?: "asc" | "desc" | "";
}
export interface BulkDataList<T> {
  totalCount: number;
  items: T[];
}

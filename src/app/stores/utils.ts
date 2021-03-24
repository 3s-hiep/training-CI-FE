import { Pagination } from "./index.model";

// TODO deprecated
export function checkedType(items: number, selected: number): "all" | "partial" | "none" {
  return selected === 0 ? "none" : selected === items ? "all" : "partial";
}
export function checkType(dispIds: any[], selectedIds: any[]): "all" | "partial" | "none" {
  const selected = dispIds.filter((id) => selectedIds.indexOf(id) > -1);
  return selected.length === 0 ? "none" : selected.length === dispIds.length ? "all" : "partial";
}

export function getPage(data: any[] | null | undefined, props: { page?: number; limit?: number; range?: number; [key: string]: any }) {
  const size = data ? data.length : 0;
  const page = Math.floor(props.page || 1);
  const limit = Math.floor(props.limit || 1);
  return {
    current: page,
    range: props.range || 1,
    limit,
    size,
    totalPages: size > 0 ? Math.ceil(size / limit) : 0,
    data: size > 0 ? data.slice(limit * (page - 1), limit * page) : [],
  };
}

export function getPagingData(data: any[], props: Pagination) {
  const size = data ? data.length : 0;
  const page = Math.floor(props.current || 1);
  const limit = Math.floor(props.limit || 1);
  return size > 0 ? data.slice(limit * (page - 1), limit * page) : [];
}

export function getTotalPageCount(size: number, limit: number): number {
  return size > 0 ? Math.ceil(size / Math.max(limit, 1)) : 0;
}

export function getDiffBwtListData(array$1, array$2, ids: string | string[], keyUpdate, valueUpdate) {
  if (Array.isArray(ids)) {
    return array$1.map((el1) => ({
      ...el1,
      ...(array$2.find((el2) => !ids.map((id) => el2[id] === el1[id]).includes(false)) || { [keyUpdate]: valueUpdate }),
    }));
  } else {
    return array$1.map((el1) => ({
      ...el1,
      ...(array$2.find((el2) => el2[ids] === el1[ids]) || { [keyUpdate]: valueUpdate }),
    }));
  }
}

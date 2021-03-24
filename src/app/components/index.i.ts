export interface Checkbox {
  label: string;
  list: LabelledValue<string>[];
}

/**
 * AssetData: Fundamental asset information.
 * @prop {string} status - asset status
 * @prop {string} assetId - serial number
 * @prop {string} typeId - asset model
 * @prop {string} organization - asset owner
 * @prop {string} location - asset located at
 * @prop {string} alias - asset another name
 * @prop {boolean} checked? - if asset checked
 * @prop {string} id? - management asset id
 */
export interface AssetData {
  status: string;
  assetId: string;
  typeId: string;
  organization: string;
  region: string;
  location: string;
  alias: string;
  ipAddress?: string;
  installationDate?: string;
  /** State whether user checked to this asset or not */
  checked?: boolean;
  id?: string;
}

export interface AssetDataDashBoard {
  status: string;
  assetId: string;
  typeId: string;
  organization?: string;
  region?: string;
  location?: string;
  alias?: string;
}

/**
 * Package Data
 * @prop {string} packageId - package management id
 * @prop {string} name - package name
 * @prop {string} summary - package summary
 * @prop {string} status - package status
 * @prop {string} description? - package description
 * @prop {string} uploadBy? - package uploader
 * @prop {string} model? - package attachable model
 * @prop {string} uploadStatus? - package uploading status
 * @prop {string} validationStatus? - package validating status
 * @prop {string} memo? - package optional description
 * @prop {[key: string]: string} elements? - package firmwares/softwares
 */
export interface PackageData {
  packageId: string;
  name: string;
  summary: string;
  date: string;
  status: string;
  description?: string;
  uploadBy?: string;
  model?: string;
  uploadStatus?: string;
  validationStatus?: string;
  memo?: string;
  elements?: {
    [name: string]: string;
  };
}

export interface Item {
  title: string;
  content: string;
  tag?: string;
}

export interface Asset {
  model: string;
  install: string;
  name: string;
  region: string;
  organization: string;
  location: string;
  ipAddress: string;
  note: string;
  device: SubAssetStatusInfo[];
}

export interface SubAssetStatusInfo extends AssetIdentification {
  status: string;
}

export interface AssetEvent {
  date: string;
  importance: string;
  subject: string;
  eventSource: string;
}

export interface Tag {
  name: string;
  style: string;
}

/**
 * Asset Detail Basis
 * @prop {string} assetId - asset id
 * @prop {Asset} data - asset detail
 * @prop {string} image - asset image
 * @prop {string} imageUrl - asset imageUrl
 */
export interface AssetDetailBasis {
  assetId: string;
  data: Asset;
  image?: string;
  imageUrl?: string;
}

/**
 * List Content
 * @prop {string} title - title label
 * @prop {string} content - main content
 * @prop {string} tag? - additional content label
 */
export interface ListContent {
  title: string;
  content: string;
  tag?: string;
}

/**
 * Asset Identification
 * @prop {string} assetId - serial number
 * @prop {string} typeId - device model name
 */
export interface AssetIdentification {
  assetId: string;
  typeId: string;
}

export interface TaskAssetIdentification extends AssetIdentification {
  taskId?: string;
}

/**
 * Memo Update
 * @prop {string} id - package id
 * @prop {string} memo - package memo
 */
export interface Memo {
  id: string;
  memo: string;
}

export interface RadioOptions {
  label: string;
  showChild: boolean;
  checked?: boolean;
}

export interface ModalButton {
  name: string;
  value?: any;
  primary?: boolean;
}

export interface DatePickerErrorMessages {
  matDatepickerParse: string;
  matDatepickerMax: string;
  matDatepickerMin: string;
}

export interface TimePickerErrorMessages {
  cieTimepickerParse: string;
  cieTimepickerMax: string;
  cieTimepickerMin: string;
}

/**
 * Expansion Table Row
 * @prop {string|number} id - This prop is used to identify items by renderer. Must be unique.
 * @prop {boolean|null|undefined} checked - if row checked
 */
export interface ExpansionTableRow {
  id: string | number;
  checked?: boolean;
  status?: string;
  [key: string]: any;
}

/**
 * Expansion Table Data
 * @prop {ExpansionTableRow[]} data - table data
 * @prop {"all" | "partial" | "none"} checked - if all data checked
 */
export interface ExpansionTable {
  data: ExpansionTableRow[];
  checked?: "all" | "partial" | "none";
}

/**
 * Package Row
 */
export interface PackageTableRow {
  name: string;
  summary: string;
  date: string;
  status: string;
}

/**
 * Options for pagination
 */
export interface PaginationConfig {
  current: number;
  size: number;
  limit: number;
  range: number;
}

/**
 *  Package Table
 */
export interface PackageTable extends PaginationConfig {
  data: PackageTableRow[];
  checked: "all" | "partial" | "none";
}

/**
 * System Availability
 */

export interface SystemAvailability {
  title: string;
  value: number;
}

export interface LabelledValue<T> {
  label: string;
  value: T;
}

/*
 * Task result message
 */
export interface TaskResultMessage {
  connectionError: string;
  deviceError: string;
  systemError: string;
  completed: string;
}

export interface TaskExpansionDisplay {
  columns: string[];
  pagination: {
    current: number;
    limit: number;
    range: number;
  };
  resultMessages?: {
    connectionError?: string;
    deviceError?: string;
    systemError?: string;
    completed?: string;
  };
  actions?: {
    download: string;
  };
}

export interface EventFilters {
  eventSource?: string[] | string;
  keyword?: string;
}

export const initialEventFilterData: EventFilters = {
  eventSource: [],
  keyword: "",
};

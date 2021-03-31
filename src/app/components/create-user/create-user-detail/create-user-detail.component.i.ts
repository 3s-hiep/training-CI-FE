import { LabelledValue } from "../../index.i";
import { SelectGroupMulti } from "../../select-group-multi/select-group-multi.component.i";

export enum ERoleCapitalize {
  ADMINISTRATOR = "Administrator",
  ROLE2 = "Role2",
  ROLE3 = "Role3",
  ROLE4 = "Role4",
  ROLE5 = "Role5",
}
export interface Data {
  pageLabels?: Labels;
  initialData?: CreateUserData;
}
export interface DefaultValue {
  id: string;
  name: string;
}

export interface MessageError {
  id: string;
  name: string;
}
export interface CreateUserData {
  id: {
    labels?: Label;
    value: string;
    notValid?: boolean;
    message?: string;
  };
  name?: {
    labels: Label;
    value: string;
    notValid?: boolean;
    message?: string;
  };
  status?: {
    placeholder?: string;
    types: LabelledValue<string | number>[];
    value?: string | number;
  };
  role?: {
    placeholder: string;
    types: LabelledValue<string | number>[];
    value?: string[];
    notValid?: boolean;
    validates?: [];
    message?: string;
  };
  store?: {
    placeholder: string;
    types: SelectGroupMulti[];
    value?: string[];
    notValid?: boolean;
    validates?: [];
    message?: string;
  };
  passwordConfirm: {
    labels: Label;
    value: boolean;
    notValid?: boolean;
    validates?: [];
    message?: string;
  };
  isCheckCreateEdit?: boolean;
}
export interface Labels {
  pageTitle?: string;
  id: string;
  name?: string;
  status?: string;
  role?: string;
  store?: string;
  checkbox?: string;
  cancelButton?: string;
  saveButton?: string;
}

export interface Label {
  placeholder: string;
  aria: string;
  type?: string;
  attrs?: { [key: string]: any };
}

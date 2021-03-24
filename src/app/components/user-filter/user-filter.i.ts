export interface LabelledValue<T> {
  label: string;
  value: T;
}
export interface Label {
  aria: string;
  placeholder: string;
}

export interface Labels {
  name: Label;
  area: Label;
  store: Label;
  buttonClear?: string;
  buttonApply?: string;
}

export interface UserFilter {
  name?: string;
  area?: string;
  store?: string;
}

export interface SelectGroupMulti {
  name: string;
  items: LabelledValue<string>[];
}

export interface LabelledValue<T> {
  label: string;
  disabled?: boolean;
  value: T;
}

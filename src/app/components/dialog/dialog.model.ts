export interface DialogData {
  title: string;
  text: string;
  textConfirm: string;
  buttonLabels: {
    cancel: string;
    ok: string;
  };
  notCancelButton?: boolean;
  notOkButton?: boolean;
}

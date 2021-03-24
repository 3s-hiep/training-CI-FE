import { Component, Input } from "@angular/core";

import { Constant } from "../../app.constant";

export interface SystemError {
  level?: string;
  title: string;
  content: string;
  links?: {
    text: string;
    url: string;
  }[];
}

@Component({
  selector: "cie-system-error",
  templateUrl: "./system-error.component.html",
  styleUrls: ["./system-error.component.scss"],
})
export class SystemErrorComponent {
  @Input() errorData: SystemError;

  getIconColor(level: string) {
    switch ((level || "").toLowerCase()) {
      case Constant.errorLevel.critical.case:
        return Constant.errorLevel.critical.color;
      case Constant.errorLevel.warning.case:
        return Constant.errorLevel.warning.color;
      case Constant.errorLevel.info.case:
        return Constant.errorLevel.info.color;
      default:
        return "";
    }
  }
}

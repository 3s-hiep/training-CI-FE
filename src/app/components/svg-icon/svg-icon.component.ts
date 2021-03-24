import { Component, Input } from "@angular/core";
import { Icons } from "../../app.constant";

@Component({
  selector: "cie-svg-icon",
  templateUrl: "./svg-icon.component.html",
  styleUrls: ["./svg-icon.component.scss"],
})
export class SvgIconComponent {
  @Input() url: string;
  @Input() alt: string;
  @Input() width = 15;
  @Input() height = 15;
  @Input() color: string;
  @Input() icon: string;
  @Input() iconAlt: string;
  @Input() text: string;

  getUrl(url: string, icon: string) {
    if (url != null) {
      return url;
    }
    switch ((icon || "").toLowerCase()) {
      case Icons.uploading.icon.toLowerCase():
        return Icons.uploading.src;
      case Icons.validating.icon.toLowerCase():
        return Icons.validating.src;
      case Icons.complete.icon.toLowerCase():
        return Icons.complete.src;
      case Icons.ng.icon.toLowerCase():
        return Icons.ng.src;
      case Icons.error.icon.toLowerCase():
        return Icons.error.src;
      case Icons.critical.icon.toLowerCase():
        return Icons.critical.src;
      case Icons.information.icon.toLowerCase():
        return Icons.information.src;
      case Icons.warning.icon.toLowerCase():
        return Icons.warning.src;
      case Icons.inProgress.icon.toLowerCase():
        return Icons.inProgress.src;
      case Icons.scheduled.icon.toLowerCase():
        return Icons.scheduled.src;
      case Icons.failure.icon.toLowerCase():
        return Icons.failure.src;
      case Icons.invalid.icon.toLowerCase():
        return Icons.invalid.src;
      case Icons.arrows.icon.toLowerCase():
        return Icons.arrows.src;
      case Icons.arrowDown.icon.toLowerCase():
        return Icons.arrowDown.src;
      case Icons.arrowUp.icon.toLowerCase():
        return Icons.arrowUp.src;
      case Icons.info.icon.toLowerCase():
        return Icons.info.src;
      case Icons.deleted.icon.toLowerCase():
        return Icons.deleted.src;
      default:
        return "";
    }
  }
  getAlt(alt: string, iconAlt: string) {
    if (alt != null) {
      return alt;
    }
    switch ((iconAlt || "").toLowerCase()) {
      case Icons.critical.icon.toLowerCase():
        return Icons.critical.text;
      case Icons.information.icon.toLowerCase():
        return Icons.information.text;
      case Icons.warning.icon.toLowerCase():
        return Icons.warning.text;
      case Icons.ng.icon.toLowerCase():
        return Icons.ng.text;
      default:
        return "";
    }
  }
}

import { Component, Input } from "@angular/core";

@Component({
  selector: "cie-header-title",
  templateUrl: "./header-title.component.html",
  styleUrls: ["./header-title.component.scss"],
})
export class HeaderTitleComponent {
  @Input() title: string;
}

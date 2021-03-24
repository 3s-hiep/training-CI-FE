import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "cie-dropdown-menu-item",
  template: "<div>{{ this.label | translate }}</div>",
  styleUrls: ["./dropdown-menu-item.component.scss"],
})
export class DropdownMenuItemComponent implements OnInit {
  @Input() label: string;
  @Input() value: any;

  ngOnInit() {
    // tslint:disable-next-line: deprecation
    if (!this.value) {
      this.value = this.label;
    }
  }
}

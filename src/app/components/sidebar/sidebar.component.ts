import { Component, Input } from "@angular/core";
import { INavItem } from "./sidebar.component.i";
import { dataListSideBar } from "./sidebar.constant";

@Component({
  selector: "cie-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SideBarComponent {
  @Input() isExpanded: boolean;
  @Input() items: INavItem[] = dataListSideBar;
}

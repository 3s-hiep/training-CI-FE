import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, HostBinding, Input } from "@angular/core";
import { Router } from "@angular/router";
import { INavItem } from "../sidebar.component.i";

@Component({
  selector: "cie-sidebar-child",
  templateUrl: "./sidebar-child.component.html",
  styleUrls: ["./sidebar-child.component.scss"],
  animations: [
    trigger("indicatorRotate", [
      state("collapsed", style({ transform: "rotate(180deg)" })),
      state("expanded", style({ transform: "rotate(0deg)" })),
      transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4,0.0,0.2,1)")),
    ]),
  ],
})
export class SidebarChildComponent {
  @Input() expanded = false;
  @HostBinding("attr.aria-expanded") ariaExpanded = this.expanded;
  @Input() item: INavItem;
  // Declare the variable using show index of item in items
  @Input() index: number;
  constructor(public router: Router) {}

  /**
   * The function handle for 2 case
   * If the item has field children then show or close expanded list child
   * Else item not field children then router link with the field route
   */
  onItemSelected(item) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}

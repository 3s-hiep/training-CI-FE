import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

import { DropdownMenuComponent } from "./dropdown-menu.component";
import { DropdownMenuItemComponent } from "./dropdown-menu-item.component";

@NgModule({
  declarations: [DropdownMenuComponent, DropdownMenuItemComponent],
  exports: [DropdownMenuComponent, DropdownMenuItemComponent],
  imports: [TranslateModule],
})
export class DropdownMenuModule {}

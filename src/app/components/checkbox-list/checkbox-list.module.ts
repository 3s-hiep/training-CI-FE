import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { TranslateModule } from "@ngx-translate/core";

import { CheckboxListComponent } from "./checkbox-list.component";

@NgModule({
  declarations: [CheckboxListComponent],
  exports: [CheckboxListComponent],
  imports: [CommonModule, MatCheckboxModule, TranslateModule],
})
export class CheckboxListModule {}

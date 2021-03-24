import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CheckboxComponent } from "./checkbox.component";

@NgModule({
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent],
  imports: [TranslateModule, MatCheckboxModule],
})
export class CheckboxModule {}

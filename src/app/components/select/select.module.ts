import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSelectModule } from "@angular/material/select";
import { SelectComponent } from "./select.component";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, BrowserAnimationsModule, MatSelectModule, TranslateModule],
  exports: [SelectComponent],
})
export class SelectModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { SelectMultiComponent } from "./select-multi.component";
import { TranslateModule } from "@ngx-translate/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
@NgModule({
  declarations: [SelectMultiComponent],
  imports: [CommonModule, BrowserAnimationsModule, MatSelectModule, TranslateModule],
  exports: [SelectMultiComponent],
})
export class SelectMultiModule {}

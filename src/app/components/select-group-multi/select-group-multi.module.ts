import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { SelectGroupMultiComponent } from "./select-group-multi.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
@NgModule({
  declarations: [SelectGroupMultiComponent],
  imports: [CommonModule, BrowserAnimationsModule, MatSelectModule, TranslateModule],
  exports: [SelectGroupMultiComponent],
})
export class SelectGroupMultiModule {}

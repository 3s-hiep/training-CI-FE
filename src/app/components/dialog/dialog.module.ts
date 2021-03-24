import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonModule } from "../button/button.module";
import { DiaLogComponent } from "./dialog.component";

@NgModule({
  declarations: [DiaLogComponent],
  entryComponents: [DiaLogComponent],
  imports: [CommonModule, MatDialogModule, ButtonModule, TranslateModule, BrowserAnimationsModule],
})
export class DiaLogModule {}

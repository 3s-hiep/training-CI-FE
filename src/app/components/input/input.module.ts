import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { InputComponent } from "./input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [InputComponent],
  exports: [InputComponent],
  imports: [CommonModule, FlexLayoutModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, TranslateModule],
})
export class InputModule {}

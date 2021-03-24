import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PipesModule } from "../pipes/pipes.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  exports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, PipesModule, TranslateModule],
})
export class PluginModule {}

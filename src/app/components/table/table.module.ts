import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./table.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { AddDirective } from "./table-cell/add.directive";
import { TableCellComponent } from "./table-cell/table-cell.component";
import { TranslateModule } from "@ngx-translate/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [TableComponent, AddDirective, TableCellComponent],
  entryComponents: [TableComponent],
  exports: [TableComponent],
  imports: [CommonModule, MatPaginatorModule, BrowserAnimationsModule, MatSortModule, MatTableModule, TranslateModule],
})
export class TableModule {}

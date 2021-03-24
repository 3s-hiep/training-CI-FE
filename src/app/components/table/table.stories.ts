import { storiesOf, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";
import { TranslateModule } from "@ngx-translate/core";

import { FlexLayoutModule } from "@angular/flex-layout";

import { TableModule } from "./table.module";
import { CellComponent } from "./table-cell/cell-component";
import { Component, Input } from "@angular/core";
import { IPaginationOption } from "./table.component.i";

import { action } from "@storybook/addon-actions";
export interface DataComponent {
  id: string;
}
@Component({
  selector: "cie-a",
  template: ` <a href="javascript:;" (click)="changeNow()">{{ data.id }}</a> `,
})
export class AComponent {
  @Input() data: DataComponent;
  changeNow() {
    console.log(this.data.id);
    alert(this.data.id);
  }
}
@Component({
  selector: "cie-input",
  template: ` <input name="a" id="001" [value]="data.id" (change)="onchange($event)" style="border:1px solid #cccc; height:40px" /> `,
})
export class InputComponent {
  @Input() data: DataComponent;
  onchange($event) {
    alert($event.target.value);
  }
}
@Component({
  selector: "cie-input",
  template: ` <button style="background-color:">Onclick</button> `,
})
export class ButtonComponent {
  @Input() data: DataComponent;
  onchange($event) {
    alert($event.target.value);
  }
}
const ELEMENT_DATA: any[] = [
  { position: new CellComponent<DataComponent>(AComponent, { id: "0001" }), name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: new CellComponent<DataComponent>(AComponent, { id: "abc" }), name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 4, name: "Beryllium", weight: new CellComponent<DataComponent>(AComponent, { id: "s3" }), symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: new CellComponent<DataComponent>(AComponent, { id: "123" }), name: "Hydrogen", weight: 1.0079, symbol: "H" },
];
const pageOption: IPaginationOption = {
  color: "primary",
  pageSizeOptions: [10, 20, 30],
  length: 1000,
  pageSize: 10,
  pageIndex: 3,
};

storiesOf("Components | Molecules/Table", module)
  .addDecorator(
    moduleMetadata({
      imports: [CommonModule, MatDialogModule, TableModule, FlexLayoutModule, TranslateModule.forRoot()],
      declarations: [AComponent, InputComponent, ButtonComponent],
      entryComponents: [AComponent, InputComponent, ButtonComponent],
    }),
  )
  .add("useCase", () => ({
    template: `<cie-table
    (pagination)="pagination($event)"
    [paginationOptions]="pageOption"
    [havePagination]="true"
    [displayedColumns]="displayedColumns"
    [data]="data
   "></cie-table>`,
    props: {
      displayedColumns: [
        {
          key: "position",
          label: "Position",
        },
        {
          key: "name",
          label: "Name",
        },
        {
          key: "weight",
          label: "Name",
        },
        {
          key: "symbol",
          label: "Symbol",
        },
      ],
      data: ELEMENT_DATA,
      pageOption,
      pagination: (event) => action(event),
    },
  }));

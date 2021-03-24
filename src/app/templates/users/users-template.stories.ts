import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs } from "@storybook/addon-knobs";
import { FlexLayoutModule } from "@angular/flex-layout";

import { TranslateModule } from "@ngx-translate/core";
import { UsersTemplateModule } from "./users-template.module";
import { LabelledValue, Labels, UserFilter } from "../../components/user-filter/user-filter.i";
import { action } from "@storybook/addon-actions";
import { Component, Input, OnInit } from "@angular/core";
import { CellComponent } from "../../components/table/table-cell/cell-component";
import { IPaginationOption } from "../../components/table/table.component.i";
@Component({
  selector: "bridge-a",
  template: ` <a href="javascript:;" (click)="onDelete()">{{ deleteLabel }}</a>`,
})
export class ActionComponent implements OnInit {
  ngOnInit(): void {
    if (this.data?.deleteFlag) {
      this.deleteLabel = "Undelete";
    } else {
      this.deleteLabel = "Delete";
    }
  }
  @Input() data: any;
  public deleteLabel;
  onDelete() {}
}
@Component({
  selector: "cie-e",
  template: ` <a href="javascript:;" (click)="onEdit()">{{ data.id }}</a>`,
})
export class EditComponent {
  @Input() data: any;
  onEdit() {
    alert(this.data.id);
  }
}
const ELEMENT_DATA: any[] = [
  {
    id: new CellComponent<any>(EditComponent, { id: "00001" }),
    name: "Name 0001",
    area: "Area 0001",
    store: "store 0001",
    deleteFlag: false,
    action: new CellComponent<any>(ActionComponent, { id: "00001", deleteFlag: false }),
  },
  {
    id: new CellComponent<any>(EditComponent, { id: "00001" }),
    name: "Name Deleted",
    area: "Area Deleted",
    store: "store Deleted",
    deleteFlag: true,
    rowClass: "delete-flag",
    action: new CellComponent<any>(ActionComponent, { id: "0001", deleteFlag: true }),
  },
  {
    id: new CellComponent<any>(EditComponent, { id: "00001" }),
    name: "Name 0001",
    area: "Area 0001",
    store: "store 0001",
    deleteFlag: false,

    action: new CellComponent<any>(ActionComponent, { id: "0001", deleteFlag: false }),
  },
  {
    id: new CellComponent<any>(EditComponent, { id: "00001" }),
    name: "Name 0001",
    area: "Area 0001",
    store: "store 0001",
    deleteFlag: false,

    action: new CellComponent<any>(ActionComponent, { id: "0001" }),
  },
  {
    id: new CellComponent<any>(EditComponent, { id: "00001" }),
    name: "Name 0001",
    area: "Area 0001",
    store: "store 0001",
    deleteFlag: false,

    action: new CellComponent<any>(ActionComponent, { id: "0001", deleteFlag: false }),
  },
  {
    id: new CellComponent<any>(EditComponent, { id: "00001" }),
    name: "Name 0001",
    area: "Area 0001",
    store: "store 0001",
    deleteFlag: false,

    action: new CellComponent<any>(ActionComponent, { id: "0001", deleteFlag: false }),
  },
  {
    id: new CellComponent<any>(EditComponent, { id: "00001" }),
    name: "Name 0001",
    area: "Area 0001",
    store: "store 0001",
    deleteFlag: false,

    action: new CellComponent<any>(ActionComponent, { id: "0001", deleteFlag: false }),
  },
  {
    id: new CellComponent<any>(EditComponent, { id: "00001" }),
    name: "Name 0001",
    area: "Area 0001",
    store: "store 0001",
    deleteFlag: false,

    action: new CellComponent<any>(ActionComponent, { id: "0001", deleteFlag: false }),
  },
  {
    id: new CellComponent<any>(EditComponent, { id: "00001" }),
    name: "Name 0001",
    area: "Area 0001",
    store: "store 0001",
    deleteFlag: false,

    action: new CellComponent<any>(ActionComponent, { id: "0001", deleteFlag: false }),
  },
];
const pageOption: IPaginationOption = {
  color: "primary",
  pageSizeOptions: [10, 20, 30],
  length: 1000,
  pageSize: 10,
  pageIndex: 3,
  disabled: false,
};
storiesOf("Components | Page/Uses", module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [ActionComponent, EditComponent],
      imports: [UsersTemplateModule, FlexLayoutModule, TranslateModule.forRoot()],
      entryComponents: [ActionComponent, EditComponent],
    }),
  )
  .add("usage", () => ({
    template: `
    <div style="background: #f3f4f9 0% 0% no-repeat padding-box;">
    <cie-users-template
      [userAreas]="filterAction.userAreas"
      [userStores]="filterAction.userStores"
      [userFilter]="filterAction.userFilters"
      [labelsFilter]="filterAction.labelsFilter"
      [pageTitle]="pageTitle"
      [textButton]="textButton"
      [tableAction]="tableAction"
      [dataTable]="dataTable"
      (filtered)="filtered($event)"
      (pagination)="pagination($event)"
      (createButtonUsers)="createButtonUsers($event)"
     ></cie-users-template
    ></div>
    `,
    props: {
      pageTitle: "User",
      textButton: "Create",
      filterAction: {
        userFilters: {
          name: "",
          area: "",
          store: "",
        } as UserFilter,
        userAreas: [
          { value: "Area1", label: "Area1" },
          { value: "Area2", label: "Area2" },
          { value: "Area3", label: "Area3" },
          { value: "Area4", label: "Area4" },
          { value: "Area5", label: "Area5" },
        ] as LabelledValue<string>[],
        userStores: [
          { value: "Store1", label: "Store1" },
          { value: "Store2", label: "Store2" },
          { value: "Store3", label: "Store3" },
          { value: "Store4", label: "Store4" },
          { value: "Store5", label: "Store5" },
        ] as LabelledValue<string>[],
        labelsFilter: {
          name: {
            aria: "ID/Name",
            placeholder: " input",
          },
          area: {
            aria: "Area",
            placeholder: "All",
          },
          store: {
            aria: "Store",
            placeholder: "All",
          },
          buttonApply: "Apply",
          buttonClear: "Clear",
        } as Labels,
      },
      filtered: action("action"),
      pagination: action("action"),
      createButtonUsers: action("action"),
      tableAction: {
        displayedColumns: [
          {
            key: "id",
            label: "ID",
          },
          {
            key: "name",
            label: "Name",
          },
          {
            key: "area",
            label: "Area",
          },
          {
            key: "store",
            label: "Store",
          },
          {
            key: "action",
            label: "Action",
          },
        ],
        paginationOptions: pageOption,
        havePagination: true,
      },
      dataTable: ELEMENT_DATA,
    },
  }));

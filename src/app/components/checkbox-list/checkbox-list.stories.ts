import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { FlexLayoutModule } from "@angular/flex-layout";

import { CheckboxListModule } from "./checkbox-list.module";
import { LabelledValue } from "../index.i";
import { TranslateModule } from "@ngx-translate/core";

storiesOf("Components | Atoms/CheckboxList", module)
  .addDecorator(
    moduleMetadata({
      imports: [CheckboxListModule, FlexLayoutModule, TranslateModule.forRoot()],
    }),
  )
  .add("logType", () => ({
    template: `
      <div fxLayout="column">
        <div id="label" fxFlex="100%">{{label}}</div>
        <bridge-checkbox-list
          class="checkbox-list"
          fxFlex="100%"
          [label]="label"
          [list]="list"
          (checked)="checked($event)"
        ></bridge-checkbox-list>
      </div>
      <style>
      .checkbox-list {
        padding-left: 10px;
      }
      </style>
    `,
    props: {
      label: "logType",
      list: [
        { value: "Bussuness", label: "bussiness" },
        { value: "Trace", label: "trace" },
      ] as LabelledValue<string>[],
      checked: action("checked"),
    },
  }))
  .add("logType Checked", () => ({
    template: `
      <div fxLayout="column">
        <div id="label" fxFlex="100%">{{label}}</div>
        <bridge-checkbox-list
          class="checkbox-list"
          fxFlex="100%"
          [label]="label"
          [list]="list"
          [checkedItem]="checkedItem"
          (checked)="checked($event)"
        ></bridge-checkbox-list>
      </div>
      <style>
      .checkbox-list {
        padding-left: 10px;
      }
      </style>
    `,
    props: {
      label: "logType",
      list: [
        { value: "Bussiness", label: "bussiness" },
        { value: "Trace", label: "trace" },
      ] as LabelledValue<string>[],
      checkedItem: ["trace"],
      checked: action("checked"),
    },
  }));

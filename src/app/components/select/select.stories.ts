import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { FlexLayoutModule } from "@angular/flex-layout";

import { SelectModule } from "./select.module";
import { LabelledValue } from "./select.i";
import { TranslateModule } from "@ngx-translate/core";

const items = [
  { value: "Once", label: "once" },
  { value: "Daily", label: "daily" },
  { value: "Weekly", label: "Weekly" },
  { value: "Monthly", label: "monthly" },
  { value: "Once", label: "once" },
] as LabelledValue<string>[];

storiesOf("Components | Atoms/Select", module)
  .addDecorator(
    moduleMetadata({
      imports: [SelectModule, FlexLayoutModule, TranslateModule.forRoot()],
    }),
  )
  .add("without selected", () => ({
    template: `
      <cie-select
        [label]="label"
        [items]="items"
        (selected)="selected($event)"
      ></cie-select>
    `,
    props: {
      label: "repeat",
      items,
      selected: action("selected"),
    },
  }))
  .add("with selected", () => ({
    template: `
      <cie-select
        [label]="label"
        [items]="items"
        [selectedItem]="selectedItem"
        (selected)="selected($event)"
      ></cie-select>
    `,
    props: {
      label: "repeat",
      items,
      selectedItem: "weekly",
      selected: action("selected"),
    },
  }))
  .add("with show Error", () => ({
    template: `
      <cie-select
        [label]="label"
        [items]="items"
        [selectedItem]="selectedItem"
        (selected)="selected($event)"
        [notValid]="true"
        [message]="'Error !'"
      ></cie-select>
    `,
    props: {
      label: "repeat",
      items,
      selectedItem: "weekly",
      selected: action("selected"),
    },
  }));

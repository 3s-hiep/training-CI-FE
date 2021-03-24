import { storiesOf, moduleMetadata } from "@storybook/angular";
import { SelectMultiModule } from "./select-multi.module";
import { action } from "@storybook/addon-actions";
import { LabelledValue } from "./select-multi.i";
import { TranslateModule } from "@ngx-translate/core";

const items = [
  { value: "CI100", label: "CI100" },
  { value: "CI200", label: "CI200" },
  { value: "CI50", label: "CI50" },
  { value: "CI51", label: "CI51" },
  { value: "CI52", label: "CI52" },
  { value: "CI53", label: "CI53" },
] as LabelledValue<string>[];

storiesOf("Components | Atoms/SelectMulti", module)
  .addDecorator(
    moduleMetadata({
      imports: [SelectMultiModule, TranslateModule.forRoot()],
    }),
  )
  .add("Multi select", () => ({
    template: `
    <cie-select-multi
      [label]="label"
      [items]="items"
      [selectedItem]="selectedItem"
      (selected)="selected($event)"
      [isStoryBook]="isStoryBook"
    ></cie-select-multi>
		`,
    props: {
      items,
      label: "Model",
      selectedItem: [],
      selected: action("selected"),
      isStoryBook: true, // This attribute should not be added when not in the storybook, defaul false
    },
  }))
  .add("Multi select with All", () => ({
    template: `
    <cie-select-multi
      [label]="label"
      [all]="all"
      [allValue]="allValue"
      [items]="items"
      [selectedItem]="selectedItem"
      [isStoryBook]="isStoryBook"
      (selected)="selected($event)"
    ></cie-select-multi>
		`,
    props: {
      items,
      label: "Model",
      selectedItem: [],
      selected: action("selected"),
      all: true, // true or false to return yes/no select all
      allValue: "all", // cannot be the same as the value of items
      isStoryBook: true, // This attribute should not be added when not in the storybook, defaul false
    },
  }))
  .add("Show error", () => ({
    template: `
    <cie-select-multi
      [label]="label"
      [items]="items"
      [selectedItem]="selectedItem"
      (selected)="selected($event)"
      [isStoryBook]="isStoryBook"
      [valid]="false"
      [message]="'Error !'"
    ></cie-select-multi>
		`,
    props: {
      items,
      label: "Model",
      selectedItem: [],
      selected: action("selected"),
      isStoryBook: true, // This attribute should not be added when not in the storybook, defaul false
    },
  }));

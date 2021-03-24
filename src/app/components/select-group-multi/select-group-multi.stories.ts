import { TranslateModule } from "@ngx-translate/core";
import { action } from "@storybook/addon-actions";
import { moduleMetadata, storiesOf } from "@storybook/angular";
import { SelectGroupMulti } from "./select-group-multi.component.i";
import { SelectGroupMultiModule } from "./select-group-multi.module";

const groups = [
  {
    name: "Area-A",
    items: [
      { value: "storea1", label: "Store-A-1" },
      { value: "storea2", label: "Store-A-2" },
    ],
  },
  {
    name: "Area-B",
    items: [
      { value: "storeb1", label: "Store-B-1" },
      { value: "storeb2", label: "Store-B-2" },
    ],
  },
] as SelectGroupMulti[];

storiesOf("Components | Atoms/SelectGroupMulti", module)
  .addDecorator(
    moduleMetadata({
      imports: [SelectGroupMultiModule, TranslateModule.forRoot()],
    }),
  )
  .add("Multi select group", () => ({
    template: `
    <cie-select-group-multi
      [label]="label"
      [groups]="groups"
      [selectedItem]="selectedItem"
      [maxItemsDisplay]="maxItemsDisplay"
      (selected)="selected($event)"
      [isStoryBook]="isStoryBook"
    ></cie-select-group-multi>
		`,
    props: {
      groups,
      label: "Store-A-1",
      selectedItem: ["storea1"],
      selected: action("selected"),
      maxItemsDisplay: 2,
      isStoryBook: true, // This attribute should not be added when not in the storybook, default false
    },
  }))
  .add("Multi select group error", () => ({
    template: `
    <cie-select-group-multi
      [label]="label"
      [groups]="groups"
      [selectedItem]="selectedItem"
      [maxItemsDisplay]="maxItemsDisplay"
      (selected)="selected($event)"
      [isStoryBook]="isStoryBook"
      [notValid]="true"
      [message]="'Error !'"
    ></cie-select-group-multi>
		`,
    props: {
      groups,
      label: "Store-A-1",
      selectedItem: ["storea1"],
      selected: action("selected"),
      maxItemsDisplay: 2,
      isStoryBook: true, // This attribute should not be added when not in the storybook, default false
    },
  }));

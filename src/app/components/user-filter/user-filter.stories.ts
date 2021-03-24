import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs } from "@storybook/addon-knobs";
import { UserFilterModule } from "./user-filter.module";
import { LabelledValue, Labels, UserFilter } from "./user-filter.i";
import { TranslateModule } from "@ngx-translate/core";
import { action } from "@storybook/addon-actions";

storiesOf("Components | Atoms/UserFilter", module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [UserFilterModule, TranslateModule.forRoot()],
    }),
  )
  .add("usage", () => ({
    template: `
    <cie-user-filter
      [userAreas]="userAreas"
      [userStores]="userStores"
      [filters]="userFilter"
      [labels]="labels"
      (filtered)="filtered($event)"
      fxFlex="100%"
    ></cie-user-filter>
    `,
    props: {
      userFilter: {
        isFilter: true,
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
      labels: {
        name: {
          aria: "ID/Name",
          placeholder: " Input",
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
      filtered: action("event"),
    },
  }));

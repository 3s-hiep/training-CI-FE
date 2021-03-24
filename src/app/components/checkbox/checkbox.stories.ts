import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CheckboxModule } from "./checkbox.module";
import { TranslateModule } from "@ngx-translate/core";

storiesOf("Components | Atoms/CheckBox", module)
  .addDecorator(
    moduleMetadata({
      imports: [CheckboxModule, BrowserAnimationsModule, TranslateModule.forRoot()],
    }),
  )
  .add("usecase", () => ({
    template: `
      <cie-checkbox
        (checked)="checked($event)"
        [checkbox]="checkbox"
        [labels]="labels"
       >
      </cie-checkbox>
      `,
    props: {
      labels: {
        area: "Error!",
      },
      checkbox: true,
      checked: action("check"),
    },
  }));

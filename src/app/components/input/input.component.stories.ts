import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, text } from "@storybook/addon-knobs";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { action } from "@storybook/addon-actions";

import { InputComponent, Labels } from "./input.component";
import { TranslateModule } from "@ngx-translate/core";
import { IValidate } from "./input.i";

const validates = [Validators.email, Validators.required];
const message: IValidate[] = [
  {
    type: "email",
    message: "Email not valid",
  },
  {
    type: "required",
    message: "Required not valid",
  },
];
storiesOf("Components | Atoms/Form/Input", module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [InputComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
    }),
  )
  .add("form with placeholder", () => ({
    template: `<cie-input
      [labels]="labels"
      (value)="value($event)"
      [defaultValue]="defaultValue"
      [notValid]="false"
      [message]="message"
    ></cie-input>`,
    props: {
      labels: {
        placeholder: text("placeHolder", "This is a placeHolder"),
        aria: text("aria-label", "This is aria-label for form"),
      } as Labels,
      value: action("value"),
      defaultValue: "",
      message,
      validates,
    },
  }));

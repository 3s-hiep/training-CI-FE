import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, radios } from "@storybook/addon-knobs";
import { FlexLayoutModule } from "@angular/flex-layout";

import { ButtonModule } from "./button.module";

const createClassKnob = () =>
  radios(
    "ngClass",
    {
      primary: "primary",
      secondary: "secondary",
      basic: "basic",
      none: "",
    },
    "",
  );

storiesOf("Components | Atoms/Button", module)
  .addDecorator(
    moduleMetadata({
      imports: [FlexLayoutModule, ButtonModule],
    }),
  )
  .addDecorator(withKnobs)
  .add("pallete", () => ({
    template: `
      <div fxLayout="row" fxLayoutGap="10px">
        <div fxLayout="column" fxLayoutGap="5px">
          <div>Default use</div>
          <cie-button fxFlex="100%"[ngClass]="class" (click)="click($event)">{{text}}</cie-button>
          <cie-button fxFlex="100%"class="primary" (click)="click($event)">{{text}}</cie-button>
          <cie-button fxFlex="100%"class="secondary" (click)="click($event)">{{text}}</cie-button>
          <cie-button fxFlex="100%"class="basic" (click)="click($event)">{{text}}</cie-button>
        </div>
        <div fxLayout="column" fxLayoutGap="5px">
          <div>Disabled use</div>
          <cie-button fxFlex="100%" [ngClass]="{class: true,  disabled: true}" [isDisabled]="true" (click)="click($event)">{{text}}</cie-button>
          <cie-button fxFlex="100%" class="primary disabled" [isDisabled]="true" (click)="click($event)">{{text}}</cie-button>
          <cie-button fxFlex="100%" class="secondary disabled"  [isDisabled]="true" (click)="click($event)">{{text}}</cie-button>
          <cie-button fxFlex="100%" class="basic disabled"  [isDisabled]="true" (click)="click($event)">{{text}}</cie-button>
        </div>
      </div>
    `,
    props: {
      text: text("text", "BUTTON"),
      class: createClassKnob(),
      click: action("button clicked"),
    },
  }))
  .add("with required", () => ({
    template: "<cie-button class='primary' [required]>required</cie-button>",
    props: {
      required: true,
    },
  }));

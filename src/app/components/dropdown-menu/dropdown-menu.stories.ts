import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, text } from "@storybook/addon-knobs";

import { DropdownMenuModule } from "./dropdown-menu.module";
import { TranslateModule } from "@ngx-translate/core";

const template = `
<cie-dropdown-menu>
  <cie-dropdown-menu-item [label]="first"></cie-dropdown-menu-item>
  <cie-dropdown-menu-item [label]="second"></cie-dropdown-menu-item>
  <cie-dropdown-menu-item [label]="third"></cie-dropdown-menu-item>
</cie-dropdown-menu>
`;

storiesOf("Components | Atoms/DropDownMenu", module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [DropdownMenuModule, TranslateModule.forRoot()],
    }),
  )
  .add("simple usage", () => ({
    template,
    props: {
      first: text("label", "1st-item"),
      second: text("label", "2nd-item"),
      third: text("label", "3rd-item"),
    },
  }));

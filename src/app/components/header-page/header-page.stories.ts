import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs } from "@storybook/addon-knobs";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HeaderPagerModule } from "./header-page.module";
import { TranslateModule } from "@ngx-translate/core";

storiesOf("Components | Atoms/Title page", module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [HeaderPagerModule, FlexLayoutModule, TranslateModule.forRoot()],
    }),
  )
  .add("usage", () => ({
    template: `
    <cie-header-page [title]="title"></cie-header-page>
    `,
    props: {
      title: "User title",
    },
  }));

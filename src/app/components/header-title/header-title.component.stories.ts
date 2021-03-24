import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs } from "@storybook/addon-knobs";

import { HeaderTitleComponent } from "./header-title.component";
import { TranslateModule } from "@ngx-translate/core";

storiesOf("Components | Atoms/HeaderTitle", module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [HeaderTitleComponent],
      imports: [TranslateModule.forRoot()],
    }),
  )
  .add("title", () => ({
    component: HeaderTitleComponent,
    props: {
      title: "cie-X",
    },
  }));

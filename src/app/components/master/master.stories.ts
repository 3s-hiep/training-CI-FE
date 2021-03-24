import { withKnobs } from "@storybook/addon-knobs";
import { moduleMetadata, storiesOf } from "@storybook/angular";

import { TranslateModule } from "@ngx-translate/core";
import { MasterModule } from "./master.module";

import { APP_BASE_HREF } from "@angular/common";

storiesOf("Components | Molecules/Master", module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [MasterModule, TranslateModule.forRoot()],
      providers: [{ provide: APP_BASE_HREF, useValue: "" }],
    }),
  )
  .add("usage", () => ({
    template: "<cie-master></cie-master>",
  }));

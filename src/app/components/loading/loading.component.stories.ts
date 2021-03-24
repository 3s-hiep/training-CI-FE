import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs } from "@storybook/addon-knobs";

import { LoadingComponent } from "./loading.component";

storiesOf("Components | Atoms/Loading", module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [LoadingComponent],
    }),
  )
  .add("loading", () => ({
    component: LoadingComponent,
    props: {},
  }));

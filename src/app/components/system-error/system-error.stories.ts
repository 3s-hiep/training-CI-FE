import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs } from "@storybook/addon-knobs";

import { SystemErrorModule } from "./system-error.module";
import { SystemError } from "./system-error.component";

storiesOf("Components | Molecules/SystemError", module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [SystemErrorModule],
    }),
  )
  .add("server error", () => ({
    template: `
    <cie-system-error [errorData]="errorData"></cie-system-error>
    `,
    props: {
      errorData: {
        level: "critical",
        title: "Server Error",
        content: "An Unknown server error has occured. Guidance text Guidance text Guidance text.",
        links: [
          {
            text: "Login",
            url: "/logout",
          },
        ],
      } as SystemError,
    },
  }))
  .add("permission error", () => ({
    template: `
    <cie-system-error [errorData]="errorData"></cie-system-error>
    `,
    props: {
      errorData: {
        level: "warning",
        title: "You need permission",
        content: "You have no access right. Guidance text Guidance text Guidance text.",
        links: [
          {
            text: "Login",
            url: "/logout",
          },
        ],
      } as SystemError,
    },
  }))
  .add("credentials expired", () => ({
    template: `
    <cie-system-error [errorData]="errorData"></cie-system-error>
    `,
    props: {
      errorData: {
        level: "warning",
        title: "Session Expired",
        content: "Your session has expired due to inactivity. Please login again to continue working.",
        links: [
          {
            text: "Login",
            url: "/logout",
          },
        ],
      } as SystemError,
    },
  }))
  .add("without icon", () => ({
    template: `
    <cie-system-error [errorData]="errorData"></cie-system-error>
    `,
    props: {
      errorData: {
        title: "Data Not Found",
        content: "Your requested asset information is not found.",
        links: [
          {
            text: "Back to top",
            url: "/dashboard",
          },
        ],
      } as SystemError,
    },
  }));

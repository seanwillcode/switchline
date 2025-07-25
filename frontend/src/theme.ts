import { createTheme, Text, Title } from "@mantine/core";

export const theme = createTheme({
  components: {
    Text: Text.extend({
      defaultProps: {
        color: "white",
      },
    }),
    Title: Title.extend({
      defaultProps: {
        c: "white",
      },
    }),
  },
});

/**
 *  Copyright Kirk Technologies.
 */

import { connect } from "react-redux";
import { Layout } from "react-admin";

const darkTheme = {
    palette: {
        type: "dark", // Switching the dark mode on is a single property value change.
    },
};

const lightTheme = {
    palette: {
        secondary: {
            light: "#5f5fc4",
            main: "#283593",
            dark: "#001064",
            contrastText: "#fff",
        },
    },
};

export const AppLayout = connect(
    (state: any) => ({
        theme: state.theme === "dark" ? darkTheme : lightTheme,
    }),
    {},
)(Layout);

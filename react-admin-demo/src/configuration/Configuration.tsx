/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { translate, changeLocale, ViewTitle } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import compose from "recompose/compose";
import { changeTheme } from "./actions";

const styles = {
    label: { width: "10em", display: "inline-block" },
    button: { margin: "1em" },
};

const Config = ({ classes, theme, locale, changeLocale: changeL, changeTheme: changeT, translate: trans }: any) => {
    const onTheme = (themestr: string) => () => {
        changeT(themestr);
    };
    const onLocal = (local: string) => () => {
        changeL(local);
    };
    return (
        <Card>
            <ViewTitle title={trans("pos.configuration")} />
            <CardContent>
                <div className={classes.label}>{trans("pos.theme.name")}</div>
                <Button
                    variant="raised"
                    className={classes.button}
                    color={theme === "light" ? "primary" : "default"}
                    onClick={onTheme("light")}
                >
                    {trans("pos.theme.light")}
                </Button>
                <Button
                    variant="raised"
                    className={classes.button}
                    color={theme === "dark" ? "primary" : "default"}
                    // tslint:disable-next-line:jsx-no-lambda
                    onClick={() => changeT("dark")}
                >
                    {trans("pos.theme.dark")}
                </Button>
            </CardContent>
            <CardContent>
                <div className={classes.label}>{trans("pos.language")}</div>
                <Button
                    variant="raised"
                    className={classes.button}
                    color={locale === "en" ? "primary" : "default"}
                    onClick={onLocal("en")}
                >
                    en
                </Button>
                <Button
                    variant="raised"
                    className={classes.button}
                    color={locale === "cn" ? "primary" : "default"}
                    onClick={onLocal("cn")}
                >
                    中文
                </Button>
            </CardContent>
        </Card>
    );
};

const mapStateToProps = (state: any) => ({
    theme: state.theme,
    locale: state.i18n.locale,
});

export const Configuration = compose(
    connect(
        mapStateToProps,
        {
            changeLocale,
            changeTheme,
        },
    ),
    translate,
    withStyles(styles),
)(Config);

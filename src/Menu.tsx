/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import SettingsIcon from "@material-ui/icons/Settings";
import LabelIcon from "@material-ui/icons/Label";
import MenuItem from "@material-ui/core/MenuItem";
import { translate, MenuItemLink, Responsive } from "react-admin";
import { withRouter } from "react-router-dom";

import { CustomerIcon } from "./customers";
import { CommandIcon } from "./commands";
import { ProductIcon } from "./products";
import { CategoryIcon } from "./categories";
import { ReviewIcon } from "./reviews";

const items = [
    { name: "customers", icon: <CustomerIcon /> },
    { name: "segments", icon: <LabelIcon /> },
    { name: "commands", icon: <CommandIcon /> },
    { name: "products", icon: <ProductIcon /> },
    { name: "categories", icon: <CategoryIcon /> },
    { name: "reviews", icon: <ReviewIcon /> },
];

const styles: any = {
    main: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100%",
    },
};

const Comp = ({ onMenuClick, translate: trans, logout }: any) => (
    <div style={styles.main}>
        {/* <DashboardMenuItem onClick={onMenuClick} /> */}
        {/*<a href="https://github.com/Kirk-Wang/react-admin-app" target="_blank">
            Github
        </a>*/}
        <MenuItem>
            <a href="https://github.com/Kirk-Wang/react-admin-app" target="_blank">
                Github
            </a>
        </MenuItem>
        {items.map(item => (
            <MenuItemLink
                key={item.name}
                to={`/${item.name}`}
                primaryText={trans(`resources.${item.name}.name`, {
                    smart_count: 2,
                })}
                leftIcon={item.icon}
                onClick={onMenuClick}
            />
        ))}
        <MenuItemLink
            to="/configuration"
            primaryText={trans("pos.configuration")}
            leftIcon={<SettingsIcon />}
            onClick={onMenuClick}
        />
        <Responsive xsmall={logout} medium={null} />
    </div>
);

export const Menu = compose(
    withRouter,
    connect(
        (state: any) => ({
            theme: state.theme,
            locale: state.i18n.locale,
        }),
        {},
    ),
    translate,
)(Comp);

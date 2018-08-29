/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { Configuration } from "./configuration/Configuration";
import { Segments } from "./segments/Segments";

export const customRoutes = [
    <Route exact path="/configuration" component={Configuration} />,
    <Route exact path="/segments" component={Segments} />,
];

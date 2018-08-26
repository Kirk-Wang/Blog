/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    root: { width: 25, maxWidth: 25, maxHeight: 25 },
};

export const ThumbnailField = withStyles(styles)(({ classes, record }: any) => (
    <img src={record.thumbnail} className={classes.root} alt="" />
));

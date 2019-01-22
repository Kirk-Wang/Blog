/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import Avatar from "@material-ui/core/Avatar";

export const AvatarField: any = ({ record, size }: any) => (
    <Avatar src={`${record.avatar}?size=${size}x${size}`} style={{ width: size, height: size }} />
);

AvatarField.defaultProps = {
    size: 25,
};

/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import Icon from "@material-ui/icons/Stars";

const style = { opacity: 0.87, width: 20, height: 20 };

export const StarRatingField: any = ({ record }: any) => (
    <span>
        {Array(record.rating)
            .fill(true)
            .map((_, i) => (
                <Icon key={i} style={style} />
            ))}
    </span>
);

StarRatingField.defaultProps = {
    label: "resources.reviews.fields.rating",
    source: "rating",
    addLabel: true,
};

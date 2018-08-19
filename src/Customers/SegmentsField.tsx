/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import Chip from "@material-ui/core/Chip";

const styles: any = {
    main: { display: "flex", flexWrap: "wrap" },
    chip: { margin: 4 },
};

export const SegmentsField: any = ({ record }: any) => (
    <span style={styles.main}>
        {record.groups &&
            record.groups.map((segment: any) => <Chip key={segment} style={styles.chip} label={segment} />)}
    </span>
);

SegmentsField.defaultProps = {
    addLabel: true,
    source: "groups",
};

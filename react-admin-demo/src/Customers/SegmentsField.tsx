/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import Chip from "@material-ui/core/Chip";
import { translate } from "react-admin";
import { segments } from "../segments/data";

const styles: any = {
    main: { display: "flex", flexWrap: "wrap" },
    chip: { margin: 4 },
};

export const SegmentsField: any = translate(({ record, translate: trans }: any) => (
    <span style={styles.main}>
        {record.groups &&
            record.groups.map((segment: any) => (
                <Chip
                    key={segment}
                    style={styles.chip}
                    label={trans(segments.find((s: any) => s.id === segment).name)}
                />
            ))}
    </span>
));

SegmentsField.defaultProps = {
    addLabel: true,
    source: "groups",
};

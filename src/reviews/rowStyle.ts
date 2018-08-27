/**
 *  Copyright Kirk Technologies.
 */

export const rowStyle = (record: any, index: any, defaultStyle = {}) => {
    if (record.status === "accepted") {
        return { ...defaultStyle, backgroundColor: "#dfd" };
    }
    if (record.status === "pending") {
        return { ...defaultStyle, backgroundColor: "#ffd" };
    }
    if (record.status === "rejected") {
        return { ...defaultStyle, backgroundColor: "#fdd" };
    }
    return defaultStyle;
};

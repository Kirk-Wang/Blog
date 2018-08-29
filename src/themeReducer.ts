/**
 *  Copyright Kirk Technologies.
 */

import { CHANGE_THEME } from "./configuration/actions";

export const themeReducer = (previousState = "light", { type, payload }: any) => {
    if (type === CHANGE_THEME) {
        return payload;
    }
    // tslint:disable-next-line:no-debugger
    debugger;
    return previousState;
};

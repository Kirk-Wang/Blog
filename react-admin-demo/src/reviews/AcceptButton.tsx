/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import ThumbUp from "@material-ui/icons/ThumbUp";
import { translate } from "react-admin";
import compose from "recompose/compose";
import { reviewApprove as reviewApproveAction } from "./reviewActions";

class ButtonExtend extends React.Component<any, any> {
    public render() {
        const { record, translate: trans } = this.props;
        // tslint:disable-next-line:no-debugger
        debugger;
        return record && record.status === "pending" ? (
            <Button color="primary" size="small" onClick={this.handleApprove}>
                <ThumbUp color="primary" style={{ paddingRight: "0.5em", color: "green" }} />
                {trans("resources.reviews.action.accept")}
            </Button>
        ) : (
            <span />
        );
    }
    private handleApprove = () => {
        const { reviewApprove, record } = this.props;
        reviewApprove(record.id, record);
    };
}

// AcceptButton.propTypes = {
//     record: PropTypes.object,
//     reviewApprove: PropTypes.func,
//     translate: PropTypes.func,
// };

export const AcceptButton: any = compose(
    translate,
    connect(
        null,
        {
            reviewApprove: reviewApproveAction,
        },
    ),
)(ButtonExtend);

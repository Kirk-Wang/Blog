/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import ThumbDown from "@material-ui/icons/ThumbDown";
import { translate } from "react-admin";
import compose from "recompose/compose";
import { reviewReject as reviewRejectAction } from "./reviewActions";

class ButtonEx extends React.Component<any, any> {
    public render() {
        const { record, translate: trans } = this.props;
        return record && record.status === "pending" ? (
            <Button color="primary" size="small" onClick={this.handleApprove}>
                <ThumbDown color="primary" style={{ paddingRight: "0.5em", color: "red" }} />
                {trans("resources.reviews.action.reject")}
            </Button>
        ) : (
            <span />
        );
    }

    private handleApprove = () => {
        const { reviewReject, record } = this.props;
        reviewReject(record.id, record);
    };
}

// RejectButton.propTypes =cn {
//     record: PropTypes.object,
//     reviewReject: PropTypes.func,
//     translate: PropTypes.func,
// };

export const RejectButton: any = compose(
    translate,
    connect(
        null,
        {
            reviewReject: reviewRejectAction,
        },
    ),
)(ButtonEx);

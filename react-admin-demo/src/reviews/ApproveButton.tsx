/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";

import { reviewApprove as reviewApproveAction, reviewReject as reviewRejectAction } from "./reviewActions";

const styles = {
    accepted: {
        color: "green",
    },
    rejected: {
        color: "red",
    },
};

// interface IApproveProps {
//     classes?: any;
//     record?: any;
//     reviewApprove?: any;
//     reviewReject?: any;
// }

class Approve extends React.Component<any, any> {
    public render() {
        const { record, classes } = this.props;
        return (
            <span>
                <IconButton onClick={this.handleApprove} disabled={record.status === "accepted"}>
                    <ThumbUp className={record.status === "accepted" ? classes.accepted : ""} />
                </IconButton>
                <IconButton onClick={this.handleReject} disabled={record.status === "rejected"}>
                    <ThumbDown className={record.status === "rejected" ? classes.rejected : ""} />
                </IconButton>
            </span>
        );
    }

    private handleApprove = () => {
        const { reviewApprove, record } = this.props;
        reviewApprove && reviewApprove(record.id, record);
    };

    private handleReject = () => {
        const { reviewReject, record } = this.props;
        reviewReject && reviewReject(record.id, record);
    };
}

// ApproveButton.propTypes = {
//     classes: PropTypes.object,
//     record: PropTypes.object,
//     reviewApprove: PropTypes.func,
//     reviewReject: PropTypes.func,
// };

export const ApproveButton = connect(
    null,
    {
        reviewApprove: reviewApproveAction,
        reviewReject: reviewRejectAction,
    },
)(withStyles(styles)(Approve));

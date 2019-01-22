/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
// import * as PropTypes from 'prop-types';
// import { connect } from "react-redux";
import { startUndoable, crudUpdateMany } from "ra-core";

interface IBulkApproveActionProps {
    basePath?: string;
    label?: string;
    onExit?: () => any;
    resource?: string;
    selectedIds?: any[];
    startUndoable?: (params?: any) => any;
}

export class BulkApproveAction extends React.Component<IBulkApproveActionProps, any> {
    public componentDidMount = () => {
        // const { basePath, startUndoable, resource, selectedIds } = this.props;
        const { basePath, resource, selectedIds } = this.props;
        startUndoable(crudUpdateMany(resource, selectedIds, { status: "accepted" }, basePath));
        this.props.onExit && this.props.onExit();
    };

    public render() {
        return null;
    }
}

// BulkApproveAction.propTypes = {
//     basePath: PropTypes.string,
//     label: PropTypes.string,
//     onExit: PropTypes.func.isRequired,
//     resource: PropTypes.string.isRequired,
//     selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
//     startUndoable: PropTypes.func.isRequired,
// };

// export default connect(
//     undefined,
//     { startUndoable },
// )(BulkApproveAction);

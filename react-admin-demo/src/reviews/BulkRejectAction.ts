/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { startUndoable, crudUpdateMany } from "ra-core";

interface IBulkRejectActionProps {
    basePath?: string;
    label?: string;
    onExit?: () => any;
    resource?: string;
    selectedIds?: any[];
    startUndoable?: (params?: any) => any;
}

export class BulkRejectAction extends React.Component<IBulkRejectActionProps, any> {
    public componentDidMount = () => {
        const { basePath, resource, selectedIds } = this.props;
        startUndoable(crudUpdateMany(resource, selectedIds, { status: "rejected" }, basePath));
        this.props.onExit && this.props.onExit();
    };

    public render() {
        return null;
    }
}

// BulkRejectAction.propTypes = {
//     basePath: PropTypes.string,
//     label: PropTypes.string,
//     onExit: PropTypes.func.isRequired,
//     resource: PropTypes.string.isRequired,
//     selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
//     startUndoable: PropTypes.func.isRequired,
// };

// export default connect(
//     undefined,
//     { startUndoable }
// )(BulkRejectAction);

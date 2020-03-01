import React from 'react';
import { Table } from 'antd';

const CustomTable = (props) => {
    return (
        <React.Fragment>
            <Table columns={props.columns} dataSource={props.data} />
        </React.Fragment >
    )
}

export default CustomTable;
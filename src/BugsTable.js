import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


const URL = 'http://localhost:8000/getAllUnassiged/bugs?skip=0&limit=1000'

function BugsTable() {
    const [bugs, setBugs] = useState([]);

    // Fetch data from API and update bugs state
    const getBugs = () => {
        fetch(URL)
            .then(response => response.json())
            .then(data => setBugs(data));
    }

    useEffect(() => {
        getBugs();
    }, []);

    const options = {
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: '25', value: 25
        }, {
            text: '50', value: 50
        }, {
            text: 'All', value: bugs.length
        }],
        showTotal: true,
        totalSize: bugs.length,

    }

    const columns = [
        {
            text: '#BUG', dataField: 'id', sort: true,
        },
        {
            text: 'Product', dataField: 'product', sort: true,
        },
        {
            text: 'Severity', dataField: 'severity', sort: true
        },
        {
            text: 'Description', dataField: 'description', sort: false
        },
        {
            text: 'Release Note', dataField: 'releaseNote', sort: false
        },
    ];

    const data = bugs;

    return (
        <div className"tab-content" >
            <div id="queue" className"container-fluid tab-pane active " ><br></br>
                <div className="Bug-Table" id="queue" className"container-fluid tab-pane active " ><br />
                    <h3>Queue</h3>
                    <div className"col-lg" >
        <div className"card" >
            <div className"card-header" >
                <h4 className"card-title" > Up for Grab...</h4 >
                            </div >
        <div className"card-body" >
            <div className"table-responsive" >
                <BootstrapTable
                    keyField="id"
                    columns={columns}
                    data={data}
                    striped
                    hover
                    condensed
                    bordered={false}
                    tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                    pagination={paginationFactory(options)}
                />
                                </div >
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        </div >
    )
}
export default BugsTable;


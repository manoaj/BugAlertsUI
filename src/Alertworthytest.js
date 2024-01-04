import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const URL = "http://127.0.0.1:8000/getAll/alertworthy?skip=0"

function Alertworthytest() {

    const [alerts, setAlerts] = useState([]);

    // Fetch data from API and update alerts state
    const getBAlerts = () => {
        fetch(URL)
            .then(response => response.json())
            .then(data => setAlerts(data));
    }

    useEffect(() => {
        getBAlerts();
    }, []);

    const data = alerts;

    const options = {
        sizePerPageList: [{
            text: '15', value: 15
        }, {
            text: '25', value: 25
        }, {
            text: '50', value: 50
        }, {
            text: 'All', value: alerts.length
        }],
        showTotal: true,
        totalSize: alerts.length,
    }

    const columns = [
        {
            text: '#BUG', dataField: 'id', sort: true,
            headerStyle: (column, colIndex) => {
                return { width: "7%", textAlign: "left", filter: false };
            },
            headerFormatter: (column, colIndex, { filterElement }) => {
                return (
                    <div>
                        {filterElement}
                    </div>
                );
            },
            filter: textFilter()
        },
        {
            text: 'Product', dataField: 'product', sort: true,
            headerStyle: (column, colIndex) => {
                return { width: "7%", textAlign: "left" };
            },
            headerFormatter: (column, colIndex, { filterElement }) => {
                return (
                    <div>
                        {filterElement}
                    </div>
                );
            },
            filter: textFilter()
        },
        {
            text: 'Severity', dataField: 'severity', sort: true,
            headerStyle: (column, colIndex) => {
                return { width: "7%", textAlign: "left" };
            },
            headerFormatter: (column, colIndex, { filterElement }) => {
                return (
                    <div>
                        {filterElement}
                    </div>
                );
            },
            filter: textFilter()
        },
        {
            text: 'Alert Summary', dataField: 'alertSummary',
            style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            },
        },
        {
            text: 'Supported', dataField: 'supported', sort: true,
            style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            },
        },
    ];

    const expandRow = {
        renderer: row => (
            <div>
                <table>
                    <tr><th>Bug ID</th>                 <td>{` ${row.id}`}</td></tr>
                    <tr><th>Owner</th>                  <td>{` ${row.bugalertOwner}`}</td></tr>
                    <tr><th>Added On</th>               <td>{` ${row.added}`}</td></tr>
                    <tr><th>Description</th>            <td>{` ${row.description}`}</td></tr>
                    <tr><th>Severity</th>               <td>{` ${row.severity}`}</td></tr>
                    <tr><th>Product</th>                <td>{` ${row.product}`}</td></tr>
                    <tr><th>Versions Introduced</th>    <td>{` ${row.versionsIntroduced}`}</td></tr>
                    <tr><th>Versions Fixed</th>         <td>{` ${row.versionFixed}`}</td></tr>
                    <tr><th>CVE</th>                    <td>{` ${row.CVE}`}</td></tr>
                    <tr><th>Bites</th>                  <td>{` ${row.bites}`}</td></tr>
                    <tr><th>SR Case Numbers</th>        <td>{` ${row.srCaseNumbers}`}</td></tr>
                    <tr><th>Last Bite Time</th>         <td>{` ${row.lastBiteTime}`}</td></tr>
                    <tr><th>Rule</th>                   <td>{` ${row.rule}`}</td></tr>
                    <tr><th>Alert Summary</th>          <td>{` ${row.alertSummary}`}</td></tr>
                    <tr><th>Release Note</th>           <td>{` ${row.releaseNote}`}</td></tr>
                    <tr><th>Supported</th>              <td>{` ${row.supported}`}</td></tr>
                </table>
            </div>
        ),
        showExpandColumn: true,
        onlyOneExpanding: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => {
            if (isAnyExpands) {
                return <b>-</b>;
            }
            return <b>+</b>;
        },
        expandColumnRenderer: ({ expanded }) => {
            if (expanded) {
                return (
                    <b>-</b>
                );
            }
            return (
                <b>..</b>
            );
        }
    };

    return (
        <div className="container-fluid tab-pane active " >
            <div className="col-lg" >
                <div className="card" >
                    <div className="card-header" >
                        <h4 className="card-title" > Alertworthy</h4 >
                    </div >
                    <div className="card-body" >
                        <div className="table-overflow" >
                            <table className="table mb-0" >
                                <BootstrapTable
                                    keyField="id"
                                    columns={columns}
                                    data={data}
                                    striped
                                    hover
                                    condensed
                                    bordered={false}
                                    filter={filterFactory()}
                                    pagination={paginationFactory(options)}
                                    expandRow={expandRow}
                                />
                            </table >
                        </div >
                    </div >
                </div >
            </div >
        </div >
    )
}

export default Alertworthytest;
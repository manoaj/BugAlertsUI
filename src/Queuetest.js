import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import DataTable from 'react-data-table-component';
import styled from 'styled-components';

import { Button } from 'reactstrap';


const URL = 'http://localhost:8000/getAllUnassiged/Candidates?skip=0'
const URL_User = 'http://localhost:8000/getAllUserAssigned/Candidates?skip=0'

function Queue() {
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

    const [bugs_user, setBugs_user] = useState([]);

    // Fetch data from API and update bugs state
    const getBugsUser = () => {
        fetch(URL_User)
            .then(response => response.json())
            .then(data => setBugs_user(data));
    }

    useEffect(() => {
        getBugsUser();
    }, []);

    const data = bugs;

    const data_user = bugs_user;

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
            text: 'Grab', sort: false,
            formatter: (id) => {
                return <Button className="outlinedButton" onClick={() => { console.log(data.id); }}> Grab </Button>
            },
            headerStyle: (colum, colIndex) => {
                return { width: "7%", textAlign: "left" };
            },
        }
        ,
        {
            text: '#BUG', dataField: 'id', sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: "7%", textAlign: "left" };
            }
        },
        {
            text: 'Product', dataField: 'product', sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: "7%", textAlign: "left" };
            }
        },
        {
            text: 'Severity', dataField: 'severity', sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: "7%", textAlign: "left" };
            }
        },
        {
            text: 'Description', dataField: 'description', sort: false,
            style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            },
        },
        {
            text: 'Release Note', dataField: 'releaseNote', sort: false,
            style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            },
        },
    ];


    return (
        <div id="queue" className="container-fluid tab-pane active">
            <h3>Queue</h3>
            <div className="col-lg">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Up for Grab...</h4>
                    </div>
                    <div className="card-body">
                        <StyledDataTable
                            columns={columns}
                            data={data}
                            striped
                            highlightOnHover
                            pagination
                            paginationPerPageOptions={options.sizePerPageList.map(opt => opt.value)}
                            paginationTotalRows={options.totalSize}
                            paginationRowsPerPageLabel="Rows per page"
                            paginationComponentOptions={{ noRowsPerPage: true }}
                            noHeader
                        />
                    </div>
                </div>
                <br />
                <h3>Work Queue</h3>
                <div className="col-lg">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Let's get to work...</h4>
                        </div>
                        <div className="card-body">
                            <StyledDataTable
                                columns={columns}
                                data={data_user}
                                striped
                                highlightOnHover
                                pagination
                                paginationPerPageOptions={options.sizePerPageList.map(opt => opt.value)}
                                paginationTotalRows={options.totalSize}
                                paginationRowsPerPageLabel="Rows per page"
                                paginationComponentOptions={{ noRowsPerPage: true }}
                                noHeader
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const StyledDataTable = styled(DataTable)`
    .rdt_Table {
        width: 100%;
    }

    .rdt_TableCell{
        white-space: normal !important;
        word-wrap: break-word;
        font-size: 14px;
    }

    .rdt_TableHead {
        font-weight: bold;
        font-size: 14px;
        layout: fixed;
    }
`;

export default Queue;
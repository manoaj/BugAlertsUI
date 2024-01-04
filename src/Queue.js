import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

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

    const [filterText, setFilterText] = useState('');

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };

    const filteredData = data.filter((bug) =>
        bug.id.toString().includes(filterText) ||
        bug.product.toLowerCase().includes(filterText.toLowerCase()) ||
        bug.severity.toLowerCase().includes(filterText.toLowerCase()) ||
        bug.description.toLowerCase().includes(filterText.toLowerCase()) ||
        bug.releaseNote.toLowerCase().includes(filterText.toLowerCase())
    );

    const columns = [
        {
            text: 'Grab',
            sort: false,
            formatter: (cell, row) => {
                const handleGrabClick = async () => {
                    try {
                        const id = row.id;
                        // Send a POST request to the backend with the id data
                        await fetch('http://localhost:8000/grab_candidate', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ id }),
                            
                        })
                            .then((postResponse) => {
                                if (!postResponse.ok) {
                                    throw new Error('Network response for POST was not ok');
                                }
                                return postResponse.json();
                            })
                            .then((postData) => {
                                console.log(postData);
                                const message = postData.message;
                                window.alert(message);
                                //window.location.reload();

                                // After the POST request, send a CREATE request
                                fetch(`http://localhost:8000/create/candidate/${id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify([
                                        {
                                            id: 0,
                                            bugalertOwner: "string",
                                            assignedOn: "string",
                                            description: "string",
                                            severity: "string",
                                            CVE: "string",
                                            product: "string",
                                            versionsIntroduced: "string",
                                            versionFixed: "string",
                                            bites: "string",
                                            srCaseNumbers: "string",
                                            lastBiteTime: "string",
                                            fixes: "string",
                                            lastFixTime: "string",
                                            releaseNote: "string",
                                            createdOn: "2023-11-21T10:53:58.530Z",
                                            updatedOn: "2023-11-21T10:53:58.530Z"
                                        }
                                    ]),
                                })
                                    .then((createResponse) => {
                                        if (!createResponse.ok) {
                                            throw new Error('Network response for PUT was not ok');
                                        }
                                        return createResponse.json();
                                    })
                                    .then((createData) => {
                                        // Handle the CREATE response if needed
                                        console.log(createData);
                                        window.location.reload();
                                    })
                                    .catch((createError) => {
                                        console.error("Error making the PUT request:", createError);
                                    });
                            })
                            .catch((postError) => {
                                console.error("Error making the POST request:", postError);
                            });
                        
                    } catch (error) {
                        console.error('Error sending POST request:', error);
                    }
                };

                return (
                    <Button className="outlinedButton" onClick={handleGrabClick}>
                        Grab
                    </Button>
                );
            },
            headerStyle: (colum, colIndex) => {
                return { width: "7%", textAlign: "left" };
            },
        },
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

    const columns_work_queue = [
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
        <div id="queue" className="container-fluid tab-pane active ">
            <h3>Queue</h3>
            <div className="col-lg">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h4 className="card-title">Up for Grab...</h4>
                            <input
                                id="filter"
                                type="text"
                                value={filterText}
                                onChange={handleFilterChange}
                                placeholder="Search..."
                                style={{ width: '30%', marginBottom: '10px' }}
                            />
                            </div >
                    <div className="card-body">
                        
                            <table className="table mb-0" id="Grab"  >
                                <BootstrapTable
                                    keyField="id"
                                    columns={columns}
                                    data={filteredData}
                                    striped
                                    hover
                                    condensed
                                    bordered={false}
                                    pagination={paginationFactory(options)}
                                />
                            </table>
                        </div>
                    </div>
                </div>
                <br /><h3>Work Queue</h3>
                <div className="col-lg">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Lets get to work...</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table mb-0" id="Work" >
                                    <BootstrapTable
                                        keyField="id"
                                        columns={columns_work_queue}
                                        data={data_user}
                                        striped
                                        hover
                                        condensed
                                        bordered={false}
                                        pagination={paginationFactory(options)}
                                    />
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Queue;
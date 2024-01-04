import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import TableScrollbar from 'react-table-scrollbar';
import Container from 'react-bootstrap/Container';


const URL_User = 'http://localhost:8000/getAll/bugs?skip=0'

function Workspace() {

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

    const data_user = bugs_user;

    const handleBugIDChange = (event) => {
        const bugID = event.target.value;
        const bug = data_user.find((bug) => bug.BugID === bugID);
        if (bug) {
            document.getElementById('Alertsummary').value = bug.description || '';
            // Update other form fields with their corresponding bug properties
        } else {
            document.getElementById('Alertsummary').value = '';
            // Clear other form fields
        }
    };



    const [tags, setTags] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const handleTagSearch = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/getTagsContaining/${searchValue}`);
            const data = await response.json();
            setTags(data);
        };
        fetchData();
    }, [searchValue]);

    const columns = [
        {
            text: 'Tag', dataField: 'Tag', sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: "30%", textAlign: "left", backgroundColor: 'white' };
            }
        },
        {
            text: 'Tag_description', dataField: 'Tag_description', sort: true,
            headerStyle: (colum, colIndex) => {
                return { textAlign: "left", backgroundColor: 'white' };
            }
        }
    ];

    return (
        <div id="alert" className="container-fluid tab-pane fade show" ><br />
            <div className="row" >
                <div id="Alertworthy-cmd" className="col-sm" >
                    <h2>Alertworthy</h2>
                    <form method="post" >

                        <div className="form-outline">
                            <label htmlFor="BugID" >Bug ID</label>
                            <input type="number" className="form-control" placeholder="Enter BugID" id="BugID" name="BugID" required onChange={handleBugIDChange} />
                        </div><br />

                        <div className="form-group" >
                            <label htmlFor="Alertsummary" >Alert Summary</label>
                            <textarea type="text" className="form-control" placeholder="Enter Alert summary... Max 255 chars" id="Alertsummary" rows="3" name="Alertsummary" ></textarea >
                        </div >

                        <div className="form-group" >
                            <label htmlFor="Rule" >Rule</label>
                            <textarea type="text" className="form-control" placeholder="Enter Rule..." id="Rule" rows="3" name="Rule" required ></textarea >
                        </div ><br />

                        <div className="form-group" >
                            <label htmlFor="Alertworthy">Alert Worthy</label>
                            <div className="input-group mb-3" >
                                <textarea type="text" className="form-control" placeholder="Alert Worthy" id="Alertworthy" rows="3" name="Alertworthy" readOnly ></textarea >
                                <div className="input-group-append" >
                                    <button className="btn btn-success" type="submit" id="copy" onClick="copy()" > Copy</button >
                                </div >
                            </div >
                        </div >
                    </form >
                </div >

                <div id="Tags" className="col-sm" >
                    <h2>Tags</h2>
                    <form method="post">
                        <div className="form-group">
                            <label htmlFor="Tag">Tag</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Search Tag" id="Tag_search" name="Tag_search" onChange={handleTagSearch} /><br />
                                <div className="input-group-append">
                                </div>
                            </div >
                        </div >

                        <div className="form-group" >
                            <label htmlFor="ListTags">List of Tags</label>
                            {
                                tags && tags.length > 0 && (
                                    <div className="card-body" >
                                        <div className="table-overflow" >
                                            <Container fluid style={{ height: "75vh" }}>
                                                <TableScrollbar>
                                                    <BootstrapTable
                                                        keyField="Tag"
                                                        columns={columns}
                                                        data={tags}
                                                        striped
                                                        hover
                                                        bordered={false}
                                                    />
                                                </TableScrollbar>
                                            </Container>
                                        </div >
                                    </div >
                                )
                            }
                        </div >
                    </form >


                </div >
            </div >
        </div >
    )
}
export default Workspace;
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

const URL_tag = 'http://localhost:8000/getAll/tags';
const URL_tagimplication = 'http://localhost:8000/getAll/tagimplications';
const URL_user_candidate = 'http://localhost:8000/getAllUserAssigned/Candidates?skip=0';
const URL_add_alertworthy = 'http://localhost:8000/add_alertworthy';
//const URL_candidate_delete = 'http://localhost:8000/delete/candidate/';


function Workspacetest() {
    //Workspace
    const [candidate, setCandidates] = useState([]);
    const [releaseNote, setReleaseNote] = useState('');
    const [Alertsummary, setAlertsummary] = useState('');
    const [Rule, setRule] = useState('');
    const [BugID, setBugID] = useState('');

    const getCandidates = () => {
        fetch(URL_user_candidate, {
            method: "GET",
            headers: {
                "accept": '*/*'
            }
        })
            .then(response => response.json())
            .then(data => {
                setCandidates(data)
                if (data.length > 0) {
                    setReleaseNote(data[0].releaseNote);
                    setBugID(data[0].id);
                }
            });
    };

    useEffect(() => {
        getCandidates();
    }, []);


    // Alertsummary Character counter
    useEffect(() => {
        // Initialize characterCount with the length of releaseNote
        setAlertsummaryCharacterCount(releaseNote.length);
        setAlertsummary(releaseNote)
    }, [releaseNote]);

    const [AlertsummarycharacterCount, setAlertsummaryCharacterCount] = useState(0);

    const handleAlertsummaryChange = (e) => {
        const newText = e.target.value;
        setAlertsummaryCharacterCount(newText.length);
        setReleaseNote(newText);
        setAlertsummary(e.target.value);
    };

    // Rule Character counter
    const [RulecharacterCount, setRuleCharacterCount] = useState(0);

    const handleRuleChange = (e) => {
        const newText = e.target.value;
        setRuleCharacterCount(newText.length);
        setRule(e.target.value);
    };

    const handleAddAlertworthy = async () => {
        const alertWorthyText = document.getElementById("Alertworthy").value;

        // Send a POST request
        await fetch(URL_add_alertworthy, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ alertworthy: alertWorthyText }),
        })
            .then((postResponse) => {
                if (!postResponse.ok) {
                    throw new Error('Network response for POST was not ok');
                }
                return postResponse.json();
            })
            .then((postData) => {
                // Handle the POST response if needed
                console.log(postData);
                const message = postData.message;
                window.alert(message);
                // Check if the message is "Alertworthy data received and printed on the terminal"
                if (postData.message === "adding alertworthy" || postData.message === "Already exists") {
                    // After the POST request, send a DELETE request
                    fetch(`http://localhost:8000/delete/candidate/${BugID}`, {
                        method: 'DELETE',
                    })
                        .then((deleteResponse) => {
                            if (!deleteResponse.ok) {
                                throw new Error('Network response for DELETE was not ok');
                            }
                            return deleteResponse.json();
                        })
                        .then((deleteData) => {
                            // Handle the DELETE response if needed
                            console.log(deleteData);
                                                    
                            // After the DELETE request, send a PUT request
                            fetch(`http://localhost:8000/create/alertworthy/${BugID}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify([
                                    {
                                        id: 0,
                                        bugalertOwner: "string",
                                        added: "string",
                                        description: "string",
                                        severity: "string",
                                        product: "string",
                                        versionsIntroduced: "string",
                                        versionFixed: "string",
                                        CVE: "string",
                                        bites: "string",
                                        srCaseNumbers: "string",
                                        lastBiteTime: "string",
                                        rule: "string",
                                        alertSummary: "string",
                                        releaseNote: "string",
                                        supported: "string",
                                        createdOn: "2023-11-20T09:53:17.164Z",
                                        updatedOn: "2023-11-20T09:53:17.164Z"
                                    }
                                ]),
                            })
                                .then((putResponse) => {
                                    if (!putResponse.ok) {
                                        throw new Error('Network response for PUT was not ok');
                                    }
                                    return putResponse.json();
                                })
                                .then((putData) => {
                                    // Handle the PUT response if needed
                                    console.log(putData);
                                    window.location.reload();
                                })
                                .catch((putError) => {
                                    console.error("Error making the PUT request:", putError);
                                });
                        })
                        .catch((deleteError) => {
                            console.error("Error deleting candidate:", deleteError);
                        });
                }
            })
            .catch((postError) => {
                console.error("Error making the POST request:", postError);
            });
        
    };

    //tag
    const [tags, setTags] = useState([]);
    const [filterText, setFilterText] = useState('');

    const getTags = () => {
        fetch(URL_tag)
            .then(response => response.json())
            .then(data => setTags(data));
    };

    useEffect(() => {
        getTags();
    }, []);

    const columns_tag = [
        {
            name: 'Tag',
            selector: 'Tag',
            sortable: true,
            width: '35%',
            style: {
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: '16px',
            },
        },
        {
            name: 'Tag Description',
            selector: 'Tag_description',
            sortable: true,
            wrap: true,
            style: {
                textAlign: 'left',
            },
        },
    ];

    const handleFilterChange = e => {
        setFilterText(e.target.value);
    };

    const filteredTags = tags.filter(
        tag =>
            tag.Tag.toString().toLowerCase().includes(filterText.toLowerCase()) ||
            tag.Tag_description.toLowerCase().includes(filterText.toLowerCase())
    );

    //tagimplication
    const [tag_implication, setTag_implication] = useState([]);
    const [filterText_imp, setFilterText_imp] = useState('');

    const getTag_implication = () => {
        fetch(URL_tagimplication)
            .then(response => response.json())
            .then(data => setTag_implication(data));
    };

    useEffect(() => {
        getTag_implication();
    }, []);

    const columns_tagimplication = [
        {
            name: 'Tag',
            selector: 'Tag',
            sortable: true,
            width: '35%',
            style: {
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: '16px',
            },
        },
        {
            name: 'Tag Implication',
            selector: 'Tag_implication',
            sortable: true,
            wrap: true,
            style: {
                textAlign: 'left',
            },
        },
    ];

    const handleFilterChange_imp = e => {
        setFilterText_imp(e.target.value);
    };

    const filteredTag_implication = tag_implication.filter(
        tag_implication =>
            tag_implication.Tag.toString().toLowerCase().includes(filterText_imp.toLowerCase()) ||
            tag_implication.Tag_implication.toLowerCase().includes(filterText_imp.toLowerCase())
    );

    return (        
        <div className="container-fluid tab-pane fade show">
            <div className="row">
                <div className="col-sm"><br />
                    <h2>Alertworthy</h2>
                    <form >

                        <div className="form-outline">
                            <label htmlFor="BugID" >Bug ID</label>
                            <select onChange={(e) => {
                                setReleaseNote(e.target.value);
                                const selectedCandidate = candidate.find(candidate => candidate.releaseNote === e.target.value);
                                if (selectedCandidate) {
                                    setBugID(selectedCandidate.id);
                                } 
                                else {
                                    setBugID();
                                }
                            }}>
                                {candidate.length > 0 && candidate.map(x => (
                                    <option key={x.id} value={x.releaseNote}>
                                        {x.id}
                                    </option>
                                ))}
                                {candidate.length === 0 && <option>--empty--</option>}
                            </select>
                        </div><br />

                        <div className="form-group">
                            <label htmlFor="Alertsummary" >Alert Summary</label>
                            <textarea
                                type="text"
                                className={`form-control ${AlertsummarycharacterCount > 255 ? "is-invalid" : "valid"}`}
                                placeholder="Enter Alert summary... Max 255 chars"
                                id="Alertsummary"
                                rows="3"
                                name="Alertsummary"
                                defaultValue={releaseNote}
                                onChange={handleAlertsummaryChange}
                            ></textarea>
                            {AlertsummarycharacterCount > 255 && <div className="invalid-feedback">Character count exceeds 255, count:{AlertsummarycharacterCount}</div>}
                        </div><br />

                        <div className="form-group">
                            <label htmlFor="Rule" >Rule</label>
                            <textarea
                                type="text"
                                className={`form-control ${RulecharacterCount > 255 ? "is-invalid" : "valid"}`}
                                placeholder="Enter Rule..."
                                id="Rule"
                                rows="3"
                                name="Rule"
                                required
                                onChange={handleRuleChange}
                            ></textarea>
                            {RulecharacterCount > 255 && <div className="invalid-feedback">Character count exceeds 255, count:{RulecharacterCount}</div>}
                        </div><br />

                        <div className="form-group">
                            <label htmlFor="Alertworthy">Alert Worthy</label>
                            <div className="input-group mb-3">
                                <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Alert Worthy"
                                    id="Alertworthy"
                                    rows="3"
                                    name="Alertworthy"  
                                    value={`b4 alertworthy '${BugID}' --alert-summary '${Alertsummary}' --rule '${Rule}'`} 
                                    readOnly  
                                ></textarea>
                            </div><br />

                            <div className="input-group-append d-flex justify-content-center align-items-center">
                                    <button className="btn btn-success" type="submit" id="Add_Alertworthy" onClick={(e) => {
                                        e.preventDefault(); // Prevent the default form submission
                                        handleAddAlertworthy();
                                    }} >Add Alertworthy</button>
                                </div>
                            
                        </div>
                    </form>
                </div>
                <div className="col-sm"><br />
                    <h2>Tags</h2>
                    <div className="container-fluid tab-pane active">
                        <div className="">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <input
                                    id="filter_Tag"
                                    type="text"
                                    value={filterText}
                                    onChange={handleFilterChange}
                                    placeholder="Search Tags..."
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <div className="card-body">
                                <StyledDataTableWrapper>
                                    <StyledDataTable
                                        keyField="Tag"
                                        columns={columns_tag}
                                        data={filteredTags}
                                        striped
                                        highlightOnHover
                                        bordered={false}
                                        defaultSortField="Tag"
                                        fixedHeader={true}
                                    />
                                </StyledDataTableWrapper>
                            </div>
                        </div>
                    </div>
                    <h2>Tag Implications</h2>
                    <div className="container-fluid tab-pane active">
                        <div className="">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <input
                                    id="filter_Tagimplication"
                                    type="text"
                                    value={filterText_imp}
                                    onChange={handleFilterChange_imp}
                                    placeholder="Search Tags..."
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <div className="card-body">
                                <StyledDataTableWrapper>
                                    <StyledDataTable
                                        keyField="Tag"
                                        columns={columns_tagimplication}
                                        data={filteredTag_implication}
                                        striped
                                        highlightOnHover
                                        bordered={false}
                                        defaultSortField="Tag"
                                        fixedHeader={true}
                                    />
                                </StyledDataTableWrapper>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

const StyledDataTableWrapper = styled.div`
    height: 37vh;
    width: 100%;
    overflow-x: auto;
    table-layout: fixed;
`;

const StyledDataTable = styled(DataTable)`
    .rdt_Table {
        table-layout: fixed;
    }

    .rdt_TableCell {
        white-space: normal !important;
        word-wrap: break-word;
        font-size: 14px;
        overflow-wrap: break-word;
    }

    .rdt_TableHead {
        font-weight: bold;
        font-size: 17px;
        layout: fixed;
    }
`;

export default Workspacetest;
import React, { useEffect, useState } from 'react';

const URL_user_candidate = 'http://localhost:8000/getAllUserAssigned/Candidates?skip=0';

function Workspacetest() {
    // Workspace
    const [candidate, setCandidates] = useState([]);
    const [releaseNote, setReleaseNote] = useState('');
    const [cmd, setCmd] = useState('');
    const [selectedCandidateId, setSelectedCandidateId] = useState('');

    const getCandidates = () => {
        fetch(URL_user_candidate, {
            method: "GET",
            headers: {
                "accept": '*/*'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCandidates(data);
                if (data.length > 0) {
                    setReleaseNote(data[0].releaseNote);
                    setSelectedCandidateId(data[0].id);
                }
            });
    };

    useEffect(() => {
        getCandidates();
    }, []);

    useEffect(() => {
        // Update the "Alert Worthy" textarea whenever releaseNote or selectedCandidateId changes
        setCmd(`b4 alertworthy ${selectedCandidateId} --alert-summary '${releaseNote}' --rule '${document.getElementById('Rule').value}'`);
    }, [releaseNote, selectedCandidateId]);

    const handleCandidateChange = (event) => {
        setReleaseNote(event.target.value);
        setSelectedCandidateId(event.target.value);
    };

    const handleRuleChange = (event) => {
        setCmd(`b4 alertworth ${selectedCandidateId} --alert-summary '${releaseNote}' --rule '${event.target.value}'`);
    };

    return (
        <div className="container-fluid tab-pane fade show">
            <div className="row">
                <div className="col-sm"><br />
                    <h2>Alertworthy</h2>
                    <form method="post">
                        <div className="form-outline">
                            <label htmlFor="BugID">Bug ID</label>
                            <select onChange={handleCandidateChange} value={selectedCandidateId}>
                                {candidate.length > 0 && candidate.map(x => (
                                    <option key={x.id} value={x.id}>
                                        {x.id}
                                    </option>
                                ))}
                                {candidate.length === 0 && <option>--empty--</option>}
                            </select>
                        </div><br />

                        <div className="form-group">
                            <label htmlFor="Alertsummary">Alert Summary</label>
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Enter Alert summary... Max 255 chars"
                                id="Alertsummary"
                                rows="3"
                                name="Alertsummary"
                                defaultValue={releaseNote}
                                onChange={(e) => setReleaseNote(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Rule">Rule</label>
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Enter Rule..."
                                id="Rule"
                                rows="3"
                                name="Rule"
                                onChange={handleRuleChange}
                            />
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
                                    readOnly
                                    value={cmd}
                                />

                                <div className="input-group-append">
                                    <button className="btn btn-success" type="submit" id="copy">Copy</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Workspacetest;

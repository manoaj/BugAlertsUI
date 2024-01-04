import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

const URL = 'http://localhost:8000/getAll/tagimplications';

const Tagimplications = () => {
    const [tags, setTags] = useState([]);
    const [filterText, setFilterText] = useState('');

    // Fetch data from API and update tags state
    const getTags = () => {
        fetch(URL)
            .then(response => response.json())
            .then(data => setTags(data));
    };

    useEffect(() => {
        getTags();
    }, []);

    const columns = [
        {
            name: 'Tag',
            selector: 'Tag',
            sortable: true,
            width: '15%',
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
            style: {
                textAlign: 'left',
            },
        },
    ];

    const handleFilterChange = e => {
        setFilterText(e.target.value);
    };

    const filteredTags = tags.filter(tag =>
        tag.Tag.toString().toLowerCase().includes(filterText.toLowerCase()) ||
        tag.Tag_implication.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="container-fluid tab-pane active">
            <div className="col-lg">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h4 className="card-title">Tag Implications</h4>
                        <input
                            id="filter"
                            type="text"
                            value={filterText}
                            onChange={handleFilterChange}
                            placeholder="Search Tags..."
                            style={{ width: '82%' }}
                        />
                    </div>
                    <div className="card-body">
                        <StyledDataTableWrapper>
                            <StyledDataTable
                                keyField="Tag"
                                columns={columns}
                                data={filteredTags}
                                striped
                                highlightOnHover
                                bordered={false}
                                noHeader
                                overflowY
                                defaultSortField="Tag"
                                fixedHeader={true}
                            />
                        </StyledDataTableWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StyledDataTableWrapper = styled.div`
    height: 84vh;
    overflow: auto;
`;

const StyledDataTable = styled(DataTable)`
    .rdt_Table {
        width: 100%;
        table-layout: fixed;
    }

    .rdt_TableCell {
        white-space: normal !important;
        word-wrap: break-word;
        font-size: 14px;
    }

    .rdt_TableHead {
        font-weight: bold;
        font-size: 17px;
        layout: fixed;
    }
`;

export default Tagimplications;
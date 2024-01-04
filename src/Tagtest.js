import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const URL = 'http://localhost:8000/getAll/tags';

const Tags = () => {
    const [tags, setTags] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filterTag] = useState('');
    const [filterTagImp] = useState('');

    // Fetch data from API and update tags state
    const getTags = () => {
        fetch(URL)
            .then(response => response.json())
            .then(data => setTags(data));
    };

    useEffect(() => {
        getTags();
    }, []);

    const handleFilterChange = e => {
        setFilterText(e.target.value);
    };

    const filteredTags = tags.filter(
        tag =>
            tag.Tag.toString().toLowerCase().includes(filterText) ||
            tag.Tag_description.toString().toLowerCase().includes(filterText)
    );


    return (
        <div className="container-fluid tab-pane active">
            <div className="col-lg">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h4 className="card-title">Tags</h4>
                        <input
                            id="filter"
                            type="search"
                            value={filterText}
                            onChange={handleFilterChange}
                            placeholder="Search Tags..."
                            style={{ width: '82%' }}
                        />
                    </div>
                    <Table
                        highlightOnHover={true}
                        size="small"
                        variation="striped">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left" font-size="16px" width="18%" >Tag <br></br>
                                    <TextField
                                        id="filter"
                                        variant="filled"
                                        type="search"
                                        value={filterTag}
                                        onChange={handleFilterChange}
                                        label="Search Tags"
                                        size="small"
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="left" font-size="16px" width="82%">Tag Description <br></br>
                                    <TextField
                                        id="filter"
                                        variant="filled"
                                        type="search"
                                        value={filterTagImp}
                                        onChange={handleFilterChange}
                                        label="Search Description"
                                        size="small"
                                    />
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                    <div className="card-body" style={{ maxHeight: '84vh', overflow: 'auto' }}>
                        <Table>
                            <TableBody>
                                {filteredTags.map(tag => (
                                    <TableRow key={tag.Tag}>
                                        <TableCell align="left" font-size="16px" width="18%">{tag.Tag}</TableCell>
                                        <TableCell align="left" font-size="16px" width="82%">{tag.Tag_description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StyledTableCell = styled(TableCell)`
  && {
    font-weight: bold;
    font-size: 16px;
    layout: fixed;
    margin: auto;
  }
`;

export default Tags;

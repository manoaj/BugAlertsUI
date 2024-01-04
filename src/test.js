import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';


const URL = 'http://127.0.0.1:8000/getAll/alertworthy?skip=0';

const Alertworthy = () => {
    const [alerts, setAlerts] = useState([]);
    const [filterText, setFilterText] = useState('');

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Fetch data from API and update alerts state
    const getAlerts = () => {
        fetch(URL)
            .then(response => response.json())
            .then(data => setAlerts(data));
    };

    useEffect(() => {
        getAlerts();
    }, []);

    const columns = [
        {
            name: '#BUG',
            selector: 'id',
            sortable: true,
            width: '6%',
            filter: true,
        },
        {
            name: 'Product',
            selector: 'product',
            sortable: true,
            width: '7%',
        },
        {
            name: 'Severity',
            selector: 'severity',
            sortable: true,
            width: '7%',
        },
        {
            name: 'Owner',
            selector: 'bugalertOwner',
            sortable: true,
            width: '7%',
        },
        {
            name: 'Alert Summary',
            selector: 'alertSummary',
            wrap: true,
        },
        {
            name: 'Added On',
            selector: 'added',
            wrap: true,
            sortable: true,
            width: '7%',
        }
    ];

    const expandedContent = ({ data }) => (
        <DetailsTable>
            <tbody>
                <tr><th>Bug ID</th>                 <td>{data.id}</td></tr>
                <tr><th>Owner</th>                  <td>{data.bugalertOwner}</td></tr>
                <tr><th>Added On</th>               <td>{data.added}</td></tr>
                <tr><th>Description</th>            <td>{data.description}</td></tr>
                <tr><th>Severity</th>               <td>{data.severity}</td></tr>
                <tr><th>Product</th>                <td>{data.product}</td></tr>
                <tr><th>Versions Introduced</th>    <td>{data.versionsIntroduced}</td></tr>
                <tr><th>Versions Fixed</th>         <td>{data.versionFixed}</td></tr>
                <tr><th>CVE</th>                    <td>{data.CVE}</td></tr>
                <tr><th>Bites</th>                  <td>{data.bites}</td></tr>
                <tr><th>SR Case Numbers</th>        <td>{data.srCaseNumbers}</td></tr>
                <tr><th>Last Bite Time</th>         <td>{data.lastBiteTime}</td>
                </tr><tr><th>Rule</th>              <td>{data.rule}</td></tr>
                <tr><th>Alert Summary</th>          <td>{data.alertSummary}</td></tr>
                <tr><th>Release Note</th>           <td>{data.releaseNote}</td></tr>
                <tr><th>Supported</th>              <td>{data.supported}</td></tr>
            </tbody>
        </DetailsTable>
    );

    const handleFilterChange = e => {
        setFilterText(e.target.value);
    };

    const filteredAlerts = alerts.filter(alert =>{
        const alertDate = new Date(alert.added);
        return ((alert.id.toString().includes(filterText) ||
            alert.product.toLowerCase().includes(filterText.toLowerCase()) ||
            alert.bugalertOwner.toLowerCase().includes(filterText.toLowerCase()) ||
            alert.severity.toLowerCase().includes(filterText.toLowerCase()) ||
            alert.alertSummary.toLowerCase().includes(filterText.toLowerCase()) ||
            alert.supported.toLowerCase().includes(filterText.toLowerCase()) ||
            alert.supported.toLowerCase().includes(filterText.toLowerCase())) && (!startDate || alertDate >= startDate) && (!endDate || alertDate <= endDate) ); 


});

    const [currentRow, setCurrentRow] = useState(null);

    return (

        <div className="container-fluid tab-pane active " >
            <div className="col-lg" >
                <div className="card" >
                    <div className="card-header d-flex justify-content-between align-items-center" >
                        <h4 className="card-title" > Alertworthy</h4 >
                        <input
                            id="filter"
                            type="text"
                            value={filterText}
                            onChange={handleFilterChange}
                            placeholder="Search..."
                            style={{ width: '30%' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <ReactDatePicker
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                dateFormat="MMMM d, yyyy"
                                isClearable
                                placeholderText="Start Date"
                                className="form-control"
                            />
                            <ReactDatePicker
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                dateFormat="MMMM d, yyyy"
                                isClearable
                                placeholderText="End Date"
                                className="form-control"
                            />
                        </div>
                    </div >
                    <div className="card-body" >
                        <div className="table-overflow" >
                            <StyledDataTable
                                columns={columns}
                                data={filteredAlerts}
                                striped
                                highlightOnHover
                                expandableRows
                                expandableRowExpanded={(row) => (row === currentRow)}
                                expandOnRowClicked
                                onRowClicked={(row) => setCurrentRow(row)}
                                expandableRowsComponent={({ data }) => expandedContent({ data })}
                                onRowExpandToggled={(bool, row) => setCurrentRow(row)}
                                pagination
                                paginationPerPage={15}
                                onFilter={() => { }}
                            />
                        </div >
                    </div >
                </div >
            </div >
        </div >



    );
};

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

const DetailsTable = styled.table`
  width: 100%;
  table-layout: fixed;

  th, td {
    white-space: normal !important;
    word-wrap: break-word;
    font-size: 14px;
    overflow-wrap: break-word;
  }

  th {
    width: 10%;
  }

  td {
    width: 90%;
  }
`;

export default Alertworthy;

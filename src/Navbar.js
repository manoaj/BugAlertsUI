import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


function Navbar() {
    return (
        <>
            <nav>
                <ul className="nav nav-tabs nav-pills nav-fill">
                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="/Queue">Queue</a></li>
                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="/Workspace">Workspace</a></li>
                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="/Tags">Tags</a></li>
                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="/Tagimplications">Tag Implication</a></li>
                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="/Alertworthy">Alertworthy</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;

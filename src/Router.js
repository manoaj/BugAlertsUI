import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Workspace from './Workspace';
import Bugs from './Bugs';
import Alertworthy from './Alertworthy';
import Tags from './Tags';
import Tagimplications from './Tagimplications';

import React from 'react';

import Tagtest from './Tagtest';
import Workspacetest from './Workspacetest';
import Workspacetestm from './Workspacetestm';
import Queuetest from './Queuetest';
import Alertworthytest from './Alertworthytest';

import Test from './test'

function Router() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<h1>Page not available</h1>} />
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path="/home" element={<Home />} />
                    </Route>
                    <Route path="/Queue" element={<Bugs />} />
                    <Route path="/Workspace" element={<Workspace />} />
                    <Route path="/Alertworthy" element={<Alertworthy />} />
                    <Route path="/Tags" element={<Tags />} />
                    <Route path="/Tagimplications" element={<Tagimplications />} />

                    <Route path="/Tagtest" element={<Tagtest />} />
                    <Route path="/Workspacetest" element={<Workspacetest />} />
                    <Route path="/Workspacetestm" element={<Workspacetestm />} />
                    <Route path="/Queuetest" element={<Queuetest />} />
                    <Route path="/Alertworthytest" element={<Alertworthytest />} />

                    <Route path="/Test" element={<Test />} />

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;
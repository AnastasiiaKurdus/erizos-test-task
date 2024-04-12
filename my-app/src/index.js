import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RootFolder from './RootFolder';
import { data } from './mockData';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootFolder data={data} expandedFolders={['/SDK/Bootstrapper/Packages', '/Common7',]}/>);

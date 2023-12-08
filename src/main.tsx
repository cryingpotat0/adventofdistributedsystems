import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RepoContext } from '@automerge/automerge-repo-react-hooks'
import { docUrl, repo, handle } from './automerge';

const doc = await handle.doc();
const currentWeek = doc!.currentWeek;
const currentWeekData = doc![currentWeek];

const initialFiles = currentWeekData.currentCode;
const initialOutput = currentWeekData.currentOutput;

console.log('initialFiles', initialFiles);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RepoContext.Provider value={repo}>
      <App docUrl={docUrl} initialFiles={initialFiles} initialOutput={initialOutput} />
    </RepoContext.Provider>
  </React.StrictMode>,
)

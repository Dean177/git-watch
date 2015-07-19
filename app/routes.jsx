import React from 'react'
import { Route, DefaultRoute } from 'react-router';
import RepoStatus from './RepositoryStatusList/RepoStatusList';
import AddRepo from './AddRepository/AddRepositoryWrapper';
import Settings from './Settings';
import RootTemplate from './RootTemplate';


export default (
  <Route path="/" handler={ RootTemplate }>
    <DefaultRoute name="repo-status" handler={ RepoStatus } />
    <Route name="add-repo" handler={ AddRepo } />
    <Route name="settings" handler={ Settings } />
  </Route>
)

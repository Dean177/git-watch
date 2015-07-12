import React from 'react'
import { Route, DefaultRoute } from 'react-router';
import RepoStatus from '../RepositoryStatusList/RepoStatusList';
import AddRepo from '../components/AddRepository';
import Settings from '../components/Settings';
import RootTemplate from '../RootTemplate';


export default (
  <Route path="/" handler={ RootTemplate }>
    <DefaultRoute name="repo-status" handler={ RepoStatus } />
    <Route name="add-repo" handler={ AddRepo } />
    <Route name="settings" handler={ Settings } />
  </Route>
)

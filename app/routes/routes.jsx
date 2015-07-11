import React from 'react'
import { Route, DefaultRoute } from 'react-router';
import RepoStatus from '../RepositoryStatusList/RepoStatusList';
import AddRepo from '../components/AddRepository';
import { RouteHandler } from 'react-router'


export default (
  <Route path="/" handler={ RouteHandler }>
    <DefaultRoute name="repo-status" handler={ RepoStatus } />
    <Route name="add-repo" handler={ AddRepo } />
  </Route>
)

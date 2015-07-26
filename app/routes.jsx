import React from 'react'
import { Route, DefaultRoute } from 'react-router';
import RepoStatus from './RepositoryStatusList/RepositoryStatusList';
import AddRepo from './AddRepository/AddRepositoryWrapper';
import Settings from './Settings';
import CreateBranch from './CreateBranch/CreateBranch';
import CheckoutBranch from './CheckoutBranch/CheckoutBranch';
import PushBranch from './PushBranch/PushBranch';
import RootTemplate from './RootTemplate';


export default (
  <Route path="/" handler={ RootTemplate }>
    <DefaultRoute name="repo-status" handler={ RepoStatus } />
    <Route name="add-repo" handler={ AddRepo } />
    <Route name="settings" handler={ Settings } />

    <Route name="create-branch" handler={ CreateBranch } />
    <Route name="checkout-branch" handler={ CheckoutBranch } />
    <Route name="push-branch" handler={ PushBranch } />
  </Route>
)

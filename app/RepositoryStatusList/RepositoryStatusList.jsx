import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RepositoryStatus from './components/RepositoryStatus';
import pullLatestRemote from '../lib/git/PollRepositories';
import { ActionBar, Action } from '../shared/ActionBar';
import * as RepoActionCreators from '../actions/RepositoryActions';
import '!style!css!less!./RepositoryStatusList.less';


//const fiveMinutes = 300000; //ms
//var repositoryPoll = setInterval(() => {
//}, fiveMinutes);

@connect((store) => ({ repositories: store.Repository }))
class RepositoryStatusList extends Component {
  static contextTypes:  { store: PropTypes.object };

  static propTypes: {
    repositories: ImmutablePropTypes.map
  };

  pollRepository(repository) {
    let repositoryPath = repository.get('path');
    this.props.dispatch(RepoActionCreators.pollRepository(repositoryPath));

    pullLatestRemote(repositoryPath, "origin", "master")
      .then(
        (branchName) => { this.props.dispatch(RepoActionCreators.repositoryUpdated(repositoryPath, branchName)); },
        (error) => { this.props.dispatch(RepoActionCreators.repositoryUpdateFailed(repositoryPath, error)); }
    );
  }

  pollAllRepositories() {
    this.props.repositories.toList().forEach((r) => this.pollRepository(r));
  }

  render() {
    const repositoryStatus = this.props.repositories.toList().map((repository) => {
      return (
        <RepositoryStatus
            key={ repository.get('path') }
            onClickHandler={ this.pollRepository.bind(this, repository) }
            repository={ repository } />
      );
    });

    return (
      <div className="RepositoryStatusList">
        <div className="main">
          <h2>Git Watch</h2>
          <div className="RepositoryList">{ repositoryStatus }</div>
        </div>

        <div className="sidebar">
          <ActionBar>
            <Action onClick={ this.pollAllRepositories.bind(this) }>
              <i className="fa fa-refresh"></i>
              <span className="label">Fetch</span>
            </Action>
            <Action to="add-repo">
              <i className="fa fa-plus"></i>
              <span className="label">Add</span>
            </Action>
            <Action to="checkout-branch">
              <i className="octicon octicon-git-pull-request"></i>
              <span className="label">Checkout</span>
            </Action>
            <Action to="create-branch">
              <i className="octicon octicon-git-branch"></i>
              <span className="label">Branch</span>
            </Action>
            <Action to="push-branch">
              <i className="octicon octicon-cloud-upload"></i>
              <span className="label">Push</span>
            </Action>
            <Action to="settings">
              <i className="fa fa-cog"></i>
              <span className="label">Settings</span>
            </Action>
          </ActionBar>
        </div>
      </div>
    );
  }
}

export default RepositoryStatusList;

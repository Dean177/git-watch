import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RepositoryStatus from './components/RepositoryStatus';
import pullLatestRemote from '../lib/PollRepositories';
import { ActionBar, Action } from '../shared/ActionBar';
import * as RepoActionCreators from '../actions/RepositoryActions';


//const fiveMinutes = 300000; //ms
//var repositoryPoll = setInterval(() => {
//}, fiveMinutes);


@connect((store) => ({ repositories: store.Repository }))
class RepositoryStatusList extends Component {
  static contextTypes:  {
    store: React.PropTypes.object
  };

  static propTypes: {
    repositories: ImmutablePropTypes.map
  };

  pollRepository(repository) {
    let repositoryPath = repository.get('path');
    this.props.dispatch(RepoActionCreators.pollRepository(repositoryPath));

    pullLatestRemote(repositoryPath, "origin", "master")
      .then(
        () => {
          console.log("Pull succeed");
          this.props.dispatch(RepoActionCreators.repositoryUpdated(repositoryPath));
        },
        (error) => {
          console.log("Pull failed");
          this.props.dispatch(RepoActionCreators.repositoryUpdateFailed(repositoryPath, error));}
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
      <div>
        <h2>Git Watch</h2>

        <ActionBar>
          <Action to="add-repo"><i className="fa fa-plus"></i></Action>
          <Action onClick={ this.pollAllRepositories.bind(this) }>
            <i className="fa fa-refresh"></i>
          </Action>
          <Action to="settings"><i className="fa fa-bars"></i></Action>
        </ActionBar>

        <div className="RepositoryList">{ repositoryStatus }</div>
      </div>
    );
  }
}

export default RepositoryStatusList;

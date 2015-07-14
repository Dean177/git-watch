import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RepositoryStatus from './components/RepositoryStatus';
import pullLatestRemote from '../lib/PollRepositories';
import * as RepoActionCreators from '../actions/RepositoryActions';


//const fiveMinutes = 300000; //ms
//var repositoryPoll = setInterval(() => {
//}, fiveMinutes);


@connect((state) => ({ repositories: state.get("repositories") }))
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


  render() {
    const repositories = this.props.repositories.toList().map((repository) => {
      return (
        <RepositoryStatus
            key={repository.get('path')}
            onClickHandler={this.pollRepository.bind(this, repository)}
            repository={repository} />
      );
    });

    return (
      <div>
        <h2>Git Watch</h2>
        <Link className="primary-link" to="settings">
          <h4><i className="fa fa-bars"></i></h4>
        </Link>

        <Link className="button-primary"to="add-repo">
          <h4><i className="fa fa-plus"></i></h4>
        </Link>

        <div className="RepositoryList">{ repositories }</div>
      </div>
    );
  }
}

export default RepositoryStatusList;

import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'redux/react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RepositoryStatus from './components/RepositoryStatus';
import pullLatestRemote from '../lib/PollRepositories';


@connect((state) => ({ repositories: state.get("repositories") }))
class RepositoryStatusList extends Component {
  static contextTypes:  {
    store: React.PropTypes.object
  };

  static propTypes: {
    repositories: ImmutablePropTypes.map
  };

  pollRepository(repository) {
    pullLatestRemote(repository.get('path'), "origin", "master")
      .then(
        () => { console.log("Completed success"); },
        (error) => { console.log("fail", error); }
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

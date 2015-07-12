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
        <button className="button-primary"><Link className="button-primary"to="add-repo">ADD REPOSITORY</Link></button>
        <ul className="RepositoryList">
            { repositories }
        </ul>
      </div>
    );
  }
}

export default RepositoryStatusList;

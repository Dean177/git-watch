import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'redux/react';
import RepositoryStatus from './components/RepositoryStatus';


@connect((state) => ({ repositories: state.get("repositories") }))
class RepositoryStatusList extends Component {
  static contextTypes:  {
    store: React.PropTypes.object
  };

  pollRepository(repository) {
    console.log("clicked on", repository);
  }


  render() {
    const repositories = this.props.repositories.toSeq().map((repository) => {
      return (
        <RepositoryStatus
            key={repository.get('path')}
            onClickHandler={this.pollRepository.bind(this, repository)}
            repository={repository} />);
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

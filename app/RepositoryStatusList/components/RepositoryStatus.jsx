import React, { Component } from 'react';
import path from 'path';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';

import Status from '../../constants/Status';


class RepositoryStatus extends Component {
  static propTypes: {
    onClickHandler: React.PropTypes.func,
    repository: React.PropTypes.object
  };

  getStatusColor(repository) {
    let repositoryStatus = repository.get('status');

    switch(repositoryStatus) {
      case Status.ok:
        return "blue";
      case Status.loading:
        return "spinner";
      case Status.warning:
        return "orange";
      case Status.error:
        return "red";
      default:
        return "";
    }
  }

  render() {
    let { repository, onClickHandler } = this.props;
    let repositoryPathSplit = repository.get('path').split(path.sep);
    let repositoryName = repositoryPathSplit[repositoryPathSplit.length -1];

    let classes = classNames("statusCircle", this.getStatusColor(repository));

    return (
      <div key={repository.get('path')} className="RepositoryStatus">
        <div className={classes}><i className="fa fa-circle-o"></i></div>
        <div className="name">{ repositoryName }</div>
        <button onClick={onClickHandler}>Poll</button>
      </div>
    );
  }
}

export default RepositoryStatus
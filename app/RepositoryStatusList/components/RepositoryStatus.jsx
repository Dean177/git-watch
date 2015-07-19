import React, { Component } from 'react';
import path from 'path';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';
import Status from '../../constants/Status';
import '!style!css!less!./RepositoryStatus.less';


class RepositoryStatus extends Component {
  static propTypes: {
    onClickHandler: React.PropTypes.func,
    repository: React.PropTypes.object.isRequired
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
    let repoPath = repository.get('path');
    let branchName = repository.get('branchName');

    let repositoryPathSplit = repoPath.split(path.sep);
    let repositoryName = repositoryPathSplit[repositoryPathSplit.length -1];

    let classes = classNames("statusCircle", this.getStatusColor(repository));

    return (
      <div className="RepositoryStatus">
        <div className="name">
          <span className="repo">{ repositoryName }</span>: <span className="branch">{ branchName }</span> <span className="path">{ repoPath }</span> <i className="fa fa-ellipsis-v" />
        </div>
        <div className="status-row">
          <div className={ classes }></div>
          <span className="error-message">{ repository.getIn(['error', 'message']) }</span>
          <a className="actionlink" onClick={onClickHandler}>check now</a>
        </div>
      </div>
    );
  }
}

export default RepositoryStatus

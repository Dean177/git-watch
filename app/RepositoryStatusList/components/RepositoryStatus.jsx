import React, { Component, PropTypes } from 'react';
import path from 'path';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';
import Status from '../../constants/Status';
import '!style!css!less!./RepositoryStatus.less';


class RepositoryStatus extends Component {
  static propTypes: {
    onClickHandler: PropTypes.func,
    repository: PropTypes.object.isRequired
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
          <span className="repo">{ repositoryName }</span>: <span className="path">{ repoPath }</span> <a href="#"><i className="fa fa-refresh" onClickHandler={onClickHandler}></i></a>
        </div>
        <div className="status-row">
          <div className={ classes }></div>
          { branchName && branchName.length > 0 ? <span className="branch"><i className="fa fa-code-fork"></i> { branchName } </span> : "" }
          <span className="error-message">{ repository.getIn(['error', 'message']) }</span>
        </div>
      </div>
    );
  }
}

export default RepositoryStatus

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ActionBar, Action } from '../shared/ActionBar';


@connect((store) => ({ repositories: store.Repository }))
class RepositoryStatusList extends Component {
  static contextTypes:  {
    store: PropTypes.object
  };

  static propTypes: {
    repositories: ImmutablePropTypes.map
  };

  render() {
    return (
      <div className="CreateBranch">
        <h2>Checkout Branch</h2>
        <ActionBar>
          <Action to="repo-status"><i className="fa fa-arrow-left"></i></Action>
        </ActionBar>
      </div>
    );
  }
}

export default RepositoryStatusList;

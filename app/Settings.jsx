import React, { Component } from 'react';
import { ActionBar, Action } from './shared/ActionBar';
import { connect } from 'react-redux';
import * as RepoActionCreators from './actions/RepositoryActions';

@connect((state) => ({ state: state }))
class Settings extends Component {
  render() {
    return (
      <div className="Settings">
        <h2>Settings</h2>
        <ActionBar>
          <Action to="repo-status"><i className="fa fa-arrow-left"></i></Action>
        </ActionBar>

        <h5>Application State</h5>
        <pre>
          <code>{ JSON.stringify(this.props.state, null, 2) }</code>
        </pre>
      </div>
    )
  }
}

export default Settings
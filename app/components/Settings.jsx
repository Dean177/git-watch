import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'redux/react';
import * as RepoActionCreators from '../actions/RepositoryActions';

@connect((state) => ({ state: state }))
class Settings extends Component {
  render() {
    return (
      <div>
        <h2>Settings</h2>
        <Link className="primary-link"to="repo-status">
          <h4><i className="fa fa-arrow-left"></i></h4>
        </Link>

        <h5>Application State</h5>
        <pre>
          <code>{ JSON.stringify(this.props.state, null, 2) }</code>
        </pre>
      </div>
    )
  }
}

export default Settings
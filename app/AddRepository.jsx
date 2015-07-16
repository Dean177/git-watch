import React, { Component } from 'react';
import { ActionBar, Action } from './shared/ActionBar';

import { connect } from 'react-redux';
import * as RepoActionCreators from './actions/RepositoryActions';

@connect((state) => ({ repositories: state.repositories }))
class AddRepo extends Component {
  static contextTypes:  {
    store: React.PropTypes.object
  };

  constructor() {
    super();
    // TODO move this into the store.
    this.state = {
      selectedDirectory: ""
    };

    this.onFormSubmitted = (event) => {
      event.preventDefault();

      let path = this.state.selectedDirectory;
      if (path && path != "") {
        this.props.dispatch(RepoActionCreators.newRepository(path));
      }
    };

    this.onDirectorySelected = (event) => {
      event.preventDefault();

      const files = event.target.files;
      if (!files || !files[0]) {
        this.setState({selectedDirectory: ""});
      } else {
        const selectedDirectory = files[0].path;
        // TODO verify there is a git repo
        this.setState({ selectedDirectory });
      }
    };
  }

  componentDidMount() {
    // React will ignore custom attributes which aren't in its whitelist: https://github.com/facebook/react/issues/140
    this.refs.fileInput.getDOMNode().setAttribute('webkitdirectory', "true");
  }

  render() {
    return (
      <div>
        <h2>Add Repository</h2>
        <ActionBar>
          <Action to="repo-status"><i className="fa fa-arrow-left"></i></Action>
        </ActionBar>

        <form onSubmit= { this.onFormSubmitted }>
          <label htmlFor="exampleEmailInput">Select repository location</label>
          <input className="directory-picker" type="file" ref="fileInput" onChange={ this.onDirectorySelected }/>
          <button className="button-primary">Go</button>
        </form>
        <pre><code>{ JSON.stringify(this.state, null, 2) }</code></pre>
      </div>
    )
  }
}

export default AddRepo
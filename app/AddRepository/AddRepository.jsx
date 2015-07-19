import React, { Component } from 'react';
import { ActionBar, Action } from '../shared/ActionBar';
import DirectoryPicker from './DirectoryPicker';

import { connect } from 'react-redux';
import * as RepoActionCreators from '../actions/RepositoryActions';
import * as AddRepoActions from '../actions/AddRepoActions';


@connect((state) => ({ AddRepoForm: state.AddRepoForm}))
class AddRepo extends Component {
  static contextTypes:  {
    store: React.PropTypes.object
  };

  constructor() {
    super();

    this.onFormSubmitted = (event) => {
      event.preventDefault();

      let path = this.props.AddRepoForm.directory;
      if (path && path != "") {
        this.props.dispatch(RepoActionCreators.newRepository(path));
      }
    };

    this.onDirectorySelected = (event) => {
      event.preventDefault();

      const files = event.target.files;
      if (!files || !files[0]) {
        this.props.dispatch(AddRepoActions.chooseDirectory(""));
      } else {
        const selectedDirectory = files[0].path;
        // TODO verify there is a git repo
        this.props.dispatch(AddRepoActions.chooseDirectory(selectedDirectory ));
      }
    };
  }


  render() {
    const selectedDirectory = this.props.AddRepoForm.get('directory');
    return (
      <div>
        <h2>Add Repository</h2>
        <ActionBar>
          <Action to="repo-status"><i className="fa fa-arrow-left"></i></Action>
        </ActionBar>

        <form onSubmit= { this.onFormSubmitted }>
          <div className="row">
            <DirectoryPicker label="Select repository location" onChange={ this.onDirectorySelected } />
            <span>{ selectedDirectory }</span>
          </div>
          <div className="row">
            <button className="button-primary">Go</button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddRepo
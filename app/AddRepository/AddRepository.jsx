import React, { Component, PropTypes } from 'react';
import { Navigation } from 'react-router';
import { Connector } from 'react-redux';

import { ActionBar, Action } from '../shared/ActionBar';
import DirectoryPicker from './DirectoryPicker';


const AddRepo = React.createClass({
  mixins:[Navigation],

  contextTypes:  {
    store: PropTypes.object.isRequired
  },

  propTypes: {
    AddRepoForm: PropTypes.object.isRequired,
    newRepository: PropTypes.func.isRequired,
    chooseDirectory: PropTypes.func.isRequired
  },

  onFormSubmitted: function(event) {
    event.preventDefault();

    let path = this.props.AddRepoForm.get('directory');
    if (path && path != "") {
      this.props.newRepository(path);
      this.transitionTo('repo-status');
    } else {
      console.error("No directory selected", path);
    }
  },

  onDirectorySelected: function(event) {
    event.preventDefault();

    const files = event.target.files;
    if (!files || !files[0]) {
      this.props.chooseDirectory("");
    } else {
      const selectedDirectory = files[0].path;
      // TODO verify there is a git repo
      this.props.chooseDirectory(selectedDirectory);
    }
  },

  render: function() {
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
        <pre><code>{JSON.stringify(this.props, null, 2)}</code></pre>
      </div>
    )
  }
});

export default AddRepo
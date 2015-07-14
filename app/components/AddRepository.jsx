import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as RepoActionCreators from '../actions/RepositoryActions';

@connect((state) => ({ repositories: state.repositories }))
class AddRepo extends Component {
  static contextTypes:  {
    store: React.PropTypes.object
  };

  constructor() {
    super();

    this.onNewRepository = (event) => {
      event.preventDefault();
      console.log("event", event.target.files);
      const files = event.target.files;
      if (!files || !files[0]) {
        // No directory has been selected
      } else {
        const path = files[0].path;
        // TODO verify there is a git repo
        this.props.dispatch(RepoActionCreators.newRepository(path));
      }
    }
  }

  componentDidMount() {
    // React will ignore custom attributes which aren't in its whitelist: https://github.com/facebook/react/issues/140
    this.refs.fileInput.getDOMNode().setAttribute('webkitdirectory', "true");
  }

  render() {
    return (
      <div>
        <h2>Add Repository</h2>
        <Link className="primary-link"to="repo-status">
          <h4><i className="fa fa-arrow-left"></i></h4>
        </Link>

        <form onSubmit= { this.onNewRepository }>
          <label htmlFor="exampleEmailInput">Select repository location</label>
          <input type="file" ref="fileInput" onChange={ this.onNewRepository }/>
          <button primary={true}>Go</button>
        </form>
      </div>
    )
  }
}

export default AddRepo
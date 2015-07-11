import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'redux/react';
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
        <Link to="repo-status">Cancel</Link>

        <form onSubmit= { this.onNewRepository }>
          <div className="row">
            <div className="six columns">
              <label htmlFor="exampleEmailInput">Select repository location</label>
              <input type="file" ref="fileInput" onChange={ this.onNewRepository }/>
            </div>
            <div className="six columns">
              <button primary={true}>Go</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AddRepo
var fs = nativeRequire('fs');

import  React from 'react';
import { Button, Row, Column, Form } from 'react-skeleton';
import { connect } from 'redux/react';
import * as RepoActionCreators from '../actions/RepositoryActions';

@connect((state) => ({ theState: state}))
class NewRepo extends React.Component {

  constructor() {
    super();
    this.contextTypes =  {
      store: React.PropTypes.object
    };

    this.onNewRepository = (event) => {
      event.preventDefault();
      console.log("event", event.target.files);
      const files = event.target.files;
      if (!files[0]) {
        // No directory has been selected
      } else {
        const path = files[0].path;
        console.log("Directory selected", path);

        this.props.dispatch(RepoActionCreators.newRepository(path));
      }
    }
  }




  componentDidMount() {
    // React will ignore custom attributes which aren't in its whitelist: https://github.com/facebook/react/issues/140
    this.refs.fileInput.getDOMNode().setAttribute('nwdirectory', "true");
  }

  render() {
    console.log("props", this.props);
    return (
      <form onSubmit= { this.onNewRepository }>
        <Row>
          <Column.Six>
            <label htmlFor="exampleEmailInput">Select repository location</label>
            <input type="file" ref="fileInput" onChange={ this.onNewRepository }/>
          </Column.Six>

          <Column.Six>
            <Button primary={true}>Go</Button>
          </Column.Six>
        </Row>
        <div>
          {JSON.stringify(this.props.theState)}
        </div>
      </form>

    );
  }
}

export default NewRepo;
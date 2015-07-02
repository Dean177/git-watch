var fs = nativeRequire('fs');

import  React from 'react';
import { Button, Row, Column, Form } from 'react-skeleton';
import { RepositoryActions } from '../actions/RepositoryActions';
import { getActionIds } from '../lib/redux-helpers';


const actions = getActionIds(RepositoryActions);
console.log("actions:", JSON.stringify(actions));
redux.dispatch(actions.newRepository("helloWorld"));

export default class NewRepo extends React.Component {

  onNewRepository(e) {


    e.preventDefault();
    const files = this.refs.fileInput.getDOMNode().files;
    if (!files[0]) {
      // No directory has been selected
    } else {
      const path = files[0].path;
      console.log("Directory selected", path);

    }
  }

  componentDidMount() {
    // React will ignore custom attributes which aren't in its whitelist: https://github.com/facebook/react/issues/140
    this.refs.fileInput.getDOMNode().setAttribute('nwdirectory', "true");
  }

  render() {
    return (
      <form onSubmit= {this.onNewRepository }>
        <Row>
          <Column.Six>
            <label htmlFor="exampleEmailInput">Select repository location</label>
            <input type="file" ref="fileInput" onChange={this.onNewRepository}/>
          </Column.Six>

          <Column.Six>
            <Button primary={true}>Go</Button>
          </Column.Six>
        </Row>
      </form>
    );
  }
}
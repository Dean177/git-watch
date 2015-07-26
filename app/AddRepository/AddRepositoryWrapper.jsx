import React, { Component, PropTypes } from 'react';
import { Connector } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import * as RepoActionCreators from '../actions/RepositoryActions';
import * as AddRepoActions from '../actions/AddRepoActions';
import AddRepository from './AddRepository';


function select(state) { return { AddRepoForm: state.AddRepoForm}; }

class AddRepoWrapper extends Component {
  static contextTypes:  {
    store: PropTypes.object
  };

  render() {
    return (
      <Connector select={select}>
        {({AddRepoForm, dispatch}) =>
          <AddRepository
            {...this.props}
            AddRepoForm={AddRepoForm}
            {...bindActionCreators({ ...AddRepoActions, ...RepoActionCreators }, dispatch)} />
        }
      </Connector>
    )
  }
}

export default AddRepoWrapper
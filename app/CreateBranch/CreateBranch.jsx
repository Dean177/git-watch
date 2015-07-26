import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import path from 'path';
import { ActionBar, Action } from '../shared/ActionBar';
import validateBranchName from '../lib/validateBranchName';
import * as CreateBranchActions from '../actions/CreateBranchActions';
import createCheckout from '../lib/git/branchUtils';

@connect((store) => ({ form: store.CreateBranchForm, repositories: store.Repository }))
class RepositoryStatusList extends Component {
  static contextTypes:  { store: PropTypes.object };

  static propTypes: {
    repositories: ImmutablePropTypes.map,
    createBranch: ImmutablePropTypes.map
  };

  onBranchNameEntry(event) {
    event.preventDefault();
    const branchName = event.target.value;
    const errors = validateBranchName(branchName);

    this.props.dispatch(CreateBranchActions.enterName(branchName, errors));
  }

  onRepositorySelected(repoPath, event) {
    this.props.dispatch(CreateBranchActions.selectRepository(repoPath, event.target.checked));
  }

  onSubmit(event) {
    event.preventDefault();

    const errors = this.props.form.get('errors');
    const selectedRepositories = this.props.form.get('selectedRepositories');
    if (errors.length == 0 && selectedRepositories.size > 0) {
      const branchName = this.props.form.get('branchName');

      Promise.all(selectedRepositories.map((repoPath) => {
          return createCheckout(repoPath, branchName);
        }))
        .then(() => {
          this.props.dispatch(CreateBranchActions.createdBranch());
        }, (error) => { console.error(error); });
    }
  }

  render() {
    const repositoryPickers = this.props.repositories.toList().map((repo) => {
      const repoPath = repo.get('path');
      const repositoryPathSplit = repoPath.split(path.sep);
      const repositoryName = repositoryPathSplit[repositoryPathSplit.length -1];
      const isChecked = this.props.form.get('selectedRepositories').includes(repoPath);
      return (
        <label key={repoPath} className="example-send-yourself-copy">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={this.onRepositorySelected.bind(this, repoPath)} />
          <span className="label-body">{repositoryName}: {repo.get('branchName')}</span>
        </label>
      );
    });

    const errors = this.props.form.get('errors');

    return (
      <div className="CreateBranch">
        <h2>Create a Branch</h2>
        <ActionBar>
          <Action to="repo-status"><i className="fa fa-arrow-left"></i></Action>
        </ActionBar>
        <pre><code>{JSON.stringify(errors, null, 2)}</code></pre>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Branch Name</label>
          <input
            className="u-full-width"
            placeholder="new-branch-name"
            type="text"
            value={this.props.form.get('branchName')}
            onChange={this.onBranchNameEntry.bind(this)} />

          <label>Select Repositories</label>
          <div className="RepositoryPicker">
            {repositoryPickers}
          </div>

          <button className="button-primary" type="submit">Go</button>
        </form>
      </div>
    );
  }
}

export default RepositoryStatusList;

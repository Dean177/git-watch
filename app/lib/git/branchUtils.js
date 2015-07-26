import { Repository } from 'nodegit';
import path from 'path';


export default function createAndCheckout(path, branchName) {
  return Repository
    .open(path)
    .then((repository) => {
      return createBranch(repository, branchName)
        .then((repo) => {
          return repo.checkoutBranch(branchName, null);
        });
    });
}

export function createBranch(repository, branchName) {
    return repository.getHeadCommit().then((commit) => {
      return repo.createBranch(
        branchName,
        commit,
        0,
        repo.defaultSignature(),
        "Created new-branch on HEAD");
    });
}
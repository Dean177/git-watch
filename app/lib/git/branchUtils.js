import { Repository } from 'nodegit';


export default function createAndCheckout(repoPath, branchName) {
  return Repository
    .open(repoPath)
    .then((repository) => {
      return createBranch(repository, branchName)
        .then(() => {
          return repository.checkoutBranch(branchName, null);
        });
    });
}

export function createBranch(repository, branchName) {
    return repository.getHeadCommit().then((commit) => {
      return repository.createBranch(
        branchName,
        commit,
        0,
        repository.defaultSignature(),
        "Created new-branch on HEAD");
    });
}
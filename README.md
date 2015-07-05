# git-watch
[![Circle CI](https://circleci.com/gh/Dean177/git-watch/tree/master.svg?style=svg)](https://circleci.com/gh/Dean177/git-watch/tree/master)
[![dependency status](https://david-dm.org/dean177/git-watch.svg)](https://david-dm.org/dean177/git-watch)

## Installation
 - Download [nwjs](https://github.com/nwjs/nw.js/) and make sure nw is available on your path
 - `npm install`
 
### git fetch
https://github.com/nodegit/nodegit/blob/master/examples/fetch.js
git remote update?
 
### Is working directory dirty?
 http://stackoverflow.com/questions/5143795/how-can-i-check-in-a-bash-script-if-my-local-git-repo-has-changes
 `git diff-index --quiet HEAD --;`
https://github.com/nodegit/nodegit/blob/master/examples/status.js
 
 ### Are remote/local pointing at different commits & is remote ahead of local?
 (http://stackoverflow.com/questions/3258243/git-check-if-pull-needed)
 git status -uno will tell you whether the branch you are tracking is ahead, behind or has diverged. If it says nothing, 
 the local and remote are the same.
 `
 git status -uno
 On branch master
 Your branch is behind 'origin/master' by 1 commit, and can be fast-forwarded.
   (use "git pull" to update your local branch)
 
 nothing to commit (use -u to show untracked files)
 `

### Pull
(https://github.com/nodegit/nodegit/blob/master/examples/pull.js)

### Merge clean
https://github.com/nodegit/nodegit/blob/master/examples/merge-cleanly.js
 

### [Whats with the weird `...` notation?](https://gist.github.com/sebmarkbage/07bbe37bc42b6d4aef81#whats-with-the-weird--notation)

https://github.com/nodegit/nodegit/blob/master/examples/general.js

Errors installing dependencies on windows can usually be resolved with adding
`npm install --msvs_version=2012`

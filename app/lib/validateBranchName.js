export default function validateBranchName(branchName) {
  var errors = [];

  if (typeof branchName != 'string') {
    errors.push('Branch name must be a string');
  }

  if (branchName.length === 0) {
    errors.push('Please enter a branch name');
  }

  if (branchName.startsWith('.')) {
    errors.push('Can not start with a "."');
  } else if (branchName.startsWith('/')) {
    errors.push('Can not start with a "/"');
  }

  if (branchName.includes('..')) {
    errors.push('Can not contain a ".."');
  }

  if (branchName.includes('~')) {
    errors.push('Can not contain a "~"');
  }

  if (branchName.includes('^')) {
    errors.push('Can not contain a "^"');
  }

  if (branchName.includes(':')) {
    errors.push('Can not contain a ":"');
  }

  if (branchName.endsWith('.lock')) {
    errors.push('Can not end with ".lock"');
  } else if (branchName.endsWith('\\')) {
    errors.push('Can not end with a "\\"');
  } else if (branchName.endsWith('/')) {
    errors.push('Can not end with a "/"');
  }

  return errors;
}

import ActionTypes from '../constants/ActionTypes';


export function enterName(name, errors) {
    return {
      type: ActionTypes.CreateBranch.enterName,
      name,
      errors
    };
}

export function selectRepository(path, isSelected) {
  return {
    type: ActionTypes.CreateBranch.selectRepository,
    path,
    isSelected
  };
}

export function createdBranch() {
  return {
    type: ActionTypes.CreateBranch.createdBranch
  };
}
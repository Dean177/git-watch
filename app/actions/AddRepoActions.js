import ActionTypes from '../constants/ActionTypes';
import Status from '../constants/Status';


export function chooseDirectory(path) {
    return {
      type: ActionTypes.AddRepo.chooseDirectory,
      path: path
    };
}

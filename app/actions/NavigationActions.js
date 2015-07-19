import { Navigation } from '../constant/ActionTypes';


export function locationChange(location) {
  return {
    type: Navigation.locationChange,
    location
  }
}
import { combineReducers } from "redux";
import { characterReducer } from "./characterReducer";
import { locationReducer } from "./locationReducer";
const rootReducer = combineReducers({
  characterReducer,
  locationReducer,
});
export default rootReducer;

import { createBrowserHistory, createHashHistory } from "history";
import { isElectron } from "./util";
const customHistory = isElectron() ? createHashHistory() : createBrowserHistory();

export default customHistory;
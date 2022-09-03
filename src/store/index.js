import {combineReducers,applyMiddleware,createStore,compose} from "redux"
import reduxThunk from "redux-thunk";
import user from "./reducers/user";
import clients from "./reducers/clients";
import projects from "./reducers/projects";
import profile from "./reducers/profile";
import projectDetail from "./reducers/projectDetail";
import clientDetail from "./reducers/clientDetail";
import clientList from "./reducers/clientList";
import categories from "./reducers/categories";
import subscribetions from "./reducers/subscribtions";
import subscribetion from "./reducers/subscribtion";
import asSub from "./reducers/asSub"
import dashboard from "./reducers/dashboard";
import clientProjects from "./reducers/clientProjects";
import invoices from "./reducers/invoices";
import invoiceDetail from "./reducers/invoiceDetail";
import userSubs from "./reducers/userSubs";
import bills from "./reducers/bill";
import subTran from "./reducers/subTrans";

const reducers=combineReducers({
    user,
    clients,
    projects,
    profile,
    projectDetail,
    clientDetail,
    clientList,
    categories,
    subscribetions,
    subscribetion,
    asSub,
    dashboard,
    clientProjects,
    invoices,
    invoiceDetail,
    userSubs,
    bills,
    subTran
})
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(reducers,{},composeEnhancer(applyMiddleware(reduxThunk)))

export default store
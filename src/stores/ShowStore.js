import EventEmitter from "events";
import Dispatcher from "../core/Dispatcher";
import ActionTypes from "../constants/ActionTypes";
import http from '../core/HttpClient';
import JsonApiStore from "./JsonApiStore";
import _ from "lodash";

class ShowStore extends JsonApiStore {
  constructor() {
    super();

    this.STORE_TYPE = "shows";
  }
}

const showStore = new ShowStore();

showStore.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {

    case ActionTypes.CHANNEL_FIND_SHOW_RECORDS:
      http.get(`/api/channels/${action.id}/shows`).then(result => {
        showStore.removeItem(action.id);
        showStore.addItems(result.data);
        showStore.emitChange();
      });
      break;
    default:
      return;
  }
});

export default showStore;
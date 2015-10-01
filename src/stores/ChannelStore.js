import Dispatcher from "../core/Dispatcher";
import ActionTypes from "../constants/ActionTypes";
import http from '../core/HttpClient';
import _ from "lodash";
import JsonApiStore from "./JsonApiStore";

class ChannelStore extends JsonApiStore {
  constructor() {
    super();

    this.STORE_TYPE = "channels";
  }
}

const channelStore = new ChannelStore();

channelStore.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {

    case ActionTypes.CHANNEL_FIND_ALL:
      http.get('/api/channels').then(result => {
        channelStore.state = result;
        channelStore.emitChange();
      });
      break;

    case ActionTypes.CHANNEL_FIND_RECORD:
      http.get('/api/channels/' + action.id).then(result => {
        channelStore.removeItem(action.id);
        channelStore.addItems(result.data);
        channelStore.emitChange();
      });
      break;

    case ActionTypes.CHANNEL_FIND_RELATED_RECORDS:
      http.get(`/api/shows/${action.id}/${action.relationType}`).then(result => {
        showStore.removeIncludedItem(action.id);
        showStore.addIncludedItems(result.data);
        showStore.emitChange();
      });
    default:
      return;
  }
});

export default channelStore;
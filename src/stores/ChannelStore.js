import EventEmitter from "events";
import Dispatcher from "../core/Dispatcher";
import ActionTypes from "../constants/ActionTypes";
import http from '../core/HttpClient';
import _ from "lodash";

let state = {
  meta: {},
  data: []
};
const CHANGE_EVENT = "CHANGE";

class ChannelStore extends EventEmitter {
  constructor() {
    super();
  }

  findAll() {
    return _.filter(state.data, (item) => {
      return item.type === 'channels';
    });
  }

  findRecord(id) {
    return _.find(state.data, (item) => {
      return item.type === 'channels' && item.id == id;
    });
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

const channelStore = new ChannelStore();

channelStore.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {

    case ActionTypes.CHANNEL_FIND_ALL:
      http.get('/api/channels').then(result => {
        state = result;
        channelStore.emitChange();
      });
      break;

    case ActionTypes.CHANNEL_FIND_RECORD:
      http.get('/api/channels/' + action.id).then(result => {
        removeChannel(action.id);
        addChannels(result.data);
        channelStore.emitChange();
      });
      break;
    default:
      return;
  }
});

function removeChannel(id) {
  state.data = _.reject(state.data, (item) => {
    return item.type == 'channels' && item.id == id;
  });
}

function addChannels(channels) {
  state.data.push(...channels);
}

export default channelStore;
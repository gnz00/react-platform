import Dispatcher from "../core/Dispatcher";
import ActionTypes from "../constants/ActionTypes";
import http from '../core/HttpClient';
import JsonApiStore from "./JsonApiStore";

class VideoStore extends JsonApiStore {
  constructor() {
    super();

    this.STORE_TYPE = "videos";
  }
}

const videoStore = new VideoStore();

videoStore.dispatchToken = Dispatcher.register(action => {
});

export default showStore;
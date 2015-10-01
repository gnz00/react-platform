import EventEmitter from "events";
import Dispatcher from "../core/Dispatcher";
import ActionTypes from "../constants/ActionTypes";
import http from '../core/HttpClient';
import _ from "lodash";

const CHANGE_EVENT = "CHANGE";

/**
 * Base class for a store using the JSON API: http://jsonapi.org
 */
class JsonApiStore extends EventEmitter {

  stores = [];

  constructor() {
    super();
  }

  // Return all records in the store that match the store type
  findAll(type) {
    this.initializeStoreType(type);
    return _.filter(this.stores[type].state.data, (item) => {
      return item.type === type;
    });
  }

  // Find a single record that matches the id provided
  findRecord(id, type) {
    this.initializeStoreType(type);
    return _.find(this.stores[type].state.data, (item) => {
      return item.type === type && item.id == id;
    });
  }

  // Find records of the store that contain a relation to the supplied relation type and ID
  // IE. If this is the videos store, and relationType is show: find all videos that have a relationship link to the show id provided
  findRelatedRecords(returnType, relationType, relationId) {
    this.initializeStoreType(returnType);
    return _.filter(this.stores[returnType].state.data, (item) => {
      var relationships = item.relationships[relationType];
      if (relationships && relationships.data) {
        var relatedIds = _.pluck(item.relationships[relationType].data, "id");
        return item.type === returnType && _.contains(relatedIds, relationId);
      }
    });
  }

  emitChange(type = "") {
    this.emit(CHANGE_EVENT + type);
  }

  addChangeListener(callback, type = "") {
    this.on(CHANGE_EVENT + type, callback);
  }

  removeChangeListener(callback, type = "") {
    this.removeListener(CHANGE_EVENT + type, callback);
  }

  removeItem(id, type) {
    this.stores[type].state.data = _.reject(this.stores[type].state.data, (item) => {
      return item.type === type && item.id === id;
    });
  }

  addItems(items, type) {
    this.stores[type].state.data.push(...items);
  }

  initializeStoreType(type) {
    if (typeof this.stores[type] === "undefined") {
      this.stores[type] = {
        state: {
          meta: {},
          data: []
        }
      }
    }
  }
}

let store = new JsonApiStore;

store.dispatchToken = Dispatcher.register(action => {

  switch (action.type) {
    /**
     * Find all records of a type
     */
    case ActionTypes.FIND_ALL_RECORDS:
      store.initializeStoreType(action.storeType);
      http.get(`/api/${action.storeType}`).then(result => {
        store.stores[action.storeType].state = result;
        store.emitChange(action.storeType);
      });
      break;

    case ActionTypes.FIND_RECORD:
      store.initializeStoreType(action.storeType);
      http.get(`/api/${action.storeType}/${action.id}`).then(result => {
        store.removeItem(action.id, action.storeType);
        store.addItems(result.data, action.storeType);
        store.emitChange(action.storeType);
      });
      break;

    // This one populates stores[returnType] with records that have relation to relationType[relationId]
    // Ex: I want to populate videos from show id=1.. findRelatedRecords('videos', 'shows', 1); /shows/1/videos
    // returnType = videos, relationType = shows, relationId = 1
    case ActionTypes.FIND_RELATED_RECORDS:
      let returnType = action.returnType;
      let relationId = action.relationId;
      let relationType = action.relationType;

      store.initializeStoreType(returnType);
      http.get(`/api/${relationType}/${relationId}/${returnType}`).then(result => {
        _.each(result.data, (item) => {
          store.removeItem(item.id, item.type);
          store.addItems([item], item.type);
        });
        store.emitChange(returnType);
      });
      break;
    default:
      return;
  }
});

export default store;
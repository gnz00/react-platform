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

  state = {
    meta: {},
    data: []
  };

  STORE_TYPE = null;

  constructor() {
    super();
  }

  // Return all records in the store that match the store type
  findAll() {
    return _.filter(this.state.data, (item) => {
      return item.type === this.STORE_TYPE;
    });
  }

  // Find a single record that matches the id provided
  findRecord(id) {
    return _.find(this.state.data, (item) => {
      return item.type === this.STORE_TYPE && item.id == id;
    });
  }

  // Find records of the store that contain a relation to the supplied relation type and ID
  findRelatedRecordsById(id, relationType) {
    return _.filter(this.state.data, (item) => {
      var relationships = item.relationships[relationType];
      if (relationships && relationships.data) {
        var relatedIds = _.pluck(item.relationships[relationType].data, "id");
        return item.type === this.STORE_TYPE && _.contains(relatedIds, id);
      }
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

  removeItem(id) {
    this.state.data = _.reject(this.state.data, (item) => {
      return item.type === this.STORE_TYPE && item.id === id;
    });
  }

  addItems(items) {
    this.state.data.push(...items);
  }
}

export default JsonApiStore;
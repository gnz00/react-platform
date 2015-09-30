import stubs from './stub_data';
import _ from 'lodash';

export function getAll(resource) {
  return stubs[resource];
}

export function getOne(resource, id) {
  return  {
    meta: {},
    data: _.filter(stubs[resource].data, function(item) {
      return item.id === id;
    })
  };
}

export function getRelationship(resource, id, type) {
  let resourceObject = _.filter(stubs[resource].data, function(item) {
    return item.id === id;
  });

  return {
    meta: {},
    data: _.map(resourceObject, function(item) {
      return item.relationships[type];
    })
  };
}

export function getAllRelationship(resource, id, type) {
  let resourceObject, relationshipData;
  resourceObject = _.filter(stubs[resource].data, function(item) {
    return item.id === id;
  })[0];

  // List of ids
  relationshipData = _.map(resourceObject.relationships[type].data, function(item) {
    return item.id;
  });

  return {
    meta: {},
    data: _.filter(stubs[type].data, function(item) {
      return _.contains(relationshipData, item.id);
    })
  };
}

export default { getAll, getOne, getRelationship, getAllRelationship };

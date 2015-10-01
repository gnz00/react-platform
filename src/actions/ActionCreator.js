import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

class ActionCreator {

  /** Updates the Show store with all the channels */
  static findAll(storeType) {
    Dispatcher.dispatch({
      type: ActionTypes.FIND_ALL_RECORDS,
      storeType: storeType
    });
  }

  static findRecord(id, storeType) {
    Dispatcher.dispatch({
      type: ActionTypes.FIND_RECORD,
      id: id,
      storeType: storeType
    });
  }

  static findRelatedRecords(returnType, relationType, relationId) {
    Dispatcher.dispatch({
      type: ActionTypes.FIND_RELATED_RECORDS,
      returnType: returnType,
      relationId: relationId,
      relationType: relationType
    });
  }
}

export default ActionCreator;

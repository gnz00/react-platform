import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

class ChannelDataActionCreator {

  /** Updates the Channel store with all the channels */
  static findAll() {
    Dispatcher.dispatch({
      type: ActionTypes.CHANNEL_FIND_ALL,
    });
  }

  static findRecord(id) {
    Dispatcher.dispatch({
      type: ActionTypes.CHANNEL_FIND_RECORD,
      id: id,
    });
  }

  static findShowRecordsByChannelId(id) {
    Dispatcher.dispatch({
      type: ActionTypes.CHANNEL_FIND_SHOW_RECORDS,
      id: id,
    });
  }
}

export default ChannelDataActionCreator;

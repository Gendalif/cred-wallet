import { AppState, AppStateStatus } from 'react-native';
import { eventChannel } from 'redux-saga';
import { take, call, cancelled } from 'redux-saga/effects';
import { StaticNavigator } from '../../services/navigator';

function createAppStateChannel() {
  return eventChannel((emit: (nextState: AppStateStatus) => void) => {
    AppState.addEventListener('change', emit);
    return () => {
      AppState.removeEventListener('change', emit);
    };
  });
}

export function* appStateListenerSaga(): Generator<any, any, any> {
  const appStateChannel = yield call(createAppStateChannel);
  try {
    while (true) {
      const nextAppState: AppStateStatus = yield take(appStateChannel);
      if (nextAppState === 'active') {
        yield call(StaticNavigator.navigateTo, 'Pin');
      }
    }
  } finally {
    if (yield cancelled()) {
      appStateChannel.close();
    }
  }
}

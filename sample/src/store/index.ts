import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import { VuexSagaPlugin } from 'vuex-saga-ts';

import { IRootState } from './types';

import { application } from './application';

import rootSaga from './sagas';

Vue.use(Vuex);

const store:Store<IRootState> = new Vuex.Store({
  state:{
    version: '1.0.0',
  },
  plugins:[
    VuexSagaPlugin(rootSaga )
  ],
  modules:{
    application
  }
});

export default store;

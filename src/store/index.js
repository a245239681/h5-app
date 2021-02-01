import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    action: 0,
    obj: {},
    addr: {},
  },
  mutations: {
    edit(state, type) {
      state.action = type
    },
    onStr(state, item) {
      state.obj = item
    },
    onAddr(state, item) {
      state.addr = item
    },
  },
  actions: {},
  modules: {},
})

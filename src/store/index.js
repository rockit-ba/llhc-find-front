import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isChangeComment: '',  //是否发表了评论
    addOrRemove: '',
    id: ''
  },
  getters: {
    
  },
  mutations: {
    addComment(state,id){
      state.id = id
      state.addOrRemove = 'add'
      state.isChangeComment = new Date();
    },
    removeComment(state,id){
      state.id = id
      state.addOrRemove = 'remove'
      state.isChangeComment = new Date();
    }
  },
  actions: {
  },
  modules: {
  }
})

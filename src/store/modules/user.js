const state = {
  userEmail: ""
};

const getters = {
  userEmail: state => {
    return state.userEmail;
  }
};

const mutations = {
  SET_USER_EMAIL: (state, payload) => {
    state.userEmail = payload;
  }
};

const actions = {
  setUserEmail: ({ commit }, payload) => {
    commit("SET_USER_EMAIL", payload);
  },
  setUserEmailToStorage: ({ commit }, payload) => {
    localStorage.setItem("email", JSON.stringify(payload));
    commit("SET_USER_EMAIL", payload);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

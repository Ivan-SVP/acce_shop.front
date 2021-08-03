import mainApi from '@/api/main_server/endpoints/root'

const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    refresh: localStorage.getItem('refresh') || '',
};

const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    REFRESH: state => state.refresh,
};

const mutations = {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(token, refresh) {
        state.status = 'success';
        state.token = token;
        if (refresh)
            state.refresh = refresh
    },
    auth_error(state) {
        state.status = 'error'
    },
    logout(state) {
        state.status = '';
        state.token = '';
        state.refresh = '';
    },
};

const actions = {
    login({commit}, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request');
            mainApi.createJWT(user)
                .then(resp => {
                    const token = resp.data.access;
                    const refresh = resp.data.refresh;
                    localStorage.setItem('token', token);
                    localStorage.setItem('refresh', refresh);
                    commit('auth_success', token, refresh);
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error');
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh');
                    reject(err)
                })

        })
    },
    refreshJWT({commit}) {
        return new Promise((resolve, reject) => {
            commit('auth_request');
            mainApi.refreshJWT()
                .then(resp => {
                    const token = resp.data.access;
                    localStorage.setItem('token', token);
                    commit('auth_success', token);
                    resolve(token)
                })
                .catch(err => {
                    commit('auth_error');
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh');
                    reject(err)
                })

        })
    },
    logout({commit}){
        return new Promise((resolve) => {
            commit('logout');
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            resolve()
        })
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
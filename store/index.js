import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import {createStore} from 'vuex'
import request from '@/utils/request'
Vue.use(Vuex)

const getDefaultState = () => {
    return {
        userInfo: {},
        token: getToken()
    }
}

const state = getDefaultState()

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_USERINFO: (state, userInfo) => {
		state.userInfo = userInfo
		storage.set(constant.userInfo, userInfo)
	},
	RESET_STATE: (state) => {
		state = getDefaultState()
	}
}

const actions = {
	Login({ commit, dispatch }, info) {
		console.log('store info username&password', info)
		return new Promise((resolve, reject) => {
			login(info).then(res => {
				console.log('store login token', res.data)
				const {
					data: token,
					httpCode,
				} = res
				if (httpCode === 200) {
					setToken(token)
					commit('SET_TOKEN', token)
					resolve()
				} else if (httpCode === 500) {
					reject('账号或密码错误')
				}
			}).catch(error => {
				reject(error)
			})
		})
	},

	GetInfo({ commit, state }) {
		return new Promise((resolve, reject) => {
			getInfo(state.token).then(res => {
				console.log('store user', res)
				const { data: userInfo, httpCode } = res
				if (httpCode === 200) {
					commit('SET_USERINFO', userInfo)
					resolve(userInfo)
				} else {
					reject('用户信息获取失败，请重新登录')
				}
			}).catch(error => {
				reject(error)
			})
		})
	},
	
	resetToken({ commit }) {
		return new Promise(resolve => {
			removeToken()
			commit('RESET_STATE')
		})
	}
}

const getters = {
  token: state => state.token,
	userInfo: state => state.userInfo
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
})

export default store

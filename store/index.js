import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)


const store = new Vuex.Store({
	plugins: [
		createPersistedState({
			key: 'app_config_data',  // 状态保存到本地的 key   
			paths: ['userInfo'],  // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c  
			storage: {
				getItem: key => uni.getStorageSync(key),
				setItem: (key, value) => uni.setStorageSync(key, value),
				removeItem: key => uni.removeStorageSync(key)
			}
		})
	],
	state: {
		userInfo:"",
		branchCode:"",
		menuName:"",
		menuCode:"",
		mealCategory:"",
		historyCategory:''
	},
	getters:{
		getUserInfo(state){
			return state.userInfo
		},
		getBranchCode(state){
			return state.branchCode
		},
		getMenuName(state){
			return state.menuName
		},
		getMenuCode(state){
			return state.menuCode
		},
		getMealCategory(state){
			return state.mealCategory
		},
		getHistoryCategory(state){
			return state.historyCategory
		}
	},
	mutations: {
		setUserInfo(state,data){
			state.userInfo = data;
		},
		setBranchCode(state,data){
			state.branchCode = data;
		},
		setMenuName(state,data){
			state.menuName = data;
		},
		setMenuCode(state,data){
			state.menuCode = data;
		},
		setMealCategory(state, data) {
			state.mealCategory = data;
		},
		setHistoryCategory(state,data){
			state.historyCategory = data;
		}
	},
	actions: {
	}
})

export default store

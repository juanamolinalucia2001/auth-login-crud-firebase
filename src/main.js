import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import {auth} from './firebase'

auth.onAuthStateChanged(user=>{
  if(user){
    console.log(user)
    const detectoUsuario= {
      email:user.email,
      uid:user.uid
    }
    store.dispatch('detectarUsuario', detectoUsuario)
  }else{
    console.log(user)
    store.dispatch('detectarUsuario', user)
  }
  
})

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

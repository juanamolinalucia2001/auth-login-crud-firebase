import Vue from 'vue'
import Vuex from 'vuex'
import {db, auth} from '../firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario:null,
    error:null,
    tareas:[],
    tarea:{nombre:'', id:''},
    carga:false,
    texto:''
  },
  getters: {
    existeUsuario(state){
      if(state.usuario === null){
        return false
      }else{
        return true
      }
    },
    arrayFiltrado(state){
      let arregloFiltrado = []
      for(let tarea of state.tareas){
        let nombre = tarea.nombre.toLowerCase();
        if(nombre.indexOf(state.texto) >= 0){
          arregloFiltrado.push(tarea)
        }
      }
      return arregloFiltrado;
    }
  },
  // modifican el estado de tareas, pasandole las tareas que obtuve de la dbb
  mutations: {
    setTareas(state, payload){
      state.tareas = payload
    },
    setTarea(state, payload){
      state.tarea= payload
    },
    setEliminarTarea(state, payload){
      state.tareas = state.tareas.filter(item => item.id !== payload)
    },
    setUsuario(state, payload){
      state.usuario=payload
    },
    setError(state, payload){
      state.error=payload
    },
    cargaFirebase(state, payload){
      state.carga = payload
    }
  },
  //consulta a las bdds
  actions: {

    buscador({commit, state}, payload){
      console.log(payload)
      state.texto = payload.toLowerCase()
    },
    // traigo todas las tareas de mi bdd y la guardo en la const tareas
    getTareas({commit ,state}){

      commit('cargaFirebase', true);

      const tareas = []
      db.collection(state.usuario.email).get()
      .then(res => {
        res.forEach(doc =>{
          console.log(doc.id)
          console.log(doc.data())
          let tarea = doc.data()
          tarea.id = doc.id
          tareas.push(tarea)
        })
        setTimeout(()=>{
          commit('cargaFirebase', false);
        }, 5000)
        
      })
      //cambio el valor de el estado tareas con la mutacion setTareas y le paso las 
        // tareas que traje de la consulta a la bdd
        commit('setTareas', tareas)
    },
    getTarea({commit, state}, idTarea){
      db.collection(state.usuario.email).doc(idTarea).get()
      .then(doc =>{
        let tarea = doc.data()
        tarea.id = doc.id
        commit('setTarea', tarea)
      })
    },

    editarTarea({commit, state}, tarea){
      db.collection(state.usuario.email).doc(tarea.id).update({
        nombre: tarea.nombre
      })
      .then(()=>{
        console.log('tarea editada')
        router.push('/')
      })
    },

    agregarTarea({commit, state}, nombreTarea){

      commit('cargaFirebase', true);
      db.collection(state.usuario.email).add({
        nombre:nombreTarea
      })
      .then(doc =>{
        //console.log(doc.id)
        router.push('/')
        commit('cargaFirebase', false);
      })
    },
    eliminarTarea({commit,state}, idTarea){
      db.collection(state.usuario.email).doc(idTarea).delete()
      .then(()=>{
        console.log('tarea eliminada')
        //dispatch('getTareas')
        commit('setEliminarTarea', idTarea)
      })

    },
    crearUsuario({commit}, usuario){
      auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then(res =>{
        //una vez que se creo el user lo guardo en el state
        const usuarioCreado = {
          email:res.user.email,
          uid:res.user.uid
        }
        
        db.collection(res.user.email).add({
          nombre:'tarea de prueba'
        }).then(doc =>{
          commit('setUsuario', usuarioCreado)
          router.push('/')
        }).catch(error => console.log(error))

       
      })
      
      .catch(error => {
        console.log(error)
        commit('setError', error)
      })
    },
    ingresoUsuario({commit}, usuario){
        auth.signInWithEmailAndPassword(usuario.email, usuario.password)
        .then(res =>{
          const usuarioLogueado = {
            email:res.user.email,
            uid:res.user.uid
          }
          console.log(res)
          commit('setUsuario', usuarioLogueado)
          router.push('/')
        })
        .catch(error =>{
          console.log(error)
          commit('setError', error)
        })
    },
    cerrarSesion({commit}){
      auth.signOut()
      .then(()=>{
        router.push('/acceso')
      })
    },
    detectarUsuario({commit}, usuario){
        commit('setUsuario', usuario)
    }
  },

  modules: {
  }
})

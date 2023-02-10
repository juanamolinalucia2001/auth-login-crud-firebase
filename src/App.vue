<template>
  <div  class="container mt-5">
    <div >
      <router-link to="/" v-if="existeUsuario" class="mr-2 btn btn-dark ">Inicio</router-link>
      <router-link to="/registro" v-if="!existeUsuario" class="mr-2 btn btn-dark" >Registro</router-link>
      <router-link to="/acceso" v-if="!existeUsuario" class="mr-2 btn btn-dark" >Acceso</router-link>
      <button @click="cerrarSesion" v-if="existeUsuario" class="mr-2 btn btn-dark" >Cerrar Sesion</button>
    </div>
    <router-view/>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  data(){
    return{

    }
  },
  methods:{
    ...mapActions(['cerrarSesion'])
  },
  computed:{
    ...mapGetters(['existeUsuario'])
  }
}
</script>

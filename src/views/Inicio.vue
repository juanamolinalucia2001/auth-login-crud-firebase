<template>
    <div>
       <h1 class="mt-3 mb-3">Lista Tareas</h1> 
       <p>{{usuario.email}}</p>
        <router-link to="/agregar">
            <button class="btn btn-success btn-block">Agregar</button>
        </router-link>

        <form @submit.prevent="buscador(texto)">
            <input type="text" placeholder="Buscar...." v-model="texto"
            class="form-control"  v-on:keyup="buscador(texto)">
        </form>

        <div v-if="carga" class="text-center mt-5">
            <h3>Cargando contenido....</h3> 
            <pulse-loader :loading="loading" ></pulse-loader>
        </div>

        

        <ul class="list-group mt-5" v-if="!carga">
            <li  class="list-group-item"
             v-for="item of arrayFiltrado" :key="item.id">
                    {{item.nombre}}

                <div class="float-right">

                     <router-link :to="{ name: 'Editar', params: {id: item.id} }" class="btn btn-warning btn-sm mr-2">
                          Editar
                   </router-link>
                   <button class="btn btn-danger btn-sm float-right" @click="eliminarTarea(item.id)" >Eliminar</button>

                </div>
                  
                  
            </li>
        </ul>
    </div>
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import {mapActions, mapState, mapGetters} from 'vuex'

export default {
    name:'Inicio',
    data(){
        return{
            texto:""
        }
    },
    created(){
        this.getTareas()
    },
    methods:{
        ...mapActions(['getTareas', 'eliminarTarea','buscador'])
    },
    computed:{
        ...mapState(['tareas','usuario', 'carga']),
        ...mapGetters(['arrayFiltrado'])
    },
    components:{
        PulseLoader
    }
}
</script>
<style scoped>

</style>
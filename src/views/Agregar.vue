<template>
    <div>
        <h1>Agregar Tarea</h1>
        <form @submit.prevent="agregarTarea($v.nombre.$model)" class="form-inline">
            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">Nombre</div>
                </div>
                <input type="text" v-model="$v.nombre.$model" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary mb-2"
            :disabled="$v.nombre.$invalid || carga">
                Agregar
            </button>
        </form>
        <p class="text-danger d-block" v-if="!$v.nombre.required">Campo requerido</p>
        <p class="text-danger d-block" v-if="!$v.nombre.minLength">Minimo 5</p>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import { required, minLength} from "vuelidate/lib/validators"
export default {
    name:'Agregar',
    data(){
        return{
            nombre:'',
        }
    },
    methods:{
        ...mapActions(['agregarTarea'])
    },
    validations:{
        nombre:{required, minLength:minLength(5)}
    },
    computed:{
        ...mapState(['carga'])
    }
}
</script>
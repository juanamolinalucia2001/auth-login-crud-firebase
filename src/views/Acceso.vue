<template>
    <div>
        <h1>Acceso de Usuarios</h1>

        <form @submit.prevent="ingresoUsuario({email: $v.email.$model , password: $v.pass.$model})">

            <input type="email" placeholder="Ingrese email" v-model="$v.email.$model"
             class="form-control mb-2">

             <small class="text-danger d-block" v-if="!$v.email.required">Campo Requerido</small>

            <input type="password" placeholder="Ingrese contraseña" v-model="$v.pass.$model"
             class="form-control mb-2">
              <small class="text-danger d-block" v-if="!$v.pass.required">Campo Requerido</small>
               <small class="text-danger d-block" v-if="!$v.pass.minLength">Minimo de 6 caracteres</small>

            <button type="submit"
            class="btn btn-primary" :disabled="$v.$invalid">
            Ingresar</button>
            <p>{{error}}</p>
            
        </form>
    </div>
</template>
<script>


import {mapActions, mapState} from 'vuex'
import {required, minLength, email} from 'vuelidate/lib/validators'
export default {
    name:'Acceso',
    data(){
        return{
            email:'',
            pass:''
        }
    },
    methods:{
        ...mapActions(['ingresoUsuario'])
    },
    computed:{
        ...mapState(['error'])
    },
    validations:{
        email:{required, email},
        pass:{required, minLength:minLength(6)}
    }
}
</script>
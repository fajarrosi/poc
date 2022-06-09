<template>
    <div class="col-8">
        <div class="title">Login</div>
        <div class="subtitle text-grey">Silahkan login untuk kembali menggunakan layanan</div>
        <q-form
        @submit.prevent.stop="onSave" ref="form"
            class="q-gutter-sm q-mt-lg "
        >
            <div class="row justify-center">
                <div class="col-12">
                    <label for="username" class="font-normal">Username</label>
                    <q-input v-model="dataForm.username" dense outlined id="username" class="q-mb-md" 
                    hide-bottom-space
                    placeholder="Username"
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || 'Username is required']"
                    />
                </div>
                <div class="col-12">
                    <label for="password" class="font-normal">Password</label>
                    <q-input v-model="dataForm.password" dense outlined id="password" class="q-mb-md" 
                    hide-bottom-space
                    placeholder="Password"
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || 'Password is required']"
                    :type="visibility ? 'password' : 'text'"
                    >
                        <template v-slot:append>
                        <q-icon
                            :name="visibility ? 'visibility' : 'visibility_off'"
                            @click="visibility = !visibility"
                            class="cursor-pointer"
                        />
                        </template>
                    </q-input>
                </div>
                <q-btn label="Login" no-caps type="submit" color="primary" unelevated class="col-12" />
            </div>
            <div class="row items-center justify-center  q-mb-lg">
                <span>Do you want register? </span>
                <q-btn color="primary" label="Register Now" no-caps flat @click="$router.push('/register')" />
            </div>
        </q-form>
    </div>
</template>

<script>
export default {
    name:'LoginPage'
}
</script>

<script setup>
import { ref } from 'vue'
import { useDialog } from 'src/composable/useDialog'
import {  useRouter } from 'vue-router'
import { api } from 'boot/axios'

const { showLoading,hideLoading,showDialog } = useDialog()
const router = useRouter()

const dataForm = ref({
    username:'',
    password:'',
})

const visibility = ref(true)
const form = ref('')

// function to proccess login user
function onSave() {
    form.value.validate()
    .then(valid=>{
        if(valid){ //if data form valid
            showLoading()
            api.post('login',dataForm.value)
            .then(()=>{
                hideLoading()
                router.push({name :'dashboard' })
            })
            .catch(()=>{
                hideLoading()
                setTimeout(() => {
                    showDialog('Failed','you have fail login')
                }, 800);
            })
        }
    })
}
</script>

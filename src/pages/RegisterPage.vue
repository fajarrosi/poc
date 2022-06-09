<template>
    <div class="col-8">
        <div class="title">Register</div>
        <div class="subtitle text-grey">Bergabung untuk terhubung dengan layanan kami</div>
        <q-form
        @submit.prevent.stop="onSave" ref="form"
            class="q-gutter-sm q-mt-lg "
        >
            <div class="row justify-center">
                <div class="col-12">
                    <label for="firstname" class="font-normal">First Name</label>
                    <q-input v-model="dataForm.firstname" dense outlined id="firstname" class="q-mb-md" 
                    hide-bottom-space
                    placeholder="First Name"
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || 'First Name is required']"
                    />
                </div>
                <div class="col-12">
                    <label for="lastname" class="font-normal">Last Name</label>
                    <q-input v-model="dataForm.lastname" dense outlined id="lastname" class="q-mb-md" 
                    hide-bottom-space
                    placeholder="Last Name"
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || 'Last Name is required']"
                    />
                </div>
                <div class="col-12">
                    <label for="dateofbirth" class="font-normal">Date of birth</label>
                    <q-input v-model="dataForm.dob" dense outlined id="dateofbirth" class="q-mb-md" 
                    hide-bottom-space
                    placeholder="Date of birth"
                    lazy-rules
                    type="date"
                    :rules="[(val) => (val && val.length > 0) || 'Date of birth is required']"
                    />
                </div>
                <div class="col-12">
                    <label for="address" class="font-normal">Address</label>
                    <q-input v-model="dataForm.address" dense outlined id="address" class="q-mb-md" 
                    hide-bottom-space
                    placeholder="Address"
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || 'Address is required']"
                    />
                </div>
                <div class="col-12 font-normal q-mb-md">Upload Photo</div>
                <div class="col-12 q-mb-md">
                    <input type="file" @change="onFileSelected" style="display:none;" ref="imageUpload"/>
                    <q-btn round flat @click="$refs.imageUpload.click()" v-if="!previewImg">
                        <q-avatar color="grey" text-color="white" icon="person" size="100px"/>
                    </q-btn>
                    <q-btn round flat @click="$refs.imageUpload.click()" v-else>
                        <q-avatar size="100px">
                            <img :src="previewImg" alt="">
                        </q-avatar>
                    </q-btn>
                </div>
                <q-btn label="Create Account" no-caps type="submit" color="primary" unelevated class="col-12" />
            </div>
            <div class="row items-center justify-center  q-mb-lg">
                <span>Are you Admin? </span>
                <q-btn color="primary" label="Login Now" no-caps flat @click="$router.push('/')" />
            </div>
        </q-form>
    </div>
</template>

<script>
export default {
    name:'RegisterPage'
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
    firstname:'',
    lastname:'',
    dob:'',
    address:'',
    photo:'',
})
const form = ref('')
const previewImg = ref('') //utk preview image yang telah dipilih user

//function triggers when user has selected photo
function onFileSelected(event) {
    dataForm.value.photo = event.target.files[0]
    previewImg.value = URL.createObjectURL(event.target.files[0])
}

// function to save register user
function onSave() {
    form.value.validate()
    .then(valid=>{
        if(valid){ //if data form valid
            showLoading()
            let form = new FormData()
            form.append('firstname',dataForm.value.firstname)
            form.append('lastname',dataForm.value.lastname)
            form.append('dob',dataForm.value.dob)
            form.append('address',dataForm.value.address)
            form.append('photo',dataForm.value.photo)
            api.post('register',form)
            .then(()=>{
                hideLoading()
                setTimeout(() => {
                    showDialog('Success','you have successfully registered')
                    dataForm.value = {
                        firstname:'',
                        lastname:'',
                        dob:'',
                        address:'',
                        photo:'',
                    }
                    previewImg.value = ''
                }, 500);
            })
            .catch(error=>{
                hideLoading()
                setTimeout(() => {
                    showDialog('Failed',`you have fail registered with message : ${JSON.stringify(error.response.data.data)}`)
                }, 500);
            })
        }
    })
}
</script>

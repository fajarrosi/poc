<template>
    <q-page>
        <!-- Detail Page  -->
        <div class="row justify-center q-mt-lg">
            <q-card class="own-card col-10" flat>
                <q-card-section>
                    <q-btn color="primary" icon="navigate_before" label="Kembali" @click="$router.back()" flat dense />
                    <div class="text-h6">Detail User</div>
                    <q-avatar size="100px" class="q-mb-lg">
                        <img :src="previewImg ? previewImg : 'https://cdn.quasar.dev/img/boy-avatar.png'">
                    </q-avatar>
                    <div v-for="(user, index) in userDetails" :key="index" class="q-mt-sm">
                        <div class="row justify-between">
                            <div class="text-h6">{{user.label}}</div>
                            <div class="text-subtitle1">{{user.value}}</div>
                        </div>
                        <q-separator v-if="index !== userDetails.length - 1"/>
                    </div>
                </q-card-section>
            </q-card>
        </div>
        <!-- Detail Page  -->
    </q-page>
</template>

<script>
export default {
    name:'DetailPage'
}
</script>

<script setup>
import { ref,onMounted } from 'vue'
import { api } from 'boot/axios'
import { useDialog } from 'src/composable/useDialog'
import {  useRoute } from 'vue-router'

const route = useRoute()
const { showLoading,hideLoading,formatDate } = useDialog()

const userDetails = ref([
    { label: 'First Name', value: '' },
    { label: 'Last Name', value: '' },
    { label: 'Date of Birth', value: '' },
    { label: 'Address', value: '' },
])
const previewImg = ref('')
onMounted(()=>{
    showLoading()
    api.get(`users/${route.params.id}`)
    .then(response=>{
        let result = response.data.data
        userDetails.value[0].value = result.firstname
        userDetails.value[1].value = result.lastname
        userDetails.value[2].value = formatDate(result.dob,'D MMM YYYY') 
        userDetails.value[3].value = result.address
        previewImg.value = result.photo_url
        hideLoading()
    })
})
</script>

<style>

</style>
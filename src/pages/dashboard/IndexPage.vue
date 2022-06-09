<template>
    <q-page>
        <!-- Section Card  -->
        <div class="row q-col-gutter-lg q-px-md q-pt-lg section-card q-pb-xl justify-center">
            <div class="col-10 col-sm-8 col-md-3">
                <div class="card-content">
                <div class="row">
                    <div style="width:36px;height:36px;margin-right:10px; border-radius: 10px;" class="bg-white row justify-center items-center">
                        <q-icon name="person"  size="36px" color="primary"/>
                    </div>
                    <div class="fs-20">User</div>
                </div>
                <div class="row q-mt-sm items-center" >
                    <div class="text-primary q-mr-md">Total</div>
                    <div class="fs-24 text-primary">{{totalUser}}</div>
                </div>
                </div>
            </div>
        </div>
        <div class="row justify-center q-mt-lg">
            <q-card class="own-card col-10" flat>
                <q-card-section>
                    <div class="text-h6 q-mb-sm">Data Users</div>
                    <q-table
                    :rows="rows"
                    :columns="columns"
                    row-key="firstname"
                    separator="vertical"
                    flat
                    bordered
                    v-model:pagination="pagination"
                    :loading="loading"
                    @row-click="openDetail"
                    :grid="$q.screen.xs"
                    @request="onRequest"
                    />
                </q-card-section>
            </q-card>
        </div>
        <!-- Section Card  -->
    </q-page>
</template>

<script>
export default {
    name:'DashboardPage'
}
</script>
<style lang="scss">
.section-card{
    background-image: url("../../assets/gradientpolos.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .card-content{
        background: rgba(255, 255, 255, 0.88);
        border: 1px solid #FFFFFF;
        box-shadow: 0px 8px 14px rgba(57, 69, 99, 0.08);
        backdrop-filter: blur(4px);
        border-radius: 20px;
        padding-top:14px;
        padding-left:20px;
        padding-right:20px;
        padding-bottom:22px;
    }
}
</style>

<script setup>
import {  useRouter } from 'vue-router'
import { api } from 'boot/axios'
import { ref,onMounted } from 'vue'
import { useDialog } from 'src/composable/useDialog'

const { formatDate } = useDialog()
const columns = [
    { name: 'firstname', align: 'left', label: 'First Name', field: 'firstname', sortable: false },
    { name: 'lastname', align: 'left', label: 'Last Name', field: 'lastname', sortable: false },
    { name: 'address', align: 'left', label: 'Address', field: 'address', sortable: false },
    { name: 'registrationdate', align: 'left', label: 'Registration Date', field: row => formatDate(row.created_at,'D MMM YYYY'), sortable: false },
]

const totalUser = ref('')
const rows = ref([])
const loading = ref(false)
const pagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 10
})

onMounted(()=>{
    getData('users')
})

function onRequest(request) {
    getData(`users?page=${request.pagination.page}`)
}

function getData(url) {
    loading.value = true
    api.get(url)
    .then((response)=> {
        let result = response.data.data
        totalUser.value = result.total
        rows.value = result.data
        loading.value = false
        pagination.value.page = result.data ? result.current_page : 1
        pagination.value.rowsPerPage = result.data ? result.per_page : 99
        pagination.value.rowsNumber =  result.data ? result.total : 0
    })
    .catch((error)=> console.log('afsdf',error))
}

const router = useRouter()

function openDetail(evt,row) {
    router.push({name : 'detail', params:{id: row.id}})
}

</script>
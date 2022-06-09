<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-primary font-normal">
            Farmer App
          </div>
        </q-toolbar-title>
        <div class="row items-center cursor-pointer" @click="showMenu != showMenu">
          <div class="font-normal q-mr-sm">Hi, Admin</div>
          <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          <q-menu style="width:150px;" v-model="showMenu">
            <q-list >
              <q-item>
                <q-item-section class="text-bold">Admin</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push('/')">
                <q-item-section class="text-warning">Logout</q-item-section>
                <q-item-section side center>
                  <q-icon name="logout" color="warning" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-accent">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
    name:'DashboardLayout'
}
</script>
<script setup>
import { ref } from 'vue'
const showMenu = ref(false)

</script>

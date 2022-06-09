<template>
    <div class="row bg-secondary" style="min-height:100vh;">
        <div class="col-md-6 self-center gt-sm">
            <img src="~assets/ilustrasiauth.svg" alt="ilustrasi auth" srcset="~assets/ilustrasiauth.svg" height="300" style="max-width:600px; width:100%;">
        </div>
        <div class="row col-12 col-md-6 justify-center bg-white">
            <router-view class="q-mt-lg q-mb-lg"/>
        </div>
    </div>
    
</template>

<script>
export default {
    name:'AuthLayout'
}
</script>

<style>

</style>
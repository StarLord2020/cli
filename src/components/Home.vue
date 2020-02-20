<template>
    <div id="home">
        <h1>home</h1>
        <button @click="breakUser()">Выйти</button>
    </div>
</template>

<script>
export default {
    name:"Home",
    methods:{
        breakUser(){
            this.$store.dispatch('rememberMe',{login:'',password:'',checked:false});
            this.$router.push('/app');
        }
    }
}
</script>

<style>

</style>
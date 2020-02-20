<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data(){
    return {
      
    users:[],
    count:null,
    l:[]
    }
  },
  created(){

    if(localStorage.login&&localStorage.password){
      this.$store.dispatch('Authorization',{login:localStorage.login,password:localStorage.password,checked:true});
      this.$router.push('/').catch();
    }
    else {
      this.$router.push('/authorization').catch();
    }
  }
}
</script>

<style src="./assets/css/tailwind.css"></style>

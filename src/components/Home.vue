<template>
  <div class="bg-blue-500" id="app">
    <div class="bg-red-500 fixed w-full z-10">
      <div class="container mx-auto">
        <div class="content ">
            <div class="font-sans  antialiased  w-full" >
              <div class="flex ">
                  <div class="block all:hidden">
                      <button @click="toggle" class=" red flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
                          <svg  class="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg> 
                      </button>
                  </div>
                  <div class="flex items-center flex-no-shrink text-white ml-6">
                      <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                      <span class="font-semibold text-xl tracking-tight">Cost Accounting</span>
                  </div>    
                  <nav class=" menu-list flex w-full  bg-teal  bg-red-400 absolute top-20">
                      <div :class="open ? 'block': 'hidden'" class="w-full flex-grow all:flex p-6 all:items-center all:w-auto">
                          <ul class="text-all all:flex-grow">
                            <li class="link">Пункт меню</li>
                            <li class="link">Пункт меню</li>
                            <li class="link">Пункт меню</li>
                            <li class="link">Пункт меню</li>
                            <li class="link">Пункт меню</li>
                            <li class="link">Пункт меню</li>
                            <li class="link">Пункт меню</li>
                            <li class="link" @click="breakUser()">Выйти</li>
                          </ul>             
                      </div>
                      <div>
                          <button @click="toggle" class=" red flex   border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
                              <span class="close-icon fill-current h-5 w-5 font-bold relative" v-if="menu_icon">X</span>
                          </button>
                      </div>
                  </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class=" capital">
         <div class="container-mobile">
            <div class="container mx-auto">
              <capital></capital>
            </div>
          </div>
      </div>
      <div class="">
        <div class="container-mobile">
          <div class="container mx-auto">
            <record><div class="mx-auto block w-10 text-white">Расходы</div></record>
          </div>
        </div>
      </div>
      <div class="">
        <div class="container-mobile">
          <div class="container mx-auto">
            <list></list>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Capital from './Capital'
import Record from './Record'
import List from './List'
    export default {
        
        components: {
          Capital,Record,List
        },
       data() {
        return{
                open: false,
                menu_icon:false
          }
      },
      methods: {
        toggle() {
        this.open = !this.open
        this.menu_icon=!this.menu_icon
        },
          breakUser(){
            this.$store.dispatch('rememberMe',{login:'',password:'',checked:false});
            this.$router.push('/app');
        }
      }
    }
</script>
<style src="../assets/css/tailwind.css">

</style>
<style>
  button {
    border: none
  }
  .menu-list{
      top: 37px;
      max-width: 200px;
  }
  .close-icon{
  top: 0px;
  left: -1px;
  }
  .content{
      padding:0 15px;
      height: 38px;
  }
  .info{
  padding-top: 30px
  }
  .container-mobile {
      padding:0 15px;
  }
  .link:hover {
    color:#fff;
  }
  .link{
    cursor: pointer;
  }
  .capital{
    padding-top: 38px;
  }
</style>

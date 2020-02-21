<template>
    <div>
        <ul>
            <li ref="name_category"  @click="call_formhistory=true;getname(item.name)" class="flex w-3/6 mx-auto mb-8" v-for="item in lists" :key="item.id"><span class="flex"><img class="w-1/12" :src=item.img alt=""><span class="flex items-center">{{item.name}}</span></span><span class="flex items-center">{{item.cost}}$</span></li>
        </ul>
        <div>
            <button @click="call_waste=true">-</button>
        </div>
       <waste v-if="call_waste" @cancel="call_waste=false"></waste>
        <form-history v-if="call_formhistory" :name="name" @cancel="call_formhistory=false"></form-history>
  
    </div> 
</template>

<script>
import FormHistory from './FormHistory'
import Waste from './Waste'
export default {
data(){
    return{
    call_waste:false,
    call_formhistory:false,
    name:""
    }
},
components:{Waste,FormHistory},
methods:{
    getname(name){
       this.name=name;
    }
},
computed :{
    lists(){
        return this.$store.state.list_category;
    }
     , get_date_now(){
      return this.$store.getters.get_date_now;
    },
    get_time_now(){
      return this.$store.getters.get_time_now;
    },
},
created(){
    
}
}
</script>

<style>
li:hover{
    opacity: 0.8;
     border-color: transparent;
    outline: solid 2px #1dde85;
    
}
li{
    cursor: pointer;
}
</style>
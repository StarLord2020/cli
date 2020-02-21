<template>
    <div class="relative w-full">
        <ul>
            <li  @click="call_formhistory=true;getname(item.name)" class="flex w-3/6 mx-auto mb-8" v-for="item in lists" :key="item.id"><span class="flex"><img class="w-1/12" :src=item.img alt=""><span class="flex items-center">{{item.name}}</span></span><span class="flex items-center">{{item.cost}}$</span></li>
        </ul>
        <div class="absolute btn">
            <button v-if='!call_waste' class="bg-red-500 hover:bg-red-700 text-white font-bold rounded-full w-6 h-6 relative" @click="call_waste=true"><span class="btn_span absolute">-</span></button>
            <div class="absolute waste"><waste v-if="call_waste" @cancel="call_waste=false"></waste></div>
        </div>
        <div>
              <div class=" form-history absolute"><form-history v-if="call_formhistory" :name="name" @cancel="call_formhistory=false"></form-history></div>
        </div>
      
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
}
}
</script>

<style scoped>
li:hover{
    opacity: 0.8;
     border-color: transparent;
    outline: solid 2px #1dde85;
    
}
li{
    cursor: pointer;
}
.btn_span{
    top: -3px;
    left: 9px;
}
.btn{
top: 19px;
right: 20px;
}
.waste{
    right: -3px;

}
.form-history{
    top: 6%;
    left: 30%;;
}
</style>
<template>
    <div class="form-value w-full max-w-xs"> 
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10 ">
            <div class="mb-4">
                {{name}}
              <ul>
                 <li class="history" v-for="(item,i) in lists_history[name]" :key="i" >
                    <ul>
                      <li>Дата:{{item.created_at}}</li>
                      <li>Время:{{item.time}}</li>
                      <li>Описание:{{item.description}}</li>
                      <li>Цена:{{item.price}}</li>
                    </ul>
                  </li>
              </ul>
            </div>
            <div class="flex items-center justify-between">
                <button @click="cancel()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Вернуться назад
                </button>
            </div>
        </form>
    </div>  
</template>
<script>
import Check from '../mixins/check'
export default {
  props:['name'],
  data(){
    return{
    }
  },
    mixins: [Check],
    methods:{
          cancel(){
          this.$emit("cancel")
        }
    },
    computed:{
      lists_history(){
      return this.$store.state.history_cost_for_category;
     }  
    },
    created(){
      console.log(this.lists_history)
    }
}
</script>

<style>
.history {
  border: 1px solid black;
}
</style>
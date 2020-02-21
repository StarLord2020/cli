import Vue from 'vue'
import * as VueFire from 'vuefire'
import 'firebase/firestore'
import Vuex from 'vuex';
import {db} from '../main'
import router from '../routes'

Vue.use(Vuex);
Vue.use(VueFire)

export default new Vuex.Store({
  state:{
     registrationError:{login:'',email:''},
     authorizationError:'',
     id_store:{user_id:'',services_id:''} ,
     /////////////////////
     list_category:[{id:0,name:"Продукты",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:1,name:"Кафе",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:2,name:"Одежда",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:3,name:"Коммунальные расходы",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:4,name:"Медицина",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:5,name:"Дом",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:6,name:"Транспорт",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:7,name:"Другое",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0}]
     ,
   budget:0,
   lastTransaction:"0",
   total_cost:0,
   capital:{},
   id_users:"",
   id_colletions:"",
   history_cost_for_category:{},
   obj_data:{},
   price:{},
   date:new Date()
  },
  getters:{
    getRegErr(state){

      return state.registrationError;
    },
    getAuthErr(state){

      return state.authorizationError;
    },
    getUserId(state){

      return state.id_store.user_id;
    },
    getServicesId(state){

      return state.id_store.services_id;
    },
    //////////////////////////////////
    get_cost_element:(state)=>(name)=>{
      return state.list_category.find(cost=>cost.name==name)
    },
    get_array(state){
      return state.history_cost_for_category;
    },
    get_capital(state){
      return state.capital;
    },
    get_lastTransaction(state){
      return state.lastTransaction;
    },
    get_date_now(state){
      return `${(state.date.getDate()<10? '0' : '')+state.date.getDate()}-${(state.date.getMonth()<10? '0' : '')+state.date.getMonth()}-${state.date.getFullYear()}`; 
  },
    get_time_now(state){
      return `${state.date.getHours()}:${state.date.getMinutes()}:${state.date.getSeconds()}`
    }
  },
  mutations:{
    setRegErr(state,errors){
      state.registrationError=errors;
    },
    setAuthErr(state,error){
      state.authorizationError=error;
    },
    setUserId(state,id){
      state.id_store.user_id=id;
    },
    setServicesId(state,id){
      state.id_store.services_id=id;
    },
    ////////////////////////////////
    input_value(state,count){
      state.capital.budget+=count;
      state.capital.last_transaction=count;
      if(count>0) {
        state.capital.last_transaction="+"+count} 
      else if( count<0) {
        state.capital.last_transaction=count;
      }
    },
    settings_(state,obj){
      state.capital=obj;
    },
    description_(state,val){
      state.description=val;
    },
    wasted(state,name,price){
      state.price[name]=price;
    },

  },
  actions:{
    update_(table,col_name,col_value,updated_data){
      db.collection(table).where(col_name, "==", col_value).get().then(res=>{
      db.collection(table).doc(res.docs[0].id).update(updated_data);       
      });    
    },
    insert_user(context,user){
      db.collection('users').add(user);
      context.dispatch('insert_field_services',user);
      router.push('/success').catch();
    },
    contain_(context,user){
      let errObj={login:'',email:''} 
      let bool=true;
      db.collection('users').where('login', "==", user.login).get().then(res=>{
      if(res.size!=0){
        errObj.login="Данный логин уже занят";
        context.commit("setRegErr", errObj);
        bool=false;
      }
      db.collection('users').where('email', "==", user.email).get().then(res=>{
        if(res.size==0){
          if(bool){
          context.dispatch('insert_user',user)
          }   
        }
        else{
          errObj.email="Данный email уже занят";
        }
      });     
    });  
  },
    Authorization(context,user){
      db.collection('users').where('login', "==", user.login).where('password', "==", user.password).get().then(res=>{
       if(res.size==1){ 
            context.dispatch('rememberMe',user);
            context.dispatch('select_collections_id',user)
       }
       else {
        context.commit("setAuthErr","Неверный логин или пароль!")
       }
     });     
   },
   rememberMe(context,user){
      if(user.checked){
        localStorage.login=user.login ;
        localStorage.password=user.password ;
      }
      else{
        localStorage.login="" ;
        localStorage.password="" ;

      }
   }
   ,
    select_collections_id(context,user){
      db.collection('users').where('login', "==", user.login).where('password', "==", user.password).get().then(res=>{
        context.commit('setUserId',res.docs[0].id)
          db.collection('users').doc(context.getters.getUserId).collection('services').get().then(res=>{
            context.commit('setServicesId',res.docs[0].id)
            context.dispatch('select_',context.getters.get_date_now);
            if(router.path!=(router.path+'/')){

              router.push('/').catch();
            }
          });    
        });
      },
      update_waste(context,obj){
        db.collection("users").doc(context.getters.getUserId).collection("services").doc(context.getters.getServicesId).update(obj)    
      },
      insert_data(context,obj){
        db.collection('users').doc(context.getters.getUserId).collection('services').doc(context.getters.getServicesId).collection(obj.name_collection).add({created_at:obj.date,description:obj.description,price:obj.value,time:obj.time})
      },
      insert_field_services(context,user){
        db.collection('users').where('login', "==", user.login).where('password', "==", user.password).get().then(res=>{
              db.collection('users').doc(res.docs[0].id).collection('services').add({budget:0,last_transaction:'',total_cost:0})     
          });
      },
      select_(context,date){
        db.collection('users').doc(context.getters.getUserId).collection('services').get().then(res=>{
          context.commit('settings_',{budget:res.docs[0].data().budget,last_transaction:res.docs[0].data().last_transaction,total_cost:res.docs[0].data().total_cost});
          context.id_colletions=res.docs[0].id;
           for (let variable in context.state.list_category) {
            let category_data=[];
            let summ_cost=0;
            db.collection('users').doc(context.getters.getUserId).collection('services').doc(context.id_colletions).collection(context.state.list_category[variable].name).where('created_at', "==", date).get().then(res=>{
              for (const key in res.docs) {
                category_data.push(res.docs[key].data())
                summ_cost+=res.docs[key].data().price;
              }
              context.state.history_cost_for_category[context.state.list_category[variable].name]=category_data
              context.state.list_category[variable].cost=summ_cost
            }); 
          }
        }); 
         }
    }
})

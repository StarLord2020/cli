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
     id_store:{user_id:'',services_id:''} 
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
    }
  },
  actions:{
    update_(table,col_name,col_value,updated_data){
      db.collection(table).where(col_name, "==", col_value).get().then(res=>{
      db.collection(table).doc(res.docs[0].id).update(updated_data);       
      });    
    },
    insert_user(context,user){
      db.collection('users').add(user)
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
            router.push('/').catch(); 
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
          });    
        });
      }
    }
})

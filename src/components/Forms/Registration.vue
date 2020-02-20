<template>
  <div id="registration">
    <form action="" @submit="submit_" onsubmit="return false" autocomplete="off">
        <div class="container_ mx-auto">
            <div class="fone">
                <div class="responsive mx-auto relative">
                    <span class="title block">Регистрация</span>
                    <div class="flex relative">
                        <label for="login">Введите логин:</label>
                        <input :class="errors.login.style" class="block" type="text" id="login" v-model.trim="userData.login">
                        <span v-if="errors.login.text" class="err absolute">{{errors.login.text}}</span>
                        <span v-if="regErr.login" class="err absolute">{{regErr.login}}</span>
                       
                    </div>
                    <div class="flex relative">
                        <label for="email">Введите email:</label>
                        <input :class="errors.email.style" class="block" type="email" id="email" v-model.trim="userData.email">
                        <span v-if="errors.email.text" class="err absolute">{{errors.email.text}}</span>
                        <span v-if="regErr.email" class="err absolute">{{regErr.email}}</span>
                    </div>
                    <div class="flex relative">
                        <label for="name">Введите имя:</label>
                        <input :class="errors.name.style" class="block" type="text" id="name" v-model.trim="userData.name">
                        <span v-if="errors.name.text" class="err absolute">{{errors.name.text}}</span>
                    </div>
                    <div class="flex relative">
                        <label for="surname">Введите фамилию:</label>
                        <input :class="errors.surname.style" class="block" type="text" id="surname" v-model.trim="userData.surname">
                        <span v-if="errors.surname.text" class="err absolute">{{errors.surname.text}}</span>
                    </div>
                    <div class="flex relative">
                        <label for="password">Введите пароль:</label>
                        <input :class="errors.password.style" type="password" id="password" v-model.trim="userData.password">
                        <span v-if="errors.password.text" class="err absolute">{{errors.password.text}}</span>
                    </div>
                    <div class="flex relative mb-3">
                        <label for="check_password">Подтвердите пароль:</label>
                        <input :class="errors.password_check.style" type="password" id="check_password" v-model.trim="userData.password_check">
                        <span v-if="errors.password_check.text" class="err absolute">{{errors.password_check.text}}</span>
                    </div>
                    <div class="block mx-auto submit">
                        <input type="submit" value="Зарегистрироватся">
                          <router-link class="text-center block" to="/authorization">Уже есть учетная запись?</router-link>
                    </div>
                </div>
            </div>
        </div>
    </form>
  </div>
</template>

<script>
import { db } from '../../main'
export default {
    name:'Registration',
      data() {
        return {
            error_:true,
            userData:{
                login:'',
                email:'',
                name:'',
                surname:'',
                password:'',
                password_check:''
            },
            errors: {
                login:{text:'',style:''},
                email:{text:'',style:''},
                name:{text:'',style:''},
                surname:{text:'',style:''},
                password:{text:'',style:''},
                password_check:{text:'',style:''}
            }     
        }
    },
    computed:{
       regErr(){

           return this.$store.getters.getRegErr;
       } 
    },
    methods: {

          delete(table,col_name,col_value){
      db.collection(table).where(col_name, "==", col_value).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
         db.collection(table).doc(doc.id).delete(); 
       });
      });   
    },
        submit_(event) {     
            let c1 = !this.isVoid(this.userData,this.errors);
            let c2=this.checkLogin(this.userData,this.errors);
            let c3= this.checkPassword(this.userData,this.errors);
            let c4= this.comparisonPassword(this.userData,this.errors);
            let c5= this.checkName(this.userData,this.errors);
            if(c1&&c2&&c3&&c4&&c5){
                this.$store.commit('setRegErr',{login:'',email:''})
                this.$store.dispatch('contain_',this.userData) 
            }
            event.preventDefault();
        },
        isVoid(userData,errors){
            let void_=false;
            for(let erorr in errors){
                errors[erorr].text='';
                errors[erorr].style='';
            }
            for(let key in userData){
                if(!userData[key]){
                    errors[key].text="Поле не должно быть пустым!";
                    errors[key].style="error";
                    void_=true;
                }
            }

            return void_;
        },
        checkLogin(data,error) {
            if(data.login){
                if(data.login.length<4){
                    error.login.text="Поле должно содержать более 4 символов"
                    error.login.style="error"

                    return false;
                }
                else if(data.login.length>21){
                    error.login.text="Поле должно содержать менее 21 символа"
                    error.login.style="error"

                    return false;
                }

                    return true;
            }

            return false;
        },
        checkPassword(data,error) {
            if(data.password){
                if(data.password.length<8){
                error.password.text="Поле должно содержать более 7 символов";
                error.password.style="error";

                    return false;
                }
                else if(data.password.length>16){
                    error.password.text="Поле должно содержать менее 17 символов";
                    error.password.style="error";

                    return false;
                }

            return true;
            }

            return false;
        },
        comparisonPassword(data,error) {
            if((data.password!==data.password_check)&&data.password_check){
                error.password_check.text="Пароли не совпадают!";
                error.password_check.style="error";

                return false;
            }

            return true;
        },
        checkName(data,error) {
           let bool=true;
            if(data.name.length>20){
                error.name.text="Длинна не должна превышать 20 символов";
                error.name.style="error";
                bool=false;
            }
            if(data.surname.length>20){
                error.name.text="Длинна не должна превышать 20 символов";
                error.surname.style="error";
                bool=false;
            }

            return bool;
       },   
    }
}
</script>

<style scoped>
.container_ {
    margin-top: 15px;
    max-width: 575px;
    background: url(registration_bg.jpg) ;
    background-size:cover;
    color:#fff;
    font-weight: 400;
}
.fone{
    background-color: rgba(110, 72, 194, 0.77);
}
.container_ input[type="text"],input[type="password"],input[type="email"]{
    margin-bottom:30px;
    margin-top:10px;
    border:1px solid #a38acb;
    background: none;
    background-color:initial;
    max-width: 305px;
    width: 100%;
}
.container_ input[type="text"],input[type="password"],input[type="submit"],input[type="email"]{
    padding:0 5px;
    /* width: 100%; */
    min-height: 40px;
}
.container_ input[type="submit"]{
    margin-bottom: 15px;
    background: #23ad93;
    cursor: pointer;
    font-size: 25px;
    width: 100%;
    font-weight: 400;
    min-height: 45px;
}
.container_ input[type="submit"]:hover{
    background: #27bea3;
    border:1px solid #a38acb;
}
.title {
    margin-bottom: 25px;
    font-size: 22px;
}
.checkbox {
    position: relative;
    margin-left: 25px;
    margin-top: 15px;
    margin-bottom: 30px;
    cursor: pointer;
}
.checkbox::before{
    width: 20px;
    height: 20px;
    left: -25px;
    content:'';
    border:1px solid #a38acb;
    position: absolute;
}
.container_ input[type="checkbox"]:checked~.checkbox::after{
    left: -23px;
    top: 2px;
    content: '';
    position: absolute;
    width: 14px;
    height: 10px;
    border-right: 3px solid #14e6bf;
    border-bottom: 3px solid #14e6bf;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}
.checkbox:hover{
    opacity: 0.9;
}
.responsive {
    max-width: 515px;
    padding: 0 15px;
}
.err {
    color: #ff5100;
    top: 50px;
    position: absolute;
    left: 180px;
    font-size:15px;
}
.error {
    border:1px solid #ff5100!important;
}
.container_ label {
    display: flex;
    max-width: 180px;
    width: 100%;
    align-items: center
}
.submit {
    max-width: 300px;
}
</style>
<template>
  <div id="authorization">
    <form action="" @submit="submit_" autocomplete="off">
        <div class="container_ mx-auto">
            <div class="fone">
                <div class="responsive mx-auto relative">
                    <span class="title block">Вход</span>
                    <label for="username">Введите логин</label>
                    <input :class="stle_err" class="block" type="text" id="username" v-model.trim="username">
                    <label for="password">Введите пароль</label>
                    <input :class="stle_err" type="password" id="password" v-model.trim="password">
                    <span v-if="error_" class="err block">Неверный логин или пароль!</span>
                    <span v-if="authErr" class="err block">Неверный логин или пароль!</span>
                    <div class="flex">
                        <input class="hidden" type="checkbox" id="rmb_me" v-model="checked">
                        <label class="checkbox" for="rmb_me">Запомнить меня</label>
                    </div>
                    <input type="submit" value="Войти">
                    <div class="flex text-sm justify-between">
                        <span><router-link active-class="font-bold" to="/forgot-password">Забыли пароль?</router-link></span>
                        <span><router-link active-class="font-bold" to="/registration">Зарегистрироватся</router-link></span>
                    </div>
                </div>
            </div>
        </div>
    </form>
  </div>
</template>

<script>

export default {
    name:'authorization',
    data() {
        return {
            error_:false,
            username:'',
            password:'',
            stle_err:'',
            checked:''
            
        }
    },
    computed:{
        authErr(){

           return this.$store.getters.getAuthErr;
       } 
    },
    methods: {
        submit_(event) {          
            this.error_=false;
            this.stle_err="";
            let condition1=this.username&&this.password;
            let condition2=this.username.length>3&&this.username.length<21;
            let condition3=this.password.length>7&&this.password.length<17;
            this.$store.commit("setAuthErr","")
            if(!condition1||!condition2||!condition3) {
                this.error_=true; 
                this.stle_err="error";
            }
            else {
                this.$store.dispatch('Authorization',{login:this.username,password:this.password,checked:this.checked});
            }
            event.preventDefault();
        }   
    }
   
}
</script>

<style scoped>
.container_ {
    margin-top: 50px;
    max-width: 400px;
    background: url(authorization_bg.jpg) ;
    background-size:cover;
    color:#fff;
    font-weight: 400;
}
.fone {
    padding-top: 50px; 
    padding-bottom :60px;
    background-color: rgba(110, 72, 194, 0.77);
}
.container_ input[type="text"],input[type="password"] {
    margin-bottom:20px;
    margin-top:10px;
    border:1px solid #a38acb;
    background: none;
}
.container_ input[type="text"],input[type="password"],input[type="submit"] {
    padding:0 5px;
    width: 100%;
    min-height: 40px;
}
.container_ input[type="submit"] {
    margin-bottom: 35px;
    background: #23ad93;
    cursor: pointer;
    font-size: 25px;
}
.container_ input[type="submit"]:hover {
    background: #27bea3;
    border:1px solid #a38acb;
}
.title {
    margin-bottom: 60px;
    font-size: 22px;
}
.checkbox {
    position: relative;
    margin-left: 25px;
    margin-top: 15px;
    margin-bottom: 30px;
    cursor: pointer;
}
.checkbox::before {
    width: 20px;
    height: 20px;
    left: -25px;
    content:'';
    border:1px solid #a38acb;
    position: absolute;
}
.container_ input[type="checkbox"]:checked~.checkbox::after {
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
.checkbox:hover {
    opacity: 0.9;
}
.responsive {
    max-width: 260px;
    padding: 0 15px;
}
.err {
    color: #ff5100;
    top: 265px;
    position: absolute;
}
.error {
    border:1px solid #ff5100!important;
}
</style>
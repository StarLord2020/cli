import VueRouter from "vue-router";
import RegistrationForm from './components/Forms/Registration'
import AfterRegistration from './components/Forms/AfterRegistration'
import Authorization from './components/Forms/Authorization'
import Home from './components/Home'
import ForgotPassword from './components/Forms/ForgotPassword'
import App from './App'

export default new VueRouter({
    routes:[
        {
            path:'/',
            component:Home
        },
        {
            path:'/registration',
            component:RegistrationForm
        },
        {
            path:'/success',
            component: AfterRegistration
        },
        {
            path:'/authorization',
            component: Authorization
        },
        {
            path:'/forgot-password',
            component: ForgotPassword
        },
        {
            path:"/app",
            component:App 
        }  
    ],
    mode:'history'
})
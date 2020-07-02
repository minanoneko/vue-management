import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
   routes:[
     {path:'/',redirect:'/index'},
     {path:'/index',component:()=>import('@/views/index.vue'),children:[
             {path:'/index',redirect:'/index/login'},
             {path:'login',component:()=>import('@/views/login/login.vue')}
         ]}
   ]
})
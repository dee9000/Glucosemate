import { createRouter, createWebHistory } from "vue-router";
import NamePrompt from '../pages/NamePrompt.vue';
import Home from "../pages/Home.vue";
import { useUserStore } from "../stores/userStore";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/',
            name: 'Home',
            component: Home
        },
         { 
            path: '/start',
            name: 'NamePrompt',
            component: NamePrompt
        }
    ]
})

//if the user has no name redirect to /start
router.beforeEach((to, from, next)=>{
   const user = useUserStore()
   if(!user.name && to.name !== 'NamePrompt'){
    next({ name: 'NamePrompt'})
   }else{
    next()
   }
})

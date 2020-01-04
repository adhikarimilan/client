<template>
    <ul v-if="!user.logged_in || !user.name || !user.token" class="navbar-nav ml-auto mt-2 mt-lg-0">
    <li class="nav-item ">
          <a class="nav-link" href="/client/public/login">Login</a>
        </li>
        <li class="nav-item ">
        <a class="nav-link" href="/client/public/register">Register</a>
        </li>
    </ul>
    <ul v-else class="navbar-nav ml-auto mt-2 mt-lg-0">
        <li class="nav-item dropdown">
                        <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ user.name }} <span class="caret"></span>
                        </a>

                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">
                                Logout
                            </a>
                        </div>
        </li>
<clients name="hello"></clients>
    </ul>
   
</template>


<script>
import clients from './Clients.vue';
export default {
    name:'user',
    data(){
        return{
        user:{
            'name' : 'Hello',
            'email': null,
            'token' : null,
            'logged_in' :false,
        }
        }
    },
    created(){
        console.log('user component created');
    }
}
</script>
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import Toaster from 'v-toaster'
 
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-toaster/dist/v-toaster.css'
 
// optional set default imeout, the default is 10000 (10 seconds).
Vue.use(Toaster, {timeout: 5000})

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('clients', require('./components/Clients.vue').default);
Vue.component('user', require('./components/User.vue').default);
Vue.component('messages', require('./components/Messages.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data:{
        message:null,
        chat:{
        messages:[],
        user:[],
        self:[],
        time:[],
        },
        typing:null,
        online:0,
    },
    watch:{
      message(){
        Echo.private('chat')
        .whisper('typing', {
        name: this.message
    });
      }
    },
    methods:{
      getTime(){
        let time = new Date();
        let h=time.getHours();
        if(h<10) h='0'+h;
        let m=time.getMinutes();
        if(m<10) m= '0'+m;
        return h+':'+m;
      }
      ,
        send(){
            if(this.message.length>0)
            //alert('sending..');
            axios.post('/send', {
                message: this.message,
              })
              .then(response=> {
               // console.log(response);
              })
              .catch(error=> {
                console.log(error);
              });
            this.chat.messages.push(this.message);
            this.chat.user.push("you");
            this.chat.self.push("self");
            this.chat.time.push(this.getTime());
            this.message=null;
            //this.typing=null;
        }
    },
    mounted(){
        Echo.private('chat')
       .listen('ChatEvent', (e) => {
        this.typing=null;
        this.chat.messages.push(e.message);
        this.chat.user.push(e.user);
        this.chat.time.push(this.getTime());
        this.chat.self.push("other");
        
        //console.log(e);
    })
    .listenForWhisper('typing', (e) => {
      //alert(e);
      if(e.name!=null && e.name.length >0){
        this.typing="Someone is typing a message ...";
        //console.log(e.name);
      }
      else
      this.typing=null;
      
  });
  Echo.join(`chat`)
    .here((users) => {
      this.online=users.length;
        console.log(users);
    })
  .joining((user) => {
    this.online+=1;
    this.$toaster.success(user.name+' has joined.')
   console.log(user.name+ " has joined");
})
.leaving((user) => {
  this.online-=1;
  this.$toaster.warning(user.name+' is offline.')
    console.log(user.name +" is offline");
});
    //console.log('mounted in app.js');
    }
});




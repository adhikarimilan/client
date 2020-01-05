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
        return time.getHours()+':'+time.getMinutes();
      }
      ,
        send(){
            if(this.message.length>0)
            //alert('sending..');
            axios.post('/send', {
                message: this.message,
              })
              .then(response=> {
                console.log(response);
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
      if(e.name.length>0){
        this.typing="Someone is typing a message ...";
        //console.log(e.name);
      }
      else
      this.typing=null;
      
  });
    //console.log('mounted in app.js');
    }
});




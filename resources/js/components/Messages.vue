<template>
<div style="clear:both;">
    <div class="p-2 mb-1  d-block alert" style="width:auto;max-width:70%;border-radius:20%;" v-bind:class="msgClass" ><slot></slot></div>
    <small class="badge badge-pill badge-primary mb-1" v-bind:class="senderClass" style="clear:both;">{{user}} at {{time}}</small>
</div>
</template>
<script>
export default {
    name:'messages',
    props:[
        'self',
        'user',
        'time'
    ],
    computed:{
        msgClass(){
            if(this.self=="self")
            return 'alert-success float-right';
            return 'alert-info float-left';
        },
        senderClass(){
            if(this.self=="self")
            return 'float-right';
            return 'float-left';
        }
    },
}
</script>
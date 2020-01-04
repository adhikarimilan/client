<template>
<div class="row">
    <div class="col-12">
        <h2>{{name}} haha</h2>
         <button type="button" class="btn btn-primary mb-2" data-toggle="modal" data-target="#exampleModal">Add new Client</button>
        <ul class="pagination">
            <li v-bind:class="[{disabled:!pagination.prev_page_url}]" class="page-item"><a href="#" class="page-link" @click="fetchClients(pagination.prev_page_url)">Prev</a></li>
            <li  class="page-item"><a class="page-link" href="#">Page {{pagination.current_page}} of {{pagination.last_page}}</a></li>
            <li v-bind:class="[{disabled:!pagination.next_page_url}]" class="page-item"><a href="#" class="page-link" @click="fetchClients(pagination.next_page_url)">Next</a></li>
        </ul>
       
        </div>
        <div v-for="client in clients" v-bind:key="client.id" class="col-md-4 card">
            <div class=" m-1">
            <h3>Name: {{client.name}}</h3>
            <h3>City: {{client.city}}</h3>
            <h3>Email: {{client.email}}</h3>
            <button class="btn-warning" @click="editClient(client)" data-toggle="modal" data-target="#exampleModal">Edit</button>
            <button  class="btn-danger" @click="deleteClient(client.id)">Delete </button>
        </div>
        </div>
        <div class="my-5 col-12 text-center d-none">
            <h2 class="">Add New Client</h2>
            <form @submit.prevent="AddClient" method="post">
                <div class="form-row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4 form-group">
                        <input type="text" name="name"  class="form-control" placeholder="client name" v-model="client.name"> 
                        <input type="text" name="city" class="form-control" placeholder="city" v-model="client.city">
                        <input type="email" name="name" class="form-control" placeholder="email" v-model="client.email">
                        <input type="submit" value="Save" class="btn btn-primary btn-block">
                    </div>
                </div>
            </form>
        </div>



<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add/Edit Client</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form @submit.prevent="AddClient" method="post">
      <div class="modal-body">
        
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Name:</label>
            <input type="text" name="name"  class="form-control" placeholder="client name" v-model="client.name"> 
          </div>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">City:</label>
            <input type="text" name="city" class="form-control" placeholder="city" v-model="client.city">
          </div>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Email:</label>
            <input type="email" name="name" class="form-control" placeholder="email" v-model="client.email">
          </div>
          <div class="form-group d-none">
            <label for="message-text" class="col-form-label">Message:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <input  type="submit" value="Save" class="btn btn-primary" onclick="//document.getElementById('exampleModal').style.display='none';">
      </div>
      </form>
    </div>
  </div>
</div>
        </div>
        
</template>

<script>
    //import user from './User.vue';
    export default {
        'name':'clients',
mounted() {
            console.log('Component mounted.')
        },
        data()
        {
            return{
            clients:[],
            client:{
                id:'',
                name: '',
                city:'',
                email: '',
            },
            edit:false,
            client_id: '',
            curr_page: '',
            pagination:
            {
                current_page:'',
                first_page_url:'',
                last_page_url:'',
                next_page_url:'',
                prev_page_url:'',
                last_page:'',
            }
            }
        },
        created()
        {
            console.log("Component Created");
            this.fetchClients();
        },
        methods:{
            fetchClients(fetchurl){
                fetchurl=fetchurl || 'api/clients';
                this.curr_page=fetchurl;
                //alert(this.curr_page);
                fetch(fetchurl)
                .then(res=>res.json())
                .then(
                    res=>{
                        //console.log(res.data);
                        this.clients= res.data;
                        this.pagination.first_page_url=res.first_page_url;
                        this.pagination.last_page_url=res.last_page_url;
                        this.pagination.next_page_url=res.next_page_url;
                        this.pagination.prev_page_url=res.prev_page_url;
                        this.pagination.current_page=res.current_page;
                        this.pagination.last_page=res.last_page;
                        }
                    )
                .catch(
                    err=>{
                    console.error(err);
                    
                });
                
            },
            deleteClient(id){
                if(confirm('Are You sure to delete this?')){
                    fetch('api/client/'+id,
                    {
                        'method': 'delete',
                    })
                    .then(
                        res =>{
                            //alert('Client Deleted');
                            //console.log(res);
                            this.fetchClients(this.curr_page);
                        }
                    )
                    .catch(
                        err=>{
                            console.error(err);
                        }
                    )
                }
            },
            AddClient(){
                if(!this.edit){
                    //add
                    fetch('api/client',
                    {
                    method : 'post',
                    body: JSON.stringify(this.client),
                    headers :{
                        'content-type' : 'application/json'
                    }
                    })
                    .then(
                        res=> {
                            console.log(res);
                            //res.json();
                            this.client.name='';
                            this.client.email='';
                            this.client.city='';
                        }
                    )
                    .then(
                        data=>{
                        alert('client added');
                        this.fetchClients(this.curr_page);
                    })
                    .catch(
                        err=>{
                            console.error(err);
                        }
                    )
                 }
                else{
                    this.edit=false;
                    //update
                    fetch('api/client/'+this.client.id,
                    {
                    method : 'patch',
                    body: JSON.stringify(this.client),
                    headers :{
                        'content-type' : 'application/json'
                    }
                    })
                    .then(
                        res=> {
                            console.log(res);
                            //res.json();
                            this.client.name='';
                            this.client.email='';
                            this.client.city='';
                        }
                    )
                    .then(
                        data=>{
                        alert('Client Updated');
                        this.fetchClients(this.curr_page);
                    })
                    .catch(
                        err=>{
                            console.error(err);
                        }
                    )
                }
            },
            editClient(client){
                this.edit=true;
                this.client.id=client.id;
                this.client.name=client.name;
                this.client.email=client.email;
                this.client.city=client.city;
               // this.AddClient();
            }

        }
    }
</script>
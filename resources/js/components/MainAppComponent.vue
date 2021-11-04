<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <div>

        <div v-if="!initialSite">
            <div class="ff-navbar" v-if="loginApp">
                <!--
                <div id="fd">App page with menu and working screen </div>
                <div><input name="email" v-model="firstName"></div>
                -->
                <ul>
                    <!--
                    <li>
                        <router-link to="/invoicesList">Tiparesc facturi</router-link>
                    </li>
                     -->
                    <!--
                <li><router-link to="/testInvoicesList">Lista test</router-link></li>
                <li><router-link to="/testTab">Tab test</router-link></li>
                -->
                <li><router-link to="/badmintonCourt">Badminton court</router-link></li>
                <li><router-link to="/printLaravelTest">Print(test)</router-link></li>

                <li style="float:right" v-on:click="logout"> <a href="javascript:void(null);">Logout</a> </li>

                <!-- <li style="float:right"><a href="#about">About</a></li> -->
                </ul>
            </div>
            <login-windows v-else
                 ref="loginWindows"
                @loginWindows = "loginWindows">
            </login-windows>
        </div>
        <bdminton-court v-else
                @loginFromBadmintonCourt = "loginFromBadmintonCourt">
         </bdminton-court>
     <router-view></router-view>

    </div>



</template>

<script>

	import LoginComponent from './login/LoginComponent.vue';
    import BadmintonCourtComponent from '../components/app/BadmintonCourtComponent.vue';

	export default {
		name: "app-component",
		created() {
			this.URI_LOGOUT  = this.$url.getUrl("logout")
		},
		components: {
			'login-windows': LoginComponent,
            'bdminton-court': BadmintonCourtComponent
		},
		mounted() {
			this.firstName = "Primul nume";
			this.lastName = "... si ultimul nume";
            /*
			let uri = Url.getUrl("test");
			this.axios
				.get(uri)
				.then(response => {
					                // this.info = response.data.bpi;
						            console.log(response.data.messages[0]);
						            this.firstName = response.data.messages[0];
				                  }
				     )
				.catch(error => console.log(error))
            */
		},
		data: () => ({
			firstName: 'ha ha ha',
			lastName: 'foo',
            loginApp: false,
            initialSite: true
		}),
		methods: {
            loginFromBadmintonCourt: function(){
                this.initialSite = false;
                this.$router.push('/main');
            },
			loginWindows: function () {
				this.loginApp = this.$refs.loginWindows.$data.isLogin;
				if(this.loginApp){
					this.$router.push('/main');
                }

			},
			logout: function () {
				this.axios.post(this.URI_LOGOUT).then((response) => {
						if(response.data.succes){
							this.loginApp = false;
							this.$router.push('/main');
						}else{

						}
					}
				);
			}
        }
	}
</script>

<style scoped>

</style>

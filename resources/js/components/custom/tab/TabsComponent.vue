<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div v-bind:id="idTab" class="ff-tab">
        <div class="headers">
            <ul>
                <li class='header-li' v-for="tabc in tabCaption">
                        <div v-bind:[idTab]="tabc.id" class="header-div">
                                <button v-on:click="clickTab($event)" >{{ tabc.caption }}</button>
                        </div>
                </li>
            </ul>
        </div>

        <div class='tabs'>
            <div class='tab' v-for="tabc in tabCaption" v-bind:id="getIdTab(tabc.id)" :key=tabc.id><ff-tab></ff-tab></div>
                <!--  <div class='tab' v-for="tabc in tabCaption" v-bind:[idTab]="getIdTab(tabc.id)" :key=tabc.id> -->
                <!-- <template v-slot:content>{{tabc.content}}</template> -->
                <!-- <component :is=[tabc.content]></component> -->
            </div>
    </div>
</template>

<script>

    import TabComponent from "./TabComponent";

	export default {
		components: {
			'ff-tab'   : TabComponent
		},
		name: "tabs-component",
		props: {idTab: String, tabCaption: Array},
        mounted () {
			this.cssClass = {
                headerDiv:   "header-div",
				tab:         "tab",
                selected:    "selectedOn"
            };
	        this.currentTabId     = null;

	        this.tabs             = this.$el.querySelectorAll("."+this.cssClass.tab);
	        this.tabsHeader       = this.$el.querySelectorAll("."+this.cssClass.headerDiv);

        },
		computed: {
        },
		methods:{
			addComponetToTab: function(idTab, cmp){
				let tb = this.getTab(idTab);

				tb.lastChild.appendChild(cmp);

				// console.log(tb.lastChild);

            },
            clickTab: function(element){
	            let id = element.target.parentElement.getAttribute(this.idTab);
	            this.currentTabId = this.getIdTab(id);

	            this.$vanilla.removeClasses(this.tabsHeader, this.cssClass.selected);

                for (var i = 0; i < this.tabs.length; i++){
		            if(this.tabs[i].id === this.currentTabId){
			            element.target.parentElement.classList.add(this.cssClass.selected);
			            this.tabs[i].style.display = 'flex';
		            }else{
			            this.tabs[i].style.display = 'none';
		            }
	            }
			},
			getIdTab: function(nr){
                return this.idTab + nr;
			},
			getTab: function(idTab){
				let itemReturn = null;

				for (let tb of this.tabs) {
					if(tb.getAttribute("id") == this.getIdTab(idTab)){
						itemReturn = tb;
						break;
					}
				}
				return itemReturn;
			}

        }

	}
</script>

<style scoped>

</style>

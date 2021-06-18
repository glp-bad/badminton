<template>
        <ul v-bind:id=idMenu class = "contex-menu-component">
            <li v-bind:id=menu.id class="menu-item" v-for="menu in menuOption" v-on:click="clickMenu($event)">{{menu.caption}}</li>
        </ul>
</template>

<script>
	export default {
		name: "contex-menu-component",
		props: {menuOption: Array, idMenu: String},
		data () {
			return {
				optionSelect: {}
			}
		},
		methods: {
			clickMenu: function (option) {
				let caption = option.target.innerHTML;
                this.optionSelect = {id: option.target.id, caption: caption.trim()};
				this.$emit("emitContexMenu");
			}
        }
	}
</script>

<style scoped>

</style>
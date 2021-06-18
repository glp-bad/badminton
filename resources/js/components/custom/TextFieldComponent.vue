
<template>
    <input :id=this.id
           :name=this.id
           :minlength = this.minlength
           :maxlength = this.maxlength
           v-model="dataModel"
           ref="inputRef"
           :size=this.size>
</template>

<script>

	import { maska } from 'maska'

	export default {
		name: "textField-component",
        props: {
            id: String,
            maska: String,
            validate: Function,
            minlength: Number,
	        maxlength: Number,
	        size: Number
        },
		directives: { maska },
		mounted() {
			this.vModelData = null;
			// document.addEventListener('keydown', this.keydownPress);
			// document.addEventListener('keyup', this.keydownPress);
        },
        methods: {
			getValue: function () {
                return this.dataModel;
			},
	        keydownPress: function () {
                if(event.target.id == this.id){
	                console.log(this.getValue());
                }
	        }
        },
		data () {
			return {
				dataModel: null
            }
		}
	}

</script>

<style scoped>
</style>

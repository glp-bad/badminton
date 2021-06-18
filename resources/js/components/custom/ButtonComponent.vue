
<template>
        <button @click="onClick" class="ff-button">
            <slot>Button</slot>
        </button>
</template>

<script>
	export default {
		name: "button-component",
        props: {onClick: {
                    type: Function
                    // required: true
                    },
                 widthButton: {
        	        type: Number,
	                 default: 0
                 }
	            },
		mounted() {
			// this.style.width = this.widthButton + 'px';
            /*
			var css_text = ".contact_us_text{ max-width: 60px; }";
			var css = document.createElement('style');
			css.type='text/css';
			css.setAttributeNode( document.createAttribute('scopped') );
			css.appendChild(    document.createTextNode( css_text )     );
			this.$el.appendChild(   css     );
			*/

            if(this.widthButton > 0) {
	            this.$el.style.width = this.widthButton + 'px';
            }

            // console.log(this.widthButton);
        },
        methods:{
        }
	}
</script>

<style scoped>

</style>

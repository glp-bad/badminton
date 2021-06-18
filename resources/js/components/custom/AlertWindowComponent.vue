
<template>

    <div :class=windowClass.modal ref="windowModalRef">
        <div :class=windowClass.window ref="windowRef">
            <div :class=windowClass.header ref="headerRef">
                <span ref="captionRef"></span>
            </div>
            <div :class=windowClass.message>
                <div :class=windowClass.messageIcon ref="iconMessageRef">
                    <font-awesome-icon :icon="getIconAlertConfig().icon" size="3x" :style="getIconAlertConfig().iconStyleColor" />
                </div>
                <div :class=windowClass.messageText>
                    <p ref="messageRef"></p>
                </div>
            </div>
            <div :class=windowClass.button>
                <div :class=windowClass.buttonAlign>
                    <button-ok ref="buttonOkRef"
                               v-if="this.cTypeWindows == ALERT || this.cTypeWindows == INFORMATION || this.cTypeWindows == CHECK || this.cTypeWindows == REDALERT || this.cTypeWindows == SKULL"
                               :onClick="clickOk">{{getIconAlertConfig().captionButton01}}
                    </button-ok>

                    <button-yes ref="buttonYesRef" v-if="this.cTypeWindows == YESNO" :onClick="clickYes">{{getIconAlertConfig().captionButton01}} </button-yes>
                        <div :class=windowClass.buttonSpace></div>
                    <button-no ref="buttonNoRef" v-if="this.cTypeWindows == YESNO" :onClick="clickNo">{{getIconAlertConfig().captionButton02}} </button-no>

                </div>
            </div>
            <div :class=windowClass.bottomLine ref="colorBottomLineRef"></div>
        </div>
    </div>

</template>

<script>

	import ButtonComponent from './ButtonComponent.vue'

	export default {
		name: "alertWindow-component",
		components: {
			'button-ok': ButtonComponent,
			'button-yes': ButtonComponent,
			'button-no': ButtonComponent
		},
		props: {
			cWidth: Number,
            cHeight: Number,
            cTypeWindows: Number
		},
		created() {
			this.ALERT = 1,
			this.INFORMATION = 2,
			this.YESNO = 3,
			this.REDALERT = 4,
			this.CHECK = 5,
			this.SKULL = 6,
			this.ALERT_COLOR = "#DED208",
			this.INFORMATION_COLOR = "#15BEF8",
			this.YESNO_COLOR = "#22C206",
			this.REDALERT_COLOR = "red",
			this.CHECK_COLOR = "#15BEF8",
			this.SKULL_COLOR = "red"
		},
		mounted() {
			this.$refs.windowRef.style.width = this.cWidth + 'px';
			// this.$refs.windowRef.style.height = this.cHeight + 'px';
			this.$refs.colorBottomLineRef.style.background = this.getIconAlertConfig().iconColor;

			this.$vanilla.dragDiv(this.$refs.windowRef, this.$refs.headerRef);

        },
		data () {
			return {
				windowClass: {modal: "alertWindow", window: "window", header: "header",
                              message: "message",
                              messageIcon: "messageIcon",
                              messageText: "messageText",
                              button: "button",
					          buttonAlign: "button-align",
					          buttonSpace: "button-space",      // space between button yesno
                              bottomLine: "bottom-line"},
                pressOk: 0,
				pressYes: 0,
				pressNo: 0,
                myEmit: {ok: "emitOkButton", yesNo: "emitYesNoButton"}
			}
		},
        methods:{
			setCaption: function (caption) {
				this.$refs.captionRef.innerHTML=caption;
			},
	        setMessage: function (message) {
		        this.$refs.messageRef.innerHTML=message;
	        },
            clickOk: function () {
				this.pressOk = 1;
	            this.$emit(this.myEmit.ok);
                this.close();
            },
	        clickYes: function () {
		        this.pressYes = 1;
		        this.pressNo = 0;
		        this.$emit(this.myEmit.yesNo);
		        this.close();
	        },
	        clickNo: function () {
		        this.pressYes = 0;
		        this.pressNo = 1;
		        this.$emit(this.myEmit.yesNo);
		        this.close();
	        },
	        close: function () {
		        this.$refs.windowModalRef.style.display = "none";
	        },
	        show: function () {
		        this.ok = 0;
		        this.$refs.windowModalRef.style.display = "table";

		        if( !this.$check.isUndef(this.$refs.buttonOkRef) ){
			        this.$refs.buttonOkRef.$el.focus();
		        }

		        if( !this.$check.isUndef(this.$refs.buttonNoRef) ){
			        this.$refs.buttonNoRef.$el.focus();
                }

	        },
            getIconAlertConfig(){

				let icon = null;
				let captionButton01 = "Ok";
	            let captionButton02 = "No";
	            let iconColor = null;

	            if (this.cTypeWindows == this.ALERT) {
		            icon = ['fas', 'exclamation-triangle'];
		            iconColor = this.ALERT_COLOR;
	            }
	            else if (this.cTypeWindows == this.INFORMATION) {
		            icon = ['fas', 'exclamation'];
		            iconColor = this.INFORMATION_COLOR;

	            }
	            else if (this.cTypeWindows == this.YESNO) {
		            icon = ['fas', 'question'];
		            iconColor = this.YESNO_COLOR;

		            captionButton01 = "Yes";
		            captionButton02 = "No";

	            }
	            else if (this.cTypeWindows == this.REDALERT) {
		            icon = ['fas', 'exclamation-circle'];
		            iconColor = this.REDALERT_COLOR;

	            }
	            else if (this.cTypeWindows == this.CHECK) {
		            icon = ['fas', 'check'];
		            iconColor = this.CHECK_COLOR;

	            }
	            else if (this.cTypeWindows == this.SKULL) {
		            icon = ['fas', 'skull-crossbones'];
		            iconColor = this.SKULL_COLOR;
	            }

	            return {
		            iconColor: iconColor,
	            	iconStyleColor: {color: iconColor},
                    icon: icon,
		            captionButton01: captionButton01,
	                captionButton02: captionButton02
                }


            }

        }
	}
</script>

<style scoped>
</style>

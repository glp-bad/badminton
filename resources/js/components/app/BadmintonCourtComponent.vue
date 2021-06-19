<template>

    <div>

        <div class = "labelShoot" id="labelShoot" >Gavrila</div>

        <div class = "containerMsg">{{alertMsg}}</div>
        <div class = "container">

        <div class = "pointList">
            <span>Point X:  {{ pointX }} Point Y:  {{ pointY }}</span>
            <span>------------------------------</span>
            <span>Zone:     {{ labelShootZone }}</span>
            <span>Shoot name: {{ labelShootName }}</span>
            <span>Specific zone: {{ labelSpecificZone }}</span>
            <span>Fluturasi: {{ labelLimitaFluturasi }}</span>
            <span>---------------------------- </span>
                <div class="div-sapce"></div>
                <div class="div-sapce"></div>
                <div class="div-sapce"></div>
            <button-clear :onClick="clearShoot"
                           :widthButton= 110
            >Clear shoot</button-clear>
                <div class="div-sapce"></div>
            <button-export :onClick="exportFileTraining"
                           :widthButton= 110
            >Export training</button-export>

            <div class="loginButtom">
                <button class="ff-button-link" v-on:click="toLogin"><u>to login ... </u></button>
            </div>

        </div>

            <div class = "bmc">
                <div class = "backLine" @contextmenu.prevent="mouseRightClick">
                    <div @mouseover="mouseOver" v-on:click= "mouseClick" v-on:click.right = "mouseRightClick" class = "backDoubleLeft" id="backDoubleLeft">
                        <canvas width="50px" height="90px" class = "canvas-backDoubleLeft" id="canvas-backDoubleLeft"></canvas></div>
                    <div @mouseover="mouseOver" v-on:click= "mouseClick" v-on:click.right = "mouseRightClick" class = "backMiddleLeft" id="backMiddleLeft">
                        <canvas width="321px" height="90px" calss = "canvas-backMiddleLeft" id="canvas-backMiddleLeft"></canvas></div>
                    <div @mouseover="mouseOver" v-on:click= "mouseClick" v-on:click.right = "mouseRightClick" class = "backMiddleRight" id="backMiddleRight">
                        <canvas width="321px" height="90px" class = "canvas-backMiddleRight" id="canvas-backMiddleRight"></canvas></div>
                    <div @mouseover="mouseOver" v-on:click= "mouseClick" class = "backDoubleRight" id="backDoubleRight">
                        <canvas width="50px" height="90px" class = "canvas-backDoubleRight" id="canvas-backDoubleRight"></canvas></div>
                </div>

                <div class = "middleLine" @contextmenu.prevent="mouseRightClick">
                    <div @mouseover="mouseOver" v-on:click= "mouseClick" v-on:click.right = "mouseRightClick" class = "middleDoubleLeft" id="middleDoubleLeft">
                        <canvas width="50px" height="489px" class = "canvas-middleDoubleLeft" id="canvas-middleDoubleLeft"></canvas></div>
                    <div @mouseover="mouseOver" v-on:click= "mouseClick" v-on:click.right = "mouseRightClick" class = "middleMiddleLeft" id="middleMiddleLeft">
                        <canvas width="321px" height="489px" class = "canvas-middleMiddleLeft" id="canvas-middleMiddleLeft"></canvas></div>
                    <div @mouseover="mouseOver" v-on:click= "mouseClick" v-on:click.right = "mouseRightClick" class = "middleMiddleRight" id="middleMiddleRight">
                        <canvas width="321px" height="489px" class = "canvas-middleMiddleRight" id="canvas-middleMiddleRight"></canvas></div>
                    <div @mouseover="mouseOver" v-on:click= "mouseClick" v-on:click.right = "mouseRightClick" class = "middleDoubleRight" id="middleDoubleRight">
                        <canvas width="50px" height="489px" class = "canvas-middleDoubleRight" id="canvas-middleDoubleRight"></canvas></div>
                </div>

                <div class = "netLine" @contextmenu.prevent="mouseRightClick">
                    <div @mouseover="mouseOver" v-on:click= "mouseClick" v-on:click.right = "mouseRightClick" class = "netLeft" id="netLeft" >
                        <canvas width="50px" height="246px" class = "canvas-netLeft" id="canvas-netLeft"></canvas></div>
                    <div @mouseover="mouseOver" v-on:click= "mouseClick" v-on:click.right = "mouseRightClick" class = "netMiddle" id="netMiddle">
                        <canvas width="647px" height="246px"class = "canvas-netMiddle" id="canvas-netMiddle"></canvas></div>
                    <div @mouseover="mouseOver" v-on:click= "mouseClick" v-on:click.right = "mouseRightClick" class = "netRight" id="netRight">
                        <canvas width="50px" height="246px" class = "canvas-netRight" id="canvas-netRight"></canvas></div>
                </div>

            </div>

            <!--
            <div class = "shootList">
                <span v-for="snl in shootNameList">
                    <input type="radio" name="shootName" v-on:click="selectShot" v-model="radioShootName" :value=snl> {{snl}} </input>
                </span>

            </div>
            -->


            <div class = "shootTrainingList">
                        <span v-for="stl in shootTrainingList" :zid=stl.indexId
                              v-bind:style="{ 'background-color': stl.colorPoint }"
                              @mouseover="mouseOverShootTraining" @mouseleave="mouseLeaveShootTraining">
                            >{{ stl.trainingShotLabel }}
                        </span>
            </div>

        </div>


        <contex-menu-component :menuOption=shootNameListContextMenu
                               :idMenu=menuIdOption
                               ref="emitContexMenu"
                               @emitContexMenu = "menuOptionClick">
        </contex-menu-component>


    </div>
</template>

<script>

	import ContexMenuComponent from '../custom/ContexMenuComponent.vue';
	import ButtonComponent from '../custom/ButtonComponent.vue';

	export default {
		components: {
			'contex-menu-component': ContexMenuComponent,
			'button-export': ButtonComponent,
			'button-clear': ButtonComponent,
            'button-login': ButtonComponent
		},
		name: "badminton-court",
        mounted () {
			this.radioShootName =  this.shootNameList[0];
			this.shootTrainingList = [];
        },
        created(){
            this.EMIT = 'loginFromBadmintonCourt';
        },
		data () {
			return {
				shootZone:     "",
				pointX:        "0",
				pointY:        "0",
				labelShootZone: "-",
				labelShootName: "-",
				labelSpecificZone: "-",
				labelLimitaFluturasi: "-",
				shootNameList:  ['Clear', 'Smash', 'Drop', 'Net drop'],
				shootNameListContextMenu:  [
					{id: "1", caption: "Clear"},
					{id: "2", caption: "Smash"},
					{id: "3", caption: "Drop"},
					{id: "4", caption: "Net drop"}
                ],
				menuIdOption: "menuOption",
				eventClick: null,
				radioShootName: "",
				shootTrainingList: [],
				alertMsg: " - ",
                widthLimitSingleLeft: 108,
                widthLimitSingleMiddle: 217,
				heightLimitBack: 163,
				heightLimitMiddle: 326,

                heightLimitBackNet: 81,
				heightLimitMiddleNet: 161,
                widthLimitLeftNet: 107,
				widthLimitLeftMiddleNet: 214,
				widthLimitLeftMiddleMiddleNet: 321,
				widthLimitRightMiddleMiddleNet: 428,
				widthLimitRightMiddleNet: 535,

                DIV_ZONE_CLASS: ["backDoubleLeft", "backMiddleLeft", "backMiddleRight", "backDoubleRight",
	                            "middleDoubleLeft", "middleMiddleLeft", "middleMiddleRight", "middleDoubleRight",
	                            "netLeft", "netMiddle", "netRight"],
                MAXIM_SHUTTLE_MACHIN: 20,
                TILT_UP_MAXIM:   -2800,
                TILT_UP_MEDIUM:  -1650,
                TILT_HOME:           0,
                TILT_DOWN_MEDIUM: 1650,
                TILT_DOWN_MAXIM:  1700,
                TURN_LEFT_MAXIM:     1726,
                TURN_LEFT_MIDDLE:     863,
                TURN_LEFT_MIDDLE_M:   431,
                TURN_HOME: 0,
                TURN_RIGHT_MIDDLE_M: -431,
                TURN_RIGHT_MIDDLE:   -863,
                TURN_RIGHT_MAXIM:   -1726

			}
		},
		methods: {
			clearShoot: function(){
				for (var i = 0; i < this.DIV_ZONE_CLASS.length; i++) {
					let canvas = document.getElementById("canvas-" + this.DIV_ZONE_CLASS[i]);
					let context = canvas.getContext('2d');
					context.clearRect(0, 0, canvas.width, canvas.height);
				}

				this.shootTrainingList = [];
				this.completeLabel();

            },
            toLogin: function(){
                this.$emit(this.EMIT);
            },
			exportFileTraining: function(){
                let varData = "";

				var i;
				for (i = 0; i < this.shootTrainingList.length; i++) {
					varData += this.shootTrainingList[i].turn +
                                "," + this.shootTrainingList[i].tilt +
						        "," + this.shootTrainingList[i].speed+";\n";
				}

				var d = new Date();
				let filename = 'trainingFile_' + d.toDateString() +'.txt';
				filename = filename.split(" ").join("");

				let element = document.createElement('a');
				element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(varData));
				element.setAttribute('download', filename);

				element.style.display = 'none';
				document.body.appendChild(element);

				element.click();
				document.body.removeChild(element);

			},
			menuOptionClick: function(){
				// console.log(this.$refs.emitContexMenu.$data.optionSelect);
				// console.log("click on menu");
				// alert("You clicked");

                let shootTipe = this.$refs.emitContexMenu.$data.optionSelect;
                this.radioShootName = shootTipe.caption;

				this.contexMenuShowHide(null, false);
				this.onEventClick(this.eventClick);
            },

			selectShot: function(event){
				this.completeLabel();
				// console.log(this.radioShootName);
				// console.log(event.target.value);
            },

			mouseOver: function(event){
				//console.log(event.target.className);
				//console.log(event.clientX);
				//console.log(event.clientY);
			},

			mouseLeaveShootTraining: function(event){
				this.overLeaveShootTraining(event,0);
            },
			mouseOverShootTraining: function(event){
				this.overLeaveShootTraining(event,1);
            },

			overLeaveShootTraining: function(event, overLeave){

				let idIndex = event.target.getAttribute('zid');
				let shoot = this.shootTrainingList[idIndex];
				let zona = document.getElementById(shoot.zone);

				let canvas = document.getElementById(shoot.getCanvasID());
				let colorOver = "";                 // backgound

				if(overLeave == 1){ // over
					colorOver = "#2d995b";
					this.drawShoot(canvas, shoot.pointX, shoot.pointY, shoot.colorOverPoint);
                }else{
					this.drawShoot(canvas, shoot.pointX, shoot.pointY, shoot.colorPoint);
                }

				zona.style.backgroundColor = colorOver;

				this.showLabelShoot(shoot, zona, overLeave);

            },

			showLabelShoot: function(shoot, zona, over){
				let positionZone = zona.getBoundingClientRect();
				let labelX = shoot.pointX + positionZone.x;
				let labelY = shoot.pointY + positionZone.y;

				let labelShoot = document.getElementById("labelShoot");

				labelShoot.style.setProperty("top",  labelY + "px");
				labelShoot.style.setProperty("left", labelX + "px");

				labelShoot.innerText = shoot.indexId + "> " + shoot.shootName;

				if(over == 1) {
					//labelShoot.style.setProperty("display", "inline");
					labelShoot.style.setProperty("visibility", "visible");
					labelShoot.style.setProperty("opacity", "1");

				}else{
					//labelShoot.style.setProperty("display", "none");
					labelShoot.style.setProperty("visibility", "hidden");
					labelShoot.style.setProperty("opacity", "0");

                }


            },

			drawShoot: function(eventTarget, x, y, colorShoot){
				let c = eventTarget;
				let ctx = c.getContext("2d");

				ctx.beginPath();
				ctx.arc(x,y,7,0,2*Math.PI);
    			ctx.fillStyle = colorShoot;
				ctx.fill();
				//ctx.lineWidth = 3;
				//ctx.strokeStyle = colorOver;
				//ctx.stroke();
            },

			mouseRightClick: function(event){
				// this.onEventClick(event);
                this.eventClick = event;
                this.contexMenuShowHide(event, true);
            },
			mouseClick: function(event){
				this.contexMenuShowHide(event, false);
				// this.onEventClick(event);
			},
			contexMenuShowHide: function(event, show){
				let menu = document.getElementById(this.menuIdOption);

				if(show){
					menu.style.top = event.clientY + "px";
					menu.style.left = event.clientX + "px";
					menu.classList.add('show');
                }else{
					menu.classList.remove('show');
                }

            },

			onEventClick: function (event) {

				if(this.shootTrainingList.length < this.MAXIM_SHUTTLE_MACHIN) {

					var position = event.target.getBoundingClientRect();

					this.pointX = Math.round(event.clientX - position.x);
					this.pointY = Math.round(event.clientY - position.y);
					this.shootZone = event.target.parentNode.className;

					let shoot = this.getShoot();
					shoot.indexId = this.shootTrainingList.length;
					shoot.setTrainingShotLabel();
					shoot.colorPoint = this.tipeShootObject(shoot.shootName).colorShoot;

					this.completeLabel(shoot);
					this.shootTrainingList.push(shoot);

					this.drawShoot(event.target, shoot.pointX, shoot.pointY, shoot.colorPoint);
				}else{
					console.log('am ajuns la maxim');

                }
			},
			completeLabel: function(shoot){

                if( this.$check.isUndef(shoot) ){
	                this.labelShootZone = "-";
	                this.labelShootName = "-";
	                this.alertMsg = "-";
	                this.labelSpecificZone = "-";
	                this.labelLimitaFluturasi = "-";

                }else{
	                this.labelShootZone = shoot.zone;
	                this.labelShootName = shoot.shootName;
	                this.alertMsg = shoot.alertMsg;
	                this.labelSpecificZone = shoot.specificZone;



	                let textFulturasi = this.shootTrainingList.length+1;
	                if(this.shootTrainingList.length+1 == this.MAXIM_SHUTTLE_MACHIN){
		                textFulturasi = this.shootTrainingList.length+1 + " maximum admis!";
                    }

	                this.labelLimitaFluturasi = textFulturasi; this.shootTrainingList.length+1;

                }
            },

			getShoot: function(){

				let shoot = undefined;

				switch(this.shootZone) {
					case "backDoubleLeft":
						shoot = this.backDoubleLeft();
						break;
					case "backMiddleLeft":
						shoot = this.backMiddleLeft();
						break;
					case "backMiddleRight":
						shoot = this.backMiddleRight();
						break;
					case "backDoubleRight":
						shoot = this.backDoubleRight();
						break;
					case "middleDoubleLeft":
						shoot = this.middleDoubleLeft();
						break;
					case "middleMiddleLeft":
						shoot = this.middleMiddleLeft();
						break;
					case "middleMiddleRight":
						shoot = this.middleMiddleRight();
						break;
					case "middleDoubleRight":
						shoot = this.middleDoubleRight();
						break;
					case "netLeft":
						shoot = this.netLeft();
						break;
					case "netMiddle":
						shoot = this.netMiddle();
						break;
					case "netRight":
						shoot = this.netRight();
						break;
                    default:
                    	console.log('nu s-a selectat nici o zona din terenul de joc: ' + this.shootZone);
				}


				return shoot;
                /*
                backDoubleLeft:
                backMiddleLeft:
                backMiddleRight:
                backDoubleRight:
                middleDoubleLeft:
                middleMiddleLeft:
                middleMiddleRight:
                middleDoubleRight:
                netLeft:
                netMiddle:
                netRight:
                */
            },

			backDoubleLeft: function(){

				let ob = this.shootObject();

				// only Clear
				if(this.radioShootName != this.shootNameList[0]  ){
                    ob.alertMsg = "Only " + this.shootNameList[0] + " shoot is allowed on: " + ob.zone;
                }

				ob.turn = this.TURN_LEFT_MAXIM;
				ob.tilt = this.TILT_UP_MAXIM;
				ob.speed = 1600;

				return ob;
            },
			backMiddleLeft: function(){
				let ob = this.shootObject();

                if(ob.pointX<= this.widthLimitSingleLeft){
	                ob.specificZone = "left";
	                ob.turn = this.TURN_LEFT_MIDDLE;
	                ob.tilt = this.TILT_UP_MAXIM;
	                ob.speed = 1600;
                }else if(ob.pointX>this.widthLimitSingleLeft && ob.pointX<=this.widthLimitSingleMiddle){
	                ob.specificZone = "middle";
	                ob.turn = this.TURN_LEFT_MIDDLE_M;
	                ob.tilt = this.TILT_UP_MAXIM;
	                ob.speed = 1600;
                }else if(ob.pointX>this.widthLimitSingleMiddle){
	                ob.specificZone = "right";
	                ob.turn = this.TURN_LEFT_MIDDLE_M;
	                ob.tilt = this.TILT_UP_MAXIM;
	                ob.speed = 1600;
                }


				return ob;
            },
	        backMiddleRight: function(){
		        let ob = this.shootObject();

		        if(ob.pointX<= this.widthLimitSingleLeft){
			        ob.specificZone = "left";
			        ob.turn = this.TURN_RIGHT_MIDDLE_M;
			        ob.tilt = this.TILT_UP_MAXIM;
			        ob.speed = 1600;
		        }else if(ob.pointX>this.widthLimitSingleLeft && ob.pointX<=this.widthLimitSingleMiddle){
			        ob.specificZone = "middle";
			        ob.turn = this.TURN_RIGHT_MIDDLE;
			        ob.tilt = this.TILT_UP_MAXIM;
			        ob.speed = 1600;
		        }else if(ob.pointX>this.widthLimitSingleMiddle){
			        ob.specificZone = "right";
			        ob.turn = this.TURN_RIGHT_MAXIM;
			        ob.tilt = this.TILT_UP_MAXIM;
			        ob.speed = 1600;
		        }

		        return ob;
            },
		    backDoubleRight: function(){
			    let ob = this.shootObject();

			    // only Clear
			    if(this.radioShootName != this.shootNameList[0]  ){
				    ob.alertMsg = "Only " + this.shootNameList[0] + " shoot is allowed on: " + ob.zone;
			    }

			    ob.turn = this.TURN_RIGHT_MAXIM;
			    ob.tilt = this.TILT_UP_MAXIM;
			    ob.speed = 1600;

			    return ob;
            },
			middleDoubleLeft: function(){
				let ob = this.shootObject();

				// only Clear
				if(this.radioShootName == this.shootNameList[3]  ){
					ob.alertMsg = this.radioShootName + " shoot is not allowed on: " + ob.zone;
				}

				if(ob.pointY<= this.heightLimitBack){
					ob.specificZone = "back";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;
				}else if(ob.pointY>this.heightLimitBack && ob.pointY<=this.heightLimitMiddle){
					ob.specificZone = "middle";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;
				}else if(ob.pointY>this.heightLimitMiddle){
					ob.specificZone = "front";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;
				}

				return ob;
            },
			middleMiddleLeft: function(){
				let ob = this.shootObject();

				if(ob.pointY<= this.heightLimitBack){
					ob.specificZone = "back";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;
				}else if(ob.pointY>this.heightLimitBack && ob.pointY<=this.heightLimitMiddle){
					ob.specificZone = "middle";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;
				}else if(ob.pointY>this.heightLimitMiddle){
					ob.specificZone = "front";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;
				}


				if(ob.pointX<= this.widthLimitSingleLeft){
					ob.specificZone = ob.specificZone + "Left";
				}else if(ob.pointX>this.widthLimitSingleLeft && ob.pointX<=this.widthLimitSingleMiddle){
					ob.specificZone = ob.specificZone + "Middle";
				}else if(ob.pointX>this.widthLimitSingleMiddle){
					ob.specificZone = ob.specificZone + "Right";
				}


				return ob;
            },
			middleMiddleRight: function(){
				let ob = this.shootObject();

				if(ob.pointY<= this.heightLimitBack){
					ob.specificZone = "back";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;
				}else if(ob.pointY>this.heightLimitBack && ob.pointY<=this.heightLimitMiddle){
					ob.specificZone = "middle";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;
				}else if(ob.pointY>this.heightLimitMiddle){
					ob.specificZone = "front";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;
				}


				if(ob.pointX<= this.widthLimitSingleLeft){
					ob.specificZone = ob.specificZone + "Left";
				}else if(ob.pointX>this.widthLimitSingleLeft && ob.pointX<=this.widthLimitSingleMiddle){
					ob.specificZone = ob.specificZone + "Middle";
				}else if(ob.pointX>this.widthLimitSingleMiddle){
					ob.specificZone = ob.specificZone + "Right";
				}


				return ob;
            },
			middleDoubleRight: function(){
				let ob = this.shootObject();

				// only Clear
				if(this.radioShootName == this.shootNameList[3]  ){
					ob.alertMsg = this.radioShootName + " shoot is not allowed on: " + ob.zone;
				}

				if(ob.pointY<= this.heightLimitBack){
					ob.specificZone = "back";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;
				}else if(ob.pointY>this.heightLimitBack && ob.pointY<=this.heightLimitMiddle){
					ob.specificZone = "middle";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;
				}else if(ob.pointY>this.heightLimitMiddle){
					ob.specificZone = "front";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;
				}

				return ob;
            },
			netLeft: function(){
				let ob = this.shootObject();

				if(ob.pointY <= this.heightLimitBackNet){
					ob.specificZone = "back";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;

                }else if(ob.pointY > this.heightLimitBackNet && ob.pointY<= this.heightLimitMiddleNet){
					ob.specificZone = "middle";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;

                }else if(ob.pointY > this.heightLimitMiddleNet){
					ob.specificZone = "front";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;
                }


				return ob;
            },
			netMiddle: function(){
				let ob = this.shootObject();

				if(ob.pointY <= this.heightLimitBackNet){
					ob.specificZone = "back";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;

				}else if(ob.pointY > this.heightLimitBackNet && ob.pointY<= this.heightLimitMiddleNet){
					ob.specificZone = "middle";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;

				}else if(ob.pointY > this.heightLimitMiddleNet){
					ob.specificZone = "front";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;
				}

				if(ob.pointX<= this.widthLimitLeftNet){
					ob.specificZone = ob.specificZone + "Left";
				}else if(ob.pointX>this.widthLimitLeftNet && ob.pointX<=this.widthLimitLeftMiddleNet){
					ob.specificZone = ob.specificZone + "LeftMiddle";
				}else if(ob.pointX>this.widthLimitLeftMiddleNet && ob.pointX<=this.widthLimitLeftMiddleMiddleNet){
					ob.specificZone = ob.specificZone + "LeftCenter";
				}else if(ob.pointX>this.widthLimitLeftMiddleMiddleNet && ob.pointX<=this.widthLimitRightMiddleMiddleNet){
					ob.specificZone = ob.specificZone + "RightCenter";
				}if(ob.pointX>this.widthLimitRightMiddleMiddleNet && ob.pointX<=this.widthLimitRightMiddleNet){
					ob.specificZone = ob.specificZone + "RightMiddle";
				}if(ob.pointX>this.widthLimitRightMiddleNet){
					ob.specificZone = ob.specificZone + "Right";
				}

				return ob;
			},
			netRight: function(){
				let ob = this.shootObject();

				if(ob.pointY <= this.heightLimitBackNet){
					ob.specificZone = "back";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;

				}else if(ob.pointY > this.heightLimitBackNet && ob.pointY<= this.heightLimitMiddleNet){
					ob.specificZone = "middle";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;

				}else if(ob.pointY > this.heightLimitMiddleNet){
					ob.specificZone = "front";
					ob.turn = 7;
					ob.tilt = 10;
					ob.speed = 1600;
				}

				return ob;
			},

            shootObject: function(){
				return {
					indexId:  0,
					zone:   this.shootZone,
                    specificZone: "all area",
					pointX: this.pointX,
	                pointY: this.pointY,
	                turn:   0,
	                tilt:   0,
	                pause:  0,
	                speed:  0,
                    shootName: this.radioShootName,
					alertMsg: " - ",
					trainingShotLabel: "-",
                    colorPoint: "-",                // tipeShootObject
					colorOverPoint: "black",
                    setTrainingShotLabel: function () {
                        this.trainingShotLabel = this.indexId + ": " + this.shootName + " -> " + this.zone + " -> " + this.specificZone;
                    },
					getCanvasID: function () {
						return "canvas-" + this.zone;
					},
					setCoordonate: function (turn, tilt, speed) {

						this.turn = turn;
						if(turn > this.TURN_LEFT_MAXIM || turn<this.TILT_UP_MAXIM) {
							this.turn = this.TURN_HOME;
						}

						this.tilt = tilt;
  						if(tilt>this.TILT_DOWN_MAXIM || tilt<this.TILT_UP_MAXIM){
						    this.tilt = this.TILT_HOME;
                        }

						this.speed = speed;
					}

                };
            },

			tipeShootObject: function(name){

				let color= "black";

				if(name == "Clear"){
					color = "#f4f75a";
				}else if(name == "Smash"){
					color = "#f21d0b";
				}else if(name == "Drop"){
					color = "#E50CD787";
				}else if(name == "Net drop") {
					color = "#94eafb";
				}

				return {
					name: name,
                    colorShoot: color
                }
            }
		}
	}
</script>

<style scoped></style>


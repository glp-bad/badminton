import startOfMonth from './../../../node_modules/date-fns/startOfMonth'
import endOfMonth   from './../../../node_modules/date-fns/endOfMonth'
import format       from './../../../node_modules/date-fns/format'
import urlList      from "./../urlList";
import cssList      from "./../cssList";

const appHelper = {
	install(Vue, options) {

		Vue.prototype.$startEndCurrentMonth = function () {
				let formatString = 'dd/MM/yyyy';

				let curDate = new Date();
				let dataIn  = startOfMonth(curDate);
				let dataSf  = endOfMonth(curDate);
				return {monthIn: format(dataIn, formatString)  , monthSf: format(dataSf, formatString)};
		}

		Vue.prototype.$url = {
		        forHosting: true,
				urlAppHosting: "https://badmintonclub.ro/",
                urlAppLocal: "http://localclub.ro/",
				urlList: urlList,
				getUrl: function (name) {
					let objFind = this.urlList.find( data => data.name === name);

					if(objFind === undefined){
						return "url for [" +name+ "] not found"
					}

					return this.getUrlHosting() + objFind.url;
				},
				getRoot: function(){
                    return this.getUrlHosting();
				},
				getPathPdf: function(){
                    return this.getUrlHosting() + "public/pdf/" ;
				},
                getUrlHosting: function(){
                    let url = this.urlAppLocal;
                    if(this.forHosting){
                        url = this.urlAppHosting;
                    }
                    return url;
                }
		},
			Vue.prototype.$css = {
				cssList: cssList,
				getCss: function (name) {
					let objFind = this.cssList.find( data => data.name === name);

					if(objFind === undefined){
						return "css for [" +name+ "] not found"
					}

					return objFind;
				}
			},

		Vue.prototype.$vanilla = {
			removeClasses: function(htmlElementArray, className){
				for (var i = 0; i < htmlElementArray.length; i++){
					htmlElementArray[i].classList.remove(className);
				}
			},
			addClasses: function(htmlElementArray, className){
				for (var i = 0; i < htmlElementArray.length; i++){
					htmlElementArray[i].classList.add(className);
				}
			},
			dragDiv: function (container, header) {

				let initialX = 0, initialY = 0, offsetX = 0, offsetY = 0;

				header.onmousedown = dragMouseDown;

				function dragMouseDown(e) {
					e = e || window.event;
					e.preventDefault();

					initialX = e.clientX - offsetX;
					initialY = e.clientY - offsetY;

					document.onmousemove = elementDrag;
					document.onmouseup = closeDragElement;

					// console.log("dragMouseDown: "  + "initialX="+ initialX + " initialY="+initialY)

				}

				function elementDrag(e) {
					e = e || window.event;
					e.preventDefault();

					let newX = e.clientX - initialX;
					let newY = e.clientY - initialY;

					offsetX = newX;
					offsetY = newY;

					//console.log("elementDrag: "  + "newX="+ newX + " newY="+newY)
					container.style.transform = "translate3d(" + newX + "px, " + newY + "px, 0)";

				}

				function closeDragElement() {
					document.onmouseup = null;
					document.onmousemove = null;
				}
			}

		}

		Vue.prototype.$check = {
			isUndef (v) {
				return v === undefined || v === null
			},
			lenghtMinMax(string, min, max){

				let sstring = 0;

				if(!this.isUndef(string)){
					sstring = string.length;
				}


				let mmin  = parseInt(min);
				let mmax  = parseInt(max);

				if(mmin == NaN){
					mmin = 0;
				}

				if(mmax == NaN){
					mmax = 4503599627370495;
				}


				if(sstring >= min && sstring <= max){
					return true;
				}
				return false;
			},
			validateForm(refs){
				for (const item in refs) {
					if (typeof refs[item].validate === "function") {
						refs[item].validate();
					}
				}
			}

		}


		Vue.prototype.$appServer = {
			/**
			 *  sqlMessageResponse - from server
			 * @param sqlMessageResponse
			 */
			getHtmlSqlFormatMessage (sqlMessageResponse) {
				// succes, lastId, messages, errorMsg
				let msg = sqlMessageResponse.messages;

				if(sqlMessageResponse.admin && !sqlMessageResponse.succes){
					msg = msg + "<br><br>"+
						  sqlMessageResponse.errorMsg ;
				}

				return msg;

			}

		}

		Vue.prototype.$app = {
			getFormMessageClass (field, caption, message) {
				return {
					field: field,
					caption: caption,
					message: message
				}
			}, /**
			 *
			 * @param messages  (array from getFormMessageClass)
			 * @returns {string}
			 */
			getHtmlFormatMessage (messages) {
				let msg = "";

				for(var i=0; i < messages.length; i++ ){
					msg = msg+
						"<b>" + messages[i].caption + ": &nbsp;</b>"+
						messages[i].message +  "<br>";
				}

				return msg;

			},
			cfgTextFIeld(){
					return { id: "",
					minLength: 0,
					maxLength: 0,
					validate: "",
					ref: "",
					maska: "",
					caption: "",
					mandatory: false,
					sizeField: 0,
					setIdAndRef: function (id) {
							this.id = id;
							this.ref = id+'Ref';
					}
					};

			},
			cfgCheckBox() {
				return {
					id: "",
					ref: "",
					validate: "",
					caption: "",
					defaultValue: false,
					disabled: false,
					setIdAndRef: function (id) {
						this.id = id;
						this.ref = id+'Ref';
					}
				};
			}
		}


	}


}

export default appHelper;

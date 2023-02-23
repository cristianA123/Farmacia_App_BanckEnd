(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0051b3f9"],{5311:function(t,e,i){"use strict";var a=i("5607"),s=i("2b0e");e["a"]=s["a"].extend({name:"rippleable",directives:{ripple:a["b"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}})},"5e1e":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"d-flex flex-column flex-grow-1"},[i("div",{staticClass:"d-flex align-center py-3"},[t._m(0),i("v-spacer"),i("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,s=e.attrs;return[i("BtnToReload"),i("v-btn",t._g(t._b({attrs:{color:"primary",dark:""}},"v-btn",s,!1),a),[t._v(" Nueva ruta ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",[i("v-card-title",[i("span",{staticClass:"text-h5"},[t._v(t._s(t.formTitle))])]),i("v-card-text",[i("v-container",[i("v-row",[i("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[i("v-text-field",{attrs:{"error-messages":t.isValidName,label:"Nombre",outlined:""},model:{value:t.editedItem.name,callback:function(e){t.$set(t.editedItem,"name",e)},expression:"editedItem.name"}})],1),i("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[i("v-text-field",{attrs:{"error-messages":t.isValidPrice,label:"Precio",outlined:""},model:{value:t.editedItem.price,callback:function(e){t.$set(t.editedItem,"price",e)},expression:"editedItem.price"}})],1),i("v-col",{staticClass:"my-0 py-0",attrs:{lg:"12"}},[i("v-text-field",{attrs:{label:"Descripción",outlined:""},model:{value:t.editedItem.description,callback:function(e){t.$set(t.editedItem,"description",e)},expression:"editedItem.description"}})],1),i("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[i("v-text-field",{attrs:{"error-messages":t.isValidApi_Key,label:"Apikey",outlined:""},model:{value:t.editedItem.api_Key,callback:function(e){t.$set(t.editedItem,"api_Key",e)},expression:"editedItem.api_Key"}})],1),i("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[i("v-select",{attrs:{"error-messages":t.isValidProvider_id,label:"Seleccione proveedor",items:t.intervals,"item-text":"name","item-value":"id",outlined:""},model:{value:t.editedItem.provider_id,callback:function(e){t.$set(t.editedItem,"provider_id",e)},expression:"editedItem.provider_id"}})],1),i("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[i("v-switch",{attrs:{label:"Bidireccional"},model:{value:t.editedItem.bidirectional,callback:function(e){t.$set(t.editedItem,"bidirectional",e)},expression:"editedItem.bidirectional"}})],1),i("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[i("v-text-field",{attrs:{"error-messages":t.isValidDial,label:"Dial",outlined:""},model:{value:t.editedItem.dial,callback:function(e){t.$set(t.editedItem,"dial",e)},expression:"editedItem.dial"}})],1),i("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[i("v-text-field",{attrs:{"error-messages":t.isValidAuthorization,label:"Authorization",outlined:""},model:{value:t.editedItem.authorization,callback:function(e){t.$set(t.editedItem,"authorization",e)},expression:"editedItem.authorization"}})],1),i("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[i("v-text-field",{attrs:{label:"Mask",outlined:""},model:{value:t.editedItem.mask,callback:function(e){t.$set(t.editedItem,"mask",e)},expression:"editedItem.mask"}})],1),i("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[i("v-text-field",{attrs:{label:"Var1",outlined:""},model:{value:t.editedItem.var1,callback:function(e){t.$set(t.editedItem,"var1",e)},expression:"editedItem.var1"}})],1),i("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[i("v-text-field",{attrs:{label:"Var2",outlined:""},model:{value:t.editedItem.var2,callback:function(e){t.$set(t.editedItem,"var2",e)},expression:"editedItem.var2"}})],1)],1)],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v(" Cancelar ")]),i("v-btn",{attrs:{color:"blue darken-1",text:"",loading:t.btnLoading},on:{click:t.save}},[t._v(" Crear ")])],1)],1)],1)],1),i("v-card",[i("v-data-table",{staticClass:"flex-grow-1",attrs:{headers:t.headers,items:t.items,loading:t.isLoading},scopedSlots:t._u([{key:"item.actions",fn:function(e){var a=e.item;return[i("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.editItem(a)}}},[t._v(" mdi-pencil ")])]}}],null,!0)})],1)],1)},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"display-1"},[t._v("Canales")])])}],n=(i("b0c0"),i("88f5")),r=i("ed7b"),l={components:{BtnToReload:r["a"]},data:function(){return{backendErrors:{name:"",price:"",api_Key:"",authorization:"",provider_id:"",dial:""},selectedInterval:0,intervals:["Last 7 days","Last 28 days","Last month","Last year"],isLoading:!1,btnLoading:!1,dialog:!1,dialogDelete:!1,itemSelected:0,headers:[{text:"Canal",value:"id"},{text:"Nombre",value:"name"},{text:"Proveedor",value:"provider"},{text:"Descripción",value:"description"},{text:"Precio",value:"price"},{text:"APIKEY",value:"api_Key"},{text:"DIAL",value:"dial"},{text:"MASK",value:"mask"},{text:"AUTHORIZATION",value:"authorization"},{text:"VAR1",value:"var1"},{text:"VAR2",value:"var2"},{text:"Modificar",value:"actions"}],items:[],editedIndex:-1,editedItem:{name:"",description:"",price:1,api_Key:"",dial:"",mask:"",authorization:"",var1:"",var2:"",provider_id:null,bidirectional:!1},defaultItem:{name:"",description:"",price:1,api_Key:"",dial:"",mask:"",authorization:"",var1:"",var2:"",provider_id:null,bidirectional:!1}}},computed:{formTitle:function(){return-1===this.editedIndex?"Nuevo ruta de proveedor":"Editar ruta de proveedor"},isValidName:function(){var t,e;return void 0===(null===(t=this.backendErrors)||void 0===t?void 0:t.name)?"":null===(e=this.backendErrors)||void 0===e?void 0:e.name[0]},isValidPrice:function(){var t;return void 0===(null===(t=this.backendErrors)||void 0===t?void 0:t.price)?"":this.backendErrors.price[0]},isValidApi_Key:function(){var t;return void 0===(null===(t=this.backendErrors)||void 0===t?void 0:t.api_Key)?"":this.backendErrors.api_Key[0]},isValidAuthorization:function(){var t;return void 0===(null===(t=this.backendErrors)||void 0===t?void 0:t.authorization)?"":this.backendErrors.authorization[0]},isValidDial:function(){var t;return void 0===(null===(t=this.backendErrors)||void 0===t?void 0:t.dial)?"":this.backendErrors.dial[0]},isValidProvider_id:function(){var t;return void 0===(null===(t=this.backendErrors)||void 0===t?void 0:t.provider_id)?"":this.backendErrors.provider_id[0]}},watch:{dialog:function(t){t||this.close()},dialogDelete:function(t){t||this.closeDelete()}},created:function(){this.initialize()},methods:{initialize:function(){var t=this;this.items=[],n["a"].get("/channel").then((function(e){e.data.success&&(t.items=e.data.data),t.isLoading=!1})),this.intervals=[],n["a"].get("/provider").then((function(e){e.data.success&&(t.intervals=e.data.data),t.isLoading=!1}))},editItem:function(t){this.editedIndex=this.items.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0,this.itemSelected=t.id},close:function(){var t=this;this.dialog=!1,this.$nextTick((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}))},save:function(){var t=this;this.btnLoading=!0;var e=this.editedItem;this.editedIndex>-1?n["a"].put("/channel/"+this.itemSelected,e).then((function(e){e.data.success&&(t.items=e.data.data,t.initialize()),t.close(),t.btnLoading=!1})).catch((function(e){t.btnLoading=!1,t.backendErrors=e.response.data.errors})):n["a"].post("/channel",e,{headers:{Authorization:"Bearer "+window.localStorage.token}}).then((function(e){e.data.success&&(t.items=e.data.data,t.initialize()),t.btnLoading=!1,t.close()})).catch((function(e){t.backendErrors=e.response.data.errors,t.btnLoading=!1}))}}},o=l,d=i("2877"),c=i("6544"),u=i.n(c),h=i("8336"),v=i("b0af"),p=i("99d9"),m=i("62ad"),f=i("a523"),b=i("8fea"),g=i("169a"),y=i("132d"),k=i("0fd9"),x=i("b974"),I=i("2fa4"),C=i("b73d"),V=i("8654"),_=Object(d["a"])(o,a,s,!1,null,null,null);e["default"]=_.exports;u()(_,{VBtn:h["a"],VCard:v["a"],VCardActions:p["a"],VCardText:p["c"],VCardTitle:p["d"],VCol:m["a"],VContainer:f["a"],VDataTable:b["a"],VDialog:g["a"],VIcon:y["a"],VRow:k["a"],VSelect:x["a"],VSpacer:I["a"],VSwitch:C["a"],VTextField:V["a"]})},"9d01":function(t,e,i){},b73d:function(t,e,i){"use strict";var a=i("15fd"),s=i("5530"),n=(i("0481"),i("ec29"),i("9d01"),i("fe09")),r=i("c37a"),l=i("c3f0"),o=i("0789"),d=i("490a"),c=i("80d2"),u=["title"];e["a"]=n["a"].extend({name:"v-switch",directives:{Touch:l["b"]},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset})},attrs:function(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState:function(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData:function(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot:function(){return[this.genSwitch(),this.genLabel()]},genSwitch:function(){var t=this.attrs$,e=(t.title,Object(a["a"])(t,u));return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",Object(s["a"])(Object(s["a"])({},this.attrs),e)),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",Object(s["a"])({staticClass:"v-input--switch__track"},this.switchData)),this.$createElement("div",Object(s["a"])({staticClass:"v-input--switch__thumb"},this.switchData),[this.genProgress()])])},genProgress:function(){return this.$createElement(o["c"],{},[!1===this.loading?null:this.$slots.progress||this.$createElement(d["a"],{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft:function(){this.isActive&&this.onChange()},onSwipeRight:function(){this.isActive||this.onChange()},onKeydown:function(t){(t.keyCode===c["y"].left&&this.isActive||t.keyCode===c["y"].right&&!this.isActive)&&this.onChange()}}})},ec29:function(t,e,i){},ed7b:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-btn",{staticClass:"ml-2",attrs:{outlined:"",color:"primary",small:""},on:{click:t.reoad}},[i("v-icon",[t._v(" mdi-reload ")])],1)],1)},s=[],n={data:function(){return{loading:!1}},methods:{reoad:function(){window.location.reload()}}},r=n,l=i("2877"),o=i("6544"),d=i.n(o),c=i("8336"),u=i("132d"),h=Object(l["a"])(r,a,s,!1,null,null,null);e["a"]=h.exports;d()(h,{VBtn:c["a"],VIcon:u["a"]})},fe09:function(t,e,i){"use strict";i.d(e,"b",(function(){return l}));i("d3b7"),i("25f0"),i("4de4");var a=i("c37a"),s=i("5311"),n=i("8547"),r=i("58df");function l(t){t.preventDefault()}e["a"]=Object(r["a"])(a["a"],s["a"],n["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=a["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:l},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:l},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var a=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===a&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})}}]);
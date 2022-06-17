(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d97fdae"],{"1cb6":function(t,e,i){"use strict";e["a"]={headers:{Authorization:"Bearer "+window.localStorage.token}}},"4bd4":function(t,e,i){"use strict";var a=i("5530"),n=(i("caad"),i("2532"),i("07ac"),i("4de4"),i("159b"),i("7db0"),i("58df")),s=i("7e2b"),r=i("3206");e["a"]=Object(n["a"])(s["a"],Object(r["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",(function(i){e.$set(e.errorBag,t._uid,i)}),{immediate:!0})},a={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?a.shouldValidate=t.$watch("shouldValidate",(function(n){n&&(e.errorBag.hasOwnProperty(t._uid)||(a.valid=i(t)))})):a.valid=i(t),a},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var i=this.watchers.find((function(t){return t._uid===e._uid}));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(a["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},5311:function(t,e,i){"use strict";var a=i("5607"),n=i("2b0e");e["a"]=n["a"].extend({name:"rippleable",directives:{ripple:a["b"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}})},"6ca7":function(t,e,i){},7884:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"flex-grow-1"},[i("div",{staticClass:"d-flex align-center pb-3"},[i("div",[i("div",{staticClass:"display-1"},[t._v(t._s(t.isEdit?"Editar usuario":"Crear usuario"))])]),i("v-spacer"),i("Back-Page",{attrs:{to:"users"}})],1),i("div",{staticClass:"my-2"},[i("div",[!1===t.user.status?i("v-card",{staticClass:"warning mb-4",attrs:{light:""}},[i("v-card-title",[t._v("Usuario deshabilitado")]),i("v-card-subtitle",[t._v("¡Este usuario ha sido deshabilitado! Se revocaron los accesos de inicio de sesión.")]),i("v-card-text",[i("v-btn",{attrs:{dark:""},on:{click:function(e){return t.enableUser()}}},[i("v-icon",{attrs:{left:"",small:""}},[t._v("mdi-account-check")]),t._v("Habilitar usuario ")],1)],1)],1):t._e(),i("v-card",{attrs:{loading:t.isLoading,disabled:t.isLoading}},[i("v-card-title",[t._v(" Información básica ")]),i("v-card-text",[i("div",{staticClass:"d-flex flex-column flex-sm-row"},[""!==t.user.name?i("div",[i("userAvatar",{key:t.user.id,attrs:{user:t.user,detail:!1}})],1):t._e(),i("div",{staticClass:"flex-grow-1 pt-2 pa-sm-2"},[i("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.submit.apply(null,arguments)}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-text-field",{attrs:{"error-messages":t.isValidName,label:"Nombre",placeholder:"Mi nombre",rules:[function(t){return!!t||"Nombre es obligatorio"}],outlined:"","prepend-icon":"mdi-account-outline"},model:{value:t.user.name,callback:function(e){t.$set(t.user,"name",e)},expression:"user.name"}}),i("v-text-field",{attrs:{"error-messages":t.isValidCompany,label:"Empresa",placeholder:"Mi empresa",rules:[function(t){return!!t||"Empresa es obligatorio"}],"prepend-icon":"mdi-briefcase-outline",outlined:""},model:{value:t.user.company,callback:function(e){t.$set(t.user,"company",e)},expression:"user.company"}}),i("v-text-field",{attrs:{"error-messages":t.isValidEmail,label:"Email",rules:[function(t){return!!t||"Email es obligatorio"},function(t){return/.+@.+\..+/.test(t)||"Email no es válido"}],"prepend-icon":"mdi-at",outlined:""},model:{value:t.user.email,callback:function(e){t.$set(t.user,"email",e)},expression:"user.email"}}),i("v-text-field",{attrs:{"error-messages":t.isValidCredit,label:"Credito inicial [min: 100, máx: 7280]",rules:t.creditRules,"prepend-icon":"mdi-currency-usd",outlined:""},model:{value:t.user.credit,callback:function(e){t.$set(t.user,"credit",e)},expression:"user.credit"}}),i("v-row",[i("v-col",[i("v-card",{attrs:{outlined:""}},[i("v-card-title",[t._v(" Servicios ")]),i("v-card-text",[i("ServicesCheckComponent",{attrs:{services:t.services,user:t.user,backendErrors:t.backendErrors},on:{onChange:t.onChangeServicesCheck}})],1)],1)],1)],1),i("div",{staticClass:"d-flex"},[i("v-spacer"),i("v-btn",{attrs:{color:"primary",type:"submit",loading:t.isLoading}},[t._v(" "+t._s(t.isEdit?"Editar":"Crear")+" ")])],1)],1)],1)])])],1)],1),i("v-dialog",{attrs:{"max-width":"290"},model:{value:t.disableDialog,callback:function(e){t.disableDialog=e},expression:"disableDialog"}},[i("v-card",[i("v-card-title",{staticClass:"headline"},[t._v("Disable User")]),i("v-card-text",[t._v("Are you sure you want to disable this user?")]),i("v-card-actions",[i("v-spacer"),i("v-btn",{on:{click:function(e){t.disableDialog=!1}}},[t._v("Cancel")]),i("v-btn",{attrs:{color:"warning"},on:{click:function(e){t.user.disabled=!0,t.disableDialog=!1}}},[t._v("Disable")])],1)],1)],1),i("v-dialog",{attrs:{"max-width":"290"},model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[i("v-card",[i("v-card-title",{staticClass:"headline"},[t._v("Delete User")]),i("v-card-text",[t._v("Are you sure you want to delete this user?")]),i("v-card-actions",[i("v-spacer"),i("v-btn",{on:{click:function(e){t.deleteDialog=!1}}},[t._v("Cancel")]),i("v-btn",{attrs:{color:"error"},on:{click:function(e){t.deleteDialog=!1}}},[t._v("Delete")])],1)],1)],1),i("Dialog-Password-Component",{ref:"dialogPassword",on:{onOk:function(e){return t.$router.push({name:"users"})}}})],1)])},n=[],s=(i("b0c0"),i("88f5")),r=i("b570"),o=i("1cb6"),c=i("bc25"),l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-dialog",{attrs:{width:"600px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",[i("v-card-title",[t._v(" Contraseña generada ")]),i("v-card-text",[i("p",[t._v("Usuario: "+t._s(t.email))]),i("p",[t._v("Contraseña: "+t._s(t.password))])]),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{text:""},on:{click:t.onOk}},[t._v(" Ok ")])],1)],1)],1)},u=[],d={data:function(){return{dialog:!1,email:"",password:""}},methods:{open:function(t,e){this.dialog=!0,this.password=e,this.email=t},onOk:function(){this.$emit("onOk")},doCopy:function(t){this.$copyText(t).then((function(t){console.log(t)}))}}},h=d,v=i("2877"),f=i("6544"),p=i.n(f),m=i("8336"),b=i("b0af"),g=i("99d9"),k=i("169a"),C=i("2fa4"),x=Object(v["a"])(h,l,u,!1,null,null,null),_=x.exports;p()(x,{VBtn:m["a"],VCard:b["a"],VCardActions:g["a"],VCardText:g["c"],VCardTitle:g["d"],VDialog:k["a"],VSpacer:C["a"]});var V=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ml-4 my-0 py-0"},[i("v-row",[i("v-col",{staticClass:"ml-0 pl-0"},[i("v-select",{attrs:{"item-text":"name","item-value":"id",label:"Canal",items:t.channels,"error-messages":t.isValidChannel_id,outlined:"","hide-details":""},model:{value:t.user.channel_id,callback:function(e){t.$set(t.user,"channel_id",e)},expression:"user.channel_id"}})],1)],1),t._l(t.services,(function(e){return i("v-row",{key:e.id},[i("v-checkbox",{attrs:{label:e.name,"hide-details":""},model:{value:e.status,callback:function(i){t.$set(e,"status",i)},expression:"service.status"}})],1)}))],2)},y=[],w={props:{services:{type:Array,default:function(){return[]}},user:{type:Object,default:function(){}},backendErrors:{type:Object,default:function(){return{provider_id:""}}}},data:function(){return{channels:[]}},computed:{isEdit:function(){return void 0!==this.$route.params.userId},isValidChannel_id:function(){return void 0===this.backendErrors.channel_id?"":this.backendErrors.channel_id}},mounted:function(){this.getChannels()},methods:{getChannels:function(){var t=this;s["a"].get("/channel").then((function(e){e.data.success&&(t.channels=e.data.data)}))}}},E=w,$=i("ac7c"),I=i("62ad"),D=i("0fd9"),S=i("b974"),O=Object(v["a"])(E,V,y,!1,null,null,null),B=O.exports;p()(O,{VCheckbox:$["a"],VCol:I["a"],VRow:D["a"],VSelect:S["a"]});var A={components:{BackPage:r["a"],userAvatar:c["a"],DialogPasswordComponent:_,ServicesCheckComponent:B},data:function(){var t=this;return{backendErrors:{name:"",email:"",company:"",credit:"",channel_id:""},user:{},breadcrumbs:[{text:"Usuarios",to:"/usuarios/",exact:!0},{text:"Editar usuario"}],services:[],providers:[],dialogPassword:!1,password:"",errors:{name:"",company:"",email:""},isLoading:!1,deleteDialog:!1,disableDialog:!1,valid:!0,slider:50,min:0,max:300,startCredit:0,creditRules:[function(e){return e>t.min||e<t.max||"No se puede asignar este crédito"}]}},computed:{isEdit:function(){return!!this.$route.params.userId},isValidName:function(){return void 0===this.backendErrors.name?"":this.backendErrors.name},isValidEmail:function(){return void 0===this.backendErrors.email?"":this.backendErrors.email},isValidCompany:function(){return void 0===this.backendErrors.company?"":this.backendErrors.company},isValidCredit:function(){return void 0===this.backendErrors.credit?"":this.backendErrors.credit}},mounted:function(){this.isEdit?this.getUserInfo():(this.$refs.form.reset(),this.user={name:"",email:"",company:"",sms:!1,ivr:!1,whatsapp:!1,mailling:!1,credit:0,provider_id:1})},methods:{getUserInfo:function(){var t=this;s["a"].get("/user/"+this.$route.params.userId).then((function(e){e.data.success&&(t.user=e.data.data,t.services=e.data.data.father_services)}))},submit:function(){var t=this;if(this.$refs.form.validate()){this.isLoading=!0;var e={name:this.user.name,email:this.user.email,company:this.user.company,services:this.services,credit:this.user.credit,channel_id:this.user.channel_id,user_id:this.$route.params.userId};this.isEdit?s["a"].post("/user",e).then((function(e){e.data.success&&(t.isLoading=!1,t.$router.push({name:"users"}))})).catch((function(e){t.isLoading=!1,t.backendErrors=e.response.data.errors})):s["a"].post("/user",e).then((function(e){e.data.success&&(t.isLoading=!1,console.log(e.data.data),t.$refs.dialogPassword.open(e.data.data.email,e.data.data.userPassword))})).catch((function(e){t.backendErrors=e.response.data.errors,t.isLoading=!1,t.errors={email:"Este email ya existe"}}))}},enableUser:function(){var t=this,e={user_id_disable:this.user.id,status:1};axios.post("/disableUser",e,o["a"]).then((function(e){e.data.success?(t.snackbar=!0,t.textSnackbar=e.data.message):(t.snackbar=!0,t.textSnackbar="Error al habilitar el usuario"),t.isLoading=!1})).catch((function(e){t.isLoading=!1,console.log(e)}))},getProviders:function(){var t=this;s["a"].get("/provider").then((function(e){e.data.success&&(t.providers=e.data.data)}))},onChangeServicesCheck:function(t){this.services=t}}},j=A,L=i("4bd4"),T=i("132d"),P=i("8654"),U=Object(v["a"])(j,a,n,!1,null,null,null);e["default"]=U.exports;p()(U,{VBtn:m["a"],VCard:b["a"],VCardActions:g["a"],VCardSubtitle:g["b"],VCardText:g["c"],VCardTitle:g["d"],VCol:I["a"],VDialog:k["a"],VForm:L["a"],VIcon:T["a"],VRow:D["a"],VSpacer:C["a"],VTextField:P["a"]})},ac7c:function(t,e,i){"use strict";var a=i("15fd"),n=i("5530"),s=(i("d3b7"),i("25f0"),i("6ca7"),i("ec29"),i("9d26")),r=i("c37a"),o=i("fe09"),c=["title"];e["a"]=o["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){var t=this.attrs$,e=(t.title,Object(a["a"])(t,c));return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(s["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(n["a"])(Object(n["a"])({},e),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},b570:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"d-flex align-center"},[i("v-btn",{staticClass:"mx-0 px-0 text",attrs:{text:"",loading:t.isLoading},on:{click:function(e){return t.backTo()}}},[i("v-icon",[t._v("mdi-chevron-left")]),t._v(" Regresar ")],1)],1)},n=[],s={props:{to:{type:String,default:""}},data:function(){return{isLoading:!1}},mounted:function(){this.isLoading=!1},methods:{backTo:function(){this.$router.push({name:this.to}),this.isLoading=!0}}},r=s,o=i("2877"),c=i("6544"),l=i.n(c),u=i("8336"),d=i("132d"),h=Object(o["a"])(r,a,n,!1,null,null,null);e["a"]=h.exports;l()(h,{VBtn:u["a"],VIcon:d["a"]})},ec29:function(t,e,i){},fe09:function(t,e,i){"use strict";i.d(e,"b",(function(){return o}));i("d3b7"),i("25f0"),i("4de4");var a=i("c37a"),n=i("5311"),s=i("8547"),r=i("58df");function o(t){t.preventDefault()}e["a"]=Object(r["a"])(a["a"],n["a"],s["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=a["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:o},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:o},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var a=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===a&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70470fe8"],{"23a7":function(e,t,n){"use strict";var a=n("2909"),i=n("5530"),s=n("53ca"),r=(n("a9e3"),n("caad"),n("d81d"),n("b0c0"),n("99af"),n("a434"),n("159b"),n("fb6a"),n("5803"),n("2677")),o=n("cc20"),l=n("80d2"),u=n("d9bd"),c=n("d9f7");t["a"]=r["a"].extend({name:"v-file-input",model:{prop:"value",event:"change"},props:{chips:Boolean,clearable:{type:Boolean,default:!0},counterSizeString:{type:String,default:"$vuetify.fileInput.counterSize"},counterString:{type:String,default:"$vuetify.fileInput.counter"},hideInput:Boolean,multiple:Boolean,placeholder:String,prependIcon:{type:String,default:"$file"},readonly:{type:Boolean,default:!1},showSize:{type:[Boolean,Number],default:!1,validator:function(e){return"boolean"===typeof e||[1e3,1024].includes(e)}},smallChips:Boolean,truncateLength:{type:[Number,String],default:22},type:{type:String,default:"file"},value:{default:void 0,validator:function(e){return Object(l["H"])(e).every((function(e){return null!=e&&"object"===Object(s["a"])(e)}))}}},computed:{classes:function(){return Object(i["a"])(Object(i["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-file-input":!0})},computedCounterValue:function(){var e=this.multiple&&this.lazyValue?this.lazyValue.length:this.lazyValue instanceof File?1:0;if(!this.showSize)return this.$vuetify.lang.t(this.counterString,e);var t=this.internalArrayValue.reduce((function(e,t){var n=t.size,a=void 0===n?0:n;return e+a}),0);return this.$vuetify.lang.t(this.counterSizeString,e,Object(l["w"])(t,1024===this.base))},internalArrayValue:function(){return Object(l["H"])(this.internalValue)},internalValue:{get:function(){return this.lazyValue},set:function(e){this.lazyValue=e,this.$emit("change",this.lazyValue)}},isDirty:function(){return this.internalArrayValue.length>0},isLabelActive:function(){return this.isDirty},text:function(){var e=this;return this.isDirty||!this.isFocused&&this.hasLabel?this.internalArrayValue.map((function(t){var n=t.name,a=void 0===n?"":n,i=t.size,s=void 0===i?0:i,r=e.truncateText(a);return e.showSize?"".concat(r," (").concat(Object(l["w"])(s,1024===e.base),")"):r})):[this.placeholder]},base:function(){return"boolean"!==typeof this.showSize?this.showSize:void 0},hasChips:function(){return this.chips||this.smallChips}},watch:{readonly:{handler:function(e){!0===e&&Object(u["b"])("readonly is not supported on <v-file-input>",this)},immediate:!0},value:function(e){var t=this.multiple?e:e?[e]:[];Object(l["j"])(t,this.$refs.input.files)||(this.$refs.input.value="")}},methods:{clearableCallback:function(){this.internalValue=this.multiple?[]:null,this.$refs.input.value=""},genChips:function(){var e=this;return this.isDirty?this.text.map((function(t,n){return e.$createElement(o["a"],{props:{small:e.smallChips},on:{"click:close":function(){var t=e.internalValue;t.splice(n,1),e.internalValue=t}}},[t])})):[]},genControl:function(){var e=r["a"].options.methods.genControl.call(this);return this.hideInput&&(e.data.style=Object(c["d"])(e.data.style,{display:"none"})),e},genInput:function(){var e=r["a"].options.methods.genInput.call(this);return e.data.attrs.multiple=this.multiple,delete e.data.domProps.value,delete e.data.on.input,e.data.on.change=this.onInput,[this.genSelections(),e]},genPrependSlot:function(){var e=this;if(!this.prependIcon)return null;var t=this.genIcon("prepend",(function(){e.$refs.input.click()}));return this.genSlot("prepend","outer",[t])},genSelectionText:function(){var e=this.text.length;return e<2?this.text:this.showSize&&!this.counter?[this.computedCounterValue]:[this.$vuetify.lang.t(this.counterString,e)]},genSelections:function(){var e=this,t=[];return this.isDirty&&this.$scopedSlots.selection?this.internalArrayValue.forEach((function(n,a){e.$scopedSlots.selection&&t.push(e.$scopedSlots.selection({text:e.text[a],file:n,index:a}))})):t.push(this.hasChips&&this.isDirty?this.genChips():this.genSelectionText()),this.$createElement("div",{staticClass:"v-file-input__text",class:{"v-file-input__text--placeholder":this.placeholder&&!this.isDirty,"v-file-input__text--chips":this.hasChips&&!this.$scopedSlots.selection}},t)},genTextFieldSlot:function(){var e=this,t=r["a"].options.methods.genTextFieldSlot.call(this);return t.data.on=Object(i["a"])(Object(i["a"])({},t.data.on||{}),{},{click:function(){return e.$refs.input.click()}}),t},onInput:function(e){var t=Object(a["a"])(e.target.files||[]);this.internalValue=this.multiple?t:t[0],this.initialValue=this.internalValue},onKeyDown:function(e){this.$emit("keydown",e)},truncateText:function(e){if(e.length<Number(this.truncateLength))return e;var t=Math.floor((Number(this.truncateLength)-1)/2);return"".concat(e.slice(0,t),"…").concat(e.slice(e.length-t))}}})},2677:function(e,t,n){"use strict";var a=n("8654");t["a"]=a["a"]},5803:function(e,t,n){},"6e7c":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-icon",[e._v("mdi-cloud-download-outline")]),n("v-btn",{attrs:{text:""},on:{click:function(t){return e.downloadFile(e.path)}}},[e._v(" Formato Xlsx ")])],1)},i=[],s={props:{path:{type:String,default:""}},methods:{downloadFile:function(e){window.open(e,"_blank").focus()}}},r=s,o=n("2877"),l=n("6544"),u=n.n(l),c=n("8336"),d=n("132d"),h=Object(o["a"])(r,a,i,!1,null,null,null);t["a"]=h.exports;u()(h,{VBtn:c["a"],VIcon:d["a"]})},be68:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"d-flex flex-column flex-grow-1"},[n("div",{staticClass:"d-flex align-center pb-3"},[e._m(0),n("v-spacer"),n("BackPage",{attrs:{to:"create-campaing-sms"}})],1),n("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(t){return t.preventDefault(),e.submit.apply(null,arguments)}}},[n("v-card-text",[n("v-card",{attrs:{outlined:""}},[n("v-card-title",[e._v(" Mensaje "),n("v-spacer"),n("DownloadBottonComponent",{attrs:{path:"/files/sms_campaing.xlsx"}})],1),n("v-card-text",[n("v-text-field",{attrs:{label:"Ingrese nombre de campaña","prepend-icon":"mdi-tag-text-outline","error-messages":e.isValidName,rules:[function(e){return!!e||"El nombre es obligatorio"}],outlined:"",required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),n("v-file-input",{attrs:{label:"Cargue su base de contactos",loading:e.isFileLoading,outlined:"",rules:[function(e){return!!e||"Seleccione excel"}],"error-messages":e.isValidFile,required:""},on:{change:e.onChangeExcel},model:{value:e.file,callback:function(t){e.file=t},expression:"file"}}),e.showExample&&!e.isValidFile?n("v-col",{staticClass:"pt-0"},[n("p",[e._v("Ejemplos:")]),n("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.excelExample,"items-per-page":5}})],1):e._e(),n("Message-Input-Component",{attrs:{agenda:!1,excel:!0,errors:e.errors},on:{onChangeMessage:e.onChangeMessage}})],1)],1),n("br"),n("Options-Component",{attrs:{errors:e.errors},on:{onChange:e.onChangeOptions}})],1),n("v-card-actions",[n("v-row",{attrs:{justify:"center"}},[n("v-btn",{staticClass:"my-2",attrs:{color:"green",dark:""},on:{click:e.submit}},[n("v-icon",[e._v(" mdi-chevron-right ")]),e._v(" Siguiente paso ")],1)],1)],1)],1),n("PreviewSmsComponent",{ref:"dialogPreview",attrs:{options:e.options,message:e.message,isExcel:!0,exampleContact:e.exampleExelComputed,isBtnLoading:e.isBtnLoading,creditToUse:e.creditToUse,availableCredit:e.availableCredit},on:{onPreviewSmsSubmit:e.PreviewSmsSubmit}})],1)},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"display-1"},[e._v("SMS Excel")])])}],s=n("1da1"),r=(n("96cf"),n("b0c0"),n("ac1f"),n("1276"),n("6d60")),o=n("88f5"),l=n("d0b4"),u=n("b570"),c=n("6e7c"),d=n("7812"),h={components:{OptionsComponent:r["a"],MessageInputComponent:l["a"],BackPage:u["a"],DownloadBottonComponent:c["a"],PreviewSmsComponent:d["a"]},data:function(){return{errors:{name:"",scheduled:"",message:"",file:""},headers:[{text:"Número",value:"CELULAR"},{text:"VAR 1",value:"VAR1"},{text:"VAR 2",value:"VAR2"},{text:"VAR 3",value:"VAR3"},{text:"VAR 4",value:"VAR4"},{text:"VAR 5",value:"VAR5"},{text:"VAR 6",value:"VAR6"},{text:"VAR 7",value:"VAR7"},{text:"VAR 8",value:"VAR8"}],excelExample:[],rows:0,name:"",file:null,message:"",url_id:"",long_url:"",options:{is_push:!1,scheduled:null,bidireccional:!1},isFileLoading:!1,errorMessageFile:null,fileId:null,creditToUse:0,availableCredit:0,isBtnLoading:!0}},computed:{showExample:function(){return 0!==this.excelExample.length},exampleExelComputed:function(){return this.excelExample},isValidName:function(){return void 0===this.errors.name?"":this.errors.name[0]},isValidFile:function(){return void 0===this.errors.file?"":this.errors.file[0]}},methods:{calculateCreditToUse:function(){var e=this,t={message:this.message,numberOfContacts:this.rows};o["a"].post("/calculateMessageCredits",t).then((function(t){t.data.success&&(e.creditToUse=t.data.data.creditsToUse)}))},availableCreditByUser:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.calculateCreditToUse();case 2:o["a"].get("/creditsUsedByUser").then((function(t){t.data.success&&(e.availableCredit=t.data.data.availableCredit,e.isBtnLoading=!1)}));case 3:case"end":return t.stop()}}),t)})))()},onChangeOptions:function(e){this.options=e},errorFile:function(e){this.isFileLoading=!1,this.errors.file=[e]},onChangeExcel:function(e){var t=this;if(e)if(this.isFileLoading=!0,"xlsx"===e.name.split(".").pop()||"xls"===e.name.split(".").pop()){var n=new FormData;n.append("file",e),o["a"].post("/sms/upload/excelcampaing",n).then((function(e){e.data.success?(t.fileId=e.data.data.id,t.excelExample=e.data.data.example,t.rows=e.data.data.rows,t.destinatarios=t.fileUploaded,t.errorFile(null),t.errors={name:"",scheduled:"",message:"",file:""}):t.errorFile(e.data.message),t.isFileLoading=!1})).catch((function(e){t.isFileLoading=!1,t.fileId=null,t.errors=e.response.data.errors}))}else console.log("error"),this.errorFile("No es un archivo Excel")},submit:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.$refs.form.validate()){t.next=4;break}return t.next=3,e.availableCreditByUser();case 3:e.$refs.dialogPreview.open();case 4:case"end":return t.stop()}}),t)})))()},PreviewSmsSubmit:function(){var e=this,t={service_id:1,campaign_type_id:3,name:this.name,destinations:this.fileId,message:this.message,url_id:this.url_id,options:this.options,long_url:this.long_url};o["a"].post("/campaign",t).then((function(t){t.data.success&&(e.$store.dispatch("app/showToast",t.data.message),e.$router.push({name:"reports"}))})).catch((function(t){e.$store.dispatch("app/showToast","No se pudo enviar la campaña, revise los datos ingresados"),e.errors=t.response.data.errors}))},onChangeMessage:function(e,t,n){this.message=e,this.url_id=t,this.long_url=n}}},p=h,f=n("2877"),m=n("6544"),v=n.n(m),g=n("8336"),x=n("b0af"),b=n("99d9"),C=n("62ad"),V=n("8fea"),y=n("23a7"),w=n("4bd4"),S=n("132d"),_=n("0fd9"),$=n("2fa4"),F=n("8654"),A=Object(f["a"])(p,a,i,!1,null,null,null);t["default"]=A.exports;v()(A,{VBtn:g["a"],VCard:x["a"],VCardActions:b["a"],VCardText:b["c"],VCardTitle:b["d"],VCol:C["a"],VDataTable:V["a"],VFileInput:y["a"],VForm:w["a"],VIcon:S["a"],VRow:_["a"],VSpacer:$["a"],VTextField:F["a"]})}}]);
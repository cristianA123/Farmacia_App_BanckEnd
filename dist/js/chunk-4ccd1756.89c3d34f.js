(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4ccd1756"],{"3b32":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"d-flex flex-column flex-grow-1"},[a("div",{staticClass:"d-flex align-center pb-3"},[e._m(0),a("v-spacer"),a("v-spacer"),a("BackPage",{attrs:{to:"services"}})],1),a("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(t){return t.preventDefault(),e.submit.apply(null,arguments)}}},[a("v-card-text",[a("v-card",{attrs:{outlined:""}},[a("v-card-text",[a("v-col",{staticClass:"pt-0"},[a("v-data-table",{attrs:{headers:e.headers,items:e.$store.state.sms.file.example,"items-per-page":5,"hide-default-footer":""}})],1),a("Message-Input-Component",{attrs:{"is-agenda":!1,"example-item":e.$store.state.sms.file.example,errors:e.errors},on:{onChangeMessage:e.onChangeMessage}})],1),a("v-card-actions",[a("v-row",{attrs:{justify:"center"}},[a("v-btn",{attrs:{color:"primary",dark:"",type:"submit"}},[e._v(" Siguiente "),a("v-icon",[e._v(" mdi-chevron-right ")])],1)],1)],1)],1)],1),[a("div",{staticClass:"text-center"},[a("v-bottom-sheet",{attrs:{inset:""},model:{value:e.optionsShow,callback:function(t){e.optionsShow=t},expression:"optionsShow"}},[a("Options-Component",{staticClass:"ml-3",attrs:{errors:e.errors},on:{onChange:e.onChangeOptions,onSubmit:e.openPreviewComponent}})],1)],1)]],2),a("PreviewSmsComponent",{ref:"dialogPreview",attrs:{options:e.options,messageExample:e.messageExample,fileData:e.$store.state.sms.file,"is-excel":!0,"is-btn-loading":e.isBtnLoading,"credit-to-use":e.creditToUse,"available-credit":e.availableCredit},on:{onPreviewSmsSubmit:e.PreviewSmsSubmit}})],1)},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"display-1"},[e._v("SMS Excel")])])}],i=a("1da1"),r=(a("ac1f"),a("1276"),a("b0c0"),a("96cf"),a("6d60")),o=a("88f5"),l=a("d0b4"),c=a("b570"),d=a("7812"),u={components:{OptionsComponent:r["a"],MessageInputComponent:l["a"],BackPage:c["a"],PreviewSmsComponent:d["a"]},data:function(){return{optionsShow:!1,errors:{scheduled:"",message:""},headers:[{text:"Número",value:"CELULAR"},{text:"VAR 1",value:"VAR1"},{text:"VAR 2",value:"VAR2"},{text:"VAR 3",value:"VAR3"},{text:"VAR 4",value:"VAR4"},{text:"VAR 5",value:"VAR5"},{text:"VAR 6",value:"VAR6"},{text:"VAR 7",value:"VAR7"},{text:"VAR 8",value:"VAR8"}],excelExample:[],rows:0,name:"",file:null,message:"",messageExample:"",url_id:"",long_url:"",options:{is_push:!1,scheduled:null,bidireccional:!1},isFileLoading:!1,errorMessageFile:null,fileId:null,creditToUse:0,availableCredit:0,isBtnLoading:!0}},computed:{showExample:function(){return 0!==this.excelExample.length},exampleExelComputed:function(){return this.excelExample}},methods:{calculateCreditToUse:function(){var e=this,t={message:this.message,numberOfContacts:this.rows};o["a"].post("/calculateMessageCredits",t).then((function(t){t.data.success&&(e.creditToUse=t.data.data.creditsToUse)}))},availableCreditByUser:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.calculateCreditToUse();case 2:o["a"].get("/creditsUsedByUser").then((function(t){t.data.success&&(e.availableCredit=t.data.data.availableCredit,e.isBtnLoading=!1)}));case 3:case"end":return t.stop()}}),t)})))()},onChangeOptions:function(e){this.options=e},errorFile:function(e){this.isFileLoading=!1,this.errors.file=[e]},onChangeExcel:function(e){var t=this;if(e)if(this.isFileLoading=!0,"xlsx"===e.name.split(".").pop()||"xls"===e.name.split(".").pop()){var a=new FormData;a.append("file",e),o["a"].post("/sms/upload/excelcampaing",a).then((function(e){e.data.success?(t.fileId=e.data.data.id,t.excelExample=e.data.data.example,t.rows=e.data.data.rows,t.destinatarios=t.fileUploaded,t.errorFile(null),t.errors={name:"",scheduled:"",message:"",file:""}):t.errorFile(e.data.message),t.isFileLoading=!1})).catch((function(e){t.isFileLoading=!1,t.fileId=null,t.errors=e.response.data.errors}))}else console.log("error"),this.errorFile("No es un archivo Excel")},submit:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.form.validate()&&(e.optionsShow=!0);case 1:case"end":return t.stop()}}),t)})))()},openPreviewComponent:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.availableCreditByUser();case 2:e.optionsShow=!1,e.$refs.dialogPreview.open();case 4:case"end":return t.stop()}}),t)})))()},PreviewSmsSubmit:function(){var e=this,t={service_id:1,campaign_type_id:3,name:this.$store.state.sms.name,destinations:this.$store.state.sms.file.id,message:this.message,url_id:this.url_id,options:this.options,long_url:this.long_url};o["a"].post("/campaign",t).then((function(t){t.data.success&&(e.$store.dispatch("app/showToast",t.data.message),e.$router.push({name:"reports"}))})).catch((function(t){e.$store.dispatch("app/showToast","No se pudo enviar la campaña, revise los datos ingresados"),e.errors=t.response.data.errors}))},onChangeMessage:function(e,t,a,s){this.message=e,this.messageExample=t,this.url_id=a,this.long_url=s}}},p=u,m=a("2877"),h=a("6544"),f=a.n(h),v=a("5530"),g=(a("a9e3"),a("d0cd"),a("169a")),x=g["a"].extend({name:"v-bottom-sheet",props:{inset:Boolean,maxWidth:{type:[String,Number],default:"auto"},transition:{type:String,default:"bottom-sheet-transition"}},computed:{classes:function(){return Object(v["a"])(Object(v["a"])({},g["a"].options.computed.classes.call(this)),{},{"v-bottom-sheet":!0,"v-bottom-sheet--inset":this.inset})}}}),b=a("8336"),w=a("b0af"),C=a("99d9"),V=a("62ad"),R=a("8fea"),S=a("4bd4"),_=a("132d"),A=a("0fd9"),E=a("2fa4"),y=Object(m["a"])(p,s,n,!1,null,null,null);t["default"]=y.exports;f()(y,{VBottomSheet:x,VBtn:b["a"],VCard:w["a"],VCardActions:C["a"],VCardText:C["c"],VCol:V["a"],VDataTable:R["a"],VForm:S["a"],VIcon:_["a"],VRow:A["a"],VSpacer:E["a"]})},d0cd:function(e,t,a){}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c2305"],{"48f1":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"d-flex flex-column flex-grow-1"},[a("div",{staticClass:"d-flex align-center pb-3"},[e._m(0),a("v-spacer"),a("v-spacer"),a("BackPage",{attrs:{to:"services"}})],1),a("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(t){return t.preventDefault(),e.submit.apply(null,arguments)}}},[a("v-card",{attrs:{outlined:""}},[a("v-card-text",[a("v-col",{staticClass:"pt-0"},[a("v-data-table",{attrs:{headers:e.headers,items:e.$store.state.sms.file.example,"items-per-page":5,"hide-default-footer":""}})],1),a("Message-Input-Component",{attrs:{"is-agenda":!1,"example-item":e.$store.state.sms.file.example,errors:e.errors,vars:e.vars},on:{onChangeMessage:e.onChangeMessage}})],1),a("v-card-actions",[a("v-row",{attrs:{justify:"center"}},[a("v-btn",{attrs:{color:"primary",dark:"",type:"submit"}},[e._v(" Siguiente "),a("v-icon",[e._v(" mdi-chevron-right ")])],1)],1)],1)],1),[a("div",{staticClass:"text-center"},[a("v-bottom-sheet",{attrs:{inset:""},model:{value:e.optionsShow,callback:function(t){e.optionsShow=t},expression:"optionsShow"}},[a("Options-Component",{staticClass:"ml-3",attrs:{errors:e.errors},on:{onChange:e.onChangeOptions,onSubmit:e.openPreviewComponent}})],1)],1)]],2),a("PreviewSmsComponent",{ref:"dialogPreview",attrs:{options:e.options,messageExample:e.messageExample,registers:e.$store.state.sms.file.rows,"is-excel":!0,"is-btn-loading":e.isBtnLoading,"credit-to-use":e.creditToUse,"available-credit":e.availableCredit},on:{onPreviewSmsSubmit:e.PreviewSmsSubmit}})],1)},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"display-1"},[e._v("SMS Agenda")])])}],r=a("1da1"),i=(a("b0c0"),a("96cf"),a("6d60")),o=a("88f5"),l=a("d0b4"),c=a("b570"),u=a("7812"),m={components:{OptionsComponent:i["a"],MessageInputComponent:l["a"],BackPage:c["a"],PreviewSmsComponent:u["a"]},data:function(){return{vars:[{text:"NOMBRE1",value:"name1"},{text:"NOMBRE2",value:"name2"},{text:"APELLIDO1",value:"last_name1"},{text:"APELLIDO2",value:"last_name2"},{text:"EMAIL",value:"email"},{text:"VAR1",value:"var1"},{text:"VAR2",value:"var2"},{text:"VAR3",value:"var3"},{text:"VAR4",value:"var4"}],optionsShow:!1,errors:{scheduled:"",message:""},headers:[{text:"Número",value:"number"},{text:"Nombre 1",value:"name1"},{text:"Nombre 2",value:"name2"},{text:"Email+",value:"email"},{text:"Apellido 1",value:"last_name1"},{text:"Apellido 2",value:"last_name2"},{text:"VAR1",value:"var1"},{text:"VAR2",value:"var2"},{text:"VAR3",value:"var3"},{text:"VAR4",value:"var4"}],name:"",file:null,message:"",messageExample:"",url_id:"",long_url:"",options:{is_push:!1,scheduled:null,bidireccional:!1},isFileLoading:!1,errorMessageFile:null,creditToUse:0,availableCredit:0,isBtnLoading:!0}},computed:{showExample:function(){return 0!==this.excelExample.length},exampleExelComputed:function(){return this.excelExample}},methods:{calculateCreditToUse:function(){var e=this,t={message:this.message,numberOfContacts:this.rows};o["a"].post("/calculateMessageCredits",t).then((function(t){t.data.success&&(e.creditToUse=t.data.data.creditsToUse)}))},availableCreditByUser:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.calculateCreditToUse();case 2:o["a"].get("/creditsUsedByUser").then((function(t){t.data.success&&(e.availableCredit=t.data.data.availableCredit,e.isBtnLoading=!1)}));case 3:case"end":return t.stop()}}),t)})))()},onChangeOptions:function(e){this.options=e},openPreviewComponent:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.availableCreditByUser();case 2:e.optionsShow=!1,e.$refs.dialogPreview.open();case 4:case"end":return t.stop()}}),t)})))()},PreviewSmsSubmit:function(){var e=this,t={service_id:1,campaign_type_id:3,name:this.$store.state.sms.name,destinations:this.$store.state.sms.file.id,message:this.message,url_id:this.url_id,options:this.options,long_url:this.long_url};o["a"].post("/campaign",t).then((function(t){t.data.success&&(e.$store.dispatch("app/showToast",t.data.message),e.$router.push({name:"reports"}))})).catch((function(t){e.$store.dispatch("app/showToast","No se pudo enviar la campaña, revise los datos ingresados"),e.errors=t.response.data.errors}))},onChangeMessage:function(e,t,a,s){this.message=e,this.messageExample=t,this.url_id=a,this.long_url=s},submit:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.form.validate()&&(e.optionsShow=!0);case 1:case"end":return t.stop()}}),t)})))()}}},d=m,p=a("2877"),v=a("6544"),h=a.n(v),g=a("288c"),f=a("8336"),x=a("b0af"),b=a("99d9"),w=a("62ad"),C=a("8fea"),_=a("4bd4"),S=a("132d"),V=a("0fd9"),R=a("2fa4"),E=Object(p["a"])(d,s,n,!1,null,null,null);t["default"]=E.exports;h()(E,{VBottomSheet:g["a"],VBtn:f["a"],VCard:x["a"],VCardActions:b["a"],VCardText:b["c"],VCol:w["a"],VDataTable:C["a"],VForm:_["a"],VIcon:S["a"],VRow:V["a"],VSpacer:R["a"]})}}]);
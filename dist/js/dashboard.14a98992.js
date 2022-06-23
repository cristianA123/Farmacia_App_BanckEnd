(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboard"],{"1e94":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex flex-grow-1 flex-column"},[a("div",{staticClass:"d-flex justify-space-between align-content-center mb-1"},[a("div",{staticClass:"display-1"},[t._v("Dashboard")]),a("v-spacer"),a("v-btn",{staticClass:"mx-2",attrs:{depressed:"",outlined:"",color:"primary",loading:t.loadingSendPdfByEmail},on:{click:t.sendPdfByEmail}},[a("v-icon",[t._v("mdi-share-all-outline")])],1),a("v-btn",{attrs:{outlined:"",color:"primary",loading:t.loadingDownloadPdf},on:{click:t.downloadPdf}},[a("v-icon",[t._v("mdi-progress-download")])],1)],1),a("v-row",{staticClass:"flex-grow-0",attrs:{id:"dashBoard",dense:""}},[a("InitialCreditComponent",{attrs:{credit:t.credits.credit,"is-loading":t.isLoading}}),a("AvailableCreditComponent",{attrs:{"available-credit":t.credits.availableCredit,credits:t.credits,"is-loading":t.isLoading}}),a("ServiceCreditComponent",{attrs:{credits:t.credits,"is-loading":t.isLoading}})],1)],1)},r=[],o=a("1da1"),s=(a("96cf"),a("b0c0"),a("d3b7"),a("88f5")),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-col",{attrs:{cols:"12",lg:"6"}},[a("v-card",{attrs:{dark:"",color:"teal",height:"270px"}},[a("v-card-title",[t._v(" Crédito inicial ")]),a("v-card-text",[a("v-col",{staticClass:"d-flex justify-center"},[t.isLoading?a("div",[a("v-progress-circular",{attrs:{size:50,indeterminate:""}})],1):a("div",[a("div",{staticClass:"text-h1"},[t._v(" "+t._s(t._f("formatCurrency")(t.credit,t.configFormat))+" ")]),a("div",{staticClass:"d-flex justify-end"},[a("span",[t._v("Créditos")])])])])],1)],1)],1)},d=[],c=(a("a9e3"),{props:{isLoading:{type:Boolean,default:!1},credit:{type:Number,default:0}},computed:{configFormat:function(){return{decimalDigits:0,decimalSeparator:".",thousandsSeparator:",",currencySymbol:"",currencySymbolNumberOfSpaces:0,currencySymbolPosition:"left"}}}}),l=c,u=a("2877"),v=a("6544"),f=a.n(v),g=a("b0af"),m=a("99d9"),p=a("62ad"),h=a("490a"),_=Object(u["a"])(l,n,d,!1,null,null,null),C=_.exports;f()(_,{VCard:g["a"],VCardText:m["c"],VCardTitle:m["d"],VCol:p["a"],VProgressCircular:h["a"]});var y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-col",{attrs:{cols:"12",lg:"6"}},[a("v-card",{attrs:{height:"270px"},on:{click:t.detailAvailableCredit}},[a("v-card-title",[t._v(" Crédito disponible ")]),a("v-card-text",[a("v-col",{staticClass:"d-flex justify-center"},[t.isLoading?a("div",[a("v-progress-circular",{attrs:{size:50,indeterminate:""}})],1):a("div",[a("div",{staticClass:"text-h1"},[t._v(" "+t._s(t._f("formatCurrency")(t.availableCredit,t.configFormat))+" ")]),a("div",{staticClass:"d-flex justify-end"},[a("span",[t._v("Créditos")])])])])],1)],1),a("v-dialog",{attrs:{width:"300px"},model:{value:t.diaglog,callback:function(e){t.diaglog=e},expression:"diaglog"}},[a("v-card",[a("v-card-title",[t._v("Detalle de créditos")]),a("v-card-text",[a("table",[a("tr",[a("td",{staticStyle:{width:"100%"}},[a("strong",[t._v("Inicial:")])]),a("td",{staticStyle:{"text-align":"right"}},[t._v(t._s(t._f("formatCurrency")(t.credits.credit,t.configFormat)))]),a("td",[t._v("-")])]),a("tr",[a("td",{staticStyle:{width:"300px"}},[a("strong",[t._v("Sub-usuarios:")])]),a("td",{staticStyle:{"text-align":"right"}},[t._v(t._s(t._f("formatCurrency")(t.assignedCredits,t.configFormat)))])]),a("tr",[a("td",{staticStyle:{width:"300px"}},[a("strong",[t._v("Mi usuario:")])]),a("td",{staticStyle:{"text-align":"right"}},[t._v(t._s(t._f("formatCurrency")(t.credits.sms_cost+t.credits.ivr_cost,t.configFormat)))])]),a("tr",[a("td"),a("td",[t._v("_________")])]),a("tr",[a("td",{staticStyle:{width:"300px"}},[a("strong",[t._v("Disponible:")])]),a("td",{staticStyle:{"text-align":"right"}},[t._v(t._s(t._f("formatCurrency")(t.credits.availableCredit,t.configFormat)))])])])]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{text:""}},[t._v("Más detalle")]),a("v-btn",{attrs:{text:""},on:{click:function(e){t.diaglog=!1}}},[t._v("Entiendo")])],1)],1)],1)],1)},b=[],x=(a("159b"),{props:{credits:{type:Object,default:function(){}},isLoading:{type:Boolean,default:!1},availableCredit:{type:Number,default:0}},data:function(){return{diaglog:!1,assignedCredits:0}},computed:{configFormat:function(){return{decimalDigits:0,decimalSeparator:".",thousandsSeparator:",",currencySymbol:"",currencySymbolNumberOfSpaces:0,currencySymbolPosition:"left"}}},mounted:function(){this.getUsers()},methods:{detailAvailableCredit:function(){this.diaglog=!0},getUsers:function(){var t=this;s["a"].get("/user").then((function(e){if(e.data.success){var a=e.data.data;a.forEach((function(e){t.assignedCredits=t.assignedCredits+e.credit}))}}))}}}),S=x,w=a("8336"),D=a("169a"),E=a("2fa4"),V=Object(u["a"])(S,y,b,!1,null,null,null),P=V.exports;f()(V,{VBtn:w["a"],VCard:g["a"],VCardActions:m["a"],VCardText:m["c"],VCardTitle:m["d"],VCol:p["a"],VDialog:D["a"],VProgressCircular:h["a"],VSpacer:E["a"]});var A=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-col",{attrs:{cols:"12",lg:"3",xl:"3"}},[a("v-card",{attrs:{height:"200px",color:"light-blue darken-4",dark:""}},[a("v-card-title",[t._v(" Crédito "+t._s(t.service)+" consumido ")]),a("v-card-text",[a("v-col",{staticClass:"d-flex justify-center"},[t.isLoading?a("div",[a("v-progress-circular",{attrs:{size:50,indeterminate:""}})],1):a("div",[a("div",{staticClass:"text-h3"},[t._v(" "+t._s(t._f("formatCurrency")(t.credits.sms_cost+t.credits.ivr_cost,t.configFormat))+" ")]),a("div",{staticClass:"d-flex justify-end"},[a("span",[t._v("Créditos")])])])])],1)],1),a("v-dialog",{attrs:{width:"800px"},model:{value:t.dialogDetailAvailableCredit,callback:function(e){t.dialogDetailAvailableCredit=e},expression:"dialogDetailAvailableCredit"}},[a("v-card",[a("v-card-title",[t._v("Detalle de créditos")]),a("v-card-text",[a("table",[a("tr",[a("td",[t._v("Crédito inicial:")]),a("td",[t._v("sd -")])]),a("tr",[a("td",[t._v("Crédito asignado a sub-usuarios:")]),a("td",[t._v("sd")])]),a("tr",[a("td",[t._v("Crédito utilizado por mi usuario:")]),a("td",[t._v("sd")])]),t._v(" ______________ "),a("tr",[a("td",[t._v("Crédito disponible:")]),a("td",[t._v("sd")])])])]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{text:""}},[t._v("Más detalle")]),a("v-btn",{attrs:{text:""}},[t._v("Entiendo")])],1)],1)],1)],1)},O=[],k={props:{service:{type:String,default:function(){return""}},isLoading:{type:Boolean,default:!1},credits:{type:Object,default:function(){}}},data:function(){return{dialogDetailAvailableCredit:!1}},computed:{configFormat:function(){return{decimalDigits:0,decimalSeparator:".",thousandsSeparator:",",currencySymbol:"",currencySymbolNumberOfSpaces:0,currencySymbolPosition:"left"}}}},B=k,F=Object(u["a"])(B,A,O,!1,null,null,null),R=F.exports;f()(F,{VBtn:w["a"],VCard:g["a"],VCardActions:m["a"],VCardText:m["c"],VCardTitle:m["d"],VCol:p["a"],VDialog:D["a"],VProgressCircular:h["a"],VSpacer:E["a"]});var $=a("8baf"),j=a("c0e9"),L=a.n(j),M=a("c1df"),T=a.n(M);T.a.locale("es");var U={components:{InitialCreditComponent:C,AvailableCreditComponent:P,ServiceCreditComponent:R},data:function(){return{isLoading:!1,credits:{credit:0,availableCredit:0},loadingDownloadPdf:!1,loadingSendPdfByEmail:!1}},computed:{theme:function(){return this.$vuetify.theme.isDark?this.$vuetify.theme.defaults.dark:this.$vuetify.theme.defaults.light},configFormat:function(){return{decimalDigits:0,decimalSeparator:".",thousandsSeparator:",",currencySymbol:"",currencySymbolNumberOfSpaces:0,currencySymbolPosition:"left"}}},mounted:function(){this.getCreditsUsedByUser()},methods:{getCreditsUsedByUser:function(){var t=this;this.isLoading=!0,s["a"].get("/creditsUsedByUser").then((function(e){e.data.success&&(t.credits=e.data.data,t.isLoading=!1)}))},downloadPdf:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loadingDownloadPdf=!0,a={scale:3},e.next=4,L()(document.getElementById("dashBoard"),a).then((function(t){var e=t.toDataURL("image/png"),a=new $["a"]("p","pt","a4"),i=25,r=135,o=a.getImageProperties(e),s=a.internal.pageSize.getWidth()-2*i,n=o.height*s/o.width,d=16;a.setFontSize(d);var c={align:"center",font:"helvetica"};a.text("Dashboard",s/2,40,c),a.setFontSize(12),a.text("FECHA Y HORA: "+T()().format("MMMM Do YYYY, h:mm:ss a"),25,65),a.text("DATOS DEL USUARIO:",25,80),a.text("NOMBRE: "+$cookies.get("user").name,25,95),a.text("CORREO: "+$cookies.get("user").email,25,110),a.text("CAMPAÑIA: "+$cookies.get("user").company,25,125),a.addImage(e,"JPEG",i,r,s,n,void 0,"FAST"),a.save("Reporte de campaña.pdf")}));case 4:t.loadingDownloadPdf=!1;case 5:case"end":return e.stop()}}),e)})))()},sendPdfByEmail:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loadingSendPdfByEmail=!0,a={scale:3},e.next=4,L()(document.getElementById("dashBoard"),a).then((function(e){var a=e.toDataURL("image/png"),i=new $["a"]("p","pt","a4"),r=25,o=135,s=i.getImageProperties(a),n=i.internal.pageSize.getWidth()-2*r,d=s.height*n/s.width,c=16;i.setFontSize(c);var l={align:"center",font:"helvetica"};i.text("Dashboard",n/2,40,l),i.setFontSize(11),i.text("FECHA Y HORA: "+T()().format("MMMM Do YYYY, h:mm:ss a"),25,65),i.setFontSize(12),i.text("DATOS DEL USUARIO:",25,80),i.setFontSize(11),i.text("NOMBRE: "+$cookies.get("user").name,25,95),i.text("CORREO: "+$cookies.get("user").email,25,110),i.text("EMPRESA: "+$cookies.get("user").company,25,125),i.addImage(a,"JPEG",r,o,n,d,void 0,"FAST");var u=new FormData;u.append("file",i.output("blob"));fetch("http://localhost:8000/api/send_email",{method:"POST",body:u,headers:{Authorization:"Bearer "+$cookies.get("token")}}).then((function(t){return t.json()})).then((function(e){e.success?t.$store.dispatch("app/showToast","Correo enviado"):t.$store.dispatch("app/showToast","Error al enviar correo")})).catch((function(e){t.$store.dispatch("app/showToast","Error al enviar correo")}))}));case 4:t.loadingSendPdfByEmail=!1;case 5:case"end":return e.stop()}}),e)})))()}}},z=U,I=a("132d"),Y=a("0fd9"),N=Object(u["a"])(z,i,r,!1,null,null,null);e["default"]=N.exports;f()(N,{VBtn:w["a"],VIcon:I["a"],VRow:Y["a"],VSpacer:E["a"]})}}]);
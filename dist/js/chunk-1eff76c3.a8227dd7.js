(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1eff76c3"],{"17b3":function(t,e,a){},"891e":function(t,e,a){"use strict";var n=a("2909"),i=a("5530"),r=(a("a9e3"),a("99af"),a("d3b7"),a("25f0"),a("d81d"),a("17b3"),a("9d26")),s=a("dc22"),o=a("a9ad"),l=a("de2c"),c=a("7560"),u=a("58df");e["a"]=Object(u["a"])(o["a"],Object(l["a"])({onVisible:["init"]}),c["a"]).extend({name:"v-pagination",directives:{Resize:s["b"]},props:{circle:Boolean,disabled:Boolean,length:{type:Number,default:0,validator:function(t){return t%1===0}},nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},totalVisible:[Number,String],value:{type:Number,default:0},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},wrapperAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.wrapper"}},data:function(){return{maxButtons:0,selected:null}},computed:{classes:function(){return Object(i["a"])({"v-pagination":!0,"v-pagination--circle":this.circle,"v-pagination--disabled":this.disabled},this.themeClasses)},items:function(){var t=parseInt(this.totalVisible,10);if(0===t)return[];var e=Math.min(Math.max(0,t)||this.length,Math.max(0,this.maxButtons)||this.length,this.length);if(this.length<=e)return this.range(1,this.length);var a=e%2===0?1:0,i=Math.floor(e/2),r=this.length-i+1+a;if(this.value>i&&this.value<r){var s=1,o=this.length,l=this.value-i+2,c=this.value+i-2-a,u=l-1===s+1?2:"...",d=c+1===o-1?c+1:"...";return[1,u].concat(Object(n["a"])(this.range(l,c)),[d,this.length])}if(this.value===i){var p=this.value+i-1-a;return[].concat(Object(n["a"])(this.range(1,p)),["...",this.length])}if(this.value===r){var h=this.value-i+1;return[1,"..."].concat(Object(n["a"])(this.range(h,this.length)))}return[].concat(Object(n["a"])(this.range(1,i)),["..."],Object(n["a"])(this.range(r,this.length)))}},watch:{value:function(){this.init()}},mounted:function(){this.init()},methods:{init:function(){var t=this;this.selected=null,this.$nextTick(this.onResize),setTimeout((function(){return t.selected=t.value}),100)},onResize:function(){var t=this.$el&&this.$el.parentElement?this.$el.parentElement.clientWidth:window.innerWidth;this.maxButtons=Math.floor((t-96)/42)},next:function(t){t.preventDefault(),this.$emit("input",this.value+1),this.$emit("next")},previous:function(t){t.preventDefault(),this.$emit("input",this.value-1),this.$emit("previous")},range:function(t,e){var a=[];t=t>0?t:1;for(var n=t;n<=e;n++)a.push(n);return a},genIcon:function(t,e,a,n,i){return t("li",[t("button",{staticClass:"v-pagination__navigation",class:{"v-pagination__navigation--disabled":a},attrs:{disabled:a,type:"button","aria-label":i},on:a?{}:{click:n}},[t(r["a"],[e])])])},genItem:function(t,e){var a=this,n=e===this.value&&(this.color||"primary"),i=e===this.value,r=i?this.currentPageAriaLabel:this.pageAriaLabel;return t("button",this.setBackgroundColor(n,{staticClass:"v-pagination__item",class:{"v-pagination__item--active":e===this.value},attrs:{type:"button","aria-current":i,"aria-label":this.$vuetify.lang.t(r,e)},on:{click:function(){return a.$emit("input",e)}}}),[e.toString()])},genItems:function(t){var e=this;return this.items.map((function(a,n){return t("li",{key:n},[isNaN(Number(a))?t("span",{class:"v-pagination__more"},[a.toString()]):e.genItem(t,a)])}))},genList:function(t,e){return t("ul",{directives:[{modifiers:{quiet:!0},name:"resize",value:this.onResize}],class:this.classes},e)}},render:function(t){var e=[this.genIcon(t,this.$vuetify.rtl?this.nextIcon:this.prevIcon,this.value<=1,this.previous,this.$vuetify.lang.t(this.previousAriaLabel)),this.genItems(t),this.genIcon(t,this.$vuetify.rtl?this.prevIcon:this.nextIcon,this.value>=this.length,this.next,this.$vuetify.lang.t(this.nextAriaLabel))];return t("nav",{attrs:{role:"navigation","aria-label":this.$vuetify.lang.t(this.wrapperAriaLabel)}},[this.genList(t,e)])}})},b570:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex align-center"},[a("v-btn",{staticClass:"mx-0 px-0 text",attrs:{text:"",loading:t.isLoading},on:{click:function(e){return t.backTo()}}},[a("v-icon",[t._v("mdi-chevron-left")]),t._v(" Regresar ")],1)],1)},i=[],r={props:{to:{type:String,default:""}},data:function(){return{isLoading:!1}},mounted:function(){this.isLoading=!1},methods:{backTo:function(){this.$router.push({name:this.to}),this.isLoading=!0}}},s=r,o=a("2877"),l=a("6544"),c=a.n(l),u=a("8336"),d=a("132d"),p=Object(o["a"])(s,n,i,!1,null,null,null);e["a"]=p.exports;c()(p,{VBtn:u["a"],VIcon:d["a"]})},e23c:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex flex-column flex-grow-1",attrs:{id:"hola"}},[a("div",{staticClass:"d-flex align-center py-3"},[t._m(0),a("v-spacer"),a("v-btn",{attrs:{outlined:"",color:"primary",loading:t.loadingDownloadPdf},on:{click:t.descargarExcel}},[a("v-icon",[t._v("mdi-progress-download")])],1),a("BackPage",{staticClass:"ml-2",attrs:{to:"reports"}})],1),a("v-row",[a("v-col",{attrs:{cols:"12",xs:"12",sm:"6",lg:"4"}},[a("CampaignDetailCardComponent",{attrs:{"data-campaign":t.dataCampaign}})],1),a("v-col",{attrs:{cols:"12",xs:"12",sm:"6",lg:"4"}},[a("CampaignMetricsdCardComponent")],1),a("v-col",{attrs:{cols:"12",xs:"12",sm:"6",lg:"4"}},[a("CampaignProgressComponent")],1)],1),a("DetailCampaignComponent",{ref:"detailCampaignComponent",attrs:{campaigns:t.campaigns,headers:t.headersForTable,registers:t.registers,pagination:t.pagination},on:{ongetSms:t.ongetSms}})],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"display-1"},[t._v("Reporte de servicios")])])}],r=a("2909"),s=a("1da1"),o=(a("96cf"),a("ac1f"),a("841c"),a("5e85")),l=a.n(o),c=a("8baf"),u=a("c0e9"),d=a.n(u),p=a("88f5"),h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",[a("v-card-title",[t._v(" Resultados: "),a("v-spacer"),a("v-text-field",{directives:[{name:"debounce",rawName:"v-debounce:250",value:t.ongetSms,expression:"ongetSms",arg:"250"}],staticClass:"flex-grow-1 mr-md-2",attrs:{"append-icon":"mdi-magnify",dense:"",clearable:"",placeholder:"Ej.: Filtrar por name, email, empresa, etc"},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}})],1),a("v-card-text",[a("v-data-table",{attrs:{headers:t.headers,items:t.campaigns,"hide-default-footer":""},scopedSlots:t._u([{key:"item.times_open",fn:function(e){var a=e.item;return[t._v(" "+t._s(a.times_open?"APERTURADO":"NO APERTURADO")+" ")]}},{key:"item.actions",fn:function(e){var n=e.item;return[a("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.attrs,i=e.on;return[a("v-btn",t._g(t._b({},"v-btn",n,!1),i),[t._v(" Acciones ")])]}}],null,!0)},[a("v-list",[a("v-list-item",{attrs:{link:""},on:{click:function(e){return t.openDialogCreate(n)}}},[t._v(" Modificar ")])],1)],1)]}}],null,!0)},[a("p",[t._v(t._s(t.campaigns))])]),a("v-pagination",{attrs:{length:t.pagination.total},on:{input:t.ongetSms},model:{value:t.pagination.current,callback:function(e){t.$set(t.pagination,"current",e)},expression:"pagination.current"}})],1)],1)},m=[],g={name:"DetailCampaignComponent",props:{pagination:{type:Object,default:function(){return{}}},campaigns:{type:Array,default:function(){return{}}},hasUrl:{type:Boolean,default:!0},headers:{type:Array,default:null}},data:function(){return{campaign_id:null,searchText:"",service_id:null}},mounted:function(){this.ongetSms()},methods:{ongetSms:function(){this.$emit("ongetSms",this.searchText)}}},v=g,f=a("2877"),b=a("6544"),_=a.n(b),C=a("8336"),x=a("b0af"),y=a("99d9"),w=a("8fea"),S=a("8860"),O=a("da13"),k=a("e449"),$=a("891e"),D=a("2fa4"),V=a("8654"),A=Object(f["a"])(v,h,m,!1,null,null,null),L=A.exports;_()(A,{VBtn:C["a"],VCard:x["a"],VCardText:y["c"],VCardTitle:y["d"],VDataTable:w["a"],VList:S["a"],VListItem:O["a"],VMenu:k["a"],VPagination:$["a"],VSpacer:D["a"],VTextField:V["a"]});var R=a("b570"),T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-card",{attrs:{color:"light-blue darken-4",dark:""}},[a("v-card-title",[t._v("Campaña:")]),a("v-card-text",[a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[t._v("USUARIO:")]),a("v-list-item-subtitle",[t._v(t._s(t.getNameUser)+" "+t._s(t.getNameCompany))])],1)],1),a("v-divider"),a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[t._v("NOMBRE DE CAMPAÑA:")]),a("v-list-item-subtitle",[t._v(t._s(t.getNameCampaign))]),a("v-list-item-title",[t._v("TIPO:")]),a("v-list-item-subtitle",[t._v(t._s(t.getTypeCampaign))])],1)],1),a("v-divider"),a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[t._v("FECHA Y HORA:")]),a("v-list-item-subtitle",[t._v(t._s(t.getDate))])],1)],1)],1)],1)],1)},j=[],E=(a("b0c0"),a("c1df")),P=a.n(E);P.a.locale("es");var I={props:{dataCampaign:{type:Object,default:function(){return{name:"",updated_at:""}}}},data:function(){return{allSmsOfCampaing:[],showChartProgress:!1,seriesProgress:[],chartOptionsProgress:{colors:["#00b0ff","#9e9e9e"],labels:["ENVIADOS","PROCESANDO"],chart:{type:"donut"},responsive:[{breakpoint:337,options:{chart:{width:200},legend:{position:"bottom"}}}]},showChartDeliverability:!0,seriesDeliverability:[],chartOptionsDeliverability:{colors:["#59CE8F","#FF1E00"],labels:[" Enviados","Rechazados"],chart:{type:"pie"},responsive:[{breakpoint:337,options:{chart:{width:100},legend:{position:"bottom"}}}]}}},computed:{getNameUser:function(){var t,e;return(null===(t=this.dataCampaign)||void 0===t||null===(e=t.user)||void 0===e?void 0:e.name)||""},getNameCompany:function(){var t,e,a,n;return null!==(t=this.dataCampaign)&&void 0!==t&&null!==(e=t.company)&&void 0!==e&&e.company?"("+(null===(a=this.dataCampaign)||void 0===a||null===(n=a.company)||void 0===n?void 0:n.company)+")":""},getNameCampaign:function(){var t,e;return(null===(t=this.dataCampaign)||void 0===t||null===(e=t.campaing)||void 0===e?void 0:e.name)||""},getTypeCampaign:function(){var t,e;return(null===(t=this.dataCampaign)||void 0===t||null===(e=t.type_company)||void 0===e?void 0:e.name)||""},getDate:function(){var t,e;return P()(null===(t=this.dataCampaign)||void 0===t||null===(e=t.campaing)||void 0===e?void 0:e.updated_at).format("Y-M-D H:M:S")||""}},created:function(){this.getAllSmsByCampaing()},mounted:function(){this.showChartDeliverability=!0,this.showChartProgress=!0},methods:{getAllSmsByCampaing:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={campaign_id:t.$route.params.campaign_id,service_id:1,searchtext:""},e.next=3,p["a"].post("/dashBoardProgress",a).then((function(e){e.data.success&&(t.seriesProgress.push(e.data.data.progress_sms),t.seriesProgress.push(e.data.data.progress_resto),t.seriesDeliverability.push(e.data.data.count_status_delivered),t.seriesDeliverability.push(e.data.data.count_status_rejected))}));case 3:case"end":return e.stop()}}),e)})))()},progress:function(){}}},B=I,N=a("ce7e"),M=a("5d23"),F=Object(f["a"])(B,T,j,!1,null,null,null),z=F.exports;_()(F,{VCard:x["a"],VCardText:y["c"],VCardTitle:y["d"],VDivider:N["a"],VListItem:O["a"],VListItemContent:M["b"],VListItemSubtitle:M["c"],VListItemTitle:M["d"]});var U=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-card",[a("v-card-title",[t._v("Métrica")]),a("v-card-text",[t.showChart?a("div",[a("apexchart",{key:t.total,attrs:{type:"radialBar",height:"250",options:t.chartOptions,series:t.series}})],1):t._e()])],1)],1)},H=[];P.a.locale("es");var J={props:{},data:function(){var t=this;return{dd:1,total:10,showChart:!1,series:[],chartOptions:{chart:{height:250,type:"radialBar"},plotOptions:{radialBar:{dataLabels:{name:{fontSize:"27px"},value:{fontSize:"16px"},total:{show:!0,label:"Destinatarios",formatter:function(){return(new Intl.NumberFormat).format(t.total)}}}}},labels:["Procesando","Entregados","Aperturados"]}}},computed:{configFormat:function(){return{decimalDigits:0,decimalSeparator:".",thousandsSeparator:",",currencySymbol:"",currencySymbolNumberOfSpaces:0,currencySymbolPosition:"left"}}},created:function(){this.getAllSmsByCampaing()},mounted:function(){this.showChart=!0},methods:{getAllSmsByCampaing:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={campaign_id:t.$route.params.campaign_id,service_id:1,searchtext:""},e.next=3,p["a"].post("/dashBoardMetrics",a).then((function(e){var a=e.data;a.success&&(t.series.push(a.data.processing),t.series.push(a.data.delivered),a.data.opened>=0&&t.series.push(a.data.opened),t.total=a.data.total)}));case 3:case"end":return e.stop()}}),e)})))()},progress:function(){}}},W=J,X=Object(f["a"])(W,U,H,!1,null,null,null),Y=X.exports;_()(X,{VCard:x["a"],VCardText:y["c"],VCardTitle:y["d"]});var q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-card",[a("v-card-title",[t._v("Progreso")]),a("v-card-text",[t.showChart?a("div",[a("apexchart",{key:t.dd,attrs:{type:"area",height:"228",options:t.chartOptionsSpark3,series:t.series}})],1):t._e()])],1)],1)},G=[],K=(a("159b"),{data:function(){return{series:[],data:[],showChart:!1,chartOptionsSpark3:{chart:{type:"area",height:0,sparkline:{enabled:!0}},stroke:{curve:"smooth"},fill:{opacity:.3},xaxis:{crosshairs:{width:0}},yaxis:{min:0},title:{text:"",offsetX:0,style:{fontSize:"24px"}},subtitle:{text:"",offsetX:0,style:{fontSize:"14px"}}}}},mounted:function(){this.showChart=!0},created:function(){this.getAllSmsByCampaing()},methods:{getAllSmsByCampaing:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={campaign_id:t.$route.params.campaign_id,service_id:1,searchtext:""},e.next=3,p["a"].post("/dashBoardProgress",a).then((function(e){var a=e.data;a.success&&(a.data.forEach((function(e){t.data.push(e.sms_by_minute)})),t.series.push({data:t.data}))}));case 3:case"end":return e.stop()}}),e)})))()},progress:function(){}}}),Q=K,Z=Object(f["a"])(Q,q,G,!1,null,null,null),tt=Z.exports;_()(Z,{VCard:x["a"],VCardText:y["c"],VCardTitle:y["d"]});var et={name:"DetailSmsReport",components:{CampaignDetailCardComponent:z,CampaignMetricsdCardComponent:Y,DetailCampaignComponent:L,CampaignProgressComponent:tt,BackPage:R["a"]},data:function(){return{dataCampaign:null,registers:0,excelprueba:null,loadingDownloadPdf:!1,has_url:!0,campaigns:[],pagination:{current:1,total:0},allSmsOfCampaing:[],search:"",isLoadingDownload:!1}},computed:{changedSearch:function(){return this.search},headersForTable:function(){return this.has_url?[{text:"Telefono",value:"phone"},{text:"Mensaje",value:"content"},{text:"Fecha",value:"created"},{text:"Link",value:"times_open"},{text:"Credito",value:"credit"},{text:"Estado",value:"status"}]:[{text:"Telefono",value:"phone"},{text:"Mensaje",value:"content"},{text:"Fecha",value:"created"},{text:"Credito",value:"credit"},{text:"Estado",value:"status"}]}},created:function(){this.getCampaing()},mounted:function(){this.ongetSms()},methods:{file_to_json:function(){},getCampaing:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p["a"].get("/campaign/"+t.$route.params.campaign_id).then((function(e){e.data.success&&(t.dataCampaign=e.data.data,t.registers=e.data.data.registers)}));case 2:case"end":return e.stop()}}),e)})))()},ongetSms:function(t){var e=this;this.search=t;var a={campaign_id:this.$route.params.campaign_id,service_id:1,searchtext:t};""!==t&&(this.pagination.current=1),p["a"].post("/smsCampaignDetail?page="+this.pagination.current,a).then((function(t){t.data.success&&(e.campaigns=t.data.data.data,e.pagination.current=t.data.data.current_page,e.pagination.total=t.data.data.last_page,null===t.data.data.data[0].url_id&&null===t.data.data.data[0].long_url&&(e.has_url=!1))}))},descargarExcel:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.isLoadingDownload=!0,a={campaign_id:t.$route.params.campaign_id,service_id:1,searchtext:""},e.next=4,p["a"].post("/smsCampaignDetailAll",a).then((function(e){e.data.success&&(t.allSmsOfCampaing=e.data.data)}));case 4:n=[{sheet:"Sms",columns:[{label:"Telefono",value:"phone"},{label:"Mensaje",value:"content"},{label:"Fecha programada",value:"scheduled"},{label:"Estado",value:"status"}],content:Object(r["a"])(t.allSmsOfCampaing)}],i={sheetName:"Sms",fileName:"Reporte de campaña"},l()(n,i),t.isLoadingDownload=!1;case 8:case"end":return e.stop()}}),e)})))()},downloadPdf:function(){return Object(s["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e={background:"white",scale:3},d()(document.getElementById("dashboarDetail"),e).then((function(t){var e=t.toDataURL("image/png"),a=new c["a"]("p","pt","a4"),n=15,i=15,r=a.getImageProperties(e),s=a.internal.pageSize.getWidth()-2*n,o=r.height*s/r.width;a.addImage(e,"JPEG",n,i,s,o,void 0,"FAST"),a.save("Reporte de campaña.pdf")}));case 2:case"end":return t.stop()}}),t)})))()}}},at=et,nt=a("62ad"),it=a("132d"),rt=a("0fd9"),st=Object(f["a"])(at,n,i,!1,null,null,null);e["default"]=st.exports;_()(st,{VBtn:C["a"],VCol:nt["a"],VIcon:it["a"],VRow:rt["a"],VSpacer:D["a"]})}}]);
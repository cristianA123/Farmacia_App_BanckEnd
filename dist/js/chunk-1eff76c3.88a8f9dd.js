(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1eff76c3"],{"17b3":function(t,e,a){},"891e":function(t,e,a){"use strict";var i=a("2909"),n=a("5530"),s=(a("a9e3"),a("99af"),a("d3b7"),a("25f0"),a("d81d"),a("17b3"),a("9d26")),r=a("dc22"),o=a("a9ad"),l=a("de2c"),c=a("7560"),u=a("58df");e["a"]=Object(u["a"])(o["a"],Object(l["a"])({onVisible:["init"]}),c["a"]).extend({name:"v-pagination",directives:{Resize:r["b"]},props:{circle:Boolean,disabled:Boolean,length:{type:Number,default:0,validator:function(t){return t%1===0}},nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},totalVisible:[Number,String],value:{type:Number,default:0},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},wrapperAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.wrapper"}},data:function(){return{maxButtons:0,selected:null}},computed:{classes:function(){return Object(n["a"])({"v-pagination":!0,"v-pagination--circle":this.circle,"v-pagination--disabled":this.disabled},this.themeClasses)},items:function(){var t=parseInt(this.totalVisible,10);if(0===t)return[];var e=Math.min(Math.max(0,t)||this.length,Math.max(0,this.maxButtons)||this.length,this.length);if(this.length<=e)return this.range(1,this.length);var a=e%2===0?1:0,n=Math.floor(e/2),s=this.length-n+1+a;if(this.value>n&&this.value<s){var r=1,o=this.length,l=this.value-n+2,c=this.value+n-2-a,u=l-1===r+1?2:"...",d=c+1===o-1?c+1:"...";return[1,u].concat(Object(i["a"])(this.range(l,c)),[d,this.length])}if(this.value===n){var p=this.value+n-1-a;return[].concat(Object(i["a"])(this.range(1,p)),["...",this.length])}if(this.value===s){var h=this.value-n+1;return[1,"..."].concat(Object(i["a"])(this.range(h,this.length)))}return[].concat(Object(i["a"])(this.range(1,n)),["..."],Object(i["a"])(this.range(s,this.length)))}},watch:{value:function(){this.init()}},mounted:function(){this.init()},methods:{init:function(){var t=this;this.selected=null,this.$nextTick(this.onResize),setTimeout((function(){return t.selected=t.value}),100)},onResize:function(){var t=this.$el&&this.$el.parentElement?this.$el.parentElement.clientWidth:window.innerWidth;this.maxButtons=Math.floor((t-96)/42)},next:function(t){t.preventDefault(),this.$emit("input",this.value+1),this.$emit("next")},previous:function(t){t.preventDefault(),this.$emit("input",this.value-1),this.$emit("previous")},range:function(t,e){var a=[];t=t>0?t:1;for(var i=t;i<=e;i++)a.push(i);return a},genIcon:function(t,e,a,i,n){return t("li",[t("button",{staticClass:"v-pagination__navigation",class:{"v-pagination__navigation--disabled":a},attrs:{disabled:a,type:"button","aria-label":n},on:a?{}:{click:i}},[t(s["a"],[e])])])},genItem:function(t,e){var a=this,i=e===this.value&&(this.color||"primary"),n=e===this.value,s=n?this.currentPageAriaLabel:this.pageAriaLabel;return t("button",this.setBackgroundColor(i,{staticClass:"v-pagination__item",class:{"v-pagination__item--active":e===this.value},attrs:{type:"button","aria-current":n,"aria-label":this.$vuetify.lang.t(s,e)},on:{click:function(){return a.$emit("input",e)}}}),[e.toString()])},genItems:function(t){var e=this;return this.items.map((function(a,i){return t("li",{key:i},[isNaN(Number(a))?t("span",{class:"v-pagination__more"},[a.toString()]):e.genItem(t,a)])}))},genList:function(t,e){return t("ul",{directives:[{modifiers:{quiet:!0},name:"resize",value:this.onResize}],class:this.classes},e)}},render:function(t){var e=[this.genIcon(t,this.$vuetify.rtl?this.nextIcon:this.prevIcon,this.value<=1,this.previous,this.$vuetify.lang.t(this.previousAriaLabel)),this.genItems(t),this.genIcon(t,this.$vuetify.rtl?this.prevIcon:this.nextIcon,this.value>=this.length,this.next,this.$vuetify.lang.t(this.nextAriaLabel))];return t("nav",{attrs:{role:"navigation","aria-label":this.$vuetify.lang.t(this.wrapperAriaLabel)}},[this.genList(t,e)])}})},b570:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex align-center"},[a("v-btn",{staticClass:"mx-0 px-0 text",attrs:{text:"",loading:t.isLoading},on:{click:function(e){return t.backTo()}}},[a("v-icon",[t._v("mdi-chevron-left")]),t._v(" Regresar ")],1)],1)},n=[],s={props:{to:{type:String,default:""}},data:function(){return{isLoading:!1}},mounted:function(){this.isLoading=!1},methods:{backTo:function(){this.$router.push({name:this.to}),this.isLoading=!0}}},r=s,o=a("2877"),l=a("6544"),c=a.n(l),u=a("8336"),d=a("132d"),p=Object(o["a"])(r,i,n,!1,null,null,null);e["a"]=p.exports;c()(p,{VBtn:u["a"],VIcon:d["a"]})},e23c:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex flex-column flex-grow-1",attrs:{id:"hola"}},[a("div",{staticClass:"d-flex align-center py-3"},[t._m(0),a("v-spacer"),a("v-btn",{attrs:{outlined:"",color:"primary",loading:t.loadingDownloadPdf},on:{click:t.descargarExcel}},[a("v-icon",[t._v("mdi-progress-download")])],1),a("BackPage",{staticClass:"ml-2",attrs:{to:"reports"}})],1),a("div",{attrs:{id:"dashboarDetail"}},[a("DashDetailComponent",{ref:"pedro",attrs:{campaing:t.campaing}})],1),t.has_url?a("UrlDashDetailComponent"):t._e(),a("DetailCampaignComponent",{ref:"detailCampaignComponent",attrs:{campaigns:t.campaigns,registers:t.registers,pagination:t.pagination},on:{ongetSms:t.ongetSms}})],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"display-1"},[t._v("Reporte de servicios")])])}],s=a("2909"),r=a("1da1"),o=(a("96cf"),a("ac1f"),a("841c"),a("88f5")),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-row",[a("v-col",{attrs:{cols:"12",xs:"12",sm:"6",lg:"4"}},[a("v-card",{attrs:{color:"light-blue darken-4",dark:""}},[a("v-card-title",[t._v("Campaña:")]),a("v-card-text",[a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[t._v("Nombre:")]),a("v-list-item-subtitle",[t._v(t._s(t.campaing.name))])],1)],1),a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[t._v("Fecha:")]),a("v-list-item-subtitle",[t._v(t._s(t.campaing.updated_at))])],1)],1)],1)],1)],1),a("v-col",{attrs:{cols:"12",xs:"12",sm:"6",lg:"4"}},[a("v-card",[a("v-card-title",[t._v("Progreso")]),a("v-card-text",[t.showChartProgress?a("div",[a("apexchart",{attrs:{type:"donut",width:"300",options:t.chartOptionsProgress,series:t.seriesProgress}})],1):t._e()])],1)],1),a("v-col",{attrs:{cols:"12",xs:"12",sm:"6",lg:"4"}},[a("v-card",[a("v-card-title",[t._v("Entregabilidad")]),a("v-card-text",[t.showChartProgress?a("div",[a("apexchart",{attrs:{type:"donut",width:"300",options:t.chartOptionsProgress,series:t.seriesProgress}})],1):t._e()])],1)],1)],1)],1)},c=[],u=(a("a9e3"),{props:{campaing:{type:Object,default:function(){}},registers:{type:Number,default:0}},data:function(){return{showChart:!0,series:[90,10],chartOptions:{colors:["#4caf50","#e57373"],labels:["DELIVERED","REJECTED"],chart:{type:"pie"},responsive:[{breakpoint:337,options:{chart:{width:100},legend:{position:"bottom"}}}]},showChartProgress:!1,seriesProgress:[40,60],chartOptionsProgress:{colors:["#00b0ff","#9e9e9e"],labels:["ENVIADOS","PROCESANDO"],chart:{type:"donut"},responsive:[{breakpoint:337,options:{chart:{width:200},legend:{position:"bottom"}}}]}}},computed:{delivered:function(){var t=this.registers-1;return t}},mounted:function(){this.showChart=!0,this.showChartProgress=!0}}),d=u,p=a("2877"),h=a("6544"),v=a.n(h),g=a("b0af"),m=a("99d9"),f=a("62ad"),b=a("da13"),x=a("5d23"),_=a("0fd9"),C=Object(p["a"])(d,l,c,!1,null,null,null),w=C.exports;v()(C,{VCard:g["a"],VCardText:m["c"],VCardTitle:m["d"],VCol:f["a"],VListItem:b["a"],VListItemContent:x["b"],VListItemSubtitle:x["c"],VListItemTitle:x["d"],VRow:_["a"]});var y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-row",[a("v-col",{attrs:{cols:"12",xs:"12",sm:"6",lg:"6"}},[a("div",[a("v-card",[a("v-card-title",[t._v("Apertura Link")]),a("v-card-text",[t.showChart?a("div",[a("apexchart",{attrs:{type:"donut",width:"400",options:t.chartOptions,series:t.series}})],1):t._e()])],1)],1)]),a("v-col",{attrs:{cols:"12",xs:"12",sm:"6",lg:"6"}},[a("div",[a("v-card",[a("v-card-title",[t._v("Comportamiento")]),a("v-card-text",[a("TrackCard",{staticClass:"h-full",attrs:{label:"assasasa",color:"#8c9eff",value:432,percentage:4.333,"percentage-label":"10000",loading:!1,series:t.ordersSeries}})],1)],1)],1)])],1)],1)},S=[],O=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex flex-column flex-grow-1"},[t.loading?a("div",{staticClass:"d-flex flex-grow-1 align-center justify-center"},[a("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1):a("div",{staticClass:"d-flex flex-column flex-grow-1"},[a("v-card-title",[t._v(" "+t._s(t.label)+" ")]),a("div",{staticClass:"d-flex flex-column flex-grow-1"},[a("div",{staticClass:"px-2 pb-2"},[a("div",{staticClass:"d-flex align-center"},[a("div",{staticClass:"text-h4"},[t._v(t._s(t.value))]),a("v-spacer"),a("div",{staticClass:"d-flex flex-column text-right"},[a("div",{staticClass:"font-weight-bold"},[a("trend-percent",{attrs:{value:t.percentage}})],1),a("div",{staticClass:"caption"},[t._v(t._s(t.percentageLabel))])])],1)]),a("v-spacer"),a("apexchart",{attrs:{type:"area",height:"60",options:t.chartOptions,series:t.series}})],1)],1)])},V=[],k=a("5530"),$=(a("b0c0"),a("99af"),a("c1df")),L=a.n($),D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",[0===t.value?a("span",[t._v(" "+t._s(t.value)+"% ")]):t.value>0?a("span",{staticClass:"success--text"},[a("v-icon",{attrs:{small:"",color:"success"}},[t._v("mdi-arrow-top-right")]),t._v(" "+t._s(t.value)+"% ")],1):a("span",{staticClass:"error--text"},[a("v-icon",{attrs:{small:"",color:"error"}},[t._v("mdi-arrow-bottom-right")]),t._v(" "+t._s(Math.abs(t.value))+"% ")],1)])},I=[],E={props:{value:{type:Number,default:0}}},j=E,T=a("132d"),P=Object(p["a"])(j,D,I,!1,null,null,null),R=P.exports;function A(t){return t?L()(t).format("D MMM"):""}v()(P,{VIcon:T["a"]});var B={components:{TrendPercent:R},props:{series:{type:Array,default:function(){return[]}},label:{type:String,default:""},color:{type:String,default:"#333333"},value:{type:Number,default:0},percentage:{type:Number,default:0},percentageLabel:{type:String,default:"vs. last week"},options:{type:Object,default:function(){return{}}},loading:{type:Boolean,default:!1}},computed:{chartOptions:function(){return Object(k["a"])({chart:{animations:{speed:400,animateGradually:{enabled:!1}},width:"100%",height:60,type:"area",sparkline:{enabled:!0}},colors:[this.color],fill:{type:"solid",colors:[this.color],opacity:.15},stroke:{curve:"smooth",width:2},xaxis:{type:"datetime"},tooltip:{followCursor:!0,theme:"dark",custom:function(t){t.ctx,t.series;var e=t.seriesIndex,a=t.dataPointIndex,i=t.w,n=i.config.series[e].name,s=i.config.series[e].data[a];return'<div class="rounded-lg pa-1 caption">\n              <div class="font-weight-bold">'.concat(A(s[0]),"</div>\n              <div>").concat(s[1]," ").concat(n,"</div>\n            </div>")}}},this.options)}}},N=B,M=a("490a"),F=a("2fa4"),z=Object(p["a"])(N,O,V,!1,null,null,null),J=z.exports;v()(z,{VCardTitle:m["d"],VProgressCircular:M["a"],VSpacer:F["a"]});var U={components:{TrackCard:J},data:function(){return{showChart:!1,series:[50,50],chartOptions:{colors:["#6BCB77","#FF6B6B"],labels:["ABIERTO","NO ABIERTO"],chart:{type:"donut"},responsive:[{breakpoint:337,options:{chart:{width:200},legend:{position:"right"}}}]},lastweek:[1,2,3,4],ordersSeries:[{name:"Orders",data:[["2020-02-02",4],["2020-02-03",5],["2020-02-04",6],["2020-02-05",4]]}]}},mounted:function(){this.showChart=!0,this.showChart2=!0}},W=U,G=Object(p["a"])(W,y,S,!1,null,null,null),q=G.exports;v()(G,{VCard:g["a"],VCardText:m["c"],VCardTitle:m["d"],VCol:f["a"],VRow:_["a"]});var H=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",[a("v-card-title",[t._v(" Resultados: "),a("v-spacer"),a("v-text-field",{directives:[{name:"debounce",rawName:"v-debounce:250",value:t.ongetSms,expression:"ongetSms",arg:"250"}],staticClass:"flex-grow-1 mr-md-2",attrs:{"append-icon":"mdi-magnify",dense:"",clearable:"",placeholder:"Ej.: Filtrar por name, email, empresa, etc"},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}})],1),a("v-data-table",{attrs:{headers:t.headers,items:t.campaigns,"hide-default-footer":""},scopedSlots:t._u([{key:"item.actions",fn:function(e){var i=e.item;return[a("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.attrs,n=e.on;return[a("v-btn",t._g(t._b({},"v-btn",i,!1),n),[t._v(" Acciones ")])]}}],null,!0)},[a("v-list",[a("v-list-item",{attrs:{link:""},on:{click:function(e){return t.openDialogCreate(i)}}},[t._v(" Modificar ")])],1)],1)]}}],null,!0)},[a("p",[t._v(t._s(t.campaigns))])]),a("v-pagination",{attrs:{length:t.pagination.total},on:{input:t.ongetSms},model:{value:t.pagination.current,callback:function(e){t.$set(t.pagination,"current",e)},expression:"pagination.current"}})],1)},K=[],Q={name:"DetailCampaignComponent",props:{pagination:{type:Object,default:function(){return{}}},campaigns:{type:Array,default:function(){return{}}}},data:function(){return{headers:[{text:"Telefono",value:"phone"},{text:"Mensaje",value:"content"},{text:"Fecha",value:"created_at"},{text:"Estado",value:"status"}],campaign_id:null,searchText:"",service_id:null}},mounted:function(){this.ongetSms()},methods:{ongetSms:function(){this.$emit("ongetSms",this.searchText)}}},X=Q,Y=a("8336"),Z=a("8fea"),tt=a("8860"),et=a("e449"),at=a("891e"),it=a("8654"),nt=Object(p["a"])(X,H,K,!1,null,null,null),st=nt.exports;v()(nt,{VBtn:Y["a"],VCard:g["a"],VCardTitle:m["d"],VDataTable:Z["a"],VList:tt["a"],VListItem:b["a"],VMenu:et["a"],VPagination:at["a"],VSpacer:F["a"],VTextField:it["a"]});var rt=a("b570"),ot=a("5e85"),lt=a.n(ot),ct=a("8baf"),ut=a("c0e9"),dt=a.n(ut),pt={name:"DetailSmsReport",components:{DashDetailComponent:w,UrlDashDetailComponent:q,DetailCampaignComponent:st,BackPage:rt["a"]},data:function(){return{campaing:null,registers:0,excelprueba:null,loadingDownloadPdf:!1,has_url:!0,campaigns:[],pagination:{current:1,total:0},allSmsOfCampaing:[],search:"",isLoadingDownload:!1}},computed:{changedSearch:function(){return this.search}},mounted:function(){this.ongetSms(),this.getCampaing()},methods:{file_to_json:function(){console.log("holis")},getCampaing:function(){var t=this;o["a"].get("/campaign/"+this.$route.params.campaign_id).then((function(e){e.data.success&&(t.campaing=e.data.data.campaing,t.registers=e.data.data.registers)}))},ongetSms:function(t){var e=this;console.log(t),this.search=t;var a={campaign_id:this.$route.params.campaign_id,service_id:1,searchtext:t};""!==t&&(this.pagination.current=1),o["a"].post("/smsCampaignDetail?page="+this.pagination.current,a).then((function(t){t.data.success&&(e.campaigns=t.data.data.data,console.log(e.campaigns),e.pagination.current=t.data.data.current_page,e.pagination.total=t.data.data.last_page,null===t.data.data.data[0].url_id&&null===t.data.data.data[0].long_url&&(e.has_url=!1))}))},descargarExcel:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.isLoadingDownload=!0,a={campaign_id:t.$route.params.campaign_id,service_id:1,searchtext:""},e.next=4,o["a"].post("/smsCampaignDetailAll",a).then((function(e){e.data.success&&(t.allSmsOfCampaing=e.data.data)}));case 4:i=[{sheet:"Sms",columns:[{label:"Telefono",value:"phone"},{label:"Mensaje",value:"content"},{label:"Fecha programada",value:"scheduled"},{label:"Estado",value:"status"}],content:Object(s["a"])(t.allSmsOfCampaing)}],n={sheetName:"Sms",fileName:"Reporte de campaña"},lt()(i,n),t.isLoadingDownload=!1;case 8:case"end":return e.stop()}}),e)})))()},downloadPdf:function(){return Object(r["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e={background:"white",scale:3},dt()(document.getElementById("dashboarDetail"),e).then((function(t){var e=t.toDataURL("image/png"),a=new ct["a"]("p","pt","a4"),i=15,n=15,s=a.getImageProperties(e),r=a.internal.pageSize.getWidth()-2*i,o=s.height*r/s.width;a.addImage(e,"JPEG",i,n,r,o,void 0,"FAST"),a.save("Reporte de campaña.pdf")}));case 2:case"end":return t.stop()}}),t)})))()}}},ht=pt,vt=Object(p["a"])(ht,i,n,!1,null,null,null);e["default"]=vt.exports;v()(vt,{VBtn:Y["a"],VIcon:T["a"],VSpacer:F["a"]})}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-978bfa54"],{"17b3":function(t,e,a){},"351b":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content-img"},[a("div",{staticClass:"content-img--sms-text"},[a("div",{staticClass:"content_message"},t._l(t.messages,(function(e){return a("div",{key:e.text,staticClass:"sms d-flex flex-column",class:["1"===e.type&&e.text.length<20?"my-sms-posicion":"sms-received-posicion"]},[a("div",{class:["1"===e.type?"content-sms":""]},[a("div",[a("span",{staticClass:"sms-text",class:["1"===e.type?"my-sms":"sms-received",e.text.length>21?"sms-block":"sms-inline"]},[t._v(t._s(e.text)+" ")])]),a("span",{class:["1"===e.type?"my-sms-date":"sms-received-date"]},[t._v(t._s(e.date))])])])})),0)])])},i=[],s={props:{messages:{type:Array,default:function(){return[{type:"2",text:"Como te ayudo?",date:"hoy, 10:54"},{type:"1",text:"Como t",date:"hoy, 10:54"},{type:"2",text:"ok",date:"hoy"},{type:"1",text:"Necesito informacion sobre la matricula",date:"hoy, 10:56"},{type:"2",text:"La matricula se va a realizar el dia de mañana a las 8:00 am :D",date:"hoy, 10:58"},{type:"1",text:"Es muy tarde, esxiste alguna manera de hacerlo online?",date:"hoy, 11:29"},{type:"2",text:"Pero como es? ;)",date:"hoy, 12:29"}]}}},data:function(){return{}},computed:{}},r=s,o=(a("4cec"),a("2877")),c=Object(o["a"])(r,n,i,!1,null,"6c37edd4",null);e["a"]=c.exports},"3a2f":function(t,e,a){"use strict";var n=a("ade3"),i=(a("a9e3"),a("9734"),a("4ad4")),s=a("a9ad"),r=a("16b7"),o=a("b848"),c=a("f573"),l=a("f2e7"),u=a("80d2"),d=a("d9bd"),p=a("58df");e["a"]=Object(p["a"])(s["a"],r["a"],o["a"],c["a"],l["a"]).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,a=t.content,n=!this.bottom&&!this.left&&!this.top&&!this.right,i=!1!==this.attach?e.offsetLeft:e.left,s=0;return this.top||this.bottom||n?s=i+e.width/2-a.width/2:(this.left||this.right)&&(s=i+(this.right?e.width:-a.width)+(this.right?10:-10)),this.nudgeLeft&&(s-=parseInt(this.nudgeLeft)),this.nudgeRight&&(s+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(s,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,a=t.content,n=!1!==this.attach?e.offsetTop:e.top,i=0;return this.top||this.bottom?i=n+(this.bottom?e.height:-a.height)+(this.bottom?10:-10):(this.left||this.right)&&(i=n+e.height/2-a.height/2),this.nudgeTop&&(i-=parseInt(this.nudgeTop)),this.nudgeBottom&&(i+=parseInt(this.nudgeBottom)),"".concat(this.calcYOverflow(i+this.pageYOffset),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(u["g"])(this.maxWidth),minWidth:Object(u["g"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(u["t"])(this,"activator",!0)&&Object(d["b"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=i["a"].options.methods.genActivatorListeners.call(this);return e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")},e.keydown=function(e){e.keyCode===u["y"].esc&&(t.getActivator(e),t.runDelay("close"))},e},genActivatorAttributes:function(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition:function(){var t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(n["a"])(t,this.contentClass,!0),Object(n["a"])(t,"menuable__content__active",this.isActive),Object(n["a"])(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}})},"3fea":function(t,e,a){},"4cec":function(t,e,a){"use strict";a("3fea")},"891e":function(t,e,a){"use strict";var n=a("2909"),i=a("5530"),s=(a("a9e3"),a("99af"),a("d3b7"),a("25f0"),a("d81d"),a("17b3"),a("9d26")),r=a("dc22"),o=a("a9ad"),c=a("de2c"),l=a("7560"),u=a("58df");e["a"]=Object(u["a"])(o["a"],Object(c["a"])({onVisible:["init"]}),l["a"]).extend({name:"v-pagination",directives:{Resize:r["b"]},props:{circle:Boolean,disabled:Boolean,length:{type:Number,default:0,validator:function(t){return t%1===0}},nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},totalVisible:[Number,String],value:{type:Number,default:0},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},wrapperAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.wrapper"}},data:function(){return{maxButtons:0,selected:null}},computed:{classes:function(){return Object(i["a"])({"v-pagination":!0,"v-pagination--circle":this.circle,"v-pagination--disabled":this.disabled},this.themeClasses)},items:function(){var t=parseInt(this.totalVisible,10);if(0===t)return[];var e=Math.min(Math.max(0,t)||this.length,Math.max(0,this.maxButtons)||this.length,this.length);if(this.length<=e)return this.range(1,this.length);var a=e%2===0?1:0,i=Math.floor(e/2),s=this.length-i+1+a;if(this.value>i&&this.value<s){var r=1,o=this.length,c=this.value-i+2,l=this.value+i-2-a,u=c-1===r+1?2:"...",d=l+1===o-1?l+1:"...";return[1,u].concat(Object(n["a"])(this.range(c,l)),[d,this.length])}if(this.value===i){var p=this.value+i-1-a;return[].concat(Object(n["a"])(this.range(1,p)),["...",this.length])}if(this.value===s){var m=this.value-i+1;return[1,"..."].concat(Object(n["a"])(this.range(m,this.length)))}return[].concat(Object(n["a"])(this.range(1,i)),["..."],Object(n["a"])(this.range(s,this.length)))}},watch:{value:function(){this.init()}},mounted:function(){this.init()},methods:{init:function(){var t=this;this.selected=null,this.$nextTick(this.onResize),setTimeout((function(){return t.selected=t.value}),100)},onResize:function(){var t=this.$el&&this.$el.parentElement?this.$el.parentElement.clientWidth:window.innerWidth;this.maxButtons=Math.floor((t-96)/42)},next:function(t){t.preventDefault(),this.$emit("input",this.value+1),this.$emit("next")},previous:function(t){t.preventDefault(),this.$emit("input",this.value-1),this.$emit("previous")},range:function(t,e){var a=[];t=t>0?t:1;for(var n=t;n<=e;n++)a.push(n);return a},genIcon:function(t,e,a,n,i){return t("li",[t("button",{staticClass:"v-pagination__navigation",class:{"v-pagination__navigation--disabled":a},attrs:{disabled:a,type:"button","aria-label":i},on:a?{}:{click:n}},[t(s["a"],[e])])])},genItem:function(t,e){var a=this,n=e===this.value&&(this.color||"primary"),i=e===this.value,s=i?this.currentPageAriaLabel:this.pageAriaLabel;return t("button",this.setBackgroundColor(n,{staticClass:"v-pagination__item",class:{"v-pagination__item--active":e===this.value},attrs:{type:"button","aria-current":i,"aria-label":this.$vuetify.lang.t(s,e)},on:{click:function(){return a.$emit("input",e)}}}),[e.toString()])},genItems:function(t){var e=this;return this.items.map((function(a,n){return t("li",{key:n},[isNaN(Number(a))?t("span",{class:"v-pagination__more"},[a.toString()]):e.genItem(t,a)])}))},genList:function(t,e){return t("ul",{directives:[{modifiers:{quiet:!0},name:"resize",value:this.onResize}],class:this.classes},e)}},render:function(t){var e=[this.genIcon(t,this.$vuetify.rtl?this.nextIcon:this.prevIcon,this.value<=1,this.previous,this.$vuetify.lang.t(this.previousAriaLabel)),this.genItems(t),this.genIcon(t,this.$vuetify.rtl?this.prevIcon:this.nextIcon,this.value>=this.length,this.next,this.$vuetify.lang.t(this.nextAriaLabel))];return t("nav",{attrs:{role:"navigation","aria-label":this.$vuetify.lang.t(this.wrapperAriaLabel)}},[this.genList(t,e)])}})},9734:function(t,e,a){},b570:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex align-center"},[a("v-btn",{staticClass:"mx-0 px-0 text",attrs:{text:"",loading:t.isLoading},on:{click:function(e){return t.backTo()}}},[a("v-icon",[t._v("mdi-chevron-left")]),t._v(" Regresar ")],1)],1)},i=[],s={props:{to:{type:String,default:""}},data:function(){return{isLoading:!1}},mounted:function(){this.isLoading=!1},methods:{backTo:function(){this.$router.push({name:this.to}),this.isLoading=!0}}},r=s,o=a("2877"),c=a("6544"),l=a.n(c),u=a("8336"),d=a("132d"),p=Object(o["a"])(r,n,i,!1,null,null,null);e["a"]=p.exports;l()(p,{VBtn:u["a"],VIcon:d["a"]})},e23c:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex flex-column flex-grow-1",attrs:{id:"hola"}},[a("div",{staticClass:"d-flex align-center py-3"},[t._m(0),a("v-spacer"),a("v-btn",{attrs:{outlined:"",color:"primary",loading:t.loadingDownloadPdf},on:{click:t.descargarExcel}},[a("v-icon",[t._v("mdi-progress-download")])],1),a("BtnToReload"),a("BackPage",{staticClass:"ml-2",attrs:{to:"reports"}})],1),a("v-row",[a("v-col",{attrs:{cols:"12",xs:"12",sm:"6",lg:"4"}},[a("CampaignDetailCardComponent",{attrs:{"data-campaign":t.dataCampaign}})],1),a("v-col",{attrs:{cols:"12",xs:"12",sm:"6",lg:"4"}},[a("CampaignMetricsdCardComponent")],1),a("v-col",{attrs:{cols:"12",xs:"12",sm:"6",lg:"4"}},[a("CampaignProgressComponent")],1)],1),a("DetailCampaignComponent",{ref:"detailCampaignComponent",staticClass:"mb-4",attrs:{"total-cost-sms":t.totalCostSms,campaigns:t.campaigns,headers:t.headersForTable,registers:t.registers,pagination:t.pagination},on:{ongetSms:t.ongetSms}}),t.is_bidireccional?a("DetailSmsReceivedCampaignComponent",{ref:"detailCampaignComponent",attrs:{"total-cost-sms-received":t.totalCostSmsReceived,campaigns:t.smsReceiveds,registers:t.registers,pagination:t.paginationSmsReceived},on:{ongetSms:t.ongetSmsReceived}}):t._e()],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"display-1"},[t._v("Reporte de servicios")])])}],s=a("2909"),r=a("1da1"),o=(a("96cf"),a("ac1f"),a("841c"),a("5e85")),c=a.n(o),l=a("8baf"),u=a("c0e9"),d=a.n(u),p=a("88f5"),m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",[a("v-card-title",[t._v(" SMS Enviados: "+t._s(t._f("formatCurrency")(t.totalCostSms,t.configFormat))+" "),a("v-spacer"),a("v-text-field",{directives:[{name:"debounce",rawName:"v-debounce:250",value:t.ongetSms,expression:"ongetSms",arg:"250"}],staticClass:"flex-grow-1 mr-md-2",attrs:{"append-icon":"mdi-magnify",dense:"",clearable:"",placeholder:"Ej.: Filtrar por name, email, empresa, etc"},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}})],1),a("v-card-text",[a("v-data-table",{attrs:{headers:t.headers,items:t.campaigns,"hide-default-footer":""},scopedSlots:t._u([{key:"item.times_open",fn:function(e){var n=e.item;return[a("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on,s=e.attrs;return[n.times_open?a("v-icon",t._g(t._b({},"v-icon",s,!1),i),[t._v(" mdi-eye-check-outline ")]):a("v-icon",t._g(t._b({},"v-icon",s,!1),i),[t._v(" mdi-eye-off-outline ")])]}}],null,!0)},[n.times_open?a("span",[t._v("ABIERTO")]):a("span",[t._v("NO ABIERTO")])])]}},{key:"item.actions",fn:function(e){var n=e.item;return[a("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.attrs,i=e.on;return[a("v-btn",t._g(t._b({},"v-btn",n,!1),i),[t._v(" Acciones ")])]}}],null,!0)},[a("v-list",[a("v-list-item",{attrs:{link:""},on:{click:function(e){return t.openDialogCreate(n)}}},[t._v(" Modificar ")])],1)],1)]}},{key:"item.status",fn:function(e){var n=e.item;return[a("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on,s=e.attrs;return["DELIVERED"===n.status?a("v-icon",t._g(t._b({},"v-icon",s,!1),i),[t._v("mdi-email-check-outline ")]):a("v-icon",t._g(t._b({},"v-icon",s,!1),i),[t._v("mdi-email-remove-outline ")])]}}],null,!0)},["DELIVERED"===n.status?a("span",[t._v("DELIVERED")]):a("span",[t._v("REJECTED")])])]}}],null,!0)}),a("v-pagination",{attrs:{length:t.pagination.total},on:{input:t.ongetSms},model:{value:t.pagination.current,callback:function(e){t.$set(t.pagination,"current",e)},expression:"pagination.current"}})],1)],1)},h=[],v=(a("a9e3"),{name:"DetailCampaignComponent",props:{pagination:{type:Object,default:function(){return{}}},campaigns:{type:Array,default:function(){return{}}},totalCostSms:{type:Number,default:0},hasUrl:{type:Boolean,default:!0},headers:{type:Array,default:null}},data:function(){return{campaign_id:null,searchText:"",service_id:null}},mounted:function(){this.ongetSms()},methods:{ongetSms:function(){this.$emit("ongetSms",this.searchText)},configFormat:function(){return{decimalDigits:0,decimalSeparator:".",thousandsSeparator:",",currencySymbol:"",currencySymbolNumberOfSpaces:0,currencySymbolPosition:"left"}}}}),g=v,f=a("2877"),b=a("6544"),_=a.n(b),C=a("8336"),x=a("b0af"),y=a("99d9"),S=a("8fea"),w=a("132d"),R=a("8860"),O=a("da13"),T=a("e449"),k=a("891e"),$=a("2fa4"),V=a("8654"),D=a("3a2f"),E=Object(f["a"])(g,m,h,!1,null,null,null),A=E.exports;_()(E,{VBtn:C["a"],VCard:x["a"],VCardText:y["c"],VCardTitle:y["d"],VDataTable:S["a"],VIcon:w["a"],VList:R["a"],VListItem:O["a"],VMenu:T["a"],VPagination:k["a"],VSpacer:$["a"],VTextField:V["a"],VTooltip:D["a"]});var I=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",[a("v-card-title",[t._v(" SMS Respondidos: "+t._s(t._f("formatCurrency")(t.totalCostSmsReceived,t.configFormat))+" "),a("v-spacer"),a("v-text-field",{directives:[{name:"debounce",rawName:"v-debounce:250",value:t.ongetSms,expression:"ongetSms",arg:"250"}],staticClass:"flex-grow-1 mr-md-2",attrs:{"append-icon":"mdi-magnify",dense:"",clearable:"",placeholder:"Ej.: Filtrar por name, email, empresa, etc"},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}})],1),a("v-card-text",[a("v-data-table",{attrs:{headers:t.headers,items:t.campaigns,"hide-default-footer":""},scopedSlots:t._u([{key:"item.chat",fn:function(e){var n=e.item;return[a("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on,s=e.attrs;return[a("v-icon",t._g(t._b({on:{click:function(e){return t.openChatModal(n)}}},"v-icon",s,!1),i),[t._v(" mdi-message-outline ")])]}}],null,!0)},[a("span",[t._v("chat")])])]}},{key:"item.actions",fn:function(e){var n=e.item;return[a("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.attrs,i=e.on;return[a("v-btn",t._g(t._b({},"v-btn",n,!1),i),[t._v(" Acciones ")])]}}],null,!0)},[a("v-list",[a("v-list-item",{attrs:{link:""},on:{click:function(e){return t.openDialogCreate(n)}}},[t._v(" Modificar ")])],1)],1)]}}],null,!0)},[a("p",[t._v(t._s(t.campaigns))])]),a("v-pagination",{attrs:{length:t.pagination.total},on:{input:t.ongetSms},model:{value:t.pagination.current,callback:function(e){t.$set(t.pagination,"current",e)},expression:"pagination.current"}})],1),a("ShowModalChatComponent",{ref:"showModalChat"})],1)},L=[],j=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{width:"300"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"pa-2"},[t._v(" "+t._s("Crear contacto")+" "),a("v-spacer"),a("v-btn",{attrs:{icon:""},on:{click:function(e){t.dialog=!1}}},[a("v-icon",[t._v("mdi-close")])],1)],1),a("v-card-text",[a("Chat",{attrs:{messages:t.messages}})],1)],1)],1)},N=[],B=a("351b"),M={components:{Chat:B["a"]},data:function(){return{dialog:!1,phone:null,messages:[]}},computed:{},methods:{open:function(t){this.phone=t,this.getMessages(),this.dialog=!0},close:function(){this.$refs.formNewContact.resetValidation(),this.$refs.formNewContact.reset(),this.dialog=!1,this.isLoadingNewContact=!1},save:function(){var t=this;if(this.$refs.formNewContact.validate())if(this.isLoadingNewContact=!0,this.isEdit){var e={number:this.number,name1:this.name1,name2:this.name2,last_name1:this.last_name1,last_name2:this.last_name2,email:this.email,var1:this.var1,var2:this.var2,var3:this.var3,var4:this.var4,agenda_id:this.$route.params.agendaId,contact_id:this.contact.id};p["a"].put("/contact/"+this.$route.params.agendaId,e).then((function(e){t.$store.dispatch("app/showToast",e.data.message),e.data.success&&(t.$emit("onCreated"),t.close())})).catch((function(e){t.backendErrors=e.response.data.errors,t.$store.dispatch("app/showToast","Revise los datos del contacto"),t.isLoadingNewContact=!1}))}else{var a={number:this.number,name1:this.name1,name2:this.name2,last_name1:this.last_name1,last_name2:this.last_name2,email:this.email,var1:this.var1,var2:this.var2,var3:this.var3,var4:this.var4,agenda_id:this.$route.params.agendaId};p["a"].post("/contact",a).then((function(e){e.data.success&&(t.$store.dispatch("app/showToast","Contacto creado exitosamente"),t.$emit("onCreated"),t.close())})).catch((function(e){t.backendErrors=e.response.data.errors,t.$store.dispatch("app/showToast","Revise los datos del contacto"),t.isLoadingNewContact=!1}))}},getMessages:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={campaign_id:t.$route.params.campaign_id,service_id:1,phone:t.phone},e.next=3,p["a"].post("/messageOfCampaign",a);case 3:n=e.sent,i=n.data,i.success&&(console.log(i),t.messages=i.data);case 6:case"end":return e.stop()}}),e)})))()}}},P=M,F=a("169a"),z=Object(f["a"])(P,j,N,!1,null,null,null),W=z.exports;_()(z,{VBtn:C["a"],VCard:x["a"],VCardText:y["c"],VCardTitle:y["d"],VDialog:F["a"],VIcon:w["a"],VSpacer:$["a"]});var U={components:{ShowModalChatComponent:W},props:{pagination:{type:Object,default:function(){return{}}},campaigns:{type:Array,default:function(){return{}}},totalCostSmsReceived:{type:Number,default:0},hasUrl:{type:Boolean,default:!0}},data:function(){return{campaign_id:null,searchText:"",service_id:null,headers:[{text:"Telefono",value:"phone"},{text:"Mensaje",value:"content"},{text:"Chat",value:"chat"},{text:"Fecha",value:"created"},{text:"Credito",value:"credit"}]}},mounted:function(){this.ongetSms()},methods:{ongetSms:function(){this.$emit("ongetSms",this.searchText)},openChatModal:function(t){this.$refs.showModalChat.open(t.phone)},configFormat:function(){return{decimalDigits:0,decimalSeparator:".",thousandsSeparator:",",currencySymbol:"",currencySymbolNumberOfSpaces:0,currencySymbolPosition:"left"}}}},Y=U,H=Object(f["a"])(Y,I,L,!1,null,null,null),J=H.exports;_()(H,{VBtn:C["a"],VCard:x["a"],VCardText:y["c"],VCardTitle:y["d"],VDataTable:S["a"],VIcon:w["a"],VList:R["a"],VListItem:O["a"],VMenu:T["a"],VPagination:k["a"],VSpacer:$["a"],VTextField:V["a"],VTooltip:D["a"]});var X=a("b570"),q=a("ed7b"),Z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-card",{attrs:{color:"light-blue darken-4",dark:""}},[a("v-card-title",[t._v("Campaña:")]),a("v-card-text",[a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[t._v("USUARIO:")]),a("v-list-item-subtitle",[t._v(t._s(t.getNameUser)+" "+t._s(t.getNameCompany))])],1)],1),a("v-divider"),a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[t._v("NOMBRE DE CAMPAÑA:")]),a("v-list-item-subtitle",[t._v(t._s(t.getNameCampaign))]),a("v-list-item-title",[t._v("TIPO:")]),a("v-list-item-subtitle",[t._v(t._s(t.getTypeCampaign))])],1)],1),a("v-divider"),a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[t._v("FECHA Y HORA:")]),a("v-list-item-subtitle",[t._v(t._s(t.getDate))])],1)],1)],1)],1)],1)},G=[],K=(a("b0c0"),a("c1df")),Q=a.n(K);Q.a.locale("es");var tt={props:{dataCampaign:{type:Object,default:function(){return{name:"",updated_at:""}}}},data:function(){return{allSmsOfCampaing:[],showChartProgress:!1,seriesProgress:[],chartOptionsProgress:{colors:["#00b0ff","#9e9e9e"],labels:["ENVIADOS","PROCESANDO"],chart:{type:"donut"},responsive:[{breakpoint:337,options:{chart:{width:200},legend:{position:"bottom"}}}]},showChartDeliverability:!0,seriesDeliverability:[],chartOptionsDeliverability:{colors:["#59CE8F","#FF1E00"],labels:[" Enviados","Rechazados"],chart:{type:"pie"},responsive:[{breakpoint:337,options:{chart:{width:100},legend:{position:"bottom"}}}]}}},computed:{getNameUser:function(){var t,e;return(null===(t=this.dataCampaign)||void 0===t||null===(e=t.user)||void 0===e?void 0:e.name)||""},getNameCompany:function(){var t,e,a,n;return null!==(t=this.dataCampaign)&&void 0!==t&&null!==(e=t.company)&&void 0!==e&&e.company?"("+(null===(a=this.dataCampaign)||void 0===a||null===(n=a.company)||void 0===n?void 0:n.company)+")":""},getNameCampaign:function(){var t,e;return(null===(t=this.dataCampaign)||void 0===t||null===(e=t.campaing)||void 0===e?void 0:e.name)||""},getTypeCampaign:function(){var t,e;return(null===(t=this.dataCampaign)||void 0===t||null===(e=t.type_company)||void 0===e?void 0:e.name)||""},getDate:function(){var t,e;return Q()(null===(t=this.dataCampaign)||void 0===t||null===(e=t.campaing)||void 0===e?void 0:e.updated_at).format("Y-M-D H:M:S")||""}},created:function(){this.getAllSmsByCampaing()},mounted:function(){this.showChartDeliverability=!0,this.showChartProgress=!0},methods:{getAllSmsByCampaing:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={campaign_id:t.$route.params.campaign_id,service_id:1,searchtext:""},e.next=3,p["a"].post("/dashBoardProgress",a).then((function(e){e.data.success&&(t.seriesProgress.push(e.data.data.progress_sms),t.seriesProgress.push(e.data.data.progress_resto),t.seriesDeliverability.push(e.data.data.count_status_delivered),t.seriesDeliverability.push(e.data.data.count_status_rejected))}));case 3:case"end":return e.stop()}}),e)})))()},progress:function(){}}},et=tt,at=a("ce7e"),nt=a("5d23"),it=Object(f["a"])(et,Z,G,!1,null,null,null),st=it.exports;_()(it,{VCard:x["a"],VCardText:y["c"],VCardTitle:y["d"],VDivider:at["a"],VListItem:O["a"],VListItemContent:nt["a"],VListItemSubtitle:nt["b"],VListItemTitle:nt["c"]});var rt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-card",[a("v-card-title",[t._v("Métrica")]),a("v-card-text",[t.showChart?a("div",[a("apexchart",{key:t.total,attrs:{type:"radialBar",height:"250",options:t.chartOptions,series:t.series}})],1):t._e()])],1)],1)},ot=[];Q.a.locale("es");var ct={props:{},data:function(){var t=this;return{dd:1,total:10,showChart:!1,series:[],chartOptions:{chart:{height:250,type:"radialBar"},plotOptions:{radialBar:{dataLabels:{name:{fontSize:"27px"},value:{fontSize:"16px"},total:{show:!0,label:"Destinatarios",formatter:function(){return(new Intl.NumberFormat).format(t.total)}}}}},labels:["Procesando","Entregados"]}}},computed:{configFormat:function(){return{decimalDigits:0,decimalSeparator:".",thousandsSeparator:",",currencySymbol:"",currencySymbolNumberOfSpaces:0,currencySymbolPosition:"left"}}},created:function(){this.getAllSmsByCampaing()},mounted:function(){this.showChart=!0},methods:{getAllSmsByCampaing:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={campaign_id:t.$route.params.campaign_id,service_id:1,searchtext:""},e.next=3,p["a"].post("/dashBoardMetrics",a).then((function(e){var a=e.data;a.success&&(t.series.push(a.data.processing),t.series.push(a.data.delivered),a.data.opened>=0&&(t.series.push(a.data.opened),t.chartOptions.labels.push("Aperturados")),a.data.is_bidireccional>0&&(t.series.push(a.data.sending),t.chartOptions.labels.push("RESPONDIDOS")),t.total=a.data.total)}));case 3:case"end":return e.stop()}}),e)})))()},progress:function(){}}},lt=ct,ut=Object(f["a"])(lt,rt,ot,!1,null,null,null),dt=ut.exports;_()(ut,{VCard:x["a"],VCardText:y["c"],VCardTitle:y["d"]});var pt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-card",[a("v-card-title",[t._v("Progreso")]),a("v-card-text",[t.showChart?a("div",[a("apexchart",{attrs:{type:"area",height:"228",options:t.chartOptionsSpark3,series:t.series}})],1):t._e()])],1)],1)},mt=[],ht=(a("159b"),{data:function(){return{series:[],data:[],showChart:!1,chartOptionsSpark3:{chart:{type:"area",height:0,sparkline:{enabled:!0}},stroke:{curve:"smooth"},fill:{opacity:.3},xaxis:{crosshairs:{width:0}},yaxis:{min:0},title:{text:"",offsetX:0,style:{fontSize:"24px"}},subtitle:{text:"",offsetX:0,style:{fontSize:"14px"}}}}},mounted:function(){this.showChart=!0},created:function(){this.progress()},methods:{progress:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={campaign_id:t.$route.params.campaign_id,service_id:1,searchtext:""},e.next=3,p["a"].post("/dashBoardProgress",a).then((function(e){var a=e.data;console.log(a.data),a.success&&(a.data.forEach((function(e){var a={x:e.created,y:e.sms_by_minute};t.data.push(a)})),t.series.push({name:"sms",data:t.data}),console.log(t.series))}));case 3:case"end":return e.stop()}}),e)})))()}}}),vt=ht,gt=Object(f["a"])(vt,pt,mt,!1,null,null,null),ft=gt.exports;_()(gt,{VCard:x["a"],VCardText:y["c"],VCardTitle:y["d"]});var bt={name:"DetailSmsReport",components:{CampaignDetailCardComponent:st,CampaignMetricsdCardComponent:dt,DetailCampaignComponent:A,CampaignProgressComponent:ft,DetailSmsReceivedCampaignComponent:J,BackPage:X["a"],BtnToReload:q["a"]},data:function(){return{dataCampaign:null,registers:0,excelprueba:null,loadingDownloadPdf:!1,has_url:!0,campaigns:[],smsReceiveds:[],pagination:{current:1,total:0},paginationSmsReceived:{current:1,total:0},allSmsOfCampaing:[],allSmsReceivedOfCampaing:[],search:"",searchSmsReceived:"",isLoadingDownload:!1,totalCostSms:0,totalCostSmsReceived:0}},computed:{changedSearch:function(){return this.search},headersForTable:function(){return this.has_url?[{text:"Telefono",value:"phone"},{text:"Mensaje",value:"content"},{text:"Fecha",value:"created"},{text:"LINK PERSONALIZADO",value:"times_open"},{text:"Crédito",value:"credit"},{text:"Operador",value:"carrier"},{text:"Estado",value:"status"}]:[{text:"Telefono",value:"phone"},{text:"Mensaje",value:"content"},{text:"Fecha",value:"created"},{text:"Crédito",value:"credit"},{text:"Operador",value:"carrier"},{text:"Estado",value:"status"}]},is_bidireccional:function(){var t,e;return null===(t=this.dataCampaign)||void 0===t||null===(e=t.sms_campaing)||void 0===e?void 0:e.is_bidireccional}},created:function(){this.getCampaing()},mounted:function(){this.ongetSms(),this.getTotalCostSms(),this.getTotalCostSmsReceived()},methods:{file_to_json:function(){},getSmsReceived:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:e.searchSmsReceived=t,n={campaign_id:e.$route.params.campaign_id,service_id:1,searchtext:t},""!==t&&(e.paginationSmsReceived.current=1),p["a"].post("/smsReceiveds?page="+e.paginationSmsReceived.current,n).then((function(t){t.data.success&&(e.smsReceiveds=t.data.data.data,e.paginationSmsReceived.current=t.data.data.current_page,e.paginationSmsReceived.total=t.data.data.last_page)}));case 4:case"end":return a.stop()}}),a)})))()},ongetSmsReceived:function(t){var e=this;this.searchSmsReceived=t;var a={campaign_id:this.$route.params.campaign_id,service_id:1,searchtext:t};""!==t&&(this.paginationSmsReceived.current=1),p["a"].post("/smsReceiveds?page="+this.paginationSmsReceived.current,a).then((function(t){t.data.success&&(e.smsReceiveds=t.data.data.data,e.paginationSmsReceived.current=t.data.data.current_page,e.paginationSmsReceived.total=t.data.data.last_page)}))},getCampaing:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p["a"].get("/campaign/"+t.$route.params.campaign_id).then((function(e){e.data.success&&(t.dataCampaign=e.data.data,t.registers=e.data.data.registers)}));case 2:case"end":return e.stop()}}),e)})))()},ongetSms:function(t){var e=this;this.search=t;var a={campaign_id:this.$route.params.campaign_id,service_id:1,searchtext:t};console.log(this.$route.params),""!==t&&(this.pagination.current=1),p["a"].post("/smsCampaignDetail?page="+this.pagination.current,a).then((function(t){t.data.success&&(e.campaigns=t.data.data.data,console.log(e.campaigns),e.pagination.current=t.data.data.current_page,e.pagination.total=t.data.data.last_page,null===t.data.data.data[0].url_id&&null===t.data.data.data[0].long_url&&(e.has_url=!1))}))},descargarExcel:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,n,i,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.isLoadingDownload=!0,a={campaign_id:t.$route.params.campaign_id,service_id:1,searchtext:""},e.next=4,p["a"].post("/smsCampaignDetailAll",a).then((function(e){e.data.success&&(t.allSmsOfCampaing=e.data.data,console.log("sms"),console.log(t.allSmsOfCampaing))}));case 4:return e.next=6,p["a"].post("/smsReceivedCampaignDetailAll",a).then((function(e){e.data.success&&(t.allSmsReceivedOfCampaing=e.data.data,console.log("received"),console.log(t.allSmsReceivedOfCampaing))}));case 6:n=[],n=t.has_url?[{label:"Telefono",value:"phone"},{label:"Mensaje",value:"content"},{label:"Fecha",value:"send_at"},{label:"Link",value:function(t){return t.times_open?"ABIERTO":"NO ABIERTO"}},{label:"Credito",value:"credit"},{label:"Operador",value:"carrier"},{label:"Estado",value:"status"}]:[{label:"Telefono",value:"phone"},{label:"Mensaje",value:"content"},{label:"Fecha",value:"send_at"},{label:"Credito",value:"credit"},{label:"Operador",value:"carrier"},{label:"Estado",value:"status"}],i=[{sheet:"Sms",columns:Object(s["a"])(n),content:Object(s["a"])(t.allSmsOfCampaing)}],t.is_bidireccional&&i.push({sheet:"Respondidos",columns:[{label:"Telefono",value:"phone"},{label:"Mensaje",value:"content"},{label:"Fecha",value:"created"},{label:"Credito",value:"credit"}],content:Object(s["a"])(t.allSmsReceivedOfCampaing)}),r={sheetName:"Sms",fileName:"Reporte de campaña"},c()(i,r),t.isLoadingDownload=!1;case 13:case"end":return e.stop()}}),e)})))()},downloadPdf:function(){return Object(r["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e={background:"white",scale:3},d()(document.getElementById("dashboarDetail"),e).then((function(t){var e=t.toDataURL("image/png"),a=new l["a"]("p","pt","a4"),n=15,i=15,s=a.getImageProperties(e),r=a.internal.pageSize.getWidth()-2*n,o=s.height*r/s.width;a.addImage(e,"JPEG",n,i,r,o,void 0,"FAST"),a.save("Reporte de campaña.pdf")}));case 2:case"end":return t.stop()}}),t)})))()},getTotalCostSms:function(){var t=this,e={campaign_id:this.$route.params.campaign_id};p["a"].post("/totalCostCampaign",e).then((function(e){e.data.success&&(t.totalCostSms=e.data.data[0].total_cost)}))},getTotalCostSmsReceived:function(){var t=this,e={campaign_id:this.$route.params.campaign_id};p["a"].post("/totalCostCampaignSmsReceived",e).then((function(e){e.data.success&&(t.totalCostSmsReceived=e.data.data[0].total_cost)}))}}},_t=bt,Ct=a("62ad"),xt=a("0fd9"),yt=Object(f["a"])(_t,n,i,!1,null,null,null);e["default"]=yt.exports;_()(yt,{VBtn:C["a"],VCol:Ct["a"],VIcon:w["a"],VRow:xt["a"],VSpacer:$["a"]})}}]);
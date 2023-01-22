(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ef701558"],{"4bd4":function(t,e,a){"use strict";var n=a("5530"),i=(a("caad"),a("2532"),a("07ac"),a("4de4"),a("159b"),a("7db0"),a("58df")),s=a("7e2b"),r=a("3206");e["a"]=Object(i["a"])(s["a"],Object(r["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,a=function(t){return t.$watch("hasError",(function(a){e.$set(e.errorBag,t._uid,a)}),{immediate:!0})},n={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=t.$watch("shouldValidate",(function(i){i&&(e.errorBag.hasOwnProperty(t._uid)||(n.valid=a(t)))})):n.valid=a(t),n},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var a=this.watchers.find((function(t){return t._uid===e._uid}));a&&(a.valid(),a.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(n["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},fb4a:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex flex-column flex-grow-1"},[a("div",{staticClass:"d-flex align-center py-3"},[t._m(0),a("v-spacer"),a("v-btn",{attrs:{outlined:"",color:"primary",loading:t.isLoadingDownload},on:{click:t.descargarExcel}},[a("v-icon",[t._v("mdi-progress-download")])],1),a("BtnToReload")],1),a("TableReportComponent",{attrs:{headers:t.headers,items:t.reports,"total-cost-campaign":t.totalCostCampaign,search_text:t.search_text,"is-loading":t.isLoading},on:{onfilter:t.on_filter,onreadyusers:t.onreadyusers,onDetail:t.onDetail}})],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"display-1"},[t._v("Reporte de servicios")])])}],s=a("2909"),r=(a("159b"),a("7db0"),a("a434"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("FiltersReportComponent",{on:{onfilter:t.onfilter,onreadyfilters:t.onreadyfilters,onreadyusers:t.onreadyusers}}),a("v-card",[a("v-card-title",[t._v(" Resultados: "+t._s(t._f("formatCurrency")(t.totalCostCampaign,t.configFormat))),a("small",{staticClass:"ml-1"},[t._v(" créditos")]),a("v-spacer"),a("v-text-field",{staticClass:"flex-grow-1 mr-md-2",attrs:{"append-icon":"mdi-magnify",dense:"",clearable:"",placeholder:"Ej.: Filtrar por name, email, empresa, etc"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchUser(t.searchQuery)}},model:{value:t.searchQuery,callback:function(e){t.searchQuery=e},expression:"searchQuery"}})],1),a("v-data-table",{staticClass:"flex-grow-1",attrs:{headers:t.headers,items:t.items,loading:t.isLoading,search:t.searchQuery},scopedSlots:t._u([{key:"item.name",fn:function(e){var n=e.item;return[t._v(" "+t._s(n.name)+" "),a("v-chip",{staticClass:"ma-1",attrs:{outlined:"","x-small":""}},[t._v(" "+t._s(n.service)+" ")]),n.is_bidireccional?a("v-chip",{attrs:{outlined:"","x-small":""}},[a("v-icon",[t._v("mdi-swap-horizontal")])],1):t._e()]}},{key:"item.total_cost",fn:function(e){var a=e.item;return[t._v(" "+t._s(t._f("formatCurrency")(a.total_cost,t.configFormat))+" ")]}},{key:"item.status",fn:function(e){var n=e.item;return[0===n.status?a("v-chip",{staticClass:"ma-2",attrs:{color:"red","text-color":"white",small:""}},[t._v(" Cancelado ")]):t._e(),1===n.status?a("v-chip",{staticClass:"ma-2",attrs:{color:"green","text-color":"white",small:""}},[t._v(" FINALIZADO ")]):t._e(),2===n.status?a("v-chip",{staticClass:"ma-2",attrs:{"text-color":"white",small:"",dark:""}},[t._v(" PENDIENTE ")]):t._e(),3===n.status?a("v-chip",{staticClass:"ma-2",attrs:{small:"",color:"orange",dark:""}},[t._v(" PROCESANDO ")]):t._e(),4===n.status?a("v-chip",{staticClass:"ma-2",attrs:{color:"orange","text-color":"white",small:""}},[t._v(" AGENDADO ")]):t._e()]}},{key:"item.sms_credit_send",fn:function(e){var a=e.item;return[t._v(" "+t._s((new Intl.NumberFormat).format(a.sms_credit_send))+" ")]}},{key:"item.user_name",fn:function(e){var n=e.item;return[4!==n.campaign_type_id?a("userAvatar",{attrs:{user:{name:n.user,company:n.company,email:n.email}}}):a("div",{staticClass:"d-flex align-center py-1"},[a("v-avatar",{attrs:{size:"40",color:"red"}},[a("span",{staticClass:"white--text text-h5"},[a("v-icon",{attrs:{color:"white"}},[t._v("mdi-api")])],1)]),a("v-col",{staticClass:"py-0 my-0"},[a("v-row",[a("div",{staticClass:"ml-1 caption font-weight-bold"},[t._v(" "+t._s(n.user)+" ")])]),a("v-row",[a("div",{staticClass:"ml-1 caption"},[t._v(" "+t._s(n.email)+" ")])]),a("v-row",[a("div",{staticClass:"ml-1 caption"},[t._v(" "+t._s(n.company)+" ")])])],1)],1)]}},{key:"item.actions",fn:function(e){var n=e.item;return[a("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.attrs,i=e.on;return[a("v-btn",t._g(t._b({attrs:{text:""}},"v-btn",n,!1),i),[t._v(" Acciones ")])]}}],null,!0)},[a("v-list",[a("v-list-item",{attrs:{link:""},on:{click:function(e){return t.detalle(n)}}},[t._v(" Ver detalle ")])],1)],1)]}}],null,!0)})],1)],1)}),o=[],l=(a("a9e3"),a("bc25")),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.submit()}},model:{value:t.validForm,callback:function(e){t.validForm=e},expression:"validForm"}},[a("v-row",{staticClass:"pb-1"},[a("v-col",{staticClass:"col-12 col-lg-3 py-0 pr-0 d-flex justify-space-between"},[a("ComboboxComponent",{ref:"comboUsers",attrs:{loading:t.isLoadingUsers,icon:"mdi-account",label:"Usuarios"},on:{onChange:t.ChangeSelectedUsers}})],1),t._e(),a("v-col",{staticClass:"col-6 col-lg-3 py-0 pr-0 pd-flex justify-space-between"},[a("v-dialog",{ref:"dialogStart",attrs:{"return-value":t.dateStart,persistent:"",width:"290px"},on:{"update:returnValue":function(e){t.dateStart=e},"update:return-value":function(e){t.dateStart=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,i=e.attrs;return[a("v-text-field",t._g(t._b({staticClass:"flex-grow-1 mr-md-2",attrs:{"append-icon":"mdi-calendar-start",label:"Fecha inicio",outlined:"",readonly:"",dense:"",clearable:"",placeholder:"Fecha inicio",rules:[function(t){return!!t||"Fecha de inicio es obligatorio"}]},model:{value:t.dateStart,callback:function(e){t.dateStart=e},expression:"dateStart"}},"v-text-field",i,!1),n))]}}]),model:{value:t.modalDateRangeStart,callback:function(e){t.modalDateRangeStart=e},expression:"modalDateRangeStart"}},[a("v-date-picker",{attrs:{scrollable:"",max:t.maxDateStart},model:{value:t.dateStart,callback:function(e){t.dateStart=e},expression:"dateStart"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.modalDateRangeStart=!1}}},[t._v("Cancelar")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.saveDateStart()}}},[t._v("OK")])],1)],1)],1),a("v-col",{staticClass:"col-6 col-lg-3 py-0 pr-0 d-flex justify-space-between"},[a("v-dialog",{ref:"dialogEnd",attrs:{"return-value":t.dateEnd,persistent:"",width:"290px"},on:{"update:returnValue":function(e){t.dateEnd=e},"update:return-value":function(e){t.dateEnd=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,i=e.attrs;return[a("v-text-field",t._g(t._b({staticClass:"flex-grow-1 mr-md-2",attrs:{"append-icon":"mdi-calendar-end",label:"Fecha fin",readonly:"",outlined:"",dense:"",clearable:"",placeholder:"Fecha fin",rules:[function(t){return!!t||"Fecha fin es obligatorio"}]},model:{value:t.dateEnd,callback:function(e){t.dateEnd=e},expression:"dateEnd"}},"v-text-field",i,!1),n))]}}]),model:{value:t.modalDateRangeEnd,callback:function(e){t.modalDateRangeEnd=e},expression:"modalDateRangeEnd"}},[a("v-date-picker",{attrs:{scrollable:"",min:t.minDateEnd},model:{value:t.dateEnd,callback:function(e){t.dateEnd=e},expression:"dateEnd"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.modalDateRangeEnd=!1}}},[t._v("Cancelar")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.saveDateEnd()}}},[t._v("OK")])],1)],1)],1),a("v-col",{staticClass:"col-12 col-lg-2 py-0 d-flex justify-space-between"},[a("v-btn",{staticClass:"flex-grow-1",attrs:{color:"success",type:"submit"}},[a("v-icon",{attrs:{left:""}},[t._v(" mdi-reload ")]),t._v(" Buscar ")],1)],1)],1)],1)},d=[],u=(a("b0c0"),a("c1df")),m=a.n(u),f=a("88f5"),v=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-select",{staticClass:"flex-grow-1 mr-md-2",attrs:{items:t.items,"item-text":"name","item-value":"id",label:t.label,outlined:"",dense:"",clearable:"",multiple:"",loading:t.loading,placeholder:"Seleccione",rules:[function(t){return 0!==t.length||"Es obligatorio"}]},on:{change:function(e){return t.ifSelectAllItems()}},scopedSlots:t._u([{key:"prepend-item",fn:function(){return[a("v-list-item",{on:{click:t.toggle}},[a("v-list-item-action",[a("v-icon",{attrs:{color:t.selectedItems.length>0?"primary darken-4":""}},[t._v(" "+t._s(t.icon)+" ")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" Todos ")])],1)],1),a("v-divider",{staticClass:"mt-2"})]},proxy:!0},{key:"selection",fn:function(e){var n=e.item,i=e.index;return[0===i?a("div",[t._v(" "+t._s(n.name)+" ")]):t._e(),1===i?a("span",{staticClass:"grey--text text-caption"},[t._v(" (+"+t._s(t.selectedItems.length-1)+" más) ")]):t._e()]}}]),model:{value:t.selectedItems,callback:function(e){t.selectedItems=e},expression:"selectedItems"}})},p=[],h=(a("fb6a"),{props:{loading:{type:Boolean,default:!1},label:{type:String,default:""}},data:function(){return{items:[],selectedItems:[],allSelect:!0}},computed:{computedSelectedItems:function(){var t=[];return this.selectedItems.forEach((function(e){t.push(e.id)})),t},likesAllItem:function(){return this.selectedItems.length===this.items.length},likesSomeItem:function(){return this.selectedItems.length>0&&!this.likesAllItem},icon:function(){return this.likesAllItem?"mdi-close-box":this.likesSomeItem?"mdi-minus-box":"mdi-checkbox-blank-outline"}},mounted:function(){this.ifSelectAllItems()},methods:{list:function(t){this.items=t,this.selectedItems=this.items,this.ifSelectAllItems()},ifSelectAllItems:function(){var t;null!==(t=this.selectedItems[0])&&void 0!==t&&t.id?this.$emit("onChange",this.computedSelectedItems):this.$emit("onChange",this.selectedItems)},toggle:function(){var t=this;this.$nextTick((function(){t.likesAllItem?t.selectedItems=[]:t.selectedItems=t.items.slice()}))}}}),g=h,_=a("2877"),b=a("6544"),y=a.n(b),x=a("ce7e"),C=a("132d"),S=a("da13"),w=a("1800"),E=a("5d23"),k=a("b974"),D=Object(_["a"])(g,v,p,!1,null,null,null),I=D.exports;y()(D,{VDivider:x["a"],VIcon:C["a"],VListItem:S["a"],VListItemAction:w["a"],VListItemContent:E["a"],VListItemTitle:E["c"],VSelect:k["a"]});var V={components:{ComboboxComponent:I},data:function(){return{validForm:!0,services:[{id:0,name:"Todos"},{id:1,name:"SMS"},{id:2,name:"IVR"},{id:3,name:"WHATSAPP"},{id:4,name:"MAILLING"}],selectedServices:[],isLoadingServices:!1,selectedUsers:[],isLoadingUsers:!1,maxDateStart:null,dateStart:null,minDateEnd:null,dateEnd:null,modalDateRangeStart:null,modalDateRangeEnd:null,isLoading:!1}},computed:{computedDateFormat:function(){return m()(Date.now()).format("YYYY-MM-DD")}},mounted:function(){this.getUsers(),this.dateStart=this.computedDateFormat,this.dateEnd=this.computedDateFormat},methods:{getUsers:function(){var t=this;this.isLoadingUsers=!0,f["a"].get("/userforreport").then((function(e){var a=[],n=[];e.data.data.forEach((function(t){a.push({id:t.id,name:t.name}),n.push(t.id)})),t.isLoadingUsers=!1,t.$refs.comboUsers.list(a),t.$emit("onreadyusers",n)}))},getServices:function(){this.isLoadingServices=!0;var t=[{id:0,name:"Todos"},{id:1,name:"Sms"},{id:2,name:"Ivr"}];this.isLoadingServices=!1,this.$refs.comboServices.list(t)},saveDateStart:function(){this.$refs.dialogStart.save(this.dateStart),this.minDateEnd=new Date(this.dateStart).toISOString()},saveDateEnd:function(){this.$refs.dialogEnd.save(this.dateEnd),this.maxDateStart=new Date(this.dateEnd).toISOString()},submit:function(){if(this.$refs.form.validate()){var t={users:this.selectedUsers,services:[0,1,2],start_date:this.dateStart,final_date:this.dateEnd};this.$emit("onfilter",t)}},ChangeSelectedUsers:function(t){this.selectedUsers=t},ChangeSelectedServices:function(t){this.selectedServices=t}}},L=V,$=a("8336"),A=a("62ad"),F=a("2e4b"),R=a("169a"),B=a("4bd4"),O=a("0fd9"),U=a("2fa4"),T=a("8654"),j=Object(_["a"])(L,c,d,!1,null,null,null),Y=j.exports;y()(j,{VBtn:$["a"],VCol:A["a"],VDatePicker:F["a"],VDialog:R["a"],VForm:B["a"],VIcon:C["a"],VRow:O["a"],VSpacer:U["a"],VTextField:T["a"]});var N={components:{FiltersReportComponent:Y,userAvatar:l["a"]},props:{headers:{type:Array,default:function(){return[]}},items:{type:Array,default:function(){return[]}},isLoading:{type:Boolean,default:!1},totalCostCampaign:{type:Number,default:0}},data:function(){return{searchQuery:""}},computed:{isAdmin:function(){return $cookies.get("user").isAdmin},configFormat:function(){return{decimalDigits:0,decimalSeparator:".",thousandsSeparator:",",currencySymbol:"",currencySymbolNumberOfSpaces:0,currencySymbolPosition:"left"}}},methods:{detalle:function(t){this.$router.push({name:"reports-sms",params:{campaign_id:t.id,campaign:t}})},downloadFile:function(t){window.location.assign("http://api.enviamas.pe")},onfilter:function(t){this.$emit("onfilter",t)},onreadyfilters:function(){this.$emit("onreadyfilters")},onreadyusers:function(t){this.$emit("onreadyusers",t)},prueba:function(){console.log(this.items)}}},M=N,z=a("8212"),P=a("b0af"),Q=a("99d9"),G=a("cc20"),J=a("8fea"),K=a("8860"),H=a("e449"),W=Object(_["a"])(M,r,o,!1,null,null,null),Z=W.exports;y()(W,{VAvatar:z["a"],VBtn:$["a"],VCard:P["a"],VCardTitle:Q["d"],VChip:G["a"],VCol:A["a"],VDataTable:J["a"],VIcon:C["a"],VList:K["a"],VListItem:S["a"],VMenu:H["a"],VRow:O["a"],VSpacer:U["a"],VTextField:T["a"]});var q=a("ed7b"),X=a("5e85"),tt=a.n(X),et={components:{TableReportComponent:Z,BtnToReload:q["a"]},data:function(){return{search_text:"",users:[],reports:[],headers:[{text:"Usuario",value:"user_name"},{text:"Campaña",value:"name"},{text:"Fecha de envío",value:"created_at"},{text:"Estado",value:"status"},{text:"Créditos",value:"total_cost"},{text:"Acciones",value:"actions"}],isLoading:!1,isLoadingDownload:!1,totalCostCampaign:0}},mounted:function(){this.onreadyusers()},methods:{getReports:function(t){var e=this;this.totalCostCampaign=0,this.reports=[],this.isLoading=!0,f["a"].post("/userCampaignBetween",t).then((function(t){t.data.success&&(e.reports=t.data.data,e.reports.forEach((function(t){e.totalCostCampaign+=t.total_cost}))),e.isLoading=!1}))},on_filter:function(t){var e=t.users,a=t.services;if(void 0!==e.find((function(t){return 0===t}))){var n=e.indexOf(0);e.splice(n,1)}if(void 0!==a.find((function(t){return 0===t}))){var i=a.indexOf(0);a.splice(i,1)}var s={users:e,services:a,start_date:t.start_date,final_date:t.final_date};this.getReports(s)},onDetail:function(t){this.$router.push({path:"/reports/sms/detail/"+t.id})},onreadyusers:function(t){var e=this;this.totalCostCampaign=0,this.isLoading=!0;var a={users:t,services:[1,2],start_date:m()().format("YYYY-MM-DD"),final_date:m()().format("YYYY-MM-DD")};void 0!==t&&f["a"].post("/userCampaignBetween",a).then((function(t){t.data.success&&(e.reports=t.data.data,e.reports.forEach((function(t){e.totalCostCampaign+=t.total_cost}))),e.isLoading=!1}))},descargarExcel:function(){this.isLoadingDownload=!0;var t=[{sheet:"Campañas",columns:[{label:"Usuario",value:"user"},{label:"Email",value:"email"},{label:"Campaña",value:"name"},{label:"Servicio",value:"service"},{label:"Fecha de envio",value:"created_at"},{label:"Estado",value:function(t){return 0===t.status?"cancelado":1===t.status?"finalizado":2===t.status?"pendiente":3===t.status?"procesando":"agendado"}},{label:"Usuario",value:"user"},{label:"Créditos",value:"total_cost"}],content:Object(s["a"])(this.reports)}],e={sheetName:"Reporte",fileName:"Reporte de servicios"};tt()(t,e),this.isLoadingDownload=!1}}},at=et,nt=Object(_["a"])(at,n,i,!1,null,null,null);e["default"]=nt.exports;y()(nt,{VBtn:$["a"],VIcon:C["a"],VSpacer:U["a"]})}}]);
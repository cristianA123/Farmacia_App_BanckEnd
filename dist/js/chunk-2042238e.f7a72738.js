(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2042238e"],{"186b":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex flex-column flex-grow-1"},[a("div",{staticClass:"d-flex align-center py-3"},[t._m(0),a("v-spacer"),a("v-btn",{attrs:{color:"primary"},on:{click:function(e){return t.openNewAgenda()}}},[t._v(" Crear agenda ")])],1),a("v-col",[t.isLoading?a("v-row",[a("v-col",[a("v-skeleton-loader",{staticClass:"mx-auto",attrs:{"max-width":"300",type:"card"}})],1)],1):t._e(),t.itemsEmpty&&!t.isLoading?a("EmptyItems",{attrs:{icon:"mdi-file-sync-outline",text:"No tiene archivos cargados. Para cargar archivos clic en Subir archivo"}}):t._e(),a("new-agenda",{ref:"newAgenda",on:{onCreatedAgenda:t.refresh}})],1)],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"display-1"},[t._v("Agendas")])])}],s=a("d40f"),r=a("88f5"),o=a("ba57"),d=a("a18c"),l={components:{EmptyItems:o["a"],newAgenda:s["a"]},data:function(){return{show:!1,items:[],isLoading:!1}},computed:{itemsEmpty:function(){return 0===this.items.length}},mounted:function(){this.getAgendas()},methods:{getAgendas:function(){var t=this;this.isLoading=!0,r["a"].get("/agenda").then((function(e){t.isLoading=!1,e.data.success&&(t.items=e.data.data),t.items.length>0&&d["a"].push({path:"/tools/agendas/"+t.items[0].id})}))},openNewAgenda:function(t){this.$refs.newAgenda.open(t)},refresh:function(){this.getAgendas()}}},c=l,u=a("2877"),h=a("6544"),f=a.n(h),p=a("8336"),g=a("62ad"),v=a("0fd9"),m=a("3129"),b=a("2fa4"),y=Object(u["a"])(c,i,n,!1,null,null,null);e["default"]=y.exports;f()(y,{VBtn:p["a"],VCol:g["a"],VRow:v["a"],VSkeletonLoader:m["a"],VSpacer:b["a"]})},"1f09":function(t,e,a){},3129:function(t,e,a){"use strict";var i=a("3835"),n=a("5530"),s=(a("ac1f"),a("1276"),a("d81d"),a("a630"),a("3ca3"),a("5319"),a("1f09"),a("c995")),r=a("24b2"),o=a("7560"),d=a("58df"),l=a("80d2");e["a"]=Object(d["a"])(s["a"],r["a"],o["a"]).extend({name:"VSkeletonLoader",props:{boilerplate:Boolean,loading:Boolean,tile:Boolean,transition:String,type:String,types:{type:Object,default:function(){return{}}}},computed:{attrs:function(){return this.isLoading?this.boilerplate?{}:Object(n["a"])({"aria-busy":!0,"aria-live":"polite",role:"alert"},this.$attrs):this.$attrs},classes:function(){return Object(n["a"])(Object(n["a"])({"v-skeleton-loader--boilerplate":this.boilerplate,"v-skeleton-loader--is-loading":this.isLoading,"v-skeleton-loader--tile":this.tile},this.themeClasses),this.elevationClasses)},isLoading:function(){return!("default"in this.$scopedSlots)||this.loading},rootTypes:function(){return Object(n["a"])({actions:"button@2",article:"heading, paragraph",avatar:"avatar",button:"button",card:"image, card-heading","card-avatar":"image, list-item-avatar","card-heading":"heading",chip:"chip","date-picker":"list-item, card-heading, divider, date-picker-options, date-picker-days, actions","date-picker-options":"text, avatar@2","date-picker-days":"avatar@28",heading:"heading",image:"image","list-item":"text","list-item-avatar":"avatar, text","list-item-two-line":"sentences","list-item-avatar-two-line":"avatar, sentences","list-item-three-line":"paragraph","list-item-avatar-three-line":"avatar, paragraph",paragraph:"text@3",sentences:"text@2",table:"table-heading, table-thead, table-tbody, table-tfoot","table-heading":"heading, text","table-thead":"heading@6","table-tbody":"table-row-divider@6","table-row-divider":"table-row, divider","table-row":"table-cell@6","table-cell":"text","table-tfoot":"text@2, avatar@2",text:"text"},this.types)}},methods:{genBone:function(t,e){return this.$createElement("div",{staticClass:"v-skeleton-loader__".concat(t," v-skeleton-loader__bone")},e)},genBones:function(t){var e=this,a=t.split("@"),n=Object(i["a"])(a,2),s=n[0],r=n[1],o=function(){return e.genStructure(s)};return Array.from({length:r}).map(o)},genStructure:function(t){var e=[];t=t||this.type||"";var a=this.rootTypes[t]||"";if(t===a);else{if(t.indexOf(",")>-1)return this.mapBones(t);if(t.indexOf("@")>-1)return this.genBones(t);a.indexOf(",")>-1?e=this.mapBones(a):a.indexOf("@")>-1?e=this.genBones(a):a&&e.push(this.genStructure(a))}return[this.genBone(t,e)]},genSkeleton:function(){var t=[];return this.isLoading?t.push(this.genStructure()):t.push(Object(l["s"])(this)),this.transition?this.$createElement("transition",{props:{name:this.transition},on:{afterEnter:this.resetStyles,beforeEnter:this.onBeforeEnter,beforeLeave:this.onBeforeLeave,leaveCancelled:this.resetStyles}},t):t},mapBones:function(t){return t.replace(/\s/g,"").split(",").map(this.genStructure)},onBeforeEnter:function(t){this.resetStyles(t),this.isLoading&&(t._initialStyle={display:t.style.display,transition:t.style.transition},t.style.setProperty("transition","none","important"))},onBeforeLeave:function(t){t.style.setProperty("display","none","important")},resetStyles:function(t){t._initialStyle&&(t.style.display=t._initialStyle.display||"",t.style.transition=t._initialStyle.transition,delete t._initialStyle)}},render:function(t){return t("div",{staticClass:"v-skeleton-loader",attrs:this.attrs,on:this.$listeners,class:this.classes,style:this.isLoading?this.measurableStyles:void 0},[this.genSkeleton()])}})},"4bd4":function(t,e,a){"use strict";var i=a("5530"),n=(a("caad"),a("2532"),a("07ac"),a("4de4"),a("159b"),a("7db0"),a("58df")),s=a("7e2b"),r=a("3206");e["a"]=Object(n["a"])(s["a"],Object(r["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,a=function(t){return t.$watch("hasError",(function(a){e.$set(e.errorBag,t._uid,a)}),{immediate:!0})},i={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",(function(n){n&&(e.errorBag.hasOwnProperty(t._uid)||(i.valid=a(t)))})):i.valid=a(t),i},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var a=this.watchers.find((function(t){return t._uid===e._uid}));a&&(a.valid(),a.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(i["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},ba57:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"9",lg:"3"}},[a("v-icon",{attrs:{size:"200",color:"#a8a8a8"}},[t._v(t._s(t.icon))]),a("p",{staticStyle:{color:"#a8a8a8"}},[t._v(" "+t._s(t.text)+" ")])],1)],1)},n=[],s={props:{show:{type:Boolean,default:!1},icon:{type:String,default:""},text:{type:String,default:""}}},r=s,o=a("2877"),d=a("6544"),l=a.n(d),c=a("62ad"),u=a("132d"),h=a("0fd9"),f=Object(o["a"])(r,i,n,!1,null,null,null);e["a"]=f.exports;l()(f,{VCol:c["a"],VIcon:u["a"],VRow:h["a"]})},d40f:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{width:"600"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-form",{ref:"formNewAgenda",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.save()}}},[a("v-card-title",{staticClass:"pa-2"},[t._v(" "+t._s(t.isEdit?"Modificar agenda":"Crear agenda")+" "),a("v-spacer"),a("v-btn",{attrs:{icon:""},on:{click:function(e){t.dialog=!1}}},[a("v-icon",[t._v("mdi-close")])],1)],1),a("v-divider"),a("div",[a("v-text-field",{staticClass:"px-2 py-1",attrs:{solo:"",flat:"",placeholder:"Nombre","error-messages":t.isValidName,autofocus:"",required:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),a("v-divider")],1),a("v-divider"),a("v-card-actions",{staticClass:"pa-2"},[a("v-btn",{attrs:{outlined:""},on:{click:t.close}},[t._v("Cancelar")]),a("v-spacer"),a("v-btn",{attrs:{color:"primary",type:"submit",loading:t.isLoadingAgenda}},[t._v("Guardar")])],1)],1)],1)],1)},n=[],s=(a("b0c0"),a("88f5")),r={data:function(){return{backendErrors:{name:""},dialog:!1,name:"",agenda:null,isLoadingAgenda:!1}},computed:{isEdit:function(){return void 0!==this.agenda},isValidName:function(){return void 0===this.backendErrors.name?"":this.backendErrors.name}},methods:{open:function(t){this.agenda=t,this.isEdit?this.name=t.name:this.name="",this.dialog=!0},close:function(){this.dialog=!1,this.isLoadingAgenda=!1},save:function(){var t=this;if(this.$refs.formNewAgenda.validate())if(this.isLoadingAgenda=!0,this.isEdit){var e={name:this.name};s["a"].put("/agenda/"+this.agenda.id,e).then((function(e){e.data.success&&(t.$store.dispatch("app/showToast","Agenda actualizada exitosamente"),t.$emit("onCreatedAgenda"),t.close())})).catch((function(e){t.backendErrors=e.response.data.errors,t.isLoadingAgenda=!1}))}else{var a={name:this.name};s["a"].post("/agenda",a,{headers:{Authorization:"Bearer "+window.localStorage.token}}).then((function(e){e.data.success&&(t.$store.dispatch("app/showToast","Agenda creada exitosamente"),t.$emit("onCreatedAgenda"),t.close())})).catch((function(e){t.isLoadingAgenda=!1,t.backendErrors=e.response.data.errors}))}}}},o=r,d=a("2877"),l=a("6544"),c=a.n(l),u=a("8336"),h=a("b0af"),f=a("99d9"),p=a("169a"),g=a("ce7e"),v=a("4bd4"),m=a("132d"),b=a("2fa4"),y=a("8654"),w=Object(d["a"])(o,i,n,!1,null,null,null);e["a"]=w.exports;c()(w,{VBtn:u["a"],VCard:h["a"],VCardActions:f["a"],VCardTitle:f["d"],VDialog:p["a"],VDivider:g["a"],VForm:v["a"],VIcon:m["a"],VSpacer:b["a"],VTextField:y["a"]})}}]);
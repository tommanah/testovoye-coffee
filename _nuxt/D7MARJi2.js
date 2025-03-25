import{H as N,d as k,j as f,r as m,o as V,t as r,v as i,y as o,x as t,L as _,M as y,P as b,Q as w,R as E,_ as C,z as L,I as R}from"./DLKcPPjX.js";import{u as U}from"./bNDonERs.js";const $=N("products",{state:()=>({products:[],loading:!1,error:null,nameFilter:"",categoryFilter:[],startDate:null,endDate:null}),getters:{filteredProducts:e=>e.products.filter(s=>{const u=e.nameFilter?s.name.toLowerCase().includes(e.nameFilter.toLowerCase()):!0,c=e.categoryFilter.length>0?e.categoryFilter.includes(s.category):!0;let d=!0;if(e.startDate||e.endDate){const h=new Date(s.date_created);if(e.startDate){const n=new Date(e.startDate);h<n&&(d=!1)}if(e.endDate){const n=new Date(e.endDate);h>n&&(d=!1)}}return u&&c&&d}),categories:e=>{const s=new Set;return e.products.forEach(u=>s.add(u.category)),Array.from(s)}},actions:{async fetchProducts(){this.loading=!0,this.error=null;try{const e=await fetch("/data/products.json");if(!e.ok)throw new Error("Ошибка при загрузке продуктов");this.products=await e.json()}catch(e){this.error=e instanceof Error?e.message:"Неизвестная ошибка",console.error("Error fetching products:",e)}finally{this.loading=!1}},setNameFilter(e){this.nameFilter=e},setCategoryFilter(e){this.categoryFilter=e},setDateRange(e,s){this.startDate=e,this.endDate=s},clearFilters(){this.nameFilter="",this.categoryFilter=[],this.startDate=null,this.endDate=null}}}),T={class:"product-table-container"},j={key:0,class:"loading"},B={key:1,class:"error"},A={key:2},z={class:"filters"},H={class:"filter-group"},Q={class:"filter-group"},q={class:"category-checkboxes"},G=["id","value"],J=["for"],K={class:"filter-group date-filter"},O={class:"date-inputs"},W={class:"table-wrapper"},X={class:"products-table"},Y=k({__name:"ProductTable",setup(e){const s=$(),u=f(()=>s.loading),c=f(()=>s.error),d=f(()=>s.filteredProducts),h=f(()=>s.categories),n=m(""),v=m([]),p=m(""),g=m("");V(async()=>{await s.fetchProducts()});const x=()=>{s.setNameFilter(n.value)},P=()=>{s.setCategoryFilter(v.value)},D=()=>{s.setDateRange(p.value||null,g.value||null)},I=()=>{n.value="",v.value=[],p.value="",g.value="",s.clearFilters()},S=F=>{const l=new Date(F);return new Intl.DateTimeFormat("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(l)};return(F,l)=>(i(),r("div",T,[u.value?(i(),r("div",j," Загрузка... ")):c.value?(i(),r("div",B,o(c.value),1)):(i(),r("div",A,[t("div",z,[l[9]||(l[9]=t("h3",null,"Фильтры",-1)),t("div",H,[l[4]||(l[4]=t("label",{for:"name-filter"},"Название продукта:",-1)),_(t("input",{id:"name-filter",class:"filter-input","onUpdate:modelValue":l[0]||(l[0]=a=>n.value=a),placeholder:"Например, мокко",onInput:x},null,544),[[y,n.value]])]),t("div",Q,[l[5]||(l[5]=t("label",null,"Категория:",-1)),t("div",q,[(i(!0),r(b,null,w(h.value,a=>(i(),r("div",{key:a,class:"category-item"},[_(t("input",{type:"checkbox",id:a,value:a,class:"filter-checkbox","onUpdate:modelValue":l[1]||(l[1]=M=>v.value=M),onChange:P},null,40,G),[[E,v.value]]),t("label",{for:a,class:"custom-checkbox"},null,8,J),t("span",null,o(a),1)]))),128))])]),t("div",K,[l[8]||(l[8]=t("label",null,"Дата создания:",-1)),t("div",O,[t("div",null,[l[6]||(l[6]=t("label",{for:"start-date"},"От:",-1)),_(t("input",{id:"start-date",type:"date","onUpdate:modelValue":l[2]||(l[2]=a=>p.value=a),onInput:D},null,544),[[y,p.value]])]),t("div",null,[l[7]||(l[7]=t("label",{for:"end-date"},"До:",-1)),_(t("input",{id:"end-date",type:"date","onUpdate:modelValue":l[3]||(l[3]=a=>g.value=a),onInput:D},null,544),[[y,g.value]])])])]),t("button",{class:"clear-filters",onClick:I},"Сбросить фильтры")]),t("div",W,[t("table",X,[l[10]||(l[10]=t("thead",null,[t("tr",null,[t("th",null,"ID"),t("th",null,"Название"),t("th",null,"Категория"),t("th",null,"Цена"),t("th",null,"Описание"),t("th",null,"Статус"),t("th",null,"Дата создания")])],-1)),t("tbody",null,[(i(!0),r(b,null,w(d.value,a=>(i(),r("tr",{key:a.id},[t("td",null,o(a.id),1),t("td",null,o(a.name),1),t("td",null,o(a.category),1),t("td",null,o(a.price)+" ₽",1),t("td",null,o(a.description),1),t("td",null,o(a.status),1),t("td",null,o(S(a.date_created)),1)]))),128))])])])]))]))}}),Z=C(Y,[["__scopeId","data-v-11bce415"]]),tt={class:"account-container"},et={class:"header"},lt={class:"user-info"},st={class:"content"},at=k({__name:"account",setup(e){const s=U(),u=R(),c=f(()=>s.userFullName),d=async()=>{s.logout(),await u.push("/login")};return(h,n)=>(i(),r("div",tt,[t("div",et,[n[0]||(n[0]=t("h1",null,"Личный кабинет",-1)),t("div",lt,[t("p",null,"Добро пожаловать, "+o(c.value),1),t("button",{class:"logout-btn",onClick:d},"Выход")])]),t("div",st,[L(Z)])]))}}),rt=C(at,[["__scopeId","data-v-e173661b"]]);export{rt as default};

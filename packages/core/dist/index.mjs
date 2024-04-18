import{ErrorEventTypes as u,ErrorTypes as l,getTimestamp as y,reportData as f}from"@imrobot/shared";import v from"error-stack-parser";import S from"md5";var h=new Set;var p=e=>S(e);function c(e){return h.has(e)?!0:(h.add(e),!1)}var T=e=>{let{fileName:t,columnNumber:o,lineNumber:r}=v.parse(e)[0],n={type:u.ERROR,fileName:t,url:location.href,message:e.message,lineNumber:r,columnNumber:o,time:y()},a=p(`${n.type}-${n.message}-${n.url}-${n.columnNumber}`);if(!c(a))return f("/error/code",n),l.CODE},x=({src:e,localName:t,href:o})=>{let r={url:location.href,type:u.RESOURCE,source:e||o,target:t,time:y()},n=p(`${r.type}-${r.source}-${r.url}-${r.target}`);if(!c(n))return f("/error/resource",r),l.RESOURCE},D=e=>{if(e.reason.name==="AxiosError")return;let{fileName:t,columnNumber:o,lineNumber:r}=v.parse(e.reason)[0],n={type:u.UNHANDLEDREJECTION,fileName:t,url:location.href,message:e.reason.message,lineNumber:r,columnNumber:o,time:y()},a=p(`${n.type}-${n.message}-${n.url}-${n.columnNumber}`);if(!c(a))return f("/error/code",n),l.CODE},H=e=>{let{url:t,sendTime:o,status:r,elapsedTime:n,response:a,requestData:d,method:L}=e;if(r===0||r>=400){let i={type:u.XHR,url:location.href,requestURL:t,time:o,status:r,response:a,elapsedTime:n,method:L,requestData:d},I=p(`${i.type}-${i.response}-${i.method}-${i.status}`);if(!c(I))return f("/error/request",i),l.REQUEST}};import{EventTypes as s,global as w}from"@imrobot/shared";import{EventTypes as C,getTimestamp as N}from"@imrobot/shared";var A=()=>{q(),P()},q=()=>{let e=XMLHttpRequest.prototype,t=e.open;e.open=function(...o){let r=this;r.data={method:o[0],url:o[1],sendTime:N()},t.apply(r,o)}},P=()=>{let e=XMLHttpRequest.prototype,t=e.send;e.send=function(...o){let r=this;r.data.requestData=o[0],r.addEventListener("loadend",()=>{let{responseType:n,response:a,status:d}=r;["","json","text"].includes(n)&&(r.data.response=a,r.data.status=d,r.data.elapsedTime=new Date(N()).getTime()-new Date(r.data.sendTime).getTime()),E(C.XHR,r.data)}),t.apply(r,o)}};var g={},j={[s.VUE]:e=>J(e),[s.ERROR]:()=>M(),[s.UNHANDLEDREJECTION]:()=>V(),[s.XHR]:()=>A()},m=(e,t,o)=>{if(e in g)return!1;g[e]=t;let r=j[e];return o?r&&r(o):r&&r(),!0},E=(e,...t)=>{w.hasError=!0;let o=g[e];if(o){let r=o(...t);r&&k(r)}},J=e=>{e.config.errorHandler=t=>{E(s.VUE,t)}},M=()=>{window.addEventListener(s.ERROR,e=>E(s.ERROR,e),!0)},V=()=>{window.addEventListener(s.UNHANDLEDREJECTION,e=>E(s.UNHANDLEDREJECTION,e))},U=[],b=e=>{U.push(e)},k=e=>{U.forEach(t=>{setTimeout(()=>{t(e)},0)})};import{EventTypes as R}from"@imrobot/shared";var O=e=>{m(R.VUE,t=>T(t),e),m(R.ERROR,t=>{let o=t.target;return o!=null&&o.localName?x(o):T(t.error)}),m(R.UNHANDLEDREJECTION,t=>D(t)),m(R.XHR,t=>H(t)),F()},$=[],X=(e,t)=>{$.push(()=>e.install(t)),e.afterEvent&&b(e.afterEvent)},F=()=>{$.forEach(e=>{e()})};import{default as de}from"@imrobot/behavior";import{playScreen as ye,default as Te}from"@imrobot/screen";var Q={install:O,use:X},le=Q;export{de as behavior,le as default,ye as playScreen,Te as screen};
//# sourceMappingURL=index.mjs.map
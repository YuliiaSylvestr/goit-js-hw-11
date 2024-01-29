import{S as u,i as l}from"./assets/vendor-1d172d44.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const i={galleryContainer:document.querySelector(".gallery"),form:document.querySelector(".form"),searchInput:document.querySelector(".input")};function p(o){return o.map(({previewURL:a,largeImageURL:s,tags:r,likes:e,views:t,comments:n,downloads:c})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${s}">
          <img
            class="gallery-image"
            src="${a}"
            data-source="${s}"
            alt="${r}"
          />
          <div class="stats">
            <div class="stats-item">
              <span class="stats-item-title">Likes</span>
              <span class="stats-item-value">${e}</span>
            </div>
            <div class="stats-item">
              <span class="stats-item-title">Views</span>
              <span class="stats-item-value">${t}</span>
            </div>
            <div class="stats-item">
              <span class="stats-item-title">Comments</span>
              <span class="stats-item-value">${n}</span>
            </div>
            <div class="stats-item">
              <span class="stats-item-title">Downloads</span>
              <span class="stats-item-value">${c}</span>
            </div>
          </div>
        </a>
      </li>`).join("")}let d=new u(".gallery a",{captionsData:"alt",captionDelay:"250",captionType:"alt"});i.form.addEventListener("submit",o=>{o.preventDefault();const a=i.searchInput.value;i.galleryContainer.innerHTML=`
    <div class="loader"></div>
  `,fetch(`https://pixabay.com/api/?key=42081820-380f934f7feb19076f66ce532&q=${encodeURI(a)}&image_type=photo&orientation=horizontal&safesearch=true`).then(s=>s.json()).then(s=>{const r=s.hits;if(r.length===0){l.error({title:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#f53d3d",titleColor:"white",progressBar:!1,icon:""}),i.galleryContainer.innerHTML="";return}const e=p(r);i.galleryContainer.innerHTML=e,d.refresh()}).catch(()=>{i.galleryContainer.innerHTML="",l.error({title:"Sorry, something went wrong. Please try again!",position:"topRight",backgroundColor:"#f53d3d",titleColor:"white",progressBar:!1,icon:""})})});
//# sourceMappingURL=commonHelpers.js.map

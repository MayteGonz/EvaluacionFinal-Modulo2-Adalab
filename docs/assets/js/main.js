"use strict";const inputSearch=document.querySelector(".js-search"),btnSearch=document.querySelector(".btn-search"),sectionSearch=document.querySelector(".js-sectionSearch"),sectionFav=document.querySelector(".js-sectionFavorites"),preShows=document.querySelector(".js-recomendedShows"),btnclearFavs=document.querySelector(".js-btnClearFavs"),url="https://api.tvmaze.com/search/shows?q=",url2="https://api.tvmaze.com/search/shows?q=girls";let showsFound=[],showsFavs=[];const showsLS=JSON.parse(localStorage.getItem("shows")),showsFavsLS=JSON.parse(localStorage.getItem("showsFavs"));function renderPreShows(){null!==showsFavsLS&&(showsFavs=showsFavsLS,renderShowList(showsFavs,sectionFav)),null!==showsLS?(showsFound=showsLS,renderShowList(showsFound,sectionSearch)):fetch(url2).then(e=>e.json()).then(e=>{showsFound=e,renderShowList(showsFound,sectionSearch),localStorage.setItem("shows",JSON.stringify(showsFound)),preShows.innerHTML="Algunas peliculas recomendadas para tí"})}function requestShows(){const e=inputSearch.value;fetch(url+e).then(e=>e.json()).then(s=>{0===s.length?(preShows.innerHTML="Prueba a buscar de nuevo =(",sectionSearch.innerHTML=""):(preShows.innerHTML="Esto es lo que hemos encontrado: ",showsFound=s,renderShowList(showsFound,sectionSearch)),""===e&&(renderPreShows(),preShows.innerHTML="")})}function renderOneShow(e){const s=document.createElement("article");s.classList.add("card"),s.classList.add("js-card"),s.setAttribute("id",e.show.id),-1!==showsFavs.findIndex(s=>s.show.id===e.show.id)&&s.classList.add("favorite");const o=document.createElement("button");o.classList.add("btnDelete"),o.textContent="X";const t=document.createElement("h3");t.classList.add("titleShow"),t.textContent=e.show.name;const n=document.createElement("img");return n.alt="Imagen de portada de la peli "+e.show.name,e.show.image?n.src=e.show.image.medium:n.src="./assets/images/placeholderShow.jpg",n.classList.add("imgShow"),s.appendChild(t),s.appendChild(n),s}function renderShowList(e,s){s.innerHTML="";for(const o of e)s.appendChild(renderOneShow(o));addEventCardShow()}function handleClickSearch(e){e.preventDefault(),requestShows()}function handleClickShow(e){const s=parseInt(e.currentTarget.id);let o=showsFound.find(e=>e.show.id===s);const t=showsFavs.findIndex(e=>e.show.id===s);-1===t?showsFavs.push(o):showsFavs.splice(t,1),renderShowList(showsFavs,sectionFav),renderShowList(showsFound,sectionSearch),localStorage.setItem("showsFavs",JSON.stringify(showsFavs))}function handleClickClear(){showsFavs=[],localStorage.removeItem("showsFavs"),renderShowList(showsFavs,sectionFav),renderShowList(showsFound,sectionSearch)}function addEventCardShow(){const e=document.querySelectorAll(".js-card");for(const s of e)s.addEventListener("click",handleClickShow)}btnSearch.addEventListener("click",handleClickSearch),renderPreShows(),btnclearFavs.addEventListener("click",handleClickClear);
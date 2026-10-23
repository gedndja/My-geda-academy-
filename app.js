const courses = [
  {id:1,title:"Introduction au trading",access:"free",label:"Gratuit",icon:"📘",duration:"5 leçons · Débutant",desc:"Découvre ce qu'est le trading, les marchés, les risques et le vocabulaire essentiel.",lessons:["Comprendre le trading","Forex, or et indices : aperçu","Acheteur, vendeur et prix","Les risques à connaître","Quiz de révision"]},
  {id:2,title:"Comprendre le Forex et le Gold",access:"free",label:"Gratuit",icon:"🌍",duration:"4 leçons · Débutant",desc:"Explore les paires de devises et l'or, les cotations et les horaires de marché.",lessons:["Lire une cotation","Pips et taille de position","Spécificités de l'or","Horaires et volatilité"]},
  {id:3,title:"Chandeliers et tendances",access:"free",label:"Gratuit",icon:"🕯️",duration:"5 leçons · Débutant",desc:"Apprends à lire les bougies et à identifier une structure de marché simple.",lessons:["Anatomie d'une bougie","Corps et mèches","Tendance haussière","Tendance baissière","Exercices visuels"]},
  {id:4,title:"Supports et résistances",access:"premium",label:"Premium",icon:"📈",duration:"6 leçons · Intermédiaire",desc:"Méthode d'identification des zones, avec cas pratiques et exercices.",lessons:["Tracer une zone","Éviter les niveaux forcés","Cassure ou rejet ?","Retest","Études de cas","Évaluation"]},
  {id:5,title:"Fibonacci et zone OTE",access:"premium",label:"Premium",icon:"🧭",duration:"5 leçons · Intermédiaire",desc:"Étudie les retracements et leurs limites sans transformer un niveau en certitude.",lessons:["Tracer Fibonacci","Niveaux courants","Contexte de marché","Plan et invalidation","Exercices"]},
  {id:6,title:"Gestion du risque",access:"premium",label:"Premium",icon:"🛡️",duration:"5 leçons · Tous niveaux",desc:"Taille de position, stop loss, risque par opération et discipline.",lessons:["Risque et perte potentielle","Calculer une position","Stop Loss et invalidation","Journal de trading","Discipline"]}
];
const grid=document.querySelector("#courseGrid");
const empty=document.querySelector("#emptyState");
const dialog=document.querySelector("#courseDialog");
const dialogContent=document.querySelector("#dialogContent");
let currentFilter="all";
function render(){
  const shown=courses.filter(c=>currentFilter==="all"||c.access===currentFilter);
  grid.innerHTML=shown.map(c=>`
    <article class="course-card">
      <div class="course-art"><span class="art-icon">${c.icon}</span><span class="art-num">${String(c.id).padStart(2,"0")}</span></div>
      <div class="course-content">
        <span class="pill ${c.access==="premium"?"premium":""}">${c.label}</span>
        <h3>${c.title}</h3><p>${c.desc}</p>
        <div class="course-meta">${c.duration}</div>
        <button class="button ${c.access==="free"?"primary":"ghost"}" data-course="${c.id}">${c.access==="free"?"Voir le programme":"Voir les détails"}</button>
      </div>
    </article>`).join("");
  empty.classList.toggle("hidden",shown.length!==0);
}
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  currentFilter=btn.dataset.filter;
  document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===btn));
  render();
}));
grid.addEventListener("click",e=>{
  const btn=e.target.closest("[data-course]"); if(!btn)return;
  const course=courses.find(c=>c.id===Number(btn.dataset.course));
  dialogContent.innerHTML=`<span class="pill ${course.access==="premium"?"premium":""}">${course.label}</span>
    <h3>${course.title}</h3><p>${course.desc}</p><p><b>Programme proposé</b></p>
    <ol>${course.lessons.map(l=>`<li>${l}</li>`).join("")}</ol>
    ${course.access==="free"
      ?'<p><b>Démo :</b> voici le programme indicatif. Les leçons complètes seront ajoutées au site lors de la prochaine étape.</p>'
      :'<p><b>Accès premium non activé :</b> aucun paiement n’est demandé dans cette maquette. Nous ajouterons un paiement vérifié avant le lancement.</p>'}`;
  dialog.showModal();
});
document.querySelector("#dialogClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
const menu=document.querySelector("#menuToggle"),nav=document.querySelector("#navLinks");
menu.addEventListener("click",()=>{
  const opened=nav.classList.toggle("open");
  menu.setAttribute("aria-expanded",String(opened));
});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
const toast=document.querySelector("#toast");
let toastTimeout;
document.querySelector("#interestButton").addEventListener("click",()=>{
  toast.textContent="Merci ! L’inscription sera disponible dans la prochaine version.";
  toast.classList.add("show");clearTimeout(toastTimeout);
  toastTimeout=setTimeout(()=>toast.classList.remove("show"),3300);
});
document.querySelector("#year").textContent=new Date().getFullYear();
render();

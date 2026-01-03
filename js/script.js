// === HUD STATE SYSTEM ===
let stats = {
  o2: 100,
  suit: 100,
  san: 100,
  inf: 0,
  thirst: 10,
  hunger: 10
};

let conditions = [
  {key:"thirst", label:"SEDE", type:"tick"},
  {key:"hunger", label:"FOME", type:"tick"},
  {key:"cold", label:"FRIO", type:"state"},
  {key:"heat", label:"CALOR", type:"state"},
  {key:"par", label:"PARANOIA", type:"add"},
  {key:"deaf", label:"SURDO", type:"state"},
  {key:"press", label:"DESPRESSURIZAÇÃO", type:"state"},
  {key:"tox", label:"TOXEMIA", type:"state"},
  {key:"sensor", label:"FALHA SENSOR", type:"state"},
  {key:"paralyze", label:"PARALISIA", type:"state"},
  {key:"rad", label:"RADIAÇÃO", type:"state"},
  {key:"shock", label:"CHOQUE TÉRMICO", type:"state"}
];

const condGrid = document.getElementById("condGrid");
condGrid.innerHTML = conditions.map(c=>{
  if(c.type==="tick") return `<div class="cond">${c.label} <button onclick="tick('${c.key}')">–</button> <span id="${c.key}">10</span></div>`;
  if(c.type==="add") return `<div class="cond">${c.label} <button onclick="add('${c.key}')">+</button> <span id="${c.key}">0</span></div>`;
  if(c.type==="state") return `<div class="cond">${c.label} <button onclick="toggle('${c.key}')">toggle</button></div>`;
}).join("");

// === RENDER SYSTEM ===
function render(){
  document.getElementById("thirst").textContent = stats.thirst;
  document.getElementById("hunger").textContent = stats.hunger;
  document.getElementById("par").textContent = stats.paranoia || 0;
}

// === BUTTON ACTIONS ===
window.tick = k => { stats[k] = Math.max(0, stats[k]-1); render(); }
window.add = k => { stats[k] = (stats[k]||0) + Math.ceil(Math.random()*3); render(); }
window.toggle = k => { document.getElementById(k).classList.toggle("active"); }

// === PHOTO PREVIEW ===
const photoInput = document.getElementById("photoInput");
photoInput.onchange = e=>{
  const file = e.target.files[0];
  if(!file) return;
  const img = document.getElementById("photoPreview");
  img.src = URL.createObjectURL(file);
  img.style.display="block";
}

// === INVENTORY SEGMENTS ===
document.getElementById("invBox").innerHTML = Array(20).fill('<div class="slot"></div>').join('');

render();

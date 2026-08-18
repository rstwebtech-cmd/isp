/* ---------------- Everything runs after DOM is fully ready (avoids
   "buttons not clickable" issues caused by script timing on some hosts) ---------------- */
document.addEventListener('DOMContentLoaded', function(){

/* ---------------- Navigation ---------------- */
const roleAccess = {
  admin:   { label:"Owner / Admin", hide:[] },
  staff:   { label:"Staff (Limited)", hide:['gateway','apiconfig','roles','finance'] },
  support: { label:"Support Agent", hide:['gateway','apiconfig','roles','finance','packages','invoice','payments'] },
};

function go(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target = document.getElementById('page-'+id);
  if(target) target.classList.add('active');
  document.querySelectorAll('.navitem').forEach(n=>n.classList.remove('active'));
  const nav = document.querySelector('.navitem[data-page="'+id+'"]');
  if(nav) nav.classList.add('active');
  closeSidebar();
  window.scrollTo(0,0);
}
function toggleGroup(el){ el.classList.toggle('open'); el.nextElementSibling.classList.toggle('open'); }

function openSidebar(){
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarBackdrop').classList.add('show');
}
function closeSidebar(){
  if(window.innerWidth<=900){
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarBackdrop').classList.remove('show');
  }
}
document.getElementById('hamburgerBtn').addEventListener('click', function(){
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarBackdrop').classList.toggle('show');
});
document.getElementById('sidebarBackdrop').addEventListener('click', closeSidebar);

function setRole(r){
  const cfg = roleAccess[r];
  document.getElementById('roleLabel').textContent = cfg.label;
  document.querySelectorAll('[data-page]').forEach(n=>{
    n.classList.remove('locked');
    if(cfg.hide.includes(n.dataset.page)) n.classList.add('locked');
  });
  toast('Role switch ho gaya: '+cfg.label);
}

/* ---------------- Modals ---------------- */
function openModal(id){ document.getElementById('modal-'+id).classList.add('show'); }
function closeModal(id){ document.getElementById('modal-'+id).classList.remove('show'); }
function manageSub(name){
  document.getElementById('subActionTitle').textContent = 'Manage: '+name;
  openModal('subAction');
}

/* ---------------- Toast ---------------- */
let toastTimer;
function toast(msg){
  const t=document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2600);
}

/* ---------------- Dynamic tables ---------------- */
const packages = [
  {name:"Franch_100Mbps_1TB_FUP_1Month", speed:"100 Mbps", data:"1 TB", validity:"1 Month", price:"₹700", offer:"—", status:true},
  {name:"itsgangtok @944", speed:"40 Mbps", data:"Unlimited", validity:"1 Month", price:"₹944", offer:"Festive 10% off", status:true},
  {name:"itsgangtok @1180", speed:"60 Mbps", data:"Unlimited", validity:"1 Month", price:"₹1,180", offer:"—", status:true},
  {name:"itsgangtok @1888", speed:"50 Mbps", data:"Unlimited", validity:"1 Month", price:"₹1,888", offer:"1st month 15% off", status:true},
  {name:"FRN_100Mbps_3TB_1000_30%", speed:"51.2 Mbps", data:"3 TB", validity:"30 Days", price:"₹400", offer:"—", status:false},
];
document.getElementById('pkgTable').innerHTML = packages.map(p=>`
  <tr>
    <td>🏷️</td><td class="cell-strong">${p.name}</td><td>${p.speed}</td><td>${p.data}</td><td>${p.validity}</td><td>${p.price}</td>
    <td>${p.offer==='—'?'<span class="tag tag-gray">None</span>':'<span class="tag tag-amber">'+p.offer+'</span>'}</td>
    <td>${p.status?'<span class="tag tag-green">Enabled</span>':'<span class="tag tag-red">Disabled</span>'}</td>
    <td><button class="btn btn-sm" onclick="toast('Package edit khulega')">Edit</button></td>
  </tr>`).join('');

const subs = [
  {status:"Online", user:"shekhar@its", pkg:"100 Mbps / 1 Month", speed:"100 Mbps", exp:"19 Aug 2026", used:"14.5 GB"},
  {status:"Blocked", user:"lyric231", pkg:"100 Mbps / 1 Month", speed:"100 Mbps", exp:"Expired", used:"22.1 GB"},
  {status:"Online", user:"abhishekgupta@its", pkg:"100 Mbps / 1 Month", speed:"100 Mbps", exp:"20 Aug 2026", used:"2.1 GB"},
  {status:"Online", user:"watercommission", pkg:"150 Mbps / 5TB / 1 Month", speed:"150 Mbps", exp:"25 Aug 2026", used:"18.2 GB"},
  {status:"Online", user:"cs_karmachoden", pkg:"itsgangtok @944", speed:"40 Mbps", exp:"22 Aug 2026", used:"9.6 GB"},
  {status:"Online", user:"rajesh@its", pkg:"100 Mbps / 1 Month", speed:"100 Mbps", exp:"19 Aug 2026", used:"41.3 GB"},
];
document.getElementById('subTable').innerHTML = subs.map(s=>`
  <tr>
    <td>👤</td>
    <td>${s.status==='Online'?'<span class="tag tag-green">Online</span>':'<span class="tag tag-red">Blocked</span>'}</td>
    <td class="cell-strong">${s.user}</td><td>${s.pkg}</td><td>${s.speed}</td><td>${s.exp}</td><td>${s.used}</td>
    <td style="display:flex;gap:6px;">
      <button class="btn btn-sm" onclick="manageSub('${s.user}')">Manage</button>
      <button class="btn btn-sm btn-danger" onclick="toast('${s.user} ka status toggle ho gaya')">${s.status==='Online'?'Block':'Unblock'}</button>
    </td>
  </tr>`).join('');

const timeline = [
  {msg:"Advance Package recharged successfully — Charan@fibernet.ftth", meta:"pranit14@gmail.com · 11:2x"},
  {msg:"Advance recharge activated successfully — watercommission", meta:"System · 11:1x"},
  {msg:"Package recharged successfully — Invoice ITS/GTK/2026/1489 (roman@its)", meta:"Subscriber Self · 10:5x"},
  {msg:"Service auto-stopped — plan expired (lyric231)", meta:"System · 09:4x"},
];
document.getElementById('timelineBody').innerHTML = timeline.map(t=>`
  <div class="timeline-item"><div class="t-dot"></div><div class="t-body"><div class="t-msg">${t.msg}</div><div class="t-meta">${t.meta}</div></div></div>`).join('');

/* ---------------- Charts (wrapped in try/catch so a Chart.js
   load failure never breaks navigation/buttons on the rest of the page) ---------------- */
const chartFont = {family:"Inter"};
let usageChart = null;
const usageData = {
  daily:{labels:['12AM','4AM','8AM','12PM','4PM','8PM'],data:[20,10,45,80,95,60]},
  weekly:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],data:[210,260,240,300,330,410,360]},
  monthly:{labels:['Wk1','Wk2','Wk3','Wk4'],data:[1200,1450,1600,1380]},
};

try{
  if(typeof Chart === 'undefined') throw new Error('Chart.js CDN load nahi hui — internet/CDN block check karo');

  new Chart(document.getElementById('revChart'), {
    type:'line',
    data:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets:[
        {label:'Revenue (₹00)',data:[320,410,380,460,510,600,540],borderColor:'#00D9C0',backgroundColor:'rgba(0,217,192,.12)',tension:.4,fill:true},
        {label:'Data (GB)',data:[210,260,240,300,330,410,360],borderColor:'#8B7CF6',backgroundColor:'rgba(139,124,246,.08)',tension:.4,fill:true}
      ]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{font:chartFont}}},scales:{x:{ticks:{font:chartFont}},y:{ticks:{font:chartFont}}}}
  });
  new Chart(document.getElementById('planChart'), {
    type:'doughnut',
    data:{labels:['100 Mbps','60 Mbps','50 Mbps','40 Mbps','20 Mbps'],
      datasets:[{data:[420,280,190,310,137],backgroundColor:['#00D9C0','#8B7CF6','#FFB648','#FF6B6B','#3395FF']}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:chartFont,boxWidth:10}}}}
  });
  new Chart(document.getElementById('payChart'), {
    type:'bar',
    data:{labels:['12','13','14','15','16','17','18'],
      datasets:[{label:'Payments (₹000)',data:[12,18,9,22,30,26,38],backgroundColor:'#00D9C0',borderRadius:6}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{font:chartFont}},y:{ticks:{font:chartFont}}}}
  });
  usageChart = new Chart(document.getElementById('usageChart'), {
    type:'line',
    data:{labels:usageData.daily.labels, datasets:[{label:'Data Usage (GB)',data:usageData.daily.data,borderColor:'#FFB648',backgroundColor:'rgba(255,182,72,.12)',tension:.4,fill:true}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{font:chartFont}}},scales:{x:{ticks:{font:chartFont}},y:{ticks:{font:chartFont}}}}
  });
}catch(err){
  console.error('Chart render failed (rest of the app still works):', err);
}

function setUsageRange(el,range){
  document.querySelectorAll('#page-usage .pill').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
  if(!usageChart) return;
  usageChart.data.labels = usageData[range].labels;
  usageChart.data.datasets[0].data = usageData[range].data;
  usageChart.update();
}
window.setUsageRange = setUsageRange;
window.go = go;
window.toggleGroup = toggleGroup;
window.setRole = setRole;
window.openModal = openModal;
window.closeModal = closeModal;
window.manageSub = manageSub;
window.toast = toast;

setRole('admin');

}); // end DOMContentLoaded

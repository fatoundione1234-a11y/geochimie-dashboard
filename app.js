/* ── helpers ───────────────────────────────────────────────── */
const fmt  = n => Number.isInteger(n) ? n.toLocaleString('fr-FR') : n.toFixed(2);
const fmtK = n => n >= 1000 ? (n/1000).toFixed(1)+'k' : String(n);

function auClass(au) {
  if (au >= 2000) return { key:'th', label:'Très haute ★', badgeCls:'badge-th' };
  if (au >= 500)  return { key:'h',  label:'Haute',         badgeCls:'badge-h'  };
  if (au >= 50)   return { key:'m',  label:'Modérée',       badgeCls:'badge-m'  };
  return { key:'f', label:'Faible',  badgeCls:'badge-f' };
}

function auColor(au) {
  if (au >= 2000) return '#da3633';
  if (au >= 500)  return '#e3622a';
  if (au >= 50)   return '#c9a227';
  return '#444c56';
}

/* ── Chart.js defaults ─────────────────────────────────────── */
Chart.defaults.color           = '#8b949e';
Chart.defaults.borderColor     = '#30363d';
Chart.defaults.font.family     = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
Chart.defaults.font.size       = 12;
Chart.defaults.plugins.legend.display = false;

const gridCfg = { color:'rgba(48,54,61,.8)', tickColor:'rgba(48,54,61,0)' };

/* ── Tooltip shared ────────────────────────────────────────── */
const tooltipPlugin = {
  enabled: false,
  external({ chart, tooltip }) {
    const el = document.getElementById('tooltip');
    if (tooltip.opacity === 0) { el.style.display = 'none'; return; }
    const dp = tooltip.dataPoints[0];
    const data = dp.raw;
    let html = `<div class="tooltip-title">${data.id || dp.label}</div>`;
    if (data.roche) html += `<div class="tooltip-row"><span class="tooltip-key">Roche</span><span class="tooltip-val">${data.roche}</span></div>`;
    if (data.fm)    html += `<div class="tooltip-row"><span class="tooltip-key">Formation</span><span class="tooltip-val">Fm. ${data.fm}</span></div>`;
    if (data.au !== undefined) html += `<div class="tooltip-row"><span class="tooltip-key">Au</span><span class="tooltip-val">${data.au.toLocaleString('fr-FR')} ppb</span></div>`;
    if (data.as !== undefined) html += `<div class="tooltip-row"><span class="tooltip-key">As</span><span class="tooltip-val">${data.as} ppm</span></div>`;
    if (data.te !== undefined) html += `<div class="tooltip-row"><span class="tooltip-key">Te</span><span class="tooltip-val">${data.te} ppm</span></div>`;
    if (data.prof !== undefined) html += `<div class="tooltip-row"><span class="tooltip-key">Profondeur</span><span class="tooltip-val">${data.prof} m</span></div>`;
    el.innerHTML = html;
    el.style.display = 'block';
    el.style.left = (chart.canvas.getBoundingClientRect().left + tooltip.caretX + 12) + 'px';
    el.style.top  = (chart.canvas.getBoundingClientRect().top  + tooltip.caretY - 10 + window.scrollY) + 'px';
  }
};

/* ════════════════════════════════════════════════════════════
   SECTION: Vue d'ensemble
   ════════════════════════════════════════════════════════════ */
function initOverview() {
  const s = GEO_DATA.samples;
  const maxAu  = Math.max(...s.map(x=>x.au));
  const avgAu  = Math.round(s.reduce((a,x)=>a+x.au,0)/s.length);
  const cibles = s.filter(x=>x.au>=2000).length;
  const avgAs  = Math.round(s.reduce((a,x)=>a+x.as,0)/s.length);
  const avgTe  = (s.reduce((a,x)=>a+x.te,0)/s.length).toFixed(2);
  const avgS   = (s.reduce((a,x)=>a+x.s,0)/s.length).toFixed(2);

  document.getElementById('m-maxau').textContent  = maxAu.toLocaleString('fr-FR');
  document.getElementById('m-avgau').textContent  = avgAu.toLocaleString('fr-FR');
  document.getElementById('m-cibles').textContent = cibles;
  document.getElementById('m-avgas').textContent  = avgAs;
  document.getElementById('m-avgte').textContent  = avgTe;
  document.getElementById('m-avgs').textContent   = avgS;

  // ── Bar: Au par échantillon
  new Chart(document.getElementById('chart-au-bar'), {
    type: 'bar',
    data: {
      labels: s.map(x=>x.id),
      datasets: [{
        data: s.map(x=>({ id:x.id, roche:x.roche, fm:x.fm, au:x.au, as:x.as, te:x.te, prof:x.prof, x:x.id, y:x.au })),
        backgroundColor: s.map(x=>auColor(x.au)),
        borderRadius: 3, borderSkipped: false
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { tooltip: tooltipPlugin },
      scales: {
        x: { grid: gridCfg, ticks:{ maxRotation:45 } },
        y: { grid: gridCfg, ticks:{ callback: fmtK } }
      }
    }
  });

  // ── Doughnut: répartition par classe
  const cls = { th:0, h:0, m:0, f:0 };
  s.forEach(x=>{ cls[auClass(x.au).key]++; });
  new Chart(document.getElementById('chart-donut'), {
    type: 'doughnut',
    data: {
      labels: ['Très haute (≥2000)', 'Haute (500–1999)', 'Modérée (50–499)', 'Faible (<50)'],
      datasets: [{
        data: [cls.th, cls.h, cls.m, cls.f],
        backgroundColor: ['#da3633','#e3622a','#c9a227','#444c56'],
        borderColor: '#161b22', borderWidth: 2
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: {
        legend: { display:true, position:'bottom', labels:{ boxWidth:12, padding:12, color:'#8b949e', font:{size:11} } }
      }
    }
  });

  // ── Bar: Au par formation
  const fms = {};
  s.forEach(x=>{ fms[x.fm] = fms[x.fm]||[]; fms[x.fm].push(x.au); });
  const fmLabels = Object.keys(fms);
  const fmAvg    = fmLabels.map(f=>Math.round(fms[f].reduce((a,b)=>a+b,0)/fms[f].length));
  const fmColors = ['#1f6feb','#238636','#e3622a','#da3633','#6e40c9','#0d6efd'];
  new Chart(document.getElementById('chart-fm'), {
    type: 'bar',
    data: {
      labels: fmLabels.map(f=>f.replace('Fm. ','')),
      datasets: [{ data:fmAvg, backgroundColor:fmColors.slice(0,fmLabels.length), borderRadius:3, borderSkipped:false }]
    },
    options: {
      responsive:true, maintainAspectRatio:false, indexAxis:'y',
      plugins:{ tooltip:{ callbacks:{ label:c=>` ${c.parsed.x.toLocaleString('fr-FR')} ppb` } } },
      scales:{
        x:{ grid:gridCfg, ticks:{ callback:fmtK } },
        y:{ grid:{display:false} }
      }
    }
  });

  // ── Line: Au vs profondeur (sorted by prof)
  const sorted = [...s].sort((a,b)=>a.prof-b.prof);
  new Chart(document.getElementById('chart-depth'), {
    type: 'line',
    data: {
      labels: sorted.map(x=>x.prof+'m'),
      datasets: [{
        data: sorted.map(x=>({ id:x.id, roche:x.roche, fm:x.fm, au:x.au, as:x.as, te:x.te, prof:x.prof, x:x.prof+'m', y:x.au })),
        borderColor:'#d4a017', backgroundColor:'rgba(212,160,23,.12)',
        pointBackgroundColor: sorted.map(x=>auColor(x.au)),
        pointRadius:5, pointHoverRadius:7, tension:.3, fill:true, borderWidth:2
      }]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ tooltip: tooltipPlugin },
      scales:{
        x:{ grid:gridCfg },
        y:{ grid:gridCfg, ticks:{ callback:fmtK } }
      }
    }
  });
}

/* ════════════════════════════════════════════════════════════
   SECTION: Pathfinders
   ════════════════════════════════════════════════════════════ */
function initPathfinders() {
  const s = GEO_DATA.samples;
  const pf = GEO_DATA.pathfinders;

  // Correlation bar chart
  new Chart(document.getElementById('chart-corr'), {
    type: 'bar',
    data: {
      labels: pf.map(p=>p.elem),
      datasets: [{
        data: pf.map(p=>p.corr),
        backgroundColor: pf.map(p=>p.corr>=0.9?'#da3633': p.corr>=0.8?'#e3622a': p.corr>=0.7?'#c9a227':'#444c56'),
        borderRadius:3, borderSkipped:false
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ tooltip:{ callbacks:{ label:c=>`r = ${c.parsed.y}` } } },
      scales:{
        x:{ grid:{display:false} },
        y:{ min:0, max:1, grid:gridCfg, ticks:{ callback:v=>`r=${v}` } }
      }
    }
  });

  // Scatter: Au vs As
  new Chart(document.getElementById('chart-scatter-as'), {
    type: 'scatter',
    data: {
      datasets: [{
        data: s.map(x=>({ id:x.id, roche:x.roche, fm:x.fm, au:x.au, as:x.as, te:x.te, prof:x.prof, x:x.as, y:x.au })),
        backgroundColor: s.map(x=>auColor(x.au)+'cc'),
        pointRadius:7, pointHoverRadius:9
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ tooltip: tooltipPlugin },
      scales:{
        x:{ title:{ display:true, text:'As (ppm)', color:'#8b949e' }, grid:gridCfg },
        y:{ title:{ display:true, text:'Au (ppb)', color:'#8b949e' }, grid:gridCfg, ticks:{ callback:fmtK } }
      }
    }
  });

  // Scatter: Au vs Te
  new Chart(document.getElementById('chart-scatter-te'), {
    type: 'scatter',
    data: {
      datasets: [{
        data: s.map(x=>({ id:x.id, roche:x.roche, fm:x.fm, au:x.au, as:x.as, te:x.te, prof:x.prof, x:x.te, y:x.au })),
        backgroundColor: s.map(x=>auColor(x.au)+'cc'),
        pointRadius:7, pointHoverRadius:9
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ tooltip: tooltipPlugin },
      scales:{
        x:{ title:{ display:true, text:'Te (ppm)', color:'#8b949e' }, grid:gridCfg },
        y:{ title:{ display:true, text:'Au (ppb)', color:'#8b949e' }, grid:gridCfg, ticks:{ callback:fmtK } }
      }
    }
  });

  // Pathfinder anomaly bars
  const pfContainer = document.getElementById('pf-bars');
  pf.forEach(p=>{
    const pct = Math.min(100, Math.round((p.moy/p.seuil)*100));
    const over = p.moy >= p.seuil;
    const color = over ? '#da3633' : '#1f6feb';
    const badgeCls = over ? 'badge-th' : 'badge-f';
    const badgeTxt = over ? 'ANOMALIE' : 'Normal';
    pfContainer.innerHTML += `
    <div class="pf-row">
      <div>
        <div class="pf-elem" style="color:${color}">${p.elem}</div>
        <div class="pf-corr">r = ${p.corr}</div>
      </div>
      <div style="font-size:11px;color:var(--text3);">${p.role.substring(0,22)}…</div>
      <div>
        <div class="pf-bar-bg">
          <div class="pf-bar-fill" style="width:${pct}%;background:${color};"></div>
        </div>
        <div style="font-size:10px;color:var(--text3);margin-top:2px;">moy: ${p.moy} ${p.unit} · seuil: ${p.seuil} ${p.unit}</div>
      </div>
      <div class="pf-val">${p.moy} ${p.unit}</div>
      <div class="pf-anomaly"><span class="badge ${badgeCls}">${badgeTxt}</span></div>
    </div>`;
  });
}

/* ════════════════════════════════════════════════════════════
   SECTION: Éléments majeurs
   ════════════════════════════════════════════════════════════ */
function initMajeurs() {
  const s = GEO_DATA.samples;
  const elems = ['sio2','al2o3','fe2o3','mgo','cao','na2o','k2o'];
  const labels = ['SiO₂','Al₂O₃','Fe₂O₃','MgO','CaO','Na₂O','K₂O'];
  const colors = ['#1f6feb','#238636','#da3633','#6e40c9','#e3622a','#0ca678','#c9a227'];
  const avgs = elems.map(e=>+(s.reduce((a,x)=>a+x[e],0)/s.length).toFixed(2));

  // Radar chart: moyenne éléments majeurs
  new Chart(document.getElementById('chart-radar'), {
    type:'radar',
    data:{
      labels,
      datasets:[{
        label:'Moyenne',
        data:avgs,
        borderColor:'#d4a017', backgroundColor:'rgba(212,160,23,.15)',
        pointBackgroundColor:'#d4a017', borderWidth:2
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ display:false } },
      scales:{ r:{ grid:{ color:'#30363d' }, pointLabels:{ color:'#8b949e' }, ticks:{ color:'#444c56', backdropColor:'transparent' } } }
    }
  });

  // Grouped bar: all majeurs
  new Chart(document.getElementById('chart-majeurs-bar'), {
    type:'bar',
    data:{
      labels: s.map(x=>x.id),
      datasets: elems.map((e,i)=>({
        label: labels[i],
        data: s.map(x=>x[e]),
        backgroundColor: colors[i]+'99',
        borderColor: colors[i],
        borderWidth:1, borderRadius:2, borderSkipped:false
      }))
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ display:true, position:'top', labels:{ boxWidth:10, padding:8, color:'#8b949e', font:{size:10} } } },
      scales:{
        x:{ grid:{display:false}, ticks:{ maxRotation:45, font:{size:10} } },
        y:{ grid:gridCfg, stacked:false, title:{ display:true, text:'%', color:'#8b949e' } }
      }
    }
  });

  // SiO2 vs Fe2O3 scatter
  new Chart(document.getElementById('chart-sio2-fe'), {
    type:'scatter',
    data:{
      datasets:[{
        data: s.map(x=>({ id:x.id, roche:x.roche, fm:x.fm, au:x.au, as:x.as, te:x.te, prof:x.prof, x:x.sio2, y:x.fe2o3 })),
        backgroundColor: s.map(x=>auColor(x.au)+'cc'), pointRadius:7, pointHoverRadius:9
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ tooltip: tooltipPlugin },
      scales:{
        x:{ title:{ display:true, text:'SiO₂ (%)', color:'#8b949e' }, grid:gridCfg },
        y:{ title:{ display:true, text:'Fe₂O₃ (%)', color:'#8b949e' }, grid:gridCfg }
      }
    }
  });
}

/* ════════════════════════════════════════════════════════════
   SECTION: Tableau des données
   ════════════════════════════════════════════════════════════ */
let tableData = [...GEO_DATA.samples];
let sortCol   = 'au';
let sortDir   = -1;

function renderTable(filter='') {
  const maxAu = Math.max(...GEO_DATA.samples.map(x=>x.au));
  let rows = tableData.filter(x=>
    !filter || x.id.toLowerCase().includes(filter) ||
    x.roche.toLowerCase().includes(filter) ||
    x.fm.toLowerCase().includes(filter)
  );
  rows.sort((a,b)=>{
    const av=a[sortCol], bv=b[sortCol];
    return typeof av==='string' ? av.localeCompare(bv)*sortDir : (av-bv)*sortDir;
  });

  document.getElementById('table-count').textContent = `${rows.length} / ${GEO_DATA.samples.length} échantillons`;
  const tbody = document.getElementById('data-tbody');
  tbody.innerHTML = rows.map(x=>{
    const {label,badgeCls} = auClass(x.au);
    const pct = Math.round((x.au/maxAu)*100);
    const col = auColor(x.au);
    return `<tr>
      <td>${x.id}</td>
      <td>${x.roche}</td>
      <td>Fm. ${x.fm}</td>
      <td>${x.prof} m</td>
      <td>
        <div class="au-bar-wrap">
          <div class="au-bar-bg"><div class="au-bar-fill" style="width:${pct}%;background:${col};"></div></div>
          <span class="au-val" style="color:${col}">${x.au.toLocaleString('fr-FR')}</span>
        </div>
      </td>
      <td>${x.as}</td>
      <td>${x.sb}</td>
      <td>${x.te}</td>
      <td>${x.ag}</td>
      <td>${x.cu}</td>
      <td>${x.s}</td>
      <td><span class="badge ${badgeCls}">${label}</span></td>
    </tr>`;
  }).join('');
}

function initTable() {
  document.getElementById('table-search').addEventListener('input', e=>{
    renderTable(e.target.value.toLowerCase().trim());
  });
  document.querySelectorAll('[data-sort]').forEach(th=>{
    th.addEventListener('click', ()=>{
      const col = th.dataset.sort;
      if (sortCol===col) sortDir=-sortDir;
      else { sortCol=col; sortDir=-1; }
      renderTable(document.getElementById('table-search').value.toLowerCase().trim());
    });
  });
  renderTable();
}

/* ════════════════════════════════════════════════════════════
   Navigation
   ════════════════════════════════════════════════════════════ */
const inited = {};

function showSection(id) {
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
  document.getElementById('sec-'+id).classList.add('active');
  document.querySelector(`[data-section="${id}"]`).classList.add('active');

  if (!inited[id]) {
    inited[id]=true;
    if (id==='overview')    initOverview();
    if (id==='pathfinders') initPathfinders();
    if (id==='majeurs')     initMajeurs();
    if (id==='donnees')     initTable();
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.nav-link').forEach(l=>{
    l.addEventListener('click', ()=>showSection(l.dataset.section));
  });
  showSection('overview');
});

// Leadership strip — names/designations as provided 2026-07-03 (hoarding order = protocol order).
// Photos cropped from campaign hoarding (low-res); swap files in assets/img/leaders/ when originals arrive.
window.WARI_DIGNITARIES=[];
window.WARI_SECRETARIES=[
 {n:"डॉ. निपुण विनायक (भा.प्र.से.)", en:"Dr. Nipun Vinayak (I.A.S.)",d:"प्रधान सचिव, सार्वजनिक आरोग्य विभाग, महाराष्ट्र शासन", en:"Principal Secretary, Public Health Dept, Govt of Maharashtra"},
 {n:"श्री. ई. रविंद्रन (भा.प्र.से.)", en:"Mr. E. Ravindran (I.A.S.)",d:"सचिव-२, सार्वजनिक आरोग्य विभाग, महाराष्ट्र शासन", en:"Secretary-2, Public Health Dept, Govt of Maharashtra"},
 {n:"श्री. संजय श्रीपतराव काटकर (भा.प्र.से.)", en:"Mr. Sanjay Katkar (I.A.S.)",d:"आयुक्त, आरोग्य सेवा तथा संचालक, राष्ट्रीय आरोग्य अभियान (NHM), महाराष्ट्र शासन", en:"Commissioner & Director, NHM, Govt of Maharashtra"},
 {n:"डॉ. सुनील भोकरे (भा.प्र.से.)", en:"Dr. Sunil Bhokare (I.A.S.)",d:"आयुक्त, नागरी आरोग्य, महाराष्ट्र शासन", en:"Commissioner, Urban Health, Govt of Maharashtra"}
];
(function(){
  function render(){
    var sec=document.getElementById('secretaries-strip');
    let lang = localStorage.getItem('wari_lang') || 'en';
    if(sec) sec.innerHTML=window.WARI_SECRETARIES.map(function(o){
      let name = (lang === 'en' && o.n_en) ? o.n_en : o.n;
      // Let's split using custom check
      let d_en = {
        "प्रधान सचिव, सार्वजनिक आरोग्य विभाग, महाराष्ट्र शासन": "Principal Secretary, Public Health Dept, Govt of Maharashtra",
        "सचिव-२, सार्वजनिक आरोग्य विभाग, महाराष्ट्र शासन": "Secretary-2, Public Health Dept, Govt of Maharashtra",
        "आयुक्त, आरोग्य सेवा तथा संचालक, राष्ट्रीय आरोग्य अभियान (NHM), महाराष्ट्र शासन": "Commissioner & Director, NHM, Govt of Maharashtra",
        "आयुक्त, नागरी आरोग्य, महाराष्ट्र शासन": "Commissioner, Urban Health, Govt of Maharashtra"
      }[o.d] || o.d;
      let desc = (lang === 'en') ? d_en : o.d;
      return '<div class="offcard"><b>'+name+'</b><small>'+desc.replace(/, महाराष्ट्र (शासन|राज्य)/,'<br>महाराष्ट्र $1')+'</small></div>';
    }).join('');
    var el=document.getElementById('leaders-strip'); if(!el) return;
    el.innerHTML=window.WARI_DIGNITARIES.map(function(o,i){
      var cm=i===0; // Chief Minister — emphasised: larger than peers, smaller than PM
      // Boxes keep the photo's own 208x256 (0.8125) ratio + object-fit:contain
      // so the FULL photo always shows — nothing is cropped. Peers a touch smaller.
      // Same treatment as the PM: white-bordered photo + white text on orange,
      // no white card box. Peers a touch smaller than the CM.
      var imgS=(cm?'max-width:60px;width:60px;height:74px':'max-width:48px;width:48px;height:59px')+';object-fit:contain;border:2px solid #fff;background:#fff;box-shadow:0 3px 9px rgba(0,0,0,.22);border-radius:9px';
      var nmS='color:#fff'+(cm?';font-size:11px':'');
      var dsS='color:#fff;opacity:.92'+(cm?';font-size:9.5px':'');
      return '<div class="ldr'+(cm?' ldr-cm':'')+'" style="background:rgba(255,255,255,.10);box-shadow:none;padding:8px 4px 7px;border:1.5px solid rgba(255,255,255,.55);border-radius:10px"><img style="'+imgS+'" src="'+o.img+'" alt="'+o.n+'" loading="lazy"/><div><b style="'+nmS+'">'+o.n+'</b><small style="'+dsS+'">'+o.d.replace(/, महाराष्ट्र (शासन|राज्य)/,'<br>महाराष्ट्र $1')+'</small></div></div>';
    }).join('');
  }
  window.renderDignitaries = render;
  if(document.readyState!=='loading') render(); else document.addEventListener('DOMContentLoaded', render);
})();

/* LIMINAL SPACE — 공용 데이터 계층 (정규화 테이블 / localStorage 자동 선택)
 * 원격(Supabase): branches, classes, class_details, default_slots, schedule_slots, schedule_days, applications
 *   - 화면 코드는 기존과 동일하게 settings 객체 / apps 배열을 다룹니다.
 *   - store.js가 테이블 ↔ 객체를 조립/분해하고, 지점/클래스는 자연키로 안정 ID를 유지합니다.
 *   - 신청(applications)은 branch_id / class_id (코드)로 저장됩니다.
 * 로컬(localStorage): 설정/신청을 JSON으로 저장(기존 동작 유지).
 */
(function(){
  var CFG = window.SUPA_CONFIG || {};
  var KEY_APPS = 'liminal_applications', KEY_SET = 'liminal_settings';
  var useRemote = !!(CFG.url && CFG.anonKey && window.supabase && window.supabase.createClient);
  var client = useRemote ? window.supabase.createClient(CFG.url, CFG.anonKey) : null;
  var cache = { settings:{}, apps:[] };

  function lsGet(k,f){ try{ return JSON.parse(localStorage.getItem(k)||f); }catch(e){ return JSON.parse(f); } }
  function lsSet(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  function rid(p){ return p+'_'+Date.now().toString(36)+Math.random().toString(36).slice(2,8); }
  function ko(v){ return (v&&typeof v==='object')?(v.ko||v.en||v.vi||''):(v||''); }
  function en(v){ return (v&&typeof v==='object')?(v.en||''):''; }
  function vi(v){ return (v&&typeof v==='object')?(v.vi||''):''; }
  function tri(k,e,v){ return {ko:k||'',en:e||'',vi:v||''}; }
  function numOrNull(x){ if(x===''||x==null) return null; var n=Number(x); return isNaN(n)?null:n; }

  /* ---------- 조립: 테이블 rows → settings 객체 / apps 배열 ---------- */
  function assemble(t){
    var branchById={}, classById={}; // id→{branch,nameKo}
    var settings={ branches:[], branchClasses:[], classDetails:[], defaultSchedule:{}, schedule:{}, site:{}, gallery:[], partners:[], galleryFolders:[], space:[], spaceFolders:[] };
    (t.branches||[]).sort(function(a,b){return (a.sort||0)-(b.sort||0);}).forEach(function(b){
      branchById[b.id]=b.name;
      settings.branches.push({ id:b.id, name:b.name, nameI18n:{ko:b.name||'',en:b.name_en||'',vi:b.name_vi||''}, contact:b.contact||'', link:b.link||'',
        location:tri(b.location_ko,b.location_en,b.location_vi), hours:tri(b.hours_ko,b.hours_en,b.hours_vi),
        instagram:b.instagram||'', facebook:b.facebook||'', linktree:b.linktree||'' });
    });
    var si=(t.site_info||[])[0]; if(si){ settings.site={ brandName:si.brand_name||'', estYear:si.est_year||'', copyrightYear:si.copyright_year||'',
        bizName:si.biz_name||'', bizAddress:si.biz_address||'', bizTax:si.biz_tax||'', bizPhone:si.biz_phone||'', bizEmail:si.biz_email||'', moitUrl:si.moit_url||'', moitLogo:si.moit_logo||'' };
      try{ settings.gallery=JSON.parse(si.gallery_json||'[]')||[]; }catch(e){ settings.gallery=[]; }
      try{ settings.partners=JSON.parse(si.partners_json||'[]')||[]; }catch(e){ settings.partners=[]; }
      try{ settings.galleryFolders=JSON.parse(si.galleryfolders_json||'[]')||[]; }catch(e){ settings.galleryFolders=[]; }
      try{ settings.space=JSON.parse(si.space_json||'[]')||[]; }catch(e){ settings.space=[]; }
      try{ settings.spaceFolders=JSON.parse(si.spacefolders_json||'[]')||[]; }catch(e){ settings.spaceFolders=[]; } }
    (t.classes||[]).sort(function(a,b){return (a.sort||0)-(b.sort||0);}).forEach(function(c){
      var bn=branchById[c.branch_id]||''; classById[c.id]={branch:bn, nameKo:c.name_ko||''};
      settings.branchClasses.push({ id:c.id, branch:bn, order:c.sort||0,
        name:tri(c.name_ko,c.name_en,c.name_vi), desc:tri(c.desc_ko,c.desc_en,c.desc_vi), active:c.active!==false, inquiry:c.inquiry_only===true });
    });
    (t.class_details||[]).forEach(function(d){
      var cm=classById[d.class_id]||{};
      settings.classDetails.push({ id:d.id, branch:branchById[d.branch_id]||cm.branch||'', name:cm.nameKo||'',
        volume:(d.volume==null?'':d.volume), priceKRW:d.price_krw||'', priceVND:d.price_vnd||'', priceUSD:d.price_usd||'',
        discType:d.disc_type||'none', discVal:d.disc_val||'',
        detail:tri(d.detail_ko,d.detail_en,d.detail_vi) });
    });
    (t.default_slots||[]).sort(function(a,b){return (a.sort||0)-(b.sort||0);}).forEach(function(s){
      var bn=branchById[s.branch_id]||''; if(!bn)return; (settings.defaultSchedule[bn]=settings.defaultSchedule[bn]||[])
        .push({ cls:(s.class_id?(classById[s.class_id]||{}).nameKo||'':''), time:s.time||'', cap:s.cap||0 });
    });
    // 휴무(설정됐지만 빈) 날짜 먼저 표시
    (t.schedule_days||[]).forEach(function(d){ var bn=branchById[d.branch_id]||''; if(!bn)return;
      settings.schedule[bn]=settings.schedule[bn]||{}; if(!settings.schedule[bn][d.sched_date]) settings.schedule[bn][d.sched_date]=[]; });
    (t.schedule_slots||[]).forEach(function(s){ var bn=branchById[s.branch_id]||''; if(!bn)return;
      settings.schedule[bn]=settings.schedule[bn]||{}; (settings.schedule[bn][s.sched_date]=settings.schedule[bn][s.sched_date]||[])
        .push({ cls:(s.class_id?(classById[s.class_id]||{}).nameKo||'':''), time:s.time||'', cap:s.cap||0 }); });
    var apps=(t.applications||[]).map(function(a){ var cm=classById[a.class_id]||{};
      return { id:Number(a.id), createdAt:a.created_at, branch:branchById[a.branch_id]||'', 'class':cm.nameKo||'',
        size:a.size||'', date:a.want_date||'', time:a.want_time||'', people:a.people||'1',
        name:a.name||'', phone:a.phone||'', email:a.email||'', nationality:a.nationality||'', facebook:a.sns_facebook||'', instagram:a.sns_instagram||'', msg:a.msg||'', amount:a.amount||'', deposit:a.deposit||'', status:a.status||'new' }; });
    return { settings:settings, apps:apps };
  }

  /* ---------- 분해: settings → 테이블 행 + 변경계획 (자연키로 안정 ID 유지) ---------- */
  function classKey(branch,nameKo){ return branch+'||'+nameKo; }
  function plan(oldS, s){
    var ob = oldS.branches||[], oc = oldS.branchClasses||[], od = oldS.classDetails||[];
    var branchIdByName={}; ob.forEach(function(b){branchIdByName[b.name]=b.id;});
    var classIdByKey={}; oc.forEach(function(c){classIdByKey[classKey(c.branch,ko(c.name))]=c.id;});
    var detailKey=function(d){return d.branch+'||'+d.name+'||'+d.volume;};
    var detIdByKey={}; od.forEach(function(d){detIdByKey[detailKey(d)]=d.id;});

    var brNameToId={}, clKeyToId={};
    var branchRows=(s.branches||[]).map(function(b,i){ var id=branchIdByName[b.name]||rid('br'); brNameToId[b.name]=id;
      return { id:id, name:b.name, name_en:(b.nameI18n?en(b.nameI18n):''), name_vi:(b.nameI18n?vi(b.nameI18n):''), contact:b.contact||'', link:b.link||'',
        location_ko:ko(b.location), location_en:en(b.location), location_vi:vi(b.location),
        hours_ko:ko(b.hours), hours_en:en(b.hours), hours_vi:vi(b.hours),
        instagram:b.instagram||'', facebook:b.facebook||'', linktree:b.linktree||'', sort:i }; });
    var _si=s.site||{};
    var siteRow={ id:'main', brand_name:_si.brandName||'', est_year:_si.estYear||'', copyright_year:_si.copyrightYear||'',
      biz_name:_si.bizName||'', biz_address:_si.bizAddress||'', biz_tax:_si.bizTax||'', biz_phone:_si.bizPhone||'', biz_email:_si.bizEmail||'', moit_url:_si.moitUrl||'', moit_logo:_si.moitLogo||'',
      gallery_json:JSON.stringify(s.gallery||[]), partners_json:JSON.stringify(s.partners||[]), galleryfolders_json:JSON.stringify(s.galleryFolders||[]),
      space_json:JSON.stringify(s.space||[]), spacefolders_json:JSON.stringify(s.spaceFolders||[]) };
    var classRows=(s.branchClasses||[]).map(function(c,i){ var k=classKey(c.branch,ko(c.name)); var id=classIdByKey[k]||rid('cl'); clKeyToId[k]=id;
      return { id:id, branch_id:brNameToId[c.branch]||null, sort:(c.order!=null?c.order:i),
        name_ko:ko(c.name), name_en:en(c.name), name_vi:vi(c.name),
        desc_ko:ko(c.desc), desc_en:en(c.desc), desc_vi:vi(c.desc), active:c.active!==false, inquiry_only:!!c.inquiry }; });
    var detKeyToId={};
    var detailRows=(s.classDetails||[]).map(function(d){ var k=detailKey(d); var id=detIdByKey[k]||rid('cd'); detKeyToId[k]=id;
      return { id:id, branch_id:brNameToId[d.branch]||null, class_id:clKeyToId[classKey(d.branch,d.name)]||null,
        volume:numOrNull(d.volume), price_krw:d.priceKRW||'', price_vnd:d.priceVND||'', price_usd:d.priceUSD||'',
        disc_type:d.discType||'none', disc_val:d.discVal||'',
        detail_ko:ko(d.detail), detail_en:en(d.detail), detail_vi:vi(d.detail) }; });
    // 기본값/스케줄: 전체 교체 (참조 안 됨)
    var defRows=[]; var ds=s.defaultSchedule||{};
    Object.keys(ds).forEach(function(bn){ (ds[bn]||[]).forEach(function(sl,i){ defRows.push({ id:rid('dslot'),
      branch_id:brNameToId[bn]||null, class_id:(sl.cls?clKeyToId[classKey(bn,sl.cls)]||null:null), time:sl.time||'', cap:sl.cap||0, sort:i }); }); });
    var schRows=[], dayRows=[]; var sc=s.schedule||{};
    Object.keys(sc).forEach(function(bn){ var byDate=sc[bn]||{}; Object.keys(byDate).forEach(function(dt){
      dayRows.push({ branch_id:brNameToId[bn]||null, sched_date:dt });
      (byDate[dt]||[]).forEach(function(sl){ schRows.push({ id:rid('sslot'), branch_id:brNameToId[bn]||null,
        sched_date:dt, class_id:(sl.cls?clKeyToId[classKey(bn,sl.cls)]||null:null), time:sl.time||'', cap:sl.cap||0 }); }); }); });
    // schedule_days 복합 PK(branch_id,sched_date) 중복 제거 + branch_id 없는 행 제외
    var _seenDay={}; dayRows=dayRows.filter(function(r){ if(!r.branch_id) return false; var k=r.branch_id+'|'+r.sched_date; if(_seenDay[k]) return false; _seenDay[k]=1; return true; });

    var newBr={}; branchRows.forEach(function(r){newBr[r.id]=1;});
    var newCl={}; classRows.forEach(function(r){newCl[r.id]=1;});
    var newDt={}; detailRows.forEach(function(r){newDt[r.id]=1;});
    return { branchRows:branchRows, siteRow:siteRow, classRows:classRows, detailRows:detailRows, defRows:defRows, schRows:schRows, dayRows:dayRows,
      delBranchIds:ob.map(function(b){return b.id;}).filter(function(id){return id&&!newBr[id];}),
      delClassIds:oc.map(function(c){return c.id;}).filter(function(id){return id&&!newCl[id];}),
      delDetailIds:od.map(function(d){return d.id;}).filter(function(id){return id&&!newDt[id];}),
      brNameToId:brNameToId, clKeyToId:clKeyToId, detKeyToId:detKeyToId };
  }
  // 저장 후 캐시 객체에 안정 ID 주입 (다음 분해가 같은 ID를 재사용하도록)
  function applyIds(s,p){
    (s.branches||[]).forEach(function(b){ if(p.brNameToId[b.name]) b.id=p.brNameToId[b.name]; });
    (s.branchClasses||[]).forEach(function(c){ var id=p.clKeyToId[classKey(c.branch,ko(c.name))]; if(id) c.id=id; });
    (s.classDetails||[]).forEach(function(d){ var id=p.detKeyToId[d.branch+'||'+d.name+'||'+d.volume]; if(id) d.id=id; });
  }

  function appToRow(a){
    var bId=(cache.settings.branches||[]).reduce(function(r,b){return b.name===a.branch?b.id:r;},null);
    var cId=(cache.settings.branchClasses||[]).reduce(function(r,c){return (c.branch===a.branch&&ko(c.name)===a['class'])?c.id:r;},null);
    return { id:a.id, created_at:a.createdAt||new Date().toISOString(), branch_id:bId, class_id:cId,
      size:a.size||'', want_date:a.date||'', want_time:a.time||'', people:String(a.people||'1'),
      name:a.name||'', phone:a.phone||'', email:a.email||'', nationality:a.nationality||'', sns_facebook:a.facebook||'', sns_instagram:a.instagram||'', msg:a.msg||'', amount:a.amount||'', deposit:a.deposit||'', status:a.status||'new' }; }

  /* ---------- 원격 실행 ---------- */
  var NONE='___none___';
  var onErr=null;   // 저장 실패 시 호출되는 콜백(LS.onError로 등록)
  async function _ck(promise,label){
    try{ var r=await promise; if(r&&r.error){return label+': '+(r.error.message||r.error.code||JSON.stringify(r.error));} return null; }
    catch(e){ return label+': '+(e&&e.message||e); }
  }
  // FK 순서를 지키되 독립 작업은 병렬로 — 저장 체감속도 개선
  async function pushPlan(p){
    var errs=[];
    function add(arr){ (arr||[]).forEach(function(e){ if(e) errs.push(e); }); }
    // 1단계: 부모(branches)·site_info 업서트 + 슬롯/휴무 전체삭제 (서로 독립 → 병렬)
    add(await Promise.all([
      p.siteRow ? _ck(client.from('site_info').upsert([p.siteRow]),'site_info') : null,
      p.branchRows.length ? _ck(client.from('branches').upsert(p.branchRows),'branches') : null,
      _ck(client.from('default_slots').delete().neq('id',NONE),'default_slots(del)'),
      _ck(client.from('schedule_slots').delete().neq('id',NONE),'schedule_slots(del)'),
      _ck(client.from('schedule_days').delete().neq('sched_date',NONE),'schedule_days(del)')
    ]));
    // 2단계: classes 업서트 (branches 필요)
    if(p.classRows.length) add([await _ck(client.from('classes').upsert(p.classRows),'classes')]);
    // 3단계: class_details 업서트 + 슬롯/휴무 삽입 + 삭제분(detail) (branches·classes 필요 → 서로 독립 병렬)
    add(await Promise.all([
      p.detailRows.length ? _ck(client.from('class_details').upsert(p.detailRows),'class_details') : null,
      p.defRows.length ? _ck(client.from('default_slots').insert(p.defRows),'default_slots') : null,
      p.schRows.length ? _ck(client.from('schedule_slots').insert(p.schRows),'schedule_slots') : null,
      p.dayRows.length ? _ck(client.from('schedule_days').upsert(p.dayRows,{onConflict:'branch_id,sched_date',ignoreDuplicates:true}),'schedule_days') : null,
      p.delDetailIds.length ? _ck(client.from('class_details').delete().in('id',p.delDetailIds),'class_details(del)') : null
    ]));
    // 4단계: 삭제된 classes·branches 제거 (branches 삭제는 종속행 cascade)
    add(await Promise.all([
      p.delClassIds.length ? _ck(client.from('classes').delete().in('id',p.delClassIds),'classes(del)') : null,
      p.delBranchIds.length ? _ck(client.from('branches').delete().in('id',p.delBranchIds),'branches(del)') : null
    ]));
    return errs;
  }
  async function pushApps(newArr){
    var old=cache.apps||[], oldById={}; old.forEach(function(a){oldById[a.id]=a;});
    var keep={}, changed=[]; newArr.forEach(function(a){ keep[a.id]=1; var o=oldById[a.id];
      if(!o||JSON.stringify(o)!==JSON.stringify(a)) changed.push(a); });
    var del=old.filter(function(a){return !keep[a.id];}).map(function(a){return a.id;});
    var errs=[];
    if(changed.length) errs.push(await _ck(client.from('applications').upsert(changed.map(appToRow)),'applications'));
    if(del.length) errs.push(await _ck(client.from('applications').delete().in('id',del),'applications(del)'));
    return errs.filter(Boolean);
  }

  async function init(){
    if(useRemote){
      try{
        var tables=['branches','classes','class_details','default_slots','schedule_slots','schedule_days','applications','site_info'];
        var res={};
        // 8개 테이블을 병렬로 조회(순차 → 병렬, 로딩 속도 대폭 단축)
        var rs=await Promise.all(tables.map(function(t){ return client.from(t).select('*'); }));
        tables.forEach(function(t,i){ res[t]=(rs[i] && !rs[i].error && rs[i].data)?rs[i].data:[]; });
        var a=assemble(res); cache.settings=a.settings; cache.apps=a.apps;
      }catch(e){ console.warn('Supabase init failed → localStorage', e); useRemote=false; }
    }
    if(!useRemote){ cache.settings=lsGet(KEY_SET,'{}'); cache.apps=lsGet(KEY_APPS,'[]'); }
  }

  function _report(errs){ if(errs&&errs.length){ console.warn('save errors',errs); if(onErr)onErr(errs.join('\n')); } }
  function setSettings(v){
    if(useRemote){ var p=plan(cache.settings||{}, v); applyIds(v,p); pushPlan(p).then(_report,function(e){_report([String(e&&e.message||e)]);}); }
    else { lsSet(KEY_SET, v); }
    cache.settings = v;   // 안정 ID가 주입된 객체를 캐시 (다음 분해의 기준)
  }
  function setApps(v){
    if(useRemote){ pushApps(v).then(_report,function(e){_report([String(e&&e.message||e)]);}); }
    else { lsSet(KEY_APPS, v); }
    cache.apps = v;
  }
  /* 이미지 업로드 → Supabase Storage('images' 공개 버킷) → 공개 URL 반환 */
  async function uploadImage(file, prefix){
    if(!useRemote || !client || !client.storage) return { error:'Supabase 연결이 필요합니다(로컬 모드에서는 업로드 불가).' };
    try{
      var ext=((file.name||'').split('.').pop()||'jpg').toLowerCase().replace(/[^a-z0-9]/g,'')||'jpg';
      var path=(prefix||'img')+'/'+Date.now()+'_'+Math.random().toString(36).slice(2,8)+'.'+ext;
      var up=await client.storage.from('images').upload(path, file, { upsert:false, contentType:file.type||'image/jpeg' });
      if(up.error) return { error:(up.error.message||'업로드 실패') };
      var pub=client.storage.from('images').getPublicUrl(path);
      return { url:(pub && pub.data && pub.data.publicUrl)||'' };
    }catch(e){ return { error:String(e&&e.message||e) }; }
  }

  window.LS = {
    init:init, useRemote:function(){return useRemote;},
    getApps:function(){ return Array.isArray(cache.apps)?cache.apps:[]; }, setApps:setApps,
    getSettings:function(){ return (cache.settings&&typeof cache.settings==='object')?cache.settings:{}; }, setSettings:setSettings,
    onError:function(fn){ onErr=fn; },   // 저장 실패 콜백 등록
    uploadImage:uploadImage,             // 이미지 업로드(Storage)
    _assemble:assemble, _plan:plan   // 단위 테스트용
  };
})();

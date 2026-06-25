/* ---------- 홈(인덱스) 새로고침 시 항상 히어로(맨 위)부터 ---------- */
(function(){
  var seg=location.pathname.split('/').pop();
  if(seg!==''&&seg!=='index.html') return;            // 홈에서만 동작
  if('scrollRestoration' in history) history.scrollRestoration='manual'; // 브라우저 스크롤 복원 끔
  function toTop(){
    if(location.hash) history.replaceState(null,'',location.pathname+location.search); // 앵커 제거
    window.scrollTo(0,0);
  }
  toTop();
  window.addEventListener('load',function(){ setTimeout(toTop,0); });
})();

/* ---------- i18n ---------- */
const I18N = {
  ko: {}, // 기본값은 HTML에 그대로 둠 (data-i18n 키만 매핑)
  en: {
    "nav.concept":"Brand","nav.home":"About","nav.space":"Space","nav.classes":"Classes","nav.apply":"Apply","nav.gallery":"Gallery","nav.location":"Location","nav.contact":"Apply · Contact","space.title":"The Space","space.more":"More about the space →","contact.title":"Contact","contact.note":"Inquiries for classes, companies/groups and collaborations are welcome.",
    "cta.lead":"Complete your own scent, together with a scent designer.","cta.sub":"A premium perfume workshop where you smell 100+ notes, blend, and take home your own bottle.","cta.btn":"Book a class",
    "gallery.title":"Gallery","gallery.featured":"Featured with","gallery.more":"View full gallery →",
    "hero.eyebrow":"Perfume Workshop","hero.sub":"The scent of moments between boundaries. A workshop where you blend and bottle a perfume of your own.",
    "hero.tag1":"Completely new experience","hero.tag2":"Eau de Parfum","hero.cta":"Apply for a class","hero.cta2":"View classes",
    "concept.title":"A scent that begins at the threshold",
    "concept.pa.t":"Over 100 notes","concept.pa.d":"Smell them yourself and discover a taste you never knew.",
    "concept.pb.t":"1:1 with a Scent Designer","concept.pb.d":"A deep moment translating your senses and emotions into words.",
    "concept.pc.t":"A one-of-a-kind scent","concept.pc.d":"Name it and complete it as your own signature.",
    "m.lead":"We all experience moments that belong nowhere entirely. An unfamiliar space, an empty stretch of time, an emotion we cannot name. Beginning from the Latin 'limen' — the threshold — LIMINAL SPACE means a moment of transition undefined by any state. We record that invisible gap as scent.",
    "m.p1":"Scent is not merely a pleasant smell. It is the most primal sense that recalls memory, leaves emotion, and stores a state. The air of a place that once put you at ease, the warmth of a memory shared with someone dear, emotions still lingering without a name. We focus on the time and space made of scent, more than the scent itself.",
    "m.p2":"Here you smell over 100 scents to discover your own taste, recall a past moment to define your present emotion, and complete a still-nameless state as scent. This is not a simple pick-your-scent DIY. Together with a Scent Designer you put your senses and emotions into words, discover a taste you never knew, and complete a one-of-a-kind perfume — that is LIMINAL SPACE.",
    "m.p3":"It is an experience offered for the first time in Vietnam. There have been places to smell, choose and make scents, but never an experience to discover why you are drawn to a scent and who you are. A fun, effortless day — yet by the end you will surely feel something has changed. Starting from an empty, undefined space, when you leave you will have made a scent defined by yourself.",
    "m.quote":"Until you define it, this place is nothing. The moment you define it, this place becomes only yours.",
    "classes.title":"Classes & Programs","classes.inquire":"Inquire","prog.inquiry":"Inquire for price","prog.permonth":"Monthly",
    "apply.title":"How to apply","apply.lede":"Booking takes four steps. Choose a class, design your scent, and take home a bottle of your own.",
    "apply.cta":"Start application","apply.note":"Duration 1–2 hours · By reservation only.",
    "how.s1.t":"Explore scents","how.s1.d":"Smell 100+ curated notes to find your olfactory taste.",
    "how.s2.t":"Design the formula","how.s2.d":"Blend your favorite notes into your own formula with a designer.",
    "how.s3.t":"Name it","how.s3.d":"Name your scent to complete your own signature.",
    "how.s4.t":"Bottling","how.s4.d":"Choose 10·30·50ml, bottled with a pouch to take home.",
    "proc.title":"The Class Process",
    "proc.s1.t":"Consultation","proc.s1.d":"Through a 1:1 consultation and guided session with a scent designer, we discover the scents you love together.",
    "proc.s2.t":"Scent testing","proc.s2.d":"Freely sample over 100 scents in our scent room and bring your preferences into focus.",
    "proc.s3.t":"Fragrance design","proc.s3.d":"Using the notes you chose, we design a scent that is uniquely yours — your scent designer guides you so it fits your taste perfectly.",
    "proc.s4.t":"Blending","proc.s4.d":"Through several rounds of blending, you refine and complete your very own perfume.",
    "proc.s5.t":"Packaging","proc.s5.d":"We carefully wrap it in LIMINAL SPACE's own signature packaging.",
    "proc.philosophy":"LIMINAL SPACE is not a DIY where you simply mix scents. We interpret how fragrance interacts with people, personality, weather and circumstance, running the workshop so you can create the scent you truly want.",
    "proc.close":"Make a special memory in the one-of-a-kind space that is LIMINAL SPACE.",
    "form.name":"Name","form.phone":"Phone","form.email":"Email","form.class":"Class","form.date":"Preferred date","form.people":"People","form.msg":"Message (optional)","form.nationality":"Nationality","form.fb":"Facebook (optional)","form.ig":"Instagram (optional)",
    "modal.confirmlabel":"CONFIRM","modal.confirmq":"Please review your details.","modal.confirmnote":"If any information is incorrect, your application may not be processed properly. Please double-check your details before tapping Confirm & apply.",
    "modal.sub":"Class application · 5 steps","modal.step1":"STEP 1 / 5","modal.q0":"Please choose a branch to visit.",
    "modal.step2":"STEP 2 / 5","modal.q1":"Which program would you like?",
    "modal.err":"Please select an option.","modal.step3":"STEP 3 / 5","modal.q2":"Choose your perfume volume.","modal.sizeinc":"Bottle + pouch included",
    "modal.step4":"STEP 4 / 5","modal.q3":"Tell us your visit details.","modal.time":"Preferred time","modal.errdate":"Please enter date and time.","modal.pickdate":"Select a date first",
    "modal.step5":"STEP 5 / 5","modal.q4":"Enter your details and confirm.","modal.errcontact":"Please fill in all fields except the message.",
    "modal.donet":"Your application is received","modal.doned":"After review, we will confirm your booking via your contact.","modal.back":"Back","modal.next":"Next",
    "loc.title":"Getting here","loc.addr.t":"Address","loc.hours.t":"Hours","loc.hours.d":"Tue–Sun 11:00 – 20:00 (Mon closed)","loc.contact.t":"Contact","loc.mapnote":"Map area","slot":"Photo area"
  },
  vi: {
    "nav.concept":"Thương hiệu","nav.home":"Giới thiệu","nav.space":"Không gian","nav.classes":"Lớp học","nav.apply":"Đăng ký","nav.gallery":"Thư viện","nav.location":"Vị trí","nav.contact":"Đăng ký · Liên hệ","space.title":"Không gian","space.more":"Xem thêm về không gian →","contact.title":"Liên hệ","contact.note":"Chào đón liên hệ về lớp học, doanh nghiệp/nhóm và hợp tác.",
    "cta.lead":"Hoàn thiện mùi hương của riêng bạn, cùng scent designer.","cta.sub":"Workshop nước hoa cao cấp: thử hơn 100 loại hương, pha chế và mang về chai của riêng bạn.","cta.btn":"Đăng ký lớp học",
    "gallery.title":"Thư viện","gallery.featured":"Đã đồng hành cùng","gallery.more":"Xem toàn bộ thư viện →",
    "hero.eyebrow":"Perfume Workshop · Xưởng nước hoa",
    "hero.sub":"Hương thơm của khoảnh khắc giữa hai ranh giới. Lớp học tự pha chế và mang về một chai nước hoa của riêng bạn.",
    "hero.tag1":"Completely new experience","hero.tag2":"Eau de Parfum",
    "hero.cta":"Đăng ký lớp học","hero.cta2":"Xem lớp học",
    "concept.title":"Mùi hương bắt đầu từ ngưỡng cửa",
    "concept.pa.t":"Hơn 100 loại hương","concept.pa.d":"Tự tay ngửi và khám phá gu hương bạn chưa từng biết.",
    "concept.pb.t":"1:1 cùng Scent Designer","concept.pb.d":"Khoảng thời gian sâu lắng diễn đạt cảm giác và cảm xúc thành ngôn từ.",
    "concept.pc.t":"Mùi hương độc nhất","concept.pc.d":"Đặt tên và hoàn thiện thành dấu ấn của riêng bạn.",
    "m.lead":"Chúng ta đều trải qua những khoảnh khắc không hoàn toàn thuộc về đâu cả. Một không gian xa lạ, một quãng thời gian trống rỗng, một cảm xúc không thể gọi tên. Bắt nguồn từ tiếng Latin 'limen' — ngưỡng cửa, LIMINAL SPACE là khoảnh khắc chuyển tiếp chưa được định nghĩa bởi bất kỳ trạng thái nào. Chúng tôi ghi lại khe hở vô hình ấy bằng mùi hương.",
    "m.p1":"Mùi hương không chỉ là một thứ thơm tho. Đó là giác quan nguyên thủy nhất gợi lại ký ức, lưu lại cảm xúc và lưu giữ trạng thái. Bầu không khí của một nơi từng khiến lòng ta bình yên, hơi ấm của ký ức chia sẻ cùng người thương, những cảm xúc còn nán lại mà chưa thể gọi tên. Chúng tôi tập trung vào thời gian và không gian được tạo nên từ hương, hơn cả bản thân mùi hương.",
    "m.p2":"Tại đây, bạn ngửi hơn 100 loại hương để khám phá gu của chính mình, gọi lại khoảnh khắc quá khứ để định nghĩa cảm xúc hiện tại, và hoàn thiện trạng thái chưa tên bằng mùi hương. Đây không chỉ là DIY chọn hương. Cùng Scent Designer diễn đạt cảm giác và cảm xúc thành ngôn từ, khám phá gu bạn chưa từng biết và hoàn thiện chai nước hoa độc nhất — đó chính là LIMINAL SPACE.",
    "m.p3":"Đây là trải nghiệm lần đầu tiên có mặt tại Việt Nam. Đã có những nơi để ngửi, chọn và làm hương, nhưng chưa từng có trải nghiệm khám phá vì sao bạn bị cuốn hút bởi mùi hương ấy, và bạn là ai. Một ngày thú vị, không hề khó, nhưng khi kết thúc chắc chắn bạn sẽ cảm nhận điều gì đó đã khác. Bắt đầu từ một không gian trống rỗng và chưa định nghĩa, khi rời khỏi đây bạn tạo nên mùi hương do chính mình định nghĩa — như nơi vốn là khoảng không trở thành không gian độc nhất được lấp đầy bằng giác quan của bạn.",
    "m.quote":"Trước khi bạn định nghĩa, nơi này chẳng là gì cả. Khoảnh khắc bạn định nghĩa, nơi này trở thành của riêng bạn.",
    "classes.title":"Lớp học & Chương trình",
    "classes.inquire":"Liên hệ",
    "prog.inquiry":"Liên hệ báo giá","prog.permonth":"Gói tháng",
    "prog.w.tag":"Signature Scent Workshop","prog.w.name":"Signature Scent Workshop","prog.w.desc":"Tự ngửi hơn 100 loại hương và cùng Scent Designer hoàn thiện chai nước hoa signature của riêng bạn. Thời lượng 1–2 giờ.",
    "prog.sub.tag":"Subscription","prog.sub.name":"Liminal Pick · Đăng ký","prog.sub.desc":"Mỗi tháng 2 lần giao nước hoa 10ml tận nhà. Tùy chỉnh theo gu qua chat 1:1, lưu dữ liệu sử dụng, kèm mẫu thử · túi · móc khóa nước hoa.",
    "prog.corp.tag":"Corporate / Group","prog.corp.name":"Đặt làm doanh nghiệp · tập thể","prog.corp.desc":"Lên ý tưởng sự kiện và chế tác · cung cấp hương cho doanh nghiệp, cơ quan, tập thể.",
    "prog.rent.tag":"Rental / Collaboration","prog.rent.name":"Cho thuê · Hợp tác","prog.rent.desc":"Cho thuê không gian và đồng hành cùng các dự án hợp tác thương hiệu.",
    "prog.inf.tag":"Influencer / Marketer","prog.inf.name":"Influencer · Marketer","prog.inf.desc":"Chương trình hợp tác và nội dung dành cho influencer · marketer.",
    "apply.title":"Cách đăng ký",
    "apply.lede":"Đặt chỗ gồm bốn bước. Chọn lớp học, thiết kế mùi hương và mang về một chai của riêng bạn.",
    "apply.cta":"Bắt đầu đăng ký","apply.note":"Thời lượng 1–2 giờ · Vận hành theo hình thức đặt trước.",
    "how.s1.t":"Khám phá hương","how.s1.d":"Ngửi hơn 30 loại note tuyển chọn để tìm gu khứu giác của bạn.",
    "how.s2.t":"Thiết kế công thức","how.s2.d":"Cùng chuyên gia pha trộn các note yêu thích thành công thức riêng.",
    "how.s3.t":"Đặt tên","how.s3.d":"Đặt tên cho mùi hương để hoàn thiện dấu ấn của riêng bạn.",
    "how.s4.t":"Đóng chai","how.s4.d":"Chọn 10·30·50ml, đóng vào chai và túi để mang về.",
    "proc.title":"Quy trình lớp học",
    "proc.s1.t":"Tư vấn","proc.s1.d":"Qua buổi tư vấn 1:1 và hướng dẫn cùng Scent Designer, chúng ta cùng khám phá gu hương bạn yêu thích.",
    "proc.s2.t":"Thử hương","proc.s2.d":"Tự do thử hơn 100 loại hương trong phòng hương và làm rõ gu của bạn.",
    "proc.s3.t":"Thiết kế hương","proc.s3.d":"Dựa trên những nốt hương bạn chọn, chúng tôi thiết kế mùi hương độc nhất của riêng bạn — Scent Designer đồng hành để hợp gu bạn nhất.",
    "proc.s4.t":"Pha chế","proc.s4.d":"Qua nhiều bước pha chế, bạn tinh chỉnh và hoàn thiện chai nước hoa của riêng mình.",
    "proc.s5.t":"Đóng gói","proc.s5.d":"Chúng tôi đóng gói tỉ mỉ trong bao bì riêng của LIMINAL SPACE.",
    "proc.philosophy":"LIMINAL SPACE không phải là DIY chỉ trộn hương. Chúng tôi diễn giải mối quan hệ giữa hương thơm với con người, tính cách, thời tiết và hoàn cảnh, tổ chức workshop để bạn tạo nên mùi hương mình thực sự mong muốn.",
    "proc.close":"Hãy tạo nên kỷ niệm đặc biệt trong không gian độc nhất của LIMINAL SPACE.",
    "form.name":"Họ tên","form.phone":"Số điện thoại","form.email":"Email","form.class":"Lớp học","form.date":"Ngày mong muốn","form.people":"Số người","form.msg":"Lời nhắn (tùy chọn)","form.nationality":"Quốc tịch","form.fb":"Facebook (tùy chọn)","form.ig":"Instagram (tùy chọn)",
    "modal.confirmlabel":"XÁC NHẬN","modal.confirmq":"Vui lòng kiểm tra thông tin của bạn.","modal.confirmnote":"Nếu thông tin nhập sai, đăng ký có thể không được tiếp nhận đúng cách. Vui lòng kiểm tra lại thông tin trước khi nhấn Hoàn tất đăng ký.",
    "form.opt1":"Pha chế Signature","form.opt2":"Cặp đôi · Nhóm","form.opt3":"Atelier nâng cao",
    "form.submit":"Gửi đăng ký","form.note":"* Đây là bản nháp. Việc gửi thực sẽ hoạt động sau khi tích hợp.","form.ok":"Đã nhận đăng ký. Chúng tôi sẽ liên hệ với bạn.",
    "classes.select":"Đăng ký lớp này",
    "modal.sub":"Đăng ký lớp học · 5 bước",
    "modal.step1":"BƯỚC 1 / 5","modal.q0":"Vui lòng chọn chi nhánh bạn muốn đến.",
    "modal.br1":"Sài Gòn (Saigon)","modal.br1d":"10° 47' 27.49\" N 106° 41' 36.89\" E · Bình Thạnh",
    "modal.br2":"Hà Nội (Hanoi)","modal.br2d":"Phố cổ · Hoàn Kiếm",
    "modal.step2":"BƯỚC 2 / 5","modal.q1":"Bạn muốn đăng ký chương trình nào?",
    "modal.c1d":"Hơn 100 loại hương · hoàn thiện signature của bạn","modal.c2d":"Mỗi tháng 2 lần giao 10ml · tùy chỉnh","modal.c3d":"Lên ý tưởng sự kiện · chế tác/cung cấp hương","modal.c4d":"Cho thuê không gian · hợp tác thương hiệu","modal.c5d":"Chương trình hợp tác · nội dung",
    "modal.err":"Vui lòng chọn một mục.",
    "modal.step3":"BƯỚC 3 / 5","modal.q2":"Chọn dung tích nước hoa hoàn thiện.","modal.sizeinc":"Bao gồm chai + túi",
    "modal.step4":"BƯỚC 4 / 5","modal.q3":"Cho chúng tôi biết thông tin ghé thăm.","modal.time":"Giờ mong muốn","modal.errdate":"Vui lòng nhập ngày và giờ.","modal.pickdate":"Chọn ngày trước",
    "modal.step5":"BƯỚC 5 / 5","modal.q4":"Nhập thông tin và xác nhận.","modal.errcontact":"Vui lòng điền tất cả mục trừ lời nhắn.",
    "modal.donet":"Đã nhận đăng ký","modal.doned":"Sau khi xác nhận, chúng tôi sẽ thông báo đặt chỗ qua liên hệ của bạn.",
    "modal.back":"Quay lại","modal.next":"Tiếp theo",
    "loc.title":"Đường đến","loc.addr.t":"Địa chỉ","loc.addr.d":"10° 47' 27.49\" N 106° 41' 36.89\" E","loc.hours.t":"Giờ mở cửa","loc.hours.d":"Thứ 3–CN 11:00 – 20:00 (nghỉ thứ 2)","loc.contact.t":"Liên hệ",
    "loc.mapnote":"Khu vực bản đồ","slot":"Khu vực ảnh"
  }
};
// 한국어 기본값을 DOM에서 수집해 저장
document.querySelectorAll('[data-i18n]').forEach(el=>{
  I18N.ko[el.getAttribute('data-i18n')] = el.innerHTML;
});
function setLang(lang){
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n');
    const t = (I18N[lang] && I18N[lang][k]!==undefined) ? I18N[lang][k] : I18N.ko[k];  // 없으면 한국어 폴백
    if(t!==undefined) el.innerHTML = t;
  });
  document.querySelectorAll('.lang button').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang===lang);
  });
  // 모달이 열려 있으면 동적 버튼/요약 라벨도 갱신
  if(typeof modal!=='undefined' && modal.classList.contains('open')) goto(cur);
  if(typeof applyActiveStates==='function') applyActiveStates();  // 카드 준비중 재적용
  if(typeof renderClasses==='function') renderClasses();          // 클래스 카드 언어/데이터 재적용
  if(typeof renderLocation==='function') renderLocation();        // 위치 섹션 언어 재적용
  if(typeof renderMap==='function') renderMap();                  // 지도(언어별 위치 텍스트) 재적용
  if(typeof renderFolderChips==='function') renderFolderChips();  // 폴더 칩 언어 재적용
  if(typeof renderGallery==='function') renderGallery();          // 갤러리 캡션 언어 재적용
  if(typeof renderPartners==='function') renderPartners();
  if(typeof renderSpaceFolderChips==='function') renderSpaceFolderChips(); // 공간 폴더 칩 언어 재적용
  if(typeof initSpaceCarousel==='function') initSpaceCarousel();   // 공간 마퀴 캡션 언어 재적용
  if(typeof renderSpaceGrid==='function') renderSpaceGrid();       // 공간 그리드(space.html) 캡션 언어 재적용
  if(typeof renderSiteInfo==='function') renderSiteInfo();         // 푸터 사업자정보 라벨 언어 재적용
  if(typeof renderNavSocials==='function') renderNavSocials();     // 네비 지점 라벨 언어 재적용
}
document.querySelectorAll('.lang button').forEach(b=>{
  b.addEventListener('click',()=>setLang(b.dataset.lang));
});

/* ---------- 푸터 소셜 링크 (지점별 소셜 연동 — 첫 지점 기준) ---------- */
function renderFooterSocial(){
  let brs=(getSettings().branches)||[];
  const el=document.getElementById('socialLinks');if(!el)return;
  const insta=(brs.find(b=>b.instagram)||{}).instagram;
  const fb=(brs.find(b=>b.facebook)||{}).facebook;
  const links=[];
  if(insta)links.push(`<a href="${insta}" target="_blank" rel="noopener">Instagram</a>`);
  if(fb)links.push(`<a href="${fb}" target="_blank" rel="noopener">Facebook</a>`);
  el.innerHTML=links.join('');
}

/* ---------- mobile menu ---------- */
document.getElementById('menuToggle').addEventListener('click',()=>{
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('#navLinks a').forEach(a=>{
  a.addEventListener('click',()=>document.getElementById('navLinks').classList.remove('open'));
});

/* ---------- APPLY MODAL WIZARD ---------- */
const STORE_KEY='liminal_applications';
const SET_KEY='liminal_settings';
const DEFAULT_DAY=[{cls:'',time:'11:00',cap:6},{cls:'',time:'14:00',cap:6},{cls:'',time:'17:00',cap:6}];
/* 다국어 helper */
function curLang(){return document.documentElement.lang||'ko';}
function txObj(v){return (v&&typeof v==='object'&&!Array.isArray(v))?v:(v?{ko:String(v)}:{});}
function Lval(v,lang){const o=txObj(v);return o[lang||curLang()]||o.ko||o.en||o.vi||'';}
function keyOf(v){const o=txObj(v);return o.ko||o.en||o.vi||'';}
function tri(ko,en,vi){return {ko:ko||'',en:en||'',vi:vi||''};}
const _wd=tri('100여 종 향 · 나만의 시그니처 완성','Over 100 notes · craft your signature','Hơn 100 loại hương · tạo signature của bạn');
const _di=tri('보틀 + 파우치 포함','Bottle + pouch included','Bao gồm chai + túi');
const INDEX_DEFAULTS={
  branches:[],
  site:{brandName:'LIMINAL SPACE',estYear:'2026',copyrightYear:'2026'},
  branchClasses:[],
  classDetails:[],
  defaultSchedule:{},schedule:{}
};
function getSettings(){const s=(window.LS?LS.getSettings():{})||{};
  // 실제 데이터(Supabase)만 사용. 키가 아예 없을 때만 기본값으로 채움(로컬 폴백).
  return Object.assign({},INDEX_DEFAULTS,s);}
function getApps(){return window.LS?LS.getApps():[];}
const DAYKEYS=['sun','mon','tue','wed','thu','fri','sat'];
function esc(s){return (s==null?'':String(s)).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
/* ---- 지점 기반 데이터 helpers ---- */
function branchClassesOf(branch){return (getSettings().branchClasses||[]).filter(c=>c.branch===branch).sort((a,b)=>(a.order??99)-(b.order??99));}
function programList(branch){const seen={};const out=[];branchClassesOf(branch).forEach(c=>{const k=keyOf(c.name);if(!(k in seen)){seen[k]=1;out.push(c);}});return out;}
function detailsOf(branch,name){return (getSettings().classDetails||[]).filter(d=>d.branch===branch&&d.name===name);}
function volumesForName(branch,name){return detailsOf(branch,name).filter(d=>d.volume!==''&&d.volume!=null);}
function isClassActive(branch,name){const c=branchClassesOf(branch).find(c=>keyOf(c.name)===name);return !c||c.active!==false;}
function priceNum(p){const n=parseInt(String(p||'').replace(/[^0-9]/g,''),10);return isNaN(n)?Infinity:n;}
function fmtMoney(v,sym){v=(v==null?'':String(v)).trim();if(!v)return '';if(/^[0-9,]+$/.test(v))return Number(v.replace(/,/g,'')).toLocaleString('en-US')+sym;return v;}
function priceDisplay(d){if(!d)return '';if(d.priceVND)return fmtMoney(d.priceVND,'₫');if(d.priceKRW)return fmtMoney(d.priceKRW,'₩');if(d.priceUSD)return fmtMoney(d.priceUSD,'$');return '';}
/* 표시 통화(동→원→달러 우선) */
function chosenCurr(d){if(!d)return null;if(d.priceVND)return{raw:d.priceVND,sym:'₫'};if(d.priceKRW)return{raw:d.priceKRW,sym:'₩'};if(d.priceUSD)return{raw:d.priceUSD,sym:'$'};return null;}
/* 할인 계산 → {orig,final,sym,origStr,finalStr,label} (할인 없으면 final=null) */
function discInfo(d){
  const cp=chosenCurr(d); if(!cp)return null;
  const orig=parseInt(String(cp.raw).replace(/[^0-9]/g,''),10); if(isNaN(orig))return null;
  const type=(d.discType||'none'), val=parseFloat(d.discVal);
  let fin=null,label='';
  if(type==='percent'&&val>0){fin=Math.max(0,Math.round(orig*(1-val/100)));label=(val%1===0?val:val)+'%';}
  else if(type==='fixed'&&val>0){fin=Math.max(0,orig-Math.round(val));label='-'+Math.round(val).toLocaleString('en-US')+cp.sym;}
  const origStr=orig.toLocaleString('en-US')+cp.sym;
  if(fin==null||fin>=orig)return {orig,final:null,sym:cp.sym,origStr};
  return {orig,final:fin,sym:cp.sym,origStr,finalStr:fin.toLocaleString('en-US')+cp.sym,label};
}
/* 최저가 비교용 실효가(할인 적용) */
function effPriceNum(d){const di=discInfo(d);if(!di)return priceNum(priceDisplay(d));return di.final!=null?di.final:di.orig;}
/* 가격 HTML (할인 시 정가 취소선 + 할인가 + 배지) */
function priceHTML(d){const di=discInfo(d);if(!di)return esc(priceDisplay(d));if(di.final==null)return esc(di.origStr);return `<span class="price-old">${esc(di.origStr)}</span><span class="price-new">${esc(di.finalStr)}</span><span class="disc-badge">${esc(di.label)}</span>`;}
function needsSize(){return volumesForName(data.branch,data.class).length>0;}
function slotsFor(dateStr){
  if(!dateStr||!data.branch) return [];
  const s=getSettings();const sc=(s.schedule||{})[data.branch]||{};
  const slots=sc[dateStr]||[];   // 개별 설정(저장)된 날짜만 오픈, 미설정일은 휴무
  return slots.filter(sl=>!sl.cls || sl.cls===data.class);
}
function bindOptList(list){
  list.querySelectorAll('.opt').forEach(o=>o.addEventListener('click',()=>{
    if(o.classList.contains('disabled'))return;
    const field=list.dataset.field;
    data[field]=o.dataset.val;
    if(field==='class' && !needsSize()) data.size='';
    list.querySelectorAll('.opt').forEach(x=>x.classList.toggle('sel',x===o));
    hideErrors();
  }));
}
/* 지점 옵션 (지점설정 연동) */
function populateBranches(){
  const list=modal.querySelector('.opt-list[data-field="branch"]'); if(!list)return;
  const brs=getSettings().branches||[]; if(!brs.length)return;
  const lang=curLang();const soon=lang==='en'?'Opening soon':(lang==='vi'?'Sắp mở':'오픈 준비중');
  list.innerHTML=brs.map(b=>`<div class="opt ${b.name===data.branch?'sel':''}" data-val="${esc(b.name)}"><div><div class="ti">${esc(branchLabel(b.name))}</div>${Lval(b.location,lang)?`<div class="de">${esc(Lval(b.location,lang))}</div>`:''}</div></div>`).join('');
  bindOptList(list);
}
/* STEP2 프로그램 옵션 (지점별 클래스 설정 연동) */
function renderPrograms(){
  const list=modal.querySelector('.opt-list[data-field="class"]'); if(!list)return;
  const progs=programList(data.branch); if(!progs.length)return;
  const lang=curLang();const soon=lang==='en'?' · Opening soon':(lang==='vi'?' · Sắp mở':' · 오픈 준비중');const inq=lang==='en'?'Inquire':(lang==='vi'?'Liên hệ':'문의');
  list.innerHTML=progs.map(c=>{
    const key=keyOf(c.name);const inactive=c.active===false;
    const vols=volumesForName(data.branch,key);
    let price;
    if(vols.length){const min=vols.reduce((m,t)=>effPriceNum(t)<effPriceNum(m)?t:m);price=priceHTML(min)+(vols.length>1?'~':'');}
    else price=inq;
    return `<div class="opt ${inactive?'disabled':''} ${key===data.class?'sel':''}" data-val="${esc(key)}">
      <div><div class="ti">${esc(Lval(c.name,lang))}</div><div class="de">${esc(Lval(c.desc,lang))}${inactive?soon:''}</div></div>
      <div class="pr">${price}</div></div>`;
  }).join('');
  bindOptList(list);
}
/* STEP3 용량 옵션 (지점·클래스 상세설정: 용량/가격/상세설명) */
function renderSizes(){
  const list=modal.querySelector('.opt-list[data-field="size"]'); if(!list)return;
  const lang=curLang();
  const vols=volumesForName(data.branch,data.class);
  list.innerHTML=vols.map(t=>{const dt=Lval(t.detail,lang);return `<div class="opt ${(t.volume+'ml')===data.size?'sel':''}" data-val="${t.volume}ml">
    <div><div class="ti">${t.volume}ml</div>${dt?`<div class="de">${esc(dt)}</div>`:''}</div><div class="pr">${priceHTML(t)}</div></div>`;}).join('');
  bindOptList(list);
}
/* 인덱스 카드 비활성 클래스 → "오픈 준비중" (모든 지점에서 비활성일 때) */
function isClassActiveAnywhere(name){const cs=(getSettings().branchClasses||[]).filter(c=>keyOf(c.name)===name);if(!cs.length)return true;return cs.some(c=>c.active!==false);}
function applyActiveStates(){
  document.querySelectorAll('.card-cta[data-class]').forEach(btn=>{
    if(!isClassActiveAnywhere(btn.dataset.class)){btn.dataset.disabled='1';btn.classList.add('soon-btn');btn.textContent='오픈 준비중';}
  });
}
/* 클래스/프로그램 섹션 — 지점별 탭 + 실제 데이터(미등록 시 빈 상태) */
let classTabBranch='';
function renderClasses(){
  const wrap=document.querySelector('#classes .class-grid'); if(!wrap)return;
  const tabs=document.getElementById('classTabs');
  const lang=curLang();
  const L=lang==='en'?{price:'Price',inq:'Inquire',cta:'Apply',soon:'Opening soon',none:'No programs registered yet.'}
    :(lang==='vi'?{price:'Giá',inq:'Liên hệ',cta:'Đăng ký',soon:'Sắp mở',none:'Chưa có chương trình nào.'}
    :{price:'가격',inq:'문의',cta:'이 프로그램 신청',soon:'오픈 준비중',none:'등록된 프로그램이 없습니다.'});
  const branches=(getSettings().branches||[]).filter(b=>b&&b.name);
  if(!branches.length){ if(tabs)tabs.innerHTML=''; wrap.className='class-grid'; wrap.innerHTML=`<div class="class-empty">${L.none}</div>`; return; }
  if(!classTabBranch || !branches.some(b=>b.name===classTabBranch)) classTabBranch=branches[0].name;
  // 지점 탭
  if(tabs){
    tabs.innerHTML=branches.map(b=>`<button class="branch-tab ${b.name===classTabBranch?'active':''}" data-b="${esc(b.name)}">${esc(branchLabel(b.name))}</button>`).join('');
    tabs.querySelectorAll('.branch-tab').forEach(t=>t.addEventListener('click',()=>{classTabBranch=t.dataset.b;renderClasses();}));
  }
  const branch=classTabBranch;
  const progs=programList(branch);
  if(!progs.length){ wrap.className='class-grid'; wrap.innerHTML=`<div class="class-empty">${L.none}</div>`; return; }
  const n=progs.length;
  const cols = n===4?2 : (n<=2?Math.max(1,n):3);
  wrap.className='class-grid cols-'+cols;
  wrap.innerHTML=progs.map(c=>{
    const key=keyOf(c.name);const active=c.active!==false;
    const ds=volumesForName(branch,key);
    let priceLine;
    if(ds.length){const min=ds.reduce((m,t)=>effPriceNum(t)<effPriceNum(m)?t:m);priceLine=priceHTML(min)+(ds.length>1?'~':'');}
    else priceLine=L.inq;
    const cta=active?L.cta:L.soon;
    return `<div class="card">
      <h3 style="margin-top:0">${esc(Lval(c.name,lang))}</h3>
      <p class="desc">${esc(Lval(c.desc,lang))}</p>
      <div class="row"><span>${active?L.price:''}</span><span class="price">${active?priceLine:''}</span></div>
      <button class="btn card-cta ${active?'':'soon-btn'}" ${active?`data-open-apply data-class="${esc(key)}" data-branch="${esc(branch)}"`:''}>${cta}</button>
    </div>`;
  }).join('');
  wrap.querySelectorAll('[data-open-apply]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();if(b.dataset.branch)data.branch=b.dataset.branch;openModal(b.dataset.class||'');}));
}
/* 사이트 정보(브랜드명·연도)를 히어로 EST·푸터에 반영 */
function renderSiteInfo(){
  var si=(getSettings().site)||{};
  var brand=si.brandName||'LIMINAL SPACE';
  var est=si.estYear||'', copy=si.copyrightYear||'';
  var e=document.getElementById('estYear'); if(e&&est) e.textContent='EST. '+est;
  var fb=document.getElementById('footBrand'); if(fb) fb.textContent=brand+' — PERFUME WORKSHOP';
  var fc=document.getElementById('footCopy'); if(fc) fc.textContent='© '+(copy||est||'')+' '+brand;
  renderFootBiz(si);
}
/* 베트남 전자상거래법 푸터 사업자 정보 + Bộ Công Thương 신고 뱃지 (전 페이지 공통, app.js가 주입) */
function renderFootBiz(si){
  var foot=document.getElementById('contact'); if(!foot)return;
  si=si||{};
  var L=curLang();
  var lab=L==='en'?{name:'Company',addr:'Address',tax:'Tax code',tel:'Tel',email:'Email'}
        :L==='vi'?{name:'Tên',addr:'Địa chỉ',tax:'MST',tel:'ĐT',email:'Email'}
        :{name:'상호',addr:'주소',tax:'세금코드',tel:'전화',email:'이메일'};
  function pair(k,v){return v?('<span class="fb-i"><b>'+lab[k]+'</b> '+esc(v)+'</span>'):'';}
  var line1=[pair('name',si.bizName),pair('addr',si.bizAddress)].filter(Boolean).join('<span class="fb-sep">·</span>');
  var line2=[pair('tax',si.bizTax),pair('tel',si.bizPhone),pair('email',si.bizEmail)].filter(Boolean).join('<span class="fb-sep">·</span>');
  var badge='';
  if(si.moitUrl){
    var inner=si.moitLogo?('<img src="'+esc(si.moitLogo)+'" alt="Đã thông báo Bộ Công Thương" />')
      :'<span class="fb-badge-txt">Đã thông báo Bộ Công Thương</span>';
    badge='<a class="fb-badge" href="'+esc(si.moitUrl)+'" target="_blank" rel="noopener">'+inner+'</a>';
  }
  var box=document.getElementById('footBiz');
  if(!line1&&!line2&&!badge){ if(box)box.parentNode.removeChild(box); return; }
  if(!box){ box=document.createElement('div'); box.id='footBiz'; box.className='foot-biz'; foot.appendChild(box); }
  box.innerHTML=(line1?'<div class="fb-line">'+line1+'</div>':'')+(line2?'<div class="fb-line">'+line2+'</div>':'')+badge;
}
/* 위치 섹션을 지점설정과 연동 */
function renderLocation(){
  const dl=document.getElementById('locInfo'); if(!dl)return;
  const brs=getSettings().branches||[]; if(!brs.length)return;
  dl.innerHTML=brs.map(b=>{
    const soc=[];
    if(b.instagram)soc.push(`<a href="${esc(b.instagram)}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">Instagram</a>`);
    if(b.facebook)soc.push(`<a href="${esc(b.facebook)}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">Facebook</a>`);
    var hrs=Lval(b.hours,curLang());
    return `<dt>${esc(branchLabel(b.name))}</dt><dd>${esc(Lval(b.location,curLang()))}${b.contact?` · ${esc(b.contact)}`:''}${b.link?` · <a href="${esc(b.link)}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">${curLang()==='en'?'Visit':(curLang()==='vi'?'Xem':'바로가기')}</a>`:''}${hrs?'<br>'+esc(hrs):''}${soc.length?'<br>'+soc.join(' · '):''}</dd>`;
  }).join('');
}
/* 찾아오는 길 지도 — 저장된 위치를 구글맵으로 표시(클릭 시 새 창) */
function renderMap(){
  const el=document.getElementById('mapArea'); if(!el)return;
  const lang=curLang();
  const brs=(getSettings().branches||[]).filter(b=>b&&b.name);
  const b=brs[0];
  const loc=b?Lval(b.location,lang):'';
  if(!loc){ el.innerHTML=`<div class="pin">◎<br><span>${lang==='en'?'Map area':(lang==='vi'?'Khu vực bản đồ':'지도 영역')}</span></div>`; return; }
  const q=encodeURIComponent(loc);
  const embed=`https://www.google.com/maps?q=${q}&z=16&output=embed`;
  const open=`https://www.google.com/maps/search/?api=1&query=${q}`;
  const hint=lang==='en'?'Open in Google Maps ↗':(lang==='vi'?'Mở trong Google Maps ↗':'Google 지도에서 보기 ↗');
  el.innerHTML=`<a class="map-link" href="${open}" target="_blank" rel="noopener" aria-label="${esc(loc)}">`
    +`<iframe class="map-frame" src="${embed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${esc(loc)}"></iframe>`
    +`<span class="map-cover"></span>`
    +`<span class="map-hint">${hint}</span></a>`;
}
/* 공간 폴더 칩 (갤러리와 동일 구조) */
var spaceFolder='';
function spaceItemsAll(){var it=(getSettings().space||[]).filter(function(g){return g&&g.img;});if(!it.length)it=GALLERY_PLACEHOLDER;return it;}
function spaceCover(fid){var inf=sortGal(spaceItemsAll().filter(function(g){return (g.folder||'')===fid;}));return inf[0]?inf[0].img:'';}
function renderSpaceFolderChips(){
  var box=document.getElementById('spaceFolders'); if(!box)return;
  var lang=curLang();
  var folders=(getSettings().spaceFolders||[]).slice().sort(function(a,b){return (Number(a.order)||999)-(Number(b.order)||999);});
  if(!folders.length){ box.innerHTML=''; box.style.display='none'; spaceFolder=''; return; }
  box.style.display='';
  var allLabel=lang==='en'?'All':(lang==='vi'?'Tất cả':'전체');
  function chip(fid,name,cover){return '<button class="folder-chip '+(spaceFolder===fid?'active':'')+'" data-fid="'+esc(fid)+'"><span class="fc-thumb" style="background-image:url(\''+esc(cover)+'\')"></span><span class="fc-name">'+esc(name)+'</span></button>';}
  var html=chip('',allLabel,(sortGal(spaceItemsAll())[0]||{}).img||'');   // 전체 = 모든 공간 사진 중 첫 번째(대표 우선)
  folders.forEach(function(f){ html+=chip(f.id,Lval(f.name,lang),spaceCover(f.id)); });
  box.innerHTML=html;
  box.querySelectorAll('.folder-chip').forEach(function(b){b.addEventListener('click',function(){spaceFolder=b.dataset.fid||'';renderSpaceFolderChips();initSpaceCarousel();renderSpaceGrid();});});
}
/* 공간 캐러셀 — 연속 흐름 마퀴(공간 사진) */
function initSpaceCarousel(){
  const track=document.getElementById('spaceTrack'); if(!track)return;
  const sec=document.getElementById('space');
  // 공간 마퀴는 '공간' 사진을 사용(없으면 예시 플레이스홀더), 폴더 필터 + 대표/순서 정렬
  let items=(getSettings().space||[]).filter(g=>g&&g.img);
  if(!items.length) items=GALLERY_PLACEHOLDER;
  if(spaceFolder) items=items.filter(function(g){return (g.folder||'')===spaceFolder;});
  items=sortGal(items);
  if(!items.length){ if(sec)sec.style.display='none'; return; }
  if(sec)sec.style.display='';
  const lang=curLang();
  const card=g=>{
    const t=esc(Lval(g.title,lang)), d=esc(Lval(g.desc,lang));
    return `<div class="mcard"><div class="mc-img"><img src="${esc(g.img)}" alt="LIMINAL SPACE" loading="lazy"></div>`
      +`<div class="mc-cap">${t?`<div class="mc-t">${t}</div>`:''}${d?`<div class="mc-d">${d}</div>`:''}</div></div>`;
  };
  const seq=items.map(card).join('');
  track.innerHTML=seq+seq;                       // 끊김 없는 루프(앞쪽 절반만큼 이동 후 리셋)
  // JS rAF로 일정 속도 이동(카드당 6.4초). 호버 시 0.5배 속도(점프 없이 부드럽게 감속).
  if(track._raf) cancelAnimationFrame(track._raf);
  const mq=document.getElementById('spaceMarquee');
  let half=0, offset=0, last=0, hovering=false;
  if(mq){ mq.onmouseenter=function(){hovering=true;}; mq.onmouseleave=function(){hovering=false;}; }
  function step(ts){
    if(!last) last=ts;
    var dt=Math.min(0.05,(ts-last)/1000); last=ts;   // 탭 비활성 후 큰 점프 방지
    if(!half) half=track.scrollWidth/2;
    if(half>0){
      var speed=(half/items.length)/6.4;             // px/s (카드 평균폭 / 6.4초)
      if(hovering) speed*=0.5;
      offset+=speed*dt;
      if(offset>=half) offset-=half;
      track.style.transform='translateX('+(-offset)+'px)';
    }
    track._raf=requestAnimationFrame(step);
  }
  window.addEventListener('resize',function(){half=0;});
  track._raf=requestAnimationFrame(step);
}
/* 갤러리 · 협업 로고 (어드민 관리; 비어있으면 예시 플레이스홀더 표시) */
var GALLERY_PLACEHOLDER=(function(){var a=[];var d=tri(
  '리미널 스페이스에서 진행된 향수 워크숍의 한 장면입니다. 공간과 향이 어우러진 순간을 기록합니다. (임시 설명 — 실제 내용으로 교체 예정)',
  'A moment from a perfume workshop at LIMINAL SPACE, where space and scent meet. (Placeholder text — to be replaced.)',
  'Một khoảnh khắc trong workshop nước hoa tại LIMINAL SPACE, nơi không gian và hương gặp nhau. (Văn bản tạm thời — sẽ thay thế.)');
  for(var i=1;i<=20;i++){a.push({img:'assets/gallery-'+i+'.jpg',title:tri('',''),desc:d});}return a;})();
var PARTNER_PLACEHOLDER=[
  {name:'BRAND 1',logo:'assets/logo-1.png',link:''},{name:'BRAND 2',logo:'assets/logo-2.png',link:''},
  {name:'BRAND 3',logo:'assets/logo-3.png',link:''},{name:'BRAND 4',logo:'assets/logo-4.png',link:''},
  {name:'BRAND 5',logo:'assets/logo-5.png',link:''},{name:'BRAND 6',logo:'assets/logo-6.png',link:''}
];
/* 공간 더보기(space.html): 공간 사진을 갤러리처럼 3열 그리드로 (홈은 마퀴 유지) */
function renderSpaceGrid(){
  var grid=document.getElementById('spaceGrid'); if(!grid)return;
  var lang=curLang();
  var items=spaceItemsAll();
  if(spaceFolder) items=items.filter(function(g){return (g.folder||'')===spaceFolder;});
  items=sortGal(items);
  grid.innerHTML=items.map(function(g){
    var t=esc(Lval(g.title,lang)), d=esc(Lval(g.desc,lang));
    var inner='<img src="'+esc(g.img)+'" alt="'+(t||'LIMINAL SPACE')+'" loading="lazy">'+((t||d)?'<div class="cap">'+(t?'<div class="gcap-t">'+t+'</div>':'')+(d?'<div class="gcap-d">'+d+'</div>':'')+'</div>':'');
    return g.link?'<a class="gitem" href="'+esc(g.link)+'" target="_blank" rel="noopener">'+inner+'</a>':'<div class="gitem">'+inner+'</div>';
  }).join('');
}
var galleryFolder='';   // 활성 폴더 id ('' = 전체)
function sortGal(arr){return arr.slice().sort(function(a,b){var fa=a.featured?0:1,fb=b.featured?0:1;if(fa!==fb)return fa-fb;return (Number(a.order)||999)-(Number(b.order)||999);});}
function galItems(){var it=(getSettings().gallery||[]).filter(function(g){return g&&g.img;});if(!it.length)it=GALLERY_PLACEHOLDER;return it;}
function folderCover(fid){var inf=sortGal(galItems().filter(function(g){return (g.folder||'')===fid;}));return inf[0]?inf[0].img:'';}
function renderFolderChips(){
  var box=document.getElementById('galleryFolders'); if(!box)return;
  var lang=curLang();
  var folders=(getSettings().galleryFolders||[]).slice().sort(function(a,b){return (Number(a.order)||999)-(Number(b.order)||999);});
  if(!folders.length){ box.innerHTML=''; box.style.display='none'; galleryFolder=''; return; }
  box.style.display='';
  var allLabel=lang==='en'?'All':(lang==='vi'?'Tất cả':'전체');
  function chip(fid,name,cover){return '<button class="folder-chip '+(galleryFolder===fid?'active':'')+'" data-fid="'+esc(fid)+'"><span class="fc-thumb" style="background-image:url(\''+esc(cover)+'\')"></span><span class="fc-name">'+esc(name)+'</span></button>';}
  var html=chip('',allLabel,(sortGal(galItems())[0]||{}).img||'');   // 전체 = 모든 사진 중 첫 번째(대표 우선)
  folders.forEach(function(f){ html+=chip(f.id,Lval(f.name,lang),folderCover(f.id)); });
  box.innerHTML=html;
  box.querySelectorAll('.folder-chip').forEach(function(b){b.addEventListener('click',function(){galleryFolder=b.dataset.fid||'';renderFolderChips();renderGallery();});});
}
function renderGallery(){
  const grid=document.getElementById('galleryGrid'); if(!grid)return;
  const lang=curLang();
  let items=galItems();
  if(galleryFolder) items=items.filter(function(g){return (g.folder||'')===galleryFolder;});
  items=sortGal(items);
  if(!grid.hasAttribute('data-full')) items=items.slice(0,4);   // 홈은 4개, 갤러리 페이지(data-full)는 전체
  grid.innerHTML=items.map(g=>{
    const t=esc(Lval(g.title,lang)), d=esc(Lval(g.desc,lang));
    const inner=`<img src="${esc(g.img)}" alt="${t||'LIMINAL SPACE'}" loading="lazy">${(t||d)?`<div class="cap">${t?`<div class="gcap-t">${t}</div>`:''}${d?`<div class="gcap-d">${d}</div>`:''}</div>`:''}`;
    return g.link?`<a class="gitem" href="${esc(g.link)}" target="_blank" rel="noopener">${inner}</a>`:`<div class="gitem">${inner}</div>`;
  }).join('');
}
function renderPartners(){
  const wrap=document.getElementById('logoStripWrap'), strip=document.getElementById('logoStrip'); if(!strip)return;
  let items=(getSettings().partners||[]).filter(p=>p&&p.logo);
  if(!items.length) items=PARTNER_PLACEHOLDER;
  items=sortGal(items);   // 대표 먼저 + 순서
  if(!items.length){ if(wrap)wrap.style.display='none'; return; }
  if(wrap)wrap.style.display='';
  strip.innerHTML=items.map(p=>{
    const img=`<img src="${esc(p.logo)}" alt="${esc(p.name||'')}" loading="lazy">`;
    return p.link?`<a href="${esc(p.link)}" target="_blank" rel="noopener">${img}</a>`:img;
  }).join('');
}
function bookedOn(dateStr,time){
  return getApps().filter(a=>a.date===dateStr && a.time===time && a.status!=='cancel')
    .reduce((s,a)=>s+(parseInt(a.people)||1),0);
}
/* 날짜 상태: none(미등록) / closed(휴무지정) / open(시간대 있음) */
function dayState(dateStr){if(!dateStr||!data.branch)return 'none';const sc=(getSettings().schedule||{})[data.branch]||{};if(sc[dateStr]===undefined)return 'none';return (sc[dateStr]||[]).length?'open':'closed';}
function dayMsg(dateStr){const lang=curLang();const st=dayState(dateStr);
  if(st==='none')return lang==='en'?'No classes are registered. Please contact the administrator.':lang==='vi'?'Chưa có lớp nào được đăng ký. Vui lòng liên hệ quản trị viên.':'등록된 클래스가 없습니다. 관리자에게 문의하세요.';
  return lang==='en'?'Closed on this day.':lang==='vi'?'Ngày này nghỉ.':'휴무일입니다.';}
/* 베트남 시간(UTC+7) 기준 */
function vnNow(){return new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Ho_Chi_Minh'}));}
function vnToday(){const d=vnNow();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function vnHM(){const d=vnNow();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
function isPastSlot(dateStr,time){if(!dateStr)return false;if(dateStr<vnToday())return true;if(dateStr===vnToday()&&time&&time<=vnHM())return true;return false;}
/* 선택한 날짜의 요일에 맞춰 시간대 드롭다운 채우기 */
function populateTimes(){
  const sel=modal.querySelector('[data-field="time"]'); if(!sel)return;
  const lang=curLang();const vi=lang==='vi';const en=lang==='en';
  if(!data.date){sel.innerHTML=`<option value="">${vi?'Chọn ngày trước':en?'Select a date first':'날짜를 먼저 선택'}</option>`;return;}
  const slots=slotsFor(data.date);
  if(!slots.length){const st=dayState(data.date);const ph=st==='none'?(vi?'Chưa có lớp':en?'No classes':'등록된 클래스 없음'):(vi?'Ngày nghỉ':en?'Closed':'휴무일');sel.innerHTML=`<option value="">${ph}</option>`;return;}
  const today=data.date===vnToday();const nowHM=vnHM();
  sel.innerHTML=`<option value="">${vi?'Chọn giờ':en?'Select time':'시간 선택'}</option>`+slots.map(s=>{
    const remain=s.cap-bookedOn(data.date,s.time); const full=remain<=0;
    const past=today&&s.time<=nowHM;
    const dis=full||past;
    const lbl=past?(vi?'(đã qua)':en?'(passed)':'(지난 시간)'):full?(vi?'(kín)':en?'(full)':'(마감)'):(vi?`(còn ${remain})`:en?`(${remain} left)`:`(잔여 ${remain})`);
    return `<option value="${s.time}" ${dis?'disabled':''}>${s.time} ${lbl}</option>`;
  }).join('');
  // 기본값: 비었거나 무효(마감/지난시간)면 가장 빠른 가용 시간 자동 선택
  var ok=data.time && [].some.call(sel.options,function(o){return o.value===data.time && !o.disabled;});
  if(!ok){ var first=[].find.call(sel.options,function(o){return o.value && !o.disabled;}); data.time=first?first.value:''; }
  sel.value=data.time;
}
/* 잔여 인원 안내 */
function updateCapNote(){
  const note=document.getElementById('capNote'); if(!note)return;
  const vi=document.documentElement.lang==='vi';
  note.classList.remove('full');
  if(!data.date){note.textContent='';return;}
  const slots=slotsFor(data.date);
  if(!slots.length){note.classList.add('full');note.textContent=dayMsg(data.date);return;}
  if(!data.time){note.textContent=vi?'Vui lòng chọn giờ.':'시간대를 선택해 주세요.';return;}
  const slot=slots.find(s=>s.time===data.time);
  const remain=slot?slot.cap-bookedOn(data.date,data.time):0;
  note.classList.toggle('full',remain<=0);
  note.textContent=remain<=0?(vi?'Khung giờ này đã kín.':'이 시간대는 마감되었습니다.'):(vi?`Còn ${remain} chỗ.`:`이 시간대 잔여 ${remain}명.`);
}
const modal=document.getElementById('applyModal');
const steps=[...modal.querySelectorAll('.modal-step')];
const dots=[...document.querySelectorAll('#progress .dot')];
const btnBack=document.getElementById('btnBack');
const btnNext=document.getElementById('btnNext');
const TOTAL=5; // 입력 단계 수 (6번째는 완료화면)
let cur=1;
const data={branch:'',class:'',size:'',date:'',time:'',people:'1',name:'',phone:'',dialcode:'',email:'',nationality:'',facebook:'',instagram:'',msg:''};
/* 국적 → 국가번호 (선택 시 자동 입력, 수정 불가) */
const DIAL={'대한민국 (Korea)':'+82','베트남 (Vietnam)':'+84','일본 (Japan)':'+81','중국 (China)':'+86','대만 (Taiwan)':'+886','홍콩 (Hong Kong)':'+852','싱가포르 (Singapore)':'+65','말레이시아 (Malaysia)':'+60','태국 (Thailand)':'+66','인도네시아 (Indonesia)':'+62','필리핀 (Philippines)':'+63','인도 (India)':'+91','미국 (USA)':'+1','캐나다 (Canada)':'+1','영국 (UK)':'+44','프랑스 (France)':'+33','독일 (Germany)':'+49','이탈리아 (Italy)':'+39','스페인 (Spain)':'+34','네덜란드 (Netherlands)':'+31','스위스 (Switzerland)':'+41','스웨덴 (Sweden)':'+46','러시아 (Russia)':'+7','호주 (Australia)':'+61','뉴질랜드 (New Zealand)':'+64','브라질 (Brazil)':'+55','멕시코 (Mexico)':'+52','아랍에미리트 (UAE)':'+971','사우디아라비아 (Saudi Arabia)':'+966','튀르키예 (Türkiye)':'+90','기타 (Other)':''};
/* 국적 목록 (검색 가능한 datalist) */
const COUNTRIES=['대한민국 (Korea)','베트남 (Vietnam)','일본 (Japan)','중국 (China)','대만 (Taiwan)','홍콩 (Hong Kong)','싱가포르 (Singapore)','말레이시아 (Malaysia)','태국 (Thailand)','인도네시아 (Indonesia)','필리핀 (Philippines)','인도 (India)','미국 (USA)','캐나다 (Canada)','영국 (UK)','프랑스 (France)','독일 (Germany)','이탈리아 (Italy)','스페인 (Spain)','네덜란드 (Netherlands)','스위스 (Switzerland)','스웨덴 (Sweden)','러시아 (Russia)','호주 (Australia)','뉴질랜드 (New Zealand)','브라질 (Brazil)','멕시코 (Mexico)','아랍에미리트 (UAE)','사우디아라비아 (Saudi Arabia)','튀르키예 (Türkiye)','기타 (Other)'];
(function(){const dl=document.getElementById('natList');if(dl)dl.innerHTML=COUNTRIES.map(c=>`<option value="${c}"></option>`).join('');})();

function classObjOf(){return branchClassesOf(data.branch).find(c=>keyOf(c.name)===data.class);}
function isInquiry(){const c=classObjOf();return !!(c&&c.inquiry);}
function inquiryTemplate(){var l=curLang();
  if(l==='en')return '[Inquiry]\n- Group size: \n- Preferred date/time: \n- Details: \n';
  if(l==='vi')return '[Liên hệ]\n- Số người: \n- Ngày/giờ mong muốn: \n- Nội dung: \n';
  return '[문의 내용]\n- 희망 인원: \n- 희망 일정/시간: \n- 문의 사항: \n';
}
/* 열 때마다 기본값으로 리셋(캐시 잔존 방지): 첫 지점·첫 클래스·30ml·오늘·가장 빠른 시간·1명·신청자 공란 */
function resetApplyData(preClass){
  var brs=(getSettings().branches||[]).filter(function(b){return b&&b.name;});
  data.branch=brs.length?brs[0].name:'';
  var progs=programList(data.branch);
  data.class=preClass||(progs.length?keyOf(progs[0].name):'');
  var vols=volumesForName(data.branch,data.class);
  if(vols.length){var v30=vols.find(function(v){return String(v.volume)==='30';});data.size=((v30?v30.volume:vols[0].volume))+'ml';}
  else data.size='';
  data.date=vnToday();
  var avail=slotsFor(data.date).filter(function(s){return !isPastSlot(data.date,s.time);}).map(function(s){return s.time;}).sort();
  data.time=avail.length?avail[0]:'';
  data.people='1';
  data.name='';data.phone='';data.dialcode='';data.email='';data.nationality='';data.facebook='';data.instagram='';data.msg='';
}
function openModal(preClass){
  resetApplyData(preClass||'');     // 매번 기본값으로 초기화
  cur=1;
  populateBranches();
  renderPrograms();
  applyActiveStates();
  syncSelections();
  goto(1);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
function syncSelections(){
  modal.querySelectorAll('.opt-list').forEach(list=>{
    const field=list.dataset.field;
    list.querySelectorAll('.opt').forEach(o=>o.classList.toggle('sel',o.dataset.val===data[field]));
  });
  modal.querySelectorAll('[data-field]').forEach(inp=>{
    if(inp.tagName==='INPUT'||inp.tagName==='TEXTAREA'){if(data[inp.dataset.field]!==undefined)inp.value=data[inp.dataset.field];}
  });
}
function goto(n){
  cur=n;
  steps.forEach(s=>s.classList.toggle('active',+s.dataset.step===n));
  dots.forEach((d,i)=>d.classList.toggle('active',i<Math.min(n,TOTAL)));
  // 버튼 상태
  if(n===7){ btnBack.style.display='none'; btnNext.dataset.mode='close'; }       // 접수완료
  else if(n===6){ btnBack.style.display=''; btnNext.dataset.mode='finish'; renderConfirm(); }  // 확인
  else { btnBack.style.display=(n===1?'none':''); btnNext.dataset.mode=(n===TOTAL?'review':'next'); }
  applyBtnLabels();
  if(n===2) renderPrograms();
  if(n===3) renderSizes();
  if(n===4){
    var inq=isInquiry();
    var di=modal.querySelector('[data-field="date"]');if(di)di.min=vnToday();
    var tf=modal.querySelector('.modal-step[data-step="4"] [data-field="time"]'); var tw=tf?tf.closest('.mfield'):null;
    var pf=modal.querySelector('.modal-step[data-step="4"] [data-field="people"]'); var pw=pf?pf.closest('.mfield'):null;
    if(tw)tw.style.display=inq?'none':'';
    if(pw)pw.style.display=inq?'none':'';
    var cap=document.getElementById('capNote'); if(cap)cap.style.display=inq?'none':'';
    if(!inq){populateTimes();updateCapNote();}
  }
  if(n===5 && isInquiry()){
    var ta=modal.querySelector('[data-field="msg"]');
    if(ta && !data.msg){ ta.value=inquiryTemplate(); data.msg=ta.value; }
  }
  hideErrors();
}
function applyBtnLabels(){
  const lang=curLang();
  btnBack.textContent=lang==='en'?'Back':(lang==='vi'?'Quay lại':'이전');
  const m=btnNext.dataset.mode;
  if(m==='review')btnNext.textContent=lang==='en'?'Submit':(lang==='vi'?'Gửi':'접수');
  else if(m==='finish')btnNext.textContent=lang==='en'?'Confirm & apply':(lang==='vi'?'Hoàn tất đăng ký':'신청완료');
  else if(m==='close')btnNext.textContent=lang==='en'?'Close':(lang==='vi'?'Đóng':'닫기');
  else btnNext.textContent=lang==='en'?'Next':(lang==='vi'?'Tiếp theo':'다음');
}
function hideErrors(){modal.querySelectorAll('.err').forEach(e=>e.style.display='none');}
function showErr(name){const e=modal.querySelector(`[data-err="${name}"]`);if(e)e.style.display='block';}
function showCapErr(remain){
  const vi=document.documentElement.lang==='vi';
  const e=modal.querySelector('[data-err="cap"]');
  e.textContent = remain<=0
    ? (vi?'Ngày này đã kín chỗ. Vui lòng chọn ngày khác.':'해당 날짜는 마감되었습니다. 다른 날짜를 선택해 주세요.')
    : (vi?`Chỉ còn ${remain} chỗ. Vui lòng điều chỉnh số người.`:`이 날짜는 잔여 ${remain}명입니다. 인원을 조정해 주세요.`);
  e.style.display='block';
}

function collectInputs(){
  modal.querySelectorAll('[data-field]').forEach(inp=>{
    if(inp.tagName==='INPUT'||inp.tagName==='TEXTAREA'||inp.tagName==='SELECT') data[inp.dataset.field]=inp.value.trim();
  });
}
function validate(n){
  collectInputs();
  if(n===1&&!data.branch){showErr('branch');return false;}
  if(n===2&&!data.class){showErr('class');return false;}
  if(n===3 && !isInquiry() && !data.size){showErr('size');return false;}
  if(n===4){
    const lang=curLang();const vi=lang==='vi';const en=lang==='en';
    if(!data.date){showErr('visit');return false;}
    if(data.date<vnToday()){const e=modal.querySelector('[data-err="cap"]');e.textContent=vi?'Không thể chọn ngày đã qua.':en?'Past dates cannot be selected.':'지난 날짜는 선택할 수 없습니다.';e.style.display='block';return false;}
    if(isInquiry()) return true;   // 문의전용: 날짜만 확인(시간/슬롯/정원 검증 없음)
    const slots=slotsFor(data.date);
    if(!slots.length){const e=modal.querySelector('[data-err="cap"]');e.textContent=dayMsg(data.date);e.style.display='block';return false;}
    if(!data.time){showErr('visit');return false;}
    if(isPastSlot(data.date,data.time)){const e=modal.querySelector('[data-err="cap"]');e.textContent=vi?'Khung giờ đã qua. Vui lòng chọn giờ khác.':en?'This time has passed. Please choose another time.':'이미 지난 시간입니다. 다른 시간을 선택해 주세요.';e.style.display='block';return false;}
    const slot=slots.find(s=>s.time===data.time);
    if(!slot){showErr('visit');return false;}
    const remain=slot.cap-bookedOn(data.date,data.time);
    const req=parseInt(data.people)||1;
    if(remain<=0||req>remain){showCapErr(remain);return false;}
  }
  if(n===5&&(!data.name||!data.phone||!data.email||!data.nationality)){showErr('contact');return false;}
  return true;
}
function renderConfirm(){
  const lang=curLang();
  const L = lang==='en'?{branch:'Branch',class:'Class',size:'Volume',date:'Date',time:'Time',people:'People',name:'Name',phone:'Phone',email:'Email',nat:'Nationality',fb:'Facebook',ig:'Instagram',msg:'Note'}
    : lang==='vi'?{branch:'Chi nhánh',class:'Lớp',size:'Dung tích',date:'Ngày',time:'Giờ',people:'Số người',name:'Họ tên',phone:'SĐT',email:'Email',nat:'Quốc tịch',fb:'Facebook',ig:'Instagram',msg:'Ghi chú'}
    : {branch:'지점',class:'클래스',size:'용량',date:'날짜',time:'시간',people:'인원',name:'이름',phone:'연락처',email:'이메일',nat:'국적',fb:'Facebook',ig:'Instagram',msg:'메모'};
  const cObj=branchClassesOf(data.branch).find(c=>keyOf(c.name)===data.class);
  const clsDisp=cObj?Lval(cObj.name,lang):data.class;
  const inq=isInquiry();
  const rows=[['branch',data.branch],['class',clsDisp]];
  if(data.size && !inq) rows.push(['size',data.size]);
  rows.push(['date',data.date||'-']);
  if(!inq) rows.push(['time',data.time||'-'],['people',(data.people||'1')+(lang==='ko'?'명':'')]);
  rows.push(['name',data.name],['phone',(data.dialcode?data.dialcode+' ':'')+data.phone],['email',data.email],['nat',data.nationality]);
  if(data.facebook) rows.push(['fb',data.facebook]);
  if(data.instagram) rows.push(['ig',data.instagram]);
  if(data.msg) rows.push(['msg',data.msg]);
  document.getElementById('confirmSummary').innerHTML=
    rows.map(([k,v])=>`<div class="sr"><span class="k">${L[k]}</span><span class="v"${k==='msg'?' style="white-space:pre-line;text-align:right"':''}>${esc(v)}</span></div>`).join('');
}
function submitApplication(){
  const entry={id:Date.now(),createdAt:new Date().toISOString(),
    branch:data.branch,name:data.name,phone:(data.dialcode?data.dialcode+' ':'')+(data.phone||''),email:data.email,nationality:data.nationality,
    facebook:data.facebook||'',instagram:data.instagram||'',class:data.class,
    size:data.size,date:data.date,time:data.time,people:data.people||'1',
    msg:data.msg,status:'new'};
  try{const list=(window.LS?LS.getApps():[]).slice();list.push(entry);LS.setApps(list);}catch(err){console.warn('저장 실패',err);}
  goto(7);
}

/* 초기 옵션 바인딩 (열릴 때 동적 렌더로 재바인딩됨) */
modal.querySelectorAll('.opt-list').forEach(bindOptList);
/* 날짜 변경 → 시간대 재조회, 시간/인원 변경 → 잔여 정원 갱신 */
(function(){
  const dateInp=modal.querySelector('[data-field="date"]');
  const timeSel=modal.querySelector('[data-field="time"]');
  const peopleInp=modal.querySelector('[data-field="people"]');
  if(dateInp)dateInp.addEventListener('input',()=>{collectInputs();data.time='';populateTimes();updateCapNote();hideErrors();});
  if(timeSel)timeSel.addEventListener('change',()=>{collectInputs();updateCapNote();hideErrors();});
  if(peopleInp)peopleInp.addEventListener('input',()=>{collectInputs();updateCapNote();hideErrors();});
  // 국적 선택 → 국가번호 자동 입력(수정 불가)
  const natInp=modal.querySelector('[data-field="nationality"]');
  const dcInp=modal.querySelector('[data-field="dialcode"]');
  if(natInp&&dcInp)natInp.addEventListener('input',()=>{dcInp.value=DIAL[natInp.value.trim()]||'';data.dialcode=dcInp.value;hideErrors();});
})();
/* nav */
btnNext.addEventListener('click',()=>{
  const m=btnNext.dataset.mode;
  if(m==='close'){closeModal();return;}
  if(m==='finish'){submitApplication();return;}          // 확인 화면 → 접수완료
  if(!validate(cur))return;
  if(m==='review'){goto(6);return;}                      // STEP5 접수 → 확인 화면
  let n=cur+1;
  if(n===3 && (!needsSize()||isInquiry())) n=4; // 용량 단계 건너뛰기(문의전용 포함)
  goto(n);
});
btnBack.addEventListener('click',()=>{
  if(cur===6){goto(5);return;}                            // 확인 → 다시 입력
  let n=cur-1;
  if(n===3 && (!needsSize()||isInquiry())) n=2;
  if(n>=1) goto(n);
});
/* open triggers */
document.querySelectorAll('[data-open-apply]').forEach(b=>b.addEventListener('click',e=>{
  e.preventDefault();
  if(b.dataset.disabled)return;
  openModal(b.dataset.class||data.class||'');
}));
/* 지점명 언어별 라벨 (지점명은 단일 문자열이라, 알려진 지점명을 언어에 맞게 변환·없으면 원문) */
var BRANCH_I18N={
  '호치민':{ko:'호치민',en:'Ho Chi Minh',vi:'Hồ Chí Minh'},
  '하노이':{ko:'하노이',en:'Hanoi',vi:'Hà Nội'},
  '다낭':{ko:'다낭',en:'Da Nang',vi:'Đà Nẵng'}
};
function branchLabel(name){
  var key=((name||'').split('(')[0]||name||'').trim();
  var m=BRANCH_I18N[key];
  return m?(m[curLang()]||m.ko||key):key;
}
/* 상단 네비 지점별 소셜 버튼(호버 펼침) — 어드민 지점설정의 인스타·페북·링크트리 링크 사용 */
function renderNavSocials(){
  var langEl=document.querySelector('header .lang'); if(!langEl)return;
  if(!document.getElementById('ls-svgdefs')){
    var d=document.createElement('div'); d.id='ls-svgdefs'; d.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
    d.innerHTML='<svg width="0" height="0" aria-hidden="true"><symbol id="ic-instagram" viewBox="0 0 24 24"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.25" fill="currentColor"/></symbol><symbol id="ic-facebook" viewBox="0 0 24 24"><path fill="currentColor" d="M13.5 21v-7.5h2.52l.38-3h-2.9V8.55c0-.87.24-1.46 1.49-1.46h1.59V4.41c-.28-.04-1.23-.12-2.32-.12-2.3 0-3.87 1.4-3.87 3.98V10.5H8.2v3h2.66V21h2.64z"/></symbol><symbol id="ic-linktree" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M10.5 13.6a3.5 3.5 0 0 0 5 0l2.3-2.3a3.5 3.5 0 0 0-5-5l-1 1M13.5 10.4a3.5 3.5 0 0 0-5 0l-2.3 2.3a3.5 3.5 0 0 0 5 5l1-1"/></symbol></svg>';
    document.body.appendChild(d);
  }
  var brs=(getSettings().branches||[]).filter(function(b){return b&&b.name&&(b.instagram||b.facebook||b.linktree);});
  var box=document.getElementById('navSocials');
  if(!brs.length){ if(box)box.parentNode.removeChild(box); return; }
  if(!box){ box=document.createElement('div'); box.className='socials'; box.id='navSocials'; langEl.parentNode.insertBefore(box, langEl); }
  box.classList.toggle('show-all', brs.length<=1); // 지점 1곳이면 호버 없이 아이콘 항상 노출
  box.innerHTML=brs.map(function(b){
    var nm=esc(b.name); var ic='';
    if(b.instagram) ic+='<a class="ig" href="'+esc(b.instagram)+'" target="_blank" rel="noopener" aria-label="'+nm+' Instagram"><svg class="ic"><use href="#ic-instagram"/></svg></a>';
    if(b.facebook)  ic+='<a class="fb" href="'+esc(b.facebook)+'" target="_blank" rel="noopener" aria-label="'+nm+' Facebook"><svg class="ic"><use href="#ic-facebook"/></svg></a>';
    if(b.linktree)  ic+='<a class="lt" href="'+esc(b.linktree)+'" target="_blank" rel="noopener" aria-label="'+nm+' Linktree"><svg class="ic"><use href="#ic-linktree"/></svg></a>';
    var shortName=esc(branchLabel(b.name));
    return '<div class="soc-group" tabindex="0"><span class="soc-b">'+shortName+'</span><span class="soc-icons">'+ic+'</span></div>';
  }).join('');
}
/* 데이터 로드(Supabase 또는 localStorage) 후 초기 렌더 */
(window.LS ? LS.init() : Promise.resolve()).then(function(){
  applyActiveStates();
  renderClasses();
  renderLocation();
  renderMap();
  renderFooterSocial();
  renderSiteInfo();
  renderSpaceFolderChips();
  initSpaceCarousel();
  renderSpaceGrid();
  renderFolderChips();
  renderGallery();
  renderPartners();
  renderNavSocials();
});
/* close triggers */
document.getElementById('modalClose').addEventListener('click',closeModal);
/* 바깥(오버레이) 클릭으로는 닫히지 않음 — X 버튼/ESC 로만 닫힘 */
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();});

/* ===== 원페이지 효과: 스크롤 등장 · 스크롤스파이 · 라이트박스 · 패럴랙스 ===== */
function initEffects(){
  // 1) 스크롤 등장(fade-in-up)
  var targets=document.querySelectorAll('.sec-head,.concept-grid,.steps-grid,.gallery-grid,.gallery-more-wrap,.loc-grid,.cta-band .wrap,.marquee,.logo-strip-wrap');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
    targets.forEach(function(t){t.classList.add('reveal');io.observe(t);});
  } else { targets.forEach(function(t){t.classList.add('in');}); }
  // 2) 현재 페이지 네비 강조(멀티페이지)
  var curPg=(location.pathname.split('/').pop()||'index.html');
  document.querySelectorAll('#navLinks a').forEach(function(a){var h=a.getAttribute('href')||'';if(h&&h!=='#'&&h===curPg)a.classList.add('active');});
  // 3) 라이트박스(갤러리·공간 사진 확대 + 이전/다음)
  var lb=document.getElementById('lightbox');
  if(lb){
    var lbImg=lb.querySelector('img'), lbCap=lb.querySelector('.lb-cap');
    var lbList=[], lbIdx=0;
    function lbShow(i){ if(!lbList.length)return; lbIdx=(i+lbList.length)%lbList.length; var it=lbList[lbIdx]; lbImg.src=it.src; lbCap.textContent=it.cap||''; }
    function lbClose(){lb.classList.remove('open');document.body.style.overflow='';lbImg.removeAttribute('src');lbList=[];}
    function buildList(hit){
      var grid=hit.closest('#galleryGrid')||hit.closest('#spaceGrid');
      if(grid){ var ns=[].slice.call(grid.querySelectorAll('.gitem'));
        var list=ns.map(function(n){var im=n.querySelector('img');var t=n.querySelector('.gcap-t');return {src:(im&&(im.currentSrc||im.src))||'',cap:t?t.textContent:''};});
        return {list:list, idx:Math.max(0,ns.indexOf(hit.closest('.gitem')))}; }
      var mq=hit.closest('#spaceMarquee');
      if(mq){ var cards=[].slice.call(mq.querySelectorAll('.mcard')); var seen={}, list=[]; var cim=hit.querySelector('img'); var csrc=cim?(cim.currentSrc||cim.src):'';
        cards.forEach(function(c){var im=c.querySelector('img');if(!im)return;var src=im.currentSrc||im.src;if(seen[src])return;seen[src]=1;var t=c.querySelector('.mc-t')||c.querySelector('.mc-d');list.push({src:src,cap:t?t.textContent:''});});
        var idx=0; for(var k=0;k<list.length;k++){if(list[k].src===csrc){idx=k;break;}}
        return {list:list, idx:idx}; }
      var im2=hit.querySelector('img'); return {list:[{src:im2?(im2.currentSrc||im2.src):'',cap:''}], idx:0};
    }
    document.addEventListener('click',function(e){
      var hit=e.target.closest('#galleryGrid .gitem, #spaceGrid .gitem, .mcard .mc-img'); if(!hit)return;
      if(hit.tagName==='A') return;                 // 링크가 걸린 항목은 링크 우선
      var img=hit.querySelector('img'); if(!img)return;
      e.preventDefault(); var r=buildList(hit); lbList=r.list; lbShow(r.idx); lb.classList.add('open'); document.body.style.overflow='hidden';
    });
    lb.addEventListener('click',function(e){
      if(e.target.classList.contains('lb-prev')){lbShow(lbIdx-1);return;}
      if(e.target.classList.contains('lb-next')){lbShow(lbIdx+1);return;}
      if(e.target===lb||e.target.classList.contains('lb-close'))lbClose();
    });
    document.addEventListener('keydown',function(e){
      if(!lb.classList.contains('open'))return;
      if(e.key==='Escape')lbClose();
      else if(e.key==='ArrowLeft')lbShow(lbIdx-1);
      else if(e.key==='ArrowRight')lbShow(lbIdx+1);
    });
  }
  // 4) 히어로 패럴랙스(스크롤 시 천천히 위로 + 페이드)
  var hero=document.querySelector('.hero .hero-inner');
  if(hero){
    var onScroll=function(){var y=window.scrollY||window.pageYOffset||0,vh=window.innerHeight||800;
      if(y<=vh){hero.style.transform='translateY('+(y*0.2)+'px)';hero.style.opacity=String(Math.max(0,1-y/(vh*0.85)));}};
    window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  }
  // 5) 플로팅 버튼(예약하기 · 맨 위로) — 스크롤해도 항상 표시
  if(!document.querySelector('.floaty')){
    try{ I18N.en['floaty.book']='Book a class'; I18N.vi['floaty.book']='Đặt lịch'; I18N.ko['floaty.book']='예약하기'; }catch(e){}
    var f=document.createElement('div'); f.className='floaty';
    var book=document.createElement('button'); book.type='button'; book.className='floaty-book';
    book.setAttribute('data-i18n','floaty.book'); book.textContent=(I18N[curLang()]&&I18N[curLang()]['floaty.book'])||'예약하기';
    book.addEventListener('click',function(){ if(typeof openModal==='function') openModal(''); });
    var top=document.createElement('button'); top.type='button'; top.className='floaty-top'; top.setAttribute('aria-label','top'); top.innerHTML='↑';
    top.addEventListener('click',function(){ window.scrollTo({top:0,behavior:'smooth'}); });
    f.appendChild(book); f.appendChild(top); document.body.appendChild(f);
  }
}
initEffects();


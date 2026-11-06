# -*- coding: utf-8 -*-
import os

path = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱\app.js"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

idx_start = text.find("function openTestSwitchModal(){")
idx_end = text.find("document.body.appendChild(bg);\n}", idx_start)
if idx_end == -1:
    idx_end = text.find("document.body.appendChild(bg);", idx_start)
    idx_end = text.find("}", idx_end)

print("start:", idx_start, "end:", idx_end)

new_func = """function openTestSwitchModal(){
 $('testSwitchDlg')?.remove();
 const curEmail=(state&&state.email)||'';
 const openRoster = (window.OPEN_SUPPORT_ROSTER||[
  {team:'수도권 서부지원팀',name:'진윤섭',title:'과장 (서부지원팀장)',loginEmail:'jinys@daiso.test',isLeader:true},
  {team:'수도권 서부지원팀',name:'주은정',title:'차장 (선임)',loginEmail:'juej@daiso.test'},
  {team:'수도권 서부지원팀',name:'김영진',title:'대리 (담당)',loginEmail:'kimyj@daiso.test'},
  {team:'수도권 서부지원팀',name:'홍영웅',title:'사원',loginEmail:'hongyw@daiso.test'},
  {team:'수도권 서부지원팀',name:'이유정',title:'사원',loginEmail:'leeyj@daiso.test'},
  {team:'수도권 서부지원팀',name:'김혜미',title:'사원',loginEmail:'kimhm@daiso.test'},
  {team:'수도권 서부지원팀',name:'이승권',title:'사원',loginEmail:'leesk@daiso.test'},

  {team:'수도권 동부지원팀',name:'김새롬',title:'대리 (동부지원팀장)',loginEmail:'kimsr@daiso.test',isLeader:true},
  {team:'수도권 동부지원팀',name:'전소영',title:'사원 (선임)',loginEmail:'jeonsy@daiso.test'},
  {team:'수도권 동부지원팀',name:'황보민우',title:'사원',loginEmail:'hwangbomw@daiso.test'},
  {team:'수도권 동부지원팀',name:'김윤식',title:'사원',loginEmail:'kimys@daiso.test'},
  {team:'수도권 동부지원팀',name:'곽예지',title:'사원',loginEmail:'gwakyeji@daiso.test'},
  {team:'수도권 동부지원팀',name:'정진희',title:'사원',loginEmail:'jungjh@daiso.test'},

  {team:'호남 오픈지원팀',name:'박주경',title:'과장 (호남팀장兼)',loginEmail:'parkjk@daiso.test',isLeader:true},
  {team:'호남 오픈지원팀',name:'안종모',title:'과장 (선임)',loginEmail:'ahnjm@daiso.test'},
  {team:'호남 오픈지원팀',name:'서정진',title:'사원',loginEmail:'seojj@daiso.test'},
  {team:'호남 오픈지원팀',name:'전동민',title:'사원',loginEmail:'jeondm@daiso.test'},
  {team:'호남 오픈지원팀',name:'최지연',title:'사원',loginEmail:'choijy@daiso.test'},

  {team:'영남 오픈지원팀',name:'남희준',title:'과장 (영남팀장)',loginEmail:'namhj@daiso.test',isLeader:true},
  {team:'영남 오픈지원팀',name:'이현석',title:'사원 (선임)',loginEmail:'leehs@daiso.test'},
  {team:'영남 오픈지원팀',name:'윤경희',title:'사원',loginEmail:'yoonkh@daiso.test'},
  {team:'영남 오픈지원팀',name:'김수연',title:'사원',loginEmail:'kimsy@daiso.test'},
  {team:'영남 오픈지원팀',name:'박수정',title:'사원',loginEmail:'parksj@daiso.test'},
  {team:'영남 오픈지원팀',name:'정우재',title:'사원',loginEmail:'jungwj@daiso.test'},

  {team:'수도권 리뉴얼팀',name:'장기선',title:'과장 (수도권리뉴얼팀장)',loginEmail:'jangks@daiso.test',isLeader:true},
  {team:'수도권 리뉴얼팀',name:'신정미',title:'차장 (선임)',loginEmail:'shinjm@daiso.test'},
  {team:'수도권 리뉴얼팀',name:'변준영',title:'사원',loginEmail:'byunjy@daiso.test'},

  {team:'지방 리뉴얼팀',name:'박주경',title:'과장兼 (지방리뉴얼팀장)',loginEmail:'parkjk.local@daiso.test',isLeader:true},
  {team:'지방 리뉴얼팀',name:'홍병우',title:'과장 (선임)',loginEmail:'hongbw@daiso.test'},
  {team:'지방 리뉴얼팀',name:'윤경희',title:'사원',loginEmail:'yoonkh.local@daiso.test'},
  {team:'지방 리뉴얼팀',name:'최재이',title:'사원',loginEmail:'choiji@daiso.test'}
 ]);

 const accounts=[
  ['STAFF','sky5224122@gmail.com','👨‍💼 강동현 (안전보건팀 총괄 · 부서 선택 진입)','로그인 후 [인테리어부] [매장개선부] [오픈지원부] [현장개선부] 선택 가능'],
  ['VENDOR','kworks@vendor.test','👷 케이웍스코리아 (오픈지원 80점·입고도우미 81점 · 전국 160명)','오픈지원 진열·입고 및 매장CS 입고도우미 겸업'],
  ['VENDOR','adegg@vendor.test','👷 에드에그 (오픈지원 진열용역 · 전국 100명 · 90점 S)','강남본점 800평 리뉴얼 오픈 진열용역 배정'],
  ['VENDOR','uni@vendor.test','👷 유엔아이 (오픈지원 진열용역 · 수도권/충청/중호 120명 · 79점 B)','대전둔산점 500평 신규오픈 진열용역 (보호구·비상훈련 점검)'],
  ['VENDOR','human@vendor.test','👷 휴먼인프라 (오픈지원·입고도우미 · 영남 100명 · 95점 S)','부산센텀점 오픈지원 및 영남권 매장 입고도우미'],
  ['VENDOR','mentos@vendor.test','👷 맨토스 (오픈지원·입고도우미 · 수도권/전국 90명 · 85점 A)','대전둔산점 오픈지원 및 수도권 매장 입고도우미'],
  ['VENDOR','bluekey@vendor.test','👷 블루키솔루션 (매장CS 입고도우미 · 일 2h · 95점 S)','25년 69점 미달(엠앤제이) 대체 신규 우수 입고업체'],
  ['VENDOR','tsw@vendor.test','👷 TSW파트너스 (매장CS 재고도우미 · 야간 실사 · 100점 S)','퇴근시간 이후(22시~) 야간 재고현황 파악 · 적격평가 만점'],
  ['VENDOR','arte@vendor.test','👷 아르테코리아 (매장CS 재고도우미 · 야간 실사 · 79점 B)','야간 재고실사 · 보호구/위험성평가/비상대책 보완 대상'],
  ['VENDOR','yumeus@vendor.test','👷 유미어스 (매장CS 재고도우미 · 야간 실사 · 70점 B)','야간 재고실사 · 적격 커트라인(70점) 최우선 현장점검 대상'],
  ['VENDOR','sunghyun@vendor.test','🛠 성현기업 (매장개선부 집기 91점 S)','매장 진열대 및 창고 경량랙 제작·납품·설치·철거·재배치'],
  ['VENDOR','yeowoo@vendor.test','🛠 예우시스템 (매장개선부 집기 89점 A)','상품 진열대(곤돌라) 및 벽면 선반 설치·보수·철거'],
  ['VENDOR','sigong@vendor.test','👷 (주)시공디자인 (인테리어팀 마감공사 · 92점 S)','인테리어/공사/집기 대표 시공사 · 강남본점 800평 리뉴얼']
 ];

 const bg=document.createElement('div');bg.id='testSwitchDlg';bg.setAttribute('role','dialog');bg.setAttribute('aria-modal','true');
 bg.style.cssText='position:fixed;inset:0;z-index:9999;background:rgba(15,23,42,.65);display:flex;align-items:center;justify-content:center;padding:12px';

 const teams = ['수도권 서부지원팀', '수도권 동부지원팀', '호남 오픈지원팀', '영남 오픈지원팀', '수도권 리뉴얼팀', '지방 리뉴얼팀'];
 let openHtml = '';
 teams.forEach(tName => {
  const members = openRoster.filter(x => x.team === tName);
  const leader = members.find(x => x.isLeader) || members[0];
  openHtml += `
   <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:8px 10px;margin-bottom:6px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
     <span style="font-weight:800;font-size:12.5px;color:#0f172a">📦 ${escapeText(tName)} (${members.length}명)</span>
     <button class="button xs" style="background:#0284c7;color:#fff;font-weight:700;padding:2px 8px;font-size:11px;border-radius:6px"
      onclick="quickTestLogin('${leader.loginEmail}','STAFF','OPEN')">⚡ 팀장(${escapeText(leader.name)}) 로그인</button>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:4px">
     ${members.map(m => `
      <button class="button xs ${m.isLeader?'':'ghost'}" style="font-size:11px;padding:2px 6px;border-radius:5px;${m.loginEmail===curEmail?'border:2px solid #0284c7;background:#e0f2fe;font-weight:800':''}"
       onclick="quickTestLogin('${m.loginEmail}','STAFF','OPEN')">
       ${m.isLeader?'👑 ':''}${escapeText(m.name)} ${escapeText(m.title.split(' ')[0])}
      </button>
     `).join('')}
    </div>
   </div>
  `;
 });

 bg.innerHTML=`
  <div class="card" style="max-width:680px;width:100%;max-height:92vh;overflow-y:auto;margin:0;padding:16px;border-radius:16px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.3)">
   <div class="row" style="justify-content:space-between;align-items:flex-start;border-bottom:1px solid #e2e8f0;padding-bottom:10px;margin-bottom:12px">
    <div>
     <h3 style="margin:0;font-size:16px;font-weight:800;color:#0f172a">⚡ 빠른 시험 계정 전환 (다이소 담당자 · 협력업체)</h3>
     <p class="muted" style="margin:2px 0 0;font-size:11.5px">원하는 직책/업체를 누르면 암호 없이 즉시 해당 계정 권한으로 진입합니다.</p>
    </div>
    <button class="button ghost xs" onclick="$('testSwitchDlg').remove()" style="font-size:15px;padding:2px 8px">✕</button>
   </div>

   <div style="margin-bottom:12px">
    <div style="font-size:12.5px;font-weight:800;color:#0284c7;margin-bottom:6px;display:flex;align-items:center;gap:6px">
     <span>📦 다이소 오픈지원부 실무 작성 담당자 (6개 팀 29명)</span>
     <span style="font-size:11px;font-weight:normal;color:#64748b">클릭 시 [오픈지원부 진열·입고 5개사] 화면 자동 진입</span>
    </div>
    ${openHtml}
   </div>

   <div style="margin-bottom:10px">
    <div style="font-size:12.5px;font-weight:800;color:#475569;margin-bottom:6px">🏢 안전보건팀 총괄 및 주요 협력업체 (13개사)</div>
    <div style="display:flex;flex-direction:column;gap:5px">
     ${accounts.map(([md,em,label,desc])=>`
      <button class="button ghost" style="text-align:left;display:flex;flex-direction:column;align-items:flex-start;padding:6px 10px;border-radius:8px;border:1px solid ${em===curEmail?'#0284c7':'#cbd5e1'};background:${em===curEmail?'#f0f9ff':'#fff'}"
       onclick="quickTestLogin('${em}','${md}','${em.includes('daiso')?'':''}')">
       <div style="font-size:12px;font-weight:800;color:#1e293b">${escapeText(label)} ${em===curEmail?'<span style="color:#0284c7;font-size:10.5px">(현재 접속 중)</span>':''}</div>
       <div style="font-size:11px;color:#64748b">${escapeText(desc)}</div>
      </button>
     `).join('')}
    </div>
   </div>

   <div style="text-align:right;margin-top:8px">
    <button class="button secondary xs" onclick="$('testSwitchDlg').remove()">닫기</button>
   </div>
  </div>
 `;
 document.body.appendChild(bg);
}"""

text = text[:idx_start] + new_func + text[idx_end+1:]
with open(path, "w", encoding="utf-8") as f:
    f.write(text)
print("app.js updated successfully via script file!")

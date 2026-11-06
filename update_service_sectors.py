# -*- coding: utf-8 -*-
"""
service.js에 4대 부서(오픈지원부, 인테리어부, 매장개선부, 현장개선부) 체계 반영
"""
import os

path = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱\service.js"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. 탭 네비게이션 버튼 교체
old_tabs = """    <!-- 서브 탭 네비게이션 -->
    <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">
      <button class="btn ${svcTab==='mobile'?'primary':'ghost'}" onclick="svcTab='mobile';loadService()" style="${svcTab==='mobile'?'background:#15803d;border-color:#15803d;color:#fff;':'border-color:#16a34a;color:#15803d;background:#f0fdf4;'}font-weight:900">
        📱 모바일 스마트점검 (사진·음성·카드 한눈에 보기)
      </button>
      <button class="btn ${svcTab==='open'?'primary':'ghost'}" onclick="svcTab='open';loadService()">
        📦 오픈지원부 (진열·입고 ${d.openVendors.length}개사)
      </button>
      <button class="btn ${svcTab==='cs'?'primary':'ghost'}" onclick="svcTab='cs';loadService()">
        🛒 매장CS팀 (입고${inboundVendors.length}·재고${invVendors.length} 총 ${d.csVendors.length}개사)
      </button>
      <button class="btn ${svcTab==='field'?'primary':'ghost'}" onclick="svcTab='field';loadService()" style="${svcTab!=='field'?'border-color:#2563eb;color:#1d4ed8;font-weight:900':''}">
        🔍 현장방문 실태점검 (30문항·인터뷰)
      </button>
      <button class="btn ${svcTab==='qual'?'primary':'ghost'}" onclick="svcTab='qual';loadService()">
        📋 '26년 상반기 적격업체평가 & 합동점검
      </button>
      <button class="btn ${svcTab==='survey'?'primary':'ghost'}" onclick="svcTab='survey';loadService()">
        📑 도급현황 조사표 (26문항 완결)
      </button>
    </div>"""

new_tabs = """    <!-- 4대 부서 통합 서브 탭 네비게이션 -->
    <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
      <button class="btn ${svcTab==='open'?'primary':'ghost'}" onclick="svcTab='open';loadService()">
        📦 오픈지원부 (5개사)
      </button>
      <button class="btn ${svcTab==='interior'?'primary':'ghost'}" onclick="svcTab='interior';loadService()" style="${svcTab==='interior'?'background:#d97706;border-color:#d97706;color:#fff;':'border-color:#d97706;color:#92400e;background:#fffbeb;'}font-weight:800">
        🏗 인테리어부 (19개사)
      </button>
      <button class="btn ${svcTab==='improve'?'primary':'ghost'}" onclick="svcTab='improve';loadService()" style="${svcTab==='improve'?'background:#059669;border-color:#059669;color:#fff;':'border-color:#059669;color:#065f46;background:#ecfdf5;'}font-weight:800">
        🛠 매장개선부 (집기4·사인5)
      </button>
      <button class="btn ${svcTab==='cs'?'primary':'ghost'}" onclick="svcTab='cs';loadService()">
        🛒 현장개선부(입고/재고 9개사)
      </button>
      <button class="btn ${svcTab==='mobile'?'primary':'ghost'}" onclick="svcTab='mobile';loadService()" style="${svcTab==='mobile'?'background:#15803d;border-color:#15803d;color:#fff;':'border-color:#16a34a;color:#15803d;background:#f0fdf4;'}font-weight:800">
        📱 모바일 간편점검
      </button>
      <button class="btn ${svcTab==='field'?'primary':'ghost'}" onclick="svcTab='field';loadService()" style="${svcTab!=='field'?'border-color:#2563eb;color:#1d4ed8;font-weight:900':''}">
        🔍 현장점검 (30문항+15문항)
      </button>
      <button class="btn ${svcTab==='qual'?'primary':'ghost'}" onclick="svcTab='qual';loadService()">
        🏆 4대 부서 적격평가 총괄표
      </button>
      <button class="btn ${svcTab==='survey'?'primary':'ghost'}" onclick="svcTab='survey';loadService()">
        📑 도급운영 조사표
      </button>
    </div>"""

# 줄바꿈 정규화 후 치환
text_norm = text.replace("\r\n", "\n")
old_tabs_norm = old_tabs.replace("\r\n", "\n")
new_tabs_norm = new_tabs.replace("\r\n", "\n")

if old_tabs_norm in text_norm:
    text_norm = text_norm.replace(old_tabs_norm, new_tabs_norm)
    print("탭 네비게이션 치환 성공!")
else:
    print("경고: old_tabs_norm을 찾지 못함!")

# 2. subContent 분기 추가
old_sub = """  const sub = document.getElementById('svcSubContent');
  if (svcTab === 'mobile') renderSvcMobileQuick(sub, d);
  else if (svcTab === 'open') renderSvcOpen(sub, d);
  else if (svcTab === 'cs') renderSvcCS(sub, d);
  else if (svcTab === 'field') renderSvcField(sub, d);
  else if (svcTab === 'qual') renderSvcQual(sub, d);
  else renderSvcSurvey(sub, d);"""

new_sub = """  const sub = document.getElementById('svcSubContent');
  if (svcTab === 'mobile') renderSvcMobileQuick(sub, d);
  else if (svcTab === 'open') renderSvcOpen(sub, d);
  else if (svcTab === 'interior') {
    sub.innerHTML = renderInteriorBannerHtml() + '<div style="margin-top:14px">' + (typeof renderJobsHtml === 'function' ? renderJobsHtml() : '') + '</div>';
  }
  else if (svcTab === 'improve') {
    sub.innerHTML = typeof renderImproveTabHtml === 'function' ? renderImproveTabHtml() : '<div class="card"><p>매장개선부 데이터를 로드 중입니다...</p></div>';
  }
  else if (svcTab === 'cs') renderSvcCS(sub, d);
  else if (svcTab === 'field') renderSvcField(sub, d);
  else if (svcTab === 'qual') renderSvcQual(sub, d);
  else renderSvcSurvey(sub, d);"""

old_sub_norm = old_sub.replace("\r\n", "\n")
new_sub_norm = new_sub.replace("\r\n", "\n")

if old_sub_norm in text_norm:
    text_norm = text_norm.replace(old_sub_norm, new_sub_norm)
    print("subContent 분기 치환 성공!")
else:
    print("경고: old_sub_norm을 찾지 못함!")

# 3. openSectorSelectModal() 함수를 4개 접속 구분으로 전면 교체
modal_start_token = "function openSectorSelectModal(isPostLogin) {"
modal_end_token = "document.body.appendChild(ov);\n}"

new_modal_func = """function openSectorSelectModal(isPostLogin) {
  const old = document.getElementById('sectorSelectDlg');
  if (old) old.remove();
  const cur = window.APP_SECTOR || '';
  const userName = (typeof state !== 'undefined' && state && state.staff && state.staff.name) ? state.staff.name : '강동현';
  const userEmail = (typeof state !== 'undefined' && state && state.email) ? state.email : 'sky5224122@gmail.com';

  const ov = document.createElement('div');
  ov.id = 'sectorSelectDlg';
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');
  ov.style.cssText = 'position:fixed;inset:0;z-index:85;background:rgba(15,23,42,.75);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:16px;overflow-y:auto';
  ov.innerHTML = `
    <div style="background:#fff;border-radius:22px;max-width:980px;width:100%;padding:26px;box-shadow:0 30px 70px rgba(0,0,0,.4);margin:auto;max-height:92vh;overflow-y:auto">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:16px;flex-wrap:wrap">
        <div>
          <span style="display:inline-block;background:#eff6ff;color:#1d4ed8;font-size:12px;font-weight:900;padding:4px 12px;border-radius:999px;margin-bottom:6px">
            🛡️ 아성다이소 도급 안전보건관리 시스템 · 4대 핵심 관리부서 맞춤 진입
          </span>
          <h2 style="margin:0;font-size:23px;font-weight:900;color:#0f172a;letter-spacing:-.5px">
            관리하실 도급 부서를 선택해 주세요 (4대 부서)
          </h2>
          <p style="margin:4px 0 0;font-size:13px;color:#475569">
            접속자: <b>${esc(userName)}</b> (${esc(userEmail)}) · 상단 <b>[업종 전환]</b> 버튼으로 언제든 다른 부서로 이동할 수 있습니다.
          </p>
        </div>
        ${!isPostLogin ? `<button type="button" onclick="document.getElementById('sectorSelectDlg')?.remove()" style="border:1px solid #cbd5e1;background:#fff;border-radius:8px;padding:6px 14px;font-weight:800;font-size:12.5px;cursor:pointer">✕ 닫기</button>` : ''}
      </div>

      <!-- 4대 도급 부서 선택 카드 그리드 (2x2 반응형) -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;margin-bottom:18px">
        
        <!-- [1] 오픈지원부 -->
        <div style="border:2px solid ${cur==='OPEN'?'#2563eb':'#e2e8f0'};background:${cur==='OPEN'?'#eff6ff':'#f8fafc'};border-radius:16px;padding:16px;display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="background:#dbeafe;color:#1e40af;font-size:11px;font-weight:900;padding:3px 8px;border-radius:999px">매장지원부문</span>
              <span style="font-size:11.5px;font-weight:800;color:#1d4ed8">5개사 (일 최대 570명)</span>
            </div>
            <h3 style="margin:0 0 6px;font-size:18px;font-weight:900;color:#0f172a">
              📦 오픈지원부
            </h3>
            <p style="margin:0 0 10px;font-size:12px;color:#475569;line-height:1.5">
              신규·리뉴얼 매장 오픈 전 초도 상품 하차 보조 및 진열 용역
            </p>
            <div style="background:#fff;border:1px solid #bfdbfe;border-radius:8px;padding:8px 10px;font-size:11.5px;color:#334155;line-height:1.5;margin-bottom:10px">
              <div>• <b>케이웍스코리아(80) · 에드에그(90)</b></div>
              <div>• <b>유엔아이(79) · 휴먼인프라(95) · 맨토스(85)</b></div>
              <div style="color:#1d4ed8;font-weight:700;margin-top:4px">✔ 다이소 리베로와 공간분리(층별/구역별) · 사다리/커터칼 안전</div>
            </div>
          </div>
          <button type="button" onclick="svcTab='open';selectAppSector('OPEN','service')" style="width:100%;padding:11px;border-radius:10px;border:none;background:#1d4ed8;color:#fff;font-size:13.5px;font-weight:900;cursor:pointer">
            📦 오픈지원부 대시보드 입장 ›
          </button>
        </div>

        <!-- [2] 인테리어부 -->
        <div style="border:2px solid ${cur==='INTERIOR'?'#f59e0b':'#e2e8f0'};background:${cur==='INTERIOR'?'#fffbeb':'#f8fafc'};border-radius:16px;padding:16px;display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="background:#fef3c7;color:#92400e;font-size:11px;font-weight:900;padding:3px 8px;border-radius:999px">인테리어·매장시설팀</span>
              <span style="font-size:11.5px;font-weight:800;color:#b45309">19개 적격업체</span>
            </div>
            <h3 style="margin:0 0 6px;font-size:18px;font-weight:900;color:#0f172a">
              🏗 인테리어부
            </h3>
            <p style="margin:0 0 10px;font-size:12px;color:#475569;line-height:1.5">
              매장 마감공사(9사) · 사인공사(5사) · 냉난방(1사) · 시설보수(4사)
            </p>
            <div style="background:#fff;border:1px solid #fde68a;border-radius:8px;padding:8px 10px;font-size:11.5px;color:#334155;line-height:1.5;margin-bottom:10px">
              <div>• <b>마감: 시공·예본·디파 등 9개사</b></div>
              <div>• <b>사인: 우리애드·미르컴 등 5개사 / 냉난방·보수 5사</b></div>
              <div style="color:#b45309;font-weight:700;margin-top:4px">✔ 위험작업허가서(PTW) · 2일 1회 순회점검 · 합동회의</div>
            </div>
          </div>
          <button type="button" onclick="selectAppSector('INTERIOR','dash')" style="width:100%;padding:11px;border-radius:10px;border:none;background:#d97706;color:#fff;font-size:13.5px;font-weight:900;cursor:pointer">
            🏗 인테리어부 대시보드 입장 ›
          </button>
        </div>

        <!-- [3] 매장개선부 -->
        <div style="border:2px solid ${cur==='IMPROVE'?'#059669':'#e2e8f0'};background:${cur==='IMPROVE'?'#ecfdf5':'#f8fafc'};border-radius:16px;padding:16px;display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="background:#a7f3d0;color:#065f46;font-size:11px;font-weight:900;padding:3px 8px;border-radius:999px">매장지원부문</span>
              <span style="font-size:11.5px;font-weight:800;color:#059669">집기 4사 + 사인 5사</span>
            </div>
            <h3 style="margin:0 0 6px;font-size:18px;font-weight:900;color:#0f172a">
              🛠 매장개선부
            </h3>
            <p style="margin:0 0 10px;font-size:12px;color:#475569;line-height:1.5">
              상품 진열대·창고 경량랙 납품·설치·철거·재배치 및 특화사인
            </p>
            <div style="background:#fff;border:1px solid #a7f3d0;border-radius:8px;padding:8px 10px;font-size:11.5px;color:#334155;line-height:1.5;margin-bottom:10px">
              <div>• <b>집기 4사: 성현기업(91)·예우(89)·열림(86)·내일(84)</b></div>
              <div>• <b>특화사인 5사: 우리애드·미르컴·토마토 등</b></div>
              <div style="color:#dc2626;font-weight:700;margin-top:4px">⚠️ 리뉴얼 고객동선 분리 차단봉 의무화 · 33문항 조사표 완결</div>
            </div>
          </div>
          <button type="button" onclick="svcTab='improve';selectAppSector('IMPROVE','service')" style="width:100%;padding:11px;border-radius:10px;border:none;background:#059669;color:#fff;font-size:13.5px;font-weight:900;cursor:pointer">
            🛠 매장개선부 대시보드 입장 ›
          </button>
        </div>

        <!-- [4] 현장개선부(입고/재고) -->
        <div style="border:2px solid ${cur==='FIELD_IMPROVE'?'#7c3aed':'#e2e8f0'};background:${cur==='FIELD_IMPROVE'?'#f5f3ff':'#f8fafc'};border-radius:16px;padding:16px;display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="background:#ede9fe;color:#5b21b6;font-size:11px;font-weight:900;padding:3px 8px;border-radius:999px">영업지원부문 (구 CS팀)</span>
              <span style="font-size:11.5px;font-weight:800;color:#7c3aed">입고 4사 + 재고 5사</span>
            </div>
            <h3 style="margin:0 0 6px;font-size:18px;font-weight:900;color:#0f172a">
              🛒 현장개선부(입고/재고)
            </h3>
            <p style="margin:0 0 10px;font-size:12px;color:#475569;line-height:1.5">
              매장 일 2시간 집중 물류하차 보조 및 폐점 후 야간 전문 재고실사
            </p>
            <div style="background:#fff;border:1px solid #ddd6fe;border-radius:8px;padding:8px 10px;font-size:11.5px;color:#334155;line-height:1.5;margin-bottom:10px">
              <div>• <b>입고 4사: 블루키솔루션(95)·휴먼(95)·맨토스(85)·케이웍스(81)</b></div>
              <div>• <b>재고 5사: TSW(100)·RBS(95)·빅서비스(88)·아르테·유미어스</b></div>
              <div style="color:#7c3aed;font-weight:700;margin-top:4px">✔ 롤테이너 스토퍼 · 야간 단독작업 조도확보 · 30문항 실태점검</div>
            </div>
          </div>
          <button type="button" onclick="svcTab='cs';selectAppSector('FIELD_IMPROVE','service')" style="width:100%;padding:11px;border-radius:10px;border:none;background:#7c3aed;color:#fff;font-size:13.5px;font-weight:900;cursor:pointer">
            🛒 현장개선부(입고/재고) 입장 ›
          </button>
        </div>

      </div>

      <!-- 하단 전체 부서 통합 보기 버튼 -->
      <div style="display:flex;justify-content:space-between;align-items:center;background:#f1f5f9;padding:12px 18px;border-radius:12px;flex-wrap:wrap;gap:8px">
        <span style="font-size:12.5px;color:#475569;font-weight:700">💡 4개 부서(오픈지원부 · 인테리어부 · 매장개선부 · 현장개선부) 전체를 통합 확인하시겠습니까?</span>
        <button type="button" onclick="selectAppSector('ALL','dash')" style="padding:8px 18px;border-radius:8px;border:1px solid #64748b;background:#fff;color:#0f172a;font-size:13px;font-weight:800;cursor:pointer">
          🌐 4대 부서 통합 대시보드 전체 보기 ›
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(ov);
}"""

p1 = text_norm.find(modal_start_token)
p2 = text_norm.find(modal_end_token, p1)

if p1 != -1 and p2 != -1:
    end_idx = p2 + len(modal_end_token)
    text_norm = text_norm[:p1] + new_modal_func + text_norm[end_idx:]
    print("openSectorSelectModal() 함수 4대 부서 치환 성공!")
else:
    print(f"경고: modal 함수 위치를 찾지 못함 (p1={p1}, p2={p2})")

# 파일 저장
with open(path, "w", encoding="utf-8") as f:
    f.write(text_norm)

print("service.js 업데이트 완료!")

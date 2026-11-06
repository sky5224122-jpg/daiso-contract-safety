# -*- coding: utf-8 -*-
"""
index.html에 4대 부서(오픈지원부, 인테리어부, 매장개선부, 현장개선부) 및 improve.js 스크립트 로드 반영
"""
import os

path = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱\index.html"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

text_norm = text.replace("\r\n", "\n")

# 1. improve.js 스크립트 태그 추가
old_script = '<script src="service.js?v=F1.9w"></script>'
new_script = '<script src="improve.js?v=F1.9w"></script>\n<script src="service.js?v=F1.9w"></script>'
if old_script in text_norm and 'improve.js' not in text_norm:
    text_norm = text_norm.replace(old_script, new_script)
    print("improve.js 스크립트 태그 추가 성공!")

# 2. 로그인 화면의 원클릭 패널 개편
old_panel = """  <!-- 인테리어/공사/집기 & 오픈지원/입고/재고 도급안전관리 원클릭 접속 패널 -->
  <div id="testLoginBox" style="margin-top:16px;padding:14px;background:#f0f7ff;border:2px solid #3b82f6;border-radius:14px;text-align:left">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <b style="color:#1e3a8a;font-size:14px">⚡ 원클릭 즉시 접속 (업종 선택: 인테리어/공사 ↔ 오픈지원/입고/재고)</b>
      <span style="background:#dbeafe;color:#1d4ed8;font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px">실데이터 반영</span>
    </div>
    <p style="margin:0 0 10px;font-size:12px;color:#475569;line-height:1.5"><b>강동현 (sky5224122@gmail.com)</b> 담당자 로그인 시 <b>① 인테리어/공사/집기(19개사)</b> 또는 <b>② 오픈지원(5개사)/입고(4개사)/재고(5개사)</b> 업종을 선택하여 진입합니다.</p>
    <button type="button" class="button" style="width:100%;background:#1d4ed8;font-weight:800;padding:11px;margin-bottom:6px" onclick="quickTestLogin('sky5224122@gmail.com','STAFF')">👨‍💼 다이소 담당자 접속 · 강동현 (로그인 후 업종 선택 화면)</button>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px">
      <button type="button" class="button ghost" style="font-size:11.5px;padding:8px 6px;border-color:#d97706;color:#92400e;background:#fffbeb;font-weight:800" onclick="quickTestLogin('sky5224122@gmail.com','STAFF','INTERIOR')">🏗 인테리어/공사/집기 바로가기</button>
      <button type="button" class="button ghost" style="font-size:11.5px;padding:8px 6px;border-color:#2563eb;color:#1e40af;background:#eff6ff;font-weight:800" onclick="quickTestLogin('sky5224122@gmail.com','STAFF','SERVICE')">📦 오픈지원/입고/재고 바로가기</button>
    </div>
    <div style="font-size:11.5px;font-weight:700;color:#334155;margin-bottom:6px">👷 수급업체(오픈지원 5개사 · 매장CS 9개사) 화면으로 체험 접속:</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
      <button type="button" class="button ghost" style="font-size:11px;padding:6px" onclick="quickTestLogin('kworks@vendor.test','VENDOR')">케이웍스코리아 (오픈·입고 160명)</button>
      <button type="button" class="button ghost" style="font-size:11px;padding:6px" onclick="quickTestLogin('adegg@vendor.test','VENDOR')">에드에그 (오픈진열 100명·90점)</button>
      <button type="button" class="button ghost" style="font-size:11px;padding:6px" onclick="quickTestLogin('uni@vendor.test','VENDOR')">유엔아이 (수도권·충청 120명·79점)</button>
      <button type="button" class="button ghost" style="font-size:11px;padding:6px" onclick="quickTestLogin('human@vendor.test','VENDOR')">휴먼인프라 (영남 100명·95점)</button>
      <button type="button" class="button ghost" style="font-size:11px;padding:6px" onclick="quickTestLogin('mentos@vendor.test','VENDOR')">맨토스 (오픈·입고 90명·85점)</button>
      <button type="button" class="button ghost" style="font-size:11px;padding:6px" onclick="quickTestLogin('bluekey@vendor.test','VENDOR')">블루키솔루션 (입고2h·95점 신규)</button>
      <button type="button" class="button ghost" style="font-size:11px;padding:6px" onclick="quickTestLogin('tsw@vendor.test','VENDOR')">TSW파트너스 (야간재고·100점)</button>
      <button type="button" class="button ghost" style="font-size:11px;padding:6px" onclick="quickTestLogin('yumeus@vendor.test','VENDOR')">유미어스 (야간재고·70점 점검대상)</button>
    </div>
  </div>"""

new_panel = """  <!-- 4대 도급 부서(오픈지원부 · 인테리어부 · 매장개선부 · 현장개선부) 원클릭 접속 패널 -->
  <div id="testLoginBox" style="margin-top:16px;padding:16px;background:#f0fdf4;border:2px solid #16a34a;border-radius:16px;text-align:left">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <b style="color:#0f172a;font-size:14px">⚡ 4대 핵심 도급 부서 원클릭 즉시 접속</b>
      <span style="background:#dcfce7;color:#15803d;font-size:11px;font-weight:900;padding:2px 8px;border-radius:99px">2026 실데이터 반영</span>
    </div>
    <p style="margin:0 0 10px;font-size:12px;color:#334155;line-height:1.5"><b>안전보건팀 강동현 (sky5224122@gmail.com)</b> 담당자 접속 시 아래 4대 부서 중 원하는 관리 부서를 선택하여 즉시 진입합니다.</p>
    
    <!-- 4대 부서 바로가기 버튼 그리드 (2x2) -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px">
      <button type="button" class="button ghost" style="font-size:12px;padding:9px 6px;border-color:#2563eb;color:#1e40af;background:#eff6ff;font-weight:800;border-radius:8px" onclick="quickTestLogin('sky5224122@gmail.com','STAFF','OPEN')">
        📦 오픈지원부 (5개사)
      </button>
      <button type="button" class="button ghost" style="font-size:12px;padding:9px 6px;border-color:#d97706;color:#92400e;background:#fffbeb;font-weight:800;border-radius:8px" onclick="quickTestLogin('sky5224122@gmail.com','STAFF','INTERIOR')">
        🏗 인테리어부 (19개사)
      </button>
      <button type="button" class="button ghost" style="font-size:12px;padding:9px 6px;border-color:#059669;color:#065f46;background:#ecfdf5;font-weight:800;border-radius:8px" onclick="quickTestLogin('sky5224122@gmail.com','STAFF','IMPROVE')">
        🛠 매장개선부 (집기4·사인5)
      </button>
      <button type="button" class="button ghost" style="font-size:12px;padding:9px 6px;border-color:#7c3aed;color:#5b21b6;background:#f5f3ff;font-weight:800;border-radius:8px" onclick="quickTestLogin('sky5224122@gmail.com','STAFF','FIELD_IMPROVE')">
        🛒 현장개선부(입고/재고 9사)
      </button>
    </div>

    <button type="button" class="button" style="width:100%;background:#0f172a;color:#fff;font-weight:800;padding:10px;margin-bottom:10px;border-radius:8px" onclick="quickTestLogin('sky5224122@gmail.com','STAFF','ALL')">
      🌐 4대 부서 전체 통합 대시보드 입장 (선택창 열기) ›
    </button>

    <div style="font-size:11.5px;font-weight:800;color:#334155;margin-bottom:6px">👷 4대 부서 대표 협력업체 시점 체험 접속:</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px">
      <button type="button" class="button ghost" style="font-size:11px;padding:5px" onclick="quickTestLogin('kworks@vendor.test','VENDOR')">📦 케이웍스 (오픈지원 160명)</button>
      <button type="button" class="button ghost" style="font-size:11px;padding:5px" onclick="quickTestLogin('adegg@vendor.test','VENDOR')">📦 에드에그 (오픈진열 90점)</button>
      <button type="button" class="button ghost" style="font-size:11px;padding:5px" onclick="quickTestLogin('sunghyun@vendor.test','VENDOR')">🛠 성현기업 (매장개선 집기 91점)</button>
      <button type="button" class="button ghost" style="font-size:11px;padding:5px" onclick="quickTestLogin('yeowoo@vendor.test','VENDOR')">🛠 예우시스템 (매장개선 집기 89점)</button>
      <button type="button" class="button ghost" style="font-size:11px;padding:5px" onclick="quickTestLogin('bluekey@vendor.test','VENDOR')">🛒 블루키 (현장개선 입고 95점)</button>
      <button type="button" class="button ghost" style="font-size:11px;padding:5px" onclick="quickTestLogin('tsw@vendor.test','VENDOR')">🛒 TSW (현장개선 야간재고 100점)</button>
    </div>
  </div>"""

old_panel_norm = old_panel.replace("\r\n", "\n")
new_panel_norm = new_panel.replace("\r\n", "\n")

if old_panel_norm in text_norm:
    text_norm = text_norm.replace(old_panel_norm, new_panel_norm)
    print("로그인 원클릭 패널 4대 부서 치환 성공!")
else:
    print("old_panel_norm 치환 실패!")

with open(path, "w", encoding="utf-8") as f:
    f.write(text_norm)

print("index.html 업데이트 완료!")

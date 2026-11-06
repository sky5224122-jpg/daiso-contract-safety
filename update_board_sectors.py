# -*- coding: utf-8 -*-
"""
board.js의 sDash 대시보드 섹터 바를 4대 부서(오픈지원부, 인테리어부, 매장개선부, 현장개선부)로 개편
"""
import os

path = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱\board.js"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

text_norm = text.replace("\r\n", "\n")

old_sector_bar_start = "const sectorBar='<div class=\"card\""
old_sector_bar_end = "const intBanner=(typeof renderInteriorBannerHtml==='function')?renderInteriorBannerHtml():'';"

p1 = text_norm.find(old_sector_bar_start)
p2 = text_norm.find(old_sector_bar_end)

if p1 != -1 and p2 != -1:
    new_sector_logic = """const sectorLabel = sec==='OPEN' ? '📦 오픈지원부 (상품진열 5개사)'
      : sec==='INTERIOR' ? '🏗 인테리어부 (공사·사인·냉난방·유지보수 19개사)'
      : sec==='IMPROVE' ? '🛠 매장개선부 (집기 4개사 · 특화사인 5개사)'
      : sec==='FIELD_IMPROVE'||sec==='SERVICE' ? '🛒 현장개선부(입고/재고 9개사)'
      : '🌐 4대 도급 부서 전체 통합 보기';

    const sectorColor = sec==='OPEN' ? '#1d4ed8'
      : sec==='INTERIOR' ? '#b45309'
      : sec==='IMPROVE' ? '#047857'
      : sec==='FIELD_IMPROVE'||sec==='SERVICE' ? '#6d28d9'
      : '#0f172a';

    const sectorBar='<div class="card" style="padding:12px 14px;background:#f8fafc;border:1px solid #cbd5e1"><div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">'
      +'<div style="font-size:13px;font-weight:800;color:#0f172a">🎯 현재 선택된 도급 관리 부서: <span style="color:'+sectorColor+'">'+sectorLabel+'</span></div>'
      +'<div style="display:flex;gap:5px;flex-wrap:wrap">'
      +'<button type="button" class="button '+(sec==='OPEN'?'':'ghost')+'" style="padding:6px 10px;font-size:12px;'+(sec==='OPEN'?'background:#1d4ed8;border-color:#1d4ed8':'')+'" onclick="selectAppSector(\\'OPEN\\',\\'dash\\')">📦 오픈지원(5사)</button>'
      +'<button type="button" class="button '+(sec==='INTERIOR'?'':'ghost')+'" style="padding:6px 10px;font-size:12px;'+(sec==='INTERIOR'?'background:#d97706;border-color:#d97706':'')+'" onclick="selectAppSector(\\'INTERIOR\\',\\'dash\\')">🏗 인테리어(19사)</button>'
      +'<button type="button" class="button '+(sec==='IMPROVE'?'':'ghost')+'" style="padding:6px 10px;font-size:12px;'+(sec==='IMPROVE'?'background:#059669;border-color:#059669':'')+'" onclick="selectAppSector(\\'IMPROVE\\',\\'dash\\')">🛠 매장개선(9사)</button>'
      +'<button type="button" class="button '+(sec==='FIELD_IMPROVE'||sec==='SERVICE'?'':'ghost')+'" style="padding:6px 10px;font-size:12px;'+(sec==='FIELD_IMPROVE'||sec==='SERVICE'?'background:#7c3aed;border-color:#7c3aed':'')+'" onclick="selectAppSector(\\'FIELD_IMPROVE\\',\\'dash\\')">🛒 현장개선(입고/재고)</button>'
      +'<button type="button" class="button '+(sec==='ALL'?'':'ghost')+'" style="padding:6px 10px;font-size:12px" onclick="selectAppSector(\\'ALL\\',\\'dash\\')">🌐 전체(4개부서)</button>'
      +'<button type="button" class="button ghost" style="padding:6px 10px;font-size:12px;border-color:#64748b" onclick="openSectorSelectModal()">🔄 부서 선택창</button>'
      +'</div></div></div>';

    const impBanner = (typeof renderImproveTabHtml==='function') ? '<div style="margin-top:10px">' + renderImproveTabHtml() + '</div>' : '';
    const svcBanner='<div class="card" style="background:linear-gradient(135deg,#0f172a,#1e3a8a);color:#fff;border:0"><div class="row" style="justify-content:space-between;align-items:flex-start;gap:10px"><div><span style="background:#38bdf8;color:#0f172a;font-size:11px;font-weight:800;padding:2px 8px;border-radius:99px">오픈지원부(5개사) · 현장개선부(9개사)</span><h2 style="margin:6px 0 4px;color:#fff;font-size:17px">🏢 오픈지원 / 입고 / 재고 도급안전관리 보드</h2><div style="font-size:12.5px;color:#cbd5e1;line-height:1.5">오픈지원부 진열·입고 <b>5개사</b> · 현장개선부 <b>입고도우미 4개사</b>(일 2h) & <b>재고도우미 5개사</b>(야간) · 현장점검표</div></div><button class="button" type="button" style="background:#fff;color:#1e3a8a;font-weight:800;white-space:nowrap" onclick="sgo(\\'service\\')">열기 ›</button></div><div class="row" style="flex-wrap:wrap;gap:6px;margin-top:10px"><button type="button" class="button ghost" style="background:rgba(255,255,255,.12);color:#fff;border-color:rgba(255,255,255,.25);font-size:12px;padding:5px 10px" onclick="svcTab=\\'open\\';sgo(\\'service\\')">📦 오픈지원부 (5개사)</button><button type="button" class="button ghost" style="background:rgba(255,255,255,.12);color:#fff;border-color:rgba(255,255,255,.25);font-size:12px;padding:5px 10px" onclick="svcTab=\\'cs\\';sgo(\\'service\\')">🛒 현장개선부 (입고4·재고5)</button><button type="button" class="button ghost" style="background:rgba(255,255,255,.12);color:#fff;border-color:rgba(255,255,255,.25);font-size:12px;padding:5px 10px" onclick="svcTab=\\'improve\\';sgo(\\'service\\')">🛠 매장개선부 (집기·사인)</button><button type="button" class="button ghost" style="background:rgba(255,255,255,.22);color:#fde047;border-color:#fde047;font-size:12px;padding:5px 10px;font-weight:800" onclick="svcTab=\\'field\\';sgo(\\'service\\')">🔍 현장방문 실태점검</button></div></div>';
    """
    text_norm = text_norm[:p1] + new_sector_logic + text_norm[p2:]
    
    # bannerHtml 교체
    old_banner_calc = "const bannerHtml=sec==='INTERIOR'?intBanner:sec==='SERVICE'?svcBanner:(intBanner+svcBanner);"
    new_banner_calc = "const bannerHtml=sec==='INTERIOR'?intBanner:sec==='IMPROVE'?impBanner:sec==='OPEN'?svcBanner:sec==='FIELD_IMPROVE'||sec==='SERVICE'?svcBanner:(intBanner+impBanner+svcBanner);"
    text_norm = text_norm.replace(old_banner_calc, new_banner_calc)

    with open(path, "w", encoding="utf-8") as f:
        f.write(text_norm)
    print("board.js 4대 부서 개편 성공!")
else:
    print(f"위치 탐색 실패: p1={p1}, p2={p2}")

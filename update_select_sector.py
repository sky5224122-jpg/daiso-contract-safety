# -*- coding: utf-8 -*-
import os

path = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱\service.js"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

text_norm = text.replace("\r\n", "\n")

old_code = """function updateSectorTopBtn() {
  const btn = document.getElementById('sectorTopBtn');
  if (!btn) return;
  const sec = window.APP_SECTOR || 'ALL';
  if (sec === 'INTERIOR') {
    btn.innerHTML = '🏗 업종: 인테리어/공사/집기 ▾';
    btn.style.background = '#fef3c7';
    btn.style.color = '#92400e';
    btn.style.borderColor = '#f59e0b';
  } else if (sec === 'SERVICE') {
    btn.innerHTML = '📦 업종: 오픈지원/입고/재고 ▾';
    btn.style.background = '#dbeafe';
    btn.style.color = '#1e40af';
    btn.style.borderColor = '#3b82f6';
  } else {
    btn.innerHTML = '🌐 업종: 전체 통합 ▾';
    btn.style.background = '#f1f5f9';
    btn.style.color = '#334155';
    btn.style.borderColor = '#cbd5e1';
  }
}

function selectAppSector(sec, targetMenu) {
  window.APP_SECTOR = sec;
  try { sessionStorage.setItem('daiso_app_sector', sec); } catch (e) {}
  const dlg = document.getElementById('sectorSelectDlg');
  if (dlg) dlg.remove();
  updateSectorTopBtn();

  if (targetMenu === 'service' || (sec === 'SERVICE' && targetMenu === 'board')) {
    if (typeof sgo === 'function') sgo('service');
    return;
  }
  if (typeof sgo === 'function') {
    sgo(targetMenu || 'dash');
    if (typeof renderJobs === 'function' && typeof jobData !== 'undefined' && jobData) renderJobs();
    if (typeof renderVendors === 'function' && typeof svData !== 'undefined' && svData && tab === 'vendors') renderVendors();
  }
  const label = sec === 'INTERIOR' ? '🏗 인테리어 / 공사 / 집기' : sec === 'SERVICE' ? '📦 오픈지원 / 입고 / 재고' : '🌐 전체 통합';
  if (typeof msg === 'function') msg(label + ' 관리 모드로 전환되었습니다.');
}"""

new_code = """function updateSectorTopBtn() {
  const btn = document.getElementById('sectorTopBtn');
  if (!btn) return;
  const sec = window.APP_SECTOR || 'ALL';
  if (sec === 'OPEN') {
    btn.innerHTML = '📦 부서: 오픈지원부 ▾';
    btn.style.background = '#dbeafe';
    btn.style.color = '#1e40af';
    btn.style.borderColor = '#3b82f6';
  } else if (sec === 'INTERIOR') {
    btn.innerHTML = '🏗 부서: 인테리어부 ▾';
    btn.style.background = '#fef3c7';
    btn.style.color = '#92400e';
    btn.style.borderColor = '#f59e0b';
  } else if (sec === 'IMPROVE') {
    btn.innerHTML = '🛠 부서: 매장개선부 ▾';
    btn.style.background = '#ecfdf5';
    btn.style.color = '#065f46';
    btn.style.borderColor = '#10b981';
  } else if (sec === 'FIELD_IMPROVE' || sec === 'SERVICE') {
    btn.innerHTML = '🛒 부서: 현장개선부(입고/재고) ▾';
    btn.style.background = '#f5f3ff';
    btn.style.color = '#5b21b6';
    btn.style.borderColor = '#8b5cf6';
  } else {
    btn.innerHTML = '🌐 4대 부서: 전체 통합 ▾';
    btn.style.background = '#f1f5f9';
    btn.style.color = '#334155';
    btn.style.borderColor = '#cbd5e1';
  }
}

function selectAppSector(sec, targetMenu) {
  window.APP_SECTOR = sec;
  try { sessionStorage.setItem('daiso_app_sector', sec); } catch (e) {}
  const dlg = document.getElementById('sectorSelectDlg');
  if (dlg) dlg.remove();
  updateSectorTopBtn();

  if (targetMenu === 'service' || sec === 'OPEN' || sec === 'IMPROVE' || sec === 'FIELD_IMPROVE' || sec === 'SERVICE') {
    if (sec === 'OPEN') svcTab = 'open';
    else if (sec === 'IMPROVE') svcTab = 'improve';
    else if (sec === 'FIELD_IMPROVE' || sec === 'SERVICE') svcTab = 'cs';
    else if (sec === 'INTERIOR') svcTab = 'interior';
    if (typeof sgo === 'function') sgo('service');
    return;
  }
  if (typeof sgo === 'function') {
    sgo(targetMenu || 'dash');
    if (typeof renderJobs === 'function' && typeof jobData !== 'undefined' && jobData) renderJobs();
    if (typeof renderVendors === 'function' && typeof svData !== 'undefined' && svData && tab === 'vendors') renderVendors();
  }
  const label = sec === 'OPEN' ? '📦 오픈지원부 (5개사)'
    : sec === 'INTERIOR' ? '🏗 인테리어부 (19개사)'
    : sec === 'IMPROVE' ? '🛠 매장개선부 (집기4·사인5)'
    : sec === 'FIELD_IMPROVE' || sec === 'SERVICE' ? '🛒 현장개선부(입고/재고 9개사)'
    : '🌐 4대 도급 부서 전체';
  if (typeof msg === 'function') msg(label + ' 관리 모드로 전환되었습니다.');
}"""

old_code_norm = old_code.replace("\r\n", "\n")
new_code_norm = new_code.replace("\r\n", "\n")

if old_code_norm in text_norm:
    text_norm = text_norm.replace(old_code_norm, new_code_norm)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text_norm)
    print("selectAppSector 4대 부서 전환 성공!")
else:
    print("old_code_norm 일치 실패!")

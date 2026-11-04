/**
 * 아성다이소 도급안전관리 (인테리어/공사/집기 19개사 · 오픈지원부 5개사 · 매장CS팀 9개사)
 * 현장방문 실태점검(30문항) 및 적격업체 클라우드 동기화 Google Apps Script (Code.gs)
 * 담당자: 안전보건팀 강동현 (sky5224122@gmail.com)
 */

const PROP_SHEET_ID = 'DAISO_CONTRACT_SAFETY_SHEET_ID';

function getOrCreateSheet_() {
  const props = PropertiesService.getScriptProperties();
  let ssId = props.getProperty(PROP_SHEET_ID);
  let ss = null;
  if (ssId) {
    try { ss = SpreadsheetApp.openById(ssId); } catch (e) { ss = null; }
  }
  if (!ss) {
    ss = SpreadsheetApp.create('아성다이소_도급안전관리_오픈지원5사_매장CS9사_인테리어19사_실태점검DB');
    props.setProperty(PROP_SHEET_ID, ss.getId());
    initSheets_(ss);
  }
  return ss;
}

function initSheets_(ss) {
  let sh1 = ss.getSheets()[0];
  sh1.setName('1_현장방문실태점검_기록');
  sh1.appendRow(['저장일시', '점검현장(매장명)', '점검일자', '점검자', '대상부서', '대상업체', '응답JSON(30문항)', '인터뷰JSON(8문항)', '특이사항JSON']);

  let sh2 = ss.insertSheet('2_오픈지원5사_매장CS9사_적격평가');
  sh2.appendRow(['업종구분', '소속부서', '세부업종', '업체명', '평가점수', '등급', '평가일', '권역/작업시간', '비고/취약점']);
  const rows = [
    ['SERVICE', '오픈지원부', '입고·진열용역', '케이웍스코리아', 80, 'A', '2026-06-29', '전국(160명)', '비상훈련 미실시(C) 보완'],
    ['SERVICE', '오픈지원부', '진열용역', '에드에그', 90, 'S', '2026-06-29', '전국(100명)', '전반 우수'],
    ['SERVICE', '오픈지원부', '진열용역', '유엔아이', 79, 'B', '2026-06-29', '수도권/충청/중호(120명)', '보호구대장(B)·비상훈련(C) 보완'],
    ['SERVICE', '오픈지원부', '입고·진열용역', '휴먼인프라', 95, 'S', '2026-06-29', '영남(100명)', '우수'],
    ['SERVICE', '오픈지원부', '진열·입고용역', '맨토스', 85, 'A', '2026-06-29', '수도권/전국(90명)', '비상훈련 미실시(C) 보완'],
    ['SERVICE', '매장CS팀', '입고도우미(2h)', '블루키솔루션', 95, 'S', '2026-06-29', '일 2시간 집중 입고', '25년 엠앤제이(69점 미달) 대체 신규'],
    ['SERVICE', '매장CS팀', '입고도우미(2h)', '휴먼인프라', 95, 'S', '2026-06-29', '일 2시간 집중 입고', '25년 93점 → 26년 95점'],
    ['SERVICE', '매장CS팀', '입고도우미(2h)', '맨토스', 85, 'A', '2026-06-29', '일 2시간 집중 입고', '25년 90점 → 26년 85점'],
    ['SERVICE', '매장CS팀', '입고도우미(2h)', '케이웍스코리아', 81, 'A', '2026-06-29', '일 2시간 집중 입고', '25년 81점 → 26년 81점'],
    ['SERVICE', '매장CS팀', '재고도우미(야간)', 'TSW파트너스', 100, 'S', '2026-06-29', '폐점(22시) 후 야간', '전 항목 만점(100점)'],
    ['SERVICE', '매장CS팀', '재고도우미(야간)', 'RBS코리아', 95, 'S', '2026-06-29', '폐점(22시) 후 야간', '우수'],
    ['SERVICE', '매장CS팀', '재고도우미(야간)', '빅서비스', 88, 'A', '2026-06-29', '폐점(22시) 후 야간', '비상대피 훈련 보완'],
    ['SERVICE', '매장CS팀', '재고도우미(야간)', '아르테코리아', 79, 'B', '2026-06-29', '폐점(22시) 후 야간', '보호구·위험성평가·비상훈련 집중점검'],
    ['SERVICE', '매장CS팀', '재고도우미(야간)', '유미어스', 70, 'B', '2026-06-29', '폐점(22시) 후 야간', '적격 커트라인(70점) 최우선 현장시정 대상']
  ];
  rows.forEach(r => sh2.appendRow(r));
}

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || '';
  if (action === 'json' || action === 'api') {
    const out = {
      ok: true,
      service: '아성다이소 도급안전관리 통합 백엔드 (오픈지원 5개사 · 매장CS 9개사 · 인테리어 19개사)',
      owner: '안전보건팀 강동현 (sky5224122@gmail.com)',
      action: action,
      timestamp: new Date().toISOString()
    };
    return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
  }

  // 일반 브라우저 접속 시 번들링된 웹앱 화면 직접 서비스 (모바일 & PC 완벽 반응형)
  return HtmlService.createHtmlOutputFromFile('app')
    .setTitle('아성다이소 도급 안전관리 시스템 (오픈지원부 5개사 · 매장CS팀 9개사 · 인테리어 19개사)')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    const body = JSON.parse(raw);
    const action = body.action || body.op || 'saveFieldInspection';

    if (action === 'saveFieldInspection') {
      const ss = getOrCreateSheet_();
      const sh = ss.getSheetByName('1_현장방문실태점검_기록') || ss.getSheets()[0];
      const m = body.meta || {};
      sh.appendRow([
        body.savedAt || new Date().toISOString(),
        m.siteName || '',
        m.inspDate || '',
        m.inspector || '강동현',
        m.targetDept || '',
        m.targetVendor || '',
        JSON.stringify(body.answers || {}),
        JSON.stringify(body.interviews || {}),
        JSON.stringify(body.notes || {})
      ]);
      return ContentService.createTextOutput(JSON.stringify({ ok: true, sheetUrl: ss.getUrl() }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true, received: action }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

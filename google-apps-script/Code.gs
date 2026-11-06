/**
 * 아성다이소 도급안전관리 (오픈지원부 5개사 · 매장CS팀 9개사 · 인테리어 19개사)
 * Google Apps Script 백엔드 통합 엔진 (Code.gs)
 * - 모바일 스마트점검(사진·음성·카드) 구글 스프레드시트 자동 누적 저장
 * - 30문항 현장실태점검 및 적격업체 평가 실시간 동기화
 * - 모바일/PC 웹앱 직접 호스팅 (doGet)
 * 담당자: 안전보건팀 강동현 (sky5224122@gmail.com)
 */

const PROP_SHEET_ID = 'DAISO_CONTRACT_SAFETY_SHEET_ID';

/**
 * 전용 구글 스프레드시트 가져오기 (없으면 자동 생성)
 */
function getOrCreateSheet_() {
  const props = PropertiesService.getScriptProperties();
  let ssId = props.getProperty(PROP_SHEET_ID);
  let ss = null;
  if (ssId) {
    try { ss = SpreadsheetApp.openById(ssId); } catch (e) { ss = null; }
  }
  if (!ss) {
    ss = SpreadsheetApp.create('아성다이소_도급안전관리_현장점검_실시간DB(구글시트)');
    props.setProperty(PROP_SHEET_ID, ss.getId());
    initSheets_(ss);
  }
  // 3번째 모바일 점검 시트가 없으면 추가
  if (!ss.getSheetByName('3_모바일_스마트점검_결과(카드DB)')) {
    initMobileSheet_(ss);
  }
  return ss;
}

function initSheets_(ss) {
  let sh1 = ss.getSheets()[0];
  sh1.setName('1_현장방문실태점검_기록');
  sh1.appendRow(['저장일시', '점검현장(매장명)', '점검일자', '점검자', '대상부서', '대상업체', '응답JSON(30문항)', '인터뷰JSON(8문항)', '특이사항JSON']);
  sh1.getRange(1, 1, 1, 9).setBackground('#1e3a8a').setFontColor('#ffffff').setFontWeight('bold');

  let sh2 = ss.insertSheet('2_오픈지원5사_매장CS9사_적격평가');
  sh2.appendRow(['업종구분', '소속부서', '세부업종', '업체명', '평가점수', '등급', '평가일', '권역/작업시간', '비고/취약점']);
  sh2.getRange(1, 1, 1, 9).setBackground('#2563eb').setFontColor('#ffffff').setFontWeight('bold');
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

  initMobileSheet_(ss);
}

function initMobileSheet_(ss) {
  let sh3 = ss.getSheetByName('3_모바일_스마트점검_결과(카드DB)');
  if (!sh3) {
    sh3 = ss.insertSheet('3_모바일_스마트점검_결과(카드DB)');
  }
  if (sh3.getLastRow() === 0) {
    sh3.appendRow([
      '저장일시', '점검매장명', '점검일자', '업무구분', '수급업체명',
      '판정등급', '지휘계통(불법파견차단)', '공간분리(혼재작업차단)', '안전도구·보호구',
      '현장지적 및 즉시시정조치(Action Item)', '음성녹취 원문요약', '사진장수', '점검자', '전달요약문'
    ]);
    sh3.getRange(1, 1, 1, 14).setBackground('#15803d').setFontColor('#ffffff').setFontWeight('bold');
    sh3.setFrozenRows(1);
  }
}

/**
 * 웹앱 GET 요청 처리
 */
function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || '';

  // 구글 시트 URL 요청
  if (action === 'getSheetUrl') {
    const ss = getOrCreateSheet_();
    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      sheetUrl: ss.getUrl(),
      sheetId: ss.getId(),
      sheetName: ss.getName()
    })).setMimeType(ContentService.MimeType.JSON);
  }

  // 모바일 점검 내역 목록 조회 (JSON)
  if (action === 'getMobileList') {
    const ss = getOrCreateSheet_();
    const sh3 = ss.getSheetByName('3_모바일_스마트점검_결과(카드DB)');
    if (!sh3 || sh3.getLastRow() <= 1) {
      return ContentService.createTextOutput(JSON.stringify({ ok: true, list: [] })).setMimeType(ContentService.MimeType.JSON);
    }
    const data = sh3.getRange(2, 1, sh3.getLastRow() - 1, 14).getValues();
    const list = data.map((r, i) => ({
      no: i + 1,
      savedAt: r[0],
      store: r[1],
      date: r[2],
      scope: r[3],
      vendor: r[4],
      grade: r[5],
      command: r[6],
      space: r[7],
      tools: r[8],
      actions: r[9],
      voice: r[10],
      photosCount: r[11],
      inspector: r[12]
    })).reverse(); // 최신순

    return ContentService.createTextOutput(JSON.stringify({ ok: true, list: list, sheetUrl: ss.getUrl() }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // 브라우저 접속 시 번들링된 모바일/PC 웹앱 화면 제공
  return HtmlService.createHtmlOutputFromFile('app')
    .setTitle('아성다이소 도급 안전관리 시스템 (스마트 현장점검)')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 웹앱 POST 요청 처리 (스마트폰에서 점검 결과 수신 시)
 */
function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    const body = JSON.parse(raw);
    const action = body.action || body.op || 'saveMobileInspection';

    const ss = getOrCreateSheet_();

    // 1. 모바일 스마트 점검 결과 자동 누적 저장
    if (action === 'saveMobileInspection') {
      const sh3 = ss.getSheetByName('3_모바일_스마트점검_결과(카드DB)') || ss.getSheets()[0];
      const a = body.analysis || {};
      const actionsText = (a.actionItems || []).map(x => '• ' + String(x).replace(/<[^>]*>/g, '')).join('\n');
      const nowStr = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');

      sh3.appendRow([
        nowStr,
        body.store || '',
        body.date || '',
        body.scope || '',
        body.vendor || '',
        (a.grade || 'S') + ' (' + (a.gradeLabel || '우수') + ')',
        a.commandOk ? '정상(팀장지휘)' : '불법파견위험(직접지시)',
        a.spaceOk ? '양호(분리운영)' : '혼재주의',
        a.ppeOk ? '적합' : '개선필요',
        actionsText,
        body.rawVoice || '',
        body.photosCount || 0,
        body.inspector || '강동현',
        body.shareSnippet || ''
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        ok: true,
        message: '구글 스프레드시트에 점검 카드가 성공적으로 자동 누적되었습니다.',
        sheetUrl: ss.getUrl(),
        timestamp: nowStr
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. 기존 정밀 30문항 실태점검 저장
    if (action === 'saveFieldInspection') {
      const sh1 = ss.getSheetByName('1_현장방문실태점검_기록') || ss.getSheets()[0];
      const m = body.meta || {};
      const nowStr = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
      sh1.appendRow([
        nowStr,
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

    return ContentService.createTextOutput(JSON.stringify({ ok: true, received: action, sheetUrl: ss.getUrl() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

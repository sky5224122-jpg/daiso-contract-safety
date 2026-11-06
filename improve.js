/**
 * improve.js — 매장개선부 도급안전관리 전용 모듈
 * 대상: 매장지원부문 매장개선부 (집기 4개사 + 사인 5개사)
 * 담당: 안전보건팀 강동현 (sky5224122@gmail.com)
 * 내용:
 *   1. 집기 4개사(성현기업, 예우시스템, 열림, 내일퍼렉스) + 사인 5개사 현황 및 계약 구조
 *   2. 매장개선부 도급업무 운영현황 33문항 질문지 전수 답변
 *   3. 기존 자료 요청 목록 15문항 및 현장 관리 실태
 *   4. 리뉴얼 매장 고객·근로자 동선 분리 등 고위험 현장 안전점검 체크리스트
 */

const IMPROVE_STORAGE_KEY = 'daiso_store_improve_safety_data_v1';

const DEFAULT_IMPROVE_DATA = {
  deptName: '매장지원부문 매장개선부',
  owner: '안전보건팀 강동현 (sky5224122@gmail.com)',
  summary: {
    workScope: '집기 설치 외 납품·교체·철거·재배치·보수 및 특화코너 사인 발주',
    targets: '매장 내 상품 진열대, 창고 경량랙, 집기, BI 외 특화코너 사인물 일부',
    storeTypes: '신규 오픈 · 리뉴얼 · 영업 중 매장 · 폐점 (전 유형)',
    flow: '도면 설계(당사) → 의뢰 및 견적 요청(당사) → 발주/작업지시(당사) → 실행(협력업체) → 완료 확인(당사)',
    duration: '신규오픈: 평당 하루(7~8h) / 부분리뉴얼: 1일 약 4h / 전략카테고리 리뉴얼: 2~4일',
    inspectors: '각 담당자 현장 확인 후 영업부 인계'
  },
  // 1. 매장개선부 계약 협력업체 현황 (집기 4사 + 사인 5사 = 총 9개사)
  vendors: [
    {
      id: 'imp_sh',
      category: '집기',
      name: '성현기업',
      scope: '매장 진열대 및 창고 경량랙 제작·납품·설치·철거·재배치',
      region: '전국',
      contractType: '건별 계약 (비용 입찰 기준)',
      score: 91,
      grade: 'S',
      evalDate: '2026-06-29',
      equipments: '사다리, 작업대, 전동드릴, 운반카트, 중량집기',
      riskHigh: '리뉴얼 영업 중 작업 시 고객 동선 미분리, 중량랙 전도, 커터칼 베임',
      actionPlan: '이동식 차단봉·안전테이프 설치 의무화, 2인 1조 상하차'
    },
    {
      id: 'imp_yw',
      category: '집기',
      name: '예우시스템',
      scope: '상품 진열대(곤돌라) 및 벽면 선반 설치·보수·철거',
      region: '수도권/중부',
      contractType: '건별 계약 (기준 단가 물량산정)',
      score: 89,
      grade: 'A',
      evalDate: '2026-06-29',
      equipments: 'A형 사다리, 직소, 그라인더, 핸드카트',
      riskHigh: '금속제 집기 절단 작업 시 불꽃 비산, 벽면 앵커 천공 분진',
      actionPlan: '불꽃비산방지포 비치, 보안경·방진마스크 착용 확인'
    },
    {
      id: 'imp_yl',
      category: '집기',
      name: '열림',
      scope: '매장 내 특화 집기 설치 및 조명 집기 배선 연결',
      region: '수도권/영남',
      contractType: '건별 계약 (비용 입찰 기준)',
      score: 86,
      grade: 'A',
      evalDate: '2026-06-29',
      equipments: '사다리, 전동공구, 절연공구, 멀티테스터기',
      riskHigh: '조명 집기 전선 연결 중 감전, 사다리 상단 작업 중 추락',
      actionPlan: '분전함 전원 차단(LOTO) 확인 후 작업, A형 사다리 최상단 작업 금지'
    },
    {
      id: 'imp_np',
      category: '집기',
      name: '내일퍼렉스',
      scope: '매장 리뉴얼 집기 재배치, 철거 및 보수',
      region: '전국',
      contractType: '건별 계약 (물량 산정)',
      score: 84,
      grade: 'A',
      evalDate: '2026-06-29',
      equipments: '작업대, 전동드릴, 대차, 커터칼',
      riskHigh: '타 공정(인테리어/청소)과의 혼재작업 충돌, 고객 이동 중 부딪힘',
      actionPlan: '작업 구역 100% 차단 펜스 설치, 작업시간대 야간 또는 개점 전 분리'
    },
    {
      id: 'imp_sign_woori',
      category: '사인(특화코너)',
      name: '우리애드',
      scope: 'BI 외 특화코너 사인물 발주 및 설치 (인테리어부 동일)',
      region: '수도권',
      contractType: '건별 계약',
      score: 86,
      grade: 'A',
      evalDate: '2026-06-29',
      equipments: '고소작업대, 사다리, 전기드릴',
      riskHigh: '사인물 고소 설치 시 추락, 배선 연결 감전',
      actionPlan: '안전모·안전대 착용, 2인 1조 작업'
    },
    {
      id: 'imp_sign_mir',
      category: '사인(특화코너)',
      name: '미르컴',
      scope: '특화코너 사인 및 조명 간판 설치 (인테리어부 동일)',
      region: '중부/호남',
      contractType: '건별 계약',
      score: 86,
      grade: 'A',
      evalDate: '2026-06-29',
      equipments: '사다리, 전동드라이버, 전기 테스터',
      riskHigh: '고소 작업 추락, 매장 천장 타공 시 파편 낙하',
      actionPlan: '하부 출입통제 구획 설정, 낙하물 방지망'
    },
    {
      id: 'imp_sign_tomato',
      category: '사인(특화코너)',
      name: '토마토세븐',
      scope: '특화코너 사인물 시공 및 교체 (인테리어부 동일)',
      region: '영남',
      contractType: '건별 계약',
      score: 88,
      grade: 'A',
      evalDate: '2026-06-29',
      equipments: '작업대, 사다리, 실리콘건',
      riskHigh: '사다리 전도, 접착제/실리콘 유기용제 냄새',
      actionPlan: '매장 환기 설비 가동, 작업자 안전장구'
    },
    {
      id: 'imp_sign_inno',
      category: '사인(특화코너)',
      name: '이노디자인',
      scope: '매장 내 특화코너 사인 디자인 및 설치 (인테리어부 동일)',
      region: '수도권',
      contractType: '건별 계약',
      score: 82,
      grade: 'A',
      evalDate: '2026-06-29',
      equipments: '전동드릴, 이동식 사다리',
      riskHigh: '매장 영업 중 사다리 흔들림, 볼트 낙하',
      actionPlan: '사다리 하부 지지자 배치, 공구 낙하방지끈 착용'
    },
    {
      id: 'imp_sign_stad',
      category: '사인(특화코너)',
      name: '에스티애드컴',
      scope: '특화코너 사인 및 그래픽 시공 (인테리어부 동일)',
      region: '전국',
      contractType: '건별 계약',
      score: 85,
      grade: 'A',
      evalDate: '2026-06-29',
      equipments: '사다리, 헤라, 열풍기',
      riskHigh: '열풍기 취급 중 화상, 사다리 작업 불안정',
      actionPlan: '열풍기 사용 안전수칙 준수, 내열장갑 착용'
    }
  ],

  // 2. 매장개선부 도급업무 운영현황 33문항 설문 전수 답변
  survey33: [
    { no: 1, cat: '업무범위', q: '매장개선부에서 실제 수행하거나 발주하는 업무는 무엇인가요?', ref: '집기 설치 외 납품·교체·철거·재배치·보수 등의 수행 여부와 업무별 범위', ans: '집기 설치 외 납품·교체·철거·재배치·보수 / 특화코너 사인 발주', hasDoc: '있음', docName: '도면', priority: '우선' },
    { no: 2, cat: '업무범위', q: '설치·관리하는 집기 또는 시설의 종류는 무엇인가요?', ref: '진열대·매대·선반·창고 집기·사인물 등 실제 대상 명칭', ans: '매장 내 상품 진열대, 창고 경량랙, 집기, BI 외 특화코너 사인물 일부', hasDoc: '있음', docName: '도면', priority: '우선' },
    { no: 3, cat: '업무범위', q: '집기 제작·구매·운반·설치·철거 중 어느 과정을 담당하나요?', ref: '각 단계 수행주체(당사·제조사·협력업체) 구분', ans: '제작: 제조사 / 구매·운반·설치·철거: 협력업체', hasDoc: '해당없음', docName: '-', priority: '우선' },
    { no: 4, cat: '업무범위', q: '업무 대상 매장은 어떤 유형인가요?', ref: '신규 오픈·리뉴얼·영업 중 매장·폐점 등 해당 여부', ans: '신규 오픈 · 리뉴얼 · 영업 중 매장 · 폐점 (전 유형 대상)', hasDoc: '해당없음', docName: '-', priority: '우선' },
    { no: 5, cat: '업무범위', q: '작업 의뢰부터 최종 확인·인계까지 업무 흐름은 어떻게 되나요?', ref: '의뢰·견적·계약·작업지시·완료확인 담당부서 및 절차', ans: '도면 설계(당사) → 의뢰 및 견적 요청(당사) → 발주/작업지시(당사) → 실행(협력업체) → 완료 확인(당사)', hasDoc: '해당없음', docName: '-', priority: '우선' },
    { no: 6, cat: '업무범위', q: '매장 1개소 작업은 통상 며칠, 하루 몇 시간 진행되나요?', ref: '짧은/일반/긴 작업의 실제 기간, 야간·휴일작업 여부', ans: '신규 오픈: 집기 설치 일 평당 하루씩 산출, 7~8시간 근무 / 리뉴얼: 범위에 따라 상이 (부분리뉴얼 1일 약 4시간 / 전략카테고리 2~4일)', hasDoc: '해당없음', docName: '-', priority: '우선' },
    { no: 7, cat: '업무범위', q: '작업 완료 결과는 누가 확인하고 어느 부서에 인계하나요?', ref: '검수·완료보고·사진·매장 인계 여부', ans: '각 담당자가 현장 확인 후 영업부 인계', hasDoc: '있음', docName: '완료 검수 사진/보고', priority: '보완' },
    { no: 8, cat: '업체·계약', q: '현재 외부 업체는 몇 곳이며 각 업체가 어떤 업무를 수행하나요?', ref: '업체명·역할·담당지역·별도 현장업체 포함 여부', ans: '[집기 4개사] 성현기업, 예우시스템, 열림, 내일퍼렉스 / [사인 5개사 - 인테리어부 동일] 우리애드, 미르컴, 토마토세븐, 이노디자인, 에스티애드컴', hasDoc: '있음', docName: '매장별 계약서', priority: '우선' },
    { no: 9, cat: '업체·계약', q: '외부 업체와 어떤 형태로 계약하나요?', ref: '연간/건별 계약, 물품 납품+설치/설치용역/공사 등 실제 계약명과 구조', ans: '신규 오픈: 건별 계약 (그 외 정기계약 미진행)', hasDoc: '있음', docName: '계약서', priority: '우선' },
    { no: 10, cat: '업체·계약', q: '업체별 계약기간·갱신주기·관리 담당자는 어떻게 되나요?', ref: '계약 시작·종료, 갱신일, 담당부서·담당자', ans: '건별 발주 진행에 따라 별도 연간 갱신주기 미설정 (매장개선부 관리)', hasDoc: '해당없음', docName: '-', priority: '우선' },
    { no: 11, cat: '업체·계약', q: '계약서에 규정된 업무범위 및 현장 안전 관련 조항이 있나요?', ref: '작업 범위·안전관리 책임·사고보고·재하도급 관련 내용', ans: '제12조 안전관리 및 재해보상 / 제13조 응급조치 조항 명시', hasDoc: '있음', docName: '계약서', priority: '우선' },
    { no: 12, cat: '업체·계약', q: '업체는 어떤 기준으로 선정·평가하나요?', ref: '선정·갱신 절차, 안전보건 관련 평가항목과 자료 유무', ans: '비용 입찰 기준 선정 (최저가 및 실행능력 검토)', hasDoc: '있음', docName: '입찰 자료', priority: '우선' },
    { no: 13, cat: '업체·계약', q: '계약업체 외 재하도급·설치기사·별도 인력이 투입되는 경우가 있나요?', ref: '실제 출입업체 및 지휘·관리 주체, 승인 절차', ans: '계약업체 직영 또는 지정 설치기사 투입 원칙 (재하도급 별도 승인 절차 미운영)', hasDoc: '해당없음', docName: '-', priority: '우선' },
    { no: 14, cat: '업체·계약', q: '공사·설치 관련 금액은 어떤 방식으로 산정·관리하나요?', ref: '건별/연간 금액 관리 여부만 우선, 실제 금액은 보유 시 제출', ans: '비용 입찰 기준 선정, 기준 단가에 따른 물량 산정에 의한 금액 정산', hasDoc: '있음', docName: '견적서 및 정산서', priority: '보완' },
    { no: 15, cat: '현장운영', q: '매장별 작업 일정과 실적을 어떻게 관리하나요?', ref: '매장코드·매장명·작업 시작/종료일·작업업체·일정변경 기록', ans: '당사 매장개선부 담당자별 수기 관리', hasDoc: '있음', docName: '팀 내부 실행목록표', priority: '우선' },
    { no: 16, cat: '현장운영', q: '매장별 투입업체와 인원은 어떻게 결정·기록하나요?', ref: '업체별 인원, 당사 인원, 현장책임자 기록 여부', ans: '매장별 투입업체는 입찰에 의해 선정하여 기준 단가 합의된 물량에 의해 산정', hasDoc: '있음', docName: '견적서 및 정산서', priority: '우선' },
    { no: 17, cat: '현장운영', q: '현장 작업을 누가 직접 지시·감독하나요?', ref: '당사 직원/업체 현장책임자 중 실질적 지시·작업변경·인원관리 주체', ans: '낙찰업체 현장 책임자가 직접 지시·감독 (불법파견 리스크 차단)', hasDoc: '해당없음', docName: '-', priority: '우선' },
    { no: 18, cat: '현장운영', q: '현장별 당사 담당자와 협력업체 책임자가 지정되나요?', ref: '현장 연락·승인·안전조치·비상상황 책임자', ans: '현장연락: 현장 책임자 / 승인·안전조치·비상상황 책임자: 업체 대표 및 관리자', hasDoc: '해당없음', docName: '-', priority: '우선' },
    { no: 19, cat: '현장운영', q: '영업 중 매장에서도 작업하나요?', ref: '고객·근로자 동선 분리, 영업시간 중/후 작업 여부', ans: '⚠️ 리뉴얼 매장: 고객·근로자 동선 미분리, 영업시간 중 작업 진행 (🔴 즉시 안전대책 수립 필요!)', hasDoc: '해당없음', docName: '-', priority: '우선' },
    { no: 20, cat: '현장운영', q: '다른 업체와 같은 공간에서 동시에 작업하는 경우가 있나요?(혼재작업)', ref: '인테리어·전기·청소·오픈지원·물류 등 실제 사례 및 일정 조정 방식', ans: '신규매장은 업체별 공정별 분리 운영, ⚠️ 리뉴얼 매장은 동시 작업 진행 (혼재작업 발생)', hasDoc: '해당없음', docName: '-', priority: '우선' },
    { no: 21, cat: '현장운영', q: '주로 사용하는 장비와 자재는 무엇이며 누가 제공하나요?', ref: '사다리·작업대·전동공구·운반카트·중량 집기·앵커 등 해당 여부', ans: '사다리, 작업대, 전동공구(드릴, 직소, 그라인더 등), 운반카트, 중량집기 (협력업체 지참)', hasDoc: '해당없음', docName: '-', priority: '우선' },
    { no: 22, cat: '현장운영', q: '고소·천공·전기·화기·철거 등 위험작업이 발생하나요?', ref: '실제 수행 여부, 빈도, 작업자·장비, 필요 시 기존 작업허가 방식', ans: '⚡ 조명 집기 및 조명 간판 전기 작업 (전선 연결 등) / 🔥 금속제 절단 작업 (직소·그라인더)', hasDoc: '해당없음', docName: '-', priority: '우선' },
    { no: 23, cat: '현장운영', q: '작업 중 출입통제·안전표지·통로 확보 등은 어떻게 관리하나요?', ref: '고객 및 매장 근로자 보호 방법, 조치 확인 담당', ans: '⚠️ 리뉴얼 매장 안전 표지 및 출입 통제 준비 중 (현재는 없음 - 안전보건팀 차단봉 지원 요청)', hasDoc: '해당없음', docName: '-', priority: '보완' },
    { no: 24, cat: '현장운영', q: '작업 완료 후 검수와 시정조치는 어떻게 처리하나요?', ref: '미완료·재시공·하자·사진 기록과 완료 확인 방식', ans: '당사 매장개선부 담당자 현장 확인 후 완료 처리', hasDoc: '해당없음', docName: '-', priority: '보완' },
    { no: 25, cat: '안전관리', q: '작업 전 위험요인 확인 및 위험성평가를 하고 있나요?', ref: '담당 주체, 실시 대상·시기, 업체 작성자료 보유 여부', ans: '네, 실시 중', hasDoc: '해당없음', docName: '안전관리 서류', priority: '우선' },
    { no: 26, cat: '안전관리', q: '작업 전 안전수칙 전달·TBM 등 사전 협의를 실시하나요?', ref: '참여자, 진행주체, 작업내용과 위험정보 공유 방식', ans: '작업 전 협력업체 책임자 중심 안전수칙 전달 실시', hasDoc: '있음', docName: '안전관리 서류 (TBM 기록)', priority: '보완' },
    { no: 27, cat: '안전관리', q: '협력업체 근로자의 안전보건교육 실시 여부를 확인하나요?', ref: '업체 자체교육 자료 및 당사 지원·확인 방식', ans: '업체 자체교육 실시 확인', hasDoc: '있음', docName: '안전관리 서류 (교육일지)', priority: '보완' },
    { no: 28, cat: '안전관리', q: '현장 순회점검 또는 안전점검은 현재 어떻게 하고 있나요?', ref: '점검주체, 점검주기, 기록 및 시정조치 방식', ans: '기준대로 진행 (안전관리 서류 제출 및 현장 확인)', hasDoc: '해당없음', docName: '-', priority: '우선' },
    { no: 29, cat: '안전관리', q: '협력업체와 안전 관련 회의·합동점검을 운영하나요?', ref: '회의·점검 실시 여부, 주기, 참여자, 기존 기록 유무', ans: '기준대로 진행 (안전관리 서류 제출 및 필요 시 간담회)', hasDoc: '해당없음', docName: '-', priority: '보완' },
    { no: 30, cat: '안전관리', q: '사고·아차사고·위험상황 발생 시 보고와 조치는 어떻게 하나요?', ref: '연락체계, 작업중지 및 개선요청 절차, 기록 여부', ans: '유선 연락 보고 체계 가동', hasDoc: '해당없음', docName: '-', priority: '우선' },
    { no: 31, cat: '안전관리', q: '업체별로 현재 확보·관리 중인 안전보건 서류는 무엇인가요?', ref: '적격성 평가·위험성평가·교육·점검·작업계획 등 기존 보유자료', ans: '적격성 평가 · 위험성평가 · 교육 · 점검 · 작업계획 등 기존 보유자료 관리 중', hasDoc: '있음', docName: '안전보건 관리철', priority: '보완' },
    { no: 32, cat: '보유자료', q: '기존 업무자료는 어떤 파일·시스템으로 관리하나요?', ref: '계약서·일정표·투입현황·검수·사진 등 저장 위치·담당자', ans: '계약서: 원본 및 스캔본 보관 / 일정표 및 검수 사진: 팀즈(Teams) 대화방 공유', hasDoc: '있음', docName: '계약서철 & Teams', priority: '우선' },
    { no: 33, cat: '보유자료', q: '도급업무 및 현장 안전관리에서 애로사항이나 개선이 필요한 점은 무엇인가요?', ref: '자료 중복, 인력 부족, 전국 현장 확인, 업체 소통 등의 실제 의견', ans: '📢 "자료 중복, 인력 부족, 전국 현장 확인... 현업에 맞게 규칙을 정해주던지, 규칙을 지키기 위해 인원을 충원해 주던지…." (현장 맞춤형 간소화 절실)', hasDoc: '해당없음', docName: '현업 건의사항', priority: '보완' }
  ],

  // 3. 매장개선부 기존 자료 요청 목록 (15개 항목 전수)
  docRequests15: [
    { no: 1, cat: '업무범위', reqDoc: '업무분장·담당업무 자료', detail: '매장개선부가 담당하는 실제 업무와 수행부서, 세부 작업범위', docType: '문서·엑셀·내부자료', status: '제출 예정', priority: '우선' },
    { no: 2, cat: '업무범위', reqDoc: '집기 설치·개선 업무절차 또는 작업의뢰서', detail: '의뢰부터 검수·인계까지 실제 업무 처리방식', docType: '업무절차서·의뢰서·양식', status: '제출 예정', priority: '우선' },
    { no: 3, cat: '업체계약', reqDoc: '현재 거래·계약 중인 업체 목록', detail: '업체명, 수행업무, 연락창구, 담당권역 등', docType: '엑셀·업체현황표', status: '보유(집기4+사인5)', priority: '우선' },
    { no: 4, cat: '업체계약', reqDoc: '계약서 및 과업지시서(가능한 범위)', detail: '계약유형·기간·과업범위·안전관리 조항·재하도급 조건', docType: '계약서·사양서·발주서', status: '보유(제12조·13조 포함)', priority: '우선' },
    { no: 5, cat: '업체계약', reqDoc: '업체 선정·평가 및 갱신 관련 보유자료', detail: '업체선정 방식 및 기존 안전 관련 검토자료', docType: '평가표·심사자료', status: '입찰자료 보유', priority: '보유 시' },
    { no: 6, cat: '현장작업', reqDoc: '매장별 집기 작업계획·작업실적 현황', detail: '매장코드·매장명·작업일·업체·작업내용·진행현황', docType: '일정표·실적관리 파일', status: '팀 내부 실행목록표', priority: '우선' },
    { no: 7, cat: '현장작업', reqDoc: '작업지시서 및 매장별 작업범위 자료', detail: '작업구역, 대상 집기, 지시·승인 주체', docType: '작업지시서·도면·계획서', status: '도면 설계 보유', priority: '우선' },
    { no: 8, cat: '현장작업', reqDoc: '업체별 인력 투입현황 또는 현장책임자 현황', detail: '현장 인원·업체 책임자·당사 담당자, 보유 범위', docType: '인원표·보고서', status: '견적·정산서 보유', priority: '우선' },
    { no: 9, cat: '현장작업', reqDoc: '사용 장비 및 작업도구 현황(보유 시)', detail: '사다리, 전동공구, 운반장비, 설치 장비 등', docType: '장비목록·사진', status: '목록 파악 완료', priority: '보유 시' },
    { no: 10, cat: '현장작업', reqDoc: '작업 완료·검수·하자처리 자료', detail: '작업 완료보고, 사진, 검수, 시정완료 확인', docType: '보고서·사진·검수표', status: 'Teams 사진 공유', priority: '우선' },
    { no: 11, cat: '안전관리', reqDoc: '위험성평가·작업 전 안전확인 자료', detail: '현재 보유한 위험성평가 및 위험정보 공유자료', docType: '평가표·확인서', status: '안전관리 서류', priority: '보유 시' },
    { no: 12, cat: '안전관리', reqDoc: '교육·안전점검·협의체·합동점검 기록', detail: '실시 여부·주기·참여자·결과 및 개선내용', docType: '교육기록·점검표·회의록', status: '기준별 제출', priority: '보유 시' },
    { no: 13, cat: '안전관리', reqDoc: '작업허가 또는 위험작업 관리자료', detail: '고소·전기·화기·천공 등 해당하는 작업의 기존 관리방식', docType: '작업계획서·허가서', status: '위험작업 관리필요', priority: '보유 시' },
    { no: 14, cat: '안전관리', reqDoc: '안전사고 및 시정조치 관련 기록', detail: '사고보고 체계, 사고사례, 개선대책(개인정보 제외)', docType: '사고보고·개선기록', status: '유선 보고 체계', priority: '보유 시' },
    { no: 15, cat: '자료관리', reqDoc: '기타 업무관리 파일·시스템 화면·양식', detail: '이미 관리 중인 업체/매장/작업별 데이터 및 보유파일', docType: '엑셀·CSV·문서·화면', status: '도급관리 웹앱 통합', priority: '보유 시' }
  ],

  // 4. 매장개선부 특화 현장점검표 (15개 핵심 체크리스트)
  checklists: [
    { no: 1, cat: '동선분리', item: '리뉴얼 매장 작업 시 고객 및 일반 근로자 동선과 분리되었는가? (차단봉/안전테이프)', risk: '영업 중 작업 고객 충돌·사고', score: 10, done: false },
    { no: 2, cat: '출입통제', item: '작업 구역 주변에 「작업 중 출입금지」 안전표지판이 시인성 있게 게시되었는가?', risk: '고객 무단 진입 및 집기 부딪힘', score: 8, done: false },
    { no: 3, cat: '혼재작업', item: '인테리어·도장·전기·청소 등 타 공정과 작업 구역 또는 시간대가 겹치지 않게 조정되었는가?', risk: '타 공정 장비 충돌·화재', score: 8, done: false },
    { no: 4, cat: '전기안전', item: '조명 집기 및 조명 간판 배선 연결 작업 시 해당 회로 전원을 차단하고 절연장구를 착용했는가?', risk: '220V 활선 감전·누전', score: 10, done: false },
    { no: 5, cat: '화기안전', item: '금속제 집기 절단(그라인더, 직소) 작업 시 불꽃 비산방지포를 설치하고 소화기를 5m 내 비치했는가?', risk: '절단 불티로 인한 매장 화재', score: 8, done: false },
    { no: 6, cat: '사다리작업', item: 'A형 사다리 사용 시 최상단 발판 디딤을 금지하고, 2인 1조(하부 지지자 1명)로 작업하는가?', risk: '사다리 전도 및 고소 추락', score: 8, done: false },
    { no: 7, cat: '보호구착용', item: '작업자 전원이 안전모, 안전화, 보안경, 베임방지 안전장갑을 올바르게 착용하고 있는가?', risk: '낙하물 충격·못 찔림·칼 베임', score: 8, done: false },
    { no: 8, cat: '전동공구', item: '전동드릴, 그라인더, 직소 등 회전 공구의 안전 커버가 정상 장착되어 있고 전선 손상이 없는가?', risk: '회전날 파손 파편 비산·감전', score: 6, done: false },
    { no: 9, cat: '중량물취급', item: '상품 진열대 및 창고 경량랙 등 중량 집기 운반 시 운반카트를 사용하고 2인 이상 인양하는가?', risk: '허리 염좌·근골격계 부담·협착', score: 6, done: false },
    { no: 10, cat: '벽면천공', item: '벽면 앵커 고정 천공 작업 시 분진 흡진기를 사용하고 매장 내 상품에 분진 방지 보양을 했는가?', risk: '분진 흡입 및 상품 훼손', score: 4, done: false },
    { no: 11, cat: '현장지휘', item: '낙찰업체 현장 책임자가 상주하여 작업자를 직접 지휘하고 있는가? (다이소 직원의 직접지시 배제)', risk: '불법파견 리스크 발생', score: 8, done: false },
    { no: 12, cat: 'TBM실시', item: '작업 시작 전 작업 내용, 위험 요인, 개인보호구 착용 상태를 확인하는 TBM을 실시하였는가?', risk: '위험요인 미인지로 사고 발생', score: 4, done: false },
    { no: 13, cat: '비상연락', item: '비상상황 및 아차사고 발생 시 안전보건팀 보고 체계 및 비상대피로가 확보되어 있는가?', risk: '사고 시 늑장 대응·확대', score: 4, done: false },
    { no: 14, cat: '폐기물정리', item: '포장 박스, 스티로폼, 철판 조각, 폐집기 등이 통로에 방치되지 않고 즉시 반출 정리되는가?', risk: '작업자 걸려 넘어짐·통로 차단', score: 4, done: false },
    { no: 15, cat: '완료검수', item: '집기 설치 및 고정 상태(흔들림, 볼트 조임)를 점검하고 안전 확인 후 영업부에 인계하였는가?', risk: '오픈/영업 중 진열대 전도 사고', score: 4, done: false }
  ]
};

function loadImproveData() {
  try {
    const raw = localStorage.getItem(IMPROVE_STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_IMPROVE_DATA));
    const parsed = JSON.parse(raw);
    if (!parsed.vendors || parsed.vendors.length < 9) parsed.vendors = DEFAULT_IMPROVE_DATA.vendors;
    if (!parsed.survey33 || parsed.survey33.length < 33) parsed.survey33 = DEFAULT_IMPROVE_DATA.survey33;
    if (!parsed.docRequests15) parsed.docRequests15 = DEFAULT_IMPROVE_DATA.docRequests15;
    if (!parsed.checklists) parsed.checklists = DEFAULT_IMPROVE_DATA.checklists;
    return parsed;
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_IMPROVE_DATA));
  }
}

function saveImproveData(data) {
  try {
    localStorage.setItem(IMPROVE_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('saveImproveData error:', e);
  }
}

// 매장개선부 대시보드 뷰 렌더링
function renderImproveTabHtml(d) {
  const data = d || loadImproveData();
  const jipgiList = data.vendors.filter(v => v.category === '집기');
  const signList = data.vendors.filter(v => v.category.includes('사인'));
  const checkedCnt = data.checklists.filter(c => c.done).length;
  const totalScore = data.checklists.filter(c => c.done).reduce((acc, c) => acc + c.score, 0);

  return `
    <!-- [매장개선부 상단 현황 배너] -->
    <div class="card" style="background:linear-gradient(135deg,#064e3b,#047857 60%,#059669);color:#fff;border:0;margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap">
        <div>
          <span style="background:#a7f3d0;color:#064e3b;font-size:11px;font-weight:900;padding:2px 8px;border-radius:99px">매장지원부문 매장개선부 전용</span>
          <h2 style="margin:6px 0 4px;color:#fff;font-size:18px;font-weight:900">🛠 매장개선부 도급안전관리 센터 (집기 4개사 · 사인 5개사)</h2>
          <div style="font-size:12.5px;color:#ecfdf5;line-height:1.5">
            매장 내 상품 진열대·창고 경량랙 설치·철거·재배치 및 특화코너 사인물 발주 현장 안전관리 · 현황질문지 33문항 & 자료목록 15건 전수 수록
          </div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="btn ghost sm" style="background:rgba(255,255,255,.16);color:#fff;border-color:rgba(255,255,255,.3)" onclick="openSectorSelectModal()">🔄 업종 전환</button>
          <button class="btn ghost sm" style="background:rgba(255,255,255,.16);color:#fff;border-color:rgba(255,255,255,.3)" onclick="exportImproveExcel()">📥 엑셀 다운로드</button>
        </div>
      </div>

      <!-- KPI 4블록 -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-top:14px">
        <div style="background:rgba(255,255,255,.12);padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.15)">
          <div style="font-size:11px;opacity:.85">집기 계약업체</div>
          <div style="font-size:20px;font-weight:900;margin-top:2px">${jipgiList.length}개사 <span style="font-size:11.5px;font-weight:600;color:#a7f3d0">(성현·예우·열림·내일)</span></div>
        </div>
        <div style="background:rgba(255,255,255,.12);padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.15)">
          <div style="font-size:11px;opacity:.85">특화코너 사인업체</div>
          <div style="font-size:20px;font-weight:900;margin-top:2px">${signList.length}개사 <span style="font-size:11.5px;font-weight:600;color:#a7f3d0">(인테리어부 동일)</span></div>
        </div>
        <div style="background:rgba(255,255,255,.12);padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.15)">
          <div style="font-size:11px;opacity:.85">도급운영 현황 질문지</div>
          <div style="font-size:20px;font-weight:900;margin-top:2px">33개 문항 <span style="font-size:11.5px;font-weight:600;color:#fef08a">답변 완료</span></div>
        </div>
        <div style="background:rgba(255,255,255,.12);padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.15)">
          <div style="font-size:11px;opacity:.85">현장 안전점검 점수</div>
          <div style="font-size:20px;font-weight:900;margin-top:2px">${totalScore}점 <span style="font-size:11.5px;font-weight:600;color:#a7f3d0">(${checkedCnt}/15 항목)</span></div>
        </div>
      </div>
    </div>

    <!-- [핵심 긴급 안전공지: 리뉴얼 매장 동선 분리 및 혼재작업 대책] -->
    <div class="card" style="border-left:4px solid #dc2626;background:#fef2f2;margin-bottom:14px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
        <span style="background:#dc2626;color:#fff;font-size:11px;font-weight:900;padding:2px 8px;border-radius:99px">최우선 개선 과제</span>
        <h3 style="margin:0;font-size:15px;color:#991b1b;font-weight:900">🚨 리뉴얼 매장 영업 중 작업 시 고객 동선 미분리 위험 개선 대책</h3>
      </div>
      <div style="font-size:13px;color:#7f1d1d;line-height:1.6">
        • <b>현황 문제점:</b> 질문지 19번 답변 결과, <u>"리뉴얼 매장은 고객·근로자 동선 미분리 상태로 영업시간 중 작업 진행"</u>되고 있으며, 23번 답변에서 <u>"안전 표지 및 출입 통제 준비 중 현재는 없음"</u>으로 확인되었습니다.<br>
        • <b>안전보건팀 조치사항:</b> 리뉴얼 집기 설치/교체 시 <b>① 이동식 차단봉 및 안전테이프 구획 100% 설치</b>, <b>② 「작업 중 출입금지」 A형 표지판 의무화</b>, <b>③ 타 공정(인테리어/청소) 동시 작업 시 시간대 분리 원칙</b>을 즉각 적용합니다.
      </div>
    </div>

    <!-- 서브 섹션 1: 집기 4개사 + 사인 5개사 카드 -->
    <div class="card" style="margin-bottom:14px">
      <div class="card-h">
        <span>📋 매장개선부 협력업체 현황 (집기 4개사 · 사인 5개사 = 총 9개사)</span>
        <span class="badge info">비용 입찰 기준 선정 · 건별 계약</span>
      </div>
      <div class="card-b">
        <div style="font-weight:800;font-size:13px;color:#064e3b;margin-bottom:8px">1) 집기 제작·납품·설치 협력업체 (4개사)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;margin-bottom:16px">
          ${jipgiList.map(v => `
            <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:12px;padding:12px;border-top:3px solid ${v.score>=90?'#059669':'#2563eb'}">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                <b style="font-size:15px;color:#0f172a">${esc(v.name)}</b>
                <span class="badge ${v.score>=90?'ok':'info'}">${v.score}점 (${v.grade}등급)</span>
              </div>
              <div style="font-size:12px;color:#475569;line-height:1.5">
                <div>• <b>역할:</b> ${esc(v.scope)}</div>
                <div>• <b>지역/계약:</b> ${esc(v.region)} · ${esc(v.contractType)}</div>
                <div>• <b>장비:</b> ${esc(v.equipments)}</div>
                <div style="color:#b91c1c;margin-top:4px">⚠️ <b>위험요인:</b> ${esc(v.riskHigh)}</div>
                <div style="color:#047857;font-weight:700">🛡️ <b>대책:</b> ${esc(v.actionPlan)}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="font-weight:800;font-size:13px;color:#0f172a;margin-bottom:8px">2) 특화코너 사인물 협력업체 (5개사 · 인테리어부서와 동일)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px">
          ${signList.map(v => `
            <div style="background:#f1f5f9;border-radius:8px;padding:8px 10px;font-size:12px;border:1px solid #e2e8f0">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <b>${esc(v.name)}</b>
                <span class="badge info">${v.score}점</span>
              </div>
              <div style="color:#64748b;margin-top:2px">${esc(v.scope)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- 서브 섹션 2: 33문항 현황질문지 전수 테이블 -->
    <div class="card" style="margin-bottom:14px">
      <div class="card-h">
        <span>📑 매장개선부 도급업무 운영현황 질문지 전수 답변 (33문항)</span>
        <button class="btn sm ghost" onclick="toggleImproveSurveyTable()">표 접기/펼치기</button>
      </div>
      <div id="improveSurveyWrap" class="card-b" style="overflow-x:auto">
        <table class="rtable" style="font-size:12px">
          <thead>
            <tr>
              <th style="width:45px">No</th>
              <th style="width:75px">구분</th>
              <th style="min-width:180px">질문 항목</th>
              <th style="min-width:240px">매장개선부 현업 답변</th>
              <th style="width:70px">자료보유</th>
              <th style="min-width:100px">자료명·비고</th>
              <th style="width:65px">우선순위</th>
            </tr>
          </thead>
          <tbody>
            ${data.survey33.map(s => `
              <tr style="${s.ans.includes('고객·근로자 동선 미분리') || s.ans.includes('현업에 맞게') ? 'background:#fef2f2' : ''}">
                <td><b>${s.no}</b></td>
                <td><span class="badge info">${esc(s.cat)}</span></td>
                <td><b>${esc(s.q)}</b><div style="font-size:11px;color:#64748b;margin-top:2px">${esc(s.ref)}</div></td>
                <td><span style="${s.ans.includes('고객·근로자 동선 미분리') ? 'color:#dc2626;font-weight:800' : ''}">${esc(s.ans)}</span></td>
                <td><span class="badge ${s.hasDoc==='있음'?'ok':'muted'}">${esc(s.hasDoc)}</span></td>
                <td>${esc(s.docName)}</td>
                <td><span class="badge ${s.priority==='우선'?'warn':'muted'}">${esc(s.priority)}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- 서브 섹션 3: 15개 자료 요청 목록 테이블 -->
    <div class="card" style="margin-bottom:14px">
      <div class="card-h">
        <span>📂 매장개선부 기존 자료 요청 목록 (15개 항목)</span>
        <span class="badge info">보유 자료 중심 수집</span>
      </div>
      <div class="card-b" style="overflow-x:auto">
        <table class="rtable" style="font-size:12px">
          <thead>
            <tr>
              <th style="width:45px">No</th>
              <th style="width:75px">분류</th>
              <th style="min-width:180px">요청 자료명</th>
              <th style="min-width:220px">확인하려는 구체적 내용</th>
              <th style="min-width:110px">예상 형태</th>
              <th style="min-width:130px">현업 보유 현황</th>
              <th style="width:65px">우선순위</th>
            </tr>
          </thead>
          <tbody>
            ${data.docRequests15.map(d => `
              <tr>
                <td><b>${d.no}</b></td>
                <td><span class="badge info">${esc(d.cat)}</span></td>
                <td><b>${esc(d.reqDoc)}</b></td>
                <td style="color:#475569">${esc(d.detail)}</td>
                <td>${esc(d.docType)}</td>
                <td><b style="color:#059669">${esc(d.status)}</b></td>
                <td><span class="badge ${d.priority==='우선'?'warn':'muted'}">${esc(d.priority)}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- 서브 섹션 4: 매장개선부 전용 현장점검 체크리스트 (15문항) -->
    <div class="card">
      <div class="card-h">
        <span>🔍 매장개선부 현장 안전점검 체크리스트 (15문항 · 총 100점)</span>
        <span class="badge ${totalScore>=85?'ok':totalScore>=70?'info':'warn'}">현재 점수: ${totalScore}점</span>
      </div>
      <div class="card-b">
        <div style="display:grid;gap:8px">
          ${data.checklists.map((c, idx) => `
            <div style="display:flex;align-items:flex-start;gap:10px;padding:8px 10px;background:${c.done?'#f0fdf4':'#f8fafc'};border:1px solid ${c.done?'#86efac':'#e2e8f0'};border-radius:8px">
              <input type="checkbox" id="imp_chk_${idx}" ${c.done?'checked':''} onchange="toggleImproveCheck(${idx})" style="margin-top:3px;cursor:pointer">
              <label for="imp_chk_${idx}" style="cursor:pointer;flex:1;font-size:12.5px;color:#0f172a">
                <b>[${esc(c.cat)}]</b> ${esc(c.item)}
                <div style="font-size:11.5px;color:#dc2626;margin-top:2px">⚠️ 위험: ${esc(c.risk)} · 배점: ${c.score}점</div>
              </label>
            </div>
          `).join('')}
        </div>
        <div style="margin-top:12px;text-align:right">
          <button class="btn primary" onclick="saveImproveChecklist()">💾 점검 결과 저장 (구글 시트 연동)</button>
        </div>
      </div>
    </div>
  `;
}

function toggleImproveSurveyTable() {
  const el = document.getElementById('improveSurveyWrap');
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function toggleImproveCheck(idx) {
  const d = loadImproveData();
  if (d.checklists && d.checklists[idx]) {
    d.checklists[idx].done = !d.checklists[idx].done;
    saveImproveData(d);
    if (typeof loadService === 'function') loadService();
  }
}

function saveImproveChecklist() {
  const d = loadImproveData();
  saveImproveData(d);
  if (typeof syncFieldInspectionToCloud === 'function') {
    syncFieldInspectionToCloud({
      savedAt: new Date().toISOString(),
      meta: {
        siteName: '매장개선부 현장점검',
        inspDate: new Date().toISOString().slice(0, 10),
        inspector: '강동현',
        targetDept: '매장개선부',
        targetVendor: '집기 4개사 · 사인 5개사'
      },
      answers: d.checklists
    });
  }
  if (typeof toast === 'function') toast('매장개선부 점검 결과가 저장되었습니다.', 'ok');
}

function exportImproveExcel() {
  const d = loadImproveData();
  let csv = '\uFEFF[매장개선부 도급업무 운영현황 33문항 조사표]\n';
  csv += '번호,구분,질문 항목,답변 참고사항,현업 답변,자료보유 여부,자료명·보충설명,요청순위\n';
  d.survey33.forEach(s => {
    csv += `"${s.no}","${s.cat}","${s.q.replace(/"/g, '""')}","${s.ref.replace(/"/g, '""')}","${s.ans.replace(/"/g, '""')}","${s.hasDoc}","${s.docName}","${s.priority}"\n`;
  });

  csv += '\n[매장개선부 기존 자료 요청 목록 15항목]\n';
  csv += '번호,분류,요청자료명,확인하려는 내용,예상 형태,보유 현황,우선순위\n';
  d.docRequests15.forEach(r => {
    csv += `"${r.no}","${r.cat}","${r.reqDoc.replace(/"/g, '""')}","${r.detail.replace(/"/g, '""')}","${r.docType}","${r.status}","${r.priority}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `매장개선부_도급안전관리_현황조사표_및_자료요청목록_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

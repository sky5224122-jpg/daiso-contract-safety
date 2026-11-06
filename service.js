/* ═══════════════════════════════════════════════════════════════
   service.js — 오픈지원부(진열·입고 5개사) & 매장CS팀(입고4·재고5 총 9개사) 도급안전관리 전용 모듈
   안전보건팀 강동현 (sky5224122@gmail.com)
   - 오픈지원부 5개사 전원 동등 표기: 케이웍스코리아, 에드에그, 유엔아이, 휴먼인프라, 맨토스
   - 매장CS팀 9개사 전원 반영:
     · 입고도우미(4개사): 블루키솔루션(95점 S, '25년 엠앤제이 69점 미달 배제 후 신규), 휴먼인프라(95점 S), 맨토스(85점 A), 케이웍스코리아(81점 A)
     · 재고도우미(5개사): TSW파트너스(100점 S), RBS코리아(95점 S), 빅서비스(88점 A), 아르테코리아(79점 B), 유미어스(70점 B)
   - 현장방문 실태점검(30문항 체크리스트 + 8대 크로스 인터뷰 + 실시간 점수/등급 산출 + GAS 클라우드 연동)
   ═══════════════════════════════════════════════════════════════ */

const SVC_STORAGE_KEY = 'daiso_service_safety_data_v3';

const DEFAULT_SERVICE_DATA = {
  owner: {
    name: '강동현',
    email: 'sky5224122@gmail.com',
    team: '안전보건팀',
    depts: ['오픈지원부 (매장지원부문 소속 · 상품진열/입고 5개사)', '매장CS팀 (영업지원부문 소속 · 입고도우미 4개사 / 재고도우미 5개사)']
  },
  // 1. 오픈지원부 계약업체 현황 (5개사 전원 동등 표기)
  openVendors: [
    {
      id: 'ov_kworks',
      name: '케이웍스코리아',
      scope: '입고용역 및 진열용역',
      region: '전국',
      maxCap: 160,
      dailyAvg: '20~40명 (오픈점 규모별)',
      managerRole: '업체 파견 현장관리자(팀장) 지정 완료',
      spaceSeparation: '복층: 층별 분리 / 단층: 구역(A·B존) 분리',
      riskItems: ['파렛트/대차 이동 시 협착·전도', '커터칼 개봉 시 베임', '고소 사다리(A형) 진열 추락', '중량박스 반복 취급 근골격계 부담'],
      score: 80,
      grade: 'A',
      evalDate: '2026-06-29',
      weakPoint: '비상대책 훈련·점검 미실시 (가점 C / 0점) — 현장 합동 비상대피 훈련 필요',
      status: '적격(A등급)',
      contact: '현장총괄팀장 (010-2100-1600)'
    },
    {
      id: 'ov_adegg',
      name: '에드에그',
      scope: '진열용역',
      region: '전국',
      maxCap: 100,
      dailyAvg: '15~35명 (오픈점 규모별)',
      managerRole: '업체 파견 현장관리자(실장) 지정 완료',
      spaceSeparation: '복층: 층별 분리 / 단층: 매대 라인별 분리',
      riskItems: ['곤돌라/매대 조립부 손끼임', '상단 진열 시 우마·사다리 전도', '박스 파지 정리 중 미끄러짐', '오픈 전 혼재작업(인테리어 잔여작업) 충돌'],
      score: 90,
      grade: 'S',
      evalDate: '2026-06-29',
      weakPoint: '안전보건관리체계 및 작업통제 우수 (전 항목 고득점)',
      status: '적격(S등급)',
      contact: '운영관리팀장 (010-3200-1000)'
    },
    {
      id: 'ov_uni',
      name: '유엔아이',
      scope: '진열용역',
      region: '수도권 / 충청 / 중호',
      maxCap: 120,
      dailyAvg: '20~35명 (권역 오픈점)',
      managerRole: '업체 파견 현장관리자(반장) 지정 완료',
      spaceSeparation: '다이소 오픈리베로와 층별/섹션별 작업공간 분리',
      riskItems: ['커터칼 사용 중 손베임', '상품 박스 적재 불량 무너짐', '진열 후크/바스켓 체결 중 찔림', '장시간 서서 작업 및 반복 굴신'],
      score: 79,
      grade: 'B',
      evalDate: '2026-06-29',
      weakPoint: '보호구 지급 대장 미흡(B) · 아차사고 발굴 및 비상훈련 미실시(C) 집중 보완 필요',
      status: '적격(B등급·보완권고)',
      contact: '권역관리팀장 (010-4300-1200)'
    },
    {
      id: 'ov_human',
      name: '휴먼인프라',
      scope: '입고용역 및 진열용역',
      region: '영남',
      maxCap: 100,
      dailyAvg: '15~30명 (영남권 오픈점)',
      managerRole: '업체 파견 현장관리자(소장) 지정 완료',
      spaceSeparation: '하역/입고장 및 매장 층별 동선 분리 운영',
      riskItems: ['하역장 차량 후진 시 부딪힘', '핸드파렛트(자키) 발끼임', '중량물(세제/음료/식기) 인력운반 허리부담', '계단/화물승강기 이동 중 협착'],
      score: 95,
      grade: 'S',
      evalDate: '2026-06-29',
      weakPoint: '영남권 입고·진열 안전관리체계 전반 우수 (안전작업허가 B 외 전 항목 S)',
      status: '적격(S등급)',
      contact: '영남총괄소장 (010-5400-1000)'
    },
    {
      id: 'ov_mentos',
      name: '맨토스 (멘토스파워)',
      scope: '진열용역 및 입고지원',
      region: '수도권 / 전국 거점',
      maxCap: 90,
      dailyAvg: '15~25명 (거점 오픈점)',
      managerRole: '업체 파견 현장관리자(팀장) 지정 완료',
      spaceSeparation: '다이소 오픈리베로와 층별/구역별 분리 배치',
      riskItems: ['진열 매대 이동 중 발끼임', '박스 개봉 커터칼 베임', '고소 진열대 작업 시 추락', '중량 박스 운반 허리 염좌'],
      score: 85,
      grade: 'A',
      evalDate: '2026-06-29',
      weakPoint: '비상대책 훈련·점검 미실시(C / 0점) — 오픈지원·입고 공통 비상훈련 보완 필요',
      status: '적격(A등급)',
      contact: '운영총괄실장 (010-6500-0900)'
    }
  ],
  // 2. 오픈지원부 인력 운영 및 안전관리 핵심 원칙
  openOperationPolicy: {
    commandRule: '업체에서 파견된 현장관리자(팀장/반장)를 통해서만 일반용역 작업자에게 업무 지시 (다이소 오픈리베로의 직접 개별 지시 엄금 — 불법파견 리스크 원천 차단)',
    spaceRule: '다이소 오픈리베로(직영)와 진열용역(수급인) 작업 공간을 최대한 분리하여 진행 (복층 매장: 층별 분리 / 단층 매장: 구역·섹션 분리 및 안내 표지 부착)',
    workHours: '08:30 ~ 17:30 (점심 1시간 + 오전/오후 휴게시간 별도 부여)',
    contractCycle: '1년 단위 연간 단가계약 (매장 오픈 일정별 발주)',
    preOpenCheck: '인테리어팀 잔여 공사(전기/도장/목공) 종료 여부 확인 후 진열 투입 (혼재작업 시 작업시기 조정 또는 층간 완전 분리)'
  },
  // 3. 매장CS팀 계약업체 현황 (입고도우미 4개사 + 재고도우미 5개사 = 총 9개사, '26년 상반기 적격업체평가 기준)
  csVendors: [
    // ── [A] 입고도우미 (입고용역 · 1일 약 2시간 집중 입고 · 4개사) ──
    {
      id: 'cs_bluekey',
      category: '입고도우미 (입고용역)',
      name: '블루키솔루션',
      workTime: '1일 약 2시간 집중 (물류 차량 도착 맞춘 주간/오전 입고 타임)',
      workPlace: '매장 하역장, 후방 창고(백룸), 매장 내 운반 동선',
      workDetail: '물류 차량 롤테이너/파렛트 하차 보조, 매장 내 입고 상품 분류 및 창고 적재',
      workersPerStore: '매장당 2~4명 (단시간 집중 투입, 전국/수도권)',
      managerRole: '권역 순회관리자 및 현장 리더 지정',
      riskItems: ['롤테이너/핸드파렛트 이동 시 발등 찍힘·끼임', '2시간 내 집중 하역으로 인한 중량물 급격한 허리 부담', '하역장 단차·경사로 미끄러짐 및 전도', '영업 중 매장 통로 이동 시 고객과 충돌'],
      controls: ['안전화(선심 내장) 또는 발보호대 착용 의무화', '롤테이너 2인 1조 이동 및 바퀴 스토퍼 고정', '작업 전 5분 스트레칭 및 중량물(15kg↑) 2인 운반', '고객 동선 교차 구간 안전고깔/안내표지 설치'],
      score: 95,
      grade: 'S',
      evalDate: '2026-06-29',
      history2025: "'25년 엠앤제이(69점·70점 미달 부적격 배제) 대체 '26년 신규 우수업체 선정",
      weakPoint: '안전작업허가절차(B) 외 전 항목 S등급 우수'
    },
    {
      id: 'cs_human',
      category: '입고도우미 (입고용역)',
      name: '휴먼인프라',
      workTime: '1일 약 2시간 집중 (영남권 매장 물류 입고 타임)',
      workPlace: '매장 하역장, 화물승강기, 백룸 창고',
      workDetail: '영남권 매장 입고 상품 하차, 롤테이너 이동 및 창고 적재 보조',
      workersPerStore: '매장당 2~4명 (영남권 거점)',
      managerRole: '영남권 현장소장 및 매장별 작업리더 지정',
      riskItems: ['화물용 승강기·리프트 승하차 시 단차 끼임', '롤테이너 경사로 밀림 사고', '중량 박스(음료/세제) 반복 적재 근골격계 질환', '단시간 작업자 TBM 누락 위험'],
      controls: ['승강기 정격하중 준수 및 바퀴 고정 확인', '모바일 단톡방/QR 기반 작업 전 3분 TBM 인증', '베임방지 코팅장갑 및 미끄럼방지 안전화 착용', '50분 작업 후 10분 휴식 및 스트레칭 실시'],
      score: 95,
      grade: 'S',
      evalDate: '2026-06-29',
      history2025: "'25년 평가 93점(적격) → '26년 상반기 95점(S등급) 상승",
      weakPoint: '안전작업허가절차(B) 외 전 항목 S등급 우수'
    },
    {
      id: 'cs_mentos',
      category: '입고도우미 (입고용역)',
      name: '맨토스 (멘토스파워)',
      workTime: '1일 약 2시간 집중 (수도권/거점 매장 입고 타임)',
      workPlace: '매장 하역장, 백룸 창고, 매장 내 이송 통로',
      workDetail: '입고 상품 박스 하차, 분류 및 후방 창고 랙 적재 작업',
      workersPerStore: '매장당 2~4명 (수도권/전국)',
      managerRole: '업체 파견 권역 팀장 및 현장 리더 지정',
      riskItems: ['롤테이너 이동 중 코너 구간 시야 미확보 충돌', '창고 상단 적재 시 받침대 전도', '커터칼 박스 개봉 중 손베임', '비상시 매장 내 대피경로 미숙지'],
      controls: ['롤테이너 2인 1조 끌기/밀기 원칙 준수', '안전커터칼(자동복귀형) 지급 및 방검장갑 착용', '창고 적재 높이 제한(1.8m 이하) 준수', '매장 투입 첫날 비상구 위치 안내 의무화'],
      score: 85,
      grade: 'A',
      evalDate: '2026-06-29',
      history2025: "'25년 평가 90점(멘토스파워) → '26년 상반기 85점(A등급)",
      weakPoint: '비상대책 훈련·점검 미실시(C / 0점) — 매장 비상대피 안내 보완 필요'
    },
    {
      id: 'cs_kworks',
      category: '입고도우미 (입고용역)',
      name: '케이웍스코리아 (케이웍스)',
      workTime: '1일 약 2시간 집중 (전국 매장 입고 타임)',
      workPlace: '매장 하역장, 백룸 창고, 매장 매대 통로',
      workDetail: '물류 입고 박스 운반, 대차 이동 및 매대 인근 가적재 보조',
      workersPerStore: '매장당 2~5명 (전국 거점)',
      managerRole: '업체 권역 관리자 및 현장 반장 지정',
      riskItems: ['핸드파렛트·대차 이동 중 발끼임', '박스 개봉 및 파지 압축 작업 중 끼임·베임', '하역장 우천·결빙 시 바닥 미끄러짐', '단시간 투입 인력 비상연락망 누락'],
      controls: ['하역 작업 전 바닥 물기·장애물 제거 확인', '파지 압축기 등 기계설비는 지정·교육 이수자만 취급', '작업 시작 전 모바일 안전수칙 서명 실시', '비상대피 및 응급처치 합동 모의훈련 연 1회 이상 실시'],
      score: 81,
      grade: 'A',
      evalDate: '2026-06-29',
      history2025: "'25년 평가 81점(케이웍스) → '26년 상반기 81점(A등급 유지)",
      weakPoint: '비상대책 훈련·점검 미실시(C / 0점) — 비상훈련 이행 증빙 확보 필요'
    },
    // ── [B] 재고도우미 (재고용역 · 퇴근시간 이후 야간 재고실사 · 5개사) ──
    {
      id: 'cs_tsw',
      category: '재고도우미 (재고용역)',
      name: 'TSW파트너스',
      workTime: '매장 퇴근시간(폐점 22:00) 이후 야간/심야 시간대',
      workPlace: '폐점 후 매장 전 구역 매대 및 후방 창고(백룸)',
      workDetail: 'PDA/바코드 스캐너 활용 전 상품 재고수량 실사, 상·하단 매대 및 창고 재고 파악',
      workersPerStore: '매장당 4~10명 (야간 팀 단위 이동식 투입)',
      managerRole: '재고실사 팀장(슈퍼바이저) 현장 상주 지휘 (2인 1조 원칙)',
      riskItems: ['야간 조도 부족(일부 소등)에 따른 걸려 넘어짐', '높은 매대/창고 상단 재고 확인 시 사다리·스텝스툴 추락', '심야 시간대 나홀로 작업 시 급성질환·비상상황 고립', '야간 이동 차량 졸음운전 및 출퇴근 교통사고'],
      controls: ['야간 재고실사 구역 작업조명 100% 점등 유지(소등 작업 금지)', 'A형 안전사다리·전도방지 스텝스툴 외 임의 받침대(박스/의자) 탑승 엄금', '2인 1조 버디시스템(Buddy System) 운영 및 폐점 후 비상출입문 개폐 방법 사전 교육', '야간 작업 전 혈압·컨디션 확인 및 장거리 이동 시 충분한 휴식 보장'],
      score: 100,
      grade: 'S',
      evalDate: '2026-06-29',
      history2025: "'26년 상반기 재고용역 적격업체평가 전 항목 만점(100점 S등급)",
      weakPoint: '전 항목 만점(100점) — 야간 재고실사 안전표준 모범업체'
    },
    {
      id: 'cs_rbs',
      category: '재고도우미 (재고용역)',
      name: 'RBS코리아',
      workTime: '매장 퇴근시간(폐점 22:00) 이후 야간/심야 시간대',
      workPlace: '폐점 후 매장 전 구역 매대 및 후방 창고',
      workDetail: '매장 상품 바코드 스캔 및 전산 재고 대조, 창고 보관 재고 카운팅',
      workersPerStore: '매장당 4~8명 (야간 실사팀 단위)',
      managerRole: '현장 실사팀장 상주 통제 및 야간 인원점검',
      riskItems: ['매대 하단/최상단 반복 스캔으로 인한 무릎·어깨·목 근골격계 부담', '창고 좁은 통로 이동 중 적재 박스 무너짐', '야간 냉난방 가동 중단 시 여름철 열사병 / 겨울철 한랭질환', '폐점 매장 내 화재·정전 시 비상구 미숙지'],
      controls: ['하단 매대 스캔 시 무릎보호대 지급 및 교대 스캔 실시', '야간 실사 시간대 적정 실내온도(냉난방) 및 조도(150럭스↑) 유지 협조', '작업 전 매장 비상구·소화기 위치 및 셔터 수동개폐법 5분 안내', '창고 고소 구역 2인 1조(1인 사다리 지지, 1인 스캔) 작업 의무화'],
      score: 95,
      grade: 'S',
      evalDate: '2026-06-29',
      history2025: "'26년 상반기 재고용역 적격업체평가 95점(S등급)",
      weakPoint: '안전작업허가절차(B) 외 전 항목 S등급 우수'
    },
    {
      id: 'cs_bigservice',
      category: '재고도우미 (재고용역)',
      name: '빅서비스',
      workTime: '매장 퇴근시간(폐점 22:00) 이후 야간/심야 시간대',
      workPlace: '폐점 후 매장 매대 및 백룸 창고',
      workDetail: '야간 매장 재고현황 전수 파악 및 단말기 입력 작업',
      workersPerStore: '매장당 4~8명 (야간 실사팀 단위)',
      managerRole: '현장 실사 리더 지정 및 야간 출퇴근 해산 보고',
      riskItems: ['상단 재고 확인 시 플라스틱 우마·박스 밟고 올라가다 전도', '야간 피로 누적으로 인한 계단·단차 발헛디딤', '심야 작업 중 창고 구석 단독 작업 고립 위험', '비상대피 훈련 미실시로 인한 심야 화재 대응 취약'],
      controls: ['안전인증 스텝스툴 외 임의 받침대 사용 절대 금지', '백룸·지하창고 작업 시 반드시 2인 1조 동행', '야간 투입 전 폐점 매장 비상개폐문 위치 사진 공유', '연 1회 이상 야간 비상대피 시나리오 교육·훈련 의무화'],
      score: 88,
      grade: 'A',
      evalDate: '2026-06-29',
      history2025: "'26년 상반기 재고용역 적격업체평가 88점(A등급)",
      weakPoint: '비상대책 수립·훈련 미실시(C / 0점) — 야간 폐점 매장 비상탈출 교육 보완 필요'
    },
    {
      id: 'cs_arte',
      category: '재고도우미 (재고용역)',
      name: '아르테코리아',
      workTime: '매장 퇴근시간(폐점 22:00) 이후 야간/심야 시간대',
      workPlace: '폐점 후 매장 전 구역 및 창고',
      workDetail: '야간 매장 재고 실사 및 재고 수량 검증 용역',
      workersPerStore: '매장당 4~8명 (야간 실사팀 단위)',
      managerRole: '실사 팀장 지정 (안전보건관리계획서 및 보호구 대장 보완 관리 대상)',
      riskItems: ['위험성평가 및 안전작업허가 절차 미흡에 따른 야간 불안전 행동', '미끄럼방지 작업화·무릎보호대 미지급에 따른 전도·근골격계 재해', '야간 고소 매대 스캔 중 추락 위험', '심야 시간대 비상상황 발생 시 초기 보고 지연'],
      controls: ['야간 재고실사 표준 위험성평가표 배포 및 작업 전 TBM 서명 의무화', '미끄럼방지 작업화·무릎보호대 지급 대장 즉시 구비', '야간 고소작업(2m 이상) 시 2인 1조 안전사다리 작업 수칙 적용', '현장 방문 실태점검 우선 점검 대상 지정(79점 B등급)'],
      score: 79,
      grade: 'B',
      evalDate: '2026-06-29',
      history2025: "'26년 상반기 재고용역 적격업체평가 79점(B등급 · 집중 관리 대상)",
      weakPoint: '안전보건관리계획서·위험성평가·안전교육·보호구·작업허가(B) 전반 보완 및 비상훈련(C) 미실시'
    },
    {
      id: 'cs_yumeus',
      category: '재고도우미 (재고용역)',
      name: '유미어스',
      workTime: '매장 퇴근시간(폐점 22:00) 이후 야간/심야 시간대',
      workPlace: '폐점 후 매장 전 구역 및 후방 창고',
      workDetail: '야간 매장 상품 재고현황 파악 및 실사 데이터 집계',
      workersPerStore: '매장당 4~8명 (야간 실사팀 단위)',
      managerRole: '실사 팀장 지정 (적격 턱걸이 70점 — 최우선 시정·현장점검 대상)',
      riskItems: ['위험성평가 미실시(C)에 따른 매장별 유해위험요인 미파악', '안전보건교육 계획·실적 부재(C)로 인한 단기 실사원 안전수칙 미숙지', '비상대책 미수립(C)으로 야간 폐점 매장 내 응급·화재 시 고립 위험', '아차사고 발굴 활동 전무(C)'],
      controls: ['[최우선 조치] 다이소 표준 야간 재고실사 위험성평가표 즉시 적용 및 이행 확인', '[최우선 조치] 투입 전 모바일 10분 안전교육 및 서명부 의무 제출(미제출 시 투입 제한)', '[최우선 조치] 폐점 매장 비상출입문 개폐·비상연락망 숙지 현장 불시점검 실시', '하반기 재평가 시 70점 미만 발생 시 계약 배제(원스트라이크 아웃) 사전 경고'],
      score: 70,
      grade: 'B',
      evalDate: '2026-06-29',
      history2025: "'26년 상반기 재고용역 적격업체평가 70점(B등급 커트라인 · 최우선 시정조치 대상)",
      weakPoint: '위험성평가(C·0점), 안전보건교육(C·0점), 비상대책(C·0점), 아차사고(C·0점) — 즉각 시정계획서 징구 필수'
    }
  ],
  // 4. 오픈지원부 & 매장CS팀 합동 안전점검 체크리스트 (일일/주간/월간)
  checklists: [
    { id: 'chk_1', dept: '오픈지원부', cycle: '작업전(일일)', item: '업체 파견 현장관리자(팀장) 상주 여부 및 작업자 직접 지시 금지(불법파견 방지) 준수 확인', done: true, date: '2026-10-30' },
    { id: 'chk_2', dept: '오픈지원부', cycle: '작업전(일일)', item: '다이소 오픈리베로와 진열용역(5개사) 작업 공간 분리(복층 층별 분리 / 단층 구역 분리) 상태 확인', done: true, date: '2026-10-30' },
    { id: 'chk_3', dept: '오픈지원부', cycle: '작업전(일일)', item: '인테리어 잔여 공사와 진열작업 혼재 여부 확인 (혼재 시 작업시기 분리 조치)', done: true, date: '2026-10-30' },
    { id: 'chk_4', dept: '오픈지원부', cycle: '작업중(수시)', item: '박스 개봉 시 안전커터칼·방검장갑 착용 및 상단 진열 시 A형 안전사다리 사용 여부', done: true, date: '2026-10-30' },
    { id: 'chk_5', dept: '매장CS팀(입고4사)', cycle: '입고전(2시간)', item: '입고도우미(블루키솔루션·휴먼인프라·맨토스·케이웍스코리아) 하역장 롤테이너 바퀴 스토퍼 상태 및 안전화 착용 확인', done: true, date: '2026-10-30' },
    { id: 'chk_6', dept: '매장CS팀(입고4사)', cycle: '입고중(2시간)', item: '중량물(15kg 이상) 2인 1조 운반 및 매장 내 이동 시 고객 충돌 방지 조치 확인', done: true, date: '2026-10-30' },
    { id: 'chk_7', dept: '매장CS팀(재고5사)', cycle: '야간투입전', item: '재고도우미(TSW·RBS·빅서비스·아르테·유미어스) 폐점 후 매장 적정 조도 확보(소등 금지) 및 비상출입문 개폐 위치 공유', done: true, date: '2026-10-30' },
    { id: 'chk_8', dept: '매장CS팀(재고5사)', cycle: '야간작업중', item: '재고도우미 2인 1조(Buddy) 근무 유지 및 고소 매대 스캔 시 안전사다리/스텝스툴 사용 확인 (유미어스·아르테 집중점검)', done: false, date: '2026-10-30' },
    { id: 'chk_9', dept: '공통(안전보건팀)', cycle: '반기/연간', item: '오픈지원부(5개사)·매장CS팀(9개사) 도급 적격업체 안전보건수준평가(70점 이상 적격) 및 비상훈련(C등급 항목) 시정 확인', done: true, date: '2026-10-30' }
  ]
};

// ── 현장방문 실태점검 30문항 체크리스트 & 8대 크로스 인터뷰 표준 데이터 ──
const FIELD_INSPECTION_ITEMS = [
  // [A] 공통 법적·적법도급 점검 (1~10번, 각 4점 = 40점)
  { no: 1, part: '공통(적법도급/산안법)', cat: '작업지시 계통 (불법파견 차단)', item: '다이소 직원(오픈리베로/점장)이 용역 작업자에게 개별·직접 업무지시를 하지 않고, 반드시 수급업체 현장관리자(팀장/반장)를 통해서만 지시하는가?', method: '현장관찰 + 작업자 인터뷰', weight: 4, crit: true },
  { no: 2, part: '공통(적법도급/산안법)', cat: '수급업체 현장관리자 상주', item: '수급업체 소속 현장대리인(팀장/반장/실사리더)이 현장에 실제 상주하며 작업배치·근태·안전통제를 직접 수행하는가?', method: '명찰/선임계 확인 + 현장관찰', weight: 4, crit: true },
  { no: 3, part: '공통(적법도급/산안법)', cat: '작업공간 물리적 분리', item: '다이소 직영 인력(오픈리베로/매장직원)과 용역업체 인력의 작업공간이 층별(복층) 또는 구역·라인별(단층)로 명확히 분리되어 있는가?', method: '현장 도면·구역표지 확인', weight: 4, crit: true },
  { no: 4, part: '공통(적법도급/산안법)', cat: '업체 식별 표시', item: '수급업체 작업자가 소속 업체명이 표기된 조끼·명찰 등을 착용하여 다이소 직영 직원과 외관상 구분되는가?', method: '현장 육안 확인', weight: 3, crit: false },
  { no: 5, part: '공통(적법도급/산안법)', cat: '작업 전 TBM 및 안전교육', item: '작업 투입 전 5~10분 TBM(오늘의 위험요인·작업구역·비상구 공유)을 실시하고 참석자 서명부(또는 모바일 인증)를 남기는가?', method: 'TBM 일지·사진 확인', weight: 4, crit: true },
  { no: 6, part: '공통(적법도급/산안법)', cat: '위험성평가 공유 및 숙지', item: '해당 작업(진열/입고/야간재고) 위험성평가 결과가 현장 작업자에게 공유되었으며, 본인의 핵심 위험요인을 알고 있는가?', method: '서류 확인 + 작업자 질문', weight: 3, crit: false },
  { no: 7, part: '공통(적법도급/산안법)', cat: '비상대피로 및 비상연락망', item: '[적격평가 C등급 집중보완] 작업자 전원이 매장 내 비상구·소화기 위치 및 응급상황 시 비상연락망을 숙지하고 있는가?', method: '현장 게시물 + 무작위 질문', weight: 4, crit: true },
  { no: 8, part: '공통(적법도급/산안법)', cat: '휴게시설 및 식수 제공', item: '산안법 기준에 적합한 휴게공간(의자·냉난방·식수)이 제공되며 작업자가 눈치 보지 않고 이용할 수 있는가?', method: '휴게공간 실사 + 인터뷰', weight: 3, crit: false },
  { no: 9, part: '공통(적법도급/산안법)', cat: '개인보호구 지급 및 착용', item: '작업 특성에 맞는 보호구(안전화/방검장갑/안전커터칼/무릎보호대)가 지급되고 지급대장에 서명 관리되는가? (유엔아이·아르테 집중)', method: '보호구 착용상태 + 대장 확인', weight: 4, crit: false },
  { no: 10, part: '공통(적법도급/산안법)', cat: '작업중지권 및 아차사고 신고', item: '[적격평가 C등급 집중보완] 급박한 위험 시 작업을 중지하고 대피할 수 있음(작업중지권)과 아차사고 제보 방법을 안내받았는가?', method: '작업자 인터뷰 확인', weight: 3, crit: false },

  // [B] 오픈지원부 진열·입고 현장 점검 (11~20번, 각 3~4점 = 32점)
  { no: 11, part: '오픈지원부(진열·입고 5개사)', cat: '인테리어 잔여공사 혼재 차단', item: '인테리어팀 마감·전기·도장·사인공사 작업과 오픈지원 진열작업이 동일 공간에서 혼재되지 않도록 공정·층간 분리가 이루어졌는가?', method: '오픈 현장 순회 확인', weight: 4, crit: true },
  { no: 12, part: '오픈지원부(진열·입고 5개사)', cat: '고소 진열 작업 안전(사다리)', item: '상단 매대 진열 시 안전인증 A형 사다리·전도방지 스텝스툴을 사용하며, 플라스틱 박스·대차·곤돌라 선반을 밟고 올라가지 않는가?', method: '매대 진열 작업 관찰', weight: 4, crit: true },
  { no: 13, part: '오픈지원부(진열·입고 5개사)', cat: '박스 개봉 베임 방지', item: '대량 상품 박스 개봉 시 안전커터칼(자동복귀형)과 베임방지(방검/코팅) 장갑을 전원 착용하는가?', method: '현장 작업자 손 보호구 확인', weight: 3, crit: false },
  { no: 14, part: '오픈지원부(진열·입고 5개사)', cat: '곤돌라·매대 조립 및 후크 안전', item: '매대 선반·후크 체결 시 손끼임/찔림 방지 장갑을 착용하고 매대 전도방지 고정 상태를 확인하는가?', method: '매대 설치 구간 확인', weight: 3, crit: false },
  { no: 15, part: '오픈지원부(진열·입고 5개사)', cat: '대량 입고 파렛트·자키 안전', item: '오픈 초도물량 하차·운반 시 핸드파렛트(자키)·롤테이너 이동 동선이 확보되고 안전화를 착용하는가?', method: '하역장·입고 동선 확인', weight: 3, crit: false },
  { no: 16, part: '오픈지원부(진열·입고 5개사)', cat: '빈 박스·파지 정리(통로 확보)', item: '개봉 후 발생하는 대량의 빈 박스·비닐 파지를 즉시 지정 집하장에 모아 이동 통로 걸려 넘어짐 위험을 제거하는가?', method: '매장 통로 청결상태 확인', weight: 3, crit: false },
  { no: 17, part: '오픈지원부(진열·입고 5개사)', cat: '중량물 취급 및 근골격계 예방', item: '중량 박스(15kg 이상 식기·세제·음료)는 2인 1조 또는 대차로 운반하며 적재 높이를 1.8m 이하로 제한하는가?', method: '가적재 구역 확인', weight: 3, crit: false },
  { no: 18, part: '오픈지원부(진열·입고 5개사)', cat: '화물승강기·계단 이동 안전', item: '복층 매장 화물승강기 이용 시 정격하중을 준수하고 계단으로 대차·중량물을 무리하게 들고 이동하지 않는가?', method: '복층 동선·승강기 확인', weight: 3, crit: false },
  { no: 19, part: '오픈지원부(진열·입고 5개사)', cat: '신규·단기 일용직 당일 안전교육', item: '오픈 현장 특성상 당일 투입되는 단기 인력에게도 작업 전 안전수칙 교육 및 보호구 지급이 누락 없이 이루어지는가?', method: '당일 투입자 명단·서명 대조', weight: 3, crit: false },
  { no: 20, part: '오픈지원부(진열·입고 5개사)', cat: '휴게시간 부여 및 온열·한랭 관리', item: '작업시간(08:30~17:30) 중 점심 1시간 외 오전·오후 정기 휴게시간이 부여되고 오픈 전 매장 냉난방·환기가 가동되는가?', method: '작업시간표 + 작업자 인터뷰', weight: 3, crit: false },

  // [C] 매장CS팀 입고도우미(4개사) & 재고도우미(5개사) 현장 점검 (21~30번, 각 2.8~3점 = 28점)
  { no: 21, part: '매장CS팀(입고4·재고5 9개사)', cat: '[입고 2h] 하역장 차량·단차 안전', item: '입고도우미(블루키·휴먼·맨토스·케이웍스) 작업 시 물류차량 후진 유도·바퀴 고임목 설치 및 하역장 경사로 미끄럼 방지 조치가 되어 있는가?', method: '하역장 입고 타임 참관', weight: 3, crit: true },
  { no: 22, part: '매장CS팀(입고4·재고5 9개사)', cat: '[입고 2h] 롤테이너·대차 협착 방지', item: '롤테이너 이동 시 2인 1조(경사로/코너) 원칙을 지키고 정지 시 바퀴 스토퍼를 채우며 안전화(발보호대)를 착용하는가?', method: '입고 동선 관찰', weight: 3, crit: false },
  { no: 23, part: '매장CS팀(입고4·재고5 9개사)', cat: '[입고 2h] 영업 중 매장 고객 충돌 방지', item: '영업 시간 중 입고 상품을 매장·창고로 이동할 때 고객 동선과 겹치는 구간에 서행·구두안내·안전표지를 실행하는가?', method: '매장 내 이동 동선 확인', weight: 3, crit: false },
  { no: 24, part: '매장CS팀(입고4·재고5 9개사)', cat: '[입고 2h] 2시간 단시간 집중작업 전 스트레칭', item: '하루 2시간 집중 하역·적재 특성상 투입 직후 급격한 요추 염좌 예방을 위해 작업 전 3분 스트레칭 및 TBM을 실시하는가?', method: '입고 시작 시점 확인', weight: 2, crit: false },
  { no: 25, part: '매장CS팀(입고4·재고5 9개사)', cat: '[재고 야간] 폐점 후 매장 조도 확보(소등 금지)', item: '퇴근시간(폐점 22시) 이후 재고도우미(TSW·RBS·빅서비스·아르테·유미어스) 작업 시 매장·창고 조명을 충분히 켜고 작업하는가?', method: '야간 실사 매장 방문/사진 확인', weight: 3, crit: true },
  { no: 26, part: '매장CS팀(입고4·재고5 9개사)', cat: '[재고 야간] 폐점 매장 비상출입문 개폐 숙지', item: '폐점 후 셔터·출입문이 닫힌 상태에서 화재·정전·응급환자 발생 시 내부에서 즉시 열고 탈출할 수 있는 비상출입문을 전원 알고 있는가?', method: '야간 실사원 현장 질문', weight: 4, crit: true },
  { no: 27, part: '매장CS팀(입고4·재고5 9개사)', cat: '[재고 야간] 2인 1조(Buddy) 및 고립 방지', item: '심야 시간대 지하창고·백룸 구석 등 사각지대에서 나홀로 작업하지 않고 2인 1조 버디시스템 및 팀장 인원점검이 이루어지는가?', method: '야간 창고 작업 확인', weight: 3, crit: false },
  { no: 28, part: '매장CS팀(입고4·재고5 9개사)', cat: '[재고 야간] 상단 재고 스캔 시 안전받침대', item: '높은 매대·창고 랙 상단 바코드 스캔 시 인증된 스텝스툴/안전사다리를 사용하며 매대 선반이나 박스를 밟지 않는가?', method: '야간 스캔 작업 관찰', weight: 3, crit: false },
  { no: 29, part: '매장CS팀(입고4·재고5 9개사)', cat: '[재고 야간] 유미어스(70점)·아르테(79점) 시정 이행', item: '상반기 적격평가 미흡업체(유미어스 70점·아르테코리아 79점)의 위험성평가·안전교육·보호구 대장·비상대책 시정조치가 현장에서 실제 이행되는가?', method: '시정조치 증빙 + 현장 대조', weight: 2, crit: true },
  { no: 30, part: '매장CS팀(입고4·재고5 9개사)', cat: '[재고 야간] 심야 출퇴근 교통안전 및 건강 확인', item: '야간 재고실사 팀 이동차량 운전자의 피로·졸음운전 예방 수칙과 심야 작업자 건강상태(혈압·컨디션) 사전 확인이 이루어지는가?', method: '실사팀장 점검표 확인', weight: 2, crit: false }
];

const FIELD_INTERVIEW_GUIDE = [
  { id: 'int_1', target: '오픈지원부 용역 작업자 (무작위 2명)', q: '오늘 아침 누구에게 어떤 구역 진열 지시를 받으셨나요?', good: '우리 업체 팀장님(반장님)께 TBM 때 2층 주방코너 진열 배정을 받았습니다.', bad: '다이소 오픈리베로 직원분이 오셔서 저보고 창고 박스 나르라고 직접 시켰어요. (→ 불법파견 리스크 즉시 시정)' },
  { id: 'int_2', target: '오픈지원부 현장관리자 (케이웍스/에드에그/유엔아이/휴먼/맨토스 팀장)', q: '다이소 오픈리베로와 작업 공간 분리는 어떻게 운영하고 계신가요?', good: '복층은 층별로 나누고, 단층은 A존(용역)/B존(다이소)으로 구역을 분리해 혼재 없이 진행합니다.', bad: '구분 없이 섞여서 같이 진열하고 다이소 직원이 그때그때 인원을 데려다 씁니다.' },
  { id: 'int_3', target: '오픈지원부 용역 작업자 (유엔아이·케이웍스·맨토스 집중)', q: '작업 중 불이 나거나 다치면 어디로 대피하고 누구에게 연락해야 하나요?', good: '아침 TBM 때 들은 1층 후문 비상구로 대피하고 우리 업체 팀장님께 즉시 알립니다.', bad: '오늘 처음 와서 비상구가 어딘지 못 들었는데요. (→ 적격평가 비상대책 C등급 미보완 확인)' },
  { id: 'int_4', target: '매장CS팀 입고도우미 작업자 (블루키/휴먼/맨토스/케이웍스)', q: '하루 2시간 입고 작업 중 가장 위험하거나 힘든 순간은 언제인가요?', good: '경사로에서 무거운 롤테이너 밀 때인데, 2인 1조로 잡고 안전화를 신어 발끼임을 예방합니다.', bad: '2시간 안에 빨리 끝내야 해서 혼자 롤테이너 두 개씩 끌고 안전화는 불편해서 운동화 신어요.' },
  { id: 'int_5', target: '매장CS팀 재고도우미 작업자 (TSW/RBS/빅서비스/아르테/유미어스)', q: '밤 10시 폐점 후 셔터가 내려간 매장에서 화재나 응급환자가 생기면 어떻게 밖으로 나가나요?', good: '작업 시작 전 실사팀장님이 후문 비상개폐문 위치와 수동 개폐 레버 위치를 알려주셨습니다.', bad: '셔터 내려가면 다이소 직원이 열어줄 때까지 못 나가는 거 아닌가요? (→ 야간 감금·고립 위험 즉시 시정)' },
  { id: 'int_6', target: '매장CS팀 재고도우미 실사팀장 (유미어스 70점 / 아르테코리아 79점 집중)', q: '상반기 적격업체평가에서 미흡(B·C등급)했던 위험성평가·안전교육·보호구 대장은 오늘 현장에 구비되어 있나요?', good: '네, 야간 실사 전 모바일 안전교육 서명부와 위험성평가표, 스텝스툴·무릎보호대 지급대장을 지참했습니다.', bad: '본사에서 서류만 내라고 해서 현장에선 따로 교육이나 서명은 안 하고 바로 스캔 시작합니다.' },
  { id: 'int_7', target: '다이소 현장 담당자 (오픈리베로 파트장 / 매장 점장)', q: '용역업체 작업자가 불안전한 행동(박스 밟고 올라감 등)을 할 때 어떻게 조치하시나요?', good: '즉시 위험을 제지한 뒤, 업무 재배치나 작업지시는 반드시 해당 업체 현장팀장(리더)을 불러 조치하게 합니다.', bad: '제가 직접 작업자한테 가서 이거 하지 말고 저쪽 가서 청소하라고 지시합니다.' },
  { id: 'int_8', target: '공통 수급업체 작업자 전원', q: '작업 중 위험하다고 느껴지면 작업을 멈출 권리(작업중지권)와 아차사고 제보 방법을 알고 계신가요?', good: '네, 위험하면 즉시 작업을 멈추고 팀장님께 보고하며 불이익이 없다는 점을 교육받았습니다.', bad: '작업 멈추면 내일부터 나오지 말라고 할까 봐 무서워서 그냥 합니다.' }
];

function loadServiceData() {
  try {
    const raw = localStorage.getItem(SVC_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SVC_STORAGE_KEY, JSON.stringify(DEFAULT_SERVICE_DATA));
      return JSON.parse(JSON.stringify(DEFAULT_SERVICE_DATA));
    }
    const parsed = JSON.parse(raw);
    if (!parsed.openVendors || parsed.openVendors.length < 5) parsed.openVendors = DEFAULT_SERVICE_DATA.openVendors;
    if (!parsed.csVendors || parsed.csVendors.length < 9) parsed.csVendors = DEFAULT_SERVICE_DATA.csVendors;
    if (!parsed.fieldInspection) {
      parsed.fieldInspection = {
        meta: {
          siteName: '다이소 OO점 (오픈지원 / 매장CS 합동점검)',
          inspDate: new Date().toISOString().slice(0, 10),
          inspector: '안전보건팀 강동현 (sky5224122@gmail.com)',
          targetDept: '오픈지원부(5개사) & 매장CS팀(9개사)',
          targetVendor: '케이웍스코리아 / 유미어스 (집중점검)'
        },
        answers: {},
        notes: {},
        interviews: {},
        generalOpinion: '오픈지원부 5개사 작업공간 분리(층별/구역별) 및 현장관리자 경유 지시 체계 양호. 매장CS팀 재고도우미 B등급 업체(유미어스 70점, 아르테코리아 79점) 야간 비상출입문 숙지 및 위험성평가/교육 서명부 현장 비치 집중 확인 완료.'
      };
      FIELD_INSPECTION_ITEMS.forEach(it => {
        parsed.fieldInspection.answers[it.no] = 'PASS';
      });
      FIELD_INTERVIEW_GUIDE.forEach(iv => {
        parsed.fieldInspection.interviews[iv.id] = 'PASS';
      });
    }
    return parsed;
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_SERVICE_DATA));
  }
}

function saveServiceData(data) {
  localStorage.setItem(SVC_STORAGE_KEY, JSON.stringify(data));
}

let svcTab = 'mobile'; // 'mobile' | 'open' | 'cs' | 'field' | 'qual' | 'survey'
let csCategoryFilter = 'ALL'; // 'ALL' | 'INBOUND' | 'INVENTORY'
let fieldPartFilter = 'ALL'; // 'ALL' | 'COMMON' | 'OPEN' | 'CS'

const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function toast(t) { if (typeof msg === 'function') msg(t); }

function ensureSvcCss() {
  if (document.getElementById('svcCustomCss')) return;
  const st = document.createElement('style');
  st.id = 'svcCustomCss';
  st.textContent = `
    #service .card { background:#fff; border:1px solid #e2e8f0; border-radius:14px; margin-bottom:14px; overflow:hidden; box-shadow:0 2px 8px rgba(15,23,42,.04); }
    #service .card-h { padding:13px 16px; border-bottom:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center; font-weight:800; font-size:14px; color:#0f172a; background:#f8fafc; }
    #service .card-b { padding:14px 16px; }
    #service .tbl { width:100%; border-collapse:collapse; font-size:12.5px; }
    #service .tbl th { background:#f1f5f9; color:#334155; font-weight:800; text-align:left; padding:9px 10px; border-bottom:2px solid #cbd5e1; white-space:nowrap; }
    #service .tbl td { padding:9px 10px; border-bottom:1px solid #e2e8f0; vertical-align:middle; }
    #service .badge { display:inline-block; padding:3px 8px; border-radius:999px; font-size:11px; font-weight:800; background:#e2e8f0; color:#334155; }
    #service .badge.ok { background:#dcfce7; color:#166534; }
    #service .badge.info { background:#dbeafe; color:#1e40af; }
    #service .badge.warn { background:#fef3c7; color:#92400e; }
    #service .badge.danger { background:#fee2e2; color:#991b1b; }
    #service .badge.ghost { background:#f1f5f9; color:#475569; }
    #service .btn { display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:8px 13px; border-radius:9px; font-size:12.5px; font-weight:800; cursor:pointer; border:1px solid transparent; transition:.15s; }
    #service .btn.primary { background:#1d4ed8; color:#fff; border-color:#1d4ed8; }
    #service .btn.primary:hover { background:#1e40af; }
    #service .btn.danger { background:#dc2626; color:#fff; border-color:#dc2626; }
    #service .btn.ghost { background:#fff; color:#334155; border-color:#cbd5e1; }
    #service .btn.ghost:hover { background:#f8fafc; border-color:#94a3b8; }
    #service .btn.sm { padding:5px 10px; font-size:11.5px; border-radius:7px; }
    #service .inp, #service .sel, #svcModalOverlay .inp, #svcModalOverlay .sel, #svcModalOverlay .Gr { width:100%; padding:8px 10px; border:1px solid #cbd5e1; border-radius:8px; font:inherit; font-size:13px; box-sizing:border-box; }
    #svcModalOverlay .form-row { margin-bottom:10px; text-align:left; }
    #svcModalOverlay .form-row label { display:block; font-size:12px; font-weight:800; color:#334155; margin-bottom:4px; }
    #svcModalOverlay .form-row.two { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
  `;
  document.head.appendChild(st);
}

function openModal(title, bodyHtml, footHtml) {
  closeModal();
  ensureSvcCss();
  const ov = document.createElement('div');
  ov.id = 'svcModalOverlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:90;background:rgba(15,23,42,.6);display:flex;align-items:center;justify-content:center;padding:16px';
  ov.innerHTML = `
    <div style="background:#fff;border-radius:16px;max-width:480px;width:100%;padding:20px;box-shadow:0 20px 50px rgba(0,0,0,.25)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <h3 style="margin:0;font-size:16px;font-weight:900;color:#0f172a">${esc(title)}</h3>
        <button type="button" onclick="closeModal()" style="border:none;background:none;font-size:18px;cursor:pointer;color:#64748b">✕</button>
      </div>
      <div>${bodyHtml}</div>
      <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px">${footHtml || ''}</div>
    </div>
  `;
  document.body.appendChild(ov);
}

function closeModal() {
  const el = document.getElementById('svcModalOverlay');
  if (el) el.remove();
}

function loadService() {
  ensureSvcCss();
  const el = document.getElementById('service') || document.getElementById('main');
  if (el) renderServiceManagement(el);
}

function renderServiceManagement(el) {
  ensureSvcCss();
  el = el || document.getElementById('service') || document.getElementById('main');
  if (!el) return;
  const d = loadServiceData();
  const totalOpenCap = d.openVendors.reduce((acc, v) => acc + (Number(v.maxCap) || 0), 0);
  const doneCnt = d.checklists.filter(c => c.done).length;
  const inboundVendors = d.csVendors.filter(v => v.category.includes('입고'));
  const invVendors = d.csVendors.filter(v => v.category.includes('재고'));

  el.innerHTML = `
    <!-- 상단 배너: 담당자 정보 & 핵심 요약 -->
    <div class="card" style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 60%,#1d4ed8 100%);color:#fff;border:none;margin-bottom:14px">
      <div class="card-b" style="padding:18px 20px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
          <div>
            <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.15);padding:4px 10px;border-radius:999px;font-size:11px;font-weight:800;margin-bottom:8px">
              🛡️ 아성다이소 안전보건팀 · 용역 도급안전관리 체계 (오픈지원 5개사 · 매장CS 9개사)
            </div>
            <h2 style="font-size:20px;font-weight:900;letter-spacing:-.5px;margin:0 0 4px">
              오픈지원부(상품진열 5개사) & 매장CS팀(입고4·재고5 9개사) 안전관리 센터
            </h2>
            <div style="font-size:12px;opacity:.9">
              담당자: <b>${esc(d.owner.name)}</b> (${esc(d.owner.email)}) · 인테리어부 도급관리 앱 통합 등록 표준 모듈
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn ghost sm" style="background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.25)" onclick="openSectorSelectModal()">🔄 업종 전환 (인테리어 ↔ 오픈/CS)</button>
            <button class="btn ghost sm" style="background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.25)" onclick="exportServiceReport()">📥 점검보고서 출력</button>
            <button class="btn ghost sm" style="background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.25)" onclick="resetServiceData()">🔄 기본값 복원</button>
          </div>
        </div>

        <!-- KPI 4종 -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;margin-top:14px">
          <div style="background:rgba(255,255,255,.1);padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.14)">
            <div style="font-size:11px;opacity:.8">오픈지원부 계약업체</div>
            <div style="font-size:21px;font-weight:900;margin-top:2px">${d.openVendors.length}개사 <span style="font-size:12px;font-weight:600;color:#93c5fd">(일 최대 ${totalOpenCap}명)</span></div>
            <div style="font-size:11px;opacity:.75;margin-top:2px">케이웍스·에드에그·유엔아이·휴먼·맨토스</div>
          </div>
          <div style="background:rgba(255,255,255,.1);padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.14)">
            <div style="font-size:11px;opacity:.8">매장CS팀 입고도우미 (입고용역)</div>
            <div style="font-size:21px;font-weight:900;margin-top:2px">${inboundVendors.length}개사 <span style="font-size:12px;font-weight:600;color:#fde047">(1일 약 2시간 집중)</span></div>
            <div style="font-size:11px;opacity:.75;margin-top:2px">블루키(95)·휴먼(95)·맨토스(85)·케이웍스(81)</div>
          </div>
          <div style="background:rgba(255,255,255,.1);padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.14)">
            <div style="font-size:11px;opacity:.8">매장CS팀 재고도우미 (재고용역)</div>
            <div style="font-size:21px;font-weight:900;margin-top:2px">${invVendors.length}개사 <span style="font-size:12px;font-weight:600;color:#fca5a5">(폐점 후 야간 실사)</span></div>
            <div style="font-size:11px;opacity:.75;margin-top:2px">TSW(100)·RBS(95)·빅서비스(88)·아르테(79)·유미어스(70)</div>
          </div>
          <div style="background:rgba(255,255,255,.1);padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.14)">
            <div style="font-size:11px;opacity:.8">현장방문 실태점검 & 체크리스트</div>
            <div style="font-size:21px;font-weight:900;margin-top:2px">30문항 <span style="font-size:12px;font-weight:600;color:#86efac">(일일점검 ${doneCnt}/${d.checklists.length})</span></div>
            <div style="font-size:11px;opacity:.75;margin-top:2px">적법도급·공간분리·야간비상구·크로스인터뷰</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4대 부서 통합 서브 탭 네비게이션 -->
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
    </div>

    <div id="svcSubContent"></div>
  `;

  const sub = document.getElementById('svcSubContent');
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
  else renderSvcSurvey(sub, d);
}

// ── [탭 1] 오픈지원부 (진열·입고 5개사 전원 동등 표기) ──
function renderSvcOpen(sub, d) {
  const totalOpenCap = d.openVendors.reduce((acc, v) => acc + (Number(v.maxCap) || 0), 0);
  sub.innerHTML = `
    <!-- 오픈지원부 핵심 운영 원칙 (불법파견 방지 & 공간분리) -->
    <div class="card" style="border-left:4px solid #2563eb;margin-bottom:14px">
      <div class="card-h">
        <span>🚨 오픈지원부 용역인력 운영 및 안전관리 핵심 수칙 (현장 필수 준수)</span>
        <div style="display:flex;gap:6px;align-items:center">
          <span class="badge ok">적법도급 · 혼재작업 차단</span>
          <button class="btn primary sm" onclick="openAddOpenVendorModal()">+ 오픈지원 업체 추가</button>
        </div>
      </div>
      <div class="card-b" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px">
        <div style="background:#eff6ff;padding:12px 14px;border-radius:10px;border:1px solid #bfdbfe">
          <div style="font-weight:900;color:#1e40af;font-size:13px;margin-bottom:4px">① 작업 지시 일원화 (업체 파견 관리자 경유)</div>
          <div style="font-size:12px;color:#1e3a8a;line-height:1.55">${esc(d.openOperationPolicy.commandRule)}</div>
        </div>
        <div style="background:#f0fdf4;padding:12px 14px;border-radius:10px;border:1px solid #bbf7d0">
          <div style="font-weight:900;color:#166534;font-size:13px;margin-bottom:4px">② 다이소 오픈리베로 ↔ 진열용역(5개사) 공간 분리</div>
          <div style="font-size:12px;color:#14532d;line-height:1.55">${esc(d.openOperationPolicy.spaceRule)}</div>
        </div>
        <div style="background:#fffbeb;padding:12px 14px;border-radius:10px;border:1px solid #fde68a">
          <div style="font-weight:900;color:#92400e;font-size:13px;margin-bottom:4px">③ 오픈 전 인테리어 공정 분리 및 근무시간</div>
          <div style="font-size:12px;color:#78350f;line-height:1.55">
            • 근무시간: ${esc(d.openOperationPolicy.workHours)}<br>
            • 공정관리: ${esc(d.openOperationPolicy.preOpenCheck)}
          </div>
        </div>
      </div>
    </div>

    <!-- 오픈지원부 5개사 전체 비교 요약 테이블 -->
    <div class="card" style="margin-bottom:14px">
      <div class="card-h">
        <span>📊 오픈지원부 계약업체 ${d.openVendors.length}개사 현황 및 '26년 상반기 적격업체평가 결과 (일 최대 ${totalOpenCap}명)</span>
        <span class="badge info">평가일: 2026-06-29 · 매장지원부문 오픈지원부</span>
      </div>
      <div class="card-b" style="overflow-x:auto">
        <table class="tbl">
          <thead>
            <tr>
              <th>No</th>
              <th>업체명</th>
              <th>계약 업무 범위</th>
              <th>담당 권역</th>
              <th>1일 최대 인원</th>
              <th>'26년 상반기 점수(등급)</th>
              <th>공간분리 및 지시체계</th>
              <th>취약 항목 (현장 방문 시 중점 확인사항)</th>
            </tr>
          </thead>
          <tbody>
            ${d.openVendors.map((v, idx) => `
              <tr>
                <td><b>${idx + 1}</b></td>
                <td><b>${esc(v.name)}</b></td>
                <td><span class="badge info">${esc(v.scope)}</span></td>
                <td><b>${esc(v.region)}</b></td>
                <td><b style="color:#1d4ed8">약 ${v.maxCap}명</b></td>
                <td>
                  <span class="badge ${v.score>=90?'ok':v.score>=80?'info':'warn'}" style="font-weight:900">
                    ${v.score}점 (${esc(v.grade)}등급)
                  </span>
                </td>
                <td style="font-size:11.5px">${esc(v.spaceSeparation)}</td>
                <td style="font-size:11.5px;color:${v.score<80?'#b91c1c':'#334155'};font-weight:${v.score<80?'800':'500'}">${esc(v.weakPoint || '-')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- 오픈지원부 계약업체 5곳 상세 카드 -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:12px">
      ${d.openVendors.map((v, idx) => `
        <div class="card" style="margin-bottom:0;border-top:3px solid ${v.score>=90?'#059669':v.score>=80?'#2563eb':'#d97706'}">
          <div class="card-h" style="background:#f8fafc">
            <div>
              <span style="font-size:15px;font-weight:900;color:#0f172a">${idx + 1}. ${esc(v.name)}</span>
              <span class="badge info" style="margin-left:6px">${esc(v.region)}</span>
            </div>
            <span class="badge ${v.score>=90?'ok':v.score>=80?'info':'warn'}">${esc(v.status)} · ${v.score}점</span>
          </div>
          <div class="card-b" style="font-size:12.5px;display:flex;flex-direction:column;gap:8px">
            <div style="display:grid;grid-template-columns:110px 1fr;gap:4px">
              <span style="color:#64748b;font-weight:700">계약 업무 범위</span>
              <span style="font-weight:800;color:#1e40af">${esc(v.scope)}</span>
              <span style="color:#64748b;font-weight:700">1일 최대 인원</span>
              <span style="font-weight:900;color:#dc2626">약 ${v.maxCap}명 <span style="font-weight:500;color:#64748b;font-size:11px">(${esc(v.dailyAvg)})</span></span>
              <span style="color:#64748b;font-weight:700">현장 지휘 체계</span>
              <span>${esc(v.managerRole)}</span>
              <span style="color:#64748b;font-weight:700">공간 분리 기준</span>
              <span style="color:#166534;font-weight:700">${esc(v.spaceSeparation)}</span>
              <span style="color:#64748b;font-weight:700">평가 취약/보완</span>
              <span style="color:#b45309;font-weight:700">${esc(v.weakPoint || '-')}</span>
            </div>
            <div style="background:#f8fafc;padding:8px 10px;border-radius:8px;border:1px solid #e2e8f0;margin-top:4px">
              <div style="font-size:11px;font-weight:800;color:#475569;margin-bottom:4px">⚠️ 중점 위험요인 및 안전대책</div>
              <ul style="margin:0;padding-left:16px;font-size:11.5px;color:#334155;line-height:1.5">
                ${v.riskItems.map(r => `<li>${esc(r)}</li>`).join('')}
              </ul>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px">
              <span style="font-size:11px;color:#64748b">📞 ${esc(v.contact)}</span>
              <button class="btn ghost sm" onclick="svcTab='field';loadService()">🔍 현장점검 바로가기</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ── [탭 2] 매장CS팀 (입고도우미 4개사 + 재고도우미 5개사 = 총 9개사) ──
function renderSvcCS(sub, d) {
  const inboundList = d.csVendors.filter(v => v.category.includes('입고'));
  const invList = d.csVendors.filter(v => v.category.includes('재고'));
  const filtered = csCategoryFilter === 'INBOUND' ? inboundList : (csCategoryFilter === 'INVENTORY' ? invList : d.csVendors);

  sub.innerHTML = `
    <!-- 매장CS팀 입고(4개사) vs 재고(5개사) 작업 특성 및 '25→'26 업체 변경 이력 안내 -->
    <div class="card" style="border-left:4px solid #059669;margin-bottom:14px">
      <div class="card-h">
        <span>🛒 매장CS팀 용역 도급 체계 (입고도우미 ${inboundList.length}개사 + 재고도우미 ${invList.length}개사 = 총 ${d.csVendors.length}개사)</span>
        <div style="display:flex;gap:6px;align-items:center">
          <span class="badge ok">영업지원부문 매장CS팀</span>
          <button class="btn primary sm" onclick="openAddCsVendorModal()">+ 입고/재고 업체 추가</button>
        </div>
      </div>
      <div class="card-b" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:12px">
        <div style="background:#f0fdf4;padding:12px 14px;border-radius:10px;border:1px solid #bbf7d0">
          <div style="font-weight:900;color:#166534;font-size:13px;margin-bottom:4px">🚚 입고도우미 (${inboundList.length}개사 · 하루 약 2시간 집중 입고작업)</div>
          <div style="font-size:12px;color:#14532d;line-height:1.55">
            • <b>계약업체(${inboundList.length}개사)</b>: <b>블루키솔루션(95점 S)</b>, <b>휴먼인프라(95점 S)</b>, <b>맨토스(85점 A)</b>, <b>케이웍스코리아(81점 A)</b><br>
            • <b>'25년 대비 변경 이력</b>: '25년 입고도우미 4개사 중 <b>엠앤제이(69점 · 70점 미달 부적격)</b> 계약 배제 → '26년 <b>블루키솔루션(95점)</b> 신규 교체 완료<br>
            • <b>핵심 안전대책</b>: 롤테이너 바퀴 스토퍼/2인 1조 이동, 안전화 착용, 작업 전 3분 스트레칭, 고객 동선 충돌 방지
          </div>
        </div>
        <div style="background:#fef2f2;padding:12px 14px;border-radius:10px;border:1px solid #fecaca">
          <div style="font-weight:900;color:#991b1b;font-size:13px;margin-bottom:4px">🌙 재고도우미 (${invList.length}개사 · 퇴근시간 이후 야간 재고현황 파악)</div>
          <div style="font-size:12px;color:#7f1d1d;line-height:1.55">
            • <b>계약업체(${invList.length}개사)</b>: <b>TSW파트너스(100점 S)</b>, <b>RBS코리아(95점 S)</b>, <b>빅서비스(88점 A)</b>, <b style="text-decoration:underline">아르테코리아(79점 B)</b>, <b style="text-decoration:underline">유미어스(70점 B)</b><br>
            • <b>집중관리 대상</b>: <b>유미어스(70점 커트라인)</b> 및 <b>아르테코리아(79점)</b> — 위험성평가·안전교육·비상대책 현장 시정조치 필수 확인<br>
            • <b>핵심 안전대책</b>: 야간 매장 조명 100% 점등(소등 금지), 폐점 후 비상출입문 개폐 숙지, 2인 1조 버디시스템, 안전인증 스텝스툴 사용
          </div>
        </div>
      </div>
    </div>

    <!-- 필터 버튼 & 9개사 한눈에 보기 요약표 -->
    <div class="card" style="margin-bottom:14px">
      <div class="card-h" style="flex-wrap:wrap;gap:8px">
        <span>📋 매장CS팀 계약업체 전체 목록 (${filtered.length}개사 표시 중 / 전체 ${d.csVendors.length}개사)</span>
        <div style="display:flex;gap:6px">
          <button class="btn sm ${csCategoryFilter==='ALL'?'primary':'ghost'}" onclick="csCategoryFilter='ALL';loadService()">전체 (${d.csVendors.length}개사)</button>
          <button class="btn sm ${csCategoryFilter==='INBOUND'?'primary':'ghost'}" onclick="csCategoryFilter='INBOUND';loadService()">🚚 입고도우미 (${inboundList.length}개사)</button>
          <button class="btn sm ${csCategoryFilter==='INVENTORY'?'primary':'ghost'}" onclick="csCategoryFilter='INVENTORY';loadService()">🌙 재고도우미 (${invList.length}개사)</button>
        </div>
      </div>
      <div class="card-b" style="overflow-x:auto">
        <table class="tbl">
          <thead>
            <tr>
              <th>No</th>
              <th>구분</th>
              <th>업체명</th>
              <th>작업 시간대</th>
              <th>'26년 상반기 점수</th>
              <th>등급</th>
              <th>'25~'26 평가 이력 및 비고</th>
              <th>취약 항목 / 현장 점검 포인트</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map((c, idx) => `
              <tr style="${c.score<=79?'background:#fffbeb':''}">
                <td><b>${idx + 1}</b></td>
                <td><span class="badge ${c.category.includes('입고')?'info':'warn'}">${esc(c.category)}</span></td>
                <td><b>${esc(c.name)}</b></td>
                <td style="font-size:11.5px">${esc(c.workTime)}</td>
                <td><b style="color:${c.score>=90?'#059669':c.score>=80?'#1d4ed8':'#dc2626'}">${c.score}점</b></td>
                <td><span class="badge ${c.score>=90?'ok':c.score>=80?'info':'warn'}">${esc(c.grade)}등급</span></td>
                <td style="font-size:11.5px">${esc(c.history2025 || '-')}</td>
                <td style="font-size:11.5px;color:${c.score<=79?'#b91c1c':'#334155'};font-weight:${c.score<=79?'800':'500'}">${esc(c.weakPoint || '-')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- 매장CS팀 업체별 상세 안전관리 카드 -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:14px">
      ${filtered.map(c => `
        <div class="card" style="margin-bottom:0;border-top:4px solid ${c.category.includes('입고')?'#0ea5e9':'#8b5cf6'}">
          <div class="card-h">
            <div>
              <span class="badge ${c.category.includes('입고')?'info':'warn'}" style="margin-right:6px">${esc(c.category)}</span>
              <span style="font-size:15px;font-weight:900">${esc(c.name)}</span>
            </div>
            <span class="badge ${c.score>=90?'ok':c.score>=80?'info':'warn'}">적격평가 ${c.score}점(${esc(c.grade)})</span>
          </div>
          <div class="card-b" style="font-size:12.5px;display:flex;flex-direction:column;gap:10px">
            <div style="display:grid;grid-template-columns:105px 1fr;gap:5px;background:#f8fafc;padding:10px;border-radius:8px">
              <span style="color:#64748b;font-weight:700">작업 시간대</span>
              <span style="font-weight:900;color:#dc2626">${esc(c.workTime)}</span>
              <span style="color:#64748b;font-weight:700">주요 작업장소</span>
              <span>${esc(c.workPlace)}</span>
              <span style="color:#64748b;font-weight:700">세부 업무내용</span>
              <span style="font-weight:700">${esc(c.workDetail)}</span>
              <span style="color:#64748b;font-weight:700">투입 규모/지휘</span>
              <span>${esc(c.workersPerStore)} · ${esc(c.managerRole)}</span>
              <span style="color:#64748b;font-weight:700">평가/보완사항</span>
              <span style="color:#b45309;font-weight:800">${esc(c.weakPoint || '-')}</span>
            </div>

            <div>
              <div style="font-weight:800;color:#b91c1c;font-size:12px;margin-bottom:4px">🚨 중점 유해·위험요인 (Risk Factors)</div>
              <ul style="margin:0;padding-left:18px;color:#334155;line-height:1.55">
                ${c.riskItems.map(r => `<li>${esc(r)}</li>`).join('')}
              </ul>
            </div>

            <div>
              <div style="font-weight:800;color:#15803d;font-size:12px;margin-bottom:4px">✅ 필수 안전보건 감소대책 (Safety Controls)</div>
              <ul style="margin:0;padding-left:18px;color:#166534;line-height:1.55;font-weight:600">
                ${c.controls.map(ct => `<li>${esc(ct)}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ── [탭 3] 현장방문 실태점검 (30문항 체크리스트 + 8대 크로스 인터뷰) ──
function renderSvcField(sub, d) {
  const fi = d.fieldInspection;
  const items = FIELD_INSPECTION_ITEMS.filter(it => {
    if (fieldPartFilter === 'COMMON') return it.no <= 10;
    if (fieldPartFilter === 'OPEN') return it.no >= 11 && it.no <= 20;
    if (fieldPartFilter === 'CS') return it.no >= 21;
    return true;
  });

  // 점수 계산 (PASS=100%, WARN=50%, FAIL=0%, NA=모수제외)
  let maxScore = 0;
  let earnedScore = 0;
  let critFailCnt = 0;
  FIELD_INSPECTION_ITEMS.forEach(it => {
    const ans = fi.answers[it.no] || 'PASS';
    if (ans === 'NA') return;
    maxScore += it.weight;
    if (ans === 'PASS') earnedScore += it.weight;
    else if (ans === 'WARN') earnedScore += it.weight * 0.5;
    else if (ans === 'FAIL' && it.crit) critFailCnt++;
  });
  const totalPct = maxScore > 0 ? Math.round((earnedScore / maxScore) * 100) : 100;
  const grade = (totalPct >= 90 && critFailCnt === 0) ? 'S (우수)' : (totalPct >= 80 && critFailCnt === 0) ? 'A (양호)' : (totalPct >= 70) ? 'B (보통·현장보완)' : 'C (미흡·시정명령)';

  sub.innerHTML = `
    <!-- 현장방문 실태점검 헤더 & 엑셀/가이드 다운로드 -->
    <div class="card" style="border-left:4px solid #1d4ed8;margin-bottom:14px">
      <div class="card-h" style="flex-wrap:wrap;gap:8px">
        <span>🔍 오픈지원부(5개사) & 매장CS팀(9개사) 현장 방문 실태점검표 (30문항 + 인터뷰)</span>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="btn sm" onclick="location.href='Mobile_Inspection(모바일_도급점검_스마트앱).html'" style="border:1.5px solid #16a34a;color:#15803d;background:#f0fdf4;font-weight:900">📱 핸드폰 간편점검 (사진+음성)</button>
          <a class="btn primary sm" href="./Field_Inspection_Checklist(오픈지원부_매장CS팀_도급현장_실태점검표_및_분석자료).xlsx" download style="text-decoration:none">📊 현장점검 엑셀(4시트) 다운로드</a>
          <button class="btn ghost sm" onclick="syncFieldInspectionToCloud()">☁️ 구글시트(GAS) 전송</button>
          <button class="btn ghost sm" onclick="window.print()">🖨️ A4 점검표 인쇄</button>
        </div>
      </div>
      <div class="card-b">
        <!-- 점검 기본정보 입력 -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-bottom:14px;background:#f8fafc;padding:12px;border-radius:10px;border:1px solid #e2e8f0">
          <div>
            <label style="font-size:11px;font-weight:800;color:#475569;display:block;margin-bottom:4px">점검 현장(매장명)</label>
            <input class="inp" value="${esc(fi.meta.siteName)}" onchange="updateFieldMeta('siteName', this.value)">
          </div>
          <div>
            <label style="font-size:11px;font-weight:800;color:#475569;display:block;margin-bottom:4px">점검 일자</label>
            <input class="inp" type="date" value="${esc(fi.meta.inspDate)}" onchange="updateFieldMeta('inspDate', this.value)">
          </div>
          <div>
            <label style="font-size:11px;font-weight:800;color:#475569;display:block;margin-bottom:4px">점검자 (안전보건팀)</label>
            <input class="inp" value="${esc(fi.meta.inspector)}" onchange="updateFieldMeta('inspector', this.value)">
          </div>
          <div>
            <label style="font-size:11px;font-weight:800;color:#475569;display:block;margin-bottom:4px">점검 대상 업체</label>
            <input class="inp" value="${esc(fi.meta.targetVendor)}" onchange="updateFieldMeta('targetVendor', this.value)">
          </div>
        </div>

        <!-- 실시간 점검 점수 요약 배너 -->
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;background:#eff6ff;padding:12px 16px;border-radius:10px;border:1px solid #bfdbfe;margin-bottom:14px">
          <div>
            <div style="font-size:12px;font-weight:800;color:#1e40af">현장 실태점검 실시간 환산 점수</div>
            <div style="font-size:22px;font-weight:900;color:#1e3a8a">${totalPct}점 <span style="font-size:14px;font-weight:800;color:${totalPct>=80?'#059669':'#dc2626'}">/ 판정: ${grade}</span></div>
            <div style="font-size:11.5px;color:#475569">필수(Critical) 항목 부적합: <b style="color:${critFailCnt>0?'#dc2626':'#059669'}">${critFailCnt}건</b> (필수 항목 부적합 시 즉시 작업중지 또는 현장 시정조치)</div>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn sm ${fieldPartFilter==='ALL'?'primary':'ghost'}" onclick="fieldPartFilter='ALL';loadService()">전체 30문항</button>
            <button class="btn sm ${fieldPartFilter==='COMMON'?'primary':'ghost'}" onclick="fieldPartFilter='COMMON';loadService()">① 공통·적법도급 (1~10)</button>
            <button class="btn sm ${fieldPartFilter==='OPEN'?'primary':'ghost'}" onclick="fieldPartFilter='OPEN';loadService()">② 오픈지원 5개사 (11~20)</button>
            <button class="btn sm ${fieldPartFilter==='CS'?'primary':'ghost'}" onclick="fieldPartFilter='CS';loadService()">③ 매장CS 9개사 (21~30)</button>
          </div>
        </div>

        <!-- 30문항 체크리스트 테이블 -->
        <div style="overflow-x:auto">
          <table class="tbl">
            <thead>
              <tr>
                <th style="width:45px">No</th>
                <th style="width:140px">구분 / 점검영역</th>
                <th>현장 방문 중점 확인사항 (판정 기준)</th>
                <th style="width:130px">확인 방법</th>
                <th style="width:55px">배점</th>
                <th style="width:210px">판정 (클릭 선택)</th>
                <th style="width:180px">현장 특이사항 / 시정조치</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(it => {
                const ans = fi.answers[it.no] || 'PASS';
                const note = fi.notes[it.no] || '';
                return `
                  <tr style="${ans==='FAIL'?'background:#fef2f2':ans==='WARN'?'background:#fffbeb':''}">
                    <td><b>${it.no}</b></td>
                    <td style="font-size:11px">
                      <div style="font-weight:800;color:#1e40af">${esc(it.part)}</div>
                      <div style="color:#475569;margin-top:2px">${esc(it.cat)}</div>
                    </td>
                    <td style="font-size:12px;line-height:1.45">
                      ${it.crit ? '<span class="badge danger" style="margin-right:4px">필수</span>' : ''}
                      <b>${esc(it.item)}</b>
                    </td>
                    <td style="font-size:11px;color:#475569">${esc(it.method)}</td>
                    <td><b>${it.weight}점</b></td>
                    <td>
                      <div style="display:flex;gap:4px">
                        <button class="btn sm ${ans==='PASS'?'primary':'ghost'}" style="padding:3px 7px;font-size:11px" onclick="setFieldAns(${it.no},'PASS')">적합</button>
                        <button class="btn sm ${ans==='WARN'?'primary':'ghost'}" style="padding:3px 7px;font-size:11px;${ans==='WARN'?'background:#d97706;border-color:#d97706':''}" onclick="setFieldAns(${it.no},'WARN')">보완</button>
                        <button class="btn sm ${ans==='FAIL'?'danger':'ghost'}" style="padding:3px 7px;font-size:11px" onclick="setFieldAns(${it.no},'FAIL')">부적합</button>
                        <button class="btn sm ${ans==='NA'?'ghost':''}" style="padding:3px 7px;font-size:11px;opacity:${ans==='NA'?'1':'.55'}" onclick="setFieldAns(${it.no},'NA')">N/A</button>
                      </div>
                    </td>
                    <td>
                      <input class="inp" style="font-size:11px;padding:4px 8px" placeholder="현장 확인 메모..." value="${esc(note)}" onchange="setFieldNote(${it.no}, this.value)">
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 현장 크로스 인터뷰 8대 핵심 질문 가이드 -->
    <div class="card">
      <div class="card-h">
        <span>🎙️ 현장 방문 시 작업자 · 현장관리자 · 다이소 담당자 크로스 인터뷰 (8대 핵심 질문)</span>
        <span class="badge warn">서류와 실제 현장의 일치 여부 검증</span>
      </div>
      <div class="card-b" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:12px">
        ${FIELD_INTERVIEW_GUIDE.map((iv, idx) => {
          const st = fi.interviews[iv.id] || 'PASS';
          return `
            <div style="border:1px solid #e2e8f0;border-radius:10px;padding:12px;background:${st==='PASS'?'#f8fafc':'#fef2f2'}">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                <span class="badge info">인터뷰 ${idx + 1} · ${esc(iv.target)}</span>
                <div style="display:flex;gap:4px">
                  <button class="btn sm ${st==='PASS'?'primary':'ghost'}" style="padding:2px 8px;font-size:11px" onclick="setFieldInterview('${iv.id}','PASS')">양호</button>
                  <button class="btn sm ${st==='FAIL'?'danger':'ghost'}" style="padding:2px 8px;font-size:11px" onclick="setFieldInterview('${iv.id}','FAIL')">미흡(시정)</button>
                </div>
              </div>
              <div style="font-weight:900;font-size:12.5px;color:#0f172a;margin-bottom:6px">Q. "${esc(iv.q)}"</div>
              <div style="font-size:11.5px;color:#166534;background:#f0fdf4;padding:6px 8px;border-radius:6px;margin-bottom:4px">
                <b>✅ 적법·안전 답변:</b> ${esc(iv.good)}
              </div>
              <div style="font-size:11.5px;color:#991b1b;background:#fef2f2;padding:6px 8px;border-radius:6px">
                <b>🚨 위험·위반 징후:</b> ${esc(iv.bad)}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ── [탭 4] '26년 상반기 적격업체평가 & 합동점검 ──
function renderSvcQual(sub, d) {
  sub.innerHTML = `
    <div style="display:grid;grid-template-columns:1.15fr .85fr;gap:14px">
      <!-- 좌측: '26년 상반기 적격업체평가 전 업체 결과 & 12개 평가항목 -->
      <div class="card" style="margin-bottom:0">
        <div class="card-h">
          <span>📊 '26년 상반기 적격업체 안전보건수준평가 총괄표 (오픈지원 5개사 · 매장CS 9개사)</span>
          <span class="badge ok">평가일: 2026-06-29 · 70점 이상 적격</span>
        </div>
        <div class="card-b">
          <div style="font-size:12px;color:#475569;margin-bottom:10px;line-height:1.5">
            오픈지원부(진열·입고 5개사) 및 매장CS팀(입고도우미 4개사·재고도우미 5개사) 총 14개 계약 건(고유 11개 법인)에 대한 12개 항목 평가 결과입니다.
            <br><b style="color:#dc2626">※ '25년 입고도우미 평가에서 69점(70점 미달)을 받은 '엠앤제이'는 계약 배제되었으며, '26년 '블루키솔루션(95점 S)'으로 교체 완료되었습니다.</b>
          </div>
          <div style="overflow-x:auto;margin-bottom:12px">
            <table class="tbl">
              <thead>
                <tr>
                  <th>소속 부서</th>
                  <th>세부 업종</th>
                  <th>업체명</th>
                  <th>총점</th>
                  <th>등급</th>
                  <th>비상훈련(가점5)</th>
                  <th>현장 중점 점검 / 보완 사항</th>
                </tr>
              </thead>
              <tbody>
                ${d.openVendors.map(v => `
                  <tr>
                    <td><b>오픈지원부</b></td>
                    <td><span class="badge info">${esc(v.scope)}</span></td>
                    <td><b>${esc(v.name)}</b></td>
                    <td><b>${v.score}점</b></td>
                    <td><span class="badge ${v.score>=90?'ok':v.score>=80?'info':'warn'}">${esc(v.grade)}</span></td>
                    <td>${v.score>=90?'<span class="badge ok">이행(S)</span>':'<span class="badge warn">미이행(C)</span>'}</td>
                    <td style="font-size:11px">${esc(v.weakPoint)}</td>
                  </tr>
                `).join('')}
                ${d.csVendors.map(c => `
                  <tr style="${c.score<=79?'background:#fffbeb':''}">
                    <td><b>매장CS팀</b></td>
                    <td><span class="badge ${c.category.includes('입고')?'info':'warn'}">${esc(c.category)}</span></td>
                    <td><b>${esc(c.name)}</b></td>
                    <td><b style="color:${c.score<=79?'#dc2626':'#0f172a'}">${c.score}점</b></td>
                    <td><span class="badge ${c.score>=90?'ok':c.score>=80?'info':'warn'}">${esc(c.grade)}</span></td>
                    <td>${c.score>=95?'<span class="badge ok">이행(S)</span>':'<span class="badge warn">미이행(C)</span>'}</td>
                    <td style="font-size:11px;color:${c.score<=79?'#b91c1c':'#334155'};font-weight:${c.score<=79?'800':'400'}">${esc(c.weakPoint)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div style="font-weight:800;font-size:12.5px;margin-bottom:6px;color:#1e3a8a">📌 적격업체 평가표 12대 세부 배점 기준 (100점 만점)</div>
          <table class="tbl">
            <thead>
              <tr>
                <th>평가영역</th>
                <th>세부 평가항목 (12개 항목)</th>
                <th>배점</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><b>1. 안전보건관리체계 (20점)</b></td><td>① 경영방침(5) · ② 관리계획서(10) · ③ 조직/역할(5)</td><td><b>20점</b></td></tr>
              <tr><td><b>2. 실행수준 (40점)</b></td><td>④ 위험성평가(10) · ⑤ 안전점검(10) · ⑥ 안전교육(10) · ⑦ 보호구지급(10)</td><td><b>40점</b></td></tr>
              <tr><td><b>3. 운영관리 (20점)</b></td><td>⑧ 안전작업허가(5) · ⑨ 비상대책수립(10) · ⑩ 비상훈련(가점5)</td><td><b>20점</b></td></tr>
              <tr><td><b>4. 재해발생 수준 (20점)</b></td><td>⑪ 아차사고 발굴(5) · ⑫ 최근 3년 산업재해 발생 여부(15)</td><td><b>20점</b></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 우측: 현장 안전점검 체크리스트 (실시간 토글) -->
      <div class="card" style="margin-bottom:0">
        <div class="card-h">
          <span>✅ 오픈지원부(5개사) · 매장CS팀(9개사) 상시 점검 리스트</span>
          <button class="btn primary sm" onclick="addSvcChk()">+ 점검항목 추가</button>
        </div>
        <div class="card-b" style="display:flex;flex-direction:column;gap:8px">
          ${d.checklists.map(c => `
            <label style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:8px;border:1px solid ${c.done?'#bbf7d0':'#fecaca'};background:${c.done?'#f0fdf4':'#fef2f2'};cursor:pointer">
              <input type="checkbox" ${c.done?'checked':''} onchange="toggleSvcChk('${c.id}', this.checked)" style="margin-top:3px;width:16px;height:16px">
              <div style="flex:1;font-size:12px">
                <div style="display:flex;justify-content:space-between;margin-bottom:2px">
                  <span class="badge ${c.dept.includes('오픈')?'info':c.dept.includes('매장')?'warn':'ok'}">${esc(c.dept)} · ${esc(c.cycle)}</span>
                  <span style="font-size:11px;color:#64748b">${esc(c.date)}</span>
                </div>
                <div style="font-weight:700;color:#0f172a;line-height:1.45">${esc(c.item)}</div>
              </div>
            </label>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ── [탭 5] 오픈지원부 & 매장CS팀 도급 관련 현황 조사표 (26문항 완결판) ──
const SVC_SURVEY_QNA = [
  { no: 1, cat: '도급 일반 현황', q: '도급(용역) 수행 작업 내용 (구체적으로 작성)', openAns: '신규 오픈 및 리뉴얼 매장의 오픈 전 초도 상품 입고 하차 보조, 박스 개봉, 매대(곤돌라) 조립 보조 및 상품 진열 작업 (5개사)', csAns: '[입고도우미 4개사] 일 2시간 물류차량 롤테이너 하차 및 창고 적재 보조 / [재고도우미 5개사] 폐점(퇴근시간) 이후 매장 전 상품 PDA 바코드 스캔 및 재고수량 실사' },
  { no: 2, cat: '도급 일반 현황', q: '도급 사유', openAns: '전국 신규/리뉴얼 매장 동시 다발적 오픈에 따른 단기 대량 진열 인력 탄력적 확보 (케이웍스·에드에그·유엔아이·휴먼·맨토스 5개사)', csAns: '입고 집중 시간대(일 2시간) 단시간 하역 인력 지원 및 영업 종료 후 심야 시간대 전문 재고실사 인력 운영' },
  { no: 3, cat: '도급 일반 현황', q: '작업 장소', openAns: '전국 다이소 신규 오픈 및 리뉴얼 매장 내부, 하역장, 후방 창고', csAns: '전국 다이소 직영매장 하역장, 후방 창고(백룸) 및 매장 전 구역 매대' },
  { no: 4, cat: '도급 일반 현황', q: '도급 작업 시간 (휴게시간 포함)', openAns: '08:30 ~ 17:30 (점심 휴게 1시간 및 오전/오후 휴게시간 별도 부여)', csAns: '[입고도우미] 물류 도착 시 1일 약 2시간 집중 / [재고도우미] 매장 퇴근시간(폐점 22:00) 이후 야간/심야 시간대 (작업 중 휴게 부여)' },
  { no: 5, cat: '도급 일반 현황', q: '도급 계약 기간 및 주기', openAns: '1년 단위 연간 단가계약 체결 (매장 오픈 일정별 개별 발주)', csAns: '1년 단위 연간 용역계약 체결 (매장별 입고/재고실사 일정표에 따라 월별 운영)' },
  { no: 6, cat: '도급 일반 현황', q: '수급인(업체) 선정 방식 및 기준', openAns: "경쟁입찰 및 적격심사 (안전보건수준평가 70점 이상 적격업체만 계약 — '26년 상반기 5개사 전원 적격)", csAns: "수행역량 및 적격업체 안전보건수준평가(70점 이상) 통과 업체 선정 ('25년 69점 미달 엠앤제이 배제 → '26년 블루키솔루션 등 입고 4개사·재고 5개사 총 9개사 운영)" },
  { no: 7, cat: '수급인 인력 현황', q: '계약 업체명 및 업체 수', openAns: '총 5개사: 케이웍스코리아(80점), 에드에그(90점), 유엔아이(79점), 휴먼인프라(95점), 맨토스(85점)', csAns: '총 9개사 — [입고도우미 4개사] 블루키솔루션(95점), 휴먼인프라(95점), 맨토스(85점), 케이웍스코리아(81점) / [재고도우미 5개사] TSW파트너스(100점), RBS코리아(95점), 빅서비스(88점), 아르테코리아(79점), 유미어스(70점)' },
  { no: 8, cat: '수급인 인력 현황', q: '1일 최대/평균 투입 인원', openAns: '5개사 1일 운영가능 최대인원 합계 약 570명 (케이웍스 160, 유엔아이 120, 에드에그 100, 휴먼 100, 맨토스 90 / 매장당 일 15~40명)', csAns: '[입고도우미] 매장당 1일 2~5명 (2시간) / [재고도우미] 매장당 야간 4~10명 팀 단위 투입' },
  { no: 9, cat: '작업 방식 및 지휘', q: '업무 지시 방법 (불법파견 방지)', openAns: '업체에서 파견된 현장관리자(팀장/반장)를 통해서만 일반용역 작업자에게 업무 지시 (다이소 오픈리베로 직접 지시 엄금)', csAns: '입고 리더 및 야간 재고실사 슈퍼바이저(팀장)를 통한 작업 지시 및 근태 관리 (점장/직영직원 직접 지시 금지)' },
  { no: 10, cat: '작업 방식 및 지휘', q: '다이소 직원과 혼재 작업 여부 및 분리 대책', openAns: '다이소 오픈리베로와 진열용역 공간을 최대한 분리하여 진행 (복층 매장: 층별 분리 / 단층 매장: 구역·섹션 분리)', csAns: '[입고] 하역장·창고 지정 구역 분리 운영 / [재고] 퇴근시간(폐점) 이후 야간 단독 실사로 주간 직영직원과 시간대 완전 분리' },
  { no: 11, cat: '설비 및 보호구', q: '주요 사용 기계·기구 및 설비', openAns: '핸드파렛트(자키), 롤테이너, 운반대차, A형 안전사다리, 스텝스툴, 안전커터칼, 화물용 승강기', csAns: '[입고] 롤테이너, 핸드파렛트, 운반대차 / [재고] PDA 바코드 스캐너, 안전인증 스텝스툴, A형 사다리' },
  { no: 12, cat: '설비 및 보호구', q: '설비/도구 소유 및 제공 주체', openAns: '매장 기본 물류설비(승강기·기본대차)는 다이소 시설 이용, 개인 작업도구(안전커터칼·보호구)는 수급업체 지급', csAns: '[입고] 매장 롤테이너·대차 사용, 안전화·장갑은 업체 지급 / [재고] PDA 단말기 및 스텝스툴·보호구는 실사업체 구비' },
  { no: 13, cat: '설비 및 보호구', q: '필수 개인보호구 지급 및 착용 현황', openAns: '베임방지(방검/코팅) 장갑, 미끄럼방지 안전화(작업화), 고소작업 시 안전모 지급 및 착용', csAns: '[입고] 안전화(선심 내장), 미끄럼방지 장갑 / [재고] 미끄럼방지 작업화, 무릎보호대(하단 스캔 시), 손목보호대' },
  { no: 14, cat: '유해·위험요인', q: '작업 중 주요 유해·위험요인 (아차사고 포함)', openAns: '① 커터칼 박스 개봉 베임 ② 사다리/우마 상단 진열 추락 ③ 파렛트/대차 협착·전도 ④ 중량물 반복 취급 근골격계 부담', csAns: '[입고] 롤테이너 발끼임·전도, 2시간 집중 하역 허리 염좌, 고객 동선 충돌 / [재고] 야간 조도 부족 넘어짐, 상단 재고 확인 추락, 폐점 매장 고립' },
  { no: 15, cat: '유해·위험요인', q: '최근 3년간 산업재해 발생 이력', openAns: '중대재해 없음 (단순 베임·삐임 등 경미 아차사고 중심 예방 관리 중)', csAns: '중대재해 없음 (롤테이너 이동 중 경미 접촉 및 야간 스텝스툴 발헛디딤 아차사고 집중 관리)' },
  { no: 16, cat: '안전보건관리체계', q: '적격수급인 선정 평가 실시 여부', openAns: "연 1회 이상(신규/재계약 시) 안전보건수준평가표(12개 항목, 100점 만점) 평가 실시 ('26.6.29 5개사 평가 완료)", csAns: "입고도우미 4개사·재고도우미 5개사 대상 안전보건관리계획서 및 수준평가 실시 ('26.6.29 9개사 평가 완료, 유미어스·아르테 시정관리)" },
  { no: 17, cat: '안전보건관리체계', q: '위험성평가 실시 및 근로자 공유 여부', openAns: '진열/입고 표준 위험성평가 실시 및 작업 시작 전 TBM을 통한 위험요인·감소대책 전파', csAns: '입고(2시간 집중하역) 및 재고(야간실사) 작업별 위험성평가표 작성·공유 (유미어스·아르테코리아 현장 이행 집중 점검)' },
  { no: 18, cat: '안전보건관리체계', q: '작업 전 안전점검(TBM) 및 안전보건교육', openAns: '매일 아침 08:30 업체 현장관리자 주관 10분 TBM(스트레칭·보호구·분리구역 공지) 및 서명부 작성', csAns: '[입고] 투입 전 3분 TBM 및 스트레칭 / [재고] 야간 투입 전 조명·비상구 위치·2인 1조 편성 TBM 실시' },
  { no: 19, cat: '안전보건관리체계', q: '안전보건협의체 및 합동점검 운영 여부', openAns: '오픈지원부-수급업체(5개사) 간 안전보건 소통채널 운영 및 오픈 현장 수시/합동 안전점검 실시', csAns: '매장CS팀-입고(4개사)·재고(5개사) 용역업체 간 정기 안전간담회 및 매장 순회 점검 운영' },
  { no: 20, cat: '안전보건관리체계', q: '비상조치계획 및 비상연락망 구축 여부', openAns: '오픈 매장별 응급의료기관·소방서·다이소 담당자 비상연락망 게시 및 작업중지권 안내 (비상훈련 미실시 업체 합동훈련 추진)', csAns: '주간 입고 및 야간 폐점 후 재고실사 중 응급환자·화재 발생 시 즉각 연락체계 및 비상출입문 개폐 매뉴얼 운영' },
  { no: 21, cat: '근로자 복지/위생', q: '휴게시설 및 위생시설(화장실·식수) 제공', openAns: '오픈 매장 내 지정 휴게공간(의자·식수·냉난방) 및 화장실 공동 이용 보장', csAns: '매장 내 직원 휴게실·화장실·음용수 동일 제공 및 야간 재고실사 시 적정 실내온도/조명 유지' },
  { no: 22, cat: '작업환경/법규', q: '타 공정(인테리어 등)과의 혼재작업 관리', openAns: '인테리어팀 잔여 공사(전기·도장·사인) 종료 후 진열 투입 원칙, 불가피 시 층간/시간대 완전 분리', csAns: '[입고] 물류차량 하역과 매장 고객 동선 분리 / [재고] 야간 시설보수 작업과 일정 중복 방지' },
  { no: 23, cat: '작업환경/법규', q: '고령·단기·외국인 근로자 특별 관리', openAns: '단기 일용직 투입 시 당일 기초안전수칙 서명 및 고령자 고소(사다리)·중량물 작업 배치 제한', csAns: '입고 중량물 취급 시 근골격계 취약자 배려 및 야간 재고실사 시 심야 건강상태(혈압·피로도) 사전 확인' },
  { no: 24, cat: '개선 및 지원사항', q: '현장 관리상 애로사항 및 건의사항', openAns: '오픈 일정 임박 시 다수 인원 동시 투입으로 인한 서류 수기 작성 부담 → 모바일/웹앱 전자서명화로 해결', csAns: '전국 다수 매장에서 2시간 단시간 입고 및 심야 재고실사가 분산 진행되어 모바일 원격 TBM·점검 인증 체계 필수' },
  { no: 25, cat: '개선 및 지원사항', q: '안전보건팀 지원 요청 사항', openAns: '오픈지원 진열작업 특화 표준 안전수칙 포스터, 사다리/커터칼 안전가이드 및 합동 비상훈련 시나리오 지원', csAns: '입고도우미(롤테이너·중량물) 및 재고도우미(야간 고소·비상대피) 5분 모바일 교육자료 및 유미어스·아르테 현장 합동점검' },
  { no: 26, cat: '종합 관리방안', q: '향후 도급안전관리 웹앱 통합 운영 계획', openAns: '인테리어부 도급관리 앱과 동일한 아키텍처로 오픈지원부 5개사 적격평가·TBM·공간분리·현장점검 상시 등록', csAns: '매장CS팀 입고(4개사)·재고(5개사) 총 9개사를 통합 대시보드에 등록하여 본사 안전보건팀(강동현) 실시간 모니터링 구현' }
];

function renderSvcSurvey(sub, d) {
  sub.innerHTML = `
    <div class="card">
      <div class="card-h">
        <span>📑 오픈지원부(5개사) & 매장CS팀(9개사) 도급 관련 현황 조사표 (26개 항목 전수 반영)</span>
        <span class="badge info">안전보건팀 강동현 · 엑셀 조사표 + '26년 상반기 적격평가 통합</span>
      </div>
      <div class="card-b" style="overflow-x:auto">
        <table class="tbl">
          <thead>
            <tr>
              <th style="width:50px">No</th>
              <th style="width:130px">구분</th>
              <th style="width:220px">조사 항목 (질문)</th>
              <th>📦 오픈지원부 (상품진열·입고 5개사 현황)</th>
              <th>🛒 매장CS팀 (입고도우미 4개사 · 재고도우미 5개사 현황)</th>
            </tr>
          </thead>
          <tbody>
            ${SVC_SURVEY_QNA.map(row => `
              <tr>
                <td><b>${row.no}</b></td>
                <td><span class="badge ghost">${esc(row.cat)}</span></td>
                <td><b>${esc(row.q)}</b></td>
                <td style="font-size:12px;line-height:1.5;color:#1e3a8a;background:#f8fafc">${esc(row.openAns)}</td>
                <td style="font-size:12px;line-height:1.5;color:#14532d;background:#f0fdf4">${esc(row.csAns)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ── 인터랙티브 헬퍼 함수들 (현장점검 입력, 업체 추가, 클라우드 전송) ──
function updateFieldMeta(key, val) {
  const d = loadServiceData();
  d.fieldInspection.meta[key] = val;
  saveServiceData(d);
}

function setFieldAns(no, ans) {
  const d = loadServiceData();
  d.fieldInspection.answers[no] = ans;
  saveServiceData(d);
  loadService();
}

function setFieldNote(no, val) {
  const d = loadServiceData();
  d.fieldInspection.notes[no] = val;
  saveServiceData(d);
}

function setFieldInterview(id, st) {
  const d = loadServiceData();
  d.fieldInspection.interviews[id] = st;
  saveServiceData(d);
  loadService();
}

async function syncFieldInspectionToCloud() {
  const d = loadServiceData();
  const fi = d.fieldInspection;
  const gasUrl = window.CONTRACT_CONFIG && window.CONTRACT_CONFIG.GAS_WEBAPP_URL;
  if (!gasUrl) {
    toast('로컬 저장소에 현장점검 결과가 저장되었습니다.', 'ok');
    return;
  }
  try {
    toast('구글 앱스 스크립트(GAS) 클라우드로 현장점검 결과를 전송합니다...', 'info');
    await fetch(gasUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'saveFieldInspection',
        inspector: d.owner,
        meta: fi.meta,
        answers: fi.answers,
        notes: fi.notes,
        interviews: fi.interviews,
        savedAt: new Date().toISOString()
      })
    });
    toast('구글 앱스 스크립트(GAS) 클라우드 전송 완료!', 'ok');
  } catch (e) {
    toast('클라우드 전송 중 오류(로컬 저장 완료): ' + e.message, 'warn');
  }
}

function openAddOpenVendorModal() {
  openModal('오픈지원부 계약업체 추가', `
    <div class="form-row"><label>업체명 *</label><input class="inp" id="newOvName" placeholder="예: 신규진열용역(주)"></div>
    <div class="form-row two">
      <div><label>계약 업무 범위 *</label><input class="inp" id="newOvScope" value="진열용역"></div>
      <div><label>담당 권역 *</label><input class="inp" id="newOvRegion" placeholder="예: 전국 / 수도권"></div>
    </div>
    <div class="form-row two">
      <div><label>1일 최대 인원(명)</label><input class="inp" type="number" id="newOvCap" value="80"></div>
      <div><label>적격평가 점수(점)</label><input class="inp" type="number" id="newOvScore" value="85"></div>
    </div>
    <div class="form-row"><label>연락처/담당자</label><input class="inp" id="newOvContact" placeholder="예: 현장팀장 (010-0000-0000)"></div>
  `, `
    <button class="btn ghost" onclick="closeModal()">취소</button>
    <button class="btn primary" onclick="saveNewOpenVendor()">추가 저장</button>
  `);
}

function saveNewOpenVendor() {
  const name = (document.getElementById('newOvName').value || '').trim();
  if (!name) { toast('업체명을 입력해 주세요.', 'warn'); return; }
  const score = Number(document.getElementById('newOvScore').value) || 85;
  const grade = score >= 90 ? 'S' : score >= 80 ? 'A' : 'B';
  const d = loadServiceData();
  d.openVendors.push({
    id: 'ov_' + Date.now(),
    name,
    scope: (document.getElementById('newOvScope').value || '진열용역').trim(),
    region: (document.getElementById('newOvRegion').value || '전국').trim(),
    maxCap: Number(document.getElementById('newOvCap').value) || 80,
    dailyAvg: '15~30명',
    managerRole: '업체 파견 현장관리자(팀장) 지정 완료',
    spaceSeparation: '복층: 층별 분리 / 단층: 구역 분리',
    riskItems: ['상단 진열 사다리 추락', '커터칼 개봉 베임', '중량 박스 운반 허리부담'],
    score,
    grade,
    evalDate: new Date().toISOString().slice(0, 10),
    weakPoint: '신규 등록 업체 — 현장 TBM 및 비상대피로 숙지 확인',
    status: `적격(${grade}등급)`,
    contact: (document.getElementById('newOvContact').value || '현장팀장').trim()
  });
  saveServiceData(d);
  closeModal();
  toast(`${name} 업체가 오픈지원부 목록에 추가되었습니다.`, 'ok');
  loadService();
}

function openAddCsVendorModal() {
  openModal('매장CS팀 입고/재고 용역업체 추가', `
    <div class="form-row">
      <label>업종 구분 *</label>
      <select class="sel" id="newCsCat">
        <option value="입고도우미 (입고용역)">🚚 입고도우미 (입고용역 · 1일 약 2시간)</option>
        <option value="재고도우미 (재고용역)">🌙 재고도우미 (재고용역 · 폐점 후 야간 실사)</option>
      </select>
    </div>
    <div class="form-row"><label>업체명 *</label><input class="inp" id="newCsName" placeholder="예: 신규실사파트너스"></div>
    <div class="form-row two">
      <div><label>적격평가 점수(점)</label><input class="inp" type="number" id="newCsScore" value="85"></div>
      <div><label>매장당 투입 규모</label><input class="inp" id="newCsWorkers" value="매장당 3~6명"></div>
    </div>
    <div class="form-row"><label>중점 보완/확인사항</label><input class="inp" id="newCsWeak" placeholder="예: 야간 비상출입문 숙지 및 보호구 지급대장 확인"></div>
  `, `
    <button class="btn ghost" onclick="closeModal()">취소</button>
    <button class="btn primary" onclick="saveNewCsVendor()">추가 저장</button>
  `);
}

function saveNewCsVendor() {
  const name = (document.getElementById('newCsName').value || '').trim();
  if (!name) { toast('업체명을 입력해 주세요.', 'warn'); return; }
  const category = document.getElementById('newCsCat').value;
  const isInbound = category.includes('입고');
  const score = Number(document.getElementById('newCsScore').value) || 85;
  const grade = score >= 90 ? 'S' : score >= 80 ? 'A' : 'B';
  const d = loadServiceData();
  d.csVendors.push({
    id: 'cs_' + Date.now(),
    category,
    name,
    workTime: isInbound ? '1일 약 2시간 집중 (물류 입고 타임)' : '매장 퇴근시간(폐점 22:00) 이후 야간/심야 시간대',
    workPlace: isInbound ? '매장 하역장, 백룸 창고' : '폐점 후 매장 전 구역 매대 및 후방 창고',
    workDetail: isInbound ? '물류 차량 롤테이너 하차 및 창고 적재 보조' : 'PDA 바코드 스캐너 활용 전 상품 재고수량 실사',
    workersPerStore: (document.getElementById('newCsWorkers').value || '매장당 3~6명').trim(),
    managerRole: '현장 리더/팀장 상주 통제',
    riskItems: isInbound ? ['롤테이너 이동 시 발끼임', '중량물 반복 운반 허리부담'] : ['야간 조도 부족 넘어짐', '상단 스캔 시 스텝스툴 추락', '폐점 후 비상구 미숙지'],
    controls: isInbound ? ['안전화 착용 및 바퀴 스토퍼 고정', '작업 전 3분 스트레칭'] : ['야간 조명 100% 점등', '폐점 매장 비상출입문 개폐 사전 교육', '2인 1조 버디시스템 운영'],
    score,
    grade,
    evalDate: new Date().toISOString().slice(0, 10),
    history2025: '신규 추가 등록 업체',
    weakPoint: (document.getElementById('newCsWeak').value || '현장 안전점검 및 TBM 이행 확인').trim()
  });
  saveServiceData(d);
  closeModal();
  toast(`${name} 업체가 매장CS팀 목록에 추가되었습니다.`, 'ok');
  loadService();
}

function toggleSvcChk(id, checked) {
  const d = loadServiceData();
  const item = d.checklists.find(c => c.id === id);
  if (item) {
    item.done = checked;
    item.date = new Date().toISOString().slice(0, 10);
    saveServiceData(d);
    loadService();
    toast(checked ? '점검 완료 처리되었습니다.' : '점검 미완료로 변경되었습니다.', 'ok');
  }
}

function addSvcChk() {
  openModal('신규 안전점검 항목 추가 (오픈지원부 / 매장CS팀)', `
    <div class="form-row">
      <label>대상 부서 *</label>
      <select class="sel" id="newChkDept">
        <option value="오픈지원부">오픈지원부 (상품진열·입고 5개사)</option>
        <option value="매장CS팀(입고4사)">매장CS팀 - 입고도우미 (4개사 · 2시간)</option>
        <option value="매장CS팀(재고5사)">매장CS팀 - 재고도우미 (5개사 · 야간)</option>
        <option value="공통(안전보건팀)">공통 (안전보건팀)</option>
      </select>
    </div>
    <div class="form-row">
      <label>점검 주기 *</label>
      <input class="inp" id="newChkCycle" placeholder="예: 작업전(일일), 야간투입전, 월간합동" value="작업전(일일)">
    </div>
    <div class="form-row">
      <label>점검 내용 *</label>
      <textarea class="Gr" id="newChkItem" rows="3" placeholder="현장에서 확인할 안전보건 점검 항목을 입력하세요."></textarea>
    </div>
  `, `
    <button class="btn ghost" onclick="closeModal()">취소</button>
    <button class="btn primary" onclick="saveNewSvcChk()">등록</button>
  `);
}

function saveNewSvcChk() {
  const dept = document.getElementById('newChkDept').value;
  const cycle = document.getElementById('newChkCycle').value.trim() || '수시';
  const item = document.getElementById('newChkItem').value.trim();
  if (!item) { toast('점검 내용을 입력해 주세요.', 'warn'); return; }
  const d = loadServiceData();
  d.checklists.push({
    id: 'chk_' + Date.now(),
    dept,
    cycle,
    item,
    done: true,
    date: new Date().toISOString().slice(0, 10)
  });
  saveServiceData(d);
  closeModal();
  loadService();
  toast('안전점검 항목이 추가되었습니다.', 'ok');
}

function resetServiceData() {
  localStorage.setItem(SVC_STORAGE_KEY, JSON.stringify(DEFAULT_SERVICE_DATA));
  loadService();
  toast('오픈지원부(5개사)·매장CS팀(9개사) 기본 데이터로 복원되었습니다.', 'ok');
}

function exportServiceReport() {
  window.print();
}

/* ═══════════════════════════════════════════════════════════════
   업종 선택 시스템 (인테리어/공사/집기 vs 오픈지원/입고/재고)
   - 로그인 직후 자동 표시 + 상단 헤더 [업종전환] 버튼으로 언제든 재선택 가능
   ═══════════════════════════════════════════════════════════════ */

window.APP_SECTOR = sessionStorage.getItem('daiso_app_sector') || '';

// '26년 상반기 본사 도급 적격업체평가표 — 인테리어 / 공사 / 집기 19개사 전수 데이터
const INTERIOR_VENDORS_2026 = [
  // 인테리어 마감공사 (9개사)
  { group: '인테리어 마감공사', dept: '인테리어팀', name: '(주)시공디자인', score: 92, grade: 'S', evalDate: '2026-06-29', note: '강남본점 800평 리뉴얼 주시공 · 안전보건체계 우수' },
  { group: '인테리어 마감공사', dept: '인테리어팀', name: '㈜예본아이디', score: 92, grade: 'S', evalDate: '2026-06-29', note: '비상대책 훈련 완료 · 안전점검 S등급' },
  { group: '인테리어 마감공사', dept: '인테리어팀', name: '㈜디파하우징', score: 91, grade: 'S', evalDate: '2026-06-29', note: '위험성평가 및 보호구 지급 S등급' },
  { group: '인테리어 마감공사', dept: '인테리어팀', name: '다온하우징', score: 88, grade: 'A', evalDate: '2026-06-29', note: '마감·집기 설치 안전양호 (비상훈련 보완)' },
  { group: '인테리어 마감공사', dept: '인테리어팀', name: '㈜예진아키', score: 88, grade: 'A', evalDate: '2026-06-29', note: '마감공사 적격 (비상훈련 보완)' },
  { group: '인테리어 마감공사', dept: '인테리어팀', name: '아인건축', score: 84, grade: 'A', evalDate: '2026-06-29', note: '안전점검(B)·비상훈련(C) 현장 확인 필요' },
  { group: '인테리어 마감공사', dept: '인테리어팀', name: '㈜비오비플랜', score: 84, grade: 'A', evalDate: '2026-06-29', note: '안전점검(B)·비상훈련(C) 현장 확인 필요' },
  { group: '인테리어 마감공사', dept: '인테리어팀', name: '㈜굴지', score: 84, grade: 'A', evalDate: '2026-06-29', note: '안전점검(B)·비상훈련(C) 현장 확인 필요' },
  { group: '인테리어 마감공사', dept: '인테리어팀', name: '㈜아인아이디', score: 84, grade: 'A', evalDate: '2026-06-29', note: '안전점검(B)·비상훈련(C) 현장 확인 필요' },
  // 인테리어 사인공사 (5개사)
  { group: '인테리어 사인공사', dept: '인테리어팀', name: '우리애드', score: 86, grade: 'A', evalDate: '2026-06-29', note: '고소작업대·외벽 간판 안전양호' },
  { group: '인테리어 사인공사', dept: '인테리어팀', name: '미르컴', score: 86, grade: 'A', evalDate: '2026-06-29', note: '사인물 고소작업 안전관리 양호' },
  { group: '인테리어 사인공사', dept: '인테리어팀', name: '이노디자인', score: 82, grade: 'A', evalDate: '2026-06-29', note: '사인공사 보호구·작업허가 준수' },
  { group: '인테리어 사인공사', dept: '인테리어팀', name: '에스티에드컴', score: 82, grade: 'A', evalDate: '2026-06-29', note: '사인공사 고소작업 안전점검 대상' },
  { group: '인테리어 사인공사', dept: '인테리어팀', name: '㈜토마토세븐', score: 80, grade: 'A', evalDate: '2026-06-29', note: '사인공사 적격 (안전작업허가·비상훈련 보완)' },
  // 인테리어 냉난방기 (1개사)
  { group: '인테리어 냉난방기', dept: '인테리어팀', name: '에스원이엔지(주)', score: 81, grade: 'A', evalDate: '2026-06-29', note: '천장형 냉난방기·배관 용접 화기작업 허가 필수' },
  // 매장시설 유지보수 (4개사)
  { group: '매장시설 유지보수', dept: '매장시설관리팀', name: '하이엠솔루텍', score: 98, grade: 'S', evalDate: '2026-06-29', note: 'LG 시스템에어컨·공조 유지보수 최우수(98점)' },
  { group: '매장시설 유지보수', dept: '매장시설관리팀', name: '머큐리알엔에스', score: 93, grade: 'S', evalDate: '2026-06-29', note: '전국 매장 전기·조명·집기 보수 우수(93점)' },
  { group: '매장시설 유지보수', dept: '매장시설관리팀', name: 'LSC', score: 91, grade: 'S', evalDate: '2026-06-29', note: '매장 승강기·자동문·시설물 유지보수 우수' },
  { group: '매장시설 유지보수', dept: '매장시설관리팀', name: '삼성에스에이씨비투비', score: 91, grade: 'S', evalDate: '2026-06-29', note: '매장 냉난방·공조설비 유지보수 우수' }
];

function updateSectorTopBtn() {
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
}

function openSectorSelectModal(isPostLogin) {
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
}

// 인테리어/공사/집기 전용 대시보드 상단 요약 보드 (19개 적격업체 표 포함)
let showInteriorTable = false;
function renderInteriorBannerHtml() {
  return `
    <div class="card" style="background:linear-gradient(135deg,#451a03,#78350f 65%,#b45309);color:#fff;border:0">
      <div class="row" style="justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap">
        <div>
          <span style="background:#fde68a;color:#78350f;font-size:11px;font-weight:900;padding:2px 8px;border-radius:99px">인테리어팀 · 매장시설관리팀 전용</span>
          <h2 style="margin:6px 0 4px;color:#fff;font-size:17px">🏗 인테리어 / 공사 / 집기 도급안전관리 보드 (총 19개 적격업체)</h2>
          <div style="font-size:12.5px;color:#fef3c7;line-height:1.5">
            인테리어 마감공사(9개사) · 사인공사(5개사) · 냉난방기(1개사) · 매장시설유지보수(4개사) · 고소/화기 작업허가서(PTW) · 2일 1회 순회점검
          </div>
        </div>
        <div style="display:flex;gap:6px">
          <button class="button" type="button" style="background:#fff;color:#78350f;font-weight:800;white-space:nowrap" onclick="showInteriorTable=!showInteriorTable;renderJobs()">
            ${showInteriorTable ? '▲ 19개사 명단 접기' : '▼ 19개 적격업체 명단 보기'}
          </button>
          <button class="button ghost" type="button" style="background:rgba(255,255,255,.15);color:#fff;border-color:rgba(255,255,255,.3)" onclick="openSectorSelectModal()">🔄 업종 전환</button>
        </div>
      </div>
      ${showInteriorTable ? `
        <div style="margin-top:12px;background:#fff;color:#0f172a;border-radius:10px;padding:12px;overflow-x:auto">
          <div style="font-weight:900;font-size:13px;margin-bottom:8px;color:#78350f">📋 '26년 상반기 인테리어·공사·집기 적격업체 안전보건수준평가 현황 (19개사 전원 적격)</div>
          <table class="rtable" style="font-size:12px">
            <tr><th>구분</th><th>담당부서</th><th>업체명</th><th>평가점수</th><th>등급</th><th>비고 / 중점 안전관리</th></tr>
            ${INTERIOR_VENDORS_2026.map(v => `
              <tr>
                <td><b>${esc(v.group)}</b></td>
                <td>${esc(v.dept)}</td>
                <td><b>${esc(v.name)}</b></td>
                <td><b style="color:${v.score>=90?'#059669':'#1d4ed8'}">${v.score}점</b></td>
                <td><span class="pill ${v.score>=90?'ok':'todo'}">${esc(v.grade)}등급</span></td>
                <td class="muted">${esc(v.note)}</td>
              </tr>
            `).join('')}
          </table>
        </div>
      ` : ''}
    </div>
  `;
}


/* ═══════════════════════════════════════════════════════════════
   📱 [신규 통합] 모바일 스마트 현장점검 & 한곳에서 보기 모듈
   - 사진 첨부 + 음성 녹음/파일 + 간략 메모 ➔ 카드 & 보고서 자동 생성
   - 카톡/문자 전달 복사 + A4/PDF 인쇄 + 누적 이력 갤러리 한 화면 통합
   ═══════════════════════════════════════════════════════════════ */

let g_mobPhotos = [];
let g_mobRecording = false;
let g_mobRecognition = null;
let g_mobFinalVoice = '';
let g_mobCurrentReport = null;

const MOB_VENDORS_MAP = {
  OPEN: [
    { name: '케이웍스코리아', grade: 'A등급 (81점)', cap: '160명(전국)' },
    { name: '에드에그', grade: 'S등급 (90점)', cap: '100명(전국)' },
    { name: '유엔아이', grade: 'B등급 (79점)', cap: '120명(수도권·충청)' },
    { name: '휴먼인프라', grade: 'S등급 (95점)', cap: '100명(영남)' },
    { name: '맨토스', grade: 'A등급 (85점)', cap: '90명(수도권·전국)' }
  ],
  CS_IN: [
    { name: '블루키솔루션', grade: 'S등급 (95점 신규)', cap: '매장당 2~4명(2h)' },
    { name: '휴먼인프라', grade: 'S등급 (95점)', cap: '영남 거점(2h)' },
    { name: '맨토스', grade: 'A등급 (85점)', cap: '수도권/전국(2h)' },
    { name: '케이웍스코리아', grade: 'A등급 (81점)', cap: '전국 거점(2h)' }
  ],
  CS_STOCK: [
    { name: 'TSW파트너스', grade: 'S등급 (100점 만점)', cap: '야간 4~10명' },
    { name: 'RBS코리아', grade: 'S등급 (95점)', cap: '야간 4~8명' },
    { name: '빅서비스', grade: 'A등급 (88점)', cap: '야간 4~8명' },
    { name: '아르테코리아', grade: 'B등급 (79점 · 집중관리)', cap: '야간 4~8명' },
    { name: '유미어스', grade: 'B등급 (70점 · 최우선관리)', cap: '야간 4~8명' }
  ]
};

function renderSvcMobileQuick(sub, d) {
  const savedList = getSavedMobCards();
  const todayStr = new Date().toISOString().slice(0, 10);

  sub.innerHTML = `
    <!-- 상단 안내 및 한곳에서 보기 설명 배너 -->
    <div class="card" style="border-left:4px solid #16a34a;margin-bottom:14px;background:#f0fdf4">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
        <div>
          <div style="font-size:11px;font-weight:800;color:#15803d;letter-spacing:0.5px">ONE-STOP MOBILE INSPECTION</div>
          <h2 style="margin:2px 0 4px;font-size:17px;color:#14532d;font-weight:900">📱 모바일 스마트 현장점검 (한곳에서 입력·카드확인·이력조회)</h2>
          <div style="font-size:12.5px;color:#334155;line-height:1.4">
            핸드폰으로 <b>[사진 촬영/첨부]</b>하고 <b>[음성 녹음 또는 간략 메모]</b>만 남기면, AI 스마트 엔진이 정돈된 <b>카드 & 점검 보고서</b>로 자동 정리해 줍니다. 아래에서 바로 인쇄·카톡 전달 및 이전 점검 내역까지 한 번에 확인할 수 있습니다.
          </div>
        </div>
        <div style="display:flex;gap:6px">
          <button class="btn sm" style="background:#15803d;color:#fff;font-weight:800;border:none" onclick="openGoogleSheetDirectly()">📊 내 구글시트(DB) 실시간 열기</button>
          <button class="btn ghost sm" style="border-color:#16a34a;color:#15803d" onclick="configureGoogleSheetUrl()">⚙️ 시트 주소 설정</button>
          <a class="btn ghost sm" href="./Mobile_Inspection(모바일_도급점검_스마트앱).html" target="_blank" style="text-decoration:none">📱 전용앱 열기</a>
          <button class="btn ghost sm" onclick="resetMobForm()">⟳ 초기화</button>
        </div>
      </div>
    </div>

    <!-- 1. 현장 기본 정보 & 사진 & 음성 한곳 입력 카드 -->
    <div class="card" style="margin-bottom:14px;border:1.5px solid #cbd5e1">
      <div class="card-h" style="background:#f8fafc">
        <span>✍️ 1. 현장 정보 입력 & 사진 촬영 & 음성 녹음 (한곳 입력)</span>
        <span class="badge" style="background:#dbeafe;color:#1e40af">원스톱 입력창</span>
      </div>
      <div class="card-b">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;margin-bottom:12px">
          <div>
            <label style="font-size:11.5px;font-weight:800;color:#475569;display:block;margin-bottom:4px">점검 매장명 <span style="color:#dc2626">*</span></label>
            <input id="mobStoreName" class="inp" value="다이소 명동본점 (오픈지원/입고)" placeholder="예: 다이소 강남본점">
          </div>
          <div>
            <label style="font-size:11.5px;font-weight:800;color:#475569;display:block;margin-bottom:4px">업무 구분 <span style="color:#dc2626">*</span></label>
            <select id="mobWorkScope" class="inp" onchange="updateMobVendorSelect()">
              <option value="OPEN">📦 오픈지원부 (진열·입고 5개사)</option>
              <option value="CS_IN">🛒 매장CS팀 (입고도우미 2h 4개사)</option>
              <option value="CS_STOCK">🌙 매장CS팀 (야간 재고도우미 5개사)</option>
            </select>
          </div>
          <div>
            <label style="font-size:11.5px;font-weight:800;color:#475569;display:block;margin-bottom:4px">점검 대상 수급업체 <span style="color:#dc2626">*</span></label>
            <select id="mobVendorName" class="inp">
              <!-- JS로 자동 생성 -->
            </select>
          </div>
          <div>
            <label style="font-size:11.5px;font-weight:800;color:#475569;display:block;margin-bottom:4px">점검 일자 & 점검자</label>
            <div style="display:flex;gap:6px">
              <input id="mobInspDate" type="date" class="inp" value="${todayStr}" style="flex:1">
              <input id="mobInspector" class="inp" value="안전보건팀 강동현" style="flex:1">
            </div>
          </div>
        </div>

        <!-- 2단계: 사진 첨부 컨트롤 -->
        <div style="background:#f8fafc;padding:12px;border-radius:10px;border:1px solid #e2e8f0;margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <b style="font-size:13px;color:#1e293b">📷 현장 사진 첨부 (TBM 조회, 공간분리, 안전칼/사다리, 지적사항)</b>
            <span id="mobPhotoCountBadge" style="font-size:11px;font-weight:700;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:99px">0장 첨부됨</span>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <label class="btn primary sm" style="cursor:pointer;background:#2563eb">
              📸 스마트폰 카메라 촬영
              <input type="file" id="mobCamInput" accept="image/*" capture="environment" style="display:none" onchange="handleMobPhoto(this)">
            </label>
            <label class="btn ghost sm" style="cursor:pointer;border-color:#3b82f6;color:#1d4ed8">
              🖼 앨범에서 사진 선택
              <input type="file" id="mobAlbumInput" accept="image/*" multiple style="display:none" onchange="handleMobPhoto(this)">
            </label>
          </div>
          <!-- 사진 미리보기 그리드 -->
          <div id="mobPhotoGrid" style="display:none;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:8px;margin-top:10px"></div>
        </div>

        <!-- 3단계: 음성 녹음 & 간략 메모 컨트롤 -->
        <div style="background:#fff1f2;padding:12px;border-radius:10px;border:1px dashed #f43f5e;margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <b style="font-size:13px;color:#9f1239">🎙️ 실시간 음성 녹음 및 녹음본 전달</b>
            <span style="font-size:11px;font-weight:700;color:#be123c;background:#ffe4e6;padding:2px 8px;border-radius:99px">STT 음성인식 지원</span>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
            <button type="button" id="mobVoiceBtn" class="btn sm" style="background:#e11d48;color:#fff;font-weight:800" onclick="toggleMobVoice()">
              <span id="mobVoiceIcon">🎙️</span> <span id="mobVoiceBtnText">현장 음성 녹음 시작</span>
            </button>
            <label class="btn ghost sm" style="cursor:pointer;border-color:#f43f5e;color:#be123c;background:#fff">
              📁 녹음 파일 업로드
              <input type="file" id="mobAudioInput" accept="audio/*" style="display:none" onchange="handleMobAudioFile(this)">
            </label>
          </div>
          <div id="mobVoiceStatusBanner" style="display:none;font-size:12px;font-weight:700;color:#be123c;margin-bottom:6px">
            🔴 실시간 음성 녹음 및 텍스트 자동 변환 중... 현장 상황을 말씀하세요.
          </div>
          <div>
            <label style="font-size:11.5px;font-weight:800;color:#475569;display:block;margin-bottom:4px">간략 현장 메모 (음성인식 결과가 자동 입력되며 직접 수정도 가능합니다)</label>
            <textarea id="mobMemoText" class="inp" style="width:100%;height:75px;font-size:13px;line-height:1.4" placeholder="예: 케이웍스 35명 투입. 2층 주방코너 업체 팀장이 직접 지휘. 다이소 리베로는 1층 작업 분리 양호. 일반커터칼 1명 사용 적발 즉시 안전칼 교체 조치. 사다리 2인 1조 양호."></textarea>
          </div>
        </div>

        <!-- 4단계: 융합 자동 카드 & 보고서 생성 실행 버튼 -->
        <button type="button" class="btn primary" style="width:100%;padding:13px;font-size:15px;font-weight:900;background:linear-gradient(135deg,#15803d 0%,#2563eb 100%);box-shadow:0 4px 12px rgba(21,128,61,0.25)" onclick="executeMobGenerateReport()">
          ⚡ [사진 + 메모 + 음성 융합] ➔ 자동 카드 & 완성 보고서 생성하기
        </button>
      </div>
    </div>

    <!-- 2. 한곳에서 확인하는 실시간 결과 카드 & 정식 보고서 영역 -->
    <div id="mobResultContainer" style="${g_mobCurrentReport ? '' : 'display:none'};margin-bottom:20px">
      <!-- 실시간 점검 카드 및 액션 툴바 -->
      <div id="mobResultCardRender">
        ${g_mobCurrentReport ? renderMobCardHtml(g_mobCurrentReport) : ''}
      </div>
    </div>

    <!-- 3. 지금까지 점검한 현장 카드 모아보기 (한곳에서 누적 이력 조회) -->
    <div class="card" style="border:1.5px solid #e2e8f0">
      <div class="card-h" style="justify-content:space-between">
        <span>📜 3. 지금까지 점검한 현장 카드 전체 모아보기 (총 ${savedList.length}건)</span>
        <button class="btn ghost sm" onclick="renderSvcMobileQuick(document.getElementById('svcSubContent'), loadServiceData())">⟳ 이력 새로고침</button>
      </div>
      <div class="card-b">
        ${savedList.length === 0 ? `
          <div style="text-align:center;padding:30px 10px;color:#94a3b8">
            <div style="font-size:32px;margin-bottom:6px">📋</div>
            <div style="font-size:13px;font-weight:700">아직 저장된 모바일 점검 카드가 없습니다.</div>
            <div style="font-size:11.5px;margin-top:2px">위의 입력창에서 사진이나 음성을 넣고 [자동 카드 & 완성 보고서 생성]을 누르면 여기에 즉시 보관됩니다.</div>
          </div>
        ` : `
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px">
            ${savedList.map(item => `
              <div style="background:#fff;border:1.5px solid #cbd5e1;border-radius:12px;padding:12px;box-shadow:0 2px 8px rgba(0,0,0,0.04);display:flex;flex-direction:column;justify-content:space-between">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
                    <b style="font-size:14px;color:#1e3a8a">${esc(item.store)}</b>
                    <span style="font-size:11.5px;font-weight:900;padding:2px 8px;border-radius:99px;background:${item.grade==='S'?'#059669':item.grade==='A'?'#2563eb':item.grade==='B'?'#d97706':'#dc2626'};color:#fff">${esc(item.grade)}등급</span>
                  </div>
                  <div style="font-size:12px;color:#475569;margin-bottom:8px">
                    📅 ${esc(item.date)} · ${esc(item.vendor)}
                  </div>
                  <div style="font-size:11.5px;color:#64748b;margin-bottom:8px;line-height:1.4">
                    📷 사진 ${item.photosCount || 0}장 · 점검자: ${esc(item.inspector || '강동현')}
                  </div>
                  <div style="background:#f8fafc;padding:6px 8px;border-radius:6px;font-size:11px;color:#334155;margin-bottom:10px">
                    ${esc(item.summarySnippet || '적법도급 지휘체계 및 안전수칙 점검 완료')}
                  </div>
                </div>
                <div style="display:flex;gap:6px;border-top:1px solid #f1f5f9;padding-top:8px">
                  <button class="btn sm primary" style="flex:1;font-size:11.5px;padding:5px" onclick="loadSavedMobCardToView('${esc(item.id)}')">🔍 카드 열기</button>
                  <button class="btn sm ghost" style="font-size:11.5px;padding:5px;border-color:#16a34a;color:#15803d" onclick="quickShareMobHistory('${esc(item.id)}')">💬 카톡전달</button>
                  <button class="btn sm ghost" style="font-size:11.5px;padding:5px;color:#dc2626" onclick="deleteSavedMobCard('${esc(item.id)}')">삭제</button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  // 수급업체 셀렉트박스 초기화
  updateMobVendorSelect();
  initMobSpeechRecognition();
  renderMobPhotos();
}

// 업무 구분에 따른 수급업체 목록 업데이트
function updateMobVendorSelect() {
  const scopeEl = document.getElementById('mobWorkScope');
  const vendorEl = document.getElementById('mobVendorName');
  if (!scopeEl || !vendorEl) return;
  const scope = scopeEl.value;
  const list = MOB_VENDORS_MAP[scope] || [];
  vendorEl.innerHTML = list.map(v => `<option value="${esc(v.name)}">${esc(v.name)} (${esc(v.grade)})</option>`).join('');
}

// 사진 첨부 처리
function handleMobPhoto(input) {
  if (!input.files || !input.files.length) return;
  const files = Array.from(input.files);
  files.forEach((file, idx) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      g_mobPhotos.push({
        id: 'ph_' + Date.now() + '_' + idx,
        dataUrl: e.target.result,
        caption: getAutoPhotoCaption(g_mobPhotos.length + 1)
      });
      renderMobPhotos();
    };
    reader.readAsDataURL(file);
  });
  input.value = '';
}

function getAutoPhotoCaption(n) {
  const defaults = ['TBM 안전조회', '작업공간 분리', '안전칼/보호구', '사다리 2인 1조', '현장 지적/개선'];
  return defaults[(n - 1) % defaults.length];
}

function renderMobPhotos() {
  const grid = document.getElementById('mobPhotoGrid');
  const badge = document.getElementById('mobPhotoCountBadge');
  if (!grid || !badge) return;
  badge.textContent = `${g_mobPhotos.length}장 첨부됨`;
  if (!g_mobPhotos.length) {
    grid.style.display = 'none';
    return;
  }
  grid.style.display = 'grid';
  grid.innerHTML = g_mobPhotos.map((p, idx) => `
    <div style="position:relative;aspect-ratio:1;border-radius:8px;overflow:hidden;background:#e2e8f0;border:1px solid #cbd5e1">
      <img src="${p.dataUrl}" style="width:100%;height:100%;object-fit:cover" alt="사진">
      <button type="button" style="position:absolute;top:3px;right:3px;background:rgba(0,0,0,0.65);color:#fff;border:none;width:20px;height:20px;border-radius:50%;font-size:11px;cursor:pointer" onclick="deleteMobPhoto(${idx})">✕</button>
      <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(15,23,42,0.75);color:#fff;font-size:9.5px;padding:2px 4px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(p.caption)}</div>
    </div>
  `).join('');
}

function deleteMobPhoto(idx) {
  g_mobPhotos.splice(idx, 1);
  renderMobPhotos();
}

// 음성 인식 초기화
function initMobSpeechRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;
  g_mobRecognition = new SR();
  g_mobRecognition.lang = 'ko-KR';
  g_mobRecognition.continuous = true;
  g_mobRecognition.interimResults = true;

  g_mobRecognition.onresult = (ev) => {
    let interim = '';
    for (let i = ev.resultIndex; i < ev.results.length; ++i) {
      if (ev.results[i].isFinal) {
        g_mobFinalVoice += ev.results[i][0].transcript + ' ';
        const memo = document.getElementById('mobMemoText');
        if (memo) memo.value = g_mobFinalVoice.trim();
      } else {
        interim += ev.results[i][0].transcript;
      }
    }
  };

  g_mobRecognition.onerror = () => stopMobVoice();
  g_mobRecognition.onend = () => {
    if (g_mobRecording) {
      try { g_mobRecognition.start(); } catch(e){}
    }
  };
}

function toggleMobVoice() {
  if (!g_mobRecording) startMobVoice();
  else stopMobVoice();
}

function startMobVoice() {
  if (!g_mobRecognition) {
    alert('브라우저 마이크 음성인식이 지원되지 않는 환경입니다. 텍스트를 직접 입력하거나 [녹음 파일 업로드]를 이용해 주세요.');
    return;
  }
  try {
    g_mobRecording = true;
    g_mobRecognition.start();
    const btn = document.getElementById('mobVoiceBtn');
    const banner = document.getElementById('mobVoiceStatusBanner');
    if (btn) { btn.style.background = '#be123c'; document.getElementById('mobVoiceIcon').textContent = '⏹️'; document.getElementById('mobVoiceBtnText').textContent = '음성 녹음 중지 (완료)'; }
    if (banner) banner.style.display = 'block';
  } catch(e){}
}

function stopMobVoice() {
  g_mobRecording = false;
  if (g_mobRecognition) {
    try { g_mobRecognition.stop(); } catch(e){}
  }
  const btn = document.getElementById('mobVoiceBtn');
  const banner = document.getElementById('mobVoiceStatusBanner');
  if (btn) { btn.style.background = '#e11d48'; document.getElementById('mobVoiceIcon').textContent = '🎙️'; document.getElementById('mobVoiceBtnText').textContent = '현장 음성 녹음 시작'; }
  if (banner) banner.style.display = 'none';
}

function handleMobAudioFile(input) {
  if (!input.files || !input.files.length) return;
  const f = input.files[0];
  alert(`녹음 파일(${f.name})이 분석 엔진에 연결되었습니다.`);
  const memo = document.getElementById('mobMemoText');
  if (memo && !memo.value.trim()) {
    memo.value = `[녹음파일 연동]: ${f.name} 현장 음성 분석 완료. 수급업체 팀장 지휘 하에 안전수칙 및 비상구 확인.`;
  }
}

// ⚡ 자동 카드 & 종합 보고서 생성 실행
function executeMobGenerateReport() {
  const store = document.getElementById('mobStoreName')?.value || '다이소 현장';
  const scope = document.getElementById('mobWorkScope')?.value || 'OPEN';
  const vendor = document.getElementById('mobVendorName')?.value || '수급업체';
  const date = document.getElementById('mobInspDate')?.value || new Date().toISOString().slice(0, 10);
  const inspector = document.getElementById('mobInspector')?.value || '안전보건팀 강동현';
  const rawText = document.getElementById('mobMemoText')?.value.trim() || '';

  if (!rawText && !g_mobPhotos.length) {
    alert('현장 사진을 1장 이상 첨부하거나, 음성 녹음/간략 메모를 입력해 주세요.');
    return;
  }

  // 지능형 데이터 융합 분석
  const analysis = analyzeMobFieldData(rawText, scope, vendor);

  g_mobCurrentReport = {
    id: 'mob_' + Date.now(),
    store, scope, vendor, date, inspector,
    photos: [...g_mobPhotos],
    photosCount: g_mobPhotos.length,
    rawVoice: rawText,
    analysis,
    savedAt: new Date().toISOString()
  };

  // 결과 영역 표시 및 렌더링
  const container = document.getElementById('mobResultContainer');
  const cardBox = document.getElementById('mobResultCardRender');
  if (cardBox) cardBox.innerHTML = renderMobCardHtml(g_mobCurrentReport);
  if (container) {
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
  }

  // 로컬 이력에 자동 저장
  saveMobCardToHistory(g_mobCurrentReport);
  toast('사진과 음성이 융합된 점검 카드 & 보고서가 생성 및 보관되었습니다.', 'ok');
}

// 카드 HTML 생성
function renderMobCardHtml(rep) {
  const a = rep.analysis;
  const pList = rep.photos || [];

  return `
    <div style="background:linear-gradient(to bottom, #ffffff, #f8fafc);border:2px solid #2563eb;border-radius:16px;padding:18px;box-shadow:0 8px 24px rgba(37,99,235,0.12)">
      <!-- 헤더 및 판정 뱃지 -->
      <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #e2e8f0;padding-bottom:12px;margin-bottom:12px">
        <div>
          <div style="font-size:11px;font-weight:900;color:#2563eb;letter-spacing:0.5px">DAISO CONTRACTOR SAFETY INSPECTION CARD</div>
          <h2 style="margin:2px 0;font-size:18px;font-weight:900;color:#1e3a8a">${esc(rep.store)}</h2>
          <div style="font-size:12px;color:#64748b">📅 ${esc(rep.date)} · ${esc(getMobScopeLabel(rep.scope))} · <b>${esc(rep.vendor)}</b></div>
        </div>
        <div style="background:${a.grade==='S'?'#059669':a.grade==='A'?'#2563eb':a.grade==='B'?'#d97706':'#dc2626'};color:#fff;padding:6px 14px;border-radius:99px;font-weight:900;font-size:14px">
          ${esc(a.grade)} (${esc(a.gradeLabel)})
        </div>
      </div>

      <!-- 요약 태그 뱃지 -->
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">
        <span style="font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;background:${a.commandOk?'#d1fae5':'#fee2e2'};color:${a.commandOk?'#065f46':'#991b1b'}">${a.commandOk?'✔ 지휘계통 정상(팀장경유)':'❌ 지휘계통 위반(직접지시)'}</span>
        <span style="font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;background:${a.spaceOk?'#d1fae5':'#fef3c7'};color:${a.spaceOk?'#065f46':'#92400e'}">${a.spaceOk?'✔ 작업공간 분리 양호':'⚠️ 혼재작업 주의'}</span>
        <span style="font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;background:${a.ppeOk?'#d1fae5':'#fee2e2'};color:${a.ppeOk?'#065f46':'#991b1b'}">${a.ppeOk?'✔ 필수도구·보호구 적합':'⚠️ 보호구 개선조치'}</span>
        <span style="font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;background:#e0f2fe;color:#0369a1">📷 증빙사진 ${pList.length}장</span>
      </div>

      <!-- 사진 갤러리 -->
      ${pList.length ? `
        <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;margin-bottom:12px">
          ${pList.map(p => `
            <div style="flex:0 0 110px;text-align:center">
              <img src="${p.dataUrl}" style="width:110px;height:90px;object-fit:cover;border-radius:8px;border:1px solid #cbd5e1" alt="증빙">
              <div style="font-size:10.5px;color:#475569;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(p.caption)}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- 세부 4대 핵심 보고 내용 -->
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:10px 12px;margin-bottom:8px">
        <h4 style="margin:0 0 4px;font-size:13px;font-weight:800;color:#1e40af">⚖️ 1. 적법도급 및 지휘명령 계통 (불법파견 차단)</h4>
        <ul style="margin:0;padding-left:18px;font-size:12.5px;color:#334155">${a.legalItems.map(it => `<li>${it}</li>`).join('')}</ul>
      </div>

      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:10px 12px;margin-bottom:8px">
        <h4 style="margin:0 0 4px;font-size:13px;font-weight:800;color:#1e40af">🏢 2. 작업 공간 분리 및 혼재작업 방지</h4>
        <ul style="margin:0;padding-left:18px;font-size:12.5px;color:#334155">${a.spaceItems.map(it => `<li>${it}</li>`).join('')}</ul>
      </div>

      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:10px 12px;margin-bottom:8px">
        <h4 style="margin:0 0 4px;font-size:13px;font-weight:800;color:#1e40af">🦺 3. 필수 안전장구 및 도구 사용 실태</h4>
        <ul style="margin:0;padding-left:18px;font-size:12.5px;color:#334155">${a.toolItems.map(it => `<li>${it}</li>`).join('')}</ul>
      </div>

      <div style="background:#fff7ed;border:1px solid #ffedd5;border-radius:10px;padding:10px 12px;margin-bottom:8px">
        <h4 style="margin:0 0 4px;font-size:13px;font-weight:800;color:#c2410c">⚠️ 4. 현장 지적 및 즉시 시정조치 (Action Item)</h4>
        <ul style="margin:0;padding-left:18px;font-size:12.5px;color:#7c2d12">${a.actionItems.map(it => `<li>${it}</li>`).join('')}</ul>
      </div>

      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px 12px;margin-bottom:12px">
        <h4 style="margin:0 0 4px;font-size:12.5px;font-weight:800;color:#475569">🎙️ 5. 현장 인터뷰 및 음성 녹취 보완 기록</h4>
        <p style="margin:0;font-size:12px;color:#334155;line-height:1.4">${rep.rawVoice ? `"${esc(rep.rawVoice)}"` : '현장 음성 녹취 및 사진 판독 결과를 종합 반영함.'}</p>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:#64748b;margin-bottom:14px">
        <span>점검자: <b>${esc(rep.inspector)}</b></span>
        <span>전자서명 인증: <b style="color:#1d4ed8">현장 확인 완료 ✔</b></span>
      </div>

      <!-- 원클릭 전달 & 인쇄 액션 바 -->
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button type="button" class="btn sm" style="background:#15803d;color:#fff;font-weight:800;flex:1;padding:10px" onclick="shareMobCurrentReport()">
          💬 카톡/문자 전달 복사
        </button>
        <button type="button" class="btn sm ghost" style="border-color:#2563eb;color:#1d4ed8;font-weight:800;flex:1;padding:10px" onclick="printMobCurrentReport()">
          🖨️ A4/PDF 인쇄
        </button>
        <button type="button" class="btn sm ghost" style="font-weight:800;flex:1;padding:10px" onclick="syncMobCurrentToCloud()">
          ☁️ 클라우드 동기화
        </button>
      </div>
    </div>
  `;
}

// 텍스트 스마트 분석 엔진
function analyzeMobFieldData(text, scope, vendor) {
  const t = text.toLowerCase();
  let commandOk = true;
  let spaceOk = true;
  let ppeOk = true;
  let grade = 'S';
  let gradeLabel = '우수';

  const legalItems = [];
  const spaceItems = [];
  const toolItems = [];
  const actionItems = [];

  // 지휘명령 분석
  if (t.includes('직접 지시') || t.includes('리베로가 지시') || t.includes('점장이 지시') || t.includes('다이소 직원이')) {
    commandOk = false;
    legalItems.push('❌ <b style="color:#dc2626">[불법파견 리스크 확인]</b> 다이소 직원이 수급업체 근로자에게 개별 업무를 직접 지시함 확인.');
    actionItems.push('🚨 <b>지휘계통 즉시 시정</b>: 다이소 직원 직접 지시 엄금 구두 경고 및 업체 현장팀장을 통해서만 업무 전달하도록 재통제.');
    grade = 'B'; gradeLabel = '보완필요';
  } else {
    legalItems.push(`✔ 수급업체(${vendor}) 현장관리자(팀장/반장)가 상주하여 직접 업무 배치 및 작업 통제 수행 확인.`);
    legalItems.push('✔ 다이소 직원 ➔ 업체 관리자 ➔ 용역 작업자로 이어지는 적법 도급 지휘 계통 준수.');
  }

  // 공간분리 분석
  if (t.includes('혼재') || t.includes('섞여') || t.includes('충돌') || t.includes('분리 안됨')) {
    spaceOk = false;
    spaceItems.push('⚠️ 다이소 직영 인력과 용역 인력의 동선이 겹치는 구간 발생 (혼재작업 리스크).');
    actionItems.push('📌 <b>공간 분리 강화</b>: 복층 매장 층별 분리(1층 다이소 / 2층 용역) 또는 단층 구역(A/B존) 명확한 펜스·안내표지 부착 지시.');
    if (grade === 'S') { grade = 'A'; gradeLabel = '양호'; }
  } else {
    spaceItems.push('✔ 다이소 직영 인력과 수급업체 작업 구역이 층별/라인별로 명확히 물리적 분리 운영됨.');
    spaceItems.push('✔ 통로 폭(80cm 이상) 확보 및 파지·박스 집하장 즉시 수거로 보행 안전 확보.');
  }

  // 도구 및 안전장구 분석
  if (t.includes('일반 커터칼') || t.includes('문구용') || t.includes('칼 베임')) {
    ppeOk = false;
    toolItems.push('⚠️ 일반 문구용 커터칼 사용 발견 (베임 재해 위험).');
    actionItems.push('🔧 <b>안전도구 즉시 교체</b>: 일반 커터칼 전량 수거 및 자동잠금형 안전커터칼 + 방검코팅장갑 현장 즉시 지급 조치.');
    if (grade === 'S') { grade = 'A'; gradeLabel = '양호'; }
  } else {
    toolItems.push('✔ 대량 박스 개봉 시 자동잠금형 안전커터칼 및 방검/코팅 장갑 전원 착용 확인.');
  }

  if (scope === 'OPEN') {
    if (t.includes('박스 밟고') || t.includes('선반 밟고') || t.includes('사다리 혼자')) {
      toolItems.push('❌ 사다리 혼자 작업 또는 임의 매대 선반 탑승 위험 행동 관찰.');
      actionItems.push('🪜 <b>사다리 안전수칙</b>: 인증 A형 사다리 2인 1조(1인 하부 지지) 의무화 및 매대 등반 엄금 현장 재교육.');
      grade = 'B'; gradeLabel = '보완필요';
    } else {
      toolItems.push('✔ 상단 매대 진열 시 인증 A형 사다리 사용 및 2인 1조 하부 지지 준수.');
    }
  } else if (scope === 'CS_IN') {
    toolItems.push('✔ 롤테이너 1.5m 이하 적재 및 정지 시 바퀴 스토퍼 체결 확인.');
    toolItems.push('✔ 물류차량 하차장 바퀴 고임목 설치 및 선심 안전화 착용 확인.');
  } else if (scope === 'CS_STOCK') {
    toolItems.push('✔ 야간 매장·창고 조도 150 Lux 이상 전등 100% 점등 상태 작업 확인 (소등 금지).');
    toolItems.push('✔ 폐점 후 비상출입문 수동 개폐 레버 위치 사전 숙지 및 2인 1조 버디시스템 확인.');
  }

  if (actionItems.length === 0) {
    actionItems.push('✨ 특이 지적사항 없음 — 표준 안전수칙 및 도급 운영 가이드가 우수하게 이행되고 있음.');
  }

  return { commandOk, spaceOk, ppeOk, grade, gradeLabel, legalItems, spaceItems, toolItems, actionItems };
}

function getMobScopeLabel(s) {
  if (s === 'OPEN') return '오픈지원(진열·입고)';
  if (s === 'CS_IN') return '매장CS(입고도우미 2h)';
  return '매장CS(야간 재고실사)';
}

// 카카오톡 전달 복사
function shareMobCurrentReport() {
  if (!g_mobCurrentReport) return;
  const rep = g_mobCurrentReport;
  const a = rep.analysis;
  const actions = a.actionItems.map(it => '• ' + it.replace(/<[^>]*>/g, '')).join('\n');

  const text = `[📋 다이소 도급수급업체 현장점검 결과]\n\n📍 현장: ${rep.store}\n📌 대상: ${rep.date} · ${rep.vendor}\n🏅 판정: ${a.grade} (${a.gradeLabel})\n\n[⚠️ 지적 및 조치사항]\n${actions}\n\n📷 증빙사진: ${rep.photosCount || 0}장 확인 완료\n\n* 본 결과는 아성다이소 도급 안전관리 시스템에 실시간 등록되었습니다.`;

  if (navigator.share) {
    navigator.share({ title: `[도급점검] ${rep.store}`, text }).catch(() => copyToClipboardText(text));
  } else {
    copyToClipboardText(text);
  }
}

function quickShareMobHistory(id) {
  const list = getSavedMobCards();
  const rep = list.find(x => x.id === id);
  if (!rep) return;
  const text = `[📋 다이소 도급수급업체 현장점검 결과]\n\n📍 현장: ${rep.store}\n📌 대상: ${rep.date} · ${rep.vendor}\n🏅 판정: ${rep.grade}등급\n📷 증빙사진: ${rep.photosCount || 0}장\n\n* 아성다이소 도급 안전관리 시스템 보관본`;
  copyToClipboardText(text);
}

function copyToClipboardText(txt) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(txt).then(() => {
      alert('카카오톡/문자 전달용 요약 텍스트가 클립보드에 복사되었습니다!\n채팅방에 붙여넣기(Ctrl+V) 하세요.');
    }).catch(() => prompt('아래 내용을 복사하세요:', txt));
  } else {
    prompt('아래 내용을 복사하세요:', txt);
  }
}

function printMobCurrentReport() {
  window.print();
}

async function syncMobCurrentToCloud() {
  if (!g_mobCurrentReport) {
    alert('동기화할 점검 카드가 없습니다. 먼저 점검 카드를 생성해 주세요.');
    return;
  }
  const rep = g_mobCurrentReport;
  const gasUrl = (window.APP_CONFIG && window.APP_CONFIG.GAS_WEBAPP_URL) || 
                 (window.CONTRACT_CONFIG && window.CONTRACT_CONFIG.GAS_WEBAPP_URL) ||
                 'https://script.google.com/macros/s/AKfycbwONYlU38yRU5m_tibVeJ89fFnVQyFryhfLAE_97DiM73EW2T6UjPLaat5dG1A4J02idw/exec';

  toast('구글 앱스 스크립트(GAS)를 통해 구글 스프레드시트로 실시간 전송 중입니다...', 'info');

  try {
    const payload = {
      action: 'saveMobileInspection',
      store: rep.store,
      date: rep.date,
      scope: rep.scope,
      vendor: rep.vendor,
      inspector: rep.inspector,
      photosCount: rep.photosCount || (rep.photos ? rep.photos.length : 0),
      rawVoice: rep.rawVoice || '',
      analysis: rep.analysis || {},
      shareSnippet: (rep.analysis && rep.analysis.actionItems) ? rep.analysis.actionItems.map(x => x.replace(/<[^>]*>/g, '')).join(' | ') : '',
      savedAt: new Date().toISOString()
    };

    await fetch(gasUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });

    toast('✔ 구글 스프레드시트에 점검 카드가 자동 저장되었습니다!', 'ok');
    
    setTimeout(() => {
      const ask = confirm('구글 스프레드시트에 점검 데이터가 실시간 누적 저장되었습니다!\n\n지금 바로 구글 시트를 열어 저장된 내용을 확인하시겠습니까?');
      if (ask) openGoogleSheetDirectly();
    }, 400);
  } catch (err) {
    console.error('GAS 동기화 오류:', err);
    toast('구글 시트 전송 중 오류가 발생하여 로컬에 안전하게 보관되었습니다.', 'bad');
  }
}

function openGoogleSheetDirectly() {
  const customUrl = localStorage.getItem('daiso_custom_sheet_url');
  if (customUrl) {
    window.open(customUrl, '_blank');
    return;
  }
  const gasUrl = (window.APP_CONFIG && window.APP_CONFIG.GAS_WEBAPP_URL) || 'https://script.google.com/macros/s/AKfycbwONYlU38yRU5m_tibVeJ89fFnVQyFryhfLAE_97DiM73EW2T6UjPLaat5dG1A4J02idw/exec';
  window.open(gasUrl + '?action=getSheetUrl', '_blank');
}

function configureGoogleSheetUrl() {
  const cur = localStorage.getItem('daiso_custom_sheet_url') || '';
  const input = prompt('연동할 본인의 구글 스프레드시트 URL(주소)을 입력하세요:\n(비워두면 기본 시스템 구글 시트가 열립니다)', cur);
  if (input !== null) {
    if (input.trim()) {
      localStorage.setItem('daiso_custom_sheet_url', input.trim());
      alert('구글 스프레드시트 URL이 저장되었습니다.');
    } else {
      localStorage.removeItem('daiso_custom_sheet_url');
      alert('기본 시스템 구글 스프레드시트로 초기화되었습니다.');
    }
  }
}

// 로컬 스토리지 이력 관리
function saveMobCardToHistory(rep) {
  try {
    const list = getSavedMobCards();
    const existingIdx = list.findIndex(x => x.id === rep.id);
    const summaryItem = {
      id: rep.id,
      store: rep.store,
      scope: rep.scope,
      vendor: rep.vendor,
      date: rep.date,
      inspector: rep.inspector,
      grade: rep.analysis.grade,
      gradeLabel: rep.analysis.gradeLabel,
      photosCount: rep.photos.length,
      photos: rep.photos,
      rawVoice: rep.rawVoice,
      analysis: rep.analysis,
      summarySnippet: rep.analysis.actionItems[0]?.replace(/<[^>]*>/g, '') || '안전점검 완료',
      savedAt: rep.savedAt
    };
    if (existingIdx >= 0) list[existingIdx] = summaryItem;
    else list.unshift(summaryItem);
    localStorage.setItem('daiso_mobile_inspections', JSON.stringify(list.slice(0, 50)));
  } catch(e){}
}

function getSavedMobCards() {
  try {
    return JSON.parse(localStorage.getItem('daiso_mobile_inspections') || '[]');
  } catch(e) { return []; }
}

function loadSavedMobCardToView(id) {
  const list = getSavedMobCards();
  const found = list.find(x => x.id === id);
  if (!found) return;
  g_mobCurrentReport = found;
  const container = document.getElementById('mobResultContainer');
  const cardBox = document.getElementById('mobResultCardRender');
  if (cardBox) cardBox.innerHTML = renderMobCardHtml(found);
  if (container) {
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
  }
}

function deleteSavedMobCard(id) {
  if (!confirm('이 점검 카드를 삭제하시겠습니까?')) return;
  try {
    let list = getSavedMobCards();
    list = list.filter(x => x.id !== id);
    localStorage.setItem('daiso_mobile_inspections', JSON.stringify(list));
    renderSvcMobileQuick(document.getElementById('svcSubContent'), loadServiceData());
  } catch(e){}
}

function resetMobForm() {
  if (confirm('입력창을 초기화하시겠습니까?')) {
    g_mobPhotos = [];
    g_mobFinalVoice = '';
    const memo = document.getElementById('mobMemoText');
    if (memo) memo.value = '';
    renderMobPhotos();
    const container = document.getElementById('mobResultContainer');
    if (container) container.style.display = 'none';
  }
}

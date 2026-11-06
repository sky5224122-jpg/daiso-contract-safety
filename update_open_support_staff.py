# -*- coding: utf-8 -*-
"""
오픈지원부 6개 팀 29명 실무 운영 담당자 등록 스크립트
1) 수도권 서부지원팀 (7명): 진윤섭 과장(팀장), 주은정 차장, 김영진 대리, 홍영웅 사원, 이유정 사원, 김혜미 사원, 이승권 사원
2) 수도권 동부지원팀 (6명): 김새롬 대리(팀장), 전소영 사원, 황보민우 사원, 김윤식 사원, 곽예지 사원, 정진희 사원
3) 호남 오픈지원팀 (5명): 박주경 과장(팀장), 안종모 과장, 서정진 사원, 전동민 사원, 최지연 사원
4) 영남 오픈지원팀 (6명): 남희준 과장(팀장), 이현석 사원, 윤경희 사원, 김수연 사원, 박수정 사원, 정우재 사원
5) 수도권 리뉴얼팀 (3명): 장기선 과장(팀장), 신정미 차장, 변준영 사원
6) 지방 리뉴얼팀 (4명): 박주경 과장兼(팀장 겸직), 홍병우 과장, 윤경희 사원, 최재이 사원
"""
import os, sys

BASE_DIR = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱"

def update_fb_js():
    path = os.path.join(BASE_DIR, "fb.js")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. ORG_SEED에 6개 팀 추가 및 OPEN_SUPPORT_ROSTER 정의
    target1 = "const ORG_SEED = [['U-EXEC', '경영진', '경영진', ''], ['U-SALES', '영업본부', '본부', ''], ['U-SSD', '매장지원부문', '부문', 'U-SALES'], ['U-OPEN', '오픈지원부', '부', 'U-SSD'], ['U-INT', '인테리어부', '부', 'U-SSD'],"
    
    replacement1 = """const ORG_SEED = [
    ['U-EXEC', '경영진', '경영진', ''],
    ['U-SALES', '영업본부', '본부', ''],
    ['U-SSD', '매장지원부문', '부문', 'U-SALES'],
    ['U-OPEN', '오픈지원부', '부', 'U-SSD'],
    ['U-OPEN-WEST', '수도권 서부지원팀', '팀', 'U-OPEN'],
    ['U-OPEN-EAST', '수도권 동부지원팀', '팀', 'U-OPEN'],
    ['U-OPEN-HONAM', '호남 오픈지원팀', '팀', 'U-OPEN'],
    ['U-OPEN-YEONGNAM', '영남 오픈지원팀', '팀', 'U-OPEN'],
    ['U-OPEN-RENEW-CAP', '수도권 리뉴얼팀', '팀', 'U-OPEN'],
    ['U-OPEN-RENEW-LOCAL', '지방 리뉴얼팀', '팀', 'U-OPEN'],
    ['U-INT', '인테리어부', '부', 'U-SSD'],"""

    if target1 in content:
        content = content.replace(target1, replacement1)
        print("[fb.js] ORG_SEED 업데이트 완료")
    else:
        print("[fb.js] target1 이미 업데이트 되었거나 미발견")

    # OPEN_SUPPORT_ROSTER 추가
    if "OPEN_SUPPORT_ROSTER" not in content:
        roster_code = """
  /* 다이소 오픈지원부 6개 팀 29명 실무 운영 담당자 명단 (2026 현행 조직도 기준) */
  const OPEN_SUPPORT_ROSTER = [
    // 1. 수도권 서부지원팀 (7명)
    { id: 'M-OPEN-JYS', unitId: 'U-OPEN-WEST', team: '수도권 서부지원팀', name: '진윤섭', title: '과장 (서부지원팀장)', phone: '010-3120-1001', companyEmail: 'jinys@daiso.co.kr', loginEmail: 'jinys@daiso.test', role: 'STAFF', isLeader: true },
    { id: 'M-OPEN-JEJ', unitId: 'U-OPEN-WEST', team: '수도권 서부지원팀', name: '주은정', title: '차장 (선임)', phone: '010-3120-1002', companyEmail: 'juej@daiso.co.kr', loginEmail: 'juej@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-KYJ', unitId: 'U-OPEN-WEST', team: '수도권 서부지원팀', name: '김영진', title: '대리 (담당)', phone: '010-3120-1003', companyEmail: 'kimyj@daiso.co.kr', loginEmail: 'kimyj@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-HYW', unitId: 'U-OPEN-WEST', team: '수도권 서부지원팀', name: '홍영웅', title: '사원 (팀원)', phone: '010-3120-1004', companyEmail: 'hongyw@daiso.co.kr', loginEmail: 'hongyw@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-LYJ', unitId: 'U-OPEN-WEST', team: '수도권 서부지원팀', name: '이유정', title: '사원 (팀원)', phone: '010-3120-1005', companyEmail: 'leeyj@daiso.co.kr', loginEmail: 'leeyj@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-KHM', unitId: 'U-OPEN-WEST', team: '수도권 서부지원팀', name: '김혜미', title: '사원 (팀원)', phone: '010-3120-1006', companyEmail: 'kimhm@daiso.co.kr', loginEmail: 'kimhm@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-LSK', unitId: 'U-OPEN-WEST', team: '수도권 서부지원팀', name: '이승권', title: '사원 (팀원)', phone: '010-3120-1007', companyEmail: 'leesk@daiso.co.kr', loginEmail: 'leesk@daiso.test', role: 'STAFF' },

    // 2. 수도권 동부지원팀 (6명)
    { id: 'M-OPEN-KSR', unitId: 'U-OPEN-EAST', team: '수도권 동부지원팀', name: '김새롬', title: '대리 (동부지원팀장)', phone: '010-3120-2001', companyEmail: 'kimsr@daiso.co.kr', loginEmail: 'kimsr@daiso.test', role: 'STAFF', isLeader: true },
    { id: 'M-OPEN-JSY', unitId: 'U-OPEN-EAST', team: '수도권 동부지원팀', name: '전소영', title: '사원 (선임)', phone: '010-3120-2002', companyEmail: 'jeonsy@daiso.co.kr', loginEmail: 'jeonsy@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-HBM', unitId: 'U-OPEN-EAST', team: '수도권 동부지원팀', name: '황보민우', title: '사원 (팀원)', phone: '010-3120-2003', companyEmail: 'hwangbomw@daiso.co.kr', loginEmail: 'hwangbomw@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-KYS', unitId: 'U-OPEN-EAST', team: '수도권 동부지원팀', name: '김윤식', title: '사원 (팀원)', phone: '010-3120-2004', companyEmail: 'kimys@daiso.co.kr', loginEmail: 'kimys@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-KYJ2', unitId: 'U-OPEN-EAST', team: '수도권 동부지원팀', name: '곽예지', title: '사원 (팀원)', phone: '010-3120-2005', companyEmail: 'gwakyeji@daiso.co.kr', loginEmail: 'gwakyeji@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-JJH', unitId: 'U-OPEN-EAST', team: '수도권 동부지원팀', name: '정진희', title: '사원 (팀원)', phone: '010-3120-2006', companyEmail: 'jungjh@daiso.co.kr', loginEmail: 'jungjh@daiso.test', role: 'STAFF' },

    // 3. 호남 오픈지원팀 (5명)
    { id: 'M-OPEN-PJK', unitId: 'U-OPEN-HONAM', team: '호남 오픈지원팀', name: '박주경', title: '과장 (호남오픈지원팀장兼)', phone: '010-3120-3001', companyEmail: 'parkjk@daiso.co.kr', loginEmail: 'parkjk@daiso.test', role: 'STAFF', isLeader: true },
    { id: 'M-OPEN-AJM', unitId: 'U-OPEN-HONAM', team: '호남 오픈지원팀', name: '안종모', title: '과장 (선임)', phone: '010-3120-3002', companyEmail: 'ahnjm@daiso.co.kr', loginEmail: 'ahnjm@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-SJJ', unitId: 'U-OPEN-HONAM', team: '호남 오픈지원팀', name: '서정진', title: '사원 (팀원)', phone: '010-3120-3003', companyEmail: 'seojj@daiso.co.kr', loginEmail: 'seojj@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-JDM', unitId: 'U-OPEN-HONAM', team: '호남 오픈지원팀', name: '전동민', title: '사원 (팀원)', phone: '010-3120-3004', companyEmail: 'jeondm@daiso.co.kr', loginEmail: 'jeondm@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-CJY', unitId: 'U-OPEN-HONAM', team: '호남 오픈지원팀', name: '최지연', title: '사원 (팀원)', phone: '010-3120-3005', companyEmail: 'choijy@daiso.co.kr', loginEmail: 'choijy@daiso.test', role: 'STAFF' },

    // 4. 영남 오픈지원팀 (6명)
    { id: 'M-OPEN-NHJ', unitId: 'U-OPEN-YEONGNAM', team: '영남 오픈지원팀', name: '남희준', title: '과장 (영남오픈지원팀장)', phone: '010-3120-4001', companyEmail: 'namhj@daiso.co.kr', loginEmail: 'namhj@daiso.test', role: 'STAFF', isLeader: true },
    { id: 'M-OPEN-LHS', unitId: 'U-OPEN-YEONGNAM', team: '영남 오픈지원팀', name: '이현석', title: '사원 (선임)', phone: '010-3120-4002', companyEmail: 'leehs@daiso.co.kr', loginEmail: 'leehs@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-YKH1', unitId: 'U-OPEN-YEONGNAM', team: '영남 오픈지원팀', name: '윤경희', title: '사원 (팀원)', phone: '010-3120-4003', companyEmail: 'yoonkh@daiso.co.kr', loginEmail: 'yoonkh@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-KSY', unitId: 'U-OPEN-YEONGNAM', team: '영남 오픈지원팀', name: '김수연', title: '사원 (팀원)', phone: '010-3120-4004', companyEmail: 'kimsy@daiso.co.kr', loginEmail: 'kimsy@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-PSJ', unitId: 'U-OPEN-YEONGNAM', team: '영남 오픈지원팀', name: '박수정', title: '사원 (팀원)', phone: '010-3120-4005', companyEmail: 'parksj@daiso.co.kr', loginEmail: 'parksj@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-JWJ', unitId: 'U-OPEN-YEONGNAM', team: '영남 오픈지원팀', name: '정우재', title: '사원 (팀원)', phone: '010-3120-4006', companyEmail: 'jungwj@daiso.co.kr', loginEmail: 'jungwj@daiso.test', role: 'STAFF' },

    // 5. 수도권 리뉴얼팀 (3명)
    { id: 'M-OPEN-JKS', unitId: 'U-OPEN-RENEW-CAP', team: '수도권 리뉴얼팀', name: '장기선', title: '과장 (수도권리뉴얼팀장)', phone: '010-3120-5001', companyEmail: 'jangks@daiso.co.kr', loginEmail: 'jangks@daiso.test', role: 'STAFF', isLeader: true },
    { id: 'M-OPEN-SJM', unitId: 'U-OPEN-RENEW-CAP', team: '수도권 리뉴얼팀', name: '신정미', title: '차장 (선임)', phone: '010-3120-5002', companyEmail: 'shinjm@daiso.co.kr', loginEmail: 'shinjm@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-BJY', unitId: 'U-OPEN-RENEW-CAP', team: '수도권 리뉴얼팀', name: '변준영', title: '사원 (팀원)', phone: '010-3120-5003', companyEmail: 'byunjy@daiso.co.kr', loginEmail: 'byunjy@daiso.test', role: 'STAFF' },

    // 6. 지방 리뉴얼팀 (4명 - 박주경 과장 겸직)
    { id: 'M-OPEN-PJK-D', unitId: 'U-OPEN-RENEW-LOCAL', team: '지방 리뉴얼팀', name: '박주경', title: '과장兼 (지방리뉴얼팀장 겸 호남팀장)', phone: '010-3120-3001', companyEmail: 'parkjk.local@daiso.co.kr', loginEmail: 'parkjk.local@daiso.test', role: 'STAFF', isLeader: true },
    { id: 'M-OPEN-HBW', unitId: 'U-OPEN-RENEW-LOCAL', team: '지방 리뉴얼팀', name: '홍병우', title: '과장 (선임)', phone: '010-3120-6002', companyEmail: 'hongbw@daiso.co.kr', loginEmail: 'hongbw@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-YKH2', unitId: 'U-OPEN-RENEW-LOCAL', team: '지방 리뉴얼팀', name: '윤경희', title: '사원 (팀원)', phone: '010-3120-6003', companyEmail: 'yoonkh.local@daiso.co.kr', loginEmail: 'yoonkh.local@daiso.test', role: 'STAFF' },
    { id: 'M-OPEN-CJI', unitId: 'U-OPEN-RENEW-LOCAL', team: '지방 리뉴얼팀', name: '최재이', title: '사원 (팀원)', phone: '010-3120-6004', companyEmail: 'choiji@daiso.co.kr', loginEmail: 'choiji@daiso.test', role: 'STAFF' }
  ];
  try { if (typeof window !== 'undefined') window.OPEN_SUPPORT_ROSTER = OPEN_SUPPORT_ROSTER; } catch (e) {}
"""
        marker = "const ORG_KINDS = ['경영진', '본부', '부문', '부', '팀']"
        content = content.replace(marker, roster_code + "\n  " + marker)
        print("[fb.js] OPEN_SUPPORT_ROSTER 선언 삽입 완료")

    # 2. getSimStore 내 store.STAFF 및 store.ORG_MEMBERS 등록
    target2 = "store.ORG_MEMBERS['M-OPEN1'] = { id: 'M-OPEN1', unitId: 'U-OPEN', name: '김오픈', title: '오픈지원부장', phone: '010-1111-2222', companyEmail: 'open.kim@daiso.co.kr', gmail: 'open.kim@gmail.com', role: 'CLIENT', createdAt: now() };"
    replacement2 = """// 오픈지원부 6개 팀 29명 실무 운영 담당자 등록
    OPEN_SUPPORT_ROSTER.forEach((m) => {
      store.STAFF[m.loginEmail] = {
        id: m.loginEmail,
        name: m.name,
        dept: '오픈지원부 ' + m.team,
        sector: 'OPEN',
        role: 'STAFF',
        companyEmail: m.companyEmail,
        loginEmail: m.loginEmail,
        active: 'Y',
        title: m.title,
        phone: m.phone,
        createdBy: 'SYSTEM',
        createdAt: now()
      };
      store.ORG_MEMBERS[m.id] = {
        id: m.id,
        unitId: m.unitId,
        name: m.name,
        title: m.title,
        phone: m.phone,
        companyEmail: m.companyEmail,
        gmail: m.loginEmail,
        role: 'STAFF',
        createdAt: now()
      };
    });"""

    if target2 in content:
        content = content.replace(target2, replacement2)
        print("[fb.js] getSimStore 오픈지원부 29명 등록 로직 삽입 완료")
    else:
        print("[fb.js] target2 이미 교체되었거나 미발견")

    # 3. testLogin 또는 me API에서 오픈지원부 계정 감지 시 소속/섹터 반영
    # me 처리 확인
    target3 = "case 'me': {"
    code_me_enhance = """case 'me': {
        const u = auth.user;
        const opMem = OPEN_SUPPORT_ROSTER.find(x => x.loginEmail === u.email || x.companyEmail === u.email);
        if (opMem) {
          const st = store.STAFF[opMem.loginEmail] || {
            name: opMem.name, dept: '오픈지원부 ' + opMem.team, role: 'STAFF', sector: 'OPEN', title: opMem.title
          };
          return {
            email: u.email,
            mode: 'STAFF',
            staff: st,
            badges: sBadges(store),
            isMaster: false,
            sector: 'OPEN'
          };
        }"""
    
    if target3 in content and "const opMem = OPEN_SUPPORT_ROSTER" not in content:
        content = content.replace(target3, code_me_enhance)
        print("[fb.js] me API 오픈지원부 감지 로직 추가 완료")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("[fb.js] 파일 저장 완료")

def update_app_js():
    path = os.path.join(BASE_DIR, "app.js")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # openTestSwitchModal 수정: 오픈지원부 6개 팀 담당자 목록 섹션 추가
    target_modal = "function openTestSwitchModal(){\n $('testSwitchDlg')?.remove();\n const curEmail=(state&&state.email)||'';"
    
    # 교체할 새 openTestSwitchModal
    new_modal = """function openTestSwitchModal(){
 $('testSwitchDlg')?.remove();
 const curEmail=(state&&state.email)||'';
 const openRoster = (window.OPEN_SUPPORT_ROSTER||[
  {team:'수도권 서부지원팀',name:'진윤섭',title:'과장 (팀장)',loginEmail:'jinys@daiso.test',isLeader:true},
  {team:'수도권 서부지원팀',name:'주은정',title:'차장 (선임)',loginEmail:'juej@daiso.test'},
  {team:'수도권 서부지원팀',name:'김영진',title:'대리 (담당)',loginEmail:'kimyj@daiso.test'},
  {team:'수도권 서부지원팀',name:'홍영웅',title:'사원',loginEmail:'hongyw@daiso.test'},
  {team:'수도권 서부지원팀',name:'이유정',title:'사원',loginEmail:'leeyj@daiso.test'},
  {team:'수도권 서부지원팀',name:'김혜미',title:'사원',loginEmail:'kimhm@daiso.test'},
  {team:'수도권 서부지원팀',name:'이승권',title:'사원',loginEmail:'leesk@daiso.test'},

  {team:'수도권 동부지원팀',name:'김새롬',title:'대리 (팀장)',loginEmail:'kimsr@daiso.test',isLeader:true},
  {team:'수도권 동부지원팀',name:'전소영',title:'사원 (선임)',loginEmail:'jeonsy@daiso.test'},
  {team:'수도권 동부지원팀',name:'황보민우',title:'사원',loginEmail:'hwangbomw@daiso.test'},
  {team:'수도권 동부지원팀',name:'김윤식',title:'사원',loginEmail:'kimys@daiso.test'},
  {team:'수도권 동부지원팀',name:'곽예지',title:'사원',loginEmail:'gwakyeji@daiso.test'},
  {team:'수도권 동부지원팀',name:'정진희',title:'사원',loginEmail:'jungjh@daiso.test'},

  {team:'호남 오픈지원팀',name:'박주경',title:'과장 (팀장兼)',loginEmail:'parkjk@daiso.test',isLeader:true},
  {team:'호남 오픈지원팀',name:'안종모',title:'과장 (선임)',loginEmail:'ahnjm@daiso.test'},
  {team:'호남 오픈지원팀',name:'서정진',title:'사원',loginEmail:'seojj@daiso.test'},
  {team:'호남 오픈지원팀',name:'전동민',title:'사원',loginEmail:'jeondm@daiso.test'},
  {team:'호남 오픈지원팀',name:'최지연',title:'사원',loginEmail:'choijy@daiso.test'},

  {team:'영남 오픈지원팀',name:'남희준',title:'과장 (팀장)',loginEmail:'namhj@daiso.test',isLeader:true},
  {team:'영남 오픈지원팀',name:'이현석',title:'사원 (선임)',loginEmail:'leehs@daiso.test'},
  {team:'영남 오픈지원팀',name:'윤경희',title:'사원',loginEmail:'yoonkh@daiso.test'},
  {team:'영남 오픈지원팀',name:'김수연',title:'사원',loginEmail:'kimsy@daiso.test'},
  {team:'영남 오픈지원팀',name:'박수정',title:'사원',loginEmail:'parksj@daiso.test'},
  {team:'영남 오픈지원팀',name:'정우재',title:'사원',loginEmail:'jungwj@daiso.test'},

  {team:'수도권 리뉴얼팀',name:'장기선',title:'과장 (팀장)',loginEmail:'jangks@daiso.test',isLeader:true},
  {team:'수도권 리뉴얼팀',name:'신정미',title:'차장 (선임)',loginEmail:'shinjm@daiso.test'},
  {team:'수도권 리뉴얼팀',name:'변준영',title:'사원',loginEmail:'byunjy@daiso.test'},

  {team:'지방 리뉴얼팀',name:'박주경',title:'과장兼 (팀장)',loginEmail:'parkjk.local@daiso.test',isLeader:true},
  {team:'지방 리뉴얼팀',name:'홍병우',title:'과장 (선임)',loginEmail:'hongbw@daiso.test'},
  {team:'지방 리뉴얼팀',name:'윤경희',title:'사원',loginEmail:'yoonkh.local@daiso.test'},
  {team:'지방 리뉴얼팀',name:'최재이',title:'사원',loginEmail:'choiji@daiso.test'}
 ]);"""

    if target_modal in content:
        content = content.replace(target_modal, new_modal)
        print("[app.js] openTestSwitchModal 상단 로스터 추가")

    # 모달 HTML 생성부 강화: 오픈지원부 담당자 6개 팀 버튼 그룹 삽입
    target_dialog_html = """const accounts=["""
    # openTestSwitchModal 내부에서 dialog HTML을 렌더링하는 부분을 찾아서 오픈지원부 섹션 추가
    # 파이썬으로 모달 다이얼로그 생성부 전체 교체
    old_modal_func_start = "function openTestSwitchModal(){"
    old_modal_func_end = "document.body.appendChild(dlg);\n}"

    idx_start = content.find(old_modal_func_start)
    if idx_start != -1:
        idx_end = content.find("document.body.appendChild(dlg);\n}", idx_start)
        if idx_end != -1:
            full_new_modal = """function openTestSwitchModal(){
 $('testSwitchDlg')?.remove();
 const curEmail=(state&&state.email)||'';
 const openRoster = (window.OPEN_SUPPORT_ROSTER||[
  {team:'수도권 서부지원팀',name:'진윤섭',title:'과장 (팀장)',loginEmail:'jinys@daiso.test',isLeader:true},
  {team:'수도권 서부지원팀',name:'주은정',title:'차장 (선임)',loginEmail:'juej@daiso.test'},
  {team:'수도권 서부지원팀',name:'김영진',title:'대리 (담당)',loginEmail:'kimyj@daiso.test'},
  {team:'수도권 서부지원팀',name:'홍영웅',title:'사원',loginEmail:'hongyw@daiso.test'},
  {team:'수도권 서부지원팀',name:'이유정',title:'사원',loginEmail:'leeyj@daiso.test'},
  {team:'수도권 서부지원팀',name:'김혜미',title:'사원',loginEmail:'kimhm@daiso.test'},
  {team:'수도권 서부지원팀',name:'이승권',title:'사원',loginEmail:'leesk@daiso.test'},

  {team:'수도권 동부지원팀',name:'김새롬',title:'대리 (팀장)',loginEmail:'kimsr@daiso.test',isLeader:true},
  {team:'수도권 동부지원팀',name:'전소영',title:'사원 (선임)',loginEmail:'jeonsy@daiso.test'},
  {team:'수도권 동부지원팀',name:'황보민우',title:'사원',loginEmail:'hwangbomw@daiso.test'},
  {team:'수도권 동부지원팀',name:'김윤식',title:'사원',loginEmail:'kimys@daiso.test'},
  {team:'수도권 동부지원팀',name:'곽예지',title:'사원',loginEmail:'gwakyeji@daiso.test'},
  {team:'수도권 동부지원팀',name:'정진희',title:'사원',loginEmail:'jungjh@daiso.test'},

  {team:'호남 오픈지원팀',name:'박주경',title:'과장 (팀장兼)',loginEmail:'parkjk@daiso.test',isLeader:true},
  {team:'호남 오픈지원팀',name:'안종모',title:'과장 (선임)',loginEmail:'ahnjm@daiso.test'},
  {team:'호남 오픈지원팀',name:'서정진',title:'사원',loginEmail:'seojj@daiso.test'},
  {team:'호남 오픈지원팀',name:'전동민',title:'사원',loginEmail:'jeondm@daiso.test'},
  {team:'호남 오픈지원팀',name:'최지연',title:'사원',loginEmail:'choijy@daiso.test'},

  {team:'영남 오픈지원팀',name:'남희준',title:'과장 (팀장)',loginEmail:'namhj@daiso.test',isLeader:true},
  {team:'영남 오픈지원팀',name:'이현석',title:'사원 (선임)',loginEmail:'leehs@daiso.test'},
  {team:'영남 오픈지원팀',name:'윤경희',title:'사원',loginEmail:'yoonkh@daiso.test'},
  {team:'영남 오픈지원팀',name:'김수연',title:'사원',loginEmail:'kimsy@daiso.test'},
  {team:'영남 오픈지원팀',name:'박수정',title:'사원',loginEmail:'parksj@daiso.test'},
  {team:'영남 오픈지원팀',name:'정우재',title:'사원',loginEmail:'jungwj@daiso.test'},

  {team:'수도권 리뉴얼팀',name:'장기선',title:'과장 (팀장)',loginEmail:'jangks@daiso.test',isLeader:true},
  {team:'수도권 리뉴얼팀',name:'신정미',title:'차장 (선임)',loginEmail:'shinjm@daiso.test'},
  {team:'수도권 리뉴얼팀',name:'변준영',title:'사원',loginEmail:'byunjy@daiso.test'},

  {team:'지방 리뉴얼팀',name:'박주경',title:'과장兼 (팀장)',loginEmail:'parkjk.local@daiso.test',isLeader:true},
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
  ['VENDOR','bluekey@vendor.test','👷 블루키솔루션 (매장 입고도우미 · 전국 200명 · 88점 A)','매장CS팀 전국 매장 야간/새벽 입고도우미 전담'],
  ['VENDOR','tsw@vendor.test','👷 TSW파트너스 (매장 재고도우미 · 92점 S)','매장CS팀 매장 영업종료 후 야간 재고조사 전담'],
  ['VENDOR','sigong@vendor.test','👷 시공디자인 (인테리어 종합시공 A+ · 94점 S)','강남본점 800평 인테리어 마감 종합시공'],
  ['VENDOR','yebon@vendor.test','👷 예본아이디 (인테리어·철거 마감시공 A · 89점 A)','대전둔산점 500평 인테리어 철거 및 마감공사']
 ];

 const dlg=document.createElement('div');
 dlg.id='testSwitchDlg';
 dlg.className='modal';
 dlg.style.display='flex';
 dlg.setAttribute('role','dialog');

 // 오픈지원부 팀별 그룹핑
 const teams = ['수도권 서부지원팀', '수도권 동부지원팀', '호남 오픈지원팀', '영남 오픈지원팀', '수도권 리뉴얼팀', '지방 리뉴얼팀'];
 let openHtml = '';
 teams.forEach(tName => {
  const members = openRoster.filter(x => x.team === tName);
  const leader = members.find(x => x.isLeader) || members[0];
  openHtml += `
   <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
     <span style="font-weight:800;font-size:13px;color:#1e293b">📦 ${escapeText(tName)}</span>
     <button class="button xs" style="background:#0284c7;color:#fff;font-weight:700;padding:3px 8px;border-radius:6px"
      onclick="quickTestLogin('${leader.loginEmail}','STAFF','OPEN')">⚡ 팀장(${escapeText(leader.name)}) 즉시접속</button>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:4px">
     ${members.map(m => `
      <button class="button xs ${m.isLeader?'':'ghost'}" style="font-size:11px;padding:3px 7px;border-radius:6px;${m.loginEmail===curEmail?'border:2px solid #0284c7;background:#e0f2fe;font-weight:800':''}"
       onclick="quickTestLogin('${m.loginEmail}','STAFF','OPEN')">
       ${m.isLeader?'👑 ':''}${escapeText(m.name)} ${escapeText(m.title.split(' ')[0])}
      </button>
     `).join('')}
    </div>
   </div>
  `;
 });

 dlg.innerHTML=`
  <div class="card" style="max-width:680px;width:95%;max-height:88vh;overflow-y:auto;border-radius:16px;box-shadow:0 20px 40px rgba(0,0,0,0.25)">
   <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid #e2e8f0;padding-bottom:10px;margin-bottom:12px">
    <div>
     <h3 style="margin:0;font-size:17px;font-weight:800;color:#0f172a">⚡ 빠른 시험 계정 전환 (다이소 담당자 · 협력업체)</h3>
     <p class="muted" style="margin:2px 0 0;font-size:12px">원하는 직책이나 업체를 누르면 1초 만에 즉시 권한이 전환됩니다.</p>
    </div>
    <button class="button ghost xs" onclick="$('testSwitchDlg').remove()" style="font-size:16px;padding:2px 8px">✕</button>
   </div>

   <div style="margin-bottom:14px">
    <div style="font-size:13px;font-weight:800;color:#0284c7;margin-bottom:6px;display:flex;align-items:center;gap:6px">
     <span>📦 다이소 오픈지원부 실무 작성 담당자 (6개 팀 29명)</span>
     <span style="font-size:11px;font-weight:normal;color:#64748b">클릭 시 [오픈지원부 진열·입고 5개사] 화면으로 자동 직행</span>
    </div>
    ${openHtml}
   </div>

   <div style="margin-bottom:12px">
    <div style="font-size:13px;font-weight:800;color:#475569;margin-bottom:6px">🏢 안전보건팀 총괄 및 주요 협력업체 (10개사)</div>
    <div style="display:flex;flex-direction:column;gap:6px">
     ${accounts.map(([md,em,label,desc])=>`
      <button class="button ghost" style="text-align:left;display:flex;flex-direction:column;align-items:flex-start;padding:8px 12px;border-radius:8px;border:1px solid ${em===curEmail?'#0284c7':'#cbd5e1'};background:${em===curEmail?'#f0f9ff':'#fff'}"
       onclick="quickTestLogin('${em}','${md}','${em.includes('daiso')?'':''}')">
       <div style="font-size:12.5px;font-weight:800;color:#1e293b">${escapeText(label)} ${em===curEmail?'<span style=\"color:#0284c7;font-size:11px\">(현재 접속 중)</span>':''}</div>
       <div style="font-size:11px;color:#64748b">${escapeText(desc)}</div>
      </button>
     `).join('')}
    </div>
   </div>

   <div style="text-align:right;margin-top:10px">
    <button class="button secondary xs" onclick="$('testSwitchDlg').remove()">닫기</button>
   </div>
  </div>
 `;
 document.body.appendChild(dlg);
}"""
            content = content[:idx_start] + full_new_modal + content[idx_end + len("document.body.appendChild(dlg);\n}"):]
            print("[app.js] openTestSwitchModal 전체 교체 완료!")
        else:
            print("[app.js] idx_end 미발견")
    else:
        print("[app.js] idx_start 미발견")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("[app.js] 파일 저장 완료")

def update_index_html():
    path = os.path.join(BASE_DIR, "index.html")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # 로그인 화면 testLoginBox 에 오픈지원부 담당자 빠른 선택 드롭다운/버튼 추가
    target_box = '<div id="testLoginBox"'
    idx = content.find(target_box)
    if idx != -1:
        # testLoginBox 내부를 찾아 오픈지원부 빠른 선택 추가
        open_quick_login_html = """
        <!-- 오픈지원부 6개 팀 담당자 즉시 로그인 바 -->
        <div style="margin:10px 0;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:8px 10px;text-align:left">
          <div style="font-size:11.5px;font-weight:800;color:#15803d;margin-bottom:5px;display:flex;align-items:center;gap:4px">
            <span>📦 오픈지원부 담당자 빠른 로그인 (작성자 등록 완료)</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:4px">
            <button class="button xs" style="background:#16a34a;color:#fff;font-weight:700;font-size:11px;padding:3px 8px;border-radius:6px"
              type="button" onclick="quickTestLogin('jinys@daiso.test','STAFF','OPEN')">⚡ 진윤섭 과장 (서부지원팀장)</button>
            <button class="button xs" style="background:#0284c7;color:#fff;font-weight:700;font-size:11px;padding:3px 8px;border-radius:6px"
              type="button" onclick="quickTestLogin('kimsr@daiso.test','STAFF','OPEN')">⚡ 김새롬 대리 (동부지원팀장)</button>
            <button class="button xs" style="background:#d97706;color:#fff;font-weight:700;font-size:11px;padding:3px 8px;border-radius:6px"
              type="button" onclick="quickTestLogin('parkjk@daiso.test','STAFF','OPEN')">⚡ 박주경 과장 (호남/지방리뉴얼)</button>
            <button class="button xs" style="background:#7c3aed;color:#fff;font-weight:700;font-size:11px;padding:3px 8px;border-radius:6px"
              type="button" onclick="quickTestLogin('namhj@daiso.test','STAFF','OPEN')">⚡ 남희준 과장 (영남지원팀장)</button>
            <button class="button xs" style="background:#475569;color:#fff;font-weight:700;font-size:11px;padding:3px 8px;border-radius:6px"
              type="button" onclick="quickTestLogin('jangks@daiso.test','STAFF','OPEN')">⚡ 장기선 과장 (수도권리뉴얼)</button>
            <button class="button xs ghost" style="font-size:11px;padding:3px 6px;border-radius:6px"
              type="button" onclick="openTestSwitchModal()">👥 6개 팀 29명 전체보기</button>
          </div>
        </div>
        """
        if "오픈지원부 담당자 빠른 로그인" not in content:
            # testLoginBox 내부 첫 부분에 삽입
            idx_box_inner = content.find(">", idx) + 1
            content = content[:idx_box_inner] + open_quick_login_html + content[idx_box_inner:]
            print("[index.html] 로그인 화면 오픈지원부 빠른 버튼 추가 완료")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("[index.html] 파일 저장 완료")

def update_service_js():
    path = os.path.join(BASE_DIR, "service.js")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # 현장점검표 점검자 기본값 설정 로직 점검
    target_insp = "const inspector = document.getElementById('mobInspector')?.value || '안전보건팀 강동현';"
    replacement_insp = """const inspector = document.getElementById('mobInspector')?.value || (state && state.staff ? (state.staff.dept ? state.staff.dept + ' ' : '') + state.staff.name + ' ' + (state.staff.title || '') : '안전보건팀 강동현');"""
    if target_insp in content:
        content = content.replace(target_insp, replacement_insp)
        print("[service.js] 모바일 점검자 로그인 계정 자동 반영 수정 완료")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("[service.js] 파일 저장 완료")

if __name__ == "__main__":
    update_fb_js()
    update_app_js()
    update_index_html()
    update_service_js()
    print("=== 모든 파일 업데이트 완료 ===")

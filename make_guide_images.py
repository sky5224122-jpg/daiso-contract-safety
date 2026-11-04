# -*- coding: utf-8 -*-
"""
아성다이소 도급안전관리 앱 - 시각적 사용 매뉴얼 고화질 화면 이미지 6종 생성기
안전보건팀 강동현 (sky5224122@gmail.com)
"""
import os
import sys
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱"
IMG_DIR = os.path.join(BASE_DIR, "User_Guide_Images")
os.makedirs(IMG_DIR, exist_ok=True)

# 폰트 설정 (Windows 기본 맑은 고딕)
FONT_BOLD = r"C:\Windows\Fonts\malgunbd.ttf"
FONT_REG = r"C:\Windows\Fonts\malgun.ttf"

def get_font(bold=False, size=14):
    try:
        path = FONT_BOLD if bold else FONT_REG
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

def draw_header(draw, title, subtitle, step_num):
    # 상단 다크 헤더 바
    draw.rectangle([(0, 0), (1200, 75)], fill="#0f172a")
    draw.text((30, 16), f"STEP {step_num}", fill="#38bdf8", font=get_font(True, 16))
    draw.text((115, 14), title, fill="#ffffff", font=get_font(True, 22))
    draw.text((30, 48), subtitle, fill="#94a3b8", font=get_font(False, 13))
    # 브랜드 뱃지
    draw.rounded_rectangle([(960, 20), (1170, 55)], radius=6, fill="#1e293b", outline="#334155")
    draw.text((975, 27), "DAISO 도급안전관리", fill="#cbd5e1", font=get_font(True, 13))

def draw_pointer(draw, x, y, text, direction="down"):
    # 가이드 강조 화살표 및 안내 박스
    tw = len(text) * 13 + 24
    draw.rounded_rectangle([(x, y), (x + tw, y + 36)], radius=8, fill="#dc2626", outline="#ef4444", width=2)
    draw.text((x + 12, y + 8), text, fill="#ffffff", font=get_font(True, 13))

# ─────────────────────────────────────────────────────────
# [화면 1] 01_login_screen.png : 로그인 첫 화면 & 원클릭 접속
# ─────────────────────────────────────────────────────────
def make_img_1():
    img = Image.new("RGB", (1200, 800), "#f8fafc")
    draw = ImageDraw.Draw(img)
    draw_header(draw, "1단계: 로그인 화면 및 원클릭 접속", "Google OAuth 설정 없이 버튼 클릭 한 번으로 강동현 담당자 접속 가능", 1)

    # 중앙 카드 (로그인 박스)
    cx, cy = 200, 105
    draw.rounded_rectangle([(cx, cy), (cx + 800, cy + 650)], radius=16, fill="#ffffff", outline="#cbd5e1", width=2)
    
    draw.text((cx + 40, cy + 30), "🛡️ 아성다이소 도급 안전관리 시스템 로그인", fill="#0f172a", font=get_font(True, 20))
    draw.text((cx + 40, cy + 62), "원하시는 접속 방식을 선택하세요 (Google 계정 또는 시험용 원클릭 즉시 접속)", fill="#64748b", font=get_font(False, 13))

    # 다이소 담당자 즉시 접속 박스 (파란색 강조)
    bx, by = cx + 40, cy + 105
    draw.rounded_rectangle([(bx, by), (bx + 720, by + 190)], radius=12, fill="#eff6ff", outline="#3b82f6", width=2)
    draw.text((bx + 20, by + 16), "⚡ 다이소 담당자(강동현) 전용 원클릭 접속", fill="#1e40af", font=get_font(True, 16))
    draw.text((bx + 20, by + 42), "계정: 강동현 (sky5224122@gmail.com) · 안전보건팀 마스터 권한", fill="#334155", font=get_font(False, 13))
    
    # 3대 진입 버튼
    draw.rounded_rectangle([(bx + 20, by + 75), (bx + 700, by + 120)], radius=8, fill="#1d4ed8")
    draw.text((bx + 160, by + 86), "👨‍💼 다이소 담당자 접속 (로그인 후 업종 선택 화면 진입)", fill="#ffffff", font=get_font(True, 15))
    
    draw.rounded_rectangle([(bx + 20, by + 130), (bx + 350, by + 175)], radius=8, fill="#fffbeb", outline="#f59e0b", width=2)
    draw.text((bx + 40, by + 142), "🏗 인테리어/공사/집기 바로가기", fill="#92400e", font=get_font(True, 13))

    draw.rounded_rectangle([(bx + 370, by + 130), (bx + 700, by + 175)], radius=8, fill="#eff6ff", outline="#2563eb", width=2)
    draw.text((bx + 400, by + 142), "📦 오픈지원/입고/재고 바로가기", fill="#1e40af", font=get_font(True, 13))

    # 용역업체 체험 접속 박스
    vx, vy = cx + 40, cy + 315
    draw.rounded_rectangle([(vx, vy), (vx + 720, vy + 300)], radius=12, fill="#f8fafc", outline="#e2e8f0", width=1)
    draw.text((vx + 20, vy + 16), "👷 수급업체 시점 체험 원클릭 접속 (오픈지원 5개사 · 매장CS 9개사)", fill="#0f172a", font=get_font(True, 15))
    draw.text((vx + 20, vy + 40), "해당 업체의 현장대리인 계정으로 즉시 전환되어 업체 화면을 시험할 수 있습니다.", fill="#64748b", font=get_font(False, 12))

    vbtns = [
        ("케이웍스코리아 (오픈·입고 160명)", "ov_kworks", "#1e3a8a"),
        ("에드에그 (오픈진열 100명 · 90점 S)", "ov_adegg", "#15803d"),
        ("유엔아이 (수도권·충청 120명 · 79점)", "ov_uni", "#b45309"),
        ("휴먼인프라 (영남 100명 · 95점 S)", "ov_human", "#15803d"),
        ("맨토스 (오픈·입고 90명 · 85점 A)", "ov_mentos", "#1e3a8a"),
        ("블루키솔루션 (매장CS 입고 · 95점 S)", "cs_bluekey", "#0f766e"),
        ("TSW파트너스 (야간재고실사 · 100점)", "cs_tsw", "#6b21a8"),
        ("유미어스 (야간재고 · 70점 커트라인)", "cs_yumeus", "#dc2626")
    ]
    for idx, (label, vid, color) in enumerate(vbtns):
        row = idx // 2
        col = idx % 2
        x1 = vx + 20 + col * 350
        y1 = vy + 75 + row * 50
        draw.rounded_rectangle([(x1, y1), (x1 + 330, y1 + 40)], radius=6, fill="#ffffff", outline="#cbd5e1")
        draw.text((x1 + 12, y1 + 11), f"👷 {label}", fill=color, font=get_font(True, 12))

    # 강조 안내 포인터
    draw_pointer(draw, 720, 260, "👈 클릭 한 번으로 즉시 로그인!")
    img.save(os.path.join(IMG_DIR, "01_login_screen.png"))
    print("Created: 01_login_screen.png")

# ─────────────────────────────────────────────────────────
# [화면 2] 02_sector_select_modal.png : 업종 선택 진입 화면
# ─────────────────────────────────────────────────────────
def make_img_2():
    img = Image.new("RGB", (1200, 800), "#f1f5f9")
    draw = ImageDraw.Draw(img)
    draw_header(draw, "2단계: 로그인 후 업종 선택 화면 (인테리어 vs 오픈지원/CS)", "담당자 업무에 맞춰 원하는 관리 영역을 선택하여 즉시 진입", 2)

    # 팝업 모달 배경 박스
    mx, my = 120, 100
    draw.rounded_rectangle([(mx, my), (mx + 960, my + 660)], radius=18, fill="#ffffff", outline="#94a3b8", width=2)

    draw.rounded_rectangle([(mx + 30, my + 25), (mx + 360, my + 55)], radius=999, fill="#eff6ff")
    draw.text((mx + 45, my + 31), "🛡️ 아성다이소 안전보건관리 시스템", fill="#1d4ed8", font=get_font(True, 12))
    draw.text((mx + 30, my + 68), "관리하실 관련 업종을 선택해 주세요", fill="#0f172a", font=get_font(True, 24))
    draw.text((mx + 30, my + 104), "접속자: 강동현 (sky5224122@gmail.com) · 안전보건팀 마스터 · 상단 버튼으로 언제든 전환 가능", fill="#64748b", font=get_font(False, 13))

    # 카드 1: 인테리어 / 공사 / 집기
    c1x, c1y = mx + 30, my + 145
    draw.rounded_rectangle([(c1x, c1y), (c1x + 430, c1y + 420)], radius=14, fill="#fffbeb", outline="#f59e0b", width=3)
    draw.rounded_rectangle([(c1x + 20, c1y + 20), (c1x + 190, c1y + 48)], radius=999, fill="#fef3c7")
    draw.text((c1x + 30, c1y + 26), "인테리어팀 · 시설관리팀", fill="#92400e", font=get_font(True, 12))
    draw.text((c1x + 300, c1y + 26), "적격 19개사", fill="#b45309", font=get_font(True, 13))

    draw.text((c1x + 20, c1y + 60), "🏗 인테리어 / 공사 / 집기", fill="#0f172a", font=get_font(True, 20))
    draw.text((c1x + 20, c1y + 92), "신규·리뉴얼 매장 인테리어 마감·사인·냉난방\n공사 및 시설물 유지보수 도급 안전관리", fill="#475569", font=get_font(False, 12))

    details1 = [
        "• 마감공사 (9개사): 시공디자인(92)·예본아이디(92) 등",
        "• 사인공사 (5개사): 우리애드(86)·미르컴(86) 등",
        "• 냉난방/시설 (5개사): 에스원(81)·하이엠솔루텍(98) 등",
        "✔ 안전작업허가서(PTW) 발행 및 사후 승인",
        "✔ 2일 1회 순회점검일지 확인 및 지적 조치"
    ]
    for i, line in enumerate(details1):
        draw.text((c1x + 20, c1y + 155 + i * 26), line, fill="#78350f" if "✔" in line else "#334155", font=get_font("✔" in line, 12))

    draw.rounded_rectangle([(c1x + 20, c1y + 345), (c1x + 410, c1y + 395)], radius=10, fill="#d97706")
    draw.text((c1x + 85, c1y + 358), "🏗 인테리어/공사 대시보드 입장 ›", fill="#ffffff", font=get_font(True, 14))

    # 카드 2: 오픈지원 / 입고 / 재고 (추천)
    c2x, c2y = mx + 490, my + 145
    draw.rounded_rectangle([(c2x, c2y), (c2x + 440, c2y + 420)], radius=14, fill="#eff6ff", outline="#2563eb", width=3)
    draw.rounded_rectangle([(c2x + 20, c2y + 20), (c2x + 190, c2y + 48)], radius=999, fill="#dbeafe")
    draw.text((c2x + 30, c2y + 26), "오픈지원부 · 매장CS팀", fill="#1e40af", font=get_font(True, 12))
    draw.text((c2x + 300, c2y + 26), "오픈 5사 + CS 9사", fill="#1d4ed8", font=get_font(True, 13))

    draw.text((c2x + 20, c2y + 60), "📦 오픈지원 / 입고 / 재고", fill="#0f172a", font=get_font(True, 20))
    draw.text((c2x + 20, c2y + 92), "매장 오픈 전 상품진열·입고 용역(5개사) 및\n매장CS 입고도우미(4개사)·재고도우미(5개사) 관리", fill="#475569", font=get_font(False, 12))

    details2 = [
        "• 오픈지원부 (5개사): 케이웍스·에드에그·유엔아이 등",
        "• 매장CS 입고도우미 (4개사): 블루키(95)·휴먼(95) 등 (2h)",
        "• 매장CS 재고도우미 (5개사): TSW(100)·유미어스(70) (야간)",
        "✔ 업체 파견 현장관리자 경유 지시 (불법파견 차단)",
        "✔ 직영(리베로) ↔ 용역(5개사) 층별/구역별 공간 분리",
        "✔ 현장방문 실태점검표 (30문항 & 크로스 인터뷰)"
    ]
    for i, line in enumerate(details2):
        draw.text((c2x + 20, c2y + 145 + i * 24), line, fill="#1e40af" if "✔" in line else "#334155", font=get_font("✔" in line, 11))

    draw.rounded_rectangle([(c2x + 20, c2y + 345), (c2x + 420, c2y + 395)], radius=10, fill="#1d4ed8")
    draw.text((c2x + 85, c2y + 358), "📦 오픈지원/입고/재고 대시보드 입장 ›", fill="#ffffff", font=get_font(True, 14))

    # 하단 전체 통합 버튼
    draw.rounded_rectangle([(mx + 30, my + 590), (mx + 930, my + 635)], radius=10, fill="#f1f5f9", outline="#cbd5e1")
    draw.text((mx + 50, my + 603), "💡 두 업종을 한 화면에서 모두 확인하시겠습니까?", fill="#475569", font=get_font(False, 12))
    draw.rounded_rectangle([(mx + 680, my + 597), (mx + 915, my + 628)], radius=6, fill="#ffffff", outline="#64748b")
    draw.text((mx + 700, my + 605), "🌐 전체 업종 통합 대시보드 보기 ›", fill="#0f172a", font=get_font(True, 12))

    draw_pointer(draw, 740, 480, "👈 오픈지원·CS 관리 시 클릭!")
    img.save(os.path.join(IMG_DIR, "02_sector_select_modal.png"))
    print("Created: 02_sector_select_modal.png")

# ─────────────────────────────────────────────────────────
# [화면 3] 03_open_support_5_vendors.png : 오픈지원부 5개사 화면
# ─────────────────────────────────────────────────────────
def make_img_3():
    img = Image.new("RGB", (1200, 900), "#f8fafc")
    draw = ImageDraw.Draw(img)
    draw_header(draw, "3단계: 오픈지원부 (상품진열·입고 5개사) 안전관리", "5개 업체 전원 동등 표시 · 일 최대 570명 운영 · 공간분리 및 불법파견 방지", 3)

    # 탭 네비게이션 바
    tx, ty = 30, 90
    tabs = [
        ("📦 오픈지원부 (5개사)", True, "#1d4ed8"),
        ("🛒 매장CS팀 (입고4·재고5 9개사)", False, "#64748b"),
        ("🔍 현장방문 실태점검 (30문항)", False, "#64748b"),
        ("📋 '26 상반기 적격평가", False, "#64748b"),
        ("📑 도급조사표 (26문항)", False, "#64748b")
    ]
    cur_x = tx
    for name, active, col in tabs:
        w = len(name) * 11 + 24
        draw.rounded_rectangle([(cur_x, ty), (cur_x + w, ty + 38)], radius=8, fill="#1d4ed8" if active else "#ffffff", outline="#cbd5e1")
        draw.text((cur_x + 12, ty + 10), name, fill="#ffffff" if active else col, font=get_font(active, 12))
        cur_x += w + 8

    # 상단 안전관리 핵심 수칙 3대 박스
    rx, ry = 30, 140
    draw.rounded_rectangle([(rx, ry), (rx + 1140, ry + 110)], radius=12, fill="#ffffff", outline="#bfdbfe", width=2)
    draw.text((rx + 20, ry + 12), "🚨 오픈지원부 용역인력 운영 및 안전관리 3대 핵심 수칙 (현장 필수 준수)", fill="#1e3a8a", font=get_font(True, 14))
    
    rules = [
        ("① 작업지시 일원화", "업체 파견 현장관리자(팀장) 경유 지시\n다이소 오픈리베로 직접 지시 엄금(불법파견 차단)", "#eff6ff", "#1e40af"),
        ("② 물리적 공간 분리", "복층: 층별 분리 (예: 1F 리베로 / 2F 용역)\n단층: 구역 분리 (A/B존 명확한 구역표지 부착)", "#f0fdf4", "#166534"),
        ("③ 공정 및 시간 관리", "인테리어 잔여공사(도장/전기) 완료 후 투입\n근무시간: 08:30~17:30 (휴게시간 보장)", "#fffbeb", "#92400e")
    ]
    for i, (rtitle, rdesc, bg, tc) in enumerate(rules):
        bx = rx + 20 + i * 370
        draw.rounded_rectangle([(bx, ry + 36), (bx + 355, ry + 98)], radius=8, fill=bg)
        draw.text((bx + 12, ry + 42), rtitle, fill=tc, font=get_font(True, 12))
        draw.text((bx + 12, ry + 62), rdesc, fill="#334155", font=get_font(False, 10))

    # 5개사 카드 그리드
    draw.text((30, 265), "📊 오픈지원부 계약업체 5개사 현황 (일일 운영가능 최대인원 총 570명)", fill="#0f172a", font=get_font(True, 16))
    
    vendors = [
        ("1. 케이웍스코리아", "입고·진열", "전국", 160, 80, "A", "복층 층별 분리", "비상대책 훈련(C등급 0점) 현장 보완 필요"),
        ("2. 에드에그", "진열용역", "전국", 100, 90, "S", "매대 라인별 분리", "안전보건관리체계 전반 우수 (S등급)"),
        ("3. 유엔아이", "진열용역", "수도권/충청", 120, 79, "B", "섹션별 구역 분리", "보호구 대장 미흡(B) · 아차사고 발굴 보완"),
        ("4. 휴먼인프라", "입고·진열", "영남", 100, 95, "S", "하역장/매장 층별 동선", "영남권 입고·진열 체계 우수 (S등급)"),
        ("5. 맨토스", "진열·입고", "수도권/전국", 90, 85, "A", "구역별 분리 배치", "비상대피 훈련 미실시(C) 합동훈련 추진")
    ]

    for idx, (vname, scope, reg, cap, score, grade, sep, weak) in enumerate(vendors):
        vx = 30 + (idx % 3) * 385
        vy = 300 + (idx // 3) * 270
        if idx >= 3:
            vx = 30 + (idx - 3) * 580

        draw.rounded_rectangle([(vx, vy), (vx + (565 if idx >= 3 else 370), vy + 245)], radius=12, fill="#ffffff", outline="#cbd5e1", width=2)
        # 상단 등급 띠
        top_color = "#059669" if score >= 90 else "#2563eb" if score >= 80 else "#d97706"
        draw.rounded_rectangle([(vx, vy), (vx + (565 if idx >= 3 else 370), vy + 38)], radius=10, fill=top_color)
        draw.text((vx + 14, vy + 8), vname, fill="#ffffff", font=get_font(True, 14))
        draw.text((vx + (450 if idx >= 3 else 260), vy + 8), f"평가: {score}점 ({grade})", fill="#ffffff", font=get_font(True, 13))

        infos = [
            f"• 업무범위: {scope} (권역: {reg})",
            f"• 1일 최대: 약 {cap}명 (오픈 일정별 발주)",
            f"• 지휘체계: 업체 파견 현장팀장 상주",
            f"• 공간분리: {sep}",
            f"⚠️ 점검포인트: {weak}"
        ]
        for line_i, line in enumerate(infos):
            is_warn = "⚠️" in line
            draw.text((vx + 14, vy + 50 + line_i * 32), line, fill="#b91c1c" if is_warn else "#334155", font=get_font(is_warn, 11 if is_warn else 12))

        # 하단 현장점검 바로가기 버튼
        draw.rounded_rectangle([(vx + 14, vy + 205), (vx + (550 if idx >= 3 else 355), vy + 235)], radius=6, fill="#f1f5f9", outline="#cbd5e1")
        draw.text((vx + (200 if idx >= 3 else 110), vy + 211), "🔍 현장점검표 바로가기 ›", fill="#1e40af", font=get_font(True, 11))

    draw_pointer(draw, 450, 480, "👈 5개사 전원 적격평가 결과 및 취약점 표시")
    img.save(os.path.join(IMG_DIR, "03_open_support_5_vendors.png"))
    print("Created: 03_open_support_5_vendors.png")

# ─────────────────────────────────────────────────────────
# [화면 4] 04_store_cs_9_vendors.png : 매장CS팀 9개사 화면
# ─────────────────────────────────────────────────────────
def make_img_4():
    img = Image.new("RGB", (1200, 950), "#f8fafc")
    draw = ImageDraw.Draw(img)
    draw_header(draw, "4단계: 매장CS팀 (입고도우미 4개사 + 재고도우미 5개사 = 총 9개사)", "입고 2시간 집중 하역 및 야간 폐점 후 재고실사 용역 특화 안전관리", 4)

    # 탭 네비게이션 바 (CS 활성)
    tx, ty = 30, 90
    tabs = [
        ("📦 오픈지원부 (5개사)", False, "#64748b"),
        ("🛒 매장CS팀 (입고4·재고5 9개사)", True, "#1d4ed8"),
        ("🔍 현장방문 실태점검 (30문항)", False, "#64748b"),
        ("📋 '26 상반기 적격평가", False, "#64748b"),
        ("📑 도급조사표 (26문항)", False, "#64748b")
    ]
    cur_x = tx
    for name, active, col in tabs:
        w = len(name) * 11 + 24
        draw.rounded_rectangle([(cur_x, ty), (cur_x + w, ty + 38)], radius=8, fill="#1d4ed8" if active else "#ffffff", outline="#cbd5e1")
        draw.text((cur_x + 12, ty + 10), name, fill="#ffffff" if active else col, font=get_font(active, 12))
        cur_x += w + 8

    # [A] 입고도우미 (4개사) 섹션
    draw.rounded_rectangle([(30, 140), (1170, 480)], radius=12, fill="#ffffff", outline="#059669", width=2)
    draw.rounded_rectangle([(30, 140), (1170, 180)], radius=10, fill="#ecfdf5")
    draw.text((45, 148), "🚚 [A] 입고도우미 (입고용역 4개사 · 1일 약 2시간 집중 투입)", fill="#065f46", font=get_font(True, 15))
    draw.text((680, 150), "※ '25년 엠앤제이(69점 부적격 탈락) → '26년 블루키솔루션(95점 S) 교체 완료", fill="#b91c1c", font=get_font(True, 11))

    inbound = [
        ("블루키솔루션", 95, "S", "매장당 2~4명", "안전화, 롤테이너 2인 1조, 바퀴 스토퍼", "'25년 엠앤제이(69점) 대체 신규 최우수 선정"),
        ("휴먼인프라", 95, "S", "매장당 2~4명", "화물승강기 단차 점검, 작업 전 3분 TBM", "'25년 93점 → '26년 95점 우수 유지"),
        ("맨토스", 85, "A", "매장당 2~4명", "창고 적재 1.8m 이하, 방검장갑, 안전커터칼", "비상대책 훈련(C/0점) 현장 비상구 안내 보완"),
        ("케이웍스코리아", 81, "A", "매장당 2~5명", "하역장 바닥 미끄럼 방지, 중량물 스트레칭", "비상대책 훈련(C/0점) 합동훈련 보완 대상")
    ]
    for idx, (name, sc, gr, scale, ctrl, note) in enumerate(inbound):
        ix = 45 + idx * 278
        draw.rounded_rectangle([(ix, 195), (ix + 268, 465)], radius=10, fill="#f8fafc", outline="#cbd5e1")
        draw.text((ix + 12, 205), f"🚚 {name}", fill="#0f172a", font=get_font(True, 14))
        draw.text((ix + 180, 207), f"{sc}점({gr})", fill="#059669" if sc >= 90 else "#1d4ed8", font=get_font(True, 12))
        draw.text((ix + 12, 235), f"• 시간: 1일 약 2시간 (물류 타임)", fill="#64748b", font=get_font(False, 11))
        draw.text((ix + 12, 255), f"• 규모: {scale}", fill="#64748b", font=get_font(False, 11))
        draw.text((ix + 12, 280), "✅ 핵심 안전대책:", fill="#166534", font=get_font(True, 11))
        draw.text((ix + 12, 300), ctrl, fill="#334155", font=get_font(False, 10))
        draw.text((ix + 12, 385), "📌 평가 및 이력:", fill="#1e40af", font=get_font(True, 11))
        draw.text((ix + 12, 405), note, fill="#b45309" if "탈락" in note or "보완" in note else "#334155", font=get_font(False, 10))

    # [B] 재고도우미 (5개사) 섹션
    draw.rounded_rectangle([(30, 500), (1170, 930)], radius=12, fill="#ffffff", outline="#7c3aed", width=2)
    draw.rounded_rectangle([(30, 500), (1170, 540)], radius=10, fill="#f5f3ff")
    draw.text((45, 508), "🌙 [B] 재고도우미 (재고용역 5개사 · 퇴근시간 22시 이후 야간 전수 실사)", fill="#5b21b6", font=get_font(True, 15))
    draw.text((700, 510), "※ 유미어스(70점 커트라인) 및 아르테코리아(79점) 최우선 현장점검", fill="#b91c1c", font=get_font(True, 11))

    inventory = [
        ("TSW파트너스", 100, "S", "야간 4~10명", "조명 100% 점등, 2인 1조", "전 항목 만점(100점) 모범"),
        ("RBS코리아", 95, "S", "야간 4~8명", "적정온도 유지, 무릎보호대", "안전관리체계 전반 우수"),
        ("빅서비스", 88, "A", "야간 4~8명", "스텝스툴 사용, 박스탑승 금지", "비상대책 훈련(C/0점) 보완"),
        ("아르테코리아", 79, "B", "야간 4~8명", "표준 위험성평가 이행 확인", "위험성평가·교육·보호구(B) 집중관리"),
        ("유미어스", 70, "B", "야간 4~8명", "투입 전 모바일 안전교육 필수", "적격 턱걸이(70점) 최우선 시정조치")
    ]
    for idx, (name, sc, gr, scale, ctrl, note) in enumerate(inventory):
        ix = 45 + idx * 222
        draw.rounded_rectangle([(ix, 555), (ix + 215, 915)], radius=10, fill="#fffbeb" if sc <= 79 else "#f8fafc", outline="#f59e0b" if sc <= 79 else "#cbd5e1", width=2 if sc <= 79 else 1)
        draw.text((ix + 10, 565), f"🌙 {name}", fill="#0f172a", font=get_font(True, 13))
        draw.text((ix + 140, 567), f"{sc}점({gr})", fill="#b91c1c" if sc <= 79 else "#059669", font=get_font(True, 11))
        draw.text((ix + 10, 595), "• 시간: 폐점(22시)~심야", fill="#64748b", font=get_font(False, 10))
        draw.text((ix + 10, 615), f"• 규모: {scale}", fill="#64748b", font=get_font(False, 10))
        draw.text((ix + 10, 640), "✅ 핵심 안전대책:", fill="#166534", font=get_font(True, 11))
        draw.text((ix + 10, 660), ctrl, fill="#334155", font=get_font(False, 10))
        draw.text((ix + 10, 750), "🚨 현장 중점 확인:", fill="#b91c1c", font=get_font(True, 11))
        draw.text((ix + 10, 770), note, fill="#b91c1c" if sc <= 79 else "#334155", font=get_font(False, 10))

    draw_pointer(draw, 880, 840, "👈 유미어스(70)·아르테(79) 현장 집중점검!")
    img.save(os.path.join(IMG_DIR, "04_store_cs_9_vendors.png"))
    print("Created: 04_store_cs_9_vendors.png")

# ─────────────────────────────────────────────────────────
# [화면 5] 05_field_inspection_30_items.png : 실태점검표 & 인터뷰
# ─────────────────────────────────────────────────────────
def make_img_5():
    img = Image.new("RGB", (1200, 900), "#f8fafc")
    draw = ImageDraw.Draw(img)
    draw_header(draw, "5단계: 현장방문 실태점검 (30문항 체크리스트 & 8대 크로스인터뷰)", "모바일·태블릿 현장 실사 · 실시간 점수 환산 · 4시트 엑셀 다운로드 · GAS 클라우드 연동", 5)

    # 탭 네비게이션 바 (현장점검 활성)
    tx, ty = 30, 90
    tabs = [
        ("📦 오픈지원부 (5개사)", False, "#64748b"),
        ("🛒 매장CS팀 (입고4·재고5 9개사)", False, "#64748b"),
        ("🔍 현장방문 실태점검 (30문항)", True, "#1d4ed8"),
        ("📋 '26 상반기 적격평가", False, "#64748b"),
        ("📑 도급조사표 (26문항)", False, "#64748b")
    ]
    cur_x = tx
    for name, active, col in tabs:
        w = len(name) * 11 + 24
        draw.rounded_rectangle([(cur_x, ty), (cur_x + w, ty + 38)], radius=8, fill="#1d4ed8" if active else "#ffffff", outline="#cbd5e1")
        draw.text((cur_x + 12, ty + 10), name, fill="#ffffff" if active else col, font=get_font(active, 12))
        cur_x += w + 8

    # 상단 요약 & 엑셀 다운로드 바
    draw.rounded_rectangle([(30, 140), (1170, 220)], radius=12, fill="#eff6ff", outline="#3b82f6", width=2)
    draw.text((45, 150), "점검 매장: 다이소 강남본점 (오픈지원 5개사 & 매장CS 9개사 합동실사)", fill="#1e3a8a", font=get_font(True, 15))
    draw.text((45, 175), "점검자: 안전보건팀 강동현 (sky5224122@gmail.com) · 실시간 환산점수: 88점 (판정: A등급 양호)", fill="#334155", font=get_font(False, 13))
    
    # 엑셀 다운로드 버튼 (초록색 강조)
    draw.rounded_rectangle([(810, 155), (1030, 205)], radius=8, fill="#059669")
    draw.text((825, 168), "📊 현장점검 엑셀(4시트) 다운로드", fill="#ffffff", font=get_font(True, 12))
    
    draw.rounded_rectangle([(1045, 155), (1155, 205)], radius=8, fill="#1d4ed8")
    draw.text((1060, 168), "☁️ GAS 전송", fill="#ffffff", font=get_font(True, 12))

    # 30문항 체크리스트 테이블 프리뷰
    draw.rounded_rectangle([(30, 235), (1170, 560)], radius=12, fill="#ffffff", outline="#cbd5e1", width=2)
    draw.text((45, 245), "📋 현장방문 실태점검표 (공통 10문항 + 오픈지원 10문항 + 매장CS 10문항 = 총 30문항)", fill="#0f172a", font=get_font(True, 14))

    # 헤더 행
    draw.rectangle([(45, 275), (1155, 305)], fill="#f1f5f9")
    draw.text((55, 283), "No", fill="#475569", font=get_font(True, 11))
    draw.text((95, 283), "구분", fill="#475569", font=get_font(True, 11))
    draw.text((220, 283), "현장 방문 중점 확인사항 (판정 기준)", fill="#475569", font=get_font(True, 11))
    draw.text((720, 283), "확인방법", fill="#475569", font=get_font(True, 11))
    draw.text((820, 283), "판정 (클릭 토글)", fill="#475569", font=get_font(True, 11))
    draw.text((980, 283), "시정조치 / 특이사항", fill="#475569", font=get_font(True, 11))

    sample_items = [
        ("1", "공통·적법도급", "[필수] 다이소 직원이 용역 작업자에게 직접 지시하지 않고 현장관리자 경유 지시하는가?", "관찰+인터뷰", "적합", "현장관리자(팀장) 상주 확인 양호"),
        ("2", "공통·적법도급", "[필수] 직영(리베로)과 용역업체 인력의 작업공간이 층별/구역별로 물리적 분리되어 있는가?", "구역표지 확인", "적합", "복층 1F 리베로 / 2F 용역 분리"),
        ("11", "오픈지원 5사", "[필수] 인테리어 잔여공사(도장/전기)와 진열작업 혼재가 철저히 차단되었는가?", "현장 순회", "적합", "인테리어 마감 완료 후 진열 투입"),
        ("12", "오픈지원 5사", "상단 매대 진열 시 A형 안전사다리를 사용하며 박스·의자 탑승을 금지하는가?", "진열 작업 관찰", "보완", "일부 작업자 스텝스툴 교체 지급 권고"),
        ("21", "매장CS 입고", "[필수] 2시간 집중 입고 시 하역장 차량 바퀴 고임목 및 롤테이너 바퀴 스토퍼 확인?", "하역 참관", "적합", "롤테이너 2인 1조 이동 준수"),
        ("26", "매장CS 야간", "[필수] 밤 10시 폐점 후 셔터가 닫힌 상태에서 비상출입문 위치·개폐법을 숙지하는가?", "실사원 질문", "적합", "유미어스·아르테 작업자 비상구 숙지 확인")
    ]
    for idx, (no, part, desc, method, ans, note) in enumerate(sample_items):
        row_y = 310 + idx * 40
        draw.line([(45, row_y + 38), (1155, row_y + 38)], fill="#e2e8f0")
        draw.text((55, row_y + 10), no, fill="#0f172a", font=get_font(True, 11))
        draw.text((95, row_y + 10), part, fill="#1e40af", font=get_font(True, 11))
        draw.text((220, row_y + 10), desc, fill="#0f172a", font=get_font(False, 10))
        draw.text((720, row_y + 10), method, fill="#64748b", font=get_font(False, 10))
        
        # 판정 뱃지
        btn_col = "#059669" if ans == "적합" else "#d97706"
        draw.rounded_rectangle([(820, row_y + 5), (870, row_y + 30)], radius=4, fill=btn_col)
        draw.text((830, row_y + 9), ans, fill="#ffffff", font=get_font(True, 10))
        draw.text((980, row_y + 10), note, fill="#334155", font=get_font(False, 10))

    # 하단 8대 크로스 인터뷰 프리뷰
    draw.rounded_rectangle([(30, 580), (1170, 885)], radius=12, fill="#ffffff", outline="#f59e0b", width=2)
    draw.text((45, 595), "🎙️ 현장 방문 시 8대 크로스 인터뷰 핵심 질문 가이드 (서류와 실제 현장 일치 여부 검증)", fill="#92400e", font=get_font(True, 14))

    interviews = [
        ("인터뷰 1: 오픈지원 용역 작업자", "Q. 오늘 아침 누구에게 진열 지시를 받으셨나요?", "✅ 우리 업체 팀장님께 받았습니다 (다이소 직원 직접지시 금지)"),
        ("인터뷰 2: 오픈지원 현장관리자", "Q. 다이소 오픈리베로와 공간 분리는 어떻게 하나요?", "✅ 복층은 층별, 단층은 A/B구역으로 분리해 진행합니다."),
        ("인터뷰 5: 매장CS 야간 재고실사원", "Q. 밤 10시 폐점 후 비상상황 시 밖으로 어떻게 나가나요?", "✅ 후문 비상개폐문 위치와 수동 레버를 교육받았습니다."),
        ("인터뷰 6: 매장CS 유미어스(70)·아르테(79)", "Q. 상반기 미흡했던 교육서명부·보호구대장 구비되었나요?", "✅ 네, 모바일 교육서명부 및 스텝스툴 지급대장 지참했습니다.")
    ]
    for idx, (target, q, good) in enumerate(interviews):
        row_y = 625 + idx * 62
        draw.rounded_rectangle([(45, row_y), (1155, row_y + 54)], radius=8, fill="#f8fafc", outline="#cbd5e1")
        draw.text((60, row_y + 6), target, fill="#1e40af", font=get_font(True, 11))
        draw.text((60, row_y + 26), q, fill="#0f172a", font=get_font(True, 11))
        draw.text((450, row_y + 26), good, fill="#15803d", font=get_font(True, 11))

    draw_pointer(draw, 720, 160, "👈 4시트 완성형 엑셀 즉시 다운로드!")
    img.save(os.path.join(IMG_DIR, "05_field_inspection_30_items.png"))
    print("Created: 05_field_inspection_30_items.png")

# ─────────────────────────────────────────────────────────
# [화면 6] 06_interior_dashboard_19_vendors.png : 인테리어 대시보드
# ─────────────────────────────────────────────────────────
def make_img_6():
    img = Image.new("RGB", (1200, 850), "#f8fafc")
    draw = ImageDraw.Draw(img)
    draw_header(draw, "6단계: 인테리어 / 공사 / 집기 대시보드 (19개 적격업체 현황)", "인테리어팀 마감·사인·냉난방 공사 및 매장시설관리팀 유지보수 19개사 현황", 6)

    # 상단 업종 상태 바
    draw.rounded_rectangle([(30, 95), (1170, 145)], radius=10, fill="#fffbeb", outline="#f59e0b", width=2)
    draw.text((45, 108), "🎯 현재 관리 업종: 🏗 인테리어 / 공사 / 집기 (인테리어팀 · 매장시설관리팀 적격업체 19개사)", fill="#92400e", font=get_font(True, 13))
    draw.rounded_rectangle([(1020, 103), (1150, 137)], radius=6, fill="#ffffff", outline="#d97706")
    draw.text((1035, 112), "🔄 업종 변경 ▾", fill="#92400e", font=get_font(True, 12))

    # 인테리어 19개사 요약 배너
    draw.rounded_rectangle([(30, 160), (1170, 240)], radius=12, fill="#78350f")
    draw.text((45, 175), "🏗 인테리어 / 공사 / 집기 도급안전관리 센터 (19개사 전원 적격)", fill="#ffffff", font=get_font(True, 16))
    draw.text((45, 205), "마감공사(9개사) · 사인공사(5개사) · 냉난방(1개사) · 매장시설보수(4개사) · 고소/화기 작업허가서(PTW) · 2일 1회 순회점검", fill="#fde68a", font=get_font(False, 12))

    # 19개사 테이블
    draw.rounded_rectangle([(30, 255), (1170, 820)], radius=12, fill="#ffffff", outline="#cbd5e1", width=2)
    draw.text((45, 270), "📋 '26년 상반기 인테리어·공사·집기 적격업체 안전보건수준평가 현황", fill="#0f172a", font=get_font(True, 14))

    # 헤더 행
    draw.rectangle([(45, 300), (1155, 330)], fill="#f1f5f9")
    draw.text((55, 308), "구분", fill="#475569", font=get_font(True, 11))
    draw.text((180, 308), "담당부서", fill="#475569", font=get_font(True, 11))
    draw.text((300, 308), "업체명", fill="#475569", font=get_font(True, 11))
    draw.text((520, 308), "평가점수", fill="#475569", font=get_font(True, 11))
    draw.text((620, 308), "등급", fill="#475569", font=get_font(True, 11))
    draw.text((700, 308), "비고 / 중점 안전관리 사항", fill="#475569", font=get_font(True, 11))

    sample_int = [
        ("인테리어 마감", "인테리어팀", "(주)시공디자인", 92, "S", "강남본점 800평 리뉴얼 주시공사 · 안전보건체계 우수"),
        ("인테리어 마감", "인테리어팀", "㈜예본아이디", 92, "S", "비상대책 훈련 및 위험성평가 S등급 우수"),
        ("인테리어 마감", "인테리어팀", "㈜디파하우징", 91, "S", "마감공사 적격 (위험성평가 S등급)"),
        ("인테리어 마감", "인테리어팀", "다온하우징", 88, "A", "마감·집기 설치 적격 (비상훈련 보완 필요)"),
        ("인테리어 사인", "인테리어팀", "우리애드", 86, "A", "고소작업대·외벽 간판 안전작업허가 준수"),
        ("인테리어 사인", "인테리어팀", "미르컴", 86, "A", "사인물 고소작업 안전관리 양호"),
        ("인테리어 냉난방", "인테리어팀", "에스원이엔지(주)", 81, "A", "천장형 냉난방기 배관 용접 시 화기작업 허가 필수"),
        ("매장시설 보수", "매장시설관리팀", "하이엠솔루텍", 98, "S", "LG 시스템에어컨·공조 유지보수 최우수(98점)"),
        ("매장시설 보수", "매장시설관리팀", "머큐리알엔에스", 93, "S", "전국 매장 전기·조명·집기 보수 우수(93점)"),
        ("매장시설 보수", "매장시설관리팀", "LSC", 91, "S", "매장 승강기·자동문 시설물 유지보수 우수")
    ]
    for idx, (grp, dept, name, sc, gr, note) in enumerate(sample_int):
        row_y = 335 + idx * 45
        draw.line([(45, row_y + 42), (1155, row_y + 42)], fill="#e2e8f0")
        draw.text((55, row_y + 12), grp, fill="#78350f", font=get_font(True, 11))
        draw.text((180, row_y + 12), dept, fill="#475569", font=get_font(False, 11))
        draw.text((300, row_y + 12), name, fill="#0f172a", font=get_font(True, 12))
        draw.text((520, row_y + 12), f"{sc}점", fill="#059669" if sc >= 90 else "#1d4ed8", font=get_font(True, 12))
        
        draw.rounded_rectangle([(620, row_y + 8), (665, row_y + 32)], radius=4, fill="#ecfdf5" if gr == "S" else "#eff6ff")
        draw.text((630, row_y + 12), f"{gr}등급", fill="#065f46" if gr == "S" else "#1e40af", font=get_font(True, 10))
        draw.text((700, row_y + 12), note, fill="#334155", font=get_font(False, 11))

    draw_pointer(draw, 950, 100, "👈 언제든 다른 업종으로 전환 가능!")
    img.save(os.path.join(IMG_DIR, "06_interior_dashboard_19_vendors.png"))
    print("Created: 06_interior_dashboard_19_vendors.png")

if __name__ == "__main__":
    make_img_1()
    make_img_2()
    make_img_3()
    make_img_4()
    make_img_5()
    make_img_6()
    print("SUCCESS: ALL 6 HIGH-RESOLUTION UI SCREENSHOTS GENERATED!")

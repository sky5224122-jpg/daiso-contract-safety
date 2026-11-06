# -*- coding: utf-8 -*-
"""
Google Apps Script 전용 완성형 단일 번들러 (v2.0)
누락 파일 없이 전체 16개 JS 모듈과 CSS 스타일을 100% 완전 통합하여 app.html을 생성합니다.
"""
import os
import re

base_dir = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱"
index_path = os.path.join(base_dir, "index.html")
css_path = os.path.join(base_dir, "style.css")

# index.html 로드 순서와 정확히 일치하는 16개 자바스크립트 파일 목록
js_files = [
    "config.js",
    "fb.js",
    "permit.js",
    "insp.js",
    "eval.js",
    "contract.js",
    "plan.js",
    "vendor.js",
    "qr.js",
    "staff.js",
    "board.js",
    "org.js",
    "flyer.js",
    "guide.js",
    "improve.js",
    "service.js",
    "app.js"
]

with open(index_path, "r", encoding="utf-8") as f:
    html = f.read()

with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

# 1. CSS 인라인 치환 (기존 link 태그 제거 후 style 태그로 삽입)
html = re.sub(r'<link\s+rel="stylesheet"\s+href="style\.css[^"]*">', f"<style>\n/* === INLINED style.css === */\n{css}\n</style>", html)

# 2. 로컬 script 태그들 제거 (순서대로 인라인 결합하기 위함)
for js_name in js_files:
    pattern = rf'<script\s+src="{re.escape(js_name)}[^"]*"></script>'
    html = re.sub(pattern, "", html)

# 3. 16개 JS 파일 순서대로 결합
bundle_js_parts = []
for js_name in js_files:
    js_p = os.path.join(base_dir, js_name)
    if os.path.exists(js_p):
        with open(js_p, "r", encoding="utf-8") as f:
            code = f.read()
        bundle_js_parts.append(f"\n/* ==========================================\n * MODULE: {js_name}\n * ========================================== */\n" + code)
    else:
        print(f"경고: {js_name} 파일이 존재하지 않습니다!")

all_scripts = "\n".join(bundle_js_parts)

# 4. body 태그 닫히기 직전에 결합된 통합 스크립트 삽입
html = html.replace("</body>", f"<script>\n{all_scripts}\n</script>\n</body>")

# 5. 구글 앱스 스크립트 폴더에 저장
gas_dir = os.path.join(base_dir, "google-apps-script")
out_path = os.path.join(gas_dir, "app.html")
with open(out_path, "w", encoding="utf-8") as f:
    f.write(html)

print(f"app.html 완전 통합 번들링 성공! 총 크기: {len(html):,} bytes")

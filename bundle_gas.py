# -*- coding: utf-8 -*-
"""
Google Apps Script 웹앱 단일 번들링 스크립트
index.html + style.css + js 6종을 결합하여 app.html을 생성합니다.
"""
import os

base_dir = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱"
index_path = os.path.join(base_dir, "index.html")
css_path = os.path.join(base_dir, "style.css")
js_files = ["config.js", "fb.js", "service.js", "board.js", "staff.js", "app.js"]

with open(index_path, "r", encoding="utf-8") as f:
    html = f.read()

with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

# CSS 인라인 결합
html = html.replace('<link rel="stylesheet" href="style.css">', f"<style>\n{css}\n</style>")

# JS 스크립트 인라인 결합
bundle_js = []
for js_name in js_files:
    js_p = os.path.join(base_dir, js_name)
    with open(js_p, "r", encoding="utf-8") as f:
        bundle_js.append(f"/* === {js_name} === */\n" + f.read())
    # 기존 외부 script 태그 제거
    html = html.replace(f'<script src="{js_name}"></script>', "")

all_scripts = "\n".join(bundle_js)
html = html.replace("</body>", f"<script>\n{all_scripts}\n</script>\n</body>")

gas_dir = os.path.join(base_dir, "google-apps-script")
out_path = os.path.join(gas_dir, "app.html")
with open(out_path, "w", encoding="utf-8") as f:
    f.write(html)

print(f"app.html 번들링 생성 완료! 크기: {len(html)} bytes")

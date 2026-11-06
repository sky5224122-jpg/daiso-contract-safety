# -*- coding: utf-8 -*-
import os
import re

base = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱"
with open(os.path.join(base, "index.html"), "r", encoding="utf-8") as f:
    html = f.read()

scripts = re.findall(r'<script\s+src="([^"]+)"', html)
print(f"index.html 내 총 {len(scripts)}개 스크립트 로드 확인:")
all_exist = True
for s in scripts:
    clean = s.split("?")[0]
    if clean.startswith("http"):
        print(f" [외부 CDN] {clean}")
    else:
        p = os.path.join(base, clean)
        exists = os.path.exists(p)
        size = os.path.getsize(p) if exists else 0
        status = f"정상 ({size:,} B)" if exists else "누락(오류!)"
        if not exists:
            all_exist = False
        print(f" [로컬 모듈] {clean} -> {status}")

print(f"\n전체 로컬 파일 존재 검증: {'100% 통과' if all_exist else '실패'}")

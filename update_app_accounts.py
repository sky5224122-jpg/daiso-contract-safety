# -*- coding: utf-8 -*-
import os

path = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱\app.js"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

text_norm = text.replace("\r\n", "\n")

old_part = "['VENDOR','sigong@vendor.test','👷 (주)시공디자인 (인테리어 마감 92점 S)','인테리어/공사/집기 대표 시공사 · 평당 800만원 규모']"
new_part = """['VENDOR','sunghyun@vendor.test','🛠 성현기업 (매장개선부 집기 91점 S)','매장 진열대 및 창고 경량랙 제작·납품·설치·철거·재배치'],
  ['VENDOR','yeowoo@vendor.test','🛠 예우시스템 (매장개선부 집기 89점 A)','상품 진열대(곤돌라) 및 벽면 선반 설치·보수·철거'],
  ['VENDOR','sigong@vendor.test','👷 (주)시공디자인 (인테리어 마감 92점 S)','인테리어/공사/집기 대표 시공사 · 평당 800만원 규모']"""

if old_part in text_norm:
    text_norm = text_norm.replace(old_part, new_part)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text_norm)
    print("app.js 매장개선부 협력업체 계정 추가 성공!")
else:
    print("old_part 미검출")

# -*- coding: utf-8 -*-
"""
오픈지원부 핵심 표준 지침서 및 조직도/인원투입기준 정밀 추출
"""
import os, zipfile
import xml.etree.ElementTree as ET

dir_path = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱\Open_Support_Contracts_2026"

def get_full_docx_text(path):
    with zipfile.ZipFile(path, 'r') as z:
        xml_content = z.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        texts = [node.text for node in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text]
        return ' '.join(texts)

def get_full_pptx_text(path):
    with zipfile.ZipFile(path, 'r') as z:
        slides = [f for f in z.namelist() if f.startswith('ppt/slides/slide') and f.endswith('.xml')]
        texts = []
        for s in sorted(slides, key=lambda x: int(x.replace('ppt/slides/slide','').replace('.xml','')) if x.replace('ppt/slides/slide','').replace('.xml','').isdigit() else 999):
            xml_content = z.read(s)
            tree = ET.fromstring(xml_content)
            slide_texts = [node.text for node in tree.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}t') if node.text]
            if slide_texts:
                texts.append(f"\n[Slide {s.split('/')[-1]}]: " + ' '.join(slide_texts))
        return '\n'.join(texts)

report = []

for root, dirs, files in os.walk(dir_path):
    for f in sorted(files):
        p = os.path.join(root, f)
        if '도급인의 안전보건조치 활동 지침서' in f:
            t = get_full_docx_text(p)
            report.append(f"=== [지침서: 도급인의 안전보건조치 활동] ===\n{t[:3000]}\n")
        elif '안전작업허가 지침서' in f:
            t = get_full_docx_text(p)
            report.append(f"=== [지침서: 안전작업허가 지침] ===\n{t[:2000]}\n")
        elif '작업중지요청' in f:
            t = get_full_docx_text(p)
            report.append(f"=== [지침서: 작업중지요청] ===\n{t[:1500]}\n")
        elif '인원투입 기준표' in f:
            t = get_full_pptx_text(p)
            report.append(f"=== [PPT: 인원투입 기준표(260907)] ===\n{t}\n")
        elif '오픈지원부조직도' in f:
            t = get_full_pptx_text(p)
            report.append(f"=== [PPT: 오픈지원부 조직도] ===\n{t}\n")
        elif '파트장 및 오픈매니저' in f:
            t = get_full_pptx_text(p)
            report.append(f"=== [PPT: 파트장 및 오픈매니저 업무정리] ===\n{t[:3000]}\n")

out_file = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱\open_dept_deep_analysis.txt"
with open(out_file, 'w', encoding='utf-8') as f:
    f.write('\n\n'.join(report))

print("정밀 분석 완료! 저장:", out_file)

# -*- coding: utf-8 -*-
"""
오픈지원부 용역 계약서 및 안전보건 자료 분석 스크립트
"""
import os, zipfile
import xml.etree.ElementTree as ET

dir_path = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱\Open_Support_Contracts_2026"
out_path = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱\contract_analysis_result.txt"

def get_docx_text(path):
    try:
        with zipfile.ZipFile(path, 'r') as z:
            xml_content = z.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            texts = [node.text for node in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text]
            return '\n'.join(texts)
    except Exception as e:
        return f"Error: {e}"

def get_pptx_text(path):
    try:
        with zipfile.ZipFile(path, 'r') as z:
            slides = [f for f in z.namelist() if f.startswith('ppt/slides/slide') and f.endswith('.xml')]
            texts = []
            for s in sorted(slides):
                xml_content = z.read(s)
                tree = ET.fromstring(xml_content)
                slide_texts = [node.text for node in tree.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}t') if node.text]
                if slide_texts:
                    texts.append(f"--- [Slide {s}] ---")
                    texts.append(' '.join(slide_texts))
            return '\n'.join(texts)
    except Exception as e:
        return f"Error: {e}"

results = []
for root, dirs, files in os.walk(dir_path):
    for f in sorted(files):
        p = os.path.join(root, f)
        if f.endswith('.docx'):
            content = get_docx_text(p)
            lines = [l.strip() for l in content.split('\n') if l.strip()]
            header = lines[:15]
            results.append(f"==================================================\n[DOCX FILE]: {f}\n==================================================")
            results.append('\n'.join(header))
            results.append(f"... (총 {len(lines)}개 라인)\n")
        elif f.endswith('.pptx'):
            content = get_pptx_text(p)
            lines = [l.strip() for l in content.split('\n') if l.strip()]
            header = lines[:15]
            results.append(f"==================================================\n[PPTX FILE]: {f}\n==================================================")
            results.append('\n'.join(header))
            results.append(f"... (총 {len(lines)}개 라인)\n")
        elif f.endswith('.pdf'):
            results.append(f"==================================================\n[PDF FILE]: {f} (크기: {os.path.getsize(p):,} B)\n==================================================")

with open(out_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(results))

print("분석 요약 파일 저장 완료:", out_path)

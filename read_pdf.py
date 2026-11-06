# -*- coding: utf-8 -*-
import os
import pypdf

base_dir = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱\Open_Support_Contracts_2026"
pdf_file = None
for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith('.pdf'):
            pdf_file = os.path.join(root, f)
            break

print("Found PDF:", pdf_file)
if pdf_file:
    reader = pypdf.PdfReader(pdf_file)
    print("Total Pages:", len(reader.pages))
    texts = []
    for idx, page in enumerate(reader.pages):
        t = page.extract_text() or ""
        texts.append(f"=== [PAGE {idx+1}] ===\n{t}")
    
    out_txt = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱\uni_contract_text.txt"
    with open(out_txt, "w", encoding="utf-8") as f:
        f.write("\n\n".join(texts))
    print("Saved to:", out_txt)

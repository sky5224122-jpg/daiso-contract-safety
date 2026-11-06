# -*- coding: utf-8 -*-
"""
service.js의 renderSvcOpen에 오픈지원부 계약서·안전지침서·조직도·인원투입기준표 반영
"""
import os

path = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱\service.js"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

text_norm = text.replace("\r\n", "\n")

target_marker = "<!-- 오픈지원부 핵심 운영 원칙 (불법파견 방지 & 공간분리) -->"

new_standards_html = """<!-- [오픈지원부 사내 안전보건 표준 지침서 & 조직도 & 2026 인원산출기준표 (공식문서 전수 반영)] -->
    <div class="card" style="background:#f8fafc;border:2px solid #3b82f6;margin-bottom:14px">
      <div class="card-h" style="background:#eff6ff">
        <span style="font-weight:900;color:#1e40af">📚 오픈지원부 사내 안전보건 표준 지침 & 조직운영 기준 ('26년 최신본)</span>
        <span class="badge info">KOSHA-MS / ISO 45001 공인 규정</span>
      </div>
      <div class="card-b">
        
        <!-- 1. 사내 안전보건 4대 표준 지침서 -->
        <div style="font-weight:900;font-size:13px;color:#0f172a;margin-bottom:8px">1) 도급 안전보건 관리 4대 표준 지침서 (사규 규정)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px;margin-bottom:16px">
          
          <div style="background:#fff;border:1px solid #cbd5e1;border-radius:10px;padding:12px;border-top:3px solid #1d4ed8">
            <b style="color:#1e40af;font-size:13px">📄 도급인의 안전보건조치 지침</b>
            <div style="font-size:11px;color:#64748b;margin-top:2px">AAD-HGRA-G-2022-015(1)</div>
            <div style="font-size:12px;color:#334155;line-height:1.55;margin-top:6px">
              • <b>순회점검:</b> 주 1회 이상 수급업체 작업장 필수 점검<br>
              • <b>안전보건협의체:</b> 월 1회 이상 정기 회의 개최<br>
              • <b>합동 안전보건점검:</b> 분기 1회 이상 (안전보건팀+수급업체 대표+근로자)
            </div>
          </div>

          <div style="background:#fff;border:1px solid #cbd5e1;border-radius:10px;padding:12px;border-top:3px solid #d97706">
            <b style="color:#b45309;font-size:13px">🛡️ 안전작업허가 지침서 (PTW)</b>
            <div style="font-size:11px;color:#64748b;margin-top:2px">AAD-HGRA-G-2022-013(1)</div>
            <div style="font-size:12px;color:#334155;line-height:1.55;margin-top:6px">
              • <b>허가 대상:</b> 2m 이상 고소, 화기, 220V 이상 전기, 외주공사<br>
              • <b>신청 기한:</b> 작업 2일 전(휴일 3일 전) 안전보건팀 신청 및 승인<br>
              • <b>작업시간:</b> 1일 최대 8시간 원칙 (초과 시 재허가)
            </div>
          </div>

          <div style="background:#fff;border:1px solid #cbd5e1;border-radius:10px;padding:12px;border-top:3px solid #dc2626">
            <b style="color:#dc2626;font-size:13px">🛑 작업중지요청 지침서</b>
            <div style="font-size:11px;color:#64748b;margin-top:2px">AAD-HGRA-G-2022-018(1)</div>
            <div style="font-size:12px;color:#334155;line-height:1.55;margin-top:6px">
              • <b>작업중지권 보장:</b> 급박한 위험 시 전 근로자 즉시 대피<br>
              • <b>관리감독자 조치:</b> 현장 확인 및 위험 개선 완료 시까지 작업 중지<br>
              • <b>보고:</b> 안전보건팀 사진/유선 보고 및 확인 후 재개
            </div>
          </div>

          <div style="background:#fff;border:1px solid #cbd5e1;border-radius:10px;padding:12px;border-top:3px solid #059669">
            <b style="color:#047857;font-size:13px">🚨 비상시 대비 및 대응 절차서</b>
            <div style="font-size:11px;color:#64748b;margin-top:2px">AAD-HGRA-P-2022-011(2)</div>
            <div style="font-size:12px;color:#334155;line-height:1.55;margin-top:6px">
              • <b>비상훈련:</b> 케이웍스·유엔아이·맨토스 가점 보완 항목<br>
              • <b>대응체계:</b> 화재·붕괴·사고 시 119 및 안전보건팀 비상연락<br>
              • <b>통로확보:</b> 매장 및 창고 비상대피로 상시 유효 확보
            </div>
          </div>

        </div>

        <!-- 2. 오픈지원부 조직도 & 인원투입 기준표 2026 -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:12px">
          
          <!-- 조직도 -->
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:12px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <b style="font-size:13px;color:#0f172a">👥 오픈지원부 조직 구성 (2026년 5개 팀 체계)</b>
              <span class="badge info">부서장: 전용필 부장</span>
            </div>
            <div style="font-size:12px;color:#475569;line-height:1.6">
              • <b>총괄:</b> 매장지원부문 임태희 상무 / 영업본부 신호섭 부사장<br>
              • <b>수도권 동부지원팀:</b> 김새롬 대리 등 현장 리딩<br>
              • <b>수도권 서부지원팀:</b> 진윤섭 과장, 전소영 사원, 김윤식 사원 등<br>
              • <b>호남 오픈지원팀:</b> 박주경 과장, 안종모 과장, 최지연 사원 등<br>
              • <b>영남 오픈지원팀:</b> 남희준 과장, 이현석 사원, 박수정 사원 등<br>
              • <b>리뉴얼 전담팀:</b> 수도권 장기선 과장 / 지방 박주경 과장·홍병우 과장
            </div>
          </div>

          <!-- 인원투입 기준표 (2026.09.07 개정) -->
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:12px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <b style="font-size:13px;color:#0f172a">📊 매장 규모별 인원투입 기준표 (2026.09.07 개정)</b>
              <span class="badge warn">공식 산출 공식</span>
            </div>
            <div style="font-size:12px;color:#475569;line-height:1.6">
              • <b>소형 (10~25평 / 20~90면):</b> 오픈팀 3~5명 + 용역 4~20명 (1~2일)<br>
              • <b>중형 (30~150평 / 100~550면):</b> 오픈팀 5~10명 + 용역 10~20명 (2~6일)<br>
              • <b>대형 (200~400평 / 450~900면):</b> 리베로 15명 + 용역 17~20명 (6~11일, 총 102~220명)<br>
              • <b>초대형 (500~800평 / 1,000~1,700면):</b> 리베로 15~35명 + 용역 20~30명 (14~20일, <b>총 280~600명</b>)<br>
              • <b style="color:#dc2626">💡 인원 불문율:</b> <u>"모든 기준표에 오픈리베로 1명 미투입 시 용역 1.5명 추가 투입"</u>
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- 오픈지원부 핵심 운영 원칙 (불법파견 방지 & 공간분리) -->"""

if target_marker in text_norm:
    text_norm = text_norm.replace(target_marker, new_standards_html)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text_norm)
    print("service.js 오픈지원부 표준지침·조직도·인원투입기준 탑재 성공!")
else:
    print("target_marker 미검출!")

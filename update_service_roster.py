# -*- coding: utf-8 -*-
import os

path = r"D:\■ AI 활용 안전전보건 자료\13. 도급 안전관리 앱\service.js"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. 점검자(inspector) 라벨 및 선택 영역 강화
target_inp = """          <div>
            <label style="font-size:11px;font-weight:800;color:#475569;display:block;margin-bottom:4px">점검자 (안전보건팀)</label>
            <input class="inp" value="${esc(fi.meta.inspector)}" onchange="updateFieldMeta('inspector', this.value)">
          </div>"""

new_inp = """          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
              <label style="font-size:11px;font-weight:800;color:#475569">점검자 (작성 담당자)</label>
              <select style="font-size:10.5px;padding:1px 4px;border:1px solid #cbd5e1;border-radius:4px;background:#f8fafc"
                onchange="if(this.value){updateFieldMeta('inspector', this.value);renderSvcUI();}">
                <option value="">-- 오픈지원부 담당자 선택 --</option>
                <optgroup label="수도권 서부지원팀">
                  <option value="오픈지원부 서부지원팀장 진윤섭 과장">진윤섭 과장 (서부지원팀장)</option>
                  <option value="오픈지원부 주은정 차장">주은정 차장 (선임)</option>
                  <option value="오픈지원부 김영진 대리">김영진 대리 (담당)</option>
                  <option value="오픈지원부 홍영웅 사원">홍영웅 사원</option>
                  <option value="오픈지원부 이유정 사원">이유정 사원</option>
                  <option value="오픈지원부 김혜미 사원">김혜미 사원</option>
                  <option value="오픈지원부 이승권 사원">이승권 사원</option>
                </optgroup>
                <optgroup label="수도권 동부지원팀">
                  <option value="오픈지원부 동부지원팀장 김새롬 대리">김새롬 대리 (동부지원팀장)</option>
                  <option value="오픈지원부 전소영 사원">전소영 사원 (선임)</option>
                  <option value="오픈지원부 황보민우 사원">황보민우 사원</option>
                  <option value="오픈지원부 김윤식 사원">김윤식 사원</option>
                  <option value="오픈지원부 곽예지 사원">곽예지 사원</option>
                  <option value="오픈지원부 정진희 사원">정진희 사원</option>
                </optgroup>
                <optgroup label="호남 오픈지원팀">
                  <option value="오픈지원부 호남지원팀장 박주경 과장">박주경 과장 (호남팀장겸)</option>
                  <option value="오픈지원부 안종모 과장">안종모 과장 (선임)</option>
                  <option value="오픈지원부 서정진 사원">서정진 사원</option>
                  <option value="오픈지원부 전동민 사원">전동민 사원</option>
                  <option value="오픈지원부 최지연 사원">최지연 사원</option>
                </optgroup>
                <optgroup label="영남 오픈지원팀">
                  <option value="오픈지원부 영남지원팀장 남희준 과장">남희준 과장 (영남팀장)</option>
                  <option value="오픈지원부 이현석 사원">이현석 사원 (선임)</option>
                  <option value="오픈지원부 윤경희 사원">윤경희 사원</option>
                  <option value="오픈지원부 김수연 사원">김수연 사원</option>
                  <option value="오픈지원부 박수정 사원">박수정 사원</option>
                  <option value="오픈지원부 정우재 사원">정우재 사원</option>
                </optgroup>
                <optgroup label="수도권 리뉴얼팀">
                  <option value="오픈지원부 수도권리뉴얼팀장 장기선 과장">장기선 과장 (리뉴얼팀장)</option>
                  <option value="오픈지원부 신정미 차장">신정미 차장 (선임)</option>
                  <option value="오픈지원부 변준영 사원">변준영 사원</option>
                </optgroup>
                <optgroup label="지방 리뉴얼팀">
                  <option value="오픈지원부 지방리뉴얼팀장 박주경 과장兼">박주경 과장兼 (지방리뉴얼팀장)</option>
                  <option value="오픈지원부 홍병우 과장">홍병우 과장 (선임)</option>
                  <option value="오픈지원부 윤경희 사원">윤경희 사원</option>
                  <option value="오픈지원부 최재이 사원">최재이 사원</option>
                </optgroup>
              </select>
            </div>
            <input class="inp" id="fieldInspectorInp" value="${esc(fi.meta.inspector || (state&&state.staff ? state.staff.dept + ' ' + state.staff.name + ' ' + (state.staff.title||'') : '안전보건팀 강동현'))}" onchange="updateFieldMeta('inspector', this.value)">
          </div>"""

if target_inp in text:
    text = text.replace(target_inp, new_inp)
    print("service.js 점검자 선택 드롭다운 반영 완료")
else:
    print("target_inp 미발견")

# 2. 오픈지원부 탭(renderSvcOpen) 상단에 6개 팀 조직표 시각화 카드 삽입
target_open_card = """<!-- [오픈지원부 사내 안전보건 표준 지침서 & 조직도 & 2026 인원산출기준표 (공식문서 전수 반영)] -->"""

org_roster_card = """<!-- [오픈지원부 6개 팀 29명 실무 운영 조직도 (사용자 전달 공식 조직표)] -->
    <div class="card" style="background:#ffffff;border:2px solid #0284c7;margin-bottom:14px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.07)">
      <div class="card-h" style="background:#f0f9ff;border-bottom:1px solid #bae6fd;display:flex;justify-content:space-between;align-items:center">
        <span style="font-weight:900;font-size:14px;color:#0369a1">👥 오픈지원부 현행 실무 조직도 (6개 팀 29명 · 로그인 작성 담당자 등록 완료)</span>
        <button class="button xs" style="background:#0284c7;color:#fff;font-weight:700;padding:3px 10px;border-radius:6px" onclick="openTestSwitchModal()">⚡ 담당자 계정 전환</button>
      </div>
      <div class="card-b" style="padding:12px">
        <p style="font-size:12px;color:#475569;margin:0 0 10px">
          💡 각 팀을 클릭하거나 우측 상단 <b>[⚡ 담당자 계정 전환]</b> 버튼을 누르면 해당 팀장 및 실무 담당자로 즉시 로그인하여 점검표를 작성할 수 있습니다.
        </p>

        <!-- 6개 팀 카드 그리드 (사용자 업로드 조직도 이미지와 100% 동일한 배치) -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:8px">
          
          <!-- 1. 수도권 서부지원팀 -->
          <div style="border:1px solid #cbd5e1;border-radius:8px;overflow:hidden;background:#fff">
            <div style="background:#e2e8f0;padding:6px;text-align:center;font-weight:800;font-size:12.5px;color:#1e293b;border-bottom:1px solid #cbd5e1">
              수도권<br>서부지원팀
            </div>
            <div style="padding:6px;text-align:center;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-weight:800;font-size:12px;color:#0f172a">
              <button class="button xs ghost" style="padding:1px 4px;font-size:11.5px;font-weight:800;color:#0284c7" onclick="quickTestLogin('jinys@daiso.test','STAFF','OPEN')">진윤섭 과장 ⚡</button>
            </div>
            <div style="padding:6px;font-size:11px;line-height:1.6;color:#334155;text-align:center;border-bottom:1px solid #f1f5f9">
              주은정 차장<br>김영진 대리
            </div>
            <div style="padding:6px;font-size:11px;line-height:1.6;color:#15803d;font-weight:700;text-align:center;background:#fcfdfd">
              홍영웅 사원<br>이유정 사원<br>김혜미 사원<br>이승권 사원
            </div>
          </div>

          <!-- 2. 수도권 동부지원팀 -->
          <div style="border:1px solid #cbd5e1;border-radius:8px;overflow:hidden;background:#fff">
            <div style="background:#e2e8f0;padding:6px;text-align:center;font-weight:800;font-size:12.5px;color:#1e293b;border-bottom:1px solid #cbd5e1">
              수도권<br>동부지원팀
            </div>
            <div style="padding:6px;text-align:center;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-weight:800;font-size:12px;color:#0f172a">
              <button class="button xs ghost" style="padding:1px 4px;font-size:11.5px;font-weight:800;color:#0284c7" onclick="quickTestLogin('kimsr@daiso.test','STAFF','OPEN')">김새롬 대리 ⚡</button>
            </div>
            <div style="padding:6px;font-size:11px;line-height:1.6;color:#334155;text-align:center;border-bottom:1px solid #f1f5f9">
              전소영 사원
            </div>
            <div style="padding:6px;font-size:11px;line-height:1.6;color:#15803d;font-weight:700;text-align:center;background:#fcfdfd">
              황보민우 사원<br>김윤식 사원<br>곽예지 사원<br>정진희 사원
            </div>
          </div>

          <!-- 3. 호남 오픈지원팀 -->
          <div style="border:1px solid #cbd5e1;border-radius:8px;overflow:hidden;background:#fff">
            <div style="background:#e2e8f0;padding:6px;text-align:center;font-weight:800;font-size:12.5px;color:#1e293b;border-bottom:1px solid #cbd5e1">
              호남<br>오픈지원팀
            </div>
            <div style="padding:6px;text-align:center;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-weight:800;font-size:12px;color:#0f172a">
              <button class="button xs ghost" style="padding:1px 4px;font-size:11.5px;font-weight:800;color:#0284c7" onclick="quickTestLogin('parkjk@daiso.test','STAFF','OPEN')">박주경 과장 ⚡</button>
            </div>
            <div style="padding:6px;font-size:11px;line-height:1.6;color:#334155;text-align:center;border-bottom:1px solid #f1f5f9">
              안종모 과장
            </div>
            <div style="padding:6px;font-size:11px;line-height:1.6;color:#15803d;font-weight:700;text-align:center;background:#fcfdfd">
              서정진 사원<br>전동민 사원<br>최지연 사원
            </div>
          </div>

          <!-- 4. 영남 오픈지원팀 -->
          <div style="border:1px solid #cbd5e1;border-radius:8px;overflow:hidden;background:#fff">
            <div style="background:#e2e8f0;padding:6px;text-align:center;font-weight:800;font-size:12.5px;color:#1e293b;border-bottom:1px solid #cbd5e1">
              영남<br>오픈지원팀
            </div>
            <div style="padding:6px;text-align:center;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-weight:800;font-size:12px;color:#0f172a">
              <button class="button xs ghost" style="padding:1px 4px;font-size:11.5px;font-weight:800;color:#0284c7" onclick="quickTestLogin('namhj@daiso.test','STAFF','OPEN')">남희준 과장 ⚡</button>
            </div>
            <div style="padding:6px;font-size:11px;line-height:1.6;color:#334155;text-align:center;border-bottom:1px solid #f1f5f9">
              이현석 사원
            </div>
            <div style="padding:6px;font-size:11px;line-height:1.6;color:#15803d;font-weight:700;text-align:center;background:#fcfdfd">
              윤경희 사원<br>김수연 사원<br>박수정 사원<br>정우재 사원
            </div>
          </div>

          <!-- 5. 수도권 리뉴얼팀 -->
          <div style="border:1px solid #cbd5e1;border-radius:8px;overflow:hidden;background:#fff">
            <div style="background:#e2e8f0;padding:6px;text-align:center;font-weight:800;font-size:12.5px;color:#1e293b;border-bottom:1px solid #cbd5e1">
              수도권<br>리뉴얼팀
            </div>
            <div style="padding:6px;text-align:center;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-weight:800;font-size:12px;color:#0f172a">
              <button class="button xs ghost" style="padding:1px 4px;font-size:11.5px;font-weight:800;color:#0284c7" onclick="quickTestLogin('jangks@daiso.test','STAFF','OPEN')">장기선 과장 ⚡</button>
            </div>
            <div style="padding:6px;font-size:11px;line-height:1.6;color:#334155;text-align:center;border-bottom:1px solid #f1f5f9">
              신정미 차장
            </div>
            <div style="padding:6px;font-size:11px;line-height:1.6;color:#15803d;font-weight:700;text-align:center;background:#fcfdfd">
              변준영 사원
            </div>
          </div>

          <!-- 6. 지방 리뉴얼팀 (헤더 주황, 박주경 과장겸 하늘색) -->
          <div style="border:1.5px solid #f59e0b;border-radius:8px;overflow:hidden;background:#fff">
            <div style="background:#f59e0b;padding:6px;text-align:center;font-weight:900;font-size:12.5px;color:#ffffff;border-bottom:1px solid #d97706">
              지방<br>리뉴얼팀
            </div>
            <div style="padding:6px;text-align:center;background:#e0f2fe;border-bottom:1px solid #bae6fd;font-weight:800;font-size:12px;color:#0369a1">
              <button class="button xs ghost" style="padding:1px 4px;font-size:11.5px;font-weight:900;color:#0369a1" onclick="quickTestLogin('parkjk.local@daiso.test','STAFF','OPEN')">박주경 과장兼 ⚡</button>
            </div>
            <div style="padding:6px;font-size:11px;line-height:1.6;color:#334155;text-align:center;border-bottom:1px solid #f1f5f9">
              홍병우 과장
            </div>
            <div style="padding:6px;font-size:11px;line-height:1.6;color:#15803d;font-weight:700;text-align:center;background:#fcfdfd">
              윤경희 사원<br>최재이 사원
            </div>
          </div>

        </div>
      </div>
    </div>
"""

if target_open_card in text and "오픈지원부 현행 실무 조직도" not in text:
    text = text.replace(target_open_card, org_roster_card + "\n    " + target_open_card)
    print("service.js에 오픈지원부 조직표 카드 삽입 완료")
else:
    print("target_open_card 미발견 또는 이미 삽입됨")

with open(path, "w", encoding="utf-8") as f:
    f.write(text)
print("service.js 파일 저장 완료")

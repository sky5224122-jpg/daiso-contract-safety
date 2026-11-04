const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const PORT = 8088;
const BASE_DIR = path.resolve('D:/■ AI 활용 안전전보건 자료/13. 도급 안전관리 앱');
const IMG_DIR = path.join(BASE_DIR, 'User_Guide_Images');
if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

// 간단한 정적 파일 서빙 HTTP 서버
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(BASE_DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
  }
});

server.listen(PORT, async () => {
  console.log(`Local test server running at http://localhost:${PORT}`);

  try {
    // 1. 로그인 첫 화면 (원클릭 접속 버튼 강조)
    console.log('Capturing: 01_login_screen.png');
    execSync(`"${CHROME_PATH}" --headless=new --screenshot="${path.join(IMG_DIR, '01_login_screen.png')}" --window-size=1280,1100 --virtual-time-budget=2000 "http://localhost:${PORT}/index.html"`, { stdio: 'inherit' });

    // 2. 업종 선택 모달 화면 (인테리어/공사 vs 오픈지원/CS)
    console.log('Capturing: 02_sector_select_modal.png');
    const autoSectorHtml = path.join(BASE_DIR, 'tmp_capture_sector.html');
    let idxHtml = fs.readFileSync(path.join(BASE_DIR, 'index.html'), 'utf8');
    // 자동 로그인 및 업종 모달 띄우기 코드 삽입
    const scriptInject1 = `
      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            quickTestLogin('sky5224122@gmail.com', 'STAFF');
            setTimeout(() => {
              if (typeof openSectorSelectModal === 'function') openSectorSelectModal(true);
            }, 600);
          }, 300);
        });
      </script>
    `;
    fs.writeFileSync(autoSectorHtml, idxHtml.replace('</body>', scriptInject1 + '</body>'), 'utf8');
    execSync(`"${CHROME_PATH}" --headless=new --screenshot="${path.join(IMG_DIR, '02_sector_select_modal.png')}" --window-size=1360,1150 --virtual-time-budget=4000 "http://localhost:${PORT}/tmp_capture_sector.html"`, { stdio: 'inherit' });

    // 3. 오픈지원부 (5개사) 진열·입고 화면
    console.log('Capturing: 03_open_support_5_vendors.png');
    const autoOpenHtml = path.join(BASE_DIR, 'tmp_capture_open.html');
    const scriptInject2 = `
      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            quickTestLogin('sky5224122@gmail.com', 'STAFF', 'SERVICE');
            setTimeout(() => {
              if (typeof sgo === 'function') sgo('service');
              setTimeout(() => {
                svcTab = 'open';
                if (typeof loadService === 'function') loadService();
              }, 400);
            }, 600);
          }, 300);
        });
      </script>
    `;
    fs.writeFileSync(autoOpenHtml, idxHtml.replace('</body>', scriptInject2 + '</body>'), 'utf8');
    execSync(`"${CHROME_PATH}" --headless=new --screenshot="${path.join(IMG_DIR, '03_open_support_5_vendors.png')}" --window-size=1360,1500 --virtual-time-budget=4500 "http://localhost:${PORT}/tmp_capture_open.html"`, { stdio: 'inherit' });

    // 4. 매장CS팀 (입고4개사 + 재고5개사 = 총 9개사) 화면
    console.log('Capturing: 04_store_cs_9_vendors.png');
    const autoCsHtml = path.join(BASE_DIR, 'tmp_capture_cs.html');
    const scriptInject3 = `
      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            quickTestLogin('sky5224122@gmail.com', 'STAFF', 'SERVICE');
            setTimeout(() => {
              if (typeof sgo === 'function') sgo('service');
              setTimeout(() => {
                svcTab = 'cs';
                if (typeof loadService === 'function') loadService();
              }, 400);
            }, 600);
          }, 300);
        });
      </script>
    `;
    fs.writeFileSync(autoCsHtml, idxHtml.replace('</body>', scriptInject3 + '</body>'), 'utf8');
    execSync(`"${CHROME_PATH}" --headless=new --screenshot="${path.join(IMG_DIR, '04_store_cs_9_vendors.png')}" --window-size=1360,1650 --virtual-time-budget=4500 "http://localhost:${PORT}/tmp_capture_cs.html"`, { stdio: 'inherit' });

    // 5. 현장방문 실태점검표 (30문항 체크리스트 & 8대 인터뷰 & 실시간 환산점수 & 엑셀다운)
    console.log('Capturing: 05_field_inspection_30_items.png');
    const autoFieldHtml = path.join(BASE_DIR, 'tmp_capture_field.html');
    const scriptInject4 = `
      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            quickTestLogin('sky5224122@gmail.com', 'STAFF', 'SERVICE');
            setTimeout(() => {
              if (typeof sgo === 'function') sgo('service');
              setTimeout(() => {
                svcTab = 'field';
                if (typeof loadService === 'function') loadService();
              }, 400);
            }, 600);
          }, 300);
        });
      </script>
    `;
    fs.writeFileSync(autoFieldHtml, idxHtml.replace('</body>', scriptInject4 + '</body>'), 'utf8');
    execSync(`"${CHROME_PATH}" --headless=new --screenshot="${path.join(IMG_DIR, '05_field_inspection_30_items.png')}" --window-size=1360,1700 --virtual-time-budget=4500 "http://localhost:${PORT}/tmp_capture_field.html"`, { stdio: 'inherit' });

    // 6. 인테리어 / 공사 / 집기 대시보드 및 19개 적격업체 현황 화면
    console.log('Capturing: 06_interior_dashboard_19_vendors.png');
    const autoIntHtml = path.join(BASE_DIR, 'tmp_capture_int.html');
    const scriptInject5 = `
      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            quickTestLogin('sky5224122@gmail.com', 'STAFF', 'INTERIOR');
            setTimeout(() => {
              showInteriorTable = true;
              if (typeof sgo === 'function') sgo('dash');
            }, 600);
          }, 300);
        });
      </script>
    `;
    fs.writeFileSync(autoIntHtml, idxHtml.replace('</body>', scriptInject5 + '</body>'), 'utf8');
    execSync(`"${CHROME_PATH}" --headless=new --screenshot="${path.join(IMG_DIR, '06_interior_dashboard_19_vendors.png')}" --window-size=1360,1500 --virtual-time-budget=4500 "http://localhost:${PORT}/tmp_capture_int.html"`, { stdio: 'inherit' });

    // 임시 파일 정리
    [autoSectorHtml, autoOpenHtml, autoCsHtml, autoFieldHtml, autoIntHtml].forEach(p => {
      try { if (fs.existsSync(p)) fs.unlinkSync(p); } catch (e) {}
    });

    console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
  } catch (err) {
    console.error('Capture error:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});

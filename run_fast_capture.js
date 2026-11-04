const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const PORT = 8089;
const BASE_DIR = path.resolve('D:/■ AI 활용 안전전보건 자료/13. 도급 안전관리 앱');
const IMG_DIR = path.join(BASE_DIR, 'User_Guide_Images');
if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function captureUrl(url, outName, width, height) {
  const outPath = path.join(IMG_DIR, outName);
  const args = [
    '--headless',
    '--disable-gpu',
    `--screenshot=${outPath}`,
    `--window-size=${width},${height}`,
    url
  ];
  const res = spawnSync(CHROME, args, { stdio: 'inherit' });
  console.log(`Saved: ${outName} (status: ${res.status})`);
}

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
  console.log(`Server listening on ${PORT}`);

  try {
    const origHtml = fs.readFileSync(path.join(BASE_DIR, 'index.html'), 'utf8');

    // 1. 로그인 첫 화면
    console.log('1. Capturing login screen...');
    captureUrl(`http://localhost:${PORT}/index.html`, '01_login_screen.png', 1280, 1050);

    // 2. 업종 선택 모달 화면
    console.log('2. Capturing sector select modal...');
    const h2 = origHtml.replace('</body>', `
      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            quickTestLogin('sky5224122@gmail.com', 'STAFF');
            setTimeout(() => {
              if (typeof openSectorSelectModal === 'function') openSectorSelectModal(true);
            }, 600);
          }, 300);
        });
      </script></body>
    `);
    fs.writeFileSync(path.join(BASE_DIR, 'tmp2.html'), h2, 'utf8');
    captureUrl(`http://localhost:${PORT}/tmp2.html`, '02_sector_select_modal.png', 1300, 1100);

    // 3. 오픈지원부 (5개사) 화면
    console.log('3. Capturing open support 5 vendors...');
    const h3 = origHtml.replace('</body>', `
      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            quickTestLogin('sky5224122@gmail.com', 'STAFF', 'SERVICE');
            setTimeout(() => {
              sgo('service');
              setTimeout(() => {
                svcTab = 'open';
                loadService();
              }, 400);
            }, 600);
          }, 300);
        });
      </script></body>
    `);
    fs.writeFileSync(path.join(BASE_DIR, 'tmp3.html'), h3, 'utf8');
    captureUrl(`http://localhost:${PORT}/tmp3.html`, '03_open_support_5_vendors.png', 1300, 1450);

    // 4. 매장CS팀 (입고4개사 + 재고5개사 = 9개사) 화면
    console.log('4. Capturing store CS 9 vendors...');
    const h4 = origHtml.replace('</body>', `
      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            quickTestLogin('sky5224122@gmail.com', 'STAFF', 'SERVICE');
            setTimeout(() => {
              sgo('service');
              setTimeout(() => {
                svcTab = 'cs';
                loadService();
              }, 400);
            }, 600);
          }, 300);
        });
      </script></body>
    `);
    fs.writeFileSync(path.join(BASE_DIR, 'tmp4.html'), h4, 'utf8');
    captureUrl(`http://localhost:${PORT}/tmp4.html`, '04_store_cs_9_vendors.png', 1300, 1550);

    // 5. 현장방문 실태점검표 (30문항 & 인터뷰) 화면
    console.log('5. Capturing field inspection 30 items...');
    const h5 = origHtml.replace('</body>', `
      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            quickTestLogin('sky5224122@gmail.com', 'STAFF', 'SERVICE');
            setTimeout(() => {
              sgo('service');
              setTimeout(() => {
                svcTab = 'field';
                loadService();
              }, 400);
            }, 600);
          }, 300);
        });
      </script></body>
    `);
    fs.writeFileSync(path.join(BASE_DIR, 'tmp5.html'), h5, 'utf8');
    captureUrl(`http://localhost:${PORT}/tmp5.html`, '05_field_inspection_30_items.png', 1300, 1600);

    // 6. 인테리어/공사/집기 19개사 현황 화면
    console.log('6. Capturing interior dashboard...');
    const h6 = origHtml.replace('</body>', `
      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            quickTestLogin('sky5224122@gmail.com', 'STAFF', 'INTERIOR');
            setTimeout(() => {
              showInteriorTable = true;
              sgo('dash');
            }, 600);
          }, 300);
        });
      </script></body>
    `);
    fs.writeFileSync(path.join(BASE_DIR, 'tmp6.html'), h6, 'utf8');
    captureUrl(`http://localhost:${PORT}/tmp6.html`, '06_interior_dashboard_19_vendors.png', 1300, 1450);

    // 임시 파일 삭제
    ['tmp2.html', 'tmp3.html', 'tmp4.html', 'tmp5.html', 'tmp6.html'].forEach(f => {
      try { fs.unlinkSync(path.join(BASE_DIR, f)); } catch (e) {}
    });

    console.log('ALL 6 SCREENSHOTS COMPLETED!');
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});

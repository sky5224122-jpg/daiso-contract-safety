@echo off
chcp 65001 >nul
title 아성다이소 도급 안전관리 (오픈지원부·매장CS팀 시험 서버)
cd /d "%~dp0"
echo ============================================================================
echo [아성다이소 안전보건팀] 도급 안전관리 웹앱 (오픈지원부·매장CS팀 통합 시험본)
echo  - 담당자 즉시 접속: 강동현 (sky5224122@gmail.com)
echo  - 브라우저가 자동으로 열립니다: http://localhost:8765
echo ============================================================================
start "" "http://localhost:8765"
node -e "const http=require('http'),fs=require('fs'),path=require('path');const mime={'.html':'text/html;charset=utf-8','.js':'application/javascript;charset=utf-8','.css':'text/css;charset=utf-8','.json':'application/json;charset=utf-8','.png':'image/png','.webmanifest':'application/manifest+json'};http.createServer((req,res)=>{let u=decodeURIComponent(req.url.split('?')[0]);if(u==='/')u='/index.html';const fp=path.join(process.cwd(),u);fs.readFile(fp,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return;}res.writeHead(200,{'Content-Type':mime[path.extname(fp)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);});}).listen(8765,()=>console.log('Server running at http://localhost:8765'));"

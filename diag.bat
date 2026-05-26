@echo off
echo === BUILD ERROR DIAGNOSTIC === > diag-output.txt
echo. >> diag-output.txt
echo --- package.json dependencies --- >> diag-output.txt
type package.json | findstr /N "lucide-react" >> diag-output.txt
echo. >> diag-output.txt
echo --- next.config.ts --- >> diag-output.txt
type next.config.ts >> diag-output.txt
echo. >> diag-output.txt
echo --- app/page.tsx first 10 lines --- >> diag-output.txt
powershell "Get-Content app\page.tsx | Select-Object -First 10" >> diag-output.txt
echo. >> diag-output.txt
echo --- BUILD OUTPUT --- >> diag-output.txt
call npm run build >> diag-output.txt 2>&1
echo. >> diag-output.txt
echo === END === >> diag-output.txt

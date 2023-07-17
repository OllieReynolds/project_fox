@echo off
cd client
call npm install
cd ..
cd server
call conda activate fox_env
call conda install --file requirements.txt

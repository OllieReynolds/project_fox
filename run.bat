@echo off
start cmd /k "cd client && expo start"
start cmd /k "cd server && conda activate fox_env && python app.py"

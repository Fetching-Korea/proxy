npm run build
zip deploy.zip -r dist/*.js package.json ./node_modules/** # 소스 압축
aws lambda update-function-code --function-name proxy --zip-file  fileb://./deploy.zip # 소스 배포
rm deploy.zip # 배포용 소스 삭제

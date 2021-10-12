npm run build

tar.exe -a -c -f deploy.zip dist/express dist/index.js src/node_modules
aws lambda update-function-code --function-name proxy --zip-file fileb://./deploy.zip
del deploy.zip


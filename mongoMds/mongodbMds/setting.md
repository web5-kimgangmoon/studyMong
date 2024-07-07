# 몽고DB

## 몽고DB 설치

WSL2 설치(윈도우의 경우)  
https://www.tenforums.com/tutorials/164301-how-update-wsl-wsl-2-windows-10-a.html  
https://apps.microsoft.com/detail/9pdxgncfsczv?hl=ko-kr&gl=US

몽고DB 설치 페이지(window의 경우에는 설치만 하면 제대로 실행이 되었다.)  
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

## 몽고 DB 기본실행

wsl2 기반의 ubuntu를 기준으로 메모합니다.

```bash
sudo service mongod start
mongosh
```

mongodb

```bash
use 데이터베이스명
```

주의, mongoose를 이용해 mongodb 모델(컬렉션)을 저장할때 이름 끝에 s가 붙는다.

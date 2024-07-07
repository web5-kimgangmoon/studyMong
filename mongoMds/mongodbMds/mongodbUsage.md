## 기본 함수들

데이터베이스

```s
use 데이터베이스명 ## db 생성, 이미 있다면 실행해준다.
show dbs ## 현재 생성되어있는 데이터베이스 목록을 출력
db ## 현재 실행중인 데이터베이스를 출력한다.
db.stats() ## 현재 실행중인 데이터베이스의 자세한 내역을 출력한다.
db.dropDatabase() ## 현재 실행중인 데이터베이스를 삭제한다.
```

컬렉션

```s
db.createCollection("컬렉션명") ## Collection을 생성한다.
show collection ## Collection을 조회한다.
db.컬렉션명.drop() ## 해당 컬렉션의 Collection을 삭제한다.
```

데이터

document 삽입

```s
db.컬렉션명.insertOne({"key":"값", "key2":"값"})
## document 하나를 추가(여러개를 넣어도 하나만 추가)(배열의 형태로 추가하면 배열로 저장됨)

db.컬렉션명.insertMany([{"key":"값"}, {"key2":"값"}])
## document 여러개를 추가(배열로 타입이 정해져 있다.)(요소가 하나뿐이라도 가능)
```

document 갱신

```s
db.컬렉션명.updateOne({"key":"값", "key2":"값"}, {$set:{"key":"value", "key2":"value"}})
## 앞의 object는 조건, $set의 object는 바꿀 데이터들, 하나만 바꾼다고 생각한다. 아마

db.컬렉션명.updateMany({"key":"값"}, {$set:{"key":"value", "key2":"value"}})
## 조건에 맞는 모든 document를 업데이트한다고 생각한다. 아마도
```

document 삭제

```s
db.컬렉션명.deleteOne({"key":"값"})
## 한 document만 삭제시킨다. 배열로 하면 경고를 띄운다.

db.컬렉션명.deleteMany({"key":"값"})
## 여러 document를 삭제시킨다. 배열로 하면 경고를 띄운다.

## delete 명령어는 없으므로, deleteOne이나 deleteMany 중에서 사용
```

컬렉션 검색

```s
db.컬렉션명.find();
## 컬렉션에 있는 document들을 검색한다.
db.컬렉션명.findOne():
## 컬렉션에 있는 document 하나를 검색한다.

## find 명령어에는 Many가 없다. find를 써주면 될 것 같다.
```

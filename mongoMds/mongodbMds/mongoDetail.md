### 함수들의 옵션

데이터 함수들에는 옵션들이 있다. 예를 들어 deleteOne에는

```
filter
삭제 작업의 선택 기준입니다. 메서드에서와 동일한 를 사용할 수 있습니다.
collation
선택 사항입니다. 작업에 사용할 데이터 정렬을 지정합니다.
```

그러므로 만약 추가적으로 확인하려면  
https://www.mongodb.com/ko-kr/docs/manual/reference/method/db.collection.bulkWrite/#std-label-bulkwrite-write-operations-executionofoperations
해당 링크로

## 추기

몽고 DB함수들
https://velog.io/@efforthye/9
https://inpa.tistory.com/entry/MONGO-📚-몽고디비-쿼리-정리#컬렉션_조회

db.컬렉션명.insert()를 쓰면 경고가 출력된다. 되도록 밑의 함수를 이용하자.
Use insertOne, insertMany, or bulkWrite.
Use deleteOne, deleteMany, findOneAndDelete, or bulkWrite.

### bulkWrite 추가설명

```s
 db.컬렉션명.bulkWrite([{함수명:{"함수요소들":{"키":"값"}}}, {함수명:{"함수요소":{"키":"값"},"함수요소":{$Set등:{"키":"값"}}}}])
 ## 공식문서를 확인하자.
 ex:
 db.id.bulkWrite([{insertOne:{"document":{"dkja":"dklasjd"}}}, {updateOne:{"filter":{"key":"dksajd"},"update":{$Set:{"dsjal":"dsakjl"}}}}])
```

https://www.mongodb.com/ko-kr/docs/manual/reference/method/db.collection.bulkWrite/

bulkWrite에 대해 간략하게 설명하면  
db.컬렉션명.bulkWrite([함수, ...함수], {옵션})

함수는  
insertOne, insertMany, deleteOne, deleteMany, updateOne, updateMany

옵션은  
writeConcern(간단히 말하면 비동기 실행을 동기실행으로 바꾸는 옵션, 값이 순차적으로 변경될 수 있도록 해준다)  
ordered(순차적 실행을 할지 결정, 동기화는 아니고 사용자가 정한 배열의 순서대로 차례로 수행될 수 있도록 해준다(아니면 임의로 monogoDB에서 효율을 위해 순서를 바꾼다.))

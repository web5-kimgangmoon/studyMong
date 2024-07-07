몽고 DB이론(용어)
https://jiku90.tistory.com/13
https://velog.io/@ktcoder/MongoDB-용어정리
https://scorpio-mercury.tistory.com/44
https://hoing.io/archives/8381

## 구조

몽고 DB는 데이터베이스라는 컨테이너로 구성되고,  
데이터베이스 내에 콜렉션(mysql이라면 테이블)들이 존재한다.
콜렉션들은 document(mysql은 레코드)가 존재한다.
doocument는 따로 정해진 구조가 없이 각기 다른 값들로 구성되어있다.

## 실행방식

몽고 DB는 작업의 효율을 높이기 위해 데이터들을 여러개로 쪼개놓고, 한 데이터에 대해서도 여러번의 작업을 동시에 수행함으로써 속도를 높인다.

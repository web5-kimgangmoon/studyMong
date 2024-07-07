# mongoose 타입스크립트로 시작합니다.

```bash
npm i mongoose ts-node
npm i -D @types/mongoose nodemon
tsc --init
```

tsconfig.json 파일에서  
 "resolveJsonModule": true  
 을 주석해제한다.

## mongoose(firstStep)

타입스크립트 링크
https://mongoosejs.com/docs/typescript.html

## mongoDB Type(bjson type)

타입

```typescript
interface
Double
String
Object
Array
Binary data
Undefined
Object Id
Boolean
Date
Null
Regular Expression
JavaScript
symbol
JavaScript with scope
Integer
timestamp
Min key
Max key
```

https://nuggy875.tistory.com/13

## mongoose 수화(hydrate)에 대해

lean 옵션, hydrated 옵션이 존재한다.  
lean옵션(.lean())을 이용하면 virtuals/methods가 빠진 객체가 반환된다.

ps:여기서 mongoose의 virtuals는 react의 virtual dom처럼 가상으로 존재하는 값이며(아마), virtuals로 정보가 DB에 바로 저장되지 않도록 한다.

hydrated는 lean 옵션의 반대다. lean옵션으로 빠진 virtulas/methods들을 다시 채워주는 역할을 담당한다.

다만, 전송시에는 lean옵션이 적용되므로 개념만 알고 따로 신경써줄 필요는 없는듯싶다.

https://abskmj.github.io/notes/posts/topics/mongoose/mongoose-lean-hydrate/#:~:text=Hydrating%20is%20the%20opposite%20of%20the%20lean%20option.,document%20%3D%20User.hydrate%28user%29%3B%20assert%28document%20instanceof%20mongoose.Document%29%3B%20%2F%2F%20true

https://masteringjs.io/tutorials/mongoose/virtuals#:~:text=Mongoose%20virtuals%20are%20computed%20properties%20on%20Mongoose%20documents.,the%20raw%20markdown%20content%20of%20a%20blog%20post.

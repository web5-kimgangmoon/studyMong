import { Schema, model, connect } from "mongoose";
// 여기서 생성된 document는 HydratedDocument<ITest>를 반환한다.
// 하지만 굳이 타입을 명시해주지 않아도 제대로 돌아간다.

export interface ITest {
  // 객체 인터페이스
  id: string;
  testKim: string;
  testPark: string;
  testBang: string;
  giveUp?: string;
  content?: string;
}

const testSchema = new Schema<ITest>({
  // 인스턴스 객체 생성
  id: { type: String, required: true }, //String은 래퍼 객체(값을 객체로써 다루기 위해 사용), 첫글자 대문자니 주의
  testKim: { type: String, required: true },
  testPark: { type: String, required: true },
  testBang: { type: String, required: true },
  giveUp: { type: String, required: false },
  content: String,
});

const Test = model<ITest>("Test", testSchema); // Mongodb의 모델 선언

async function run() {
  // Connect to MongoDB(몽고DB에 연결)
  await connect("mongodb://127.0.0.1:27017/test");
  // mongodb의 주소는 mongodb://(설정주소):(기본설정포트)/(데이터베이스 이름)
  const test = new Test({
    id: "1",
    testKim: "kim",
    testPark: "park",
    testBang: "bang",
  }); // 확인 겸 실습을 위해 데이터를 삽입했다. 빼도 된다.
  await test.save(); // 말그대로 저장하기
  console.log("Hello World!"); // 필요없다. 그냥 실행체크용
  // mognodb에는 s가 붙은 이름으로 콜렉션이 하나 새로 생성된다.
}

(async () => {
  try {
    run();
  } catch (err) {
    console.error(err);
  }
})();
// 혹시 모르니까, async 함수를 이용했다.
// run().catch((err)=>console.error(err))만 돌려도 문제없이 작동했지만, 혹시모르니 추가했다.
export default Test;

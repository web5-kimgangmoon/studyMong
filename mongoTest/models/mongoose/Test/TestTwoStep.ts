import { Schema, model, connect, Types, mongo } from "mongoose";

export interface ITestTwoStep {
  name: string;
  email: string;
  organization: Types.ObjectId;
}
// Types.ObjectId, 간단히 말하면 겹치지 않는 랜덤값
// 4바이트 짜리 timestamp, 프로세스당 한 번씩 생성되는 임의의 5바이트값
// 임의의 값으로 초기화되는 3바이트 증분 카운터
// 자세한 내역은 https://www.mongodb.com/ko-kr/docs/manual/reference/method/ObjectId/ 여기서
// 24자 16진수값이 매개변수

// method에는 getTimeStamp(), toString(), valueOf()가 있다.

const TestTwoStepSchema = new Schema<ITestTwoStep>(
  {
    // 인스턴스 객체 생성
    name: { type: String, required: true },
    email: { type: String, required: true },
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization", // Organization을 참조하는 일종의 외래키(ObjectId)라는 의미다.
      // mysql과는 달리 Oraganization 컬렉션이 없더라도 오류를 띄우지 않았다.
    },
  },
  { timestamps: true, autoIndex: true }
);
// autoIndex, timestamps 등의 옵션이 있다.

const TestTwoStep = model<ITestTwoStep>(
  "TestTwoStep",
  TestTwoStepSchema,
  "testTwoSteps"
);
// 굳이 안해줘도 되지만, 3번째 매개변수로 string을 추가하면 임의로 이름을 변경시켜 줄 수 있다.

async function run() {
  // Connect to MongoDB(몽고DB에 연결)
  await connect("mongodb://127.0.0.1:27017/test");
  const testTwoStep = new TestTwoStep({
    name: "ㅇㅇ",
    email: "ㅎㅎ",
    organization: new mongo.ObjectId(),
    // 24자의 16진수면 되지만, mongo.ObjectId로 중복을 방지하자
  });
  await testTwoStep.save();
  console.log("Hello two step!");
}

(async () => {
  try {
    run();
  } catch (err) {
    console.error(err);
  }
})();

export default TestTwoStep;

// {
//     "postinstall":"rm ./node_modules/mongoose/index.d.ts"
// }
// 문제 발생시

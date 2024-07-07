import { Schema, model, connect, Types, mongo } from "mongoose";

// 자동 형식 유추

const schema = new Schema(
  {
    id: { type: String, required: true },
    uniqueKey: { type: Types.ObjectId, required: true },
    content: String || undefined || null,
  } && {
    test: { type: String, required: true },
  }
);
// 주의점들
// 1.OR(||)를 설정해주자, 아마도 값이 없는 경우를 상정한듯 싶다.
// 2.호출에서 스키마를 정의하자, new Schema에서 안의 객체를 적어줘야 한다.
// 설정과 관련된 객체(임시변수)를 미리 만든(선언 및 초기화) 후에 이용해서는 안된다.
// 3. 모델을 지정할 때, 콤마(,)를 이용해 여러개의 매개변수를 지정하지 말고, 위처럼 &&를 사용해야한다.
// Or은 상관없지만, And는 문제가 발생한다고 공식문서에서 설명했다.

// 주의점2
// (기본적으로 Mongoose는 원시 문서 인터페이스가 스키마와 일치하는지 확인하지 않습니다)
// 위가 공식문서의 대답이다, 그러므로 인터페이스로 Test, TestTwoStep처럼 인터페이스로
// 타입을 지정하는 경우에도 코드 작성과정에서 에러를 띄우지 않으므로 유의하자.

const TestThreeStep = model("TestThreeStep", schema, "testThreeSteps", {});

(async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/test");
    const doc = new TestThreeStep(
      {
        id: "lets'test",
        uniqueKey: new mongo.ObjectId(),
      } && { test: "test" }
    );
    await doc.save();
    console.log("Hello Three step!");
  } catch (err) {
    console.error(err);
  }
})();

export default TestThreeStep;

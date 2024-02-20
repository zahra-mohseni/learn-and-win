import { MongoClient } from "mongodb";
async function handler(req, res) {
  const data = req.body;
  if (req.method === "POST") {
    const client = await MongoClient.connect(
      "mongodb+srv://mohseniz25:PLsUGaAZOK6qkYsM@cluster0.sbiuujd.mongodb.net/quiz?retryWrites=true&w=majority"
    );
    const db = client.db();
    const collectionUser = await db
      .collection("score-list")
      .findOne({ name: data.name });
    if (collectionUser) {
      const passedTest = collectionUser.test.find(
        (item) => item === data.test[0]
      );
      if (passedTest) {
        res.status(200).json({
          message:
            "Dear user you did this test before .you can't do a test twice",
        });
      } else {
        res.status(201).json({ message: "username is available" });
      }
    } else {
      res.status(201).json({
        message: "username is available",
      });
    }
  }
  if (req.method === "PUT") {
    if (data.name.trim().length !== 0) {
      const client = await MongoClient.connect(
        "mongodb+srv://mohseniz25:PLsUGaAZOK6qkYsM@cluster0.sbiuujd.mongodb.net/quiz?retryWrites=true&w=majority"
      );
      const db = client.db();
      const collection = await db
        .collection("score-list")
        .findOne({ name: data.name });
      if (collection) {
        const passedTest = collection.test.find(
          (item) => item === data.test[0]
        );
        if (!passedTest) {
          const pastTest = collection.test;
          const totalScore = collection.score + data.score;
          console.log(pastTest);
          const updatedCollection = await db
            .collection("score-list")
            .findOneAndUpdate(
              { name: data.name },
              {
                $set: { test: [...data.test, ...pastTest], score: totalScore },
              },
              { returnNewDocument: true }
            );
        } else if (passedTest) {
          res.status(200).json({
            message:
              "Dear user you did this test before .you can't do a test twice",
          });
        }
      } else {
        const collection = await db.collection("score-list").insertOne(data);
      }
    }
  }
}
export default handler;

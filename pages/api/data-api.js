import { MongoClient } from "mongodb";
const handler = async (req, res) => {
  if (req.method === "POST") {
    let data = req.body;
    console.log(data);
    if (data.image !== "" && data.title !== "" && data.text !== "") {
      const client = await MongoClient.connect(
        "mongodb+srv://mohseniz25:PLsUGaAZOK6qkYsM@cluster0.sbiuujd.mongodb.net/quiz?retryWrites=true&w=majority"
      );
      const db = client.db();
      const collection = await db.collection("post-data").insertOne(data);
      if (collection) {
        res.status(200).json({
          message: "data saved seccessfully!",
        });
      }
      client.close();
    } else {
      res.status(201).json({ message: "please enter correct data" });
    }
  }
  if (req.method === "PUT") {
    const data = req.body;
    const quizData = data.quizArray;
    const client = await MongoClient.connect(
      "mongodb+srv://mohseniz25:PLsUGaAZOK6qkYsM@cluster0.sbiuujd.mongodb.net/test-questions?retryWrites=true&w=majority"
    );
    console.log(data);
    const db = client.db();
    const collection = await db.collection(data.title).insertOne({ quizData });
    if (collection) {
      res.status(200).json({ message: "data saved seccessfuly on server" });
    } else {
      res.status(201).json({ message: "could not save data on server" });
    }
  }
  client.close();
};
export default handler;

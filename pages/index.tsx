import Information from "@/components/information";
import Head from "next/head";
import { MongoClient } from "mongodb";
import { useState } from "react";
import Spiner from "@/components/spiner";
const HomePage = (props: {
  data: { image: string; title: string; text: string }[];
}) => {
  const dataArray = props.data;
  const [spiner, setSpiner] = useState(true);

  return (
    <>
      <Head>
        <title>HomePage</title>
        <meta name="description" content="Home page" />
      </Head>

      {dataArray.map((item) => (
        <Information itemData={item} key={item.image} />
      ))}
    </>
  );
};

export async function getStaticProps(context: any) {
  const client = await MongoClient.connect(
    "mongodb+srv://mohseniz25:PLsUGaAZOK6qkYsM@cluster0.sbiuujd.mongodb.net/quiz?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = await db.collection("post-data").find().toArray();
  return {
    props: {
      data: collection.map((item) => ({
        image: item.image,
        title: item.title,
        text: item.text,
        key: item._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;

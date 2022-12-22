import { client } from "../../../sanityclient/sanity";

const CreatePool = async (req, res) => {
  try {
    const proposalDoc = {
      //   _type: "proposeTable",
      //   _id: req.body.proposeId,
      //   ProposeTitle: req.body.proposeTitle,
      //   Proposer: req.body.proposer,
      //   ProposeId: req.body.proposeId,
      //   ProposeStatus: req.body.proposeStatus,
      //   Time: req.body.time,
    };
    console.log({ proposalDoc });
    await client.createIfNotExists(proposalDoc);
    console.log("Success !");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default CreatePool;

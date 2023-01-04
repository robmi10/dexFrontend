import { client } from "../../../sanityClient/client";

const CreatePool = async (req, res) => {
  try {
    const poollDoc = {
      _type: "poolTable",
      _id: req.body.createdBy + req.body.createdId + "poolTable",
      PoolId: parseInt(req.body.createdId),
      PoolOwner: req.body.createdBy,
      PoolAddress: req.body.createdToken,
      LpAddress: req.body.lpaddress,
    };
    console.log({ poollDoc });

    await client.createIfNotExists(poollDoc);
    console.log("Success !");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default CreatePool;

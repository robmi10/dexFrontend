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
      TokenPair: [req.body.tokenPair, req.body.ethPair],
    };
    console.log({ poollDoc });

    console.log({ TokenId: req.body.tokenId });

    await client.createIfNotExists(poollDoc);
    console.log("Success !");
    await client
      .patch(req.body.tokenId)
      .set({
        TokenStatus: 1,
      })
      .commit()
      .then((res) => {
        console.log({ "changeToken status": res });
      });
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default CreatePool;

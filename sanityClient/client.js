const sanityClient = require("@sanity/client");
export const client = sanityClient({
  projectId: "kuuv1i7h",
  dataset: "production",
  apiVersion: "v1",
  token:
    "sk4XmKqBjc16GPjwHeJoJikvtijVdJJoqDYE2K9nkz5pVETiTgpsJ6dm1PK2KqQRfxY5kDdRvo564aRSNj8SlMkRuER8rDMhQPWYI1TaoljBa2pjP16UaLbDAoJyT3e5nFG4B3NREWnN9EC02dXGg31NYiIdpprTEMjZghogHbFR8bnbfype",
  useCdn: false,
});

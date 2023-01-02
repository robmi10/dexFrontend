const sanityClient = require("@sanity/client");
export const client = sanityClient({
  projectId: "ljln7ocm",
  dataset: "production",
  apiVersion: "v1",
  token:
    "skFCJz3nPiROotPv6OVz3EOiXVeFfBDNugxnVs2L24YAtmoUCn7FmY37MGSYttJe629VWfhbar1Cr5BvxQ2fJRNYXQrFZK2t18KSS6Gj3OuYKvhEwiiO3NG13AVI6cL6XbXyrkZKF3RKMZm1MfUA5r2yYbJMYw8PEYlwa3LIT3aafHSjIWyV",
  useCdn: false,
});

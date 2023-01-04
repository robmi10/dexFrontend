const sanityClient = require("@sanity/client");
export const client = sanityClient({
  projectId: "5z0gpx6n",
  dataset: "production",
  apiVersion: "v1",
  token:
    "skpokxjDNGflUzdUHX0p1ZvwuilWGrslhESTviFgrH1zT9aJjrZYCowh6O39tkJPiZ0H72n8ncNpRTBrYWWoGvuTZbatFhTMFYiMIaSCxpJw1Q1cZcrBFpr83fStuwNbv0RfRa6TUkxVlFj0G1l3TL0zQ2Dv4x4XnQll45KjB0oD5GXS1PMR",
  useCdn: false,
});

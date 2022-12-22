const sanityClient = require("@sanity/client");
export const client = sanityClient({
  projectId: "locieskp",
  dataset: "production",
  apiVersion: "v1",
  token:
    "skgY3atsfAl0Fmeoqv46OK6lUGRD6Rjei2jQ5fVrdfX5J0LA4fmzfYrXgqCkB88LVFHeb3kVgtcQAINfwaauvSE1I4qWJOYgsBtm88HVqvijZrLL5GpG1EFsfzrSZYFOBs3hisYOqBe4rrLp5loLOEpA0tSJFugwQAijjpSS1gqahHjGZOmH",
  useCdn: false,
});

const sanityClient = require("@sanity/client");
export const client = sanityClient({
  projectId: "ji7opa5h",
  dataset: "production",
  apiVersion: "v1",
  token:
    "skseaufqog6udxxEIbWFZZgQ6r9p27HKanewceh3Qg8faHug6w82bUNsR0Of9Zuw8Qw51sB20qmX0ysAxNX6JLWWDxCZIAaNXg3uYO4CORK3vZmYCUTFkQKOWXA8cmtMVufbktu2LISlpphkzNcInyNOaxOhyFwr2Ivp5WchBdFqyDf1qxEq",
  useCdn: false,
});

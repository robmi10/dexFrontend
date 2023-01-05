const sanityClient = require("@sanity/client");
export const client = sanityClient({
  projectId: "xner6lc0",
  dataset: "production",
  apiVersion: "v1",
  token:
    "skOssTseMJu6SYaRdxXYmngMslJonmAzfMkhRuacZmeYhHou0hwTeBDhXbJbcIH6JyBVwrIGm5AjWIR8xmX4mng216pi9aJw7zgPJGWyQ3eNldTHmc2od1p8dpVJNIq37IaCchiIBDlwcrwYTWaqkkckkZjoMHzHzKfHvOLVP6IszrZq31eY",
  useCdn: false,
});

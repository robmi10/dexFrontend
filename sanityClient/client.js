const sanityClient = require("@sanity/client");
export const client = sanityClient({
  projectId: "ka1wtdys",
  dataset: "production",
  apiVersion: "v1",
  token:
    "sk54CjAA21YsSzvCNzYGFK6IHbmiUMvsaHhFuf489ENJLIdPEwrK6eiD8y5Q4BKBrdDGQ8kknTFmPqiYpLWOWpU7aD90H5oZgd9UNs247PR9CmFuKQlIUl10VA0yeAbj1k9YuAaWg05Fafj27NAexLgNojQNgfnEi44cuHgHIt3oQm3uh1v7",
  useCdn: false,
});

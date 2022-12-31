const sanityClient = require("@sanity/client");
export const client = sanityClient({
  projectId: "locieskp",
  dataset: "production",
  apiVersion: "v1",
  token:
    "sk35wXtkLzlnAHTi8CzjEJ5CnHVbKDBut3LfLCaxCF4YDBiuSrB7BlTn5iL7I8DxzKVuBXXBsdfq1daBiiITOMEnG9Qjk7FK6VhICoh48kV0OWhA1KQ3R8KDnBKx0Q8Et6yPZKJZZc5tsDzPBcbRGQZDW5GGDYqcrzW479FQ6oLCYNBh1pNN",
  useCdn: false,
});

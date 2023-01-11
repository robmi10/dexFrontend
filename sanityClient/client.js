const sanityClient = require("@sanity/client");
export const client = sanityClient({
  projectId: "tdzaujc5",
  dataset: "production",
  apiVersion: "v1",
  token:
    "skUBkfMipJlRiYj32GDvNzvre0a8vISkYNlq5UXxOoOVEz7ik1eyVHNhhYGPS4wiiulNasqaFaRxQWKmpIVs6hOoGqbzSgtXonzFEPr17633gGkrahOXvdXaJtWLh1UiWD1AVbspRd7Go7C5Uv9sSVF0Id453OGc2ivLsBJonBiYCFhcJI5w",
  useCdn: false,
});

const sanityClient = require("@sanity/client");
export const client = sanityClient({
  projectId: "p9xfk6k4",
  dataset: "production",
  apiVersion: "v1",
  token:
    "skiWRUHrFQtfk8GZEdu5XOTzu0lMasIdK8lOLm338C8V97wN4lAEJOLTO70SaiXrR6TYhkHRCBtKoLWrSv14JmNGtqbrnDfejpxR0qDS9PNU3RUaZx0qLDnRW6JVwPnwG1mSBxAjYMMWJ3jIkrOH3SxPZc38e2U7qAU6rEApH97zIQrCa6kf",
  useCdn: false,
});

import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Create the Sanity client instance
const client = sanityClient({
  projectId: "toiy8lva", 
  dataset: "production", 
  useCdn: false, // must be false for write access
  apiVersion: "2023-01-01",
  token: process.env.SANITY_API_TOKEN, // secure it via .env
});

const builder = imageUrlBuilder(client); // ✅ You forgot this line!

export default client;

export const urlFor = (source) => {
  return builder.image(source);
};

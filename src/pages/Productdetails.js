import { useEffect, useState } from "react";
import { Box, Typography, Grid, Button, Divider } from "@mui/material";
import sanityClient from "../sanity/client";
import { useParams } from "react-router-dom";

const product = {
  id: "1504160",
  title: "Pair of Stools Attributed to Georges Jacob - Louis XVI Era",
  price: "3,500 € (3,335 CHF)",
  artist: "Attributed to Georges Jacob",
  era: "18th century",
  style: "Louis XVI - Directoire",
  condition: "Very good condition",
  material: "Solid wood",
  dimensions: {
    width: "32.5 cm",
    height: "47.5 cm",
    depth: "32.5 cm",
  },
  dealer: {
    name: "Galerie Vega",
    address: "220 avenue de Versailles, Paris 75016, France",
    phone1: "01 40 50 36 10",
    phone2: "06 11 47 66 37",
  },
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGYcbUUDB_ifYtx8pjjWZ2_-oIaTsIko4BcA&s",
    "https://www.bigfurniturewarehouse.com/images/galena-pair-bar-stools-grey-p4828-23480_thumb.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGYcbUUDB_ifYtx8pjjWZ2_-oIaTsIko4BcA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGYcbUUDB_ifYtx8pjjWZ2_-oIaTsIko4BcA&s"
  ],
};

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [products, setProducts] = useState([]);
  const {id}=useParams()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await sanityClient.fetch(`
          *[_type == "objet" && _id == "${id}"][0]{
            _id,
            nom,
            prix,
            description,
            dbId,
            images[]->{
              _id,
              title,
              url
            }
          }
        `);
        setProducts(data);
        console.log("Fetched products:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <Box sx={{ px: { xs: 8, md: 35 }, py: 6, bgcolor: "#f9f9f9" }}>
      {/* Title with underline */}
      <Typography variant="h4" sx={{ fontFamily: "Playfair Display", mb: 1 }}>
        {products.nom}
      </Typography>
      <Divider sx={{ width: "90%", height: "3px", bgcolor: "#000", mb: 3 }} />

      <Grid container spacing={4}>
        {/* Product Image & Gallery */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              height: 400, // Fixed height to prevent shifting
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ddd",
              p: 1,
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <img src={mainImage} alt={product.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "center" }}>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                width="80px"
                height="80px"
                style={{
                  cursor: "pointer",
                  border: mainImage === img ? "2px solid #000" : "2px solid transparent",
                  borderRadius: "5px",
                  objectFit: "cover",
                }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </Box>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Price: {products.prix}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <strong>Artist:</strong> {product.artist}
          </Typography>
          <Typography>
            <strong>Era:</strong> {product.era}
          </Typography>
          <Typography>
            <strong>Style:</strong> {product.style}
          </Typography>
          <Typography>
            <strong>Condition:</strong> {product.condition}
          </Typography>
          <Typography>
            <strong>Material:</strong> {product.material}
          </Typography>
          <Typography>
            <strong>Dimensions:</strong> {`${product.dimensions.width} W × ${product.dimensions.height} H × ${product.dimensions.depth} D`}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <strong>Reference (ID):</strong> {products._id}
          </Typography>

          {/* Dealer Info */}
          <Box sx={{ mt: 3, p: 2, border: "1px solid #ddd", borderRadius: "5px" }}>
            <Typography variant="h6">{product.dealer.name}</Typography>
            <Typography>{product.dealer.address}</Typography>
            <Typography>📞 {product.dealer.phone1}</Typography>
            <Typography>📞 {product.dealer.phone2}</Typography>
          </Box>

          {/* Buttons */}
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary">
              Contact Dealer
            </Button>
            <Button variant="outlined">Add to Selection</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;

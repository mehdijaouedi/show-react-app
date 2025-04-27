import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";
import sanityClient from "../sanity/client";
import { useEffect, useState } from "react";
import rodolpheCategories from "./dummyData";

const CategorySection = () => {
  const categories = rodolpheCategories
  const formatTitle = (title) => {
    const maxLength = 25;
    const words = title.split(" ");
    const lines = [];
    let currentLine = "";

    for (let word of words) {
      if ((currentLine + word).length <= maxLength) {
        currentLine += (currentLine ? " " : "") + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine) lines.push(currentLine);

    return lines.map((line, index) => (
      <span key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </span>
    ));
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await sanityClient.fetch(`
          *[_type == "objet"]{
            _id,
            nom,
            prix,
            description,
            dbId,
            images[]->{
              _id,
              alt,
              file{
                asset->{
                  url
                }
              }
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
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 3, md: 5 }, mt: 15 }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={{ xs: 4, md: 6 }}
      >
        {/* Left: Description Section */}
        <Box
          sx={{
            flex: 1,
            maxWidth: { xs: "100%", md: 450 },
            px: { xs: 1, md: 3 },
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            M. Rodolphe Meyer – La Passion de l'Art
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            M. Rodolphe Meyer est le contact principal en Europe pour l'achat
            direct d'œuvres d'art et de collections. Il offre son expertise aux
            particuliers ainsi qu'aux professionnels de l'art, garantissant des
            paiements sans commission, un service de qualité et une
            confidentialité totale.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            Estimation des Prix du Marché
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Un service d'évaluation gratuit est disponible, garantissant des
            prix équitables en fonction des tendances actuelles du marché. Si un
            objet est très recherché, le prix d'achat peut dépasser la valeur du
            marché.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            Offres Claires et Transparentes
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Toutes les évaluations sont réalisées personnellement par M. Meyer,
            en se basant sur des critères précis et détaillés, fournissant une
            offre de prix ferme et transparente.
          </Typography>
        </Box>

        {/* Right: Cards Grid */}
        <Grid container spacing={4} justifyContent="center" alignItems="flex-start" sx={{ mt: 4 }}>
          {products?.slice(2, 4).map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={product._id || index} sx={{ display: "flex", justifyContent: "center" }}>
              <Card
                sx={{
                  width: 300,
                  height: 300,
                  borderRadius: 3,
                  boxShadow: 4,
                  bgcolor: "transparent",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  overflow: "hidden"
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={
                    product.images?.[0]?.file?.asset?.url || "/logo.jpeg"
                  }
                  alt={product.images?.[0]?.alt || product.nom}
                  sx={{
                    borderRadius: "12px 12px 0 0",
                    objectFit: "contain",
                    height: 210,
                    width: "100%",
                    bgcolor: "transparent",
                    transform: "scale(0.95)",
                    transformOrigin: "center",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1)"
                    }
                  }}
                />
                <CardContent 
                  sx={{ 
                    textAlign: "left", 
                    bgcolor: "rgba(250, 233, 207, 0.7)",
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "left",
                    justifyContent: "left",
                    padding: "15px 25px",
                    backdropFilter: "blur(5px)",
                    height: 190
                  }}
                >
                  <Typography 
                    fontWeight="bold" 
                    sx={{
                      fontSize: "1.1rem",
                      lineHeight: 1.3,
                      color: "rgba(0, 0, 0, 0.8)",
                      transform: "scale(0.85)",
                      transformOrigin: "center",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1)"
                      },
                      whiteSpace: "normal",
                      wordBreak: "break-word"
                    }}
                  >
                    {product.nom}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CategorySection;

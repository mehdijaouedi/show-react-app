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
const HowToSellContent = () => {
    const categories = rodolpheCategories;
  
  const [products, setProducts] = useState([]);
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
            GUIDE DE LA VENTE D'ŒUVRES D'ART
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            La vente d'œuvres d'art n'est pas toujours évidente, en ce qu'elle
            peut se faire par différents canaux et est soumise à diverses
            réglementations. Dans une démarche visant à rendre plus transparent
            tout ce qui attrait à la vente d'objets d'art, Mr Rodolphe Meyer met
            à votre disposition ce guide de la vente en deux étapes.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            EXPERTISER UNE ŒUVRE
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Beaucoup de critères, comme la taille, l'état ou encore la date de
            création peuvent influencer le prix de vente d'une œuvre d'art. Il
            est ainsi important, avant de proposer son œuvre d'art à la vente,
            de la faire expertiser et ainsi obtenir une estimation fiable.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            VENDRE UNE ŒUVRE
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            La vente d'une œuvre d'art peut être publique ou privée. Chaque
            façon de vendre une œuvre à des avantages et inconvénient qu'il est
            nécessaire de prendre en compte afin de choisir le canal de vente
            qui répond le mieux à la situation.
          </Typography>
        </Box>

        {/* Right: Cards Grid */}
        <Grid container spacing={4} justifyContent="center" alignItems="flex-start" sx={{ mt: 4 }}>
          {products?.slice(4, 6).map((product, index) => (
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
                    {formatTitle(product.nom)}
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

export default HowToSellContent;

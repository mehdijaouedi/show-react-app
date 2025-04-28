import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import sanityClient from "../sanity/client";
import rodolpheCategories from "../components/dummyData";

const RodolpheData = () => {
  const categories = rodolpheCategories;

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
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 }, mt: 15 }}>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={{ xs: 4, md: 6 }}>
        {/* Left: Description Section */}
        <Box
          sx={{
            flex: 1,
            maxWidth: { xs: "100%", md: 450 },
            px: { xs: 1, md: 3 },
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            M. Rodolphe Meyer – LE GOÛT DE L’ART
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            La vocation première de Mr Rodolphe Meyer est l’achat comptant
            d’œuvres d’art. Ce modèle a été construit dans le but de proposer
            une alternative aux ventes aux enchères, évitant ainsi les
            commissions, délais de ventes, de paiements et risques d’invendus.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            NOS ENGAGEMENTS
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            * Déplacement gratuit dans toute l’Europe voire le monde entier selon les objets d’art proposés.
            <br />
            * Expertise gratuite et achat au prix du marché (étude basée sur des œuvres comparables vendues dernièrement et offre de prix claire et cohérente sur cette base)
            <br />
            * Un paiement comptant.
            <br />
            * 0 % de commission 
            <br />
            * Réactivité
            <br />
            * Confidentialité
            <br />
            Notre entreprise experte en œuvres d’art estime toutes œuvres d’art, antiquités et objets anciens de tous artistes et origines. Il vous suffit de nous contacter par téléphone.
          </Typography>
        </Box>

        {/* Right: Cards Grid */}
        <Grid container spacing={4} justifyContent="center" alignItems="flex-start" sx={{ mt: 4 }}>
          {products?.slice(0, 2).map((product, index) => (
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

export default RodolpheData;

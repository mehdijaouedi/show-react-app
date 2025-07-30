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
          *[_type == "presentation"]{
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
            Mr Rodolphe Meyer – La Passion de l'Art
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Mr Rodolphe Meyer est le premier interlocuteur en Europe pour l'achat comptant d'œuvres d'art et de pièces de collection. Mr Rodolphe Meyer met son expertise au service des particuliers et professionnels du monde de l'art et s'engage sur le paiement sans commission, avec l'assurance d'une prestation haut de gamme et en toute confidentialité.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            ESTIMATION AU PRIX DU MARCHÉ
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Mr Rodolphe Meyer vous propose un service d'estimation gratuit de vos oeuvres d'art à un prix cohérent, fixé en fonction des cours du marché actuel. Vous avez l'assurance d'un prix adapté et justifié, pour une vente qui vous donnera pleinement satisfaction. En outre, lorsqu'il s'agit de pièces spécifiquement recherchées, le montant du rachat peut dépasser le prix du marché.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            UNE OFFRE FERME ET CLAIRE
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Mr Rodolphe Meyer applique une politique commerciale rigoureuse et encadrée. L'estimation de votre bien est effectuée par ses propres soins, sur la base de critères précis et circonstanciés dont la liste vous est détaillée de façon exhaustive. Ainsi, nous sommes en mesure de vous faire parvenir une offre de prix ferme et transparent pour vous garantir une transaction réalisée dans des conditions optimales.
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            ACHAT IMMÉDIAT SANS COMMISSION
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Mr Rodolphe Meyer s'engage sur le principe du rachat d'oeuvre d'art immédiat sans commission. En effet, étant détenue par une structure financière indépendante notre visibilité en termes de capitaux est étendue, ce qui nous permet des transactions saines et mesurées.
          </Typography>
        </Box>

        {/* Right: Cards Grid */}
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="flex-start"
          sx={{ mt: 4, maxWidth: 650, mx: "auto" }}
        >
          {products?.slice(0, 4).map((product, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              key={product._id || index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
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
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={product.images?.[0]?.file?.asset?.url || "/logo.jpeg"}
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
                      transform: "scale(1)",
                    },
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
                    height: 190,
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
                        transform: "scale(1)",
                      },
                      whiteSpace: "normal",
                      wordBreak: "break-word",
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

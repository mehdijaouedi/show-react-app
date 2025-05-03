import React, { useEffect, useState } from "react";
import sanityClient from "../sanity/client";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Grid,
} from "@mui/material";

function ProductsList() {
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
          [
            ...*[_type == "objet"]{
              _type,
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
          ]
        `);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
       
    };

    fetchProducts();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 }, mt: 15 }}>
      <Grid container spacing={3} justifyContent="center">
        {products?.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={product._id || index}>
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
    </Container>
  );
}

export default ProductsList;

import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 250, boxShadow: 2 }}>
      <CardMedia component="img" height="140" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.price} DT
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

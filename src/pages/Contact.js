import React from 'react';
import {
  Box,
  Container,
  Typography,
  Divider,
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

const ContactPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 20, mb: 12 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: '#a68e5d' }}
      >
        Contactez-nous
      </Typography>

      <Typography variant="body1" sx={{ color: 'black', mb: 3 }}>
        Nous sommes là pour répondre à vos questions concernant les œuvres d'art, les expertises et les collaborations.
      </Typography>

      <Divider sx={{ my: 4, borderColor: '#444' }} />

      <Box display="flex" flexDirection="column" gap={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <Email sx={{ color: '#a68e5d', fontSize: 30 }} />
          <Typography
            component="a"
            href="mailto:contact@rodolphemeyer-expert.com"
            sx={{
              color: 'black',
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            contact@rodolphemeyer-expert.com
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Phone sx={{ color: '#a68e5d', fontSize: 30 }} />
          <Typography
            component="a"
            href="tel:+41319001940"
            sx={{
              color: 'black',
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            +41 31 900 19 40
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <LocationOn sx={{ color: '#a68e5d', fontSize: 30 }} />
          <Typography
            component="a"
            href="https://www.google.com/maps/place/Schanzenstrasse+4,+3008+Bern,+Switzerland"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'black',
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Schanzenstrasse 4 ,
            3008 Berne ,
            Switzerland 
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactPage;






//const [formData, setFormData] = useState({
  //   fullName: '',
  //   email: '',
  //   message: '',
  // });

  // const [feedbackMessage, setFeedbackMessage] = useState('');
  // const [feedbackColor, setFeedbackColor] = useState('');

  // const handleChange = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const templateParams = {
  //     from_name: formData.fullName,
  //     from_email: formData.email,
  //     message: formData.message,
  //   };

  //   emailjs
  //     .send(
  //       'service_olqjibo',
  //       'template_pkyn6vv',
  //       templateParams,
  //       'TgKsjGaewJgSiiviD'
  //     )
  //     .then(() => {
  //       setFeedbackMessage('Message envoyé avec succès !');
  //       setFeedbackColor('green');
  //       setFormData({ fullName: '', email: '', message: '' });
  //     })
  //     .catch((error) => {
  //       console.error('Erreur lors de l'envoi de l'email:', error);
  //       setFeedbackMessage('Échec de l'envoi du message. Veuillez réessayer.');
  //       setFeedbackColor('red');
  //     });
  // };








    {/* <form onSubmit={handleSubmit}>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              label="Nom complet"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{
                style: {
                  backgroundColor: '#f0d9b0',
                  color: '#fff',
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              label="Adresse e-mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{
                style: {
                  backgroundColor: '#f0d9b0',
                  color: '#fff',
                },
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Votre message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            variant="outlined"
            multiline
            minRows={1}
            maxRows={4}
            InputLabelProps={{ style: { color: 'black' } }}
            InputProps={{
              style: {
                backgroundColor: '#f0d9b0',
                color: '#fff',
              },
            }}
          />
        </Grid>

        <Grid item xs={12} mt={4}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              bgcolor: '#a68e5d',
              color: '#232323',
              fontWeight: 'bold',
              borderRadius: '12px',
              '&:hover': {
                bgcolor: '#8c7747',
              },
            }}
          >
            Envoyer le message
          </Button>
        </Grid>

        {feedbackMessage && (
          <Typography mt={2} color={feedbackColor}>
            {feedbackMessage}
          </Typography>
        )}
      </form> */}

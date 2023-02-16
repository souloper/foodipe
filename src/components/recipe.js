import React from 'react'
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";


export default function recipe(props) {
  console.log(props.recipe)
    const { recipeObj } = props;
  return (
    // <Grid item key={recipeObj} xs={12} sm={4} md={3}>
    <Grid item xs={12} sm={4} md={3}>
      <Card
        sx={{
          // height: "90%",
          width: "100%",
          display: "block",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: "30%",
            background: "cover",
          }}
          image="https://picsum.photos/200"
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            Heading
          </Typography>
          <Typography>
            This is a media card. You can use this section to describe the
            content.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View</Button>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

// export default recipe
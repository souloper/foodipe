import React, { useState } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Link,
  Button,
  InputBase,
  CssBaseline,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Stack,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Adb as AdbIcon,
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  InfoRounded as InfoRoundedIcon,
  InsertLinkRounded as InsertLinkRoundedIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";


import { img1, img2 } from "./assets";

// import recipe from "./components/recipe";
import "./App.css";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "22ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const RecipeComp = (props) => {
  
  // console.log(props)
  const [open, setOpen] = useState(false);
  const [opn, setOpn] = useState(false);

  const { recipeObj } = props;
  
  const handleClickOpen = () => {
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const hCOpn = () => {
    setOpn(true);
  };

  const hC = () => {
    setOpn(false);
  };

  return (
    <>
      {/* Start of Dialog Box for each dish cards */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        // scroll={scroll}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {recipeObj.recipe.label}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Ingredient</TableCell>
                    <TableCell align="right">Weight</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipeObj.recipe.ingredients.map((ingredient, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {ingredient.text}
                      </TableCell>
                      <TableCell align="right">{ingredient.weight}</TableCell>
                      <TableCell align="right">{ingredient.quantity}</TableCell>
                      {/* <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography>
              <Stack
                direction="row"
                spacing={1}
                rowGap={1}
                sx={{ py: 1 }}
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {recipeObj.recipe.healthLabels.map((index) => (
                  <Chip
                    key={index}
                    label={index}
                    size="small"
                    style={{
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                  />
                ))}
              </Stack>
            </Typography>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Link href={recipeObj.recipe.url}>
            <Button autoFocus variant="contained" color="warning">
              More Info
            </Button>
          </Link>
        </DialogActions>
      </BootstrapDialog>
      {/* End of Dialog Box for each dish cards */}

      {/* Start of Share Dialog Box */}

      <Dialog
        open={opn}
        onClose={hC}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Share"}</DialogTitle>
        <DialogContent>
          <FacebookShareButton
            url={recipeObj.recipe.shareAs}
            quote={"Dummy text!"}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          {"  "}
          <WhatsappShareButton
            url={recipeObj.recipe.shareAs}
            quote={"Dummy text!"}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          {"  "}
          <TwitterShareButton
            url={recipeObj.recipe.shareAs}
            quote={"Dummy text!"}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </DialogContent>
        <DialogActions>
          <Button onClick={hC} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* End of Share Dialog Box */}

      <Grid item xs={12} sm={6} md={4} lg={3} alignItems="center">
        <Card
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: "25px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
          // style={{
          //   background: "rgba(255, 255, 255, 0.3)",
          //   borderRadius: "16px",
          //   boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          //   backdropFilter: "blur(8.6px)",
          //   border: "1px solid rgba(255, 255, 255, 0.2)",
          // }}
          // style={{alignItems: "center"}}
          // onClick={handleClickOpen}
          elevation={3}
        >
          <CardMedia
            component="img"
            sx={{
              height: "100%",
              background: "cover",
              borderRadius: "25px",
            }}
            image={recipeObj.recipe.image}
            alt="random"
          />
          <CardContent
            sx={{ flexGrow: 1 }}
            style={{
              /* From https://css.glass */
              background: "rgba(255, 255, 255, 0.3)",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(8.6px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Typography gutterBottom variant="h5" component="h2">
              {recipeObj.recipe.label}
            </Typography>
            <Typography>
              <Stack
                direction="row"
                spacing={1}
                rowGap={1}
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {recipeObj.recipe.mealType.map((index) => (
                  <Chip
                    key={index}
                    label={index}
                    size="small"
                    color="warning"
                    variant="outlined"
                    style={{
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                  />
                ))}
                {recipeObj.recipe.cuisineType.map((index) => (
                  <Chip
                    key={index}
                    label={index}
                    size="small"
                    color="info"
                    variant="outlined"
                    style={{
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                  />
                ))}
                {recipeObj.recipe.dishType.map((index) => (
                  <Chip
                    key={index}
                    label={index}
                    size="small"
                    color="success"
                    variant="outlined"
                    style={{
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                  />
                ))}
              </Stack>
            </Typography>
          </CardContent>
          <CardActions
            disableSpacing
            style={{
              /* From https://css.glass */
              background: "rgba(255, 255, 255, 0.3)",
              borderRadius: "0 0 20px 20px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(8.6px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <IconButton aria-label="more info" onClick={handleClickOpen}>
              <InfoRoundedIcon />
            </IconButton>
            <IconButton aria-label="share" onClick={hCOpn}>
              <ShareIcon />
            </IconButton>
            <IconButton align="right">
              <InsertLinkRoundedIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

function App() {
  const pages = ["Products", "Pricing", "Blog"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [timeoutId, updateTimeoutId] = useState();
  const [recipeList, updateRecipeList] = useState([]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = createTheme();
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const APP_ID = "307e80ff";
  const APP_KEY = "f7b99e447fa8066af4fd98ff2abaa180";
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    console.log(response)
    updateRecipeList(response.data.hits);
  };  

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    // updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar
        position="static"
        style={{
          backgroundImage: `linear-gradient(to right, #3284ee, #0b4492)`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <img src={img1} height={100} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              FoodiPe
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              FoodiPe
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={onTextChange}
              />
            </Search>
          </Toolbar>
        </Container>
      </AppBar>

      <Container sx={{ py: 6 }} maxWidth="lg" style={{backgroundColor: "#dbe0e5",
backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 28' width='56' height='28'%3E%3Cpath fill='%23929dac' fill-opacity='0.39' d='M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-5.6 0-10.65 2.3-14.28 6h-2.7c4.04-4.89 10.15-8 16.98-8zm-39.03 8h-2.69C10.65 24.3 5.6 22 0 22v-2c6.83 0 12.94 3.11 16.97 8zm15.01-.4a28.09 28.09 0 0 1 2.8-3.86 8 8 0 0 0-13.55 0c1.03 1.2 1.97 2.5 2.79 3.86a4 4 0 0 1 7.96 0zm14.29-11.86c1.3-.48 2.63-.87 4-1.15a25.99 25.99 0 0 0-44.55 0c1.38.28 2.72.67 4.01 1.15a21.98 21.98 0 0 1 36.54 0zm-5.43 2.71c1.13-.72 2.3-1.37 3.54-1.93a19.98 19.98 0 0 0-32.76 0c1.23.56 2.41 1.2 3.54 1.93a15.98 15.98 0 0 1 25.68 0zm-4.67 3.78c.94-.95 1.96-1.83 3.03-2.63a13.98 13.98 0 0 0-22.4 0c1.07.8 2.09 1.68 3.03 2.63a9.99 9.99 0 0 1 16.34 0z'%3E%3C/path%3E%3C/svg%3E")`,}}>
        <Grid container spacing={5}>
          {recipeList.length &&
            recipeList.map((recipeObj) => <RecipeComp recipeObj={recipeObj} />)}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;

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

  const { recipeObj } = props;
  
  const handleClickOpen = () => {
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);
  };
  const visit = () => {

  }

  return (
    <>
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

      <Grid item xs={12} sm={6} md={4} lg={3} alignItems="center">
        <Card
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          // style={{alignItems: "center"}}
          onClick={handleClickOpen}
        >
          <CardMedia
            component="img"
            sx={{
              height: "30%",
              background: "cover",
            }}
            image={recipeObj.recipe.image}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
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
          <CardActions disableSpacing>
            <IconButton aria-label="more info" onClick={handleClickOpen}>
              <InfoRoundedIcon />
            </IconButton>
            <IconButton aria-label="share">
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
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

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
              LOGO
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
              LOGO
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

      <Container sx={{ py: 6 }} maxWidth="lg">
        <Grid container spacing={5}>
          {recipeList.length &&
            recipeList.map((recipeObj) => <RecipeComp recipeObj={recipeObj} />)}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;

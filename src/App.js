import React from "react";
import { Typography, Grid } from "@material-ui/core";
import OverviewContainer from "./components/OverviewContainer/OverviewContainer";
import {
  StylesProvider,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import ChartContainer from "./components/ChartContainer/ChartContainer";
import ListContainer from "./components/ListContainer/ListContainer";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: { margin: "2em" },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h4"
              style={{ flexGrow: 1, textAlign: "center" }}
            >
              <i class="fas fa-virus"></i> COVID-19 TRACKER
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container>
          <Grid item xs={12} md={9}>
            <OverviewContainer />
            <ChartContainer />
          </Grid>
          <Grid item xs={12} md={3}>
            <ListContainer />
          </Grid>
        </Grid>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;

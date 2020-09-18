import React from "react";
import { Typography, Grid } from "@material-ui/core";
import OverviewContainer from "./components/OverviewContainer/OverviewContainer";
import { StylesProvider } from "@material-ui/core/styles";

function App() {
  return (
    <StylesProvider injectFirst>
      <Typography variant="h2" align="center">
        Covid-19 Tracker
      </Typography>
      <Grid container>
        <Grid item xs={12} md={9}>
          <OverviewContainer />
        </Grid>
        <Grid item xs={12} md={3}>
          Right
        </Grid>
      </Grid>
    </StylesProvider>
  );
}

export default App;

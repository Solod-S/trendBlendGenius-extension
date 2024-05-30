import React, { useEffect, useState } from "react";
import Chart from "../comp/Chart";
import Deposits from "../comp/Deposits";
import LastArticles from "../comp/LastArticles";
import { Grid, Paper } from "@mui/material";
import { getArticles } from "../../../utils/shared";
import getConfig from "../../../utils/config";

export const Main: React.FC<{}> = ({}) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchArticles = async (page: number, perPage: number) => {
      const config = await getConfig();
      if (!config) return;
      const user = config["tbg-user-data"];
      const token = config["tbg-access-token"];

      console.log(`user`, user);
      console.log(`token`, token);
      const newArticles = await getArticles(user.id, page, perPage, token);

      if (newArticles?.length <= 0) return;

      setArticles(newArticles);
    };

    fetchArticles(1, 10);
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <LastArticles articles={articles} />
          </Paper>
        </Grid>
      </Grid>
      {/* <Copyright sx={{ pt: 4 }} /> */}
    </>
  );
};

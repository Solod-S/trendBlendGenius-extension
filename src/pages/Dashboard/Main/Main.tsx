// Остальной код остается без изменений

import React, { useEffect, useState } from "react";
import Chart from "../comp/Chart";
import ArticlesOverview from "../comp/ArticlesOverview";
import LastArticles from "../comp/LastArticles";
import { Grid, Paper } from "@mui/material";
import {
  getArticles,
  getArticlesChart,
  getArticlesOverview,
} from "../../../utils/shared";
import getConfig from "../../../utils/config";

export const Main: React.FC<{}> = ({}) => {
  const [articles, setArticles] = useState([]);
  const [articlesChart, setArticlesChart] = useState([]);
  const [articlesOverview, setArticlesOverview] = useState({
    totalArticlesCount: 0,
    monthlyArticlesCount: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async (page: number, perPage: number) => {
      const config = await getConfig();
      if (!config) return;
      const user = config["tbg-user-data"];
      const token = config["tbg-access-token"];

      console.log(`user`, user);
      console.log(`token`, token);
      const newArticles = await getArticles(user.id, page, perPage, token);
      const newArticlesChart = await getArticlesChart(user.id, token);
      const newArticlesOverview = await getArticlesOverview(user.id, token);
      if (newArticles?.length > 0) setArticles(newArticles);
      if (newArticlesChart?.length > 0) setArticlesChart(newArticlesChart);
      if (newArticlesOverview) setArticlesOverview(newArticlesOverview);
    };

    fetchDashboardData(1, 10);
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
            <Chart articlesChart={articlesChart} />
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
            <ArticlesOverview articlesOverview={articlesOverview} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <LastArticles articles={articles} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

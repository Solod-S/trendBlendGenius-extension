import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

interface TitleProps {
  children?: React.ReactNode;
}

function Title(props: TitleProps) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

interface ArticleOverview {
  totalArticlesCount: number;
  monthlyArticlesCount: number;
}

interface ArticlesOverviewProps {
  articlesOverview: ArticleOverview;
}

export default function ArticlesOverview({
  articlesOverview,
}: ArticlesOverviewProps) {
  const [currentMonth, setCurrentMonth] = React.useState("");

  React.useEffect(() => {
    const month = new Date().toLocaleString("en-US", { month: "long" });
    setCurrentMonth(month);
  }, []);

  return (
    <React.Fragment>
      <Title>All Articles</Title>
      <Box display="flex" flexDirection="column" alignItems="center" p={2}>
        <Typography component="p" variant="h4" gutterBottom>
          {articlesOverview.totalArticlesCount} articles
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ flex: 1, textAlign: "center" }}
          mb={2}
        >
          <span style={{ color: "deepskyblue" }}>
            +{articlesOverview.monthlyArticlesCount}
          </span>{" "}
          by {currentMonth}
        </Typography>
        <Divider sx={{ width: "100%", mb: 2 }} />
        <Link color="primary" href="#" onClick={preventDefault}>
          Show all
        </Link>
      </Box>
    </React.Fragment>
  );
}

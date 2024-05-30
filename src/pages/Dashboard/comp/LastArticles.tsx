import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Typography from "@mui/material/Typography";

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

interface Article {
  id: string;
  publishedAt: string;
  title: string;
  url: string;
  description: string;
}

interface LastArticlesProps {
  articles: Article[];
}

export default function LastArticles({ articles }: LastArticlesProps) {
  return (
    <React.Fragment>
      <Title>Last articles</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Source</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.length > 0 &&
            articles.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  {new Date(row.publishedAt).toLocaleString()}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.url}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more articles
      </Link> */}
    </React.Fragment>
  );
}

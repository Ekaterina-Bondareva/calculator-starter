import { Typography, Container, Stack } from "@mui/material";
import Calculator from "../components/Calculator";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Stack>
        <Typography variant="h2" gutterBottom sx={{ marginBottom: "30px" }}>
          The Amazing Calculator
        </Typography>
        <Calculator />
      </Stack>
    </Container>
  );
}


import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Box,
  Paper,
  TextField,
  FormControl,
  NativeSelect,
  Button,
  Divider,
  Typography,
  InputBaseComponentProps,
} from "@mui/material";
import { OutlinedInput } from "@mui/material";
import axios from "axios";
import { Operation } from "../utils/calculate";

import { useState, useRef, useEffect } from "react";

const Calculator = () => {
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const firstRef = useRef<InputBaseComponentProps>(null);
  const secondRef = useRef<InputBaseComponentProps>(null);
  const welcomeMessage = "Calculator is ready!";

  const Operations = {
    [Operation.Add]: "+",
    [Operation.Subtract]: "-",
    [Operation.Multiply]: "*",
    [Operation.Divide]: "/"
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setOperation(e.target.value);
  };

  useEffect(() => {
    setResult(welcomeMessage);
  }, []);

  const handleCalculate = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let firstRefCurrentValue = "";
    let secondRefCurrentValue = "";
    if (firstRef.current) {
      firstRefCurrentValue = firstRef.current.value;
    }
    if (secondRef.current) {
      secondRefCurrentValue = secondRef.current.value;
    }
    const query = {
      operation: operation,
      first: firstRefCurrentValue,
      second: secondRefCurrentValue,
    };

    axios
      .get(`/api/calculate/${query.operation}/${query.first}/${query.second}`)
      .then((res) => {
        setResult(res.data.result);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setOperation("");
    setResult(welcomeMessage);
    if (firstRef.current) {
      firstRef.current.value = null;
    }
    if (secondRef.current) {
      secondRef.current.value = null;
    }
  };

  return (
    <form id="calculator-form" onSubmit={handleCalculate}>
      <Grid2 container spacing={1}>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField
              id="first"
              label="First Number"
              variant="outlined"
              inputRef={firstRef}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl fullWidth>
            <NativeSelect
              input={<OutlinedInput />}
              defaultValue={""}
              inputProps={{
                name: "operation",
                id: "operation",
              }}
              onChange={handleChange}
              value={operation}
            >
              <option value="">Op</option>
              {
                Object.keys(Operations).map((key : Operation) => 
                  <option key={key}
                    value= {key}
                  >{Operations[key]}</option>
                )
              } 
            </NativeSelect>
          </FormControl>
        </Grid2>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField
              id="second"
              label="Second Number"
              variant="outlined"
              inputRef={secondRef}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={10}>
          <FormControl fullWidth>
            <Button variant="contained" type="submit">
              Calculate
            </Button>
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl fullWidth>
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <Divider />
        </Grid2>
        <Grid2 xs={12}>
          <Box>
            <Paper>
              <Typography align="center" variant="h3" gutterBottom>
                {result}
              </Typography>
            </Paper>
          </Box>
        </Grid2>
      </Grid2>
    </form>
  );
};
export default Calculator;





























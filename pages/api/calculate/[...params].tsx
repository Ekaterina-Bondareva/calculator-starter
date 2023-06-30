import { NextApiResponse, NextApiRequest } from 'next'
import { add, subtract, multiply, divide } from "../../../utils/calculate";

interface Params {
  operation: string;
  first: number;
  second: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      throw new Error(
        `Unsupported method ${req.method}. Only GET method is supported`
      );
    }

    const params = extractParams(req.query.params);
    let result: number;
    switch (params.operation) {
      case "add":
        result = add(params.first, params.second);
        break;
      case "subtract":
        result = subtract(params.first, params.second);
        break;
      case "multiply":
        result = multiply(params.first, params.second);
        break;
      case "divide":
        result = divide(params.first, params.second);
        break;
      default:
        throw new Error(`Unsupported operation ${params.operation}`);
    }
    res.status(200).json({ result });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

function extractParams(queryParams: string[] | string): Params {
  if (queryParams.length !== 3) {
    throw new Error(
      `Query params should have 3 items. Received ${queryParams.length}: ${queryParams}`
    );
  }

  try {
    const params: Params = {
      operation: queryParams[0],
      first: parseInt(queryParams[1]),
      second: parseInt(queryParams[2]),
    };
    return params;
  } catch (e) {
    throw new Error(`Failed to process query params. Received: ${queryParams}`);
  }
}


import { NextApiResponse, NextApiRequest } from 'next'
import { add, subtract, multiply, divide } from "../../../utils/calculate";
import { Operation } from "../../../utils/calculate";

interface Params {
  operation: string;
  first: number;
  second: number;
}

function isOperation(op: string): op is Operation {
  return Object.values(Operation).includes(op as Operation);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      throw new Error(
        `Unsupported method ${req.method}. Only GET method is supported`
      );
    }

    const params = extractParams(req.query.params);
    if (isOperation(params.operation)) {
      let result = calculate(params.operation, params.first, params.second);
      res.status(200).json({ result });
    } else {
      throw new Error(`Invalid operation: ${params.operation}`);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

function calculate(operation: Operation, first: number, second: number): number {
  switch (operation) {
    case Operation.Add:
      return add(first, second);
    case Operation.Subtract:
      return subtract(first, second);
    case Operation.Multiply:
      return multiply(first, second);
    case Operation.Divide:
      return divide(first, second);
    default:
      throw new Error(`Unsupported operation ${operation}`);
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


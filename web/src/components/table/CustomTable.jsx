import {
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";

import { limit } from "../../constants";

const CustomTable = ({ isLoading, fields, data, emptyMsg, renderItem }) => {
  const Item = renderItem;
  return (
    <Table>
      <TableHead>
        <TableRow>
          {fields.map((field) => (
            <TableCell key={field}>{field}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell rowSpan={limit} colSpan={limit}>
              <CircularProgress />
            </TableCell>
          </TableRow>
        ) : data.length > 0 ? (
          data.map((items, idx) => (
            <Item key={items._id} items={items} idx={idx} />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} rowSpan={3}>
              {emptyMsg}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CustomTable;

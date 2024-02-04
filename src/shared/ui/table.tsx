import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SxProps, Typography } from "@mui/material";

interface Props {
  rows: Array<Record<string, string | boolean | number>>;
  withHeader?: boolean;
  onClick?: (id: string) => void;
  sx?: SxProps;
}

export const BasicTable: React.FC<Props> = (props) => {
  const { rows, withHeader = false, onClick, sx = {} } = props;

  return (
    <TableContainer component={Paper} sx={sx}>
      <Table sx={{ minWidth: 650 }}>
        {withHeader && (
          <TableHead>
            <TableRow>
              {Object.keys(rows[0]).map((key) => (
                <TableCell>
                  <Typography
                    sx={{ ":first-letter": { textTransform: "uppercase" } }}
                    fontWeight="500"
                  >
                    {key}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id as string}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                ":hover": { background: "#F1F1F1" },
                cursor: "pointer",
              }}
              onClick={onClick ? () => onClick(row.id as string) : undefined}
            >
              {Object.entries(row).map(([key, value]) =>
                key !== "id" ? (
                  <TableCell align="left" component="th" scope="row">
                    {value}
                  </TableCell>
                ) : null
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

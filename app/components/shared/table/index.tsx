import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ReactNode } from 'react';
import styles from './index.module.scss';

interface Props {
  children: ReactNode;
}

function DataTable({ children }: Props) {
  return (
    <TableContainer>
      <Table width="100%" className={styles.table}>
        {children}
      </Table>
    </TableContainer>
  );
}

DataTable.Header = function Header({ children }: Props) {
  return (
    <TableHead className={styles.head}>
      <TableRow>{children}</TableRow>
    </TableHead>
  );
};

DataTable.Body = function Body({ children }: Props) {
  return <TableBody>{children}</TableBody>;
};

DataTable.Row = function Row({ children }: Props) {
  return <TableRow className={styles.row}>{children}</TableRow>;
};

DataTable.HeaderCell = function HeaderCell({ children }: Props) {
  return <TableCell className={`${styles.cell} ${styles.headerCell}`}>{children}</TableCell>;
};

DataTable.Cell = function Cell({ children }: Props) {
  return <TableCell className={styles.cell}>{children}</TableCell>;
};

export default DataTable;

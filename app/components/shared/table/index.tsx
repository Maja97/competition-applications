import React, { ReactNode } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import styles from './index.module.scss';
import { ApplicationStatus, CellType } from '@app/types/application';

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
    <Thead className={styles.head}>
      <Tr>{children}</Tr>
    </Thead>
  );
};

DataTable.Body = function Body({ children }: Props) {
  return <Tbody>{children}</Tbody>;
};

DataTable.Row = function Row({ children }: Props) {
  return <Tr className={styles.row}>{children}</Tr>;
};

DataTable.HeaderCell = function HeaderCell({ children }: Props) {
  return <Th className={`${styles.cell} ${styles.headerCell}`}>{children}</Th>;
};

interface CellProps {
  children: ReactNode;
}

DataTable.Cell = function Cell({ children }: CellProps) {
  return <Td className={styles.cell}>{children}</Td>;
};

export default DataTable;

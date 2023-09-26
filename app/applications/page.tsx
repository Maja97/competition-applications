'use client';
import NoData from '@app/components/applications/NoData';
import SearchFilter from '@app/components/applications/SearchFilter';
import SelectFilter, { initialValue } from '@app/components/shared/selectFilter/SelectFilter';
import DataTable from '@app/components/shared/table';
import { applicationFilterKeys } from '@app/consts/filters';
import strings from '@app/consts/strings.json';
import { tableHeaders } from '@app/consts/tableHeaders';
import { mapFilters } from '@app/functions/filters';
import useApplications from '@app/hooks/applications/useApplications';
import useCountries from '@app/hooks/useCountries';
import Loading from '@app/loading';
import { Application, ApplicationStatus } from '@app/types/application';
import { TableCell, TableRow } from '@mui/material';
import ArrowDown from '@public/assets/ArrowDown';
import SuccessDot from '@public/assets/SuccessDot';
import { format } from 'date-fns';
import { useRef, useState } from 'react';
import Button from '../components/shared/button';
import Header from '../components/shared/header';
import styles from './page.module.scss';

const initialFilters = {
  discipline: initialValue,
  program: initialValue,
  category: initialValue,
  status: initialValue
};

export default function Page() {
  const { data, loading } = useApplications();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [removed, setRemoved] = useState<string[]>([]);
  const [canceled, setCanceled] = useState<string[]>([]);
  const { countries } = useCountries();
  const searchTimerRef = useRef<NodeJS.Timeout>();
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [filters, setFilters] = useState(initialFilters);

  const toggleCollapsed = (id: string) => {
    setCollapsed((prev) => {
      const arr = [...prev];
      if (!prev.includes(id)) {
        arr.push(id);
      } else {
        arr.splice(arr.indexOf(id), 1);
      }
      return arr;
    });
  };

  const filteredData = data
    ?.filter(
      (item) =>
        `${item.firstName} ${item.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !removed.includes(item.id) &&
        (item.discipline === filters.discipline || filters.discipline === initialValue) &&
        (item.programName === filters.program || filters.program === initialValue) &&
        (item.categoryName === filters.category || filters.category === initialValue) &&
        (item.status === filters.status || filters.status === initialValue)
    )
    .map((item) =>
      canceled.includes(item.id) ? { ...item, status: ApplicationStatus.Cancelled } : item
    );

  const removeItem = (id: string) => {
    setRemoved((prev) => [...prev, id]);
  };

  const cancelItem = (id: string) => {
    setCanceled((prev) => [...prev, id]);
  };

  const onSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setSearchTerm(event.target.value);
    }, 1000);
  };

  const getFilters = (key: keyof Application) => {
    if (data) return mapFilters(key, data);
    else return [];
  };

  const applyFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Header />
      <main>
        <section className={styles.top}>
          <h1>{strings.applications.title}</h1>
          <div className={styles.buttonGroup}>
            <Button>{strings.applications.button}</Button>
            <Button icon={<SuccessDot />} variant="secondary" disabled>
              Open
            </Button>
          </div>
        </section>
        <section className={styles.bottom}>
          <div className={styles.filters}>
            <SearchFilter
              className={styles.searchInput}
              placeholder={strings.applications.table.searchPlaceholder}
              onChange={onSearch}
            />
            <SelectFilter
              handleChange={(value) => applyFilter(applicationFilterKeys.discipline, value)}
              label={strings.applications.filters.discipline}
              options={getFilters(applicationFilterKeys.discipline)}
            />
            <SelectFilter
              handleChange={(value) => applyFilter(applicationFilterKeys.program, value)}
              label={strings.applications.filters.program}
              options={getFilters(applicationFilterKeys.program)}
            />
            <SelectFilter
              handleChange={(value) => applyFilter(applicationFilterKeys.category, value)}
              label={strings.applications.filters.category}
              options={getFilters(applicationFilterKeys.category)}
            />
            <SelectFilter
              handleChange={(value) => applyFilter(applicationFilterKeys.status, value)}
              label={strings.applications.filters.status}
              options={getFilters(applicationFilterKeys.status)}
            />
          </div>
          {filteredData && filteredData?.length > 0 ? (
            <>
              <h3 className={styles.tableTitle}>All requests ({filteredData?.length})</h3>
              <DataTable>
                <DataTable.Header>
                  {tableHeaders.applications.map((header, index) => (
                    <DataTable.HeaderCell key={`header-cell-${header}-${index}`}>
                      {header}
                    </DataTable.HeaderCell>
                  ))}
                </DataTable.Header>
                <DataTable.Body>
                  {filteredData?.map((item) => {
                    return (
                      <>
                        <DataTable.Row key={`row-${item.id}`}>
                          <DataTable.Cell>
                            <p className={styles.name}>{`${item.firstName} ${item.lastName}`}</p>
                            <p className={styles.club}>
                              {countries?.find((country) => country.code === item.country)?.flag}
                              {item.club}
                            </p>
                          </DataTable.Cell>
                          <DataTable.Cell>{item.discipline}</DataTable.Cell>
                          <DataTable.Cell>{item.programName}</DataTable.Cell>
                          <DataTable.Cell>{item.categoryName}</DataTable.Cell>
                          <DataTable.Cell>{item.teamName}</DataTable.Cell>
                          <DataTable.Cell>
                            <p
                              className={`${styles.statusCell} ${
                                item.status === ApplicationStatus.Applied
                                  ? styles.greenStatus
                                  : item.status === ApplicationStatus.Pending
                                  ? styles.yellowStatus
                                  : item.status === ApplicationStatus.Declined
                                  ? styles.redStatus
                                  : styles.greyStatus
                              }`}>
                              {item.status.toUpperCase()}
                            </p>
                          </DataTable.Cell>
                          <DataTable.Cell>
                            <p className={styles.date}>
                              {format(new Date(item.date), 'dd.MM.yyyy hh:mm')}
                            </p>
                          </DataTable.Cell>
                          <DataTable.Cell>
                            {item.status === ApplicationStatus.Pending ? (
                              <button
                                onClick={() => cancelItem(item.id)}
                                className={styles.actionButton}>
                                {strings.applications.table.cancel}
                              </button>
                            ) : item.status === ApplicationStatus.Applied ? (
                              <button
                                onClick={() => removeItem(item.id)}
                                className={styles.actionButton}>
                                {strings.applications.table.requestRemoval}
                              </button>
                            ) : (
                              ''
                            )}
                          </DataTable.Cell>
                          <DataTable.Cell>
                            <button
                              className={styles.rowToggle}
                              onClick={() => toggleCollapsed(item.id)}>
                              <ArrowDown
                                className={collapsed.includes(item.id) ? styles.rotatedIcon : ''}
                              />
                            </button>
                          </DataTable.Cell>
                        </DataTable.Row>
                        <TableRow
                          style={{ display: collapsed.includes(item.id) ? 'table-row' : 'none' }}>
                          <DataTable.Cell> </DataTable.Cell>
                          <DataTable.Cell> </DataTable.Cell>
                          <TableCell colSpan={8}>
                            <p className={styles.collapsed}>
                              <b>{strings.applications.table.dateOfBirth}:</b>{' '}
                              {format(new Date(item.dateOfBirth), 'dd.MM.yyyy hh:mm')}
                            </p>
                            <p className={styles.collapsed}>
                              <b>{strings.applications.table.phoneNumber}:</b> {item.phone}
                            </p>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </DataTable.Body>
              </DataTable>
            </>
          ) : loading ? (
            <Loading />
          ) : (
            <NoData />
          )}
        </section>
      </main>
    </>
  );
}

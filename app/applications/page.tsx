'use client';
import NoData from '@app/components/applications/NoData';
import DataTable from '@app/components/shared/table';
import strings from '@app/consts/strings.json';
import { tableHeaders } from '@app/consts/tableHeaders';
import useApplications from '@app/hooks/applications/useApplications';
import useCountries from '@app/hooks/useCountries';
import Loading from '@app/loading';
import { ApplicationStatus } from '@app/types/application';
import SuccessDot from '@public/assets/SuccessDot';
import { format } from 'date-fns';
import Button from '../components/shared/button';
import Header from '../components/shared/header';
import styles from './page.module.scss';

export default function Page() {
  const { data, loading } = useApplications();
  const { countries } = useCountries();

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
          {data && data?.length > 0 ? (
            <>
              <h3 className={styles.tableTitle}>All requests ({data?.length})</h3>
              <DataTable>
                <DataTable.Header>
                  {tableHeaders.applications.map((header) => (
                    <DataTable.HeaderCell key={`header-cell-${header}`}>
                      {header}
                    </DataTable.HeaderCell>
                  ))}
                </DataTable.Header>
                <DataTable.Body>
                  {data?.map((item) => {
                    return (
                      <DataTable.Row key={`cell-${item.id}`}>
                        <DataTable.Cell>
                          <p>{`${item.firstName} ${item.lastName}`}</p>
                          <p>
                            {countries?.find((country) => country.code === item.country)?.flag}{' '}
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
                          {format(new Date(item.date), 'dd.MM.yyyy hh:mm')}
                        </DataTable.Cell>
                      </DataTable.Row>
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

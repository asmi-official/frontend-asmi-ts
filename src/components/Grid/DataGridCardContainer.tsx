import { Box, TextField, Stack } from '@mui/material';
import { useMemo, useState } from 'react';

import DataGridCard from './DataGridCard';
import type { GridColumn } from './DataGridCard';

interface DataGridCardContainerProps<T> {
  data: T[];
  columns: GridColumn<T>[];

  getImage?: (row: T) => string | undefined;
  getTitle: (row: T) => string;
  getSubTitle?: (row: T) => string | undefined;
  getStatus?: (row: T) => {
    label: string;
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  };

  searchKeys?: (keyof T)[];
}

export default function DataGridCardContainer<T extends Record<string, unknown>>({
  data,
  columns,
  getImage,
  getTitle,
  getSubTitle,
  getStatus,
  searchKeys = [],
}: DataGridCardContainerProps<T>) {
  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    if (!search) return data;

    const keyword = search.toLowerCase();

    return data.filter((row) =>
      searchKeys.some((key) =>
        String(row[key] ?? '')
          .toLowerCase()
          .includes(keyword),
      ),
    );
  }, [data, search, searchKeys]);

  return (
    <Box>
      {/* SEARCH BAR */}
      <Stack mb={2}>
        <TextField
          size="small"
          placeholder="Cari data..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Stack>

      <DataGridCard
        data={filteredData}
        columns={columns}
        getImage={getImage}
        getTitle={getTitle}
        getSubTitle={getSubTitle}
        getStatus={getStatus}
      />
    </Box>
  );
}

import { FormControl, InputLabel, Select, MenuItem, Tooltip, Box } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material';
import { getBillTypes } from '../../utils/billUtils';

interface BillTypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const BillTypeFilter = ({ value, onChange }: BillTypeFilterProps) => {
  const billTypes = getBillTypes();

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip 
        title="Filtering is performed on the current page only, as the Oireachtas API doesn't support bill type filtering"
        placement="top"
      >
        <InfoOutlined 
          sx={{ 
            color: 'text.secondary', 
            fontSize: 18,
            cursor: 'help'
          }} 
        />
      </Tooltip>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel id="bill-type-filter-label">Bill Type</InputLabel>
        <Select
          labelId="bill-type-filter-label"
          id="bill-type-filter"
          value={value}
          label="Bill Type"
          onChange={handleChange}
        >
          {billTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

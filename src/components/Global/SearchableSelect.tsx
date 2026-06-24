import { Autocomplete, TextField, createFilterOptions } from '@mui/material';
import type { AutocompleteProps } from '@mui/material';

export interface SelectOption {
    value: string;
    label: string;
    id: string;
}

interface SearchableSelectProps
    extends Omit<AutocompleteProps<SelectOption, false, false, false>, 'renderInput' | 'options' | 'onChange' | 'value'> {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    label: string;
    placeholder?: string;
    required?: boolean;
    error?: boolean;
    helperText?: string;
    size?: 'small' | 'medium';
}

const filter = createFilterOptions<SelectOption>();

export default function SearchableSelect({
    options,
    value,
    onChange,
    label,
    placeholder,
    required,
    error,
    helperText,
    size = 'small',
    ...rest
}: SearchableSelectProps) {
    const selected = options.find((o) => o.value === value) ?? null;

    return (
        <Autocomplete
            {...rest}
            options={options}
            value={selected}
            onChange={(_e, newVal) => onChange(newVal?.value ?? '')}
            getOptionLabel={(opt) => opt.label}
            isOptionEqualToValue={(opt, val) => opt.value === val.value}
            filterOptions={(opts, state) => filter(opts, state)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    required={required}
                    error={error}
                    helperText={helperText}
                    size={size}
                />
            )}
        />
    );
}

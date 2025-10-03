import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { BillTypeFilter } from '../BillTypeFilter';
import {vi, describe, it, expect, beforeEach } from 'vitest';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('BillTypeFilter', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with correct initial value', () => {
    renderWithTheme(<BillTypeFilter value="" onChange={mockOnChange} />);
    
    // Check the label is rendered (empty value doesn't show "All Types" in display)
    expect(screen.getByLabelText('Bill Type')).toBeInTheDocument();
  });

  it('calls onChange when selection changes', () => {
    renderWithTheme(<BillTypeFilter value="" onChange={mockOnChange} />);
    
    const select = screen.getByLabelText('Bill Type');
    fireEvent.mouseDown(select);
    
    const publicBillOption = screen.getByText('Public Bill');
    fireEvent.click(publicBillOption);
    
    expect(mockOnChange).toHaveBeenCalledWith('Public');
  });

  it('displays all bill type options', () => {
    renderWithTheme(<BillTypeFilter value="" onChange={mockOnChange} />);
    
    const select = screen.getByLabelText('Bill Type');
    fireEvent.mouseDown(select);
    
    expect(screen.getByText('All Types')).toBeInTheDocument();
    expect(screen.getByText('Public Bill')).toBeInTheDocument();
    expect(screen.getByText('Private Bill')).toBeInTheDocument();
  });
});

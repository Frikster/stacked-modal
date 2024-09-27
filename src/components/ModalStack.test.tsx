import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalStack from './ModalStack';

describe('ModalStack component', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  const mockModals = [
    {
      id: '1',
      title: 'Modal 1',
      content: <p>Content 1</p>,
      onClose: mockOnClose,
      onSubmit: mockOnSubmit,
    },
    {
      id: '2',
      title: 'Modal 2',
      content: <p>Content 2</p>,
      onClose: mockOnClose,
      onSubmit: mockOnSubmit,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders multiple modals correctly', () => {
    render(<ModalStack modals={mockModals} />);

    expect(screen.getByText('Modal 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Modal 2')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('calls onClose for the top modal when close button is clicked', () => {
    render(<ModalStack modals={mockModals} />);

    const closeButtons = screen.getAllByLabelText('Close');
    fireEvent.click(closeButtons[closeButtons.length - 1]);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit for the top modal when submit button is clicked', () => {
    render(<ModalStack modals={mockModals} />);

    const submitButtons = screen.getAllByText('Submit');
    fireEvent.click(submitButtons[submitButtons.length - 1]);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders no modals when the modals array is empty', () => {
    render(<ModalStack modals={[]} />);

    expect(screen.queryByText('Modal 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal 2')).not.toBeInTheDocument();
  });
});

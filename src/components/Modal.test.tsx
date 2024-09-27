import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal component', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    fireEvent.click(screen.getByLabelText('Close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit when submit button is clicked', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    fireEvent.click(screen.getByText('Submit'));
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal
        isOpen={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });
});

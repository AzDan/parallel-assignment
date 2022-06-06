import { render, screen } from '@testing-library/react';
import App from './App';

test('check container in the document', () => {
  render(<App />);
  const testElement = screen.getByTestId("container")
  expect(testElement).toBeInTheDocument();
});

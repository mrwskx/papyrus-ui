import { useState } from 'react';

import { render, screen, userEvent } from '../../utils/test-utils';

import { ImageInput } from './image-input';

describe('ImageInput', () => {
  describe('Given the image-input component with default props', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the default placeholder', () => {
        render(<ImageInput />);
        expect(screen.getByText('Upload image')).toBeInTheDocument();
      });
    });
  });

  describe('Given the image-input component with a label and custom placeholder', () => {
    describe('When it is rendered', () => {
      it('Then it should render the label and the custom placeholder', () => {
        render(<ImageInput label="Avatar" placeholder="Upload avatar" />);
        expect(screen.getByText('Avatar')).toBeInTheDocument();
        expect(screen.getByText('Upload avatar')).toBeInTheDocument();
      });
    });
  });

  describe('Given the image-input component in controlled mode with a value', () => {
    describe('When it is rendered with value, getName and getUrl', () => {
      it('Then it should display the image preview with correct alt and src', () => {
        const value = { id: '1' };
        const getName = () => 'Avatar Image';
        const getUrl = () => 'https://example.com/avatar.jpg';

        render(<ImageInput getName={getName} getUrl={getUrl} value={value} />);

        const image = screen.getByRole('img', { name: 'Avatar Image' });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg');
      });
    });

    describe('When remove is clicked', () => {
      it('Then it should clear the preview by updating the controlled value', async () => {
        const initial = { id: '1' };
        const getName = () => 'Avatar Image';
        const getUrl = () => 'https://example.com/avatar.jpg';

        function Wrapper() {
          const [val, setVal] = useState<typeof initial | null>(initial);
          return (
            <ImageInput
              getName={getName}
              getUrl={getUrl}
              value={val}
              onChange={setVal}
            />
          );
        }

        render(<Wrapper />);

        const removeBtn = screen.getByTitle('Remove');
        await userEvent.click(removeBtn);

        expect(screen.getByText('Upload image')).toBeInTheDocument();
      });
    });
  });

  describe('Given the image-input component in multiple mode with multiple values', () => {
    describe('When it is rendered with two values', () => {
      it('Then it should display two previews and an extra droppable slot', () => {
        const values = [{ id: '1' }, { id: '2' }];
        const getName = (v: { id: string }) => `Image ${v.id}`;
        const getUrl = (v: { id: string }) =>
          `https://example.com/img-${v.id}.jpg`;

        render(
          <ImageInput<{ id: string }, true>
            getName={getName}
            getUrl={getUrl}
            multiple
            value={values}
          />,
        );

        // two images for the two values
        expect(screen.getAllByRole('img')).toHaveLength(2);
        // plus the placeholder droppable tile should still be shown
        expect(screen.getByText('Upload image')).toBeInTheDocument();
      });
    });
  });

  describe('Given the image-input component with disabled state', () => {
    describe('When it is rendered with a value', () => {
      it('Then the remove control should not be available', () => {
        const value = { id: '1' };
        const getName = () => 'Avatar Image';
        const getUrl = () => 'https://example.com/avatar.jpg';

        render(
          <ImageInput
            disabled
            getName={getName}
            getUrl={getUrl}
            value={value}
          />,
        );

        expect(screen.queryByTitle('Remove')).not.toBeInTheDocument();
      });
    });
  });
});

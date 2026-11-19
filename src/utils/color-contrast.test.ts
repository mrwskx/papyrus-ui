import { contrastRatio } from './color-contrast';

describe('contrastRatio', () => {
  describe('Given black and white', () => {
    describe('When the ratio is computed', () => {
      it('Then it should return the maximum ratio of 21', () => {
        expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1);
      });
    });
  });

  describe('Given two identical colors', () => {
    describe('When the ratio is computed', () => {
      it('Then it should return the minimum ratio of 1', () => {
        expect(contrastRatio('#326eb7', '#326eb7')).toBeCloseTo(1, 5);
      });
    });
  });

  describe('Given the color order is reversed', () => {
    describe('When the ratio is computed', () => {
      it('Then it should return the same ratio either way', () => {
        expect(contrastRatio('#326eb7', '#ffffff')).toBeCloseTo(
          contrastRatio('#ffffff', '#326eb7'),
          5,
        );
      });
    });
  });
});

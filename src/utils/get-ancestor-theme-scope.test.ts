import { getAncestorThemeScope } from './get-ancestor-theme-scope';

describe('getAncestorThemeScope', () => {
  describe('Given an element nested inside a `.dark` ancestor', () => {
    describe('When the ancestor scope is resolved', () => {
      it('Then it should return "dark"', () => {
        document.body.innerHTML =
          '<div class="dark"><div id="trigger"></div></div>';
        const element = document.getElementById('trigger');

        expect(getAncestorThemeScope(element)).toBe('dark');
      });
    });
  });

  describe('Given an element nested inside a `.light` ancestor', () => {
    describe('When the ancestor scope is resolved', () => {
      it('Then it should return "light"', () => {
        document.body.innerHTML =
          '<div class="light"><div id="trigger"></div></div>';
        const element = document.getElementById('trigger');

        expect(getAncestorThemeScope(element)).toBe('light');
      });
    });
  });

  describe('Given an element with no `.light` or `.dark` ancestor', () => {
    describe('When the ancestor scope is resolved', () => {
      it('Then it should return undefined', () => {
        document.body.innerHTML = '<div><div id="trigger"></div></div>';
        const element = document.getElementById('trigger');

        expect(getAncestorThemeScope(element)).toBeUndefined();
      });
    });
  });

  describe('Given a nested `.light` scope inside an outer `.dark` scope', () => {
    describe('When the ancestor scope is resolved', () => {
      it('Then it should return the nearest scope, "light"', () => {
        document.body.innerHTML =
          '<div class="dark"><div class="light"><div id="trigger"></div></div></div>';
        const element = document.getElementById('trigger');

        expect(getAncestorThemeScope(element)).toBe('light');
      });
    });
  });

  describe('Given a null reference', () => {
    describe('When the ancestor scope is resolved', () => {
      it('Then it should return undefined', () => {
        expect(getAncestorThemeScope(null)).toBeUndefined();
      });
    });
  });

  describe('Given a virtual element whose contextElement has a `.dark` ancestor', () => {
    describe('When the ancestor scope is resolved', () => {
      it('Then it should return "dark"', () => {
        document.body.innerHTML =
          '<div class="dark"><div id="trigger"></div></div>';
        const contextElement = document.getElementById('trigger');

        expect(
          getAncestorThemeScope({
            contextElement: contextElement ?? undefined,
            getBoundingClientRect: () => new DOMRect(),
          }),
        ).toBe('dark');
      });
    });
  });
});

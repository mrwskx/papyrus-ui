import {
  axe,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../utils/test-utils';

import { Menu } from './menu';
import { MenuItem } from './menu-item';
import { Submenu } from './submenu';

describe('Menu', () => {
  describe('Given menu component is rendered with valid menu-item children', () => {
    describe('When user clicks on a menu item', () => {
      it('Then the associated action should be triggered', async () => {
        const onClick = vi.fn();

        render(
          <Menu>
            <MenuItem onClick={onClick}>Menu Item</MenuItem>
          </Menu>,
        );

        await userEvent.click(screen.getByText('Menu Item'));

        await waitFor(() => {
          expect(onClick).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('When the user navigates through the menu items using keyboard arrow keys (up/down)', () => {
      it('Then the correct menu item should be focused', async () => {
        // Render the menu component with multiple menu items
        render(
          <Menu>
            <MenuItem>Home</MenuItem>
            <MenuItem>Products</MenuItem>
            <MenuItem>Contacts</MenuItem>
          </Menu>,
        );

        // Get the menu items
        const homeMenuItem = screen.getAllByRole('menuitem')[0];
        const productsMenuItem = screen.getAllByRole('menuitem')[1];

        // Simulate keyboard navigation
        await userEvent.tab();
        await userEvent.keyboard('{arrowdown}');

        await waitFor(() => {
          // Assert focus on the correct menu item
          expect(homeMenuItem).toHaveFocus();
        });

        await userEvent.keyboard('{arrowdown}');

        await waitFor(() => {
          expect(productsMenuItem).toHaveFocus();
        });

        await userEvent.keyboard('{arrowup}');

        await waitFor(() => {
          expect(homeMenuItem).toHaveFocus();
        });
      });
    });

    describe('When user presses Enter or Space key on the menu item', () => {
      it('Then the associated action should be triggered', async () => {
        const mockAction = vi.fn();

        // Render the menu component with a mock menu item
        render(
          <Menu>
            <MenuItem onClick={mockAction}>Click Me</MenuItem>
          </Menu>,
        );

        const menuItem = screen.getByRole('menuitem');

        // Get the menu item
        await userEvent.tab();
        await userEvent.keyboard('{arrowdown}');

        await waitFor(() => {
          expect(menuItem).toHaveFocus();
        });

        // Simulate keydown events
        await userEvent.keyboard('{enter}');
        await userEvent.keyboard('{ }');

        // Assert that the associated action was triggered
        expect(mockAction).toHaveBeenCalledTimes(2);
      });
    });

    describe('When the menu component is accessed using a screen reader', () => {
      it('Then the menu should be accessible to screen readers, providing proper instructions and announcing menu items', async () => {
        // Render the menu component with multiple menu items
        const { container } = render(
          <Menu>
            <MenuItem>Home</MenuItem>
            <MenuItem>Products</MenuItem>
            <MenuItem>Contacts</MenuItem>
          </Menu>,
        );

        // Perform accessibility audit
        const results = await axe(container);
        // Assert no accessibility violations
        expect(results).toHaveNoViolations();
      });
    });
  });

  describe('Given menu component is rendered with valid menu-item and submenu children', () => {
    describe('When the user clicks on a menu item with a submenu', () => {
      it('Then the submenu should be expanded or collapsed, depending on its current state', async () => {
        // Render the VerticalMenu component with menu items and submenus
        render(
          <Menu>
            <MenuItem>Home</MenuItem>
            <Submenu label='Products'>
              <MenuItem>Electronics</MenuItem>
              <MenuItem>Clothing</MenuItem>
              <MenuItem>Accessories</MenuItem>
            </Submenu>
            <MenuItem>Contacts</MenuItem>
          </Menu>,
        );

        // Assert that the submenu items are not visible initially
        expect(screen.getAllByRole('menuitem')).toHaveLength(3);
        // Simulate a click on the menu item with the fly-out submenu
        await userEvent.click(screen.getAllByRole('menuitem')[1]);

        await waitFor(() => {
          // Assert that the submenu items are visible after clicking
          expect(screen.getAllByRole('menuitem')).toHaveLength(6);
        });
      });
    });

    describe('When the user clicks on a submenu item', () => {
      it('Then the associated action should be triggered', async () => {
        // Mock function
        const mockAction = vi.fn();

        // Render the menu component with menu items and submenus
        render(
          <Menu>
            <MenuItem>Home</MenuItem>
            <Submenu label='Products'>
              <MenuItem>Electronics</MenuItem>
              <MenuItem onClick={mockAction}>Clothing</MenuItem>
              <MenuItem>Accessories</MenuItem>
            </Submenu>
            <MenuItem>Contacts</MenuItem>
          </Menu>,
        );

        // Simulate a click on a submenu item
        await userEvent.click(screen.getByText('Products'));

        await waitFor(() => {
          // Assert that the submenu is visible after hovering
          expect(screen.getAllByRole('menuitem')).toHaveLength(6);
        });

        await userEvent.click(screen.getByText('Clothing'));
        // Assert that the associated action has been triggered
        expect(mockAction).toHaveBeenCalledTimes(1);
      });
    });

    describe('When the user interacts with the menu item with a submenu using keyboard Enter or Space keys', () => {
      it('Then the submenu should be expanded or collapsed, depending on its current state', async () => {
        // Render the VerticalMenu component with menu items and submenus
        render(
          <Menu>
            <MenuItem>Home</MenuItem>
            <Submenu label='Products'>
              <MenuItem>Electronics</MenuItem>
              <MenuItem>Clothing</MenuItem>
              <MenuItem>Accessories</MenuItem>
            </Submenu>
            <MenuItem>Contacts</MenuItem>
          </Menu>,
        );

        // Simulate keyboard navigation to focus on the menu item
        await userEvent.tab();
        await userEvent.keyboard('{arrowdown}');

        await waitFor(() => {
          expect(screen.getAllByRole('menuitem')[0]).toHaveFocus();
        });

        await userEvent.keyboard('{arrowdown}');

        await waitFor(() => {
          expect(screen.getAllByRole('menuitem')[1]).toHaveFocus();
        });

        await userEvent.keyboard('{enter}');

        await waitFor(() => {
          // Assert that the submenu is expanded
          expect(screen.getAllByRole('menuitem')).toHaveLength(6);
        });

        await userEvent.keyboard('{enter}');

        await waitFor(() => {
          // Assert that the submenu is expanded
          expect(screen.getAllByRole('menuitem')).toHaveLength(3);
        });

        await userEvent.keyboard('{ }');

        await waitFor(() => {
          // Assert that the submenu is expanded
          expect(screen.getAllByRole('menuitem')).toHaveLength(6);
        });

        await userEvent.keyboard('{ }');

        await waitFor(() => {
          // Assert that the submenu is expanded
          expect(screen.getAllByRole('menuitem')).toHaveLength(3);
        });
      });
    });

    describe('When the user navigates through the submenu items using keyboard arrow keys (up/down)', () => {
      it('The correct submenu item should be focused', async () => {
        // Render the menu component with menu items and submenus
        render(
          <Menu>
            <MenuItem>Home</MenuItem>
            <Submenu label='Products'>
              <MenuItem>Electronics</MenuItem>
              <MenuItem>Clothing</MenuItem>
              <MenuItem>Accessories</MenuItem>
            </Submenu>
            <MenuItem>Contacts</MenuItem>
          </Menu>,
        );

        // Simulate keyboard navigation to focus on the menu item
        await userEvent.tab();
        await userEvent.keyboard('{arrowdown}');

        await waitFor(() => {
          expect(screen.getAllByRole('menuitem')[0]).toHaveFocus();
        });

        await userEvent.keyboard('{arrowdown}');

        await waitFor(() => {
          expect(screen.getAllByRole('menuitem')[1]).toHaveFocus();
        });

        await userEvent.keyboard('{enter}');

        await waitFor(() => {
          // Assert that the submenu is expanded
          expect(screen.getAllByRole('menuitem')).toHaveLength(6);
        });

        await userEvent.keyboard('{arrowdown}');

        await waitFor(() => {
          expect(screen.getAllByRole('menuitem')[2]).toHaveFocus();
        });

        await userEvent.keyboard('{arrowdown}');

        await waitFor(() => {
          expect(screen.getAllByRole('menuitem')[3]).toHaveFocus();
        });

        await userEvent.keyboard('{arrowup}');

        await waitFor(() => {
          expect(screen.getAllByRole('menuitem')[2]).toHaveFocus();
        });
      });
    });

    describe('When the user interacts with submenu items using Space or Enter key', () => {
      it('Then the associated action should be triggered', async () => {
        const mockAction = vi.fn();

        // Render the menu component with menu items and submenus
        render(
          <Menu>
            <MenuItem>Home</MenuItem>
            <Submenu label='Products'>
              <MenuItem onClick={mockAction}>Electronics</MenuItem>
              <MenuItem>Clothing</MenuItem>
              <MenuItem>Accessories</MenuItem>
            </Submenu>
            <MenuItem>Contacts</MenuItem>
          </Menu>,
        );

        // Simulate keyboard navigation to focus on the menu item
        await userEvent.tab();
        await userEvent.keyboard('{arrowdown}');

        await waitFor(() => {
          expect(screen.getAllByRole('menuitem')[0]).toHaveFocus();
        });

        await userEvent.keyboard('{arrowdown}');

        await waitFor(() => {
          expect(screen.getAllByRole('menuitem')[1]).toHaveFocus();
        });

        await userEvent.keyboard('{enter}');

        await waitFor(() => {
          // Assert that the submenu is expanded
          expect(screen.getAllByRole('menuitem')).toHaveLength(6);
        });

        await userEvent.keyboard('{arrowdown}');

        await waitFor(() => {
          expect(screen.getAllByRole('menuitem')[2]).toHaveFocus();
        });

        await userEvent.keyboard('{enter}');
        await userEvent.keyboard('{ }');

        expect(mockAction).toHaveBeenCalledTimes(2);
        mockAction.mockClear();
      });
    });

    describe('When the menu component is accessed using a screen reader', () => {
      it('Then the menu should be accessible to screen readers, providing proper instructions and announcing menu items', async () => {
        // Render the menu component with multiple menu items
        const { container } = render(
          <Menu>
            <MenuItem>Home</MenuItem>
            <Submenu label='Products'>
              <MenuItem>Electronics</MenuItem>
              <MenuItem>Clothing</MenuItem>
              <MenuItem>Accessories</MenuItem>
            </Submenu>
            <MenuItem>Contacts</MenuItem>
          </Menu>,
        );

        // Perform accessibility audit
        const results = await axe(container);
        // Assert no accessibility violations
        expect(results).toHaveNoViolations();
      });
    });
  });

  // describe('Given menu component is rendered with mode "horizontal" and valid menu-item children', () => {
  //   describe('When the user navigates through the menu items using keyboard arrow keys (up/down)', () => {
  //     it('Then the correct menu item should be focused', async () => {
  //       // Render the menu component with multiple menu items
  //       render(
  //         <menu type="horizontal">
  //           <menu-item>Home</menu-item>
  //           <menu-item>Products</menu-item>
  //           <menu-item>Contacts</menu-item>
  //         </menu>,
  //       );
  //
  //       // Get the menu items
  //       const homeMenuItem = screen.getAllByRole('menuitem')[0];
  //       const aboutMenuItem = screen.getAllByRole('menuitem')[1];
  //
  //       // Simulate keyboard navigation
  //       await userEvent.tab();
  //       await userEvent.keyboard('{arrowright}');
  //
  //       // Assert focus on the correct menu item
  //       await waitFor(() => {
  //         expect(homeMenuItem).toHaveFocus();
  //       });
  //
  //       await userEvent.keyboard('{arrowright}');
  //
  //       await waitFor(() => {
  //         expect(aboutMenuItem).toHaveFocus();
  //       });
  //
  //       // Simulate keyboard navigation in the opposite direction
  //       await userEvent.keyboard('{arrowleft}');
  //
  //       // Assert focus on the correct menu item
  //       await waitFor(() => {
  //         expect(homeMenuItem).toHaveFocus();
  //       });
  //     });
  //   });

  //   describe('When the menu component is accessed using a screen reader', () => {
  //     it('Then the menu should be accessible to screen readers, providing proper instructions and announcing menu items', async () => {
  //       // Render the menu component with multiple menu items
  //       const { container } = render(
  //         <menu type="horizontal">
  //           <menu-item>Home</menu-item>
  //           <menu-item>Products</menu-item>
  //           <menu-item>Contacts</menu-item>
  //         </menu>,
  //       );
  //
  //       // Perform accessibility audit
  //       const results = await axe(container);
  //       // Assert no accessibility violations
  //       expect(results).toHaveNoViolations();
  //     });
  //   });
  // });

  // describe('Given menu component is rendered with mode "horizontal" and valid menu-item and MenuSubmenu children', () => {
  //   describe('When the user interacts with a menu item with a fly-out submenu with ArrowDown key', () => {
  //     it('Then the submenu should be expanded and the first submenu item should be focused', async () => {
  //       // Render the menu component with menu items and submenus
  //       render(
  //         <menu type="horizontal">
  //           <menu-item>Home</menu-item>
  //           <submenu label="Products">
  //             <menu-item>Electronics</menu-item>
  //             <menu-item>Clothing</menu-item>
  //             <menu-item>Accessories</menu-item>
  //           </submenu>
  //           <menu-item>Contacts</menu-item>
  //         </menu>,
  //       );
  //
  //       // Assert that the submenu is not visible initially
  //       expect(screen.getAllByRole('menuitem')).toHaveLength(3);
  //
  //       // Simulate keyboard navigation to focus on the menu item
  //       await userEvent.tab();
  //       await userEvent.keyboard('{arrowright}');
  //
  //       await waitFor(() => {
  //         expect(screen.getAllByRole('menuitem')[0]).toHaveFocus();
  //       });
  //
  //       await userEvent.keyboard('{arrowright}');
  //
  //       await waitFor(() => {
  //         expect(screen.getAllByRole('menuitem')[1]).toHaveFocus();
  //       });
  //
  //       await userEvent.keyboard('{arrowdown}');
  //
  //       await waitFor(() => {
  //         // Assert that the submenu is expanded and the first submenu item is focused
  //         expect(screen.getAllByRole('menuitem')).toHaveLength(6);
  //         expect(screen.getAllByRole('menuitem')[3]).toHaveFocus();
  //       });
  //     });
  //   });
  //
  //   describe('When the menu component is accessed using a screen reader', () => {
  //     it('Then the menu should be accessible to screen readers, providing proper instructions and announcing menu items', async () => {
  //       // Render the menu component with multiple menu items
  //       const { container } = render(
  //         <menu type="horizontal">
  //           <menu-item>Home</menu-item>
  //           <menu-item>Products</menu-item>
  //           <menu-item>Contacts</menu-item>
  //         </menu>,
  //       );
  //
  //       // Perform accessibility audit
  //       const results = await axe(container);
  //       // Assert no accessibility violations
  //       expect(results).toHaveNoViolations();
  //     });
  //   });
  // });
});

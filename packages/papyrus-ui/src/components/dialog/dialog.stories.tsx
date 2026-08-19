/* eslint-disable react/prop-types */
import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../button';

import { Dialog } from './dialog';
import type { DialogProps } from './dialog';
import type { DialogSize } from './dialog.types';

const meta: Meta<DialogProps> = {
  title: 'Feedback/Dialog',
  component: Dialog,
  args: {
    children: [
      <Dialog.Trigger key="dialog-trigger">
        <Button>Open Dialog</Button>
      </Dialog.Trigger>,
      <Dialog.Content key="dialog-content">
        <Dialog.Header>
          <Dialog.Title>Basic Dialog</Dialog.Title>
          <Dialog.Close />
        </Dialog.Header>

        <Dialog.Body>
          <Dialog.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            lectus convallis, ultrices dui non, varius massa. Quisque tempus
            convallis purus, ut interdum nulla venenatis vitae. Proin imperdiet
            tellus purus, id convallis leo porttitor ac.
            <br />
            <br />
            Phasellus maximus facilisis mauris, vel pretium lacus scelerisque a.
            Ut mauris dui, aliquet ut felis quis, aliquam vehicula massa. In
            eget ipsum eleifend, facilisis metus ac, luctus nunc. Duis tristique
            laoreet ipsum nec cursus. Sed quis bibendum odio, ac laoreet quam.
          </Dialog.Description>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close as={Button} variant="plain">
            Cancel
          </Dialog.Close>
          <Dialog.Close as={Button}>OK</Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>,
    ],
  },
};

const Template: StoryFn<DialogProps> = function Template({
  children,
  ...args
}) {
  return <Dialog {...args}>{children}</Dialog>;
};

export const Basic = Template.bind({});

export function Sizes(args: DialogProps) {
  const [open, setOpen] = useState(false);
  const [dialogSize, setDialogSize] = useState<DialogSize>('md');

  function handleOpenSmallDialog() {
    setOpen(true);
    setDialogSize('sm');
  }

  function handleOpenMediumDialog() {
    setOpen(true);
    setDialogSize('md');
  }

  function handleOpenLargeDialog() {
    setOpen(true);
    setDialogSize('lg');
  }

  function handleOpenExtraLargeDialog() {
    setOpen(true);
    setDialogSize('xl');
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <div className="flex">
        <div className="mr-4">
          <Button variant="tertiary" onClick={handleOpenSmallDialog}>
            Open Small Dialog
          </Button>
        </div>

        <div className="mr-4">
          <Button variant="tertiary" onClick={handleOpenMediumDialog}>
            Open Medium Dialog
          </Button>
        </div>

        <div className="mr-4">
          <Button variant="tertiary" onClick={handleOpenLargeDialog}>
            Open Large Dialog
          </Button>
        </div>

        <div>
          <Button variant="tertiary" onClick={handleOpenExtraLargeDialog}>
            Open Extra Large Dialog
          </Button>
        </div>
      </div>

      <Dialog
        {...args}
        isOpen={open && dialogSize === 'sm'}
        size="sm"
        onClose={handleClose}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Small Dialog</Dialog.Title>
            <Dialog.Close />
          </Dialog.Header>
          <Dialog.Body>
            <Dialog.Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
              lectus convallis, ultrices dui non, varius massa.
            </Dialog.Description>
          </Dialog.Body>
          <Dialog.Footer className="justify-center">
            <Button variant="primary" onClick={handleClose}>
              OK
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

      <Dialog
        {...args}
        isOpen={open && dialogSize === 'md'}
        size="md"
        onClose={handleClose}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Medium Dialog</Dialog.Title>
            <Dialog.Close />
          </Dialog.Header>
          <Dialog.Body>
            <Dialog.Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
              lectus convallis, ultrices dui non, varius massa. Quisque tempus
              convallis purus, ut interdum nulla venenatis vitae. Proin
              imperdiet tellus purus, id convallis leo porttitor ac.
              <br />
              <br />
              Phasellus maximus facilisis mauris, vel pretium lacus scelerisque
              a. Ut mauris dui, aliquet ut felis quis, aliquam vehicula massa.
              In eget ipsum eleifend, facilisis metus ac, luctus nunc. Duis
              tristique laoreet ipsum nec cursus. Sed quis bibendum odio, ac
              laoreet quam.
              <br />
              <br />
              Phasellus maximus facilisis mauris, vel pretium lacus scelerisque
              a. Ut mauris dui, aliquet ut felis quis, aliquam vehicula massa.
              In eget ipsum eleifend, facilisis metus ac, luctus nunc. Duis
              tristique laoreet ipsum nec cursus. Sed quis bibendum odio, ac
              laoreet quam.
            </Dialog.Description>
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="plain" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
              OK
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

      <Dialog
        {...args}
        isOpen={open && dialogSize === 'lg'}
        size="lg"
        onClose={handleClose}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Large Dialog</Dialog.Title>
            <Dialog.Close />
          </Dialog.Header>
          <Dialog.Body>
            <Dialog.Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
              lectus convallis, ultrices dui non, varius massa. Quisque tempus
              convallis purus, ut interdum nulla venenatis vitae. Proin
              imperdiet tellus purus, id convallis leo porttitor ac. Phasellus
              maximus facilisis mauris, vel pretium lacus scelerisque a. Ut
              mauris dui, aliquet ut felis quis, aliquam vehicula massa. In eget
              ipsum eleifend, facilisis metus ac, luctus nunc. Duis tristique
              laoreet ipsum nec cursus. Sed quis bibendum odio, ac laoreet quam.
              Donec dignissim in est non gravida.
              <br />
              <br />
              Vivamus auctor interdum hendrerit. Pellentesque non tortor eu arcu
              volutpat pharetra a eget ipsum. Morbi suscipit mi ut justo
              commodo, at semper risus eleifend. Curabitur pharetra auctor mi,
              vel egestas magna pellentesque ac. Suspendisse augue nulla, porta
              et sem in, consequat dictum augue. Duis quis facilisis leo. Morbi
              porta purus eu tincidunt cursus. Praesent efficitur fringilla quam
              eget pellentesque. Duis urna nunc, pharetra sit amet leo at,
              congue egestas elit. Vivamus congue aliquam libero, a euismod
              sapien viverra vitae. Integer libero justo, sodales non tincidunt
              sed, blandit eget lacus. Aliquam tempor nec ex non eleifend.
              <br />
              <br />
              Praesent accumsan non sem ut rhoncus. Vestibulum ante ipsum primis
              in faucibus orci luctus et ultrices posuere cubilia curae;
              Praesent congue pharetra ipsum, ultricies pellentesque lorem
              consectetur eget. Cras finibus, nisl vel sollicitudin ullamcorper,
              leo odio bibendum elit, at imperdiet ligula ipsum nec tortor.
              Vivamus ultrices lectus nunc, quis cursus mi laoreet vel. Sed id
              lectus placerat, tempor lectus a, mattis nunc. Phasellus aliquet
              nibh metus, vitae iaculis sem pretium ac. Vestibulum vulputate
              dapibus accumsan. Sed pharetra ligula at finibus volutpat.
              <br />
              <br />
              Praesent accumsan non sem ut rhoncus. Vestibulum ante ipsum primis
              in faucibus orci luctus et ultrices posuere cubilia curae;
              Praesent congue pharetra ipsum, ultricies pellentesque lorem
              consectetur eget. Cras finibus, nisl vel sollicitudin ullamcorper,
              leo odio bibendum elit, at imperdiet ligula ipsum nec tortor.
              Vivamus ultrices lectus nunc, quis cursus mi laoreet vel. Sed id
              lectus placerat, tempor lectus a, mattis nunc. Phasellus aliquet
              nibh metus, vitae iaculis sem pretium ac. Vestibulum vulputate
              dapibus accumsan. Sed pharetra ligula at finibus volutpat.
            </Dialog.Description>
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="plain" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
              OK
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

      <Dialog
        {...args}
        isOpen={open && dialogSize === 'xl'}
        size="xl"
        onClose={handleClose}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Extra Large Dialog</Dialog.Title>
            <Dialog.Close />
          </Dialog.Header>
          <Dialog.Body>
            <Dialog.Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
              lectus convallis, ultrices dui non, varius massa. Quisque tempus
              convallis purus, ut interdum nulla venenatis vitae. Proin
              imperdiet tellus purus, id convallis leo porttitor ac. Phasellus
              maximus facilisis mauris, vel pretium lacus scelerisque a. Ut
              mauris dui, aliquet ut felis quis, aliquam vehicula massa. In eget
              ipsum eleifend, facilisis metus ac, luctus nunc. Duis tristique
              laoreet ipsum nec cursus. Sed quis bibendum odio, ac laoreet quam.
              Donec dignissim in est non gravida.
              <br />
              <br />
              Vivamus auctor interdum hendrerit. Pellentesque non tortor eu arcu
              volutpat pharetra a eget ipsum. Morbi suscipit mi ut justo
              commodo, at semper risus eleifend. Curabitur pharetra auctor mi,
              vel egestas magna pellentesque ac. Suspendisse augue nulla, porta
              et sem in, consequat dictum augue. Duis quis facilisis leo. Morbi
              porta purus eu tincidunt cursus. Praesent efficitur fringilla quam
              eget pellentesque. Duis urna nunc, pharetra sit amet leo at,
              congue egestas elit. Vivamus congue aliquam libero, a euismod
              sapien viverra vitae. Integer libero justo, sodales non tincidunt
              sed, blandit eget lacus. Aliquam tempor nec ex non eleifend.
              <br />
              <br />
              Praesent accumsan non sem ut rhoncus. Vestibulum ante ipsum primis
              in faucibus orci luctus et ultrices posuere cubilia curae;
              Praesent congue pharetra ipsum, ultricies pellentesque lorem
              consectetur eget. Cras finibus, nisl vel sollicitudin ullamcorper,
              leo odio bibendum elit, at imperdiet ligula ipsum nec tortor.
              Vivamus ultrices lectus nunc, quis cursus mi laoreet vel. Sed id
              lectus placerat, tempor lectus a, mattis nunc. Phasellus aliquet
              nibh metus, vitae iaculis sem pretium ac. Vestibulum vulputate
              dapibus accumsan. Sed pharetra ligula at finibus volutpat.
              <br />
              <br />
              Praesent accumsan non sem ut rhoncus. Vestibulum ante ipsum primis
              in faucibus orci luctus et ultrices posuere cubilia curae;
              Praesent congue pharetra ipsum, ultricies pellentesque lorem
              consectetur eget. Cras finibus, nisl vel sollicitudin ullamcorper,
              leo odio bibendum elit, at imperdiet ligula ipsum nec tortor.
              Vivamus ultrices lectus nunc, quis cursus mi laoreet vel. Sed id
              lectus placerat, tempor lectus a, mattis nunc. Phasellus aliquet
              nibh metus, vitae iaculis sem pretium ac. Vestibulum vulputate
              dapibus accumsan. Sed pharetra ligula at finibus volutpat.
            </Dialog.Description>
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="primary" onClick={handleClose}>
              OK
            </Button>
            <Button variant="plain" onClick={handleClose}>
              Cancel
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
}

export const WithDisabledEscAndOutsideClick = Template.bind({});

WithDisabledEscAndOutsideClick.args = {
  closeOnEscClick: false,
  closeOnOutsideClick: false,
};

export default meta;

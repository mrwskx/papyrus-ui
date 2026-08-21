import type { StoryFn } from '@storybook/react';
import cn from 'classnames';
import { capitalize } from 'lodash';
import { Fragment } from 'react';

import { Heading } from '../heading';

import { Table } from './table';
import type { TableProps, TableSize } from './table';

const sizes: TableSize[] = ['sm', 'md'];

export default {
  title: 'Data Display/Table',
  component: Table,
  args: {
    children: (
      <>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
          </tr>
          <tr>
            <td>Data 4</td>
            <td>Data 5</td>
            <td>Data 6</td>
          </tr>
        </tbody>
      </>
    ),
  },
};

const Template: StoryFn<TableProps> = function Template(args) {
  return <Table {...args} />;
};

export const Basic = Template.bind({});

export function Sizes(args: TableProps) {
  return (
    <>
      {sizes.map((size, i) => (
        <Fragment key={size}>
          <Heading className={cn('mb-3', i > 0 ? 'mt-6' : 'mt-0')} level={3}>
            {capitalize(size)}
          </Heading>

          <Template {...args} key={size} size={size} />
        </Fragment>
      ))}
    </>
  );
}

export const Striped = Template.bind({});

Striped.args = {
  striped: true,
};

export const Bordered = Template.bind({});

Bordered.args = {
  bordered: true,
};

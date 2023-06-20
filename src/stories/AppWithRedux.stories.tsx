import type { Meta, StoryObj } from '@storybook/react';

import {AddItemForm, AddItemFormPropsType} from '../AddItemForm';
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField/TextField';
import {IconButton} from '@mui/material';
import {AddBox} from '@mui/icons-material';
import AppWithRedux from '../AppWithRedux';
import {store} from '../state/store';
import {Provider} from 'react-redux';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppWithRedux> = {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators:[ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AppWithReduxStory: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args

};

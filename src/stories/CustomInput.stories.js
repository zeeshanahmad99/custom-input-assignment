import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import CustomInput from '../components/CustomInput';

export default {
  title: 'MyCustomInput',
  decorators: [withKnobs],
};

export const Input = () => ({
  components: { CustomInput },
  template: '<CustomInput />',
  methods: {
    mirrorClick: action('button-clicked'),
    cancelInput: action('button-clicked'),
    linkClicked: action('button-clicked'),
  },
});

Input.story = {
  name: 'CustomInput',
};

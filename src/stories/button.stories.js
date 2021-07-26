import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import MyButton from '../components/button.vue';

export default {
  title: 'MyButton',
  decorators: [withKnobs],
};

export const Button = () => ({
  props: {
    name: {
      type: String,
      default: text('Name', 'MyButton!'),
    },
    isLoading: {
      type: Boolean,
      default: boolean('isLoading', true),
    },
  },
  components: { MyButton },
  template:
    '<MyButton :name="name" :isLoading="isLoading" @buttonClicked="action">Click Me!</MyButton>',
  methods: {
    action: action('button-clicked'),
  },
});

Button.story = {
  name: 'Button',
};

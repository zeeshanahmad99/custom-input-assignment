import { styled } from '@egoist/vue-emotion';
import { Component, Vue } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const Box = styled('button')`
  border: 0;
  outline: 0;
  width: 15%;
  height: 100%;
  background: #f0f2f6;
  color: #494c53;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;

  &.box-orange {
    background: #e74f30;
    color: white;
  }

  &.box-white {
    background-color: white;
  }

  &:hover {
    background: #bcc2cb;
  }

  &:active {
    background: #494c53;
  }

  &:active svg[data-icon],
  &.box-orange svg[data-icon] {
    color: white;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 80%;
`;

@Component({
  components: { Box, Icon },
  props: {
    boxClass: String,
    icon: String,
    show: Boolean,
    handleClick: { type: Function, default: () => {} },
  },
})
export default class InputBox extends Vue {
  render() {
    if (!this.$props.show) return null;

    return (
      <box class={this.$props.boxClass} onClick={this.$props.handleClick}>
        <icon icon={this.$props.icon} />
      </box>
    );
  }
}

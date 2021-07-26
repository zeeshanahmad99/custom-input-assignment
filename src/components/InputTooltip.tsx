import { styled } from '@egoist/vue-emotion';
import { Component, Vue } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Link } from './types';

const ToolTip = styled('div')`
  position: absolute;
  left: -2%;
  top: -50%;
  background: white;
  border-radius: 12px;
  min-width: 150px;
  transform: translateX(-100%);
`;

const ToolTipContent = styled('div')`
  overflow: hidden;
  border-radius: 12px;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateX(100%) translateY(-50%);
    border: 5px solid transparent;
    border-left-color: white;
  }
`;

const ToolTipItem = styled('div')`
  padding: 7px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #f0f2f6;
  }
`;

const TooltipText = styled('p')`
  margin: 0;
  margin-left: 5px;
  font-size: 0.9rem;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #494c53;
  font-size: 0.9rem;
  width: 16px;
  height: 16px;
`;

@Component({
  props: ['showTool', 'linkTypes', 'linkClicked'],
  // eslint-disable-next-line object-curly-newline
  components: { ToolTip, ToolTipContent, ToolTipItem, TooltipText, Icon },
})
export default class InputTooltip extends Vue {
  render() {
    if (!this.$props.showTool) return null;

    return (
      <tool-tip ref="tooltip">
        <tool-tip-content>
          {this.$props.linkTypes.map((link: Link, index: number) => (
            <tool-tip-item key={link.name} onClick={() => this.$props.linkClicked(index)}>
              <icon icon={link.icon} />
              <tooltip-text>{link.text}</tooltip-text>
            </tool-tip-item>
          ))}
        </tool-tip-content>
      </tool-tip>
    );
  }
}

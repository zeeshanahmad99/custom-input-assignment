import { styled } from '@egoist/vue-emotion';
import { Component, Vue } from 'vue-property-decorator';
import InputTooltip from './InputTooltip';
import InputBox from './InputBox';

const CustomInputContainer = styled('div')`
  position: relative;

  & .custom-input {
    height: 40px;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #bcc2cb;
    position: relative;
    flex: 1;
  }

  & .custom-input.orange-border {
    border-color: #e74f30;
  }
`;

const InputContainer = styled('div')`
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  flex: 1;
`;

const InputMirror = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
`;

const AppInput = styled('input')`
  border: 0;
  outline: none;
  padding: 10px;
  flex: 1;
`;

@Component({
  components: {
    InputTooltip,
    InputBox,
    CustomInputContainer,
    InputContainer,
    InputMirror,
    AppInput,
  },
})
export default class CustomInput extends Vue {
  $refs!: {
    input: HTMLInputElement;
    tooltip: any;
  };

  showTool = false;

  isEdit = false;

  value = '';

  selectedLink = 0;

  inputValid = true;

  linkTypes = [
    {
      icon: 'envelope',
      text: 'Link to Email',
      name: 'email',
      type: 'email',
      placeholder: 'john@gmail.com',
      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    {
      icon: 'copy',
      text: 'Link to Page',
      name: 'page',
      type: 'url',
      placeholder: 'www.google.com',
      pattern: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
    },
    {
      icon: 'mobile-alt',
      text: 'Link to Phone',
      name: 'phone',
      type: 'tel',
      placeholder: '03099188777',
      pattern: '0[0-9]{10}',
    },
  ];

  mounted() {
    document.addEventListener('mousedown', this.listener.bind(this));
    document.addEventListener('touchstart', this.listener.bind(this));
  }

  unmounted() {
    document.removeEventListener('mousedown', this.listener.bind(this));
    document.removeEventListener('touchstart', this.listener.bind(this));
  }

  validateInput(value: string): boolean {
    const { pattern } = this.linkTypes[this.selectedLink];
    const isValid = !!value.match(pattern);
    this.inputValid = isValid;
    return isValid;
  }

  inputChange(e: any) {
    const { value } = e.target;
    this.value = value;
    const isValid = this.validateInput(value);
    if (e.key === 'Enter' && isValid) {
      this.isEdit = false;
      this.$refs.input.blur();
    }
  }

  listener(event: Event) {
    if (
      // eslint-disable-next-line operator-linebreak
      !this.$refs.tooltip.$refs.tooltip ||
      this.$refs.tooltip.$refs.tooltip.contains(event.target)
    ) {
      return;
    }
    this.showTool = false;
  }

  mirrorClick() {
    this.isEdit = true;
    this.$refs.input.focus();
    this.validateInput(this.value);
  }

  cancelInput() {
    this.value = '';
    this.isEdit = false;
    this.inputValid = true;
  }

  linkClicked(link: number) {
    this.selectedLink = link;
    this.showTool = false;
    this.value = '';
  }

  toggleTool() {
    this.showTool = !this.showTool;
  }

  checkClick() {
    this.isEdit = !this.isEdit;
  }

  deleteClick() {
    this.value = '';
  }

  render() {
    return (
      <custom-input-container>
        <div class={`custom-input ${this.inputValid && this.isEdit ? 'orange-border' : ''}`}>
          <input-box
            show={!this.isEdit}
            icon={this.linkTypes[this.selectedLink].icon}
            handleClick={this.toggleTool}
          />

          <input-container>
            <app-input
              type={this.linkTypes[this.selectedLink].type}
              placeholder={this.linkTypes[this.selectedLink].placeholder}
              value={this.value}
              onKeyup={this.inputChange}
              ref="input"
            />
            {!this.isEdit && <input-mirror onClick={this.mirrorClick} />}
          </input-container>

          <input-box
            show={this.isEdit}
            boxClass={this.inputValid && this.value.length ? 'box-orange' : ''}
            handleClick={this.inputValid && this.value.length ? this.checkClick : () => {}}
            icon="check"
          />

          <input-box show={this.isEdit} handleClick={this.cancelInput} icon="times" />

          <input-box
            boxClass="box-white"
            show={!!this.value.length && !this.isEdit}
            icon="trash"
            handleClick={this.deleteClick}
          />

          <input-box show={!this.isEdit} icon="external-link-alt" />
        </div>
        <input-tooltip
          showTool={this.showTool}
          linkTypes={this.linkTypes}
          linkClicked={this.linkClicked}
          ref="tooltip"
        />
      </custom-input-container>
    );
  }
}

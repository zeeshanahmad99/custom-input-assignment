import { Component, Vue } from 'vue-property-decorator';
import CustomInput from './components/CustomInput';

@Component({ components: { CustomInput } })
export default class App extends Vue {
  render() {
    console.log(this);
    return <custom-input />;
  }
}

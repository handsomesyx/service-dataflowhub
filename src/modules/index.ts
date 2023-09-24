import { CreateAndsellModule } from './createAndsell/createAndsell.module';
import { ExampleModule } from './expamle/example.module';

/** 框架需要加载的模块，在此处注册后会自动导入 */
const modules = [ExampleModule, CreateAndsellModule];

export default modules;

import { combineReducers } from 'redux';
import AuthReducer from './auth';
import ApplicationReducer from './application';
import UserReducer from './user';
import RoleReducer from './role';
import PermissionReducer from './permission';
import InverterReducer from './inverter';
import BatteryReducer from './battery';
import HeatpumpReducer from './heatpump';
import ConstructionReducer from './construction';
import CableReducer from './cable';
import PanelReducer from './panel';
import ChargingstationReducer from './chargingstation';

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  role: RoleReducer,
  permission: PermissionReducer,
  panel: PanelReducer,
  inverter: InverterReducer,
  battery: BatteryReducer,
  heatpump: HeatpumpReducer,
  construction: ConstructionReducer,
  cable: CableReducer,
  chargingstation: ChargingstationReducer,
  application: ApplicationReducer,
});

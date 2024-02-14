import AstrocastMessageShow from './astrocast/AstrocastMessageShow';
import AstrocastMessageList from './astrocast/AstrocastMessageList';
import AstrocastDeviceShow from './astrocast/AstrocastDeviceShow';
import AstrocastDeviceList from './astrocast/AstrocastDeviceList';
import NothingList from '../NothingToSee';

import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import RouterIcon from '@mui/icons-material/Router';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

import SensorCreate from './SensorCreate';
import SensorEdit from './SensorEdit';
import SensorList from './SensorList';
import SensorShow from './SensorShow';

const parameters = {
    list: NothingList,
    options: {
        label: 'Sensor Parameters',
    },
};

const astrocast_messages = {
    show: AstrocastMessageShow,
    list: AstrocastMessageList,
    options: {
        label: 'Astrocast Messages',
    },
    icon: SatelliteAltIcon,
};

const astrocast_devices = {
    show: AstrocastDeviceShow,
    list: AstrocastDeviceList,
    options: {
        label: 'Astrocast Devices',
    },
    icon: RouterIcon,
};

const sensors = {
    create: SensorCreate,
    edit: SensorEdit,
    show: SensorShow,
    list: SensorList,
    options: {
        label: 'Sensor Inventory',
    },
    icon: DeviceThermostatIcon,
};

export default {
    sensors: sensors,
    parameters: parameters,
    astrocast_messages: astrocast_messages,
    astrocast_devices: astrocast_devices,
};
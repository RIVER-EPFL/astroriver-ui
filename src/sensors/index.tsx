import SensorCreate from './SensorCreate';
import SensorEdit from './SensorEdit';
import SensorList from './SensorList';
import SensorShow from './SensorShow';
import SensorDataCreate from './SensorDataCreate';
import SensorDataEdit from './SensorDataEdit';
import SensorDataShow from './SensorDataShow';
import AstrocastMessageShow from './astrocast/AstrocastMessageShow';
import AstrocastMessageList from './astrocast/AstrocastMessageList';
import AstrocastDeviceShow from './astrocast/AstrocastDeviceShow';
import AstrocastDeviceList from './astrocast/AstrocastDeviceList';
import NothingList from '../NothingToSee';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';

const sensor = {
    create: SensorCreate,
    edit: SensorEdit,
    list: SensorList,
    show: SensorShow,
    options: {
        label: 'Sensors',
    },
};


const parameters = {
    // create: SensorDataCreate,
    // edit: SensorDataEdit,
    // show: SensorDataShow,
    list: NothingList,
    options: {
        label: 'Sensor Parameters',
    },
};

const astrocast_messages = {
    // create: SensorDataCreate,
    // edit: SensorDataEdit,
    show: AstrocastMessageShow,
    list: AstrocastMessageList,
    options: {
        label: 'Astrocast',
    },
    icon: SatelliteAltIcon,
};

const astrocast_devices = {
    // create: SensorDataCreate,
    // edit: SensorDataEdit,
    show: AstrocastDeviceShow,
    list: AstrocastDeviceList,
    options: {
        label: 'Astrocast Devices',
    },
    icon: SatelliteAltIcon,
};
export default {
    sensor: sensor,
    parameters: parameters,
    astrocast_messages: astrocast_messages,
    astrocast_devices: astrocast_devices,
};
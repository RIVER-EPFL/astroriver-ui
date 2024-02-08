import SensorCreate from '../stations/StationCreate';
import StationEdit from '../stations/StationEdit';
import SensorList from '../stations/StationList';
import StationShow from '../stations/StationShow';

import AstrocastMessageShow from './astrocast/AstrocastMessageShow';
import AstrocastMessageList from './astrocast/AstrocastMessageList';
import AstrocastDeviceShow from './astrocast/AstrocastDeviceShow';
import AstrocastDeviceList from './astrocast/AstrocastDeviceList';
import NothingList from '../NothingToSee';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import RouterIcon from '@mui/icons-material/Router';
import FactoryIcon from '@mui/icons-material/Factory';


const sensor = {
    create: SensorCreate,
    edit: StationEdit,
    list: SensorList,
    show: StationShow,
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
        label: 'Astrocast Messages',
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
    icon: RouterIcon,
};
export default {
    sensor: sensor,
    parameters: parameters,
    astrocast_messages: astrocast_messages,
    astrocast_devices: astrocast_devices,
};
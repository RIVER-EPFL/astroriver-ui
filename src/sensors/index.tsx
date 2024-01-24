import SensorCreate from './SensorCreate';
import SensorEdit from './SensorEdit';
import SensorList from './SensorList';
import SensorShow from './SensorShow';
import SensorDataCreate from './SensorDataCreate';
import SensorDataEdit from './SensorDataEdit';
import SensorDataShow from './SensorDataShow';
import AstrocastShow from './astrocast/AstrocastShow';
import AstrocastList from './astrocast/AstrocastList';
import NothingList from '../NothingToSee';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';

const sensor = {
    create: SensorCreate,
    edit: SensorEdit,
    list: SensorList,
    show: SensorShow,
    options: {
        label: 'Sensor Status',
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

const astrocast = {
    // create: SensorDataCreate,
    // edit: SensorDataEdit,
    show: AstrocastShow,
    list: AstrocastList,
    options: {
        label: 'Astrocast',
    },
    icon: SatelliteAltIcon,
};


export default {
    sensor: sensor,
    parameters: parameters,
    astrocast: astrocast,
};
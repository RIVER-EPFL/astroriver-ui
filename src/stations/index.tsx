import StationCreate from './StationCreate';
import StationEdit from './StationEdit';
import StationList from './StationList';
import StationShow from './StationShow';
import StationSensorEdit from './sensors/StationSensorEdit';
import StationSensorList from './sensors/StationSensorList';
import StationSensorShow from './sensors/StationSensorShow';
import StationSensorCreate from './sensors/StationSensorCreate';
import FactoryIcon from '@mui/icons-material/Factory';


const stations = {
    create: StationCreate,
    edit: StationEdit,
    list: StationList,
    show: StationShow,
    options: {
        label: 'Stations',
    },
    icon: FactoryIcon,
};



const sensors = {
    create: StationSensorCreate,
    edit: StationSensorEdit,
    show: StationSensorShow,
    list: StationSensorList,
    options: {
        label: 'Station Sensors',
    },
};

export default {
    sensors: sensors,
    stations: stations,
};
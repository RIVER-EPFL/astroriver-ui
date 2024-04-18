import StationCreate from './StationCreate';
import StationEdit from './StationEdit';
import StationList from './StationList';
import StationShow from './StationShow';
import StationSensorEdit from './sensors/StationSensorEdit';
import StationSensorList from './sensors/StationSensorList';
import StationSensorShow from './sensors/StationSensorShow';
import StationSensorCreate from './sensors/StationSensorCreate';
import StationDataEdit from './data/StationDataEdit';
import StationDataList from './data/StationDataList';
import StationDataShow from './data/StationDataShow';
import StationDataCreate from './data/StationDataCreate';
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
    recordRepresentation: (record) => `${record.name} (${record.acronym}) - ${record.catchment_name}`
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

const data = {
    // create: StationDataCreate,
    edit: StationDataEdit,
    show: StationDataShow,
    list: StationDataList,
    options: {
        label: 'Station Data',
    },
};

export default {
    sensors: sensors,
    stations: stations,
    data: data
};
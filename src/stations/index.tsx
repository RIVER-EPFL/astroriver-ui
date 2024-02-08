import StationCreate from './StationCreate';
import StationEdit from './StationEdit';
import StationList from './StationList';
import StationShow from './StationShow';
import FactoryIcon from '@mui/icons-material/Factory';


export default {
    create: StationCreate,
    edit: StationEdit,
    list: StationList,
    show: StationShow,
    options: {
        label: 'Stations',
    },
    icon: FactoryIcon,
};

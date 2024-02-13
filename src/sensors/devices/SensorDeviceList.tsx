import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    usePermissions,
    TopToolbar,
    CreateButton,
    ExportButton,
    NumberField,
    FunctionField,
    DateField,
    ReferenceManyCount,
    ArrayField,
    SavedQueriesList,
    FilterLiveSearch,
    FilterList,
    FilterListItem,
    BooleanField
} from "react-admin";
import { Card, CardContent } from '@mui/material';
import MailIcon from '@mui/icons-material/MailOutline';
import CategoryIcon from '@mui/icons-material/LocalOffer';
import Brightness1TwoToneIcon from '@mui/icons-material/Brightness1TwoTone';
const SensorDeviceListListActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><CreateButton /></>}
            <ExportButton />
        </TopToolbar>
    );
}

const SensorDeviceList = () => {
    const { permissions } = usePermissions();

    // Set to green icon
    const TrueIcon = () => <Brightness1TwoToneIcon color="success" />;
    // Set to red icon
    const FalseIcon = () => <Brightness1TwoToneIcon color="error" />; TrueIcon

    return (
        <List disableSyncWithLocation
            actions={<SensorDeviceListListActions />}
            perPage={25}
        >
            <Datagrid
                bulkActionButtons={permissions === 'admin' ? true : false}
                rowClick="show"
            >
                <TextField source="parameter_name" />
                <TextField source="parameter_acronym" />
                <TextField source="parameter_unit" />
                <TextField source="parameter_db_name" />
                <TextField source="serial_number" />
                <TextField source="model" />

                <DateField
                    label="Installed on"
                    source="installed_on"
                    sortable={false}
                    showTime={true}
                />
                <DateField
                    label="Last Updated"
                    source="calibrated_on"
                    sortable={false}
                    showTime={true}
                />
            </Datagrid>
        </List >

    )
};

export default SensorDeviceList;

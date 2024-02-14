import {
    List,
    Datagrid,
    TextField,
    usePermissions,
    TopToolbar,
    CreateButton,
    ExportButton,
    DateField,
} from "react-admin";
import Brightness1TwoToneIcon from '@mui/icons-material/Brightness1TwoTone';
const SensorListActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><CreateButton /></>}
            <ExportButton />
        </TopToolbar>
    );
}

const SensorList = () => {
    const { permissions } = usePermissions();

    // Set to green icon
    const TrueIcon = () => <Brightness1TwoToneIcon color="success" />;
    // Set to red icon
    const FalseIcon = () => <Brightness1TwoToneIcon color="error" />; TrueIcon

    return (
        <List disableSyncWithLocation
            actions={<SensorListActions />}
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
                    label="Last Updated"
                    source="calibrated_on"
                    sortable={false}
                    showTime={true}
                />
            </Datagrid>
        </List >

    )
};

export default SensorList;

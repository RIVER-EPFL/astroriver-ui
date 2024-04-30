import {
    List,
    Datagrid,
    TextField,
    usePermissions,
    TopToolbar,
    CreateButton,
    ExportButton,
    DateField,
    NumberField,
    ReferenceField,
    FunctionField,
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
        <List storeKey={false}
            actions={<SensorListActions />}
            perPage={25}
        >
            <Datagrid
                bulkActionButtons={permissions === 'admin' ? true : false}
                rowClick="show"
            >
                <ReferenceField
                    label="Station"
                    source="station_id"
                    reference="stations"
                    link="show"
                    emptyText="N/A"
                    sortable={false}
                >
                    <TextField source="name" />
                </ReferenceField>
                <NumberField source="sensor_position" label="Position" />
                <ReferenceField
                    label="Sensor"
                    source="sensor_id"
                    reference="sensors"
                    link="show"
                    emptyText="N/A"
                    sortable={false}
                >
                    <FunctionField render={(record) => `${record.model} (${record.serial_number})`} />
                </ReferenceField>
                <ReferenceField
                    label="Parameter"
                    source="sensor.parameter_id"
                    reference="sensor_parameters"
                    link="show"
                    emptyText="N/A"
                    sortable={false}
                >
                    <FunctionField render={(record) => `${record.name} (${record.unit})`} />
                </ReferenceField>
                <DateField
                    label="Installed on"
                    source="installed_on"
                    sortable={false}
                    showTime={true}
                />
            </Datagrid>
        </List >

    )
};

export default SensorList;

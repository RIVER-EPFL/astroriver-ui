import {
    List,
    Datagrid,
    TextField,
    usePermissions,
    TopToolbar,
    CreateButton,
    ExportButton,
    DateField,
    ReferenceField,
    FunctionField,
    NumberField,
    WrapperField,
    useRecordContext,
    useGetOne,
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
                <TextField source="model" />
                <TextField source="field_id" label="Field ID" />
                <ReferenceField
                    label="Parameter"
                    source="parameter_id"
                    reference="sensor_parameters"
                    link="show"
                    emptyText="N/A"
                    sortable={false}
                >
                    <FunctionField render={(record) => `${record.name} (${record.unit})`} />
                </ReferenceField>
                <TextField source="serial_number" />
                <ReferenceField
                    label="Assigned Station"
                    source="station_link.station_id"
                    reference="stations"
                    link="show"
                    emptyText="N/A"
                    sortable={false}
                >
                    <TextField source="name" />
                </ReferenceField>
                <DateField
                    label="Last calibrated"
                    source="calibrations[0].calibrated_on"
                    sortable={false}
                    showTime={true}
                />
            </Datagrid>
        </List >

    )
};

export default SensorList;

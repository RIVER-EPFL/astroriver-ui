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
        <List disableSyncWithLocation
            actions={<SensorListActions />}
            perPage={25}
        >
            <Datagrid
                bulkActionButtons={permissions === 'admin' ? true : false}
                rowClick="show"
            >
                <FunctionField label="Parameter" render={(record) => `${record.parameter_name} (${record.parameter_acronym})`} />
                <TextField source="serial_number" />
                <TextField source="model" />
                <ReferenceField
                    label="Assigned Station"
                    source="station_link.station_id"
                    reference="stations"
                    link="show"
                    emptyText="N/A"
                    sortable={false}
                >
                    <TextField source="name" />
                </ReferenceField>;
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

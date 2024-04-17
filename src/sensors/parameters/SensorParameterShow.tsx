import {
    Show,
    SimpleShowLayout,
    TextField,
    EditButton,
    TopToolbar,
    DeleteButton,
    usePermissions,
    DateField,
    useGetRecordId,
    NumberField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

const SensorParameterShowActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><EditButton /><DeleteButton /></>}
        </TopToolbar>
    );
}


const SensorParameterShow = () => {
    const recordId = useGetRecordId();
    console.log("recordId", recordId);
    return (
        <Show actions={<SensorParameterShowActions />}>
            <SimpleShowLayout>
                <TextField source="station.name" />
                <NumberField source="sensor_position" />
                <TextField source="sensor.parameter_name" />
                <TextField source="sensor.parameter_unit" />
                <TextField source="sensor.serial_number" />
                <DateField
                    label="Installed on"
                    source="installed_on"
                    sortable={false}
                    showTime={true}
                />
            </SimpleShowLayout>
        </Show >
    )
};


export default SensorParameterShow;
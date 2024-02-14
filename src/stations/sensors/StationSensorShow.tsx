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
} from 'react-admin'; // eslint-disable-line import/no-unresolved

const SensorShowActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><EditButton /><DeleteButton /></>}
        </TopToolbar>
    );
}


const SensorShow = () => {
    const recordId = useGetRecordId();
    console.log("recordId", recordId);
    return (
        <Show actions={<SensorShowActions />}>
            <SimpleShowLayout>
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
            </SimpleShowLayout>
        </Show >
    )
};


export default SensorShow;
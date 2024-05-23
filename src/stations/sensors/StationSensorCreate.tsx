/* eslint react/jsx-key: off */

import {
    Create,
    SimpleForm,
    TextField,
    DateTimeInput,
    required,
    ReferenceInput,
    SelectInput,
    useRedirect,
    SaveButton,
    Toolbar,
} from 'react-admin';


const CreateToolbar = () => (
    <Toolbar>
        <SaveButton alwaysEnable />
    </Toolbar>
);

const StationSensorCreate = () => {

    const redirect = useRedirect();
    const onSuccess = (record) => {
        // redirect(`/stations/${record.station_id}/show/body${record.sensor_position}`);
        redirect(`/stations/${record.station_id}/show`);
    }
    

    const assignmentText = (record) => {
        console.log("STATION_LINK", record)
        if (record.current_assignment !== null) {
            return "*";
        } else {
            return "";
        }
    }

    return (
        <Create mutationOptions={{ onSuccess }}>
            <SimpleForm toolbar={<CreateToolbar />}>
                <TextField source="id" />
                <ReferenceInput
                    source="sensor_id"
                    reference="sensors"
                    sort={{ field: 'model', order: 'ASC' }}
                >
                    <SelectInput
                        label="Sensor"
                        source="sensor_id"
                        optionText={(record) => `${record.model}:${record.field_id} (${record.parameter.name}) ${assignmentText(record)}`}
                        validate={required()}
                        helperText="Sensors already attached to a station are annotated with *. Using them will remove them from their station."
                    />
                </ReferenceInput>
                <ReferenceInput
                    source="station_id"
                    reference="stations"
                >
                    <SelectInput
                        label="Station"
                        source="station_id"
                        optionText={(record) => `${record.name} (${record.acronym})`}
                        validate={required()}
                    />
                </ReferenceInput>
                <SelectInput
                    source="sensor_position"
                    helperText={false}
                    validate={[required()]}
                    choices={[
                        { id: '1', name: '1' },
                        { id: '2', name: '2' },
                        { id: '3', name: '3' },
                        { id: '4', name: '4' },
                        { id: '5', name: '5' },
                        { id: '6', name: '6' },
                        { id: '7', name: '7' },
                        { id: '8', name: '8' },
                        { id: '9', name: '9' },
                        { id: '10', name: '10' },
                        { id: '11', name: '11' },
                        { id: '12', name: '12' },
                        { id: '13', name: '13' },
                        { id: '14', name: '14' },
                        { id: '15', name: '15' },
                        { id: '16', name: '16' },
                        { id: '17', name: '17' },
                        { id: '18', name: '18' },
                        { id: '19', name: '19' },
                        { id: '20', name: '20' },
                        { id: '21', name: '21' },
                        { id: '22', name: '22' },
                        { id: '23', name: '23' },
                        { id: '24', name: '24' },
                    ]}
                />
                <DateTimeInput
                    source="installed_on"
                    validate={[required()]}
                    defaultValue={new Date()}
                />
            </SimpleForm>
        </Create>
    )
};

export default StationSensorCreate;

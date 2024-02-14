/* eslint react/jsx-key: off */

import {
    Create,
    SimpleForm,
    TextField,
    DateTimeInput,
    required,
    ReferenceInput,
    SelectInput,
} from 'react-admin';


const StationSensorCreate = () => {

    return (
        <Create redirect="list">
            <SimpleForm >
                <TextField source="id" />
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
                <ReferenceInput
                    source="sensor_id"
                    reference="sensors"
                >
                    <SelectInput
                        label="Sensor"
                        source="sensor_id"
                        optionText={(record) => `${record.parameter_db_name} (${record.model}:${record.serial_number})`}
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
                    ]}
                />
                <DateTimeInput source="installed_on" validate={[required()]} />
            </SimpleForm>
        </Create>
    )
};

export default StationSensorCreate;

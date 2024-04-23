/* eslint react/jsx-key: off */

import {
    Create,
    SimpleForm,
    TextField,
    TextInput,
    required,
    DateTimeInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
} from 'react-admin';


const SensorCreate = () => {

    return (
        <Create redirect="list">
            <SimpleForm >
                <TextField source="id" />
                <TextInput source="serial_number" validate={[required()]} />
                <TextInput source="model" validate={[required()]} />
                <ReferenceInput
                    source="parameter_id"
                    reference="sensor_parameters"
                >
                    <SelectInput
                        label="Parameter"
                        source="parameter_id"
                        optionText={(record) => `${record.name} (${record.unit})`}
                        validate={required()}
                    />
                </ReferenceInput>
                <DateTimeInput source="calibrated_on" validate={[required()]} />

            </SimpleForm>
        </Create>
    )
};

export default SensorCreate;

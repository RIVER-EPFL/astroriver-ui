/* eslint react/jsx-key: off */

import {
    Create,
    SimpleForm,
    TextField,
    TextInput,
    required,
    DateTimeInput,
    NumberInput,
} from 'react-admin';


const SensorCreate = () => {

    return (
        <Create redirect="list">
            <SimpleForm >
                <TextField source="id" />
                <TextInput source="parameter_name" validate={[required()]} />
                <TextInput source="parameter_acronym" validate={[required()]} />
                <TextInput source="parameter_unit" validate={[required()]} />
                <TextInput source="parameter_db_name" validate={[required()]} />
                <TextInput source="serial_number" validate={[required()]} />
                <TextInput source="model" validate={[required()]} />
                <DateTimeInput source="calibrated_on" validate={[required()]} />
                <NumberInput source="slope" />
                <NumberInput source="intercept" />
                <NumberInput source="min_range" />
                <NumberInput source="max_range" />
            </SimpleForm>
        </Create>
    )
};

export default SensorCreate;

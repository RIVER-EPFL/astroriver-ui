/* eslint react/jsx-key: off */

import {
    Create,
    SimpleForm,
    TextField,
    TextInput,
    required,
    DateTimeInput,
} from 'react-admin';


const SensorCreate = () => {

    return (
        <Create redirect="list">
            <SimpleForm >
                <TextField source="id" />
                <TextInput source="parameter_name" validate={[required()]} />
                <TextInput source="parameter_acronym" />
                <TextInput source="parameter_unit" />
                <TextInput source="parameter_db_name" />
                <TextInput source="serial_number" />
                <TextInput source="model" />
                <DateTimeInput source="calibrated_on" />
            </SimpleForm>
        </Create>
    )
};

export default SensorCreate;

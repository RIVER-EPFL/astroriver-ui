/* eslint react/jsx-key: off */
import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    DateTimeInput,
} from 'react-admin';

const SensorEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput disabled label="Id" source="id" />
                <TextInput source="parameter_name" validate={[required()]} />
                <TextInput source="parameter_acronym" />
                <TextInput source="parameter_unit" />
                <TextInput source="parameter_db_name" />
                <TextInput source="serial_number" />
                <TextInput source="model" />
                <DateTimeInput source="calibrated_on" />
            </SimpleForm>
        </Edit>
    )
};

export default SensorEdit;

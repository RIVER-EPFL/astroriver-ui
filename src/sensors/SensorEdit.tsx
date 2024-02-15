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
                <TextInput source="parameter_acronym" validate={[required()]} />
                <TextInput source="parameter_unit" validate={[required()]} />
                <TextInput source="parameter_db_name" validate={[required()]} />
                <TextInput source="serial_number" validate={[required()]} />
                <TextInput source="model" validate={[required()]} />
                <DateTimeInput source="calibrated_on" validate={[required()]} />
            </SimpleForm>
        </Edit>
    )
};

export default SensorEdit;

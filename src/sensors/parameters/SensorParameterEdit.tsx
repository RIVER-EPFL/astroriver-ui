/* eslint react/jsx-key: off */
import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    DateTimeInput,
    ReferenceInput,
    SelectInput,
} from 'react-admin';

const SensorParameterEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput disabled label="Id" source="id" />
                <TextInput source="name" />
                <TextInput source="acronym" />
                <TextInput source="unit" />
            </SimpleForm>
        </Edit>
    )
};

export default SensorParameterEdit;

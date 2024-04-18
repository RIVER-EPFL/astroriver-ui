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
    TextInput,
} from 'react-admin';



const SensorParameterCreate = () => {

    return (
        <Create >
            <SimpleForm >
                <TextField source="id" />
                <TextInput disabled label="Id" source="id" />
                <TextInput source="name" />
                <TextInput source="acronym" />
                <TextInput source="unit" />
            </SimpleForm>
        </Create>
    )
};

export default SensorParameterCreate;

/* eslint react/jsx-key: off */
import * as React from 'react';
import { useMutation } from 'react-query';
import {
    Create,
    SimpleForm,
    TextField,
    TextInput,
    required,
    FileInput,
    FileField,
    ReferenceInput,
    SelectInput,
    useDataProvider,
    SaveButton,
    Toolbar,
    useNotify,
    useRedirect,
    DeleteButton,
    useRecordContext,
    useSaveContext,
    SaveContextProvider,
} from 'react-admin';


const SensorCreate = () => {

    return (
        <Create redirect="list">
            <SimpleForm >
                <TextField source="id" />
                <TextInput source="name" validate={[required()]} />
                <TextInput source="description" />
                <TextInput source="comment" />
            </SimpleForm>
        </Create>
    )
};

export default SensorCreate;

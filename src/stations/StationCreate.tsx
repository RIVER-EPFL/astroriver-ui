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
                <ReferenceInput
                    source="associated_astrocast_device"
                    reference="astrocast_devices"
                >
                    <SelectInput
                        label="Astrocast Device"
                        source="associated_astrocast_device"
                        optionText={(record) => `${record.name} (${record.deviceTypeName})`}
                        validate={required()}
                    />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    )
};

export default SensorCreate;

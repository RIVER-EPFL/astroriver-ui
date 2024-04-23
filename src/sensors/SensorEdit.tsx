/* eslint react/jsx-key: off */
import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    DateTimeInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    TextField,
    ArrayInput,
    SimpleFormIterator,
    useRecordContext,
} from 'react-admin';

const SensorEdit = () => {
    return (
        <Edit redirect="show">
            <SimpleForm>
                <TextInput disabled label="Id" source="id" />
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
                <TextInput source="serial_number" validate={[required()]} />
                <TextInput source="model" validate={[required()]} />
                <ArrayInput source="calibrations">
                    <SimpleFormIterator inline>
                        <DateTimeInput source="calibrated_on" validate={[required()]} />
                        <NumberInput source="slope" validate={[required()]} />
                        <NumberInput source="intercept" validate={[required()]} />
                        <NumberInput source="min_range" validate={[required()]} />
                        <NumberInput source="max_range" validate={[required()]} />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
    )
};

export default SensorEdit;

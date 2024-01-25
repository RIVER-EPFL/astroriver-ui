// import fakeRestProvider from 'ra-data-fakerest';
import { DataProvider } from 'react-admin';
import Keycloak from 'keycloak-js';


const delayedDataProvider = new Proxy(sometimesFailsDataProvider, {
    get: (target, name) => (resource, params) => {
        if (typeof name === 'symbol' || name === 'then') {
            return;
        }
        return new Promise(resolve =>
            setTimeout(
                () =>
                    resolve(sometimesFailsDataProvider[name](resource, params)),
                300
            )
        );
    },
});

export const keyCloakTokenDataProviderBuilder = (
    dataProvider: DataProvider,
    keycloak: Keycloak
) =>
    new Proxy(dataProvider, {
        get: (target, name) => (resource, params) => {
            if (typeof name === 'symbol' || name === 'then') {
                return;
            }
            console.log(
                `Simulating call to dataprovider.${name}() with keycloak token: ${keycloak.token}`
            );
            return dataProvider[name](resource, params);
        },
    });

interface ResponseError extends Error {
    status?: number;
}

export default delayedDataProvider;

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const url1:string = "https://welogixtech.com/projects/eshop/index.php/wp-json/wc/v3"
const authUrl1:string = "https://welogixtech.com/projects/eshop/index.php/wp-json/jwt-auth/v1/token"
const tockenVerfiyUrl1:string = "https://welogixtech.com/projects/eshop/index.php/wp-json/jwt-auth/v1/token/validate"


export const environment = {
  production: false,
  backend_api_url: url1,
  auth_url: authUrl1,
  tocken_verify_url: tockenVerfiyUrl1,
  readOnlyKeys:{
    consumer_key: 'ck_73f0a1fd9dd912e1e289abb4e1170ffe3cf1b420',
    consumer_secret:'cs_3eb4684c24051a2938e9b6429b52ed5a39148a43'
  },
  writeOnlyKeys:{
    consumer_key: 'ck_cb82d89cf189a328376975288a0ad7b3b755ab7d',
    consumer_secret:'cs_3dae43137cd00d065ab714eaaae3be2e9e5e2555'
  },
  states: [
    {value: 'AN', name: 'Andaman and Nicobar Islands'},
    {value: 'AP', name: 'Andhra Pradesh'},
    {value: 'AR', name: 'Arunachal Pradesh'},
    {value: 'AS', name: 'Assam'},
    {value: 'BR', name: 'Bihar'},
    {value: 'CG', name: 'Chandigarh'},
    {value: 'CH', name: 'Chhattisgarh'},
    {value: 'DH', name: 'Dadra and Nagar Haveli'},
    {value: 'DD', name: 'Daman and Diu'},
    {value: 'DL', name: 'Delhi'},
    {value: 'GA', name: 'Goa'},
    {value: 'GJ', name: 'Gujarat'},
    {value: 'HR', name: 'Haryana'},
    {value: 'HP', name: 'Himachal Pradesh'},
    {value: 'JK', name: 'Jammu and Kashmir'},
    {value: 'JH', name: 'Jharkhand'},
    {value: 'KA', name: 'Karnataka'},
    {value: 'KL', name: 'Kerala'},
    {value: 'LD', name: 'Lakshadweep'},
    {value: 'MP', name: 'Madhya Pradesh'},
    {value: 'MH', name: 'Maharashtra'},
    {value: 'MN', name: 'Manipur'},
    {value: 'ML', name: 'Meghalaya'},
    {value: 'MZ', name: 'Mizoram'},
    {value: 'NL', name: 'Nagaland'},
    {value: 'OR', name: 'Odisha'},
    {value: 'PY', name: 'Puducherry'},
    {value: 'PB', name: 'Punjab'},
    {value: 'RJ', name: 'Rajasthan'},
    {value: 'SK', name: 'Sikkim'},
    {value: 'TN', name: 'Tamil Nadu'},
    {value: 'TS', name: 'Telangana'},
    {value: 'TR', name: 'Tripura'},
    {value: 'UK', name: 'Uttarakhand'},
    {value: 'UP', name: 'Uttar Pradesh'},
    {value: 'WB', name: 'West Bengal'}]

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

const url1:string = "https://welogixtech.com/projects/eshop/index.php/wp-json/wc/v3"
const authUrl1:string = "https://welogixtech.com/projects/eshop/index.php/wp-json/jwt-auth/v1/token"
const tockenVerfiyUrl1:string = "https://welogixtech.com/projects/eshop/index.php/wp-json/jwt-auth/v1/token/validate"

export const environment = {
  production: true,
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
  }
};

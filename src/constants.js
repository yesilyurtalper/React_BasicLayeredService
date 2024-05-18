window.PROJECT_TITLE = "React_BasicLayeredService";

if(process.env.NODE_ENV === "development"){
    window.OIDC_CLIENT = "BasicReactClient";
    window.OIDC_AUTHORITY = "http://localhost:8080/realms/local_realm";
    window.API_BASE_URL = "https://localhost:7207/api/";
}
else if(process.env.NODE_ENV === "test"){
    window.OIDC_CLIENT = "BasicReactClient";
    window.OIDC_AUTHORITY = "http://localhost:8080/realms/local_realm";
    window.API_BASE_URL = "https://localhost:7207/api/";
}
else{
    window.OIDC_CLIENT = "BasicReactClient";
    window.OIDC_AUTHORITY = "http://localhost:8080/realms/local_realm";
}
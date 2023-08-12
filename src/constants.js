window.PROJECT_TITLE = "React_BasicLayeredService";

if(process.env.NODE_ENV === "development"){
    window.OIDC_CLIENT = "BasicLayeredServiceClient_React";
    window.OIDC_AUTHORITY = "http://localhost:8080/auth/realms/local_realm";
    window.API_BASE_URL = "https://localhost:7045/api/";
}
else if(process.env.NODE_ENV === "test"){
    window.OIDC_CLIENT = "BasicLayeredServiceClient_React";
    window.OIDC_AUTHORITY = "http://localhost:8080/auth/realms/local_realm";
    window.API_BASE_URL = "https://localhost:7045/api/";
}
else{
    window.OIDC_CLIENT = "BasicLayeredServiceClient_React";
    window.OIDC_AUTHORITY = "http://localhost:8080/auth/realms/local_realm";
}
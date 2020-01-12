const BASE='http://localhost';
const PORT = '8080';

export const API_URLS ={
    PERSONNELS_URL: BASE + ':' + PORT +'/admin/personnes',
    USERS_URL: BASE + ':' + PORT +'/admin/utilisateurs',
    ROLES_URL: BASE + ':' + PORT +'/admin/roles',
    LOGIN_URL: BASE + ':' + PORT + "/api/user",
    GENERATE_USER_URL : BASE + ':' + PORT + "/admin/utilisateurs/generateUser",
    EVENEMENTS_URL : BASE + ':' + PORT + "/api/evenements",
    RESERVED_EVENT_URL : BASE + ':' + PORT + "/api/evenements/active",
    TACHES_URL : BASE + ':' + PORT + "/api/taches",
    SALLES_URL : BASE + ':' + PORT + "/api/salles",
    EQUIPEMENTS_URL : BASE + ':' + PORT + "/api/equipements",
    NOTIFICATION_URL : BASE + ':' + PORT + "/api/notifications",
    COURRIER_URL : BASE + ':' + PORT + "/api/courriers",
    

    
}
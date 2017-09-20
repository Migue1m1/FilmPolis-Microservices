class Utils {
    public static getIds (roles: any[]): any {
        if (roles.length >= 0) {
            let ids: any[] = [];
            for (let i = 0; i < roles.length; i++) {
                ids[i] = roles[i].id;
            }
            return ids;
        }
        else
            return [];
    }

    public static getRolesWithNames (roles: any[], names: any[]) {
        let rolesWithNames: any[] = [];
        for (let i = 0; i < roles.length; i++) {
            rolesWithNames[i] = Object.assign(roles[i], names.filter((data) => {
                return data.id == roles[i].id;
            })[0]._doc);
        }
        return rolesWithNames;
    }
}

export { Utils };
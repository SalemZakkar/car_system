interface PermissionData {
    subject: string,
    action: string,
    fields: string[],
    conditions?: object,
}

type Permission = { role: string, permissions: PermissionData[] };
export const normalizeRoles = (roleField) => {
    if (!roleField) return [];

    if (Array.isArray(roleField)) {
        return roleField
            .filter(Boolean) // loại bỏ null/undefined/empty
            .map((r) => String(r).toLowerCase());
    }

    if (typeof roleField === "string") {
        return roleField
            .split(",")
            .map((r) => r.trim().toLowerCase())
            .filter(Boolean);
    }

    return [];
};

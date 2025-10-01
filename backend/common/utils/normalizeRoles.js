// backend/common/utils/normalizeRole.js
export const normalizeRoles = (roleField) => {
    if (!roleField) return [];

    if (Array.isArray(roleField)) {
        return roleField.map((r) => r.toUpperCase());
    }

    if (typeof roleField === "string") {
        return roleField
            .split(",")
            .map((r) => r.trim().toUpperCase())
            .filter(Boolean);
    }

    return [];
};

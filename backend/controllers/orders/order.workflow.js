// order.workflow.js
export const ALLOWED_STATUS_FLOW = {
    pending: ["waiting_pickup", "canceled"], // Buyer có thể hủy, Seller có thể xác nhận
    waiting_pickup: ["processed", "canceled"], // Seller chuẩn bị/giao hoặc hủy
    processed: ["returned"], // Buyer có thể trả hàng
    canceled: [], // kết thúc
    returned: [] // kết thúc
};

export const STATUS_ROLE_MAP = {
    pending: { canChangeTo: ["SELLER", "BUYER", "ADMIN"] },
    waiting_pickup: { canChangeTo: ["SELLER", "ADMIN"] },
    processed: { canChangeTo: ["SELLER", "ADMIN"] },
    canceled: { canChangeTo: ["BUYER", "ADMIN"] },
    returned: { canChangeTo: ["BUYER", "SELLER", "ADMIN"] }
};

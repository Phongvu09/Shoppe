import { USER_ROLE } from "../../common/constant/enum.js";

// Flow hợp lệ
export const ALLOWED_STATUS_FLOW = {
    pending: ["waiting_pickup", "canceled"],     // từ pending có thể sang waiting_pickup hoặc canceled
    waiting_pickup: ["processed", "canceled"],   // từ waiting_pickup có thể sang processed hoặc canceled
    processed: ["returned"],                     // từ processed có thể sang returned
    canceled: [],                                // kết thúc
    returned: []                                 // kết thúc
};

// Ai có quyền đổi từ trạng thái hiện tại
export const STATUS_ROLE_MAP = {
    pending: [USER_ROLE.SELLER, USER_ROLE.USER, USER_ROLE.ADMIN],
    waiting_pickup: [USER_ROLE.SELLER, USER_ROLE.ADMIN],
    processed: [USER_ROLE.SELLER, USER_ROLE.ADMIN],
    canceled: [],   // canceled rồi thì thôi
    returned: []    // returned rồi thì thôi
};

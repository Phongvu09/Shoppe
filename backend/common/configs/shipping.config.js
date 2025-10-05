// shipping.config.js
export const SHIPPING_RATE = {
    express: 30000,  // ship hoả tốc
    fast: 20000,     // ship nhanh
    pickup: 0,       // tự lấy
    bulky: 50000     // hàng cồng kềnh
};

export function calculateShippingFee(method, totalWeight = 0) {
    let fee = SHIPPING_RATE[method] || 0;

    // Nếu hàng nặng hơn 5kg thì cộng thêm 10k cho mỗi kg vượt quá
    if (method !== "pickup" && totalWeight > 5000) {
        const extraKg = Math.ceil((totalWeight - 5000) / 1000); // số kg vượt quá
        fee += extraKg * 10000;
    }

    return fee;
}

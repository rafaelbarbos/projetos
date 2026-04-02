export const RATES = {
    YUAN_TO_BRL: 0.75,
    SHIPPING_STANDARD: 80,
    SHIPPING_EXPRESS: 150,
    TAX_RATE: 0.60,
    AGENT_FEE_RATE: 0.05,
};

export interface CalculatorInput {
    priceYuan: number;
    weightKg: number;
    shippingMethod: 'standard' | 'express';
    taxed: boolean;
    exchangeRate?: number; // recebe da API quando disponível
}

export interface CalculatorResult {
    productPriceBRL: number;
    shippingCost: number;
    agentFee: number;
    subtotal: number;
    tax: number;
    total: number;
    exchangeRateUsed: number;
}

export function calculateTotal(input: CalculatorInput): CalculatorResult {
    // Usa a taxa da API se disponível, se não usa a taxa fixa
    const rate = input.exchangeRate ?? RATES.YUAN_TO_BRL;
    const productPriceBRL = input.priceYuan * rate;
    const shippingRate = input.shippingMethod === 'standard' 
        ? RATES.SHIPPING_STANDARD 
        : RATES.SHIPPING_EXPRESS;
    const shippingCost = input.weightKg * shippingRate;
    const agentFee = productPriceBRL * RATES.AGENT_FEE_RATE;
    const subtotal = productPriceBRL + shippingCost + agentFee;
    const tax = input.taxed ? subtotal * RATES.TAX_RATE : 0;
    const total = subtotal + tax;

    return {
        productPriceBRL,
        shippingCost,
        agentFee,
        subtotal,
        tax,
        total,
        exchangeRateUsed: rate,
    };
}
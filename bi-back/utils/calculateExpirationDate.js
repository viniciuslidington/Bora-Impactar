import { expirationMapping } from "../config/config.js";

export const calculateExpirationDate = (createdAt, duration) => {
    const daysToAdd = expirationMapping[duration];
    if (!daysToAdd) return null;
    return new Date(createdAt.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    };
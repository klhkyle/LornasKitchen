export function updateHeaderState() {
    const header = document.querySelector("header");
    const body = document.body;

    if (window.isLandingPage && window.scrollY === 0) {
        header.classList.add("large-header");
        body.classList.add("large-header-active");
    } else {
        header.classList.remove("large-header");
        body.classList.remove("large-header-active");
    }
}

export function formatQuantity(quantity) {
    // Define common fractions and their decimal equivalents
    const commonFractions = {
        0.25: "1/4",
        0.33: "1/3",
        0.5: "1/2",
        0.67: "2/3",
        0.75: "3/4",
    };

    // Check if the quantity is a whole number
    if (Number.isInteger(quantity)) {
        return quantity.toString();
    }

    // Check if the quantity matches a common fraction
    for (let decimal in commonFractions) {
        if (Math.abs(quantity - decimal) < 0.01) {
            return commonFractions[decimal];
        }
    }

    // If not a common fraction, round to 2 decimal places and remove trailing zeros
    return parseFloat(quantity.toFixed(2)).toString();
}

export function parseComplexAmount(amount) {
    // Handle mixed numbers (e.g., "2 1/4")
    if (amount.includes(" ")) {
        const [whole, fraction] = amount.split(" ");
        return parseInt(whole) + parseFraction(fraction);
    }
    // Handle fractions (e.g., "3/4")
    else if (amount.includes("/")) {
        return parseFraction(amount);
    }
    // Handle whole numbers and decimals
    else {
        return parseFloat(amount);
    }
}

export function parseFraction(fraction) {
    const [numerator, denominator] = fraction.split("/");
    return parseFloat(numerator) / parseFloat(denominator);
}

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
        0.0313: "1/32",
        0.0625: "1/16",
        0.0833: "1/12",
        0.0938: "3/32",
        0.125: "1/8",
        0.13: "1/8",
        0.1429: "1/7",
        0.1563: "5/32",
        0.1667: "1/6",
        0.167: "1/6",
        0.1875: "3/16",
        0.2: "1/5",
        0.2188: "7/32",
        0.25: "1/4",
        0.2813: "9/32",
        0.2857: "2/7",
        0.3125: "5/16",
        0.3333: "1/3",
        0.333: "1/3",
        0.3438: "11/32",
        0.375: "3/8",
        0.4: "2/5",
        0.4063: "13/32",
        0.4167: "5/12",
        0.4286: "3/7",
        0.4375: "7/16",
        0.4688: "15/32",
        0.5: "1/2",
        0.5313: "17/32",
        0.5625: "9/16",
        0.5714: "4/7",
        0.5833: "7/12",
        0.5938: "19/32",
        0.6: "3/5",
        0.625: "5/8",
        0.63: "5/8",
        0.6563: "21/32",
        0.6667: "2/3",
        0.667: "2/3",
        0.6875: "11/16",
        0.7143: "5/7",
        0.7188: "23/32",
        0.75: "3/4",
        0.7813: "25/32",
        0.8: "4/5",
        0.8438: "27/32",
        0.8571: "6/7",
        0.875: "7/8",
        0.88: "7/8",
        0.9063: "29/32",
        0.9167: "11/12",
        0.9688: "31/32",
    };

    const wholePart = Math.floor(quantity);
    let fractionalPart = quantity - wholePart;

    // Find the closest fraction
    let closestDecimal = 1;
    let closestFraction = "";

    for (const [decimal, fraction] of Object.entries(commonFractions)) {
        const diff = Math.abs(fractionalPart - parseFloat(decimal));
        if (diff < Math.abs(fractionalPart - closestDecimal)) {
            closestDecimal = parseFloat(decimal);
            closestFraction = fraction;
        }
    }

    // Format the result
    let result = "";
    if (wholePart > 0) {
        result += wholePart;
        if (fractionalPart > 0.01) {
            // Only add fraction if it's significant
            result += " " + closestFraction;
        }
    } else if (fractionalPart > 0.01) {
        result = closestFraction;
    } else {
        result = "0";
    }

    return result;

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

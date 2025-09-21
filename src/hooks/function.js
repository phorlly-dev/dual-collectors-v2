const Functions = {
    exponentFromValue(value) {
        const exp = Math.log2(value);

        return Number.isInteger(exp) ? exp : value;
    },
    powersOf2(value) {
        return Math.pow(2, value);
    },
    toMobile() {
        return (
            /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
            window.innerWidth <= 768 ||
            window.innerWidth <= 820
        );
    },
};

export const { exponentFromValue, powersOf2, toMobile } = Functions;

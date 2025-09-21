const Functions = {
    exponentFromValue(value) {
        const exp = Math.log2(value);

        return Number.isInteger(exp) ? exp : value;
    },
    powersOf2(value) {
        return Math.pow(2, value);
    },
    isMobile() {
        return (
            /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
            window.innerWidth < 768
        );
    },
};

export const { exponentFromValue, powersOf2, isMobile } = Functions;

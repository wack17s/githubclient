export function debounceLast(func, delay) {
    let timeout;

    return (...args) => {
        const context = this;

        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

export class DebounceClass {
    constructor() {
        this.blocked = false;
    }

    delay = (func, delay = 600) => {
        return (...args) => {
            if (!this.blocked) {
                this.blocked = true;

                func(...args);

                setTimeout(() => this.blocked = false, delay);
            }
        };
    }
}

export const debounce = new DebounceClass();

export function cropText(text) {
    return text.length > 30 ? `${text.substr(0, 30)}...` : text;
}

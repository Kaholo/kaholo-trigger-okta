module.exports = {
    string: (value)=>{
        if (!value) return undefined;
        if (typeof(value) === "string") return value.trim();
        throw `Value ${value} is not a valid string`;
    },
    severity: (value)=>{
        const translateMap = { "DEBUG": 0, "INFO": 1, "WARN": 2, "ERROR": 3, "FATAL": 4, "Any": "Any"};
        if (typeof(value) == "number") return value;
        if (!value) return "Any";
        if (typeof(value) == "string") {
            let parsed = translateMap[value.toUpperCase()];
            if (parsed || parsed == 0) return parsed;
            try {
                return parseInt(value);
            } catch (err){}
        }
        throw `unsupported severity format(${typeof(value)}): ${value}`;
    }
}
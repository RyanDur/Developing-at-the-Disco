module.exports = {
    preset: "ts-jest/presets/js-with-ts",
    automock: false,
    globals: {
        "ts-jest": {
            diagnostics: false,
        },
    },
    roots: [
        "<rootDir>/src",
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testMatch: [
        "**/__tests__/**/?(*.)+(spec|test).ts?(x)",
    ],
    testEnvironment: "node",
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: [
        "<rootDir>/src/__tests__/setup.ts"
    ]
};

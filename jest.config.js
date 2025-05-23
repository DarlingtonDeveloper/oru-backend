export default {
    testEnvironment: 'node',
    transform: {
        '^.+\\.js$': ['babel-jest', {
            presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
        }],
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
};

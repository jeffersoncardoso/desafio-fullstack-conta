module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@controllers/(.*)": "<rootDir>/src/controllers/$1",
    "@entities/(.*)": "<rootDir>/src/domain/entities/$1",
    "@value-objects/(.*)": "<rootDir>/src/domain/value-objects/$1",
    "@repositories/(.*)": "<rootDir>/src/domain/repositories/$1",
    "@services/(.*)": "<rootDir>/src/domain/services/$1",
    "@schemas/(.*)": "<rootDir>/src/infra/database/schemas/$1",
    "@migrations/(.*)": "<rootDir>/src/infra/database/migrations/$1",
    "@domain/(.*)": "<rootDir>/src/domain/$1",
    "@database/(.*)": "<rootDir>/src/infra/database/$1",
    "@docs/(.*)": "<rootDir>/src/docs/$1"
  }
};
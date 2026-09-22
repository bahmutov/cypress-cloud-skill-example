#!/usr/bin/env node

console.log('Triage the last two Cypress runs')

// call the "cy-cloud project get --projectId pcgkb1"
// and parse the JSON output to get the property "latestRunNumber"

const { execSync } = require('child_process')

const projectId = 'pcgkb1'
const output = execSync(
  `cy-cloud project get --projectId ${projectId}`,
  { encoding: 'utf-8' },
)
const latestRunNumber = JSON.parse(output).latestRunNumber
console.log('Latest run number:', latestRunNumber)

// parse the JSON output of the "cy-cloud test list --projectId <projectId> --runNumber <latestRunNumber> --status failed"
const failedTestsOutput = execSync(
  `cy-cloud test list --projectId ${projectId} --runNumber ${latestRunNumber} --status failed`,
  { encoding: 'utf-8' },
)
const failedTests = JSON.parse(failedTestsOutput).tests
// console.log('Failed tests:', failedTests)

if (failedTests.length === 0) {
  console.log('No failed tests')
  process.exit(0)
}

const testTitles = failedTests.map((test) =>
  test.testName.join(' > '),
)
console.log('Found %d failed tests', testTitles.length)
testTitles.forEach((title) => console.log(' -', title))

// fetch the failed tests for the previous run
const previousRunNumber = latestRunNumber - 1
const failedTestsPreviousOutput = execSync(
  `cy-cloud test list --projectId ${projectId} --runNumber ${previousRunNumber} --status failed`,
  { encoding: 'utf-8' },
)
const failedTestsPrevious = JSON.parse(
  failedTestsPreviousOutput,
).tests
const testTitlesPrevious = failedTestsPrevious.map((test) =>
  test.testName.join(' > '),
)
console.log(
  'Found %d failed tests in the previous run',
  testTitlesPrevious.length,
)
testTitlesPrevious.forEach((title) => console.log(' -', title))

// filter the latest failed tests by title matching previously failed test
const oldFailedTests = testTitles.filter((title) =>
  testTitlesPrevious.includes(title),
)
console.log(
  'Found %d failed tests in the latest run that failed before',
  oldFailedTests.length,
)
oldFailedTests.forEach((title) => console.log(' -', title))

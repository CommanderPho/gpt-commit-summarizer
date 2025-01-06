import { context } from "@actions/github";
import { summarizeCommits } from "./commitSummary";
import { getFilesSummaries, getSummaryBetweenDates } from "./filesSummary";

async function run(): Promise<void> {
  const core = require('@actions/core');
  const { execSync } = require('child_process');


  // // Get the pull request number and repository owner and name from the context object
  // const { number } = context.payload.pull_request as {
  //   number: number;
  // };
  // const issueNumber = number;
  // const { repository } = context.payload;

  const repository = context.payload.repository;

  if (!repository) {
    throw new Error("Repository information is not available in the GitHub context.");
  }

  const startDate = process.env.START_DATE || '2024-12-29';
  const endDate = process.env.END_DATE || '2025-01-06';

  console.log(`Summarizing commits from ${startDate} to ${endDate}`);

  // // Fetch commits
  // const commits = execSync(`git log --since="${startDate}" --until="${endDate}" --pretty=format:"%h - %s"`, { encoding: 'utf-8' });
  // console.log(`Commits to summarize:\n${commits}`);

  // if (repository === undefined) {
  //   throw new Error("Repository undefined");
  // }

  // Create a dictionary with the modified files being keys, and the hash values of the latest commits in which the file was modified being the values
  // const modifiedFilesSummaries = await getFilesSummaries(
  //   issueNumber,
  //   repository
  // );

  // await summarizeCommits(issueNumber, repository, modifiedFilesSummaries);

  const summary = await getSummaryBetweenDates(repository, startDate, endDate);
  console.log("Summary of changes:", summary);

}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

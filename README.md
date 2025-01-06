# AI Commit Summary

> [!NOTE]
> This repo is a fork with updated code for OpenAI that resolves all legacy errors


Don't have time and want to get hacking right away? Check out the [Getting Started](#getting-started) section.

The `AI Commit Summary` GitHub Action is a powerful tool that harnesses the capabilities of OpenAI's state-of-the-art
gpt-4o-mini large language model to provide summaries of the changes introduced by a pull request in a repository. By
generating the git diff for each commit and for each modified file and sending it to the OpenAI API with a carefully
crafted prompt, the action is able to produce concise and informative summaries that can greatly enhance collaboration
and understanding in large codebases.

The action then performs a higher level call to the OpenAI API to generate a summary of the entire pull request, from
the summaries of individual commits and file differences. This summary is then posted as a comment on the pull request.

# Getting Started

To use this action, you will need to have an OpenAI API key. If you don't already have one, you can sign up for an
OpenAI API key [here](https://openai.com/index/openai-api/).

Once you have your API key, you will need to add it to your GitHub repository as a secret. To do this, go to your
repository's settings and navigate to the "Secrets" section. Click on "Add a new secret" and enter the secret name
OPENAI_API_KEY and the value of your API key.

Next, you will need to add the workflow file to your repository. Create a file named
`.github/workflows/ai-commit-summary.yml` (relative to the git root folder) and copy the following code into it:

```yaml
name: AI Commit Summary
# Summary: This action will write a comment about every commit in a pull
# request, as well as generate a summary for every file that was modified and
# add it to the review page, compile a PR summary from all commit summaries and
# file diff summaries, and delete outdated code review comments

on:
  pull_request:
    types: [ opened, synchronize ]

jobs:
  summarize:
    runs-on: ubuntu-latest
    permissions: write-all  # Some repositories need this line

    steps:
      - uses: dirtycajunrice/ai-commit-summary@1.0.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

This workflow file tells GitHub to run the action whenever a new pull request is opened or updated.

That's it! You're now ready to use the `AI Commit Summary` action in your repository. Each time a pull request is opened
or updated, the action will automatically generate a summary of the changes made in each commit, add a summary for every
file that was modified to the review page, compile a PR summary from all commit summaries and file diff summaries, and
delete outdated code review

## License

This project is licensed under the [MIT License](./LICENSE).

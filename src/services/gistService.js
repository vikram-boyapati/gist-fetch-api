import { Octokit } from "@octokit/rest";

const octokitToken = "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";
const octokit = new Octokit({auth: octokitToken})

export const getPublicGists = () => octokit.gists.listPublic()

export const getGistForUser = username =>  octokit.gists.listForUser({ username });
export const listComments = (gistName, commentid) =>  octokit.gists.listComments({gistName, commentid});
export const listForks = gist_id =>  octokit.rest.gists.listForks({gist_id});
export const checkIsStarred = gist_id =>  octokit.rest.gists.checkIsStarred({gist_id});
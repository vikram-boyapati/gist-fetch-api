/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import Gist from './Gist';
import Moment from 'react-moment';

//using react stateless functional component whenever it is applicable
const GistList = ({ gists }) => {
  const renderdGists = gists.map((gist, index) => {
    const forksUrl = gist.forks_url;
    const comments = gist.comments;
    const gistId = gist.id;
    const gistUrl = gist.url;
    console.log(gist);
    const labels = [];
    for (var ftype in gist.files) {
      if (gist.files.hasOwnProperty(ftype)) {
        if (gist.files[ftype] && typeof gist.files[ftype].language !== 'undefined' && gist.files[ftype].language) {
          labels.push(gist.files[ftype].language);
        }

      }
    }

    return (
      
      <li key={gist.id}>
      <hr></hr>
        <ul className="gist">
          <li>
            <img className="avatar" src={gist.owner && gist.owner.avatar_url} width="50" height="50"
              alt={gist.owner && gist.owner.login} />

            <span>
              <a href={gist.owner.html_url} target="_blank">{gist.owner && gist.owner.login}</a> / <a
                href={gist.owner.git_pull_url} target="_blank">{gist.files[Object.keys(gist.files)[0]].filename}
              </a>
              <span>
                <ul className="labels">
                  {labels.map((label, index) => <li key={index}>{label}</li>)}
                </ul>
              </span>
            </span>
          </li>
          <li>
            <Gist files={Object.keys(gist.files).length} forksUrl={forksUrl} gistId={gistId}
              comments={comments} gistUrl={gistUrl} />
          </li>
          
          <li>
            {/* <h3><a href={gistUrl} target="_blank">{gist.id && gist.id}</a></h3> */}
            <p>{gist.description && gist.description}</p>
            <span>
                <span className="file-names">
                  {Object.keys(gist.files).map((fileKey) => 
                  <li key={index}><a href={gist.files[fileKey]?.raw_url} target="_blank">{fileKey}</a>&nbsp;&nbsp;&nbsp;</li>)}
                </span>
              </span>
          </li>
        </ul>
        <ul>
        <div>
            <span className="pull-left cratedAt">
              Created At: &nbsp;
                              <b><Moment format="MM/DD/YYYY">
                {gist.created_at && gist.created_at}
              </Moment></b>
            </span>
            <span className="pull-right">
                Last Updated At: &nbsp;
                              <b><Moment format="MM/DD/YYYY">
                  {gist.updated_at && gist.updated_at}
                </Moment></b>

              </span>
          </div>
        </ul>
      </li>
    )
  })


  return (
    <ul className="gists">
      {renderdGists}
    </ul>
  )
}

export default GistList;
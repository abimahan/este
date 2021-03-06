// @flow
import * as React from 'react';
import { graphql } from 'react-relay';
import Editor from '../components/Editor';
import AppPage from '../components/AppPage';
import type { PageWithQuery } from './_app';
import type { editorQuery } from './__generated__/editorQuery.graphql';

type URLQuery = { id: string };

const EditorPage: PageWithQuery<editorQuery, URLQuery> = props => {
  return (
    // $FlowFixMe https://github.com/facebook/relay/issues/2316
    <AppPage requireAuth isEditor data={props.data}>
      {/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
      <Editor data={props.data} />
    </AppPage>
  );
};

EditorPage.getInitialProps = async context => {
  const data = await context.fetch(
    graphql`
      query editorQuery($id: ID!, $isPage: Boolean!) {
        ...AppPage @arguments(isPage: $isPage)
        ...Editor @arguments(id: $id)
      }
    `,
    urlQuery => ({ id: urlQuery.id, isPage: true }),
  );
  return { data };
};

export default EditorPage;

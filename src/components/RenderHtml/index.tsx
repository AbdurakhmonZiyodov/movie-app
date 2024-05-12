/* eslint-disable react/display-name */
import React, { memo, useMemo } from 'react';
import RNRenderHtml, {
  TNodeChildrenRenderer,
  TRenderEngineProvider,
  useContentWidth,
} from 'react-native-render-html';
import { reduce } from 'lodash';
import { TextProps } from 'react-native';
import RN from '../RN';

const tags = [
  'div',
  'section',
  'header',
  'article',
  'footer',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'strong',
] as const;

const RenderHtml: React.FC<TextProps> = (props) => {
  const width = useContentWidth();

  const TextRenderer = memo(({ TDefaultRenderer, textProps, ...p }: any) => {
    const children = <TNodeChildrenRenderer tnode={p.tnode} />;
    return <RN.Text {...textProps} {...props} children={children} />;
  });

  const renderers = useMemo(
    () =>
      reduce(
        tags,
        (total, tagName) => ({ ...total, [tagName]: TextRenderer }),
        {},
      ),
    [TextRenderer],
  );

  // console.log(JSON.stringify({ renderers }, null, 2));

  const processedChildren = useMemo(() => {
    if (typeof props.children === 'string') {
      const cleanedText = props.children.replace(
        /<div><span style="font-size: 1em;"><br><\/span>/g,
        '',
      );
      return cleanedText.replace(/<div><span /g, '</div><br><br><span ');
    }
    return props.children;
  }, [props.children]);

  const html = useMemo(
    () => '<article>' + processedChildren + '</article>',
    [processedChildren],
  );

  return (
    <TRenderEngineProvider>
      <RNRenderHtml
        contentWidth={width}
        source={{
          html,
        }}
        enableCSSInlineProcessing={false}
        renderers={renderers}
      />
    </TRenderEngineProvider>
  );
};

export default memo(RenderHtml);

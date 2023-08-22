import React from 'react';
import { Kekule } from 'kekule';
import { KekuleReact } from 'kekule-react';
import 'kekule/theme';

const Composer = () => {

  
  const ComposerWrapped = KekuleReact.Utils.wrapWidget(Kekule.Editor.Composer, {
    exposeWidgetEvents: true,
    exposeWidgetPropertiesToReactProps: true,
    ignoredProperties: ['editorNexus', 'actionMap']
  });
  console.log("............//.....//loggg/..................//", ComposerWrapped)

  return <ComposerWrapped />;
};

export default Composer;

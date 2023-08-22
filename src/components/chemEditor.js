import React from 'react';
import { KekuleReact, Components } from 'kekule-react';
import * as THREE from 'three';
import  {Kekule}  from 'kekule';
import { Geometry } from 'three';
import Composer from "./composer"
Kekule.externalResourceManager.register('three.js', THREE);

const ChemKeyboard = () => {
  return (
    <div className="keyboard">
      {/* Your other JSX code here */}
      <div>
        {/* You can use Composer directly */}
        <Composer
        className="fixed-height-composer"/>


        {/* Or use components from the Components namespace */}
        {/* <Components.PeriodicTable /> */}
                    {/* <Components.Viewer /> */}
                    {/* <Components.SpectrumInspector /> */}
                    <Components.ChemObjInserter />
                    {/* <Components.SpectrumObjInserter /> */}
                    {/* <Components.Composer /> */}
      </div>
    </div>
  );
};

export default ChemKeyboard;

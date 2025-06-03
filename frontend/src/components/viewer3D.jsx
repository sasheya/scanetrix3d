import React, { useEffect, useRef } from 'react';
import '@kitware/vtk.js/Rendering/Profiles/Volume';
import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume';
import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';
import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer';
import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow';
import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor';
import vtkInteractorStyleTrackballCamera from '@kitware/vtk.js/Interaction/Style/InteractorStyleTrackballCamera';
import HttpDataSetReader from '@kitware/vtk.js/IO/Core/HttpDataSetReader';
import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
import vtkPiecewiseFunction from '@kitware/vtk.js/Common/DataModel/PiecewiseFunction';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';

const Viewer3D = ({ scanData }) => {
  const vtkContainerRef = useRef(null);
  const fullScreenRenderer = useRef(null);

  useEffect(() => {
    if (!scanData || !vtkContainerRef.current) {
      return;
    }

    // Dispose of previous renderer if it exists
    if (fullScreenRenderer.current) {
      fullScreenRenderer.current.delete();
      fullScreenRenderer.current = null;
    }

    // Setup VTK.js rendering
    fullScreenRenderer.current = vtkFullScreenRenderWindow.newInstance({
      rootContainer: vtkContainerRef.current,
      // containerStyle: { height: '100%', width: '100%' },
    });

    const renderer = fullScreenRenderer.current.getRenderer();
    const renderWindow = fullScreenRenderer.current.getRenderWindow();

    // Use vtkHttpDataSetReader to load the data from the URL
    const reader = vtkHttpDataSetReader.newInstance({ fetchGzip: true });
    reader.setUrl(scanData).then(() => {
      reader.loadData().then(() => {
        const imageData = reader.getOutputData();
        const dataArray = imageData.getPointData().getScalars();
        const dataRange = dataArray.getRange();

        const mapper = vtkVolumeMapper.newInstance();
        mapper.setInputData(imageData);

        const actor = vtkVolume.newInstance();
        actor.setMapper(mapper);

        // Create color and opacity transfer functions
        const cfun = vtkColorTransferFunction.newInstance();
        cfun.addRGBPoint(dataRange[0], 0.0, 0.0, 0.0);
        cfun.addRGBPoint(dataRange[1], 1.0, 1.0, 1.0);

        const ofun = vtkPiecewiseFunction.newInstance();
        ofun.addPoint(dataRange[0], 0.0);
        ofun.addPoint(dataRange[1] * 0.2, 0.1);
        ofun.addPoint(dataRange[1], 1.0);

        actor.getProperty().setRGBTransferFunction(0, cfun);
        actor.getProperty().setScalarOpacity(0, ofun);
        actor.getProperty().setInterpolationTypeToLinear();

        renderer.addVolume(actor);
        renderer.resetCamera();
        renderWindow.render();
      });
    });

    // Cleanup
    return () => {
      if (fullScreenRenderer.current) {
        fullScreenRenderer.current.delete();
        fullScreenRenderer.current = null;
      }
    };
  }, [scanData]); // Re-run effect when scanData changes

  return (
    <div id="vtk-3d-viewer" ref={vtkContainerRef} style={{ width: '100%', height: '500px' }}>
      {/* VTK 3D rendering will happen here */}
    </div>
  );
};

export default Viewer3D;

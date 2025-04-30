# import vtk

# def main() :
   
#     reader = vtk.vtkNIFTIImageReader()
#     reader.SetFileName("C:/Users/ok/Documents/project/new/data/BraTS2020_TrainingData/MICCAI_BraTS2020_TrainingData/BraTS20_Training_002/BraTS20_Training_002_flair.nii")
#     # reader.SetFileName(r"data/BraTS2020_TrainingData/MICCAI_BraTS2020_TrainingData/BraTS20_Training_001/BraTS20_Training_001_flair.nii")

# # Step 2: Update the reader
#     reader.Update()

# # Step 3: Get the output
#     image_data = reader.GetOutput()
#     scalar_range = image_data.GetScalarRange()
    
#     rescaler = vtk.vtkImageShiftScale()
#     rescaler.SetInputData(image_data)
#     rescaler.SetShift(-scalar_range[0])  # Normalize to 0
#     rescaler.SetScale(255 / (scalar_range[1] - scalar_range[0]))  # Scale to 255
#     rescaler.SetOutputScalarTypeToUnsignedChar()  # Convert to 8-bit image
#     rescaler.Update()

#     image_data = rescaler.GetOutput()
   
#     # image_data = reader.GetOutput()

# # Auto adjust window level
#     image_data.Modified()
#     image_data.ComputeBounds()
#     # image_data.ComputeScalarRange()

#     scalar_range = image_data.GetScalarRange()
#     print("Scalar Range:", scalar_range)  # Debugging output

#     # Adjust volume property to make it visible
#     volume_property = vtk.vtkVolumeProperty()
#     volume_property.ShadeOn()
#     volume_property.SetInterpolationTypeToLinear()

#     # Set color mapping (adjust RGB values for better visibility)
#     color_function = vtk.vtkColorTransferFunction()
#     color_function.AddRGBPoint(scalar_range[0], 0.0, 0.0, 0.0)  # Black
#     color_function.AddRGBPoint(scalar_range[1], 1.0, 1.0, 1.0)  # White

#     # Set opacity (very important!)
#     opacity_function = vtk.vtkPiecewiseFunction()
#     opacity_function.AddPoint(scalar_range[0], 0.0)  # Fully transparent
#     opacity_function.AddPoint(scalar_range[1] * 0.1, 0.1)  # Slightly visible
#     opacity_function.AddPoint(scalar_range[1], 1.0)  # Fully visible

#     volume_property.SetColor(color_function)
#     volume_property.SetScalarOpacity(opacity_function)

#     mapper = vtk.vtkFixedPointVolumeRayCastMapper()
#     mapper.SetInputConnection(reader.GetOutputPort())

#     volume = vtk.vtkVolume()
#     volume.SetMapper(mapper)

#     renderer = vtk.vtkRenderer()
#     renderWindow = vtk.vtkRenderWindow()
#     renderWindow.AddRenderer(renderer)
#     renderWindowInteractor = vtk.vtkRenderWindowInteractor()
#     renderWindowInteractor.SetRenderWindow(renderWindow)

#     renderer.AddVolume(volume)
#     renderer.SetBackground(1, 1, 1)

#     renderWindow.Render()
#     renderWindowInteractor.Start()


# if __name__ == "__main__":
#     main()



import vtk
import nibabel as nib
import numpy as np
from scipy.ndimage import gaussian_filter

# Load the NIfTI file
nii_file = r"data/BraTS2020_TrainingData/MICCAI_BraTS2020_TrainingData/BraTS20_Training_001/BraTS20_Training_001_seg.nii"  # Replace with your actual .nii file
img = nib.load(nii_file)
data = img.get_fdata()

# Apply Gaussian splattering (smoothing)
sigma = (1, 1, 1)  # Adjust sigma for the Gaussian kernel (Z, Y, X axes)
data = gaussian_filter(data, sigma=sigma)

# Convert NIfTI data to a format that VTK can use (vtkImageData)
def numpy_to_vtk_image(numpy_data):
    vtk_data = vtk.vtkImageData()
    depth, height, width = numpy_data.shape
    vtk_data.SetDimensions(width, height, depth)
    vtk_data.AllocateScalars(vtk.VTK_FLOAT, 1)

    # Fill the vtkImageData with the numpy data
    for z in range(depth):
        for y in range(height):
            for x in range(width):
                vtk_data.SetScalarComponentFromFloat(x, y, z, 0, numpy_data[z, y, x])

    return vtk_data

vtk_data = numpy_to_vtk_image(data)

# Create volume properties for the 3D rendering
volume_mapper = vtk.vtkFixedPointVolumeRayCastMapper()  # Enforcing CPU-based raycasting
volume_mapper.SetInputData(vtk_data)

volume_property = vtk.vtkVolumeProperty()
volume_property.ShadeOn()
volume_property.SetInterpolationTypeToLinear()

# Set up opacity and color transfer functions
opacity_func = vtk.vtkPiecewiseFunction()
opacity_func.AddPoint(0, 0.00)
opacity_func.AddPoint(500, 0.15)
opacity_func.AddPoint(1000, 0.85)
opacity_func.AddPoint(1150, 0.85)
volume_property.SetScalarOpacity(opacity_func)

# Volume color setup
color_func = vtk.vtkColorTransferFunction()
color_func.AddRGBPoint(0, 0.0, 0.0, 0.0)  # Black for background
color_func.AddRGBPoint(500, 1.0, 1.0, 1.0)  # White for bone/tissue
color_func.AddRGBPoint(1000, 0.9, 0.9, 0.9)
color_func.AddRGBPoint(1150, 1.0, 1.0, 1.0)
volume_property.SetColor(color_func)

# Create the volume actor
volume = vtk.vtkVolume()
volume.SetMapper(volume_mapper)
volume.SetProperty(volume_property)

# Create a renderer, render window, and interactor
renderer = vtk.vtkRenderer()
render_window = vtk.vtkRenderWindow()
render_window.AddRenderer(renderer)

interactor = vtk.vtkRenderWindowInteractor()
interactor.SetRenderWindow(render_window)

# Add the 3D volume to the renderer
renderer.AddVolume(volume)
renderer.SetBackground(0, 0, 0)  # Background color black
render_window.SetSize(800, 800)

# Define the initial clipping planes for slicing
def update_clipping_planes(axis, slice_idx):
    """
    Update clipping planes dynamically for the provided axis and slice index.
    """
    slice_idx = int(slice_idx)

    # Initialize clipping planes
    planes = vtk.vtkPlaneCollection()

    if axis == "axial":
        # Add axial clipping planes (cutting along the Z axis)
        plane1 = vtk.vtkPlane()
        plane1.SetOrigin(0, 0, slice_idx)
        plane1.SetNormal(0, 0, -1)
        planes.AddItem(plane1)

    elif axis == "coronal":
        # Add coronal clipping planes (cutting along the Y axis)
        plane2 = vtk.vtkPlane()
        plane2.SetOrigin(0, slice_idx, 0)
        plane2.SetNormal(0, -1, 0)
        planes.AddItem(plane2)

    elif axis == "sagittal":
        # Add sagittal clipping planes (cutting along the X axis)
        plane3 = vtk.vtkPlane()
        plane3.SetOrigin(slice_idx, 0, 0)
        plane3.SetNormal(-1, 0, 0)
        planes.AddItem(plane3)

    # Update the clipping planes of the volume mapper
    volume_mapper.RemoveAllClippingPlanes()
    for i in range(planes.GetNumberOfItems()):
        volume_mapper.AddClippingPlane(planes.GetItemAsObject(i))

    # Force the rendering to update with the new clipping plane
    render_window.Render()

# Slider callback functions for each view
def axial_slider_callback(obj, event):
    slice_idx = obj.GetRepresentation().GetValue()
    update_clipping_planes("axial", slice_idx)

def coronal_slider_callback(obj, event):
    slice_idx = obj.GetRepresentation().GetValue()
    update_clipping_planes("coronal", slice_idx)

def sagittal_slider_callback(obj, event):
    slice_idx = obj.GetRepresentation().GetValue()
    update_clipping_planes("sagittal", slice_idx)

# Slider creation function
def create_slider(min_value, max_value, initial_value, title, callback, interactor, x_position):
    slider_rep = vtk.vtkSliderRepresentation2D()
    slider_rep.SetMinimumValue(min_value)
    slider_rep.SetMaximumValue(max_value)
    slider_rep.SetValue(initial_value)
    slider_rep.SetTitleText(title)

    slider_rep.GetSliderProperty().SetColor(1, 1, 1)
    slider_rep.GetTitleProperty().SetColor(1, 1, 1)
    slider_rep.GetLabelProperty().SetColor(1, 1, 1)
    slider_rep.GetSelectedProperty().SetColor(0, 1, 0)
    slider_rep.GetTubeProperty().SetColor(0.8, 0.8, 0.8)
    slider_rep.GetCapProperty().SetColor(0.2, 0.2, 0.2)

    # Adjust the position of the slider
    slider_rep.GetPoint1Coordinate().SetCoordinateSystemToDisplay()
    slider_rep.GetPoint1Coordinate().SetValue(x_position, 40)  # Adjust Y for height and X for side-by-side
    slider_rep.GetPoint2Coordinate().SetCoordinateSystemToDisplay()
    slider_rep.GetPoint2Coordinate().SetValue(x_position + 180, 40)  # Adjust width of the slider

    slider_widget = vtk.vtkSliderWidget()
    slider_widget.SetInteractor(interactor)
    slider_widget.SetRepresentation(slider_rep)
    slider_widget.SetAnimationModeToAnimate()
    slider_widget.AddObserver("InteractionEvent", callback)

    return slider_widget

# Create sliders for each view
axial_slider = create_slider(0, data.shape[2] - 1, data.shape[2] // 2, "Axial Slice", axial_slider_callback, interactor, 100)
coronal_slider = create_slider(0, data.shape[1] - 1, data.shape[1] // 2, "Coronal Slice", coronal_slider_callback, interactor, 300)
sagittal_slider = create_slider(0, data.shape[0] - 1, data.shape[0] // 2, "Sagittal Slice", sagittal_slider_callback, interactor, 500)

# Enable the sliders
axial_slider.EnabledOn()
coronal_slider.EnabledOn()
sagittal_slider.EnabledOn()

# Render and start interaction
render_window.Render()
interactor.Start()
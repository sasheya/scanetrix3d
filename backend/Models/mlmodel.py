from IPython import get_ipython
from IPython.display import display
import os
from glob import glob
import torch
import monai
import numpy as np
import nibabel as nib
import matplotlib.pyplot as plt
from monai.transforms import (
    Compose, LoadImage, EnsureChannelFirst, ScaleIntensity, Resize, ToTensor
)
from monai.data import Dataset, DataLoader
from monai.networks.nets import UNet
from monai.losses import DiceLoss
from monai.metrics import DiceMetric
from torch.optim import Adam
from monai.transforms import AsDiscrete
from sklearn.model_selection import train_test_split

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

transforms = Compose([
    LoadImage(image_only=True, reader ="NibabelReader"),
    EnsureChannelFirst(),
    ScaleIntensity(),
    Resize((128, 128, 128)),
    ToTensor()
])

data_dir = "C:/Users/ok/Documents/project/new/data/BraTS2020_TrainingData/MICCAI_BraTS2020_TrainingData"

def load_data():
  images= []
  for root, _, files in os.walk(data_dir):
    for file in files:
      if file.endswith("nii"):
        images.append(os.path.join(root,file))
  print(f"number of images found: {len(images)}")
  return Dataset(data=images, transform=transforms)

dataset = load_data()
train_paths, val_paths = train_test_split(dataset, test_size=0.2, random_state=42)
train_loader = DataLoader(train_paths, batch_size = 2, shuffle = True)
val_loader = DataLoader(val_paths, batch_size = 2, shuffle = True)

model = UNet(
    spatial_dims =3,
    in_channels =1,
    out_channels =1,
    channels =(16, 32, 64, 128, 256),
    strides =(2, 2, 2, 2),
    num_res_units =2
).to(device)


loss_function = DiceLoss(sigmoid=True)
optimizer = torch.optim.Adam(model.parameters(), lr=1e-4)

def train(num_epochs=6):
  model.train()
  for epoch in range(num_epochs):
    epoch_loss = 0
    for batch in train_loader:
      inputs = batch.to(device)
      optimizer.zero_grad()
      outputs = model(inputs)
      loss = loss_function(outputs, inputs)
      loss.backward()
      optimizer.step()
      epoch_loss += loss.item()
      # acc = compute_accuracy(outputs, labels)
    print(f"Epoch {epoch+1}/{num_epochs}, Loss: {epoch_loss:.4f}")

train()


model.eval()
with torch.no_grad():
  for sample in val_loader:
    sample = sample.to(device)
    output = model(sample)

  # Move to CPU and convert to NumPy for plotting
  sample_np = sample.cpu().numpy()
  output_np = output.cpu().numpy()

  plt.subplot(1,2,1)
  # Select the first sample, first channel, and a depth slice
  plt.imshow(sample_np[0, 0, sample_np.shape[2]//2, :, :], cmap='gray')
  plt.title("Original")

  plt.subplot(1, 2, 2)
  # Select the first sample, first channel, and a depth slice for the output
  plt.imshow(output_np[0, 0, output_np.shape[2]//2, :, :], cmap='gray')
  plt.title("Reconstructed")
  plt.show()

def process_single_volume(input_data: np.ndarray, model_path: str = 'model.pth'):
    """
    Processes a single MRI volume using the trained UNet model.

    Args:
        input_data (np.ndarray): The input MRI volume as a NumPy array.
        model_path (str): The path to the trained model weights.

    Returns:
        np.ndarray: The processed MRI volume as a NumPy array.
    """
    # Ensure the input data has a channel dimension and is a PyTorch tensor
    # Apply the same transformations as used during training, except LoadImage
    inference_transforms = Compose([
        EnsureChannelFirst(),
        ScaleIntensity(),
        Resize((128, 128, 128)),
        ToTensor()
    ])

    # Apply transformations
    input_tensor = inference_transforms(input_data)
    input_tensor = input_tensor.unsqueeze(0).to(device) # Add batch dimension and move to device

    # Load the trained model
    model = UNet(
        spatial_dims =3,
        in_channels =1,
        out_channels =1,
        channels =(16, 32, 64, 128, 256),
        strides =(2, 2, 2, 2),
        num_res_units =2
    ).to(device)

    try:
        model.load_state_dict(torch.load(model_path, map_location=device))
        model.eval()
    except FileNotFoundError:
        print(f"Model weights not found at {model_path}. Using untrained model.")
        model.eval() # Still set to eval mode even if untrained

    with torch.no_grad():
        output_tensor = model(input_tensor)

    # Move output back to CPU and convert to NumPy array
    processed_data = output_tensor.squeeze(0).cpu().numpy() # Remove batch and channel dimensions

    return processed_data

import os
import json
import requests

# Load JSON
with open("products_og.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Ensure folder exists
output_dir = "public/images/products"
os.makedirs(output_dir, exist_ok=True)

for key, item in data.items():
    new_image_paths = []
    for idx, url in enumerate(item["images"]):
        # Choose a filename (like product0_1.jpg, product0_2.jpg, etc.)
        filename = f"product{key}_{idx+1}.jpg"
        filepath = os.path.join(output_dir, filename)

        # Download and save image
        try:
            response = requests.get(url, stream=True, timeout=15)
            if response.status_code == 200:
                with open(filepath, "wb") as img_file:
                    for chunk in response.iter_content(1024):
                        img_file.write(chunk)
                print(f"Downloaded {url} -> {filepath}")
                new_image_paths.append(f"/images/products/{filename}")
            else:
                print(f"Failed to download {url}")
        except Exception as e:
            print(f"Error downloading {url}: {e}")

    # Replace URLs with local paths
    item["images"] = new_image_paths

# Save updated JSON
with open("data_local.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ JSON updated and saved as data_local.json")

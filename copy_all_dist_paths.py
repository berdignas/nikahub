import os, shutil

base_dist = "dist/undangan-vintage-01"

if os.path.exists(base_dist):
  targets = [
      "dist/vintage-01",
      "dist/undangan-digital/vintage-01",
      "dist/produk/undangan digital/vintage-01",
  ]
  for target in targets:
    os.makedirs(target, exist_ok=True)
    # Copy all items from base_dist to target
    for item in os.listdir(base_dist):
      s = os.path.join(base_dist, item)
      d = os.path.join(target, item)
      if os.path.isdir(s):
        if os.path.exists(d):
          shutil.rmtree(d)
        shutil.copytree(s, d)
      else:
        shutil.copy2(s, d)
    print(f"Copied dist files to {target}")

  print("Dist sync completed successfully!")
else:
  print(f"Source {base_dist} does not exist yet!")

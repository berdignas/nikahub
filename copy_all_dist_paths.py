import os, shutil

sync_configs = [
    {
        "source": "dist/undangan-vintage-01",
        "targets": [
            "dist/vintage-01",
            "dist/undangan-digital/vintage-01",
            "dist/produk/undangan digital/vintage-01",
        ]
    },
    {
        "source": "dist/undangan-vintage-sage-botanical",
        "targets": [
            "dist/vintage-sage-botanical",
            "dist/undangan-digital/vintage-sage-botanical",
            "dist/produk/undangan digital/vintage-sage-botanical",
            "dist/vintage-04",
            "dist/undangan-vintage-04",
        ]
    }
]

for config in sync_configs:
    source = config["source"]
    if os.path.exists(source):
        for target in config["targets"]:
            os.makedirs(target, exist_ok=True)
            for item in os.listdir(source):
                s = os.path.join(source, item)
                d = os.path.join(target, item)
                if os.path.isdir(s):
                    if os.path.exists(d):
                        shutil.rmtree(d)
                    shutil.copytree(s, d)
                else:
                    shutil.copy2(s, d)
            print(f"Copied dist files from {source} to {target}")
    else:
        print(f"Source {source} does not exist yet (skipping)")

print("Dist sync completed successfully!")

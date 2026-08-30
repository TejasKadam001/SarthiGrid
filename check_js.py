import re
import subprocess
import os

with open("admin-dashboard.html", "r", encoding="utf-8") as f:
    content = f.read()

# Find all script blocks
scripts = re.findall(r"<script>(.*?)</script>", content, re.DOTALL)
print(f"Found {len(scripts)} inline script blocks.")

# Save the main one (the last one or largest one)
main_script = ""
for s in scripts:
    if len(s) > len(main_script):
        main_script = s

temp_js = "scratch/temp_check.js"
os.makedirs("scratch", exist_ok=True)
with open(temp_js, "w", encoding="utf-8") as f:
    f.write(main_script)

print(f"Saved main script block to {temp_js}. Running syntax check...")
result = subprocess.run(["node", "--check", temp_js], capture_output=True, text=True)
if result.returncode == 0:
    print("✅ Syntax check passed! No JS syntax errors.")
else:
    print("❌ JS syntax error found:")
    print(result.stderr)

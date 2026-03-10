
import os
import re

def double_rem(match):
    val = float(match.group(1)) * 2
    # if it ends in .0, remove .0
    if val.is_integer():
        val = int(val)
    return f'font-size: {val}rem'

for root, _, files in os.walk('c:/Users/mikaz/.gemini/antigravity/playground/azure-gravity/trenchcat-web/src'):
    for file in files:
        if file.endswith('.css'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = re.sub(r'font-size:\s*([0-9.]+)rem', double_rem, content)
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Updated {file}')


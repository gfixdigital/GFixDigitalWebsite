import os
import re

version = '1.0.1'
v_script = f"""
    <script>
        (function() {{
            const v = '{version}';
            if(localStorage.getItem('gfix_v') !== v) {{
                localStorage.clear();
                sessionStorage.clear();
                localStorage.setItem('gfix_v', v);
            }}
        }})();
    </script>
"""

for filename in os.listdir('.'):
    if filename.endswith('.html'):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Add ?v=version to css and js
        content = re.sub(r'href="(\./assets/css/styles\.css)"', f'href="\\1?v={version}"', content)
        content = re.sub(r'href="(\./assets/fa-5/css/font-awesome\.min\.css)"', f'href="\\1?v={version}"', content)
        content = re.sub(r'src="(\./assets/script/script\.js)"', f'src="\\1?v={version}"', content)
        
        # Add versioning script before </head> if not exists
        if f"localStorage.setItem('gfix_v', '{version}')" not in content:
            content = content.replace('</head>', v_script + '</head>')
            
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)

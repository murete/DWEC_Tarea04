Ran terminal command:  find . -name '._*' -exec rm -v {} +

Todos los archivos AppleDouble (._*) han sido eliminados del proyecto, incluyendo los que estaban en las carpetas js y .git. El workspace está limpio de estos archivos. ¿Te gustaría realizar alguna otra acción o limpieza?

Ran terminal command:  git rm --cached -r ._*
git commit -m "Eliminados archivos AppleDouble (._*) del repositorio"
git push origin main

Los archivos AppleDouble (._*) han sido eliminados también del repositorio de GitHub. El repositorio ahora está limpio de estos archivos tanto localmente como en remoto. ¿Necesitas alguna otra acción?
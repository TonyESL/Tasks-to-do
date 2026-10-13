# Momentum

Agenda diaria y temporizador de enfoque para web y Android. La aplicación está hecha con React, Vite y Tailwind CSS; Capacitor empaqueta la versión web como una app Android.

## Desarrollo web

Requisitos: Node.js 22 o posterior.

```bash
npm ci
npm run dev
```

Para comprobar la compilación web:

```bash
npm run build
```

## Generar el APK localmente

Requisitos: Node.js 22+, JDK 21 y Android SDK con las herramientas de compilación instaladas.

```bash
npm ci
npm run android:sync
cd android
.\gradlew.bat assembleDebug
```

El APK de depuración se genera en `android/app/build/outputs/apk/debug/app-debug.apk`. Este APK sirve para instalar y probar la app; para distribuirla en Google Play hay que generar una compilación de lanzamiento firmada.

## Generar el APK en GitHub

Inicializa el repositorio y súbelo a GitHub (reemplaza la URL por la de tu repositorio):

```bash
git init
git add .
git commit -m "Prepare Momentum Android app"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

Después abre **Actions → Build Android APK**. El flujo también se ejecuta al subir cambios a `main` o `master` y en pull requests. Al terminar, descarga el artefacto `momentum-debug-apk` desde la ejecución del workflow.

## Android

- Identificador de la app: `com.momentum.dailyplanner`.
- El icono del launcher de Android y el favicon usan el icono personalizado del proyecto.
- Los recordatorios usan notificaciones locales nativas; Android requiere permiso de notificaciones y, desde Android 12, puede requerir acceso a alarmas exactas.
- La app guarda tareas y preferencias localmente en el dispositivo.
- No subas archivos de firma, contraseñas ni credenciales al repositorio.

# Copia "Logo Azul" desde OneDrive a public para usarlo en la web.
# Ejecutar desde la raíz del proyecto: .\scripts\copy-logo.ps1

$origen = "C:\Users\Francisco OC\OneDrive\Documentos\Sigma IA Agency\Imágenes\Logos Sigma IA Agency"
$destino = Join-Path $PSScriptRoot "..\public\logo-azul.png"

$nombres = @("Logo Azul.png", "logo-azul.png", "Logo azul.png")
foreach ($n in $nombres) {
    $ruta = Join-Path $origen $n
    if (Test-Path $ruta) {
        Copy-Item $ruta $destino -Force
        Write-Host "Logo copiado: $n -> public/logo-azul.png"
        exit 0
    }
}

# Si hay un solo PNG en la carpeta, usarlo
$png = Get-ChildItem -Path $origen -Filter "*.png" -ErrorAction SilentlyContinue | Select-Object -First 1
if ($png) {
    Copy-Item $png.FullName $destino -Force
    Write-Host "Logo copiado: $($png.Name) -> public/logo-azul.png"
} else {
    Write-Host "No se encontró ningún PNG en: $origen"
    Write-Host "Copia manualmente tu 'Logo Azul' a: public/logo-azul.png"
}

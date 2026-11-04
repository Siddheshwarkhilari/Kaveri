<#
  Writes lightweight web copies of site images into public/optimized/.
  The originals in public/ are never modified.

  Run from the repository root (Windows; uses the built-in System.Drawing and
  Windows Imaging Component codecs, so nothing needs installing):
    powershell -ExecutionPolicy Bypass -File scripts/optimize-images.ps1
#>
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase

$root = Split-Path -Parent $PSScriptRoot
$public = Join-Path $root 'public'
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$pngCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/png' }

function Save-Resized {
  param(
    [string]$Source,
    [string]$Destination,
    [int]$Width,
    [long]$Quality = 82,
    [string]$Matte = '#FFFFFF',
    [switch]$Png
  )
  $sourcePath = if ([System.IO.Path]::IsPathRooted($Source)) { $Source } else { Join-Path $public $Source }
  $image = [System.Drawing.Image]::FromFile($sourcePath)
  try {
    $height = [int][Math]::Round($image.Height * $Width / $image.Width)
    $bitmap = New-Object System.Drawing.Bitmap $Width, $height
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    if (-not $Png) { $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml($Matte)) }
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    # TileFlipXY stops the bicubic filter from fading the outermost pixels.
    $attributes = New-Object System.Drawing.Imaging.ImageAttributes
    $attributes.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
    $target = New-Object System.Drawing.Rectangle 0, 0, $Width, $height
    $graphics.DrawImage($image, $target, 0, 0, $image.Width, $image.Height, [System.Drawing.GraphicsUnit]::Pixel, $attributes)

    $outPath = Join-Path $public $Destination
    New-Item -ItemType Directory -Force (Split-Path $outPath) | Out-Null
    if ($Png) {
      $bitmap.Save($outPath, $pngCodec, $null)
    } else {
      $parameters = New-Object System.Drawing.Imaging.EncoderParameters 1
      $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, $Quality)
      $bitmap.Save($outPath, $jpegCodec, $parameters)
    }
    $graphics.Dispose()
    $bitmap.Dispose()
    '{0,-48} {1,5} KB' -f $Destination, [Math]::Round((Get-Item $outPath).Length / 1KB)
  } finally {
    $image.Dispose()
  }
}

# Featured products: full stage size, a mid size for phones, and a thumbnail.
$featured = [ordered]@{
  'reefer-lockset-assembly' = 'featured-products/pump-product-1.webp'
  'heavy-duty-hinges'       = 'featured-products/Hinges.webp'
  'special-lockset'         = 'featured-products/hinge-product-1.webp'
  'cable-tray-fitting'      = 'featured-products/Cable-tray.webp'
  'marine-grade-fasteners'  = 'featured-products/fastener-product-1.webp'
}
foreach ($entry in $featured.GetEnumerator()) {
  Save-Resized -Source $entry.Value -Destination "optimized/featured/$($entry.Key)-1264.jpg" -Width 1264 -Quality 84
  Save-Resized -Source $entry.Value -Destination "optimized/featured/$($entry.Key)-720.jpg" -Width 720 -Quality 82
  Save-Resized -Source $entry.Value -Destination "optimized/featured/$($entry.Key)-240.jpg" -Width 240 -Quality 80
}

# Partner logos sit on the footer's dark tiles, so they are flattened onto that colour.
1..4 | ForEach-Object {
  Save-Resized -Source "partner_logos/partner-logo-$_.png" -Destination "optimized/partners/partner-logo-$_-256.jpg" -Width 256 -Quality 86 -Matte '#0A1324'
}

# Company logo at footer size, keeping transparency.
Save-Resized -Source 'logo/logo.png' -Destination 'optimized/logo/logo-128.png' -Width 128 -Png

# WebP photos are decoded through the Windows Imaging Component, scaling while decoding
# so the 33-megapixel originals never have to be held at full size.
function Save-WebpResized {
  param([string]$Source, [string]$Destination, [int]$Width, [int]$Quality = 80)
  $image = New-Object System.Windows.Media.Imaging.BitmapImage
  $image.BeginInit()
  $image.UriSource = New-Object System.Uri (Join-Path $public $Source)
  $image.DecodePixelWidth = $Width
  $image.CacheOption = [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
  $image.EndInit()

  $encoder = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
  $encoder.QualityLevel = $Quality
  $encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($image))
  $outPath = Join-Path $public $Destination
  New-Item -ItemType Directory -Force (Split-Path $outPath) | Out-Null
  $stream = [System.IO.File]::Create($outPath)
  try { $encoder.Save($stream) } finally { $stream.Dispose() }
  '{0,-48} {1,5} KB' -f $Destination, [Math]::Round((Get-Item $outPath).Length / 1KB)
}

# Factory photos used on the About page: a large and a medium size each.
$photos = [ordered]@{
  'plant-entrance-team' = 'gallery/photo-2.webp'
  'shop-floor'          = 'gallery/photo-10.webp'
  'cnc-operator'        = 'gallery/photo-5.webp'
}
foreach ($entry in $photos.GetEnumerator()) {
  Save-WebpResized -Source $entry.Value -Destination "optimized/about/$($entry.Key)-1600.jpg" -Width 1600 -Quality 80
  Save-WebpResized -Source $entry.Value -Destination "optimized/about/$($entry.Key)-900.jpg" -Width 900 -Quality 78
}

# Brochure previews: the PDF's pages are embedded JPEGs, so they are copied out of the
# file as-is and then resized. Re-run this whenever the brochure is replaced.
$pdfBytes = [System.IO.File]::ReadAllBytes((Join-Path $public 'brochure/company-brochure.pdf'))
$pdfText = [System.Text.Encoding]::GetEncoding(28591).GetString($pdfBytes)
$streams = [regex]::Matches($pdfText, '<<(?<dict>(?:(?!>>).)*?/DCTDecode(?:(?!>>).)*?)>>\s*stream\r?\n', 'Singleline')
$tempDir = Join-Path ([System.IO.Path]::GetTempPath()) 'kaveri-brochure'
New-Item -ItemType Directory -Force $tempDir | Out-Null
$page = 0
foreach ($match in $streams) {
  $page++
  $length = [int]([regex]::Match($match.Groups['dict'].Value, '/Length\s+(\d+)').Groups[1].Value)
  $pagePath = Join-Path $tempDir "page-$page.jpg"
  [System.IO.File]::WriteAllBytes($pagePath, $pdfBytes[($match.Index + $match.Length)..($match.Index + $match.Length + $length - 1)])
  $width = if ($page -eq 1) { 720 } else { 480 }
  if ($page -le 3) { Save-Resized -Source $pagePath -Destination "optimized/brochure/page-$page.jpg" -Width $width -Quality 84 }
}

# Product catalogue: every photo in public/products at card, retina-card and detail sizes.
# Files are named after the original (product-12.webp -> product-12-800.jpg).
Get-ChildItem (Join-Path $public 'products') -File | Where-Object { $_.Name -ne '.gitkeep' } | ForEach-Object {
  $base = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
  Save-Resized -Source "products/$($_.Name)" -Destination "optimized/products/$base-480.jpg" -Width 480 -Quality 78
  Save-Resized -Source "products/$($_.Name)" -Destination "optimized/products/$base-800.jpg" -Width 800 -Quality 80
  Save-Resized -Source "products/$($_.Name)" -Destination "optimized/products/$base-1264.jpg" -Width 1264 -Quality 84
}

# Gallery: every photo in public/gallery at thumbnail, grid, large-grid, viewer and retina-viewer
# widths (photo-4.webp -> photo-4-1024.jpg), plus a tiny preview of each that is inlined into
# src/data/galleryPlaceholders.ts and shown blurred while the real photo loads.
$placeholders = [ordered]@{}
Get-ChildItem (Join-Path $public 'gallery') -File | Where-Object { $_.Name -ne '.gitkeep' } | Sort-Object { [int]($_.BaseName -replace '\D', '') } | ForEach-Object {
  $base = $_.BaseName
  Save-WebpResized -Source "gallery/$($_.Name)" -Destination "optimized/gallery/$base-320.jpg" -Width 320 -Quality 74
  Save-WebpResized -Source "gallery/$($_.Name)" -Destination "optimized/gallery/$base-640.jpg" -Width 640 -Quality 76
  Save-WebpResized -Source "gallery/$($_.Name)" -Destination "optimized/gallery/$base-1024.jpg" -Width 1024 -Quality 78
  Save-WebpResized -Source "gallery/$($_.Name)" -Destination "optimized/gallery/$base-1600.jpg" -Width 1600 -Quality 80
  Save-WebpResized -Source "gallery/$($_.Name)" -Destination "optimized/gallery/$base-2400.jpg" -Width 2400 -Quality 80

  $tiny = New-Object System.Windows.Media.Imaging.BitmapImage
  $tiny.BeginInit()
  $tiny.UriSource = New-Object System.Uri $_.FullName
  $tiny.DecodePixelWidth = 24
  $tiny.CacheOption = [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
  $tiny.EndInit()
  $encoder = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
  $encoder.QualityLevel = 60
  $encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($tiny))
  $memory = New-Object System.IO.MemoryStream
  $encoder.Save($memory)
  $placeholders[$base] = 'data:image/jpeg;base64,' + [Convert]::ToBase64String($memory.ToArray())
  $memory.Dispose()
}
$lines = @(
  '// Generated by scripts/optimize-images.ps1. Do not edit by hand.',
  '// Tiny previews of the gallery photos, shown blurred while the full photo loads.',
  'export const galleryPlaceholders: Record<string, string> = {'
)
foreach ($entry in $placeholders.GetEnumerator()) { $lines += "  `"$($entry.Key)`": `"$($entry.Value)`"," }
$lines += '};'
$placeholderPath = Join-Path $root 'src/data/galleryPlaceholders.ts'
[System.IO.File]::WriteAllText($placeholderPath, ($lines -join "`n") + "`n", (New-Object System.Text.UTF8Encoding $false))
'{0,-48} {1,5} KB' -f 'src/data/galleryPlaceholders.ts', [Math]::Round((Get-Item $placeholderPath).Length / 1KB, 1)

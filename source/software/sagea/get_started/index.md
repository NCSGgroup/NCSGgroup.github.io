---
title: "Quick start for SaGEA: A Python toolbox for post-processing and error assessment of satellite gravity products"
---

**Back to** [<u>/software/sagea/</u>](/software/sagea/)

---

{% include_md software/sagea/_meta/_sagea.overview.md %}

---
<head>
    <script type="text/javascript" async
        src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.1.2/es5/tex-mml-chtml.js">
    </script>
</head>

# Spectral- and spatial-domain conversion

===== text under construction =====

<p style="text-align: justify; text-justify: inter-word;">
1. Global satellite gravity field models are typically represented by fully normalized Stokes coefficients \( \bar C_{lm} \) and \( \bar S_{lm} \), i.e., spherical harmonic coefficients (SHCs) of the Earth's gravitational potential.
SHCs of different degree \( l \) and order \( m \) represent signal of different spatial-wave length, and the larger \( l \) is, the shorter the spatial-wave length, while \( m \) corresponds the spatial direction.<u>PICTURE here</u><br>
</p>

<p style="text-align: justify; text-justify: inter-word;">
2. Generally SHCs need converting to be spatial representation, called spherical harmonic synthesis, and the inverse processing is called spherical harmonic analysis.<br>
</p>

<p style="text-align: justify; text-justify: inter-word;">
3. SaGEA provide functions to processing the spherical harmonic synthesis and analysis, and thanks to the vectorization, the computation efficient and accuracy are both very practical. <u>INTRODUCE data class SHC and GRD here</u><br>
</p>

<p style="text-align: justify; text-justify: inter-word;">
<i class="fab fa-python"></i> Wanna have a try?  Run the example notebook in <a href="/jupyterlite/lab/index.html?path=function_01_spectral_spatial_transform.ipynb" target="_blank"> <u>a new tab</u></a> to see visually how the SHCs correspond the spatial distribution.<br>
</p>

---

# Corrections for gravity products

<p style="text-align: justify; text-justify: inter-word;">
1. Satellite gravity products such as GRACE/GRACE-FO usually need additional correction, such as filtering, low-degrees replacement, etc.<br>
</p>

<p style="text-align: justify; text-justify: inter-word;">
2. SaGEA contains commonly-used corrections.<br>
</p>

<p style="text-align: justify; text-justify: inter-word;">
<i class="fab fa-python"></i> Wanna have a try? Run the example notebook in <a href="/jupyterlite/lab/index.html?path=function_02_spectral_spatial_transform_for_products.ipynb" target="_blank"> <u>a new tab</u></a> to apply a postprocessing on given GRACE level-2 products.<br>
</p>

---

# Error assessment for gravity products

===== text under construction =====

---

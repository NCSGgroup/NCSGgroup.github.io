---
title: "Quick start for SaGEA: A Python toolbox for post-processing and error assessment of satellite gravity products"
---

**Back to** [<u>/software/sagea/</u>](/software/sagea/)

---

{% include_md software/sagea/_meta/_sagea.overview.md %}

---

# Spectral- and spatial-domain conversion

===== text under construction =====

<p style="text-align: justify; text-justify: inter-word;">

1. Global satellite gravity field models are typically represented by fully normalized Stokes coefficients $\bar C_{lm}$ and $\bar S_{lm}$, i.e., spherical harmonic coefficients (SHCs) of the Earth's gravitational potential. SHCs of different degree $l$ and order $m$ represent signal of different spatial-wave length, and the larger $l$ is, the shorter the spatial-wave length. <u>PICTURE here</u>
2. Generally SHCs need converting to be spatial representation, called spherical harmonic synthesis, and the inverse processing is called spherical harmonic analysis.
3. `sagea` provide functions to processing the spherical harmonic synthesis and analysis, and thanks to the vectorization, the computation efficient and accuracy are both very practical. <u>INTRODUCE data class SHC and GRD here</u>

Here give some usages for spherical harmonic synthesis. Run the example notebook in a <a href="/jupyterlite/lab/index.html?path=function_01_spectral_spatial_transform.ipynb" target="_blank"> <u>new tab</u></a>.
</p>

# Corrections for gravity products

text under construction ...

# Error assessment for gravity products

text under construction ...


---
===== OLD TEXT BELOW=====

# 1) Installation

<p style="text-align: justify; text-justify: inter-word;">
`sagea==0.3.1a7` and later versions support installation in different environments, including standard Python environments and lightweight installation in JupyterLite environments. In web-based environments such as JupyterLite, some features are currently unavailable due to limited support for certain dependencies. This setup is intended for demonstration purposes only. For full functionality, please install and use sagea in a standard Python environment.

  <a href="/jupyterlite/lab/index.html?path=01_inbuild_document.ipynb" target="_blank">
    <u>Run the example notebook in a new tab.</u>
  </a>
</p>

# 2) Examples

Here give some example for using `sagea`.
A `.ipynb` file can be found for each example
at [<u>https://github.com/NCSGgroup/SaGEA/tree/main/examples</u>](https://github.com/NCSGgroup/SaGEA/tree/main/examples)

## 2.1) In-build documentation

`SHC` (for spherical harmonic coefficient) and `GRD` (for gridded signal) are the core data class of `sagea`.
Use following commands to see their in-build documentary.

```python
import sagea

# sagea.SHC.io contains methods for read and write the SHC files.
print(sagea.SHC.io.help())

# sagea.SHC.generat contains methods for generate an SHC instance.
print(sagea.SHC.generate.help())

# sagea.SHC.filter contains filtering methods for an SHC instance.
print(sagea.SHC.filter.help())

# sagea.SHC.correction contains corrections methods for an SHC instanc.
print(sagea.SHC.correction.help())
```

## 2.2) Post-processing to EWH

Here gives an example for a whole postprocessing chain for Level-2products

```python
# 1. read gfc files, read low-degree files (TN-13, TN-14), GIA files
import numpy as np
import sagea
from sagea.sgio import read_low_degs
from sagea.utils import FileTool, MathTool, TimeTool
import pathlib

"""define file paths"""
paths_gfc = list(pathlib.Path(
    "/Volumes/WorkDrive/data/GRACE/L2_SH_products/GSM/ITSG/Grace2018/n60/2008/").glob("ITSG*.gfc"))
paths_gfc.sort()

path_gif48 = pathlib.Path("/Users/shuhao/PycharmProjects/SaGEA/data/auxiliary/GIF48.gfc")

path_TN13 = pathlib.Path("/Volumes/WorkDrive/data/GRACE/L2_low_degrees/TN-13_GEOC_JPL_RL06.3.txt")
path_TN14 = pathlib.Path("/Volumes/WorkDrive/data/GRACE/L2_low_degrees/TN-14_C30_C20_SLR_GSFC.txt")

path_GIA = pathlib.Path("/Users/shuhao/PycharmProjects/SaGEA/data/GIA/GIA.ICE-6G_D.txt")

"""parameters"""
lmax = 60  # max degree/order

"""read files"""
shc = sagea.SHC.io.from_gfc(paths_gfc, lmax=lmax, key='gfc')
shc_gif48 = sagea.SHC.io.from_gfc(path_gif48, lmax=lmax, key='gfc')
shc -= shc_gif48  # deduct GIF48 model as background

"""read low-degree files and replace"""
dates_begin, dates_end = TimeTool.match_dates_from_name(paths_gfc)
dates_ave = TimeTool.get_average_dates(dates_begin, dates_end)

low_deg_dict = {}
low_deg_dict.update(read_low_degs(path_TN13, dates=dates_ave))
low_deg_dict.update(read_low_degs(path_TN14, dates=dates_ave))  # {"c2,0": np.ndarray, ...}

for key in ("c1,0", "c1,1", "s1,1", "c2,0", "c3,0"):
    low_deg_dict[key] -= np.mean(low_deg_dict[key][low_deg_dict[key] == low_deg_dict[key]])
    shc.replace(key, low_deg_dict[key], inplace=True)
    # For the processing of an shc instance (replace, filtering, etc.), a new parameter, `inplace`: bool, is included, default to be False.
    # If `inplace` is set to True, it will modify the values within the instance; otherwise, it will only return the new instance.

"""read GIA file and deduct shc_GIA"""
shc_gia_trend = sagea.SHC.io.from_gfc(path_GIA, lmax=lmax, key='')
shc_gia = sagea.SHC.generate.from_trend(shc_gia_trend, dates=dates_ave)

shc -= shc_gia

# 2. Filtering and corrections for SHC
shc_filtered = shc.filter.ddk(ddk_id=4)

shc_geometric = shc_filtered.correction.geometric(
    auto_load_actual_earth=True,
    phisfc_file="/Users/shuhao/PycharmProjects/SaGEA/src/sagea/data/auxiliary/PHISFC_ERA5_invariant.nc",
    gif48_file="/Users/shuhao/PycharmProjects/SaGEA/src/sagea/data/auxiliary/GIF48.gfc",
    inplace=False,
    verbose=True,
)

"""here gives an example to save a .gfc file"""
shc_filtered.io.save_file(
    filepath="../test_save_shc/test.gfc", index=0,
    header="test\n ===== end of header =====\n",
    key="gfc",
    make_parent=True,
    overwrite=True,
)

# 3. Spherical harmonic synthesis to grid
import cartopy

"""spherical harmonic synthesis to 1x1 gridded map of EWHA field"""
grid_space = 1  # degree
shc_filtered_ewh = shc_filtered.convert(from_type="Geopotential", to_type="EWH",
                                        inplace=False)  # convert to equivalent water height (EWH, [m])

grid = shc_filtered_ewh.synthesize.to_grid(1)
grid.value *= 100  # into unit [cm]

print(grid.value.shape)

"""plot"""
plot_index = 1
grid.plot(
    index=[plot_index],
    titles=["ITSG-Grace2018, FSC filtered", ],
    title=dates_ave[plot_index],
    gridlines=False,
    vmin=-15, vmax=15,
    projection=cartopy.crs.Robinson()
)

# 4. Regional extraction
from sagea.sgio import read_shp_as_GRD
import matplotlib.pyplot as plt

filepath_mask = pathlib.Path(
    "/Users/shuhao/PycharmProjects/SaGEA/data/basin_mask/Shp/Greenland/greenland.shp"
)
grid_mask = read_shp_as_GRD(filepath_mask, grid_space=grid_space, per_feature=True)

# show the masks
fig, axes = grid_mask.plot(
    title="Masks",
    gridlines=True,
    vmin=0, vmax=1,
    projection=cartopy.crs.Robinson(),
    extent=(-60, -10, 60, 85),
)

# show the EWH time series

ewh = grid.extractor.maskGRD(grid_mask, average=True)
year_frac = TimeTool.convert_date_format(dates_ave, output_type=TimeTool.DateFormat.YearFraction)
for i in range(ewh.shape[0]):
    plt.plot(year_frac, ewh[i, :])

plt.show()

```

## 2.3) Variance-covariance matrix propagation

Here gives an example to propagate a variance-covariance matrix.

```python
# 1. Read .snx file as a VCM; read .gfc file as ground truth
import pathlib
import cartopy
import numpy as np
from matplotlib import pyplot as plt
import sagea
from sagea import SHC

"""define paths"""
date_month = "2008-03"
lmax = 60

path_snx = pathlib.Path(f"/Volumes/ShuhaoWork/GRACE_NEQ/ITSG_SINEX_n96/ITSG-Grace2018_n96_{date_month}.snx")
path_his = pathlib.Path(f"/Volumes/ShuhaoWork/ESM_monthly_mean/HIS_n60/esm_HIS_monthly_{date_month}.gfc")

vcm, _ = sagea.io.read_sinex_cov(path_snx, lmax=lmax)  # this may take a few tens of seconds
shc_truth = SHC.io.from_gfc(path_his, lmax=lmax, key="gfc")

# 2. Generate noise samples from a vcm, and add them on the ground truth
nsample = 100
shc_with_noise = SHC.generate.normal_from_vcm(vcm, nsample=nsample, mean=shc_truth)

# 3. postprocessing to EWH fields; EWHs at discrete points
shc_filtered = shc_with_noise.filter.gaussian(300)
shc_filtered_ewh = shc_filtered.convert(from_type="Geopotential", to_type="EWH")

# gridded EWH fields
grid = shc_filtered_ewh.synthesize.to_grid(grid_space=1)

# evaluate EWHs at discrete points
lats = np.array([
    58.5, 57.5, 57.5, 57.5, 56.5, 56.5, 56.5, 56.5, 55.5, 55.5,
])

lons = np.array([
    26.5, 26.5, 27.5, 28.5, 25.5, 26.5, 27.5, 28.5, 27.5, 28.5,
])
ewh_discrete = shc_filtered_ewh.synthesize.evaluate(lats, lons)

# 4. Statistics and show results
import cartopy

# plot global STD map
lon2d, lat2d = np.meshgrid(grid.lon, grid.lat)

std_grid_value = np.std(grid.value, axis=0)
grid_std = sagea.GRD(std_grid_value * 100, lat=grid.lat, lon=grid.lon)  # EWH in unit [cm]

grid_std.plot(
    vmin=0, vmax=6,
    projection=cartopy.crs.Robinson(),
    cmap="Reds",
)

# plot variance-covariance matrix at discrete points
ewh_discrete *= 100  # EWH in unit [cm]
cov_discrete = np.cov(ewh_discrete.T)
plt.imshow(cov_discrete, cmap="RdBu_r")
plt.colorbar()
plt.show()
```

## 2.4). Error assessment with TCH/TCA methods

Here gives an example for error assessment between Level-2 products using TCH/TCA methods.

```python
# 1. Generate gridded EWH field from CSR, GFZ, JPL
import pathlib
import cartopy
import numpy as np
import sagea
from sagea.utils import TimeTool

"""define paths"""
dir_csr = pathlib.Path("/Volumes/WorkDrive/data/GRACE/L2_SH_products/GSM/CSR/RL06/BA01")
dir_gfz = pathlib.Path("/Volumes/WorkDrive/data/GRACE/L2_SH_products/GSM/GFZ/RL06/BA01")
dir_jpl = pathlib.Path("/Volumes/WorkDrive/data/GRACE/L2_SH_products/GSM/JPL/RL06/BA01")

path_gif48 = pathlib.Path("/Users/shuhao/PycharmProjects/SaGEA/data/auxiliary/GIF48.gfc")

path_TN14 = pathlib.Path("/Users/shuhao/PycharmProjects/SaGEA/data/L2_low_degrees/TN-14_C30_C20_SLR_GSFC.txt")

year_begin, year_end = 2002, 2020
lmax = 60
paths = [[], [], []]

for year in range(year_begin, year_end + 1):
    paths[0] += list(dir_jpl.glob(f"{year}/GSM-2*0600"))
    paths[1] += list(dir_gfz.glob(f"{year}/GSM-2*0600"))
    paths[2] += list(dir_csr.glob(f"{year}/GSM-2*0600"))

for path in paths:
    path.sort()

shc_gif48 = sagea.SHC.io.from_gfc(path_gif48, lmax=lmax)

grid_list = []
for i in range(len(paths)):
    dates_begin, dates_end = TimeTool.match_dates_from_name(paths[i])
    dates = TimeTool.get_average_dates(dates_begin, dates_end)

    shc = sagea.SHC.io.from_gfc(paths[i], lmax=lmax, key="GRCOF2")
    c20c30 = sagea.io.read_low_degs(path_TN14, dates)
    for low_id in ("c2,0", "c3,0"):
        shc.replace(low_id, c20c30[low_id], inplace=True)

    shc -= shc_gif48
    shc.value[:, :4] = 0  # set degree-0, -1 as 0

    shc.filter.gaussian(300, inplace=True)
    shc.convert(from_type="Geopotential", to_type="EWH", inplace=True)
    grid = shc.synthesize.to_grid(grid_space=1)

    grid_list.append(grid)

# 2. Error assessment using TCH
from sagea.error_assessment import tch, TCHMode

grid_err_tuple = tch(*grid_list, mode=TCHMode.OLS)

for grid_err in grid_err_tuple:
    grid_err.value *= 100
    grid_err.plot(
        vmin=0, vmax=6,
        projection=cartopy.crs.Robinson(),
        cmap="jet"
    )

# 2. Error assessment using TCA
from sagea.error_assessment import tca, TCAMode

grid_err_tuple = tca(*grid_list, mode=TCAMode.CLASSIC)

for grid_err in grid_err_tuple:
    grid_err.value *= 100
    grid_err.plot(
        vmin=0, vmax=6,
        projection=cartopy.crs.Robinson(),
        cmap="jet"
    )
```
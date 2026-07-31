---
title: "SaGEA is a Python toolbox for post-processing and error assessment of satellite gravity products"
---

**Back to** [<u>/software/</u>](/software/)

---

{% include_md software/sagea/_meta/_sagea.overview.md %}

---
<p style="text-align: justify; text-justify: inter-word;">
The level-2 time-variable gravity fields obtained from Gravity Recovery and Climate Experiment (GRACE) and its Follow-On (GRACE-FO) mission are widely used in multidiscipline geo-science studies.
However, the post-processing of those gravity fields to obtain a desired signal is rather challenging for users that are not familiar with the level-2 products.
In addition, the error assessment/quantification of those derived signals, which is of increasing demand in science application, is still a challenging issue even among the professional GRACE(-FO) users.
In this effort, the common post-processing steps and the assessment of complicated error (uncertainty) of GRACE(-FO), are integrated into an open-source, cross-platform and Python-based toolbox called SAGEA (SAtellite Gravity Error Assessment). 
With diverse options, SAGEA provides flexibility to generate signal along with the full error from level-2 products, so that any non-expert user can easily obtain advanced experience of GRACE(-FO) processing. Please contact Shuhao Liu <a href="mailto:liushuhao@apm.ac.cn">(<u>liushuhao@apm.ac.cn</u>)</a>
and Fan Yang <a href="mailto:fany@plan.aau.dk">(<u>fany@plan.aau.dk</u>)</a> for more information.
</p>

When referencing this work, please cite:

> Liu, S., Yang, F., & Forootan, E. (2025). SAGEA: A toolbox for comprehensive error assessment of GRACE and GRACE-FO
> based mass changes. _Computers & Geosciences_, 196, 105825.
> [<u>doi: 10.1016/j.cageo.2024.105825</u>](https://doi.org/10.1016/j.cageo.2024.105825)

---

<div class="ncsg-project-grid">

  <a class="ncsg-project-card" href="/software/sagea/get_started/">
    <div class="ncsg-project-card-header">
      <h3>Get started</h3>
    <svg class="icon ncsg-adaptive-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200" aria-hidden="true">
      <path d="M512 956.032h-1.088a27.008 27.008 0 0 1-24.704-17.024L369.92 654.08 84.992 537.792a27.904 27.904 0 0 1-1.92-50.56l833.024-416.448a27.84 27.84 0 0 1 37.312 37.312l-416.64 832.832a27.52 27.52 0 0 1-24.768 15.104zM162.688 509.568l239.04 97.664c6.848 2.752 12.352 8.32 15.168 15.168l97.6 238.976 351.872-703.744-703.68 352z" fill="#ffffff"></path>
    </svg>
    </div>
    <div class="ncsg-project-card-body">
      <p>
      Examples for quick use of sagea.
      </p>
    </div>
  </a>

  <a class="ncsg-project-card" href="/software/sagea/user_guide">
    <div class="ncsg-project-card-header">
      <h3>User guide</h3>
      <svg class="icon ncsg-adaptive-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2435"
     width="200" height="200">
        <path d="M896.2 230.7c0-4.3-0.7-8.5-2-12.4-0.7-3.5-2.3-6.7-4.6-9.4-7-10.4-18.9-17.2-32.3-17.2h-68V128h0.7V84.6c0-11.6-9.4-21.1-21.1-21.1H249.3v0.2c-50.3 3.2-90.2 45-90.2 96.2 0 5 0.4 9.9 1.1 14.6v740.8c0 24.4 19.8 44.1 44.1 44.1h625.8c0.1 0.6 0.6 1 1.2 1h16.8c19.2 0 35.6-11.7 42.7-28.3 2.3-5.4 3.6-11.4 3.6-17.7V256.2h1.6v-25.5zM253.5 128h3.8c0.9 0.1 1.7 0.1 2.6 0.2h86.6c0-0.1-0.1-0.2-0.1-0.2h378.4v63.8H256v0.6h-0.5v-0.4c-14.7 0-27.1-9.9-30.8-23.4v-7.1h-1.1V160c-0.1-17.1 13.2-31 29.9-32z m576.6 767H224.7V251.2c9.7 3.3 20 5 30.8 5 0.9 0 1.7 0 2.6-0.1h572.1V895z"
              fill="#ffffff" p-id="2436"></path>
        <path d="M345.6 423.6h320.8c17.8 0 32.2-14.4 32.2-32.2 0-17.8-14.4-32.2-32.2-32.2H345.6c-17.8 0-32.2 14.4-32.2 32.2 0 17.8 14.4 32.2 32.2 32.2zM504.9 488.7H348.1c-17.8 0-32.2 14.4-32.2 32.2 0 17.8 14.4 32.2 32.2 32.2H505c17.8 0 32.2-14.4 32.2-32.2 0-17.8-14.5-32.2-32.3-32.2z"
              fill="#ffffff" p-id="2437"></path>
      </svg>
    </div>
    <div class="ncsg-project-card-body">
      <p>
        Documentary for sagea.
      </p>
    </div>
  </a>

  <a class="ncsg-project-card" href="/software/sagea/products">
    <div class="ncsg-project-card-header">
      <h3>Products</h3>
      <svg class="icon ncsg-adaptive-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
     p-id="11552" width="200" height="200">
        <path d="M490.48 397.322c0 52.617-42.658 95.274-95.276 95.274H159.662c-52.618 0-95.274-42.658-95.274-95.274V161.78c0-52.618 42.658-95.275 95.274-95.275h235.542c52.618 0 95.275 42.657 95.275 95.275v235.542zM435.5 161.78c0-22.256-18.04-40.296-40.296-40.296H159.662c-22.255 0-40.295 18.04-40.295 40.296v235.542c0 22.255 18.04 40.295 40.295 40.295h235.542c22.255 0 40.296-18.04 40.296-40.295V161.78z"
              p-id="11553" fill="#ffffff"></path>
        <path d="M174.346 286.423c-7.597 0-13.745-6.148-13.745-13.746v-24.765c0-38.067 25.396-71.449 60.322-71.449h85.638c7.583 0 13.745 6.148 13.745 13.745 0 7.597-6.162 13.745-13.745 13.745h-85.638c-21.435 0-32.832 23.637-32.832 43.96v24.764c0 7.598-6.16 13.746-13.745 13.746zM169.112 333.564c-3.584 0-7.155-1.516-9.758-3.987-2.483-2.604-3.987-6.188-3.987-9.759 0-3.57 1.503-7.14 3.987-9.758 5.222-5.088 14.282-5.088 19.516 0 2.47 2.617 3.987 6.188 3.987 9.758 0 3.57-1.516 7.155-3.987 9.624-2.617 2.606-6.188 4.122-9.758 4.122zM957.807 397.322c0 52.617-42.66 95.274-95.276 95.274H626.989c-52.618 0-95.274-42.658-95.274-95.274V161.78c0-52.618 42.657-95.275 95.274-95.275h235.542c52.617 0 95.276 42.657 95.276 95.275v235.542z m-54.98-235.542c0-22.256-18.04-40.296-40.296-40.296H626.989c-22.254 0-40.295 18.04-40.295 40.296v235.542c0 22.255 18.04 40.295 40.295 40.295h235.542c22.256 0 40.296-18.04 40.296-40.295V161.78zM490.48 864.647c0 52.617-42.658 95.275-95.276 95.275H159.662c-52.618 0-95.274-42.659-95.274-95.275v-235.54c0-52.618 42.658-95.275 95.274-95.275h235.542c52.618 0 95.275 42.658 95.275 95.274v235.54z m-54.98-235.54c0-22.256-18.04-40.297-40.296-40.297H159.662c-22.255 0-40.295 18.041-40.295 40.296v235.542c0 22.255 18.04 40.296 40.295 40.296h235.542c22.255 0 40.296-18.041 40.296-40.296V629.106zM957.807 864.647c0 52.617-42.66 95.275-95.276 95.275H626.989c-52.618 0-95.274-42.659-95.274-95.275v-235.54c0-52.618 42.657-95.275 95.274-95.275h235.542c52.617 0 95.276 42.658 95.276 95.274v235.54z m-54.98-235.54c0-22.256-18.04-40.297-40.296-40.297H626.989c-22.254 0-40.295 18.041-40.295 40.296v235.542c0 22.255 18.04 40.296 40.295 40.296h235.542c22.256 0 40.296-18.041 40.296-40.296V629.106z"
              p-id="11554" fill="#ffffff"></path>
      </svg>
    </div>
    <div class="ncsg-project-card-body">
      <p>
        Product examples produced via sagea.
      </p>
    </div>
  </a>

  <a class="ncsg-project-card" href="/software/sagea/contributor_guide">
    <div class="ncsg-project-card-header">
      <h3>Contributor guide</h3>
        <svg class="icon ncsg-adaptive-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6835"
             width="200" height="200">
            <path d="M466.315636 727.389091c0.395636 0 0.791273 0 1.186909-0.046546h88.99491l1.186909 0.046546a24.087273 24.087273 0 1 0-1.186909-48.151273h-88.99491a24.087273 24.087273 0 1 0-1.186909 48.128z m24.203637 18.315636c0.395636 0 0.791273 0 1.186909 0.046546h40.587636a24.087273 24.087273 0 1 1 0 48.104727h-40.587636l-1.163637 0.023273a24.087273 24.087273 0 0 1 0-48.174546z m170.146909-428.916363c-41.053091-41.029818-90.600727-61.556364-148.666182-61.556364-58.042182 0-107.589818 20.526545-148.642909 61.579636-41.053091 41.053091-61.579636 90.600727-61.579636 148.642909 0 44.125091 12.590545 84.247273 37.794909 120.296728a206.08 206.08 0 0 0 96.814545 75.915636c2.746182 1.070545 5.678545 1.629091 8.657455 1.629091h133.934545c2.955636 0 5.888-0.558545 8.657455-1.629091a206.103273 206.103273 0 0 0 96.814545-75.915636A205.265455 205.265455 0 0 0 722.245818 465.454545c0-58.042182-20.526545-107.589818-61.579636-148.642909z m-263.307637 34.024727c31.650909-31.650909 69.888-47.476364 114.641455-47.476364 44.776727 0 82.990545 15.825455 114.641455 47.476364 31.650909 31.650909 47.476364 69.888 47.476363 114.641454a158.254545 158.254545 0 0 1-29.090909 92.741819 158.813091 158.813091 0 0 1-70.679273 56.994909h-124.695272a158.789818 158.789818 0 0 1-70.656-57.018182A158.254545 158.254545 0 0 1 349.882182 465.454545c0-44.753455 15.825455-82.967273 47.476363-114.641454z m68.887273 80.919273a24.087273 24.087273 0 1 0-48.104727 0v68.654545a24.064 24.064 0 0 0 34.792727 21.480727L512 492.357818l59.066182 29.509818a24.040727 24.040727 0 0 0 34.816-21.504v-68.631272-1.163637a24.087273 24.087273 0 1 0-48.104727 1.163637v29.719272l-35.025455-17.501091a24.040727 24.040727 0 0 0-21.504 0l-35.002182 17.501091V431.709091z"
                  fill="#ffffff" p-id="6836"></path>
        </svg>
    </div>
    <div class="ncsg-project-card-body">
      <p>
        Join us as a sagea contributor!
      </p>
    </div>
  </a>

</div>
---
title: Spherical Harmonic Field Lab
description: Explore how spherical harmonic coefficients shape the spatial distribution of Earth's gravity field.
layout: page
comment: false
toc: false
---

<div class="spectral-spatial-shell">
  <iframe
    id="spectral-spatial-demo"
    class="spectral-spatial-frame"
    src="./app/"
    title="Interactive spherical harmonic field laboratory"
    loading="eager"
  ></iframe>
</div>

<style>
main > .container.nopadding-x-md,
#board > .container,
#board .col-12.col-md-10.m-auto {
  width: 100%;
  max-width: none;
  padding: 0;
}

#board {
  margin-top: 0 !important;
  padding: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

#board .row {
  margin: 0;
}

#board .col-12.col-md-10.m-auto {
  flex: 0 0 100%;
}

.page-content {
  overflow: visible;
}

.spectral-spatial-shell {
  position: relative;
  left: 50%;
  width: min(1480px, calc(100vw - 32px));
  margin: 0;
  overflow: hidden;
  background: #f2f1ec;
  transform: translateX(-50%);
}

.spectral-spatial-frame {
  display: block;
  width: 100%;
  min-height: 680px;
  border: 0;
  background: #f2f1ec;
}

html[data-user-color-scheme="dark"] .spectral-spatial-shell,
html[data-user-color-scheme="dark"] .spectral-spatial-frame {
  background: #181c27;
}

@media (prefers-color-scheme: dark) {
  html:not([data-user-color-scheme]) .spectral-spatial-shell,
  html:not([data-user-color-scheme]) .spectral-spatial-frame {
    background: #181c27;
  }
}

@media (max-width: 767px) {
  .spectral-spatial-shell {
    width: 100vw;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function () {
  const frame = document.getElementById('spectral-spatial-demo');
  if (!frame) return;

  function getBlogTheme() {
    const explicitTheme = document.documentElement.getAttribute('data-user-color-scheme');
    if (explicitTheme === 'dark' || explicitTheme === 'light') return explicitTheme;
    const colorMode = getComputedStyle(document.documentElement).getPropertyValue('--color-mode').replace(/["'\s]/g, '');
    return colorMode === 'dark' ? 'dark' : 'light';
  }

  function syncTheme() {
    try {
      if (frame.contentDocument) {
        frame.contentDocument.documentElement.setAttribute('data-blog-theme', getBlogTheme());
      }
    } catch (_) {}
  }

  function resizeFrame() {
    try {
      const documentElement = frame.contentDocument && frame.contentDocument.documentElement;
      const body = frame.contentDocument && frame.contentDocument.body;
      if (!documentElement || !body) return;
      frame.style.height = Math.max(680, documentElement.scrollHeight, body.scrollHeight) + 'px';
    } catch (_) {
      frame.style.height = '920px';
    }
  }

  frame.addEventListener('load', function () {
    syncTheme();
    resizeFrame();
    if (window.ResizeObserver && frame.contentDocument) {
      const observer = new ResizeObserver(resizeFrame);
      observer.observe(frame.contentDocument.documentElement);
      observer.observe(frame.contentDocument.body);
    }
  });
  const themeObserver = new MutationObserver(syncTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-user-color-scheme'] });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncTheme);
  window.addEventListener('resize', resizeFrame);
});
</script>

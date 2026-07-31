(function () {
  const ICONS = {
    copy:
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<rect x="9" y="9" width="13" height="13" rx="2"></rect>' +
      '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>' +
      "</svg>",

    copied:
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M20 6L9 17l-5-5"></path>' +
      "</svg>",

    failed:
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M18 6L6 18"></path>' +
      '<path d="M6 6l12 12"></path>' +
      "</svg>",

    expand:
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M7 13l5 5 5-5"></path>' +
      '<path d="M7 7l5 5 5-5"></path>' +
      "</svg>",

    collapse:
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M7 13l5-5 5 5"></path>' +
      '<path d="M7 19l5-5 5 5"></path>' +
      "</svg>"
  };

  function setButtonIcon(button, iconName, label) {
    button.innerHTML = ICONS[iconName] || "";
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  }

  function getLanguageName(figure) {
  if (!figure) {
    return "";
  }

  /*
   * Hexo highlight 常见形式：
   * <figure class="highlight python">
   */
  const ignoredClasses = new Set([
    "highlight",
    "ncsg-code-enhanced",
    "ncsg-code-expanded"
  ]);

  let lang = "";

  figure.classList.forEach(function (cls) {
    if (!ignoredClasses.has(cls) && !cls.startsWith("ncsg-")) {
      lang = cls;
    }
  });

  /*
   * fallback:
   * 某些渲染器可能生成：
   * <code class="language-python">
   * <code class="lang-python">
   */
  if (!lang) {
    const code = figure.querySelector("code[class*='language-'], code[class*='lang-']");
    if (code) {
      code.classList.forEach(function (cls) {
        if (cls.startsWith("language-")) {
          lang = cls.replace(/^language-/, "");
        } else if (cls.startsWith("lang-")) {
          lang = cls.replace(/^lang-/, "");
        }
      });
    }
  }

  if (!lang) {
    return "";
  }

  lang = lang.toLowerCase();

  /*
   * 显示名映射。
   * 你可以继续按需添加。
   */
  const languageMap = {
    py: "Python",
    python: "Python",
    js: "JavaScript",
    javascript: "JavaScript",
    ts: "TypeScript",
    typescript: "TypeScript",
    html: "HTML",
    xml: "XML",
    css: "CSS",
    scss: "SCSS",
    sass: "Sass",
    json: "JSON",
    yaml: "YAML",
    yml: "YAML",
    bash: "Bash",
    sh: "Shell",
    shell: "Shell",
    zsh: "Zsh",
    powershell: "PowerShell",
    ps1: "PowerShell",
    c: "C",
    cpp: "C++",
    "c++": "C++",
    cxx: "C++",
    hpp: "C++",
    java: "Java",
    kotlin: "Kotlin",
    go: "Go",
    rust: "Rust",
    rs: "Rust",
    ruby: "Ruby",
    php: "PHP",
    sql: "SQL",
    r: "R",
    matlab: "MATLAB",
    tex: "TeX",
    latex: "LaTeX",
    markdown: "Markdown",
    md: "Markdown",
    dockerfile: "Dockerfile",
    makefile: "Makefile",
    toml: "TOML",
    ini: "INI"
  };

  if (languageMap[lang]) {
    return languageMap[lang];
  }

  /*
   * 默认首字母大写。
   */
  return lang.charAt(0).toUpperCase() + lang.slice(1);
}

  function getCodeText(figure) {
    const codePre =
      figure.querySelector("td.code pre") ||
      figure.querySelector("pre code") ||
      figure.querySelector("pre");

    if (!codePre) {
      return "";
    }

    const lines = codePre.querySelectorAll(".line");

    if (lines && lines.length > 0) {
      return Array.from(lines)
        .map(function (line) {
          return line.textContent || "";
        })
        .join("\n")
        .replace(/\n+$/, "");
    }

    return (codePre.innerText || codePre.textContent || "").replace(/\n+$/, "");
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      const textarea = document.createElement("textarea");
      textarea.value = text;

      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "-9999px";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);

        if (successful) {
          resolve();
        } else {
          reject(new Error("copy command failed"));
        }
      } catch (err) {
        document.body.removeChild(textarea);
        reject(err);
      }
    });
  }

  function updateToggleVisibility(figure, scrollBox, toggleBtn) {
    if (!figure || !scrollBox || !toggleBtn) {
      return;
    }

    /*
     * 如果当前已经展开，先不强行重新计算。
     * 否则在 resize 时可能造成视觉跳动。
     */
    if (figure.classList.contains("ncsg-code-expanded")) {
      toggleBtn.classList.remove("ncsg-code-toggle-hidden");
      return;
    }

    /*
     * 判断是否真的需要纵向滚动。
     * scrollHeight 是完整内容高度。
     * clientHeight 是当前可见高度。
     */
    const needsToggle = scrollBox.scrollHeight > scrollBox.clientHeight + 2;

    if (needsToggle) {
      toggleBtn.classList.remove("ncsg-code-toggle-hidden");
      toggleBtn.disabled = false;
    } else {
      toggleBtn.classList.add("ncsg-code-toggle-hidden");
      toggleBtn.disabled = true;

      figure.classList.remove("ncsg-code-expanded");
      setButtonIcon(toggleBtn, "expand", "expand");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  }

  function enhanceCodeBlock(figure) {
    if (!figure || figure.classList.contains("ncsg-code-enhanced")) {
      return;
    }

    const table = figure.querySelector(":scope > table") || figure.querySelector("table");

    if (!table) {
      return;
    }

    figure.classList.add("ncsg-code-enhanced");

const toolbar = document.createElement("div");
toolbar.className = "ncsg-code-toolbar";

/*
 * 左侧语言标签
 */
const langLabel = document.createElement("div");
langLabel.className = "ncsg-code-lang";
langLabel.textContent = getLanguageName(figure);

/*
 * 右侧按钮区
 */
const actions = document.createElement("div");
actions.className = "ncsg-code-actions";

const toggleBtn = document.createElement("button");
toggleBtn.type = "button";
toggleBtn.className = "ncsg-code-btn ncsg-code-toggle";
setButtonIcon(toggleBtn, "expand", "展开代码");
toggleBtn.setAttribute("aria-expanded", "false");

const copyBtn = document.createElement("button");
copyBtn.type = "button";
copyBtn.className = "ncsg-code-btn ncsg-code-copy";
setButtonIcon(copyBtn, "copy", "复制代码");

actions.appendChild(toggleBtn);
actions.appendChild(copyBtn);

toolbar.appendChild(langLabel);
toolbar.appendChild(actions);

    let scrollBox = table.parentElement;

    if (!scrollBox || !scrollBox.classList.contains("ncsg-code-scroll")) {
      scrollBox = document.createElement("div");
      scrollBox.className = "ncsg-code-scroll";

      table.parentNode.insertBefore(scrollBox, table);
      scrollBox.appendChild(table);
    }

    figure.insertBefore(toolbar, figure.firstChild);

    toggleBtn.addEventListener("click", function () {
      const expanded = figure.classList.toggle("ncsg-code-expanded");

      if (expanded) {
        setButtonIcon(toggleBtn, "collapse", "collapse");
        toggleBtn.setAttribute("aria-expanded", "true");
      } else {
        setButtonIcon(toggleBtn, "expand", "expand");
        toggleBtn.setAttribute("aria-expanded", "false");

        /*
         * 折叠回去后，把滚动位置重置到顶部。
         * 如果你希望保留原滚动位置，可以删掉这两行。
         */
        scrollBox.scrollTop = 0;
      }
    });

    copyBtn.addEventListener("click", function () {
      const code = getCodeText(figure);

      if (!code) {
        copyBtn.classList.add("ncsg-code-failed");
        setButtonIcon(copyBtn, "failed", "failed");

        setTimeout(function () {
          copyBtn.classList.remove("ncsg-code-failed");
          setButtonIcon(copyBtn, "copy", "copy");
        }, 1200);

        return;
      }

      copyText(code)
        .then(function () {
          copyBtn.classList.add("ncsg-code-copied");
          setButtonIcon(copyBtn, "copied", "copied");

          setTimeout(function () {
            copyBtn.classList.remove("ncsg-code-copied");
            setButtonIcon(copyBtn, "copy", "copy");
          }, 1200);
        })
        .catch(function () {
          copyBtn.classList.add("ncsg-code-failed");
          setButtonIcon(copyBtn, "failed", "failed");

          setTimeout(function () {
            copyBtn.classList.remove("ncsg-code-failed");
            setButtonIcon(copyBtn, "copy", "copy");
          }, 1500);
        });
    });

    /*
     * 等浏览器完成布局后再判断是否需要展开按钮。
     * 否则刚插入 DOM 时高度可能还没稳定。
     */
    requestAnimationFrame(function () {
      updateToggleVisibility(figure, scrollBox, toggleBtn);
    });

    /*
     * 字体加载完成后，高度可能变化，再判断一次。
     */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        updateToggleVisibility(figure, scrollBox, toggleBtn);
      });
    }

    /*
     * 窗口尺寸变化后重新判断。
     */
    let resizeTimer = null;

    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(function () {
        updateToggleVisibility(figure, scrollBox, toggleBtn);
      }, 150);
    });
  }

  function initCodeTools() {
    const figures = document.querySelectorAll("figure.highlight");

    figures.forEach(function (figure) {
      enhanceCodeBlock(figure);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCodeTools);
  } else {
    initCodeTools();
  }
})();
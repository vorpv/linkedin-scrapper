___m2 = function({filename="", text="", label=""} = {}) {
  const button = document.createElement("button");

  button.textContent = label;

  Object.assign(button.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "999999",
    padding: "14px 22px",
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)"
  });

  button.addEventListener("click", () => {
    const blob = new Blob([text], {
      type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    button.remove();
  });

  document.body.appendChild(button);

  return button;
}

___m1 = 5000;

___21 = (ms) => new Promise(resolve => setTimeout(resolve, ms));

___22 = (value) => (value || "").replace(/\s+/g, " ").trim();

___23 = (href) => {
  if (!href) return "";
  try {
    const url = new URL(href, location.href);
    const match = url.pathname.match(/\/jobs\/view\/(\d+)/);
    return match ? `https://www.linkedin.com/jobs/view/${match[1]}/` : url.href;
  } catch (e) {
    return href;
  }
};

___24 = (root) => Array.from(root.querySelectorAll("button"))
  .find(button => /^(…\s*)?more$/i.test(___22(button.innerText || button.textContent)));

___25 = () => {
  const button = document.querySelector('[data-testid="expandable-text-button"]') || ___24(document);
  if (!button) return false;

  (button.querySelector('[style*="pointer-events: auto"]') || button).click();
  return true;
};

___26 = () => {
  const box = document.querySelector('[data-testid="expandable-text-box"]');
  if (box) return ___22(box.innerText) || ___22(box.textContent);

  const heading = Array.from(document.querySelectorAll("h1, h2, h3"))
    .find(node => /^About the job$/i.test(___22(node.innerText) || ___22(node.textContent)));
  const section = heading?.closest('[componentkey^="JobDetails_AboutTheJob_"]') || heading?.parentElement;
  return (___22(section?.innerText) || ___22(section?.textContent)).replace(/^About the job\s*/i, "");
};

___31 = async (timeoutMs = 3000) => {
  const startedAt = Date.now();
  let description = ___26();

  while (!description && Date.now() - startedAt < timeoutMs) {
    await ___21(200);
    description = ___26();
  }

  return description;
};

___27 = (card) => {
  const dismissLabel = card.querySelector('button[aria-label^="Dismiss "][aria-label$=" job"]')
    ?.getAttribute("aria-label");
  if (!dismissLabel) return "";

  return ___22(dismissLabel.replace(/^Dismiss\s+/i, "").replace(/\s+job$/i, ""));
};

___28 = (card, jobName) => {
  const lines = Array.from(card.querySelectorAll("p, span"))
    .filter(node => !node.closest("button"))
    .filter(node => node.getAttribute("aria-hidden") !== "true")
    .map(node => ___22(node.innerText || node.textContent))
    .filter(Boolean)
    .filter((line, index, arr) => arr.indexOf(line) === index)
    .filter(line => !line.includes(jobName));

  return lines.find(line => !/^(Viewed|Saved|Applied|Reposted)$/i.test(line)) || "";
};

___29 = (card) => {
  const cardKey = card.getAttribute("componentkey") || card.querySelector('[componentkey^="job-card-component-ref-"]')?.getAttribute("componentkey");
  const cardJobId = cardKey?.match(/job-card-component-ref-(\d+)/)?.[1];
  if (cardJobId) return `https://www.linkedin.com/jobs/view/${cardJobId}/`;

  const link = card.querySelector('a[href*="/jobs/view/"]')
    || document.querySelector('a[href*="/jobs/view/"]:not([href*="/apply/"])');
  return ___23(link?.href);
};

___32 = (card) => Array.from(card.querySelectorAll("p, span"))
  .filter(node => !node.closest("button"))
  .filter(node => node.getAttribute("aria-hidden") !== "true")
  .some(node => /^(Viewed|Saved)$/i.test(___22(node.innerText || node.textContent)));

___30 = () => {
  const cardsByDismissButton = Array.from(document.querySelectorAll('button[aria-label^="Dismiss "][aria-label$=" job"]'))
    .map(button => button.closest('[componentkey^="job-card-component-ref-"]') || button.closest('[role="button"]'))
    .filter(Boolean);

  const cardsByComponentKey = Array.from(document.querySelectorAll('[componentkey^="job-card-component-ref-"][role="button"]'));

  const byKey = new Map();
  Array.from(new Set([...cardsByDismissButton, ...cardsByComponentKey])).forEach(card => {
    const key = card.getAttribute("componentkey") || card.querySelector('[componentkey^="job-card-component-ref-"]')?.getAttribute("componentkey") || Math.random();
    if (!byKey.has(key)) byKey.set(key, card);
  });

  return Array.from(byKey.values()).filter(card => !___32(card));
};

___2 = ___30();

___3 = async function() {
  let rs = [];
  for (let i in ___2) {
    try {
      console.log(`Loading ${Number(i) + 1} of ${___2.length}`);
      let item = ___2[i];
      let jobName = ___27(item);
      let companyName = ___28(item, jobName);

      item.click();
      await ___21(___m1);
      ___25();
      await ___21(100);

      rs.push(
        {
          jobName,
          companyName,
          description: await ___31(),
          jobUrl: ___29(item)
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  ___m2({
    filename: `LinkedIn_jobs_${Date.now()}.json`,
    text: JSON.stringify(rs),
    label: "Download"
  });
}

___3().then(d => console.log(d));

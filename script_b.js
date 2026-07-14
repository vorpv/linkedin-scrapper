___m1 = 100;
___0 = ;

___21 = (ms) => new Promise(resolve => setTimeout(resolve, ms));

___22 = (value) => (value || "").replace(/\s+/g, " ").trim();

___23 = (card) => {
  const dismissLabel = card.querySelector('button[aria-label^="Dismiss "][aria-label$=" job"]')
    ?.getAttribute("aria-label");
  if (!dismissLabel) return "";

  return ___22(dismissLabel.replace(/^Dismiss\s+/i, "").replace(/\s+job$/i, ""));
};

___24 = (card, jobName) => {
  const lines = Array.from(card.querySelectorAll("p, span"))
    .filter(node => !node.closest("button"))
    .filter(node => node.getAttribute("aria-hidden") !== "true")
    .map(node => ___22(node.innerText || node.textContent))
    .filter(Boolean)
    .filter((line, index, arr) => arr.indexOf(line) === index)
    .filter(line => !line.includes(jobName));

  return lines.find(line => !/^(Actively reviewing applicants|Promoted|Viewed|Applied|Easy Apply|Reposted|Posted\b|\d+\s+\w+\s+ago|Be an early applicant)$/i.test(line)) || "";
};

___25 = () => {
  const cardsByDismissButton = Array.from(document.querySelectorAll('button[aria-label^="Dismiss "][aria-label$=" job"]'))
    .map(button => button.closest('[componentkey^="job-card-component-ref-"]') || button.closest('[role="button"]'))
    .filter(Boolean);

  const cardsByComponentKey = Array.from(document.querySelectorAll('[componentkey^="job-card-component-ref-"][role="button"]'));

  const byKey = new Map();
  Array.from(new Set([...cardsByDismissButton, ...cardsByComponentKey])).forEach(card => {
    const key = card.getAttribute("componentkey") || card.querySelector('[componentkey^="job-card-component-ref-"]')?.getAttribute("componentkey") || Math.random();
    if (!byKey.has(key)) byKey.set(key, card);
  });

  return Array.from(byKey.values());
};

___26 = (card, companyName, reason) => {
  const textNodes = Array.from(card.querySelectorAll("p, span, div"))
    .filter(node => ___22(node.innerText) === companyName);
  const target = textNodes[0];

  if (target) {
    target.innerText = reason;
    return;
  }

  const note = document.createElement("div");
  note.innerText = reason;
  note.style.marginTop = "4px";
  note.style.fontWeight = "600";
  card.appendChild(note);
};

___2 = ___25().filter(card => {
  const jobName = ___23(card);
  const companyName = ___24(card, jobName);

  const arr = ___0.filter(x => ___22(jobName) == ___22(x.jobName) && ___22(companyName) == ___22(x.companyName));
  if (arr.length > 0) {
    card._reason = arr[0].reason;
    card._companyName = companyName;
    return true;
  }

  return false;
});

___3 = async function() {
  for (let i in ___2) {
    console.log(`Killing ${Number(i) + 1} of ${___2.length}`);
    let item = ___2[i];
    ___26(item, item._companyName, item._reason);
    item.querySelector('button[aria-label^="Dismiss "][aria-label$=" job"]')?.click();
    await ___21(___m1);
  }
}

___3();

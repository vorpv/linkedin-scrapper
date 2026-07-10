# LinkedIn Job Scrapper

Small browser-console workflow for collecting LinkedIn job data, asking an AI to review it, and optionally hiding the jobs that the AI marked as bad matches.

The repository has three main files:

- `script_a.js` - paste this into the browser console on a LinkedIn jobs page. It opens jobs one by one, extracts job title, company name, and description, then shows a `Download` button with the collected JSON.
- `prompt_base.md` - base prompt for an AI assistant. Attach the JSON file created by `script_a.js` and ask the AI to return only the jobs that should be removed or ignored.
- `script_b.js` - optional cleanup script. Paste the AI output into the script, run it in the browser console, and it will press the `X` button for matching bad jobs in the LinkedIn UI.

## Why Use This

- No bot-style scraping flow. The scripts run inside your real browser session, on the page you already opened manually.
- Lower bot-detection risk compared to automated browser drivers or direct HTTP scraping, because the browser, login session, cookies, and UI interactions are real.
- AI-based filtering instead of raw keyword filtering. The prompt asks the AI to read job descriptions and reason about fit, so it can catch cases that simple keyword allowlists or blocklists would miss.
- Human-readable review loop. You can inspect the downloaded JSON and AI output before using the optional removal script.

## Usage

### 1. Open LinkedIn Jobs

Open LinkedIn in your normal browser and go to the jobs search/list page you want to filter.

Scroll or paginate until the visible list contains the jobs you want to process. The script works with the jobs currently available in the page UI.

### 2. Run Script A

Open the browser developer tools and switch to the Console tab.

Copy the full contents of `script_a.js`, paste it into the console, and press Enter.

The script will:

1. Go through the visible job cards.
2. Open each job.
3. Extract the job name, company name, and description.
4. Show progress in the console.
5. Add a `Download` button in the middle of the page when finished.

Click `Download` to save a file named like:

```text
LinkedIn_jobs_1234567890.json
```

### 3. Ask AI To Filter Jobs

Open `prompt_base.md` and use it as the prompt for your AI assistant.

Before sending the prompt, replace the example `Company name blacklist` and `Non-fit requirements` sections with your own rules. The current values are only examples of one person's filtering preferences.

Attach the JSON file downloaded from `script_a.js`.

The AI should return a valid JSON array where each item has:

```json
{
  "companyName": "Original company name",
  "jobName": "Original job name",
  "reason": "Short reason why this job was red-flagged"
}
```

The output must include only red-flagged jobs. Keep this JSON output if you want to use `script_b.js`.

### 4. Optional: Remove Bad Jobs With Script B

Use this only after you have reviewed the AI output.

Open `script_b.js` and replace this line:

```js
___0 = ;
```

with the JSON array returned by the AI:

```js
___0 = [
  {
    "companyName": "Example Company",
    "jobName": "Example Job",
    "reason": "Reason from AI"
  }
];
```

Then copy the full updated script, paste it into the LinkedIn browser console, and press Enter.

The script will find matching visible jobs by `companyName` and `jobName`, press the `X` button for each one, and write the AI reason into the job card text so you can see why it was removed.

## Notes

- These scripts depend on LinkedIn's current page structure and CSS classes. If LinkedIn changes the UI, selectors may need to be updated.
- Run the scripts only on job lists you can visually inspect. `script_b.js` performs UI actions automatically.
- The AI output for `script_b.js` must be valid JavaScript-compatible JSON array syntax.
- `script_a.js` waits between opening jobs to give LinkedIn time to render the description. If job descriptions are incomplete, increase the `___m1` delay in `script_a.js`.

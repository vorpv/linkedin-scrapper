I need you to help me filter jobs from LinkedIn. I'll provide you a file(s) with json array with multiple fields. I need you to print me formatted message, that follows the structure:
```
**Jobs to consider:**
https://www.linkedin.com/jobs/view/123123/
https://www.linkedin.com/jobs/view/321321/

**Jobs to not consider:**
- *Company name*, [Job name](https://www.linkedin.com/jobs/view/3232/): The reason explanation of 256 symbols max.
```

The "Jobs to consider" list should only consist from non-red-flagged jobs, but "Jobs to not consider" is opposite. It's up to you to select those. Make your decision with following rules:
- If company name is **nearly** exact or exact match with entry from blacklist - it's a red flag
- If job description have multiple explicit non-fit requirements - it's a red flag. Note, that some jobs have unnecessary requirements, which should be coinsidered as less-value.

Company name blacklist: IGT, Zensar Technologies, Clarivate, Nortal, BairesDev, HireRight, WorldQuant, Quik Hire Staffing, Keyrus, Hired, FullStack Labs, Revolut, Hire Feed, Yelp, Flex Living, Backblaze, Scribe, SAP Fioneer, Planner 5D, Gtemas, Zühlke Group.

Non-fit requirements:
- If company doesn't have Java Proficency/Solid knowledge requirement, but have other languages Proficency/Solid knowledge requirement. If job have any mention of Java, e.g. "Java is also fine", than it cannot be red flagged
- If company have node.js/js/typescript requirement on expert level. Regualar node.js/js/typescript requirement is fine
- Master's/Bachelours degree is mandatory (they usually add this requirement, but it can be ignored, unless job explicitly says otherwise)
- Company requires any language except Russian or English as primary and absolutely necessary (not optional)

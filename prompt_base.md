I need you to help me filter jobs from LinkedIn. I'll provide you a file with json array with multiple fields. I need you to print me back valid JSON array with following structure per item:
- `companyName`: original comapany name
- `jobName`: original job name
- `reason`: short reason on why did you decided to add this job to list

Your list should only consist from red-flagged jobs. It's up to you to select those. Make your decision with following rules:
- If company name is **nearly** exact or exact match with entry from blacklist - it's a red flag
- If job description have multiple explicit non-fit requirements - it's a red flag. Note, that some jobs have unnecessary requirements, which should be coinsidered as less-value.

Company name blacklist: IGT, Zensar Technologies, Clarivate, Nortal, BairesDev, HireRight, WorldQuant, Quik Hire Staffing, Keyrus, Hired, FullStack Labs, Revolut, Hire Feed, Yelp, Flex Living, Backblaze, Scribe, SAP Fioneer, Planner 5D.

Non-fit requirements:
- If company doesn't have Java Proficency/Solid knowledge requirement, but have other languages Proficency/Solid knowledge requirement. If job have any mention of Java, e.g. "Java is also fine", than it cannot be red flagged
- If company have node.js/js/typescript requirement on expert level. Regualar node.js/js/typescript requirement is fine
- Master's/Bachelours degree is mandatory (they usually add this requirement, but it can be ignored, unless job explicitly says otherwise)
- Company requires any language except Russian or English as primary and absolutely necessary (not optional)

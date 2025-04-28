function parseEnv() {
  const envVars = process.env;
  const rssVars = [];

  for (const [key, value] of Object.entries(envVars)) {
    if (key.startsWith("RSS_")) {
      rssVars.push(`${key}=${value}`);
    }
  }

  console.log(rssVars.join("; "));
}

parseEnv();

"use client";

import { useEffect } from "react";

export default function NewRelicAgent() {
  useEffect(() => {
    // Only run in the browser
    if (typeof window === "undefined") return;

    // Import and initialize New Relic dynamically
    import("@newrelic/browser-agent/loaders/browser-agent").then(
      ({ BrowserAgent }) => {
        const options = {
          info: {
            applicationID: 1103491955,
            beacon: "bam.nr-data.net",
            errorBeacon: "bam.nr-data.net",
            licenseKey: "NRJS-b2c305c630b425195b7",
            sa: 1,
          },
          init: {
            ajax: {
              deny_list: ["bam.nr-data.net"],
            },
            browser_consent_mode: {
              enabled: false,
            },
            distributed_tracing: {
              enabled: true,
            },
            performance: {
              capture_detail: false,
              capture_marks: false,
              capture_measures: true,
            },
            privacy: {
              cookies_enabled: true,
            },
          },
          loader_config: {
            accountID: 7729792,
            agentID: 1103491955,
            applicationID: 1103491955,
            licenseKey: "NRJS-b2c305c630b425195b7",
            trustKey: 7729792,
          },
        };

        new BrowserAgent(options);
      }
    );
  }, []);

  return null;
}

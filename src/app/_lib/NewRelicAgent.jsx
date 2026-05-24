"use client";

// TODO: Add New Relic browser agent initialization here.

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
            applicationID: your_application_id,
            beacon: "bam.nr-data.net",
            errorBeacon: "bam.nr-data.net",
            licenseKey: "your_license_key",
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
            accountID: your_acount_id,
            agentID: your_agent_id,
            applicationID: your_application_id,
            licenseKey: "your_license_key",
            trustKey: your_trust_key,
          },
        };

        new BrowserAgent(options);
      }
    );
  }, []);

  return null;
}

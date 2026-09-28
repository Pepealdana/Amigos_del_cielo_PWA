module.exports = {
  ci: {
    collect: {
      staticDistDir: "./",
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.70 }],
        "categories:accessibility": ["warn", { minScore: 0.90 }],
        "categories:best-practices": ["warn", { minScore: 0.85 }],
        "categories:seo": ["warn", { minScore: 0.80 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};

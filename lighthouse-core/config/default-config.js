/**
 * @license Copyright 2018 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

/* eslint-disable max-len */

const constants = require('./constants.js');
const i18n = require('../lib/i18n/i18n.js');
const m2a = require('./metrics-to-audits.js');

const UIStrings = {
  /** Title of the Performance category of audits. Equivalent to 'Web performance', this term is inclusive of all web page speed and loading optimization topics. Also used as a label of a score gauge; try to limit to 20 characters. */
  performanceCategoryTitle: 'Performance',
  /** Title of the Budgets section of the Performance Category. 'Budgets' refers to a budget (like a financial budget), but applied to the amount of resources on a page, rather than money. */
  budgetsGroupTitle: 'Budgets',
  /** Description of the Budgets section of the Performance category. Within this section the budget results are displayed. */
  budgetsGroupDescription: 'Performance budgets set standards for the performance of your site.',
  /** Title of the speed metrics section of the Performance category. Within this section are various speed metrics which quantify the pageload performance into values presented in seconds and milliseconds. */
  metricGroupTitle: 'Metrics',
  /** Title of the opportunity section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the loading performance of their web page. 'Suggestion'/'Optimization'/'Recommendation' are reasonable synonyms for 'opportunity' in this case. */
  loadOpportunitiesGroupTitle: 'Opportunities',
  /** Description of the opportunity section of the Performance category. 'Suggestions' could also be 'recommendations'. Within this section are audits with imperative titles that suggest actions the user can take to improve the loading performance of their web page. */
  loadOpportunitiesGroupDescription: 'These suggestions can help your page load faster. They don\'t [directly affect](https://web.dev/performance-scoring/) the Performance score.',
  /** Title of an opportunity sub-section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the time of the first initial render of the webpage. */
  firstPaintImprovementsGroupTitle: 'First Paint Improvements',
  /** Description of an opportunity sub-section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the time of the first initial render of the webpage. */
  firstPaintImprovementsGroupDescription: 'The most critical aspect of performance is how quickly pixels are rendered onscreen. Key metrics: First Contentful Paint, First Meaningful Paint',
  /** Title of an opportunity sub-section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the overall loading performance of their web page. */
  overallImprovementsGroupTitle: 'Overall Improvements',
  /** Description of an opportunity sub-section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the overall loading performance of their web page. */
  overallImprovementsGroupDescription: 'Enhance the overall loading experience, so the page is responsive and ready to use as soon as possible. Key metrics: Time to Interactive, Speed Index',
  /** Title of the diagnostics section of the Performance category. Within this section are audits with non-imperative titles that provide more detail on the page's page load performance characteristics. Whereas the 'Opportunities' suggest an action along with expected time savings, diagnostics do not. Within this section, the user may read the details and deduce additional actions they could take. */
  diagnosticsGroupTitle: 'Diagnostics',
  /** Description of the diagnostics section of the Performance category. Within this section are audits with non-imperative titles that provide more detail on a web page's load performance characteristics. Within this section, the user may read the details and deduce additional actions they could take to improve performance. */
  diagnosticsGroupDescription: 'More information about the performance of your application. These numbers don\'t [directly affect](https://web.dev/performance-scoring/) the Performance score.',
  /** Title of the Accessibility category of audits. This section contains audits focused on making web content accessible to all users. Also used as a label of a score gauge; try to limit to 20 characters. */
  a11yCategoryTitle: 'Accessibility',
  /** Description of the Accessibility category. This is displayed at the top of a list of audits focused on making web content accessible to all users. No character length limits. 'improve the accessibility of your web app' becomes link text to additional documentation. */
  a11yCategoryDescription: 'These checks highlight opportunities to [improve the accessibility of your web app](https://developers.google.com/web/fundamentals/accessibility). Only a subset of accessibility issues can be automatically detected so manual testing is also encouraged.',
  /** Description of the Accessibility manual checks category. This description is displayed above a list of accessibility audits that currently have no automated test and so must be verified manually by the user. No character length limits. 'conducting an accessibility review' becomes link text to additional documentation. */
  a11yCategoryManualDescription: 'These items address areas which an automated testing tool cannot cover. Learn more in our guide on [conducting an accessibility review](https://developers.google.com/web/fundamentals/accessibility/how-to-review).',
  /** Title of the best practices section of the Accessibility category. Within this section are audits with descriptive titles that highlight common accessibility best practices. */
  a11yBestPracticesGroupTitle: 'Best practices',
  /** Description of the best practices section within the Accessibility category. Within this section are audits with descriptive titles that highlight common accessibility best practices. */
  a11yBestPracticesGroupDescription: 'These items highlight common accessibility best practices.',
  /** Title of the color contrast section within the Accessibility category. Within this section are audits with descriptive titles that highlight the color and vision aspects of the page's accessibility that are passing or failing. */
  a11yColorContrastGroupTitle: 'Contrast',
  /** Description of the color contrast section within the Accessibility category. Within this section are audits with descriptive titles that highlight the color and vision aspects of the page's accessibility that are passing or failing. */
  a11yColorContrastGroupDescription: 'These are opportunities to improve the legibility of your content.',
  /** Title of the HTML element naming section within the Accessibility category. Within this section are audits with descriptive titles that highlight if the non-textual HTML elements on the page have names discernible by a screen reader. */
  a11yNamesLabelsGroupTitle: 'Names and labels',
  /** Description of the HTML element naming section within the Accessibility category. Within this section are audits with descriptive titles that highlight if the non-textual HTML elements on the page have names discernible by a screen reader. */
  a11yNamesLabelsGroupDescription: 'These are opportunities to improve the semantics of the controls in your application. This may enhance the experience for users of assistive technology, like a screen reader.',
  /** Title of the navigation section within the Accessibility category. Within this section are audits with descriptive titles that highlight opportunities to improve keyboard navigation. */
  a11yNavigationGroupTitle: 'Navigation',
  /** Description of the navigation section within the Accessibility category. Within this section are audits with descriptive titles that highlight opportunities to improve keyboard navigation. */
  a11yNavigationGroupDescription: 'These are opportunities to improve keyboard navigation in your application.',
  /** Title of the ARIA validity section within the Accessibility category. Within this section are audits with descriptive titles that highlight if whether all the aria-* HTML attributes have been used properly. */
  a11yAriaGroupTitle: 'ARIA',
  /** Description of the ARIA validity section within the Accessibility category. Within this section are audits with descriptive titles that highlight if whether all the aria-* HTML attributes have been used properly. */
  a11yAriaGroupDescription: 'These are opportunities to improve the usage of ARIA in your application which may enhance the experience for users of assistive technology, like a screen reader.',
  /** Title of the language section within the Accessibility category. Within this section are audits with descriptive titles that highlight if the language has been annotated in the correct HTML attributes on the page. */
  a11yLanguageGroupTitle: 'Internationalization and localization',
  /** Description of the language section within the Accessibility category. Within this section are audits with descriptive titles that highlight if the language has been annotated in the correct HTML attributes on the page. */
  a11yLanguageGroupDescription: 'These are opportunities to improve the interpretation of your content by users in different locales.',
  /** Title of the navigation section within the Accessibility category. Within this section are audits with descriptive titles that highlight opportunities to provide alternative content for audio and video. */
  a11yAudioVideoGroupTitle: 'Audio and video',
  /** Description of the navigation section within the Accessibility category. Within this section are audits with descriptive titles that highlight opportunities to provide alternative content for audio and video. */
  a11yAudioVideoGroupDescription: 'These are opportunities to provide alternative content for audio and video. This may improve the experience for users with hearing or vision impairments.',
  /** Title of the navigation section within the Accessibility category. Within this section are audits with descriptive titles that highlight opportunities to improve the experience of reading tabular or list data using assistive technology. */
  a11yTablesListsVideoGroupTitle: 'Tables and lists',
  /** Description of the navigation section within the Accessibility category. Within this section are audits with descriptive titles that highlight opportunities to improve the experience of reading tabular or list data using assistive technology. */
  a11yTablesListsVideoGroupDescription: 'These are opportunities to improve the experience of reading tabular or list data using assistive technology, like a screen reader.',
  /** Title of the Search Engine Optimization (SEO) category of audits. This is displayed at the top of a list of audits focused on topics related to optimizing a website for indexing by search engines. Also used as a label of a score gauge; try to limit to 20 characters. */
  seoCategoryTitle: 'SEO',
  /** Description of the Search Engine Optimization (SEO) category. This is displayed at the top of a list of audits focused on optimizing a website for indexing by search engines. No character length limits. 'Learn More' becomes link text to additional documentation. */
  seoCategoryDescription: 'These checks ensure that your page is optimized for search engine results ranking. ' +
  'There are additional factors Lighthouse does not check that may affect your search ranking. ' +
  '[Learn more](https://support.google.com/webmasters/answer/35769).',
  /** Description of the Search Engine Optimization (SEO) manual checks category, the additional validators must be run by hand in order to check all SEO best practices. This is displayed at the top of a list of manually run audits focused on optimizing a website for indexing by search engines. No character length limits. */
  seoCategoryManualDescription: 'Run these additional validators on your site to check additional SEO best practices.',
  /** Title of the navigation section within the Search Engine Optimization (SEO) category. Within this section are audits with descriptive titles that highlight opportunities to make a page more usable on mobile devices. */
  seoMobileGroupTitle: 'Mobile Friendly',
  /** Description of the navigation section within the Search Engine Optimization (SEO) category. Within this section are audits with descriptive titles that highlight opportunities to make a page more usable on mobile devices. */
  seoMobileGroupDescription: 'Make sure your pages are mobile friendly so users don’t have to pinch or zoom ' +
  'in order to read the content pages. [Learn more](https://developers.google.com/search/mobile-sites/).',
  /** Title of the navigation section within the Search Engine Optimization (SEO) category. Within this section are audits with descriptive titles that highlight ways to make a website content more easily understood by search engine crawler bots. */
  seoContentGroupTitle: 'Content Best Practices',
  /** Description of the navigation section within the Search Engine Optimization (SEO) category. Within this section are audits with descriptive titles that highlight ways to make a website content more easily understood by search engine crawler bots. */
  seoContentGroupDescription: 'Format your HTML in a way that enables crawlers to better understand your app’s content.',
  /** Title of the navigation section within the Search Engine Optimization (SEO) category. Within this section are audits with descriptive titles that highlight ways to make a website accessible to search engine crawlers. */
  seoCrawlingGroupTitle: 'Crawling and Indexing',
  /** Description of the navigation section within the Search Engine Optimization (SEO) category. Within this section are audits with descriptive titles that highlight ways to make a website accessible to search engine crawlers. */
  seoCrawlingGroupDescription: 'To appear in search results, crawlers need access to your app.',
  /** Title of the Progressive Web Application (PWA) category of audits. This is displayed at the top of a list of audits focused on topics related to whether or not a site is a progressive web app, e.g. responds offline, uses a service worker, is on https, etc. Also used as a label of a score gauge. */
  pwaCategoryTitle: 'Progressive Web App',
  /** Description of the Progressive Web Application (PWA) category. This is displayed at the top of a list of audits focused on topics related to whether or not a site is a progressive web app, e.g. responds offline, uses a service worker, is on https, etc. No character length limits. 'Learn More' becomes link text to additional documentation. */
  pwaCategoryDescription: 'These checks validate the aspects of a Progressive Web App. ' +
  '[Learn more](https://developers.google.com/web/progressive-web-apps/checklist).',
  /** Description of the Progressive Web Application (PWA) manual checks category, containing a list of additional validators must be run by hand in order to check all PWA best practices. This is displayed at the top of a list of manually run audits focused on topics related to whether or not a site is a progressive web app, e.g. responds offline, uses a service worker, is on https, etc.. No character length limits. */
  pwaCategoryManualDescription: 'These checks are required by the baseline ' +
  '[PWA Checklist](https://developers.google.com/web/progressive-web-apps/checklist) but are ' +
  'not automatically checked by Lighthouse. They do not affect your score but it\'s important that you verify them manually.',
  /** Title of the Best Practices category of audits. This is displayed at the top of a list of audits focused on topics related to following web development best practices and accepted guidelines. Also used as a label of a score gauge; try to limit to 20 characters. */
  bestPracticesCategoryTitle: 'Best Practices',
  /** Title of the Trust & Safety group of audits. This is displayed at the top of a list of audits focused on maintaining user trust and protecting security in web development. */
  bestPracticesTrustSafetyGroupTitle: 'Trust and Safety',
  /** Title of the User Experience group of the Best Practices category. Within this section are the audits related to the end user's experience of the webpage. */
  bestPracticesUXGroupTitle: 'User Experience',
  /** Title of the Browser Compatibility group of the Best Practices category. Within this section are the audits related to whether the page is interpreted consistently by browsers. */
  bestPracticesBrowserCompatGroupTitle: 'Browser Compatibility',
  /** Title of the General group of the Best Practices category. Within this section are the audits that don't belong to a specific group but are of general interest. */
  bestPracticesGeneralGroupTitle: 'General',
  /** Title of the Installable section of the web app category. Within this section are audits that check if Chrome supports installing the web site as an app on their device. */
  pwaInstallableGroupTitle: 'Installable',
  /** Title of the "PWA Optimized" section of the web app category. Within this section are audits that check if the developer has taken advantage of features to make their web page more enjoyable and engaging for the user. */
  pwaOptimizedGroupTitle: 'PWA Optimized',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

/** @type {LH.Config.Json} */
const defaultConfig = {
  settings: constants.defaultSettings,
  passes: [{
    passName: 'defaultPass',
    recordTrace: true,
    useThrottling: true,
    pauseAfterFcpMs: 1000,
    pauseAfterLoadMs: 1000,
    networkQuietThresholdMs: 1000,
    cpuQuietThresholdMs: 1000,
    gatherers: [
      'css-usage',
      'js-usage',
      'viewport-dimensions',
      'console-messages',
      'anchor-elements',
      'image-elements',
      'link-elements',
      'meta-elements',
      'script-elements',
      'iframe-elements',
      'form-elements',
      'main-document-content',
      'global-listeners',
      'dobetterweb/appcache',
      'dobetterweb/doctype',
      'dobetterweb/domstats',
      'dobetterweb/optimized-images',
      'dobetterweb/password-inputs-with-prevented-paste',
      'dobetterweb/response-compression',
      'dobetterweb/tags-blocking-first-paint',
      'seo/font-size',
      'seo/embedded-content',
      'seo/robots-txt',
      'seo/tap-targets',
      'accessibility',
      'trace-elements',
      'inspector-issues',
      'source-maps',
      'full-page-screenshot',
    ],
  },
  {
    passName: 'offlinePass',
    loadFailureMode: 'ignore',
    gatherers: [
      'service-worker',
    ],
  },
  {
    passName: 'redirectPass',
    loadFailureMode: 'warn',
    // Speed up the redirect pass by blocking stylesheets, fonts, and images
    blockedUrlPatterns: ['*.css', '*.jpg', '*.jpeg', '*.png', '*.gif', '*.svg', '*.ttf', '*.woff', '*.woff2'],
    gatherers: [
      'http-redirect',
    ],
  }],
  audits: [
    'is-on-https',
    'redirects-http',
    'service-worker',
    'viewport',
    'metrics/first-contentful-paint',
    'metrics/largest-contentful-paint',
    'metrics/first-meaningful-paint',
    'metrics/speed-index',
    'screenshot-thumbnails',
    'final-screenshot',
    'metrics/estimated-input-latency',
    'metrics/total-blocking-time',
    'metrics/max-potential-fid',
    'metrics/cumulative-layout-shift',
    'errors-in-console',
    'server-response-time',
    'metrics/first-cpu-idle',
    'metrics/interactive',
    'user-timings',
    'critical-request-chains',
    'redirects',
    'installable-manifest',
    'apple-touch-icon',
    'splash-screen',
    'themed-omnibox',
    'maskable-icon',
    'content-width',
    'image-aspect-ratio',
    'image-size-responsive',
    'preload-fonts',
    'deprecations',
    'mainthread-work-breakdown',
    'bootup-time',
    'uses-rel-preload',
    'uses-rel-preconnect',
    'font-display',
    'diagnostics',
    'network-requests',
    'network-rtt',
    'network-server-latency',
    'main-thread-tasks',
    'metrics',
    'performance-budget',
    'timing-budget',
    'resource-summary',
    'third-party-summary',
    'third-party-facades',
    'largest-contentful-paint-element',
    'layout-shift-elements',
    'long-tasks',
    'no-unload-listeners',
    'non-composited-animations',
    'unsized-images',
    'valid-source-maps',
    'preload-lcp-image',
    'csp-xss',
    'full-page-screenshot',
    'script-treemap-data',
    'manual/pwa-cross-browser',
    'manual/pwa-page-transitions',
    'manual/pwa-each-page-has-url',
    'accessibility/accesskeys',
    'accessibility/aria-allowed-attr',
    'accessibility/aria-command-name',
    'accessibility/aria-hidden-body',
    'accessibility/aria-hidden-focus',
    'accessibility/aria-input-field-name',
    'accessibility/aria-meter-name',
    'accessibility/aria-progressbar-name',
    'accessibility/aria-required-attr',
    'accessibility/aria-required-children',
    'accessibility/aria-required-parent',
    'accessibility/aria-roles',
    'accessibility/aria-toggle-field-name',
    'accessibility/aria-tooltip-name',
    'accessibility/aria-treeitem-name',
    'accessibility/aria-valid-attr-value',
    'accessibility/aria-valid-attr',
    'accessibility/button-name',
    'accessibility/bypass',
    'accessibility/color-contrast',
    'accessibility/definition-list',
    'accessibility/dlitem',
    'accessibility/document-title',
    'accessibility/duplicate-id-active',
    'accessibility/duplicate-id-aria',
    'accessibility/empty-table-header',
    'accessibility/form-field-multiple-labels',
    'accessibility/frame-focusable-content',
    'accessibility/frame-title',
    'accessibility/heading-order',
    'accessibility/html-has-lang',
    'accessibility/html-lang-valid',
    'accessibility/image-alt',
    'accessibility/input-image-alt',
    'accessibility/label',
    'accessibility/link-name',
    'accessibility/list',
    'accessibility/listitem',
    'accessibility/meta-refresh',
    'accessibility/meta-viewport',
    'accessibility/object-alt',
    'accessibility/tabindex',
    'accessibility/td-headers-attr',
    'accessibility/th-has-data-cells',
    'accessibility/valid-lang',
    'accessibility/video-caption',
    'accessibility/manual/custom-controls-labels',
    'accessibility/manual/custom-controls-roles',
    'accessibility/manual/focus-traps',
    'accessibility/manual/focusable-controls',
    'accessibility/manual/interactive-element-affordance',
    'accessibility/manual/logical-tab-order',
    'accessibility/manual/managed-focus',
    'accessibility/manual/offscreen-content-hidden',
    'accessibility/manual/use-landmarks',
    'accessibility/manual/visual-order-follows-dom',
    'byte-efficiency/uses-long-cache-ttl',
    'byte-efficiency/total-byte-weight',
    'byte-efficiency/offscreen-images',
    'byte-efficiency/render-blocking-resources',
    'byte-efficiency/unminified-css',
    'byte-efficiency/unminified-javascript',
    'byte-efficiency/unused-css-rules',
    'byte-efficiency/unused-javascript',
    'byte-efficiency/uses-webp-images',
    'byte-efficiency/uses-optimized-images',
    'byte-efficiency/uses-text-compression',
    'byte-efficiency/uses-responsive-images',
    'byte-efficiency/efficient-animated-content',
    'byte-efficiency/duplicated-javascript',
    'byte-efficiency/legacy-javascript',
    'dobetterweb/appcache-manifest',
    'dobetterweb/doctype',
    'dobetterweb/charset',
    'dobetterweb/dom-size',
    'dobetterweb/external-anchors-use-rel-noopener',
    'dobetterweb/geolocation-on-start',
    'dobetterweb/inspector-issues',
    'dobetterweb/no-document-write',
    'dobetterweb/no-vulnerable-libraries',
    'dobetterweb/js-libraries',
    'dobetterweb/notification-on-start',
    'dobetterweb/password-inputs-can-be-pasted-into',
    'dobetterweb/uses-http2',
    'dobetterweb/uses-passive-event-listeners',
    'seo/meta-description',
    'seo/http-status-code',
    'seo/font-size',
    'seo/link-text',
    'seo/crawlable-anchors',
    'seo/is-crawlable',
    'seo/robots-txt',
    'seo/tap-targets',
    'seo/hreflang',
    'seo/plugins',
    'seo/canonical',
    'seo/manual/structured-data',
  ],

  groups: {
    'metrics': {
      title: str_(UIStrings.metricGroupTitle),
    },
    'load-opportunities': {
      title: str_(UIStrings.loadOpportunitiesGroupTitle),
      description: str_(UIStrings.loadOpportunitiesGroupDescription),
    },
    'budgets': {
      title: str_(UIStrings.budgetsGroupTitle),
      description: str_(UIStrings.budgetsGroupDescription),
    },
    'diagnostics': {
      title: str_(UIStrings.diagnosticsGroupTitle),
      description: str_(UIStrings.diagnosticsGroupDescription),
    },
    'pwa-installable': {
      title: str_(UIStrings.pwaInstallableGroupTitle),
    },
    'pwa-optimized': {
      title: str_(UIStrings.pwaOptimizedGroupTitle),
    },
    'a11y-best-practices': {
      title: str_(UIStrings.a11yBestPracticesGroupTitle),
      description: str_(UIStrings.a11yBestPracticesGroupDescription),
    },
    'a11y-color-contrast': {
      title: str_(UIStrings.a11yColorContrastGroupTitle),
      description: str_(UIStrings.a11yColorContrastGroupDescription),
    },
    'a11y-names-labels': {
      title: str_(UIStrings.a11yNamesLabelsGroupTitle),
      description: str_(UIStrings.a11yNamesLabelsGroupDescription),
    },
    'a11y-navigation': {
      title: str_(UIStrings.a11yNavigationGroupTitle),
      description: str_(UIStrings.a11yNavigationGroupDescription),
    },
    'a11y-aria': {
      title: str_(UIStrings.a11yAriaGroupTitle),
      description: str_(UIStrings.a11yAriaGroupDescription),
    },
    'a11y-language': {
      title: str_(UIStrings.a11yLanguageGroupTitle),
      description: str_(UIStrings.a11yLanguageGroupDescription),
    },
    'a11y-audio-video': {
      title: str_(UIStrings.a11yAudioVideoGroupTitle),
      description: str_(UIStrings.a11yAudioVideoGroupDescription),
    },
    'a11y-tables-lists': {
      title: str_(UIStrings.a11yTablesListsVideoGroupTitle),
      description: str_(UIStrings.a11yTablesListsVideoGroupDescription),
    },
    'seo-mobile': {
      title: str_(UIStrings.seoMobileGroupTitle),
      description: str_(UIStrings.seoMobileGroupDescription),
    },
    'seo-content': {
      title: str_(UIStrings.seoContentGroupTitle),
      description: str_(UIStrings.seoContentGroupDescription),
    },
    'seo-crawl': {
      title: str_(UIStrings.seoCrawlingGroupTitle),
      description: str_(UIStrings.seoCrawlingGroupDescription),
    },
    'best-practices-trust-safety': {
      title: str_(UIStrings.bestPracticesTrustSafetyGroupTitle),
    },
    'best-practices-ux': {
      title: str_(UIStrings.bestPracticesUXGroupTitle),
    },
    'best-practices-browser-compat': {
      title: str_(UIStrings.bestPracticesBrowserCompatGroupTitle),
    },
    'best-practices-general': {
      title: str_(UIStrings.bestPracticesGeneralGroupTitle),
    },
  },
  categories: {
    'performance': {
      title: str_(UIStrings.performanceCategoryTitle),
      auditRefs: [
        {id: 'first-contentful-paint', weight: 15, group: 'metrics', acronym: 'FCP', relevantAudits: m2a.fcpRelevantAudits},
        {id: 'speed-index', weight: 15, group: 'metrics', acronym: 'SI'},
        {id: 'largest-contentful-paint', weight: 25, group: 'metrics', acronym: 'LCP', relevantAudits: m2a.lcpRelevantAudits},
        {id: 'interactive', weight: 15, group: 'metrics', acronym: 'TTI'},
        {id: 'total-blocking-time', weight: 25, group: 'metrics', acronym: 'TBT', relevantAudits: m2a.tbtRelevantAudits},
        {id: 'cumulative-layout-shift', weight: 5, group: 'metrics', acronym: 'CLS', relevantAudits: m2a.clsRelevantAudits},

        // These are our "invisible" metrics. Not displayed, but still in the LHR
        {id: 'first-cpu-idle', weight: 0, acronym: 'FCI'},
        {id: 'max-potential-fid', weight: 0},
        {id: 'first-meaningful-paint', weight: 0, acronym: 'FMP'},
        {id: 'estimated-input-latency', weight: 0},

        {id: 'render-blocking-resources', weight: 0, group: 'load-opportunities'},
        {id: 'uses-responsive-images', weight: 0, group: 'load-opportunities'},
        {id: 'offscreen-images', weight: 0, group: 'load-opportunities'},
        {id: 'unminified-css', weight: 0, group: 'load-opportunities'},
        {id: 'unminified-javascript', weight: 0, group: 'load-opportunities'},
        {id: 'unused-css-rules', weight: 0, group: 'load-opportunities'},
        {id: 'unused-javascript', weight: 0, group: 'load-opportunities'},
        {id: 'uses-optimized-images', weight: 0, group: 'load-opportunities'},
        {id: 'uses-webp-images', weight: 0, group: 'load-opportunities'},
        {id: 'uses-text-compression', weight: 0, group: 'load-opportunities'},
        {id: 'uses-rel-preconnect', weight: 0, group: 'load-opportunities'},
        {id: 'server-response-time', weight: 0, group: 'load-opportunities'},
        {id: 'redirects', weight: 0, group: 'load-opportunities'},
        {id: 'uses-rel-preload', weight: 0, group: 'load-opportunities'},
        {id: 'uses-http2', weight: 0, group: 'load-opportunities'},
        {id: 'efficient-animated-content', weight: 0, group: 'load-opportunities'},
        {id: 'duplicated-javascript', weight: 0, group: 'load-opportunities'},
        {id: 'legacy-javascript', weight: 0, group: 'load-opportunities'},
        {id: 'preload-lcp-image', weight: 0, group: 'load-opportunities'},
        {id: 'total-byte-weight', weight: 0, group: 'diagnostics'},
        {id: 'uses-long-cache-ttl', weight: 0, group: 'diagnostics'},
        {id: 'dom-size', weight: 0, group: 'diagnostics'},
        {id: 'critical-request-chains', weight: 0, group: 'diagnostics'},
        {id: 'user-timings', weight: 0, group: 'diagnostics'},
        {id: 'bootup-time', weight: 0, group: 'diagnostics'},
        {id: 'mainthread-work-breakdown', weight: 0, group: 'diagnostics'},
        {id: 'font-display', weight: 0, group: 'diagnostics'},
        {id: 'performance-budget', weight: 0, group: 'budgets'},
        {id: 'timing-budget', weight: 0, group: 'budgets'},
        {id: 'resource-summary', weight: 0, group: 'diagnostics'},
        {id: 'third-party-summary', weight: 0, group: 'diagnostics'},
        {id: 'third-party-facades', weight: 0, group: 'diagnostics'},
        {id: 'largest-contentful-paint-element', weight: 0, group: 'diagnostics'},
        {id: 'layout-shift-elements', weight: 0, group: 'diagnostics'},
        {id: 'uses-passive-event-listeners', weight: 0, group: 'diagnostics'},
        {id: 'no-document-write', weight: 0, group: 'diagnostics'},
        {id: 'long-tasks', weight: 0, group: 'diagnostics'},
        {id: 'non-composited-animations', weight: 0, group: 'diagnostics'},
        {id: 'unsized-images', weight: 0, group: 'diagnostics'},
        // Audits past this point don't belong to a group and will not be shown automatically
        {id: 'network-requests', weight: 0},
        {id: 'network-rtt', weight: 0},
        {id: 'network-server-latency', weight: 0},
        {id: 'main-thread-tasks', weight: 0},
        {id: 'diagnostics', weight: 0},
        {id: 'metrics', weight: 0},
        {id: 'screenshot-thumbnails', weight: 0},
        {id: 'final-screenshot', weight: 0},
        {id: 'script-treemap-data', weight: 0},
      ],
    },
    'accessibility': {
      title: str_(UIStrings.a11yCategoryTitle),
      description: str_(UIStrings.a11yCategoryDescription),
      manualDescription: str_(UIStrings.a11yCategoryManualDescription),
      // Audit weights are meant to match the aXe scoring system of
      // minor, moderate, serious, and critical.
      // See the audits listed at dequeuniversity.com/rules/axe/4.1.
      // Click on an audit and check the right hand column to see its severity.
      auditRefs: [
        {id: 'accesskeys', weight: 3, group: 'a11y-navigation'},
        {id: 'aria-allowed-attr', weight: 10, group: 'a11y-aria'},
        {id: 'aria-command-name', weight: 3, group: 'a11y-aria'},
        {id: 'aria-hidden-body', weight: 10, group: 'a11y-aria'},
        {id: 'aria-hidden-focus', weight: 3, group: 'a11y-aria'},
        {id: 'aria-input-field-name', weight: 3, group: 'a11y-aria'},
        {id: 'aria-meter-name', weight: 3, group: 'a11y-aria'},
        {id: 'aria-progressbar-name', weight: 3, group: 'a11y-aria'},
        {id: 'aria-required-attr', weight: 10, group: 'a11y-aria'},
        {id: 'aria-required-children', weight: 10, group: 'a11y-aria'},
        {id: 'aria-required-parent', weight: 10, group: 'a11y-aria'},
        {id: 'aria-roles', weight: 10, group: 'a11y-aria'},
        {id: 'aria-toggle-field-name', weight: 3, group: 'a11y-aria'},
        {id: 'aria-tooltip-name', weight: 3, group: 'a11y-aria'},
        {id: 'aria-treeitem-name', weight: 3, group: 'a11y-aria'},
        {id: 'aria-valid-attr-value', weight: 10, group: 'a11y-aria'},
        {id: 'aria-valid-attr', weight: 10, group: 'a11y-aria'},
        {id: 'button-name', weight: 10, group: 'a11y-names-labels'},
        {id: 'bypass', weight: 3, group: 'a11y-navigation'},
        {id: 'color-contrast', weight: 3, group: 'a11y-color-contrast'},
        {id: 'definition-list', weight: 3, group: 'a11y-tables-lists'},
        {id: 'dlitem', weight: 3, group: 'a11y-tables-lists'},
        {id: 'document-title', weight: 3, group: 'a11y-names-labels'},
        {id: 'duplicate-id-active', weight: 3, group: 'a11y-navigation'},
        {id: 'duplicate-id-aria', weight: 10, group: 'a11y-aria'},
        {id: 'empty-table-header', weight: 2, group: 'a11y-tables-lists'},
        {id: 'form-field-multiple-labels', weight: 2, group: 'a11y-names-labels'},
        {id: 'frame-focusable-content', weight: 3, group: 'a11y-navigation'},
        {id: 'frame-title', weight: 3, group: 'a11y-names-labels'},
        {id: 'heading-order', weight: 2, group: 'a11y-navigation'},
        {id: 'html-has-lang', weight: 3, group: 'a11y-language'},
        {id: 'html-lang-valid', weight: 3, group: 'a11y-language'},
        {id: 'image-alt', weight: 10, group: 'a11y-names-labels'},
        {id: 'input-image-alt', weight: 10, group: 'a11y-names-labels'},
        {id: 'label', weight: 10, group: 'a11y-names-labels'},
        {id: 'link-name', weight: 3, group: 'a11y-names-labels'},
        {id: 'list', weight: 3, group: 'a11y-tables-lists'},
        {id: 'listitem', weight: 3, group: 'a11y-tables-lists'},
        {id: 'meta-refresh', weight: 10, group: 'a11y-best-practices'},
        {id: 'meta-viewport', weight: 10, group: 'a11y-best-practices'},
        {id: 'object-alt', weight: 3, group: 'a11y-names-labels'},
        {id: 'tabindex', weight: 3, group: 'a11y-navigation'},
        {id: 'td-headers-attr', weight: 3, group: 'a11y-tables-lists'},
        {id: 'th-has-data-cells', weight: 3, group: 'a11y-tables-lists'},
        {id: 'valid-lang', weight: 3, group: 'a11y-language'},
        {id: 'video-caption', weight: 10, group: 'a11y-audio-video'},
        // Manual audits
        {id: 'logical-tab-order', weight: 0},
        {id: 'focusable-controls', weight: 0},
        {id: 'interactive-element-affordance', weight: 0},
        {id: 'managed-focus', weight: 0},
        {id: 'focus-traps', weight: 0},
        {id: 'custom-controls-labels', weight: 0},
        {id: 'custom-controls-roles', weight: 0},
        {id: 'visual-order-follows-dom', weight: 0},
        {id: 'offscreen-content-hidden', weight: 0},
        {id: 'use-landmarks', weight: 0},
      ],
    },
    'best-practices': {
      title: str_(UIStrings.bestPracticesCategoryTitle),
      auditRefs: [
        // Trust & Safety
        {id: 'is-on-https', weight: 1, group: 'best-practices-trust-safety'},
        {id: 'external-anchors-use-rel-noopener', weight: 1, group: 'best-practices-trust-safety'},
        {id: 'geolocation-on-start', weight: 1, group: 'best-practices-trust-safety'},
        {id: 'notification-on-start', weight: 1, group: 'best-practices-trust-safety'},
        {id: 'no-vulnerable-libraries', weight: 1, group: 'best-practices-trust-safety'},
        {id: 'csp-xss', weight: 0, group: 'best-practices-trust-safety'},
        // User Experience
        {id: 'password-inputs-can-be-pasted-into', weight: 1, group: 'best-practices-ux'},
        {id: 'image-aspect-ratio', weight: 1, group: 'best-practices-ux'},
        {id: 'image-size-responsive', weight: 1, group: 'best-practices-ux'},
        {id: 'preload-fonts', weight: 1, group: 'best-practices-ux'},
        // Browser Compatibility
        {id: 'doctype', weight: 1, group: 'best-practices-browser-compat'},
        {id: 'charset', weight: 1, group: 'best-practices-browser-compat'},
        // General Group
        {id: 'no-unload-listeners', weight: 1, group: 'best-practices-general'},
        {id: 'appcache-manifest', weight: 1, group: 'best-practices-general'},
        {id: 'js-libraries', weight: 0, group: 'best-practices-general'},
        {id: 'deprecations', weight: 1, group: 'best-practices-general'},
        {id: 'errors-in-console', weight: 1, group: 'best-practices-general'},
        {id: 'valid-source-maps', weight: 0, group: 'best-practices-general'},
        {id: 'inspector-issues', weight: 1, group: 'best-practices-general'},
      ],
    },
    'seo': {
      title: str_(UIStrings.seoCategoryTitle),
      description: str_(UIStrings.seoCategoryDescription),
      manualDescription: str_(UIStrings.seoCategoryManualDescription),
      auditRefs: [
        {id: 'viewport', weight: 1, group: 'seo-mobile'},
        {id: 'document-title', weight: 1, group: 'seo-content'},
        {id: 'meta-description', weight: 1, group: 'seo-content'},
        {id: 'http-status-code', weight: 1, group: 'seo-crawl'},
        {id: 'link-text', weight: 1, group: 'seo-content'},
        {id: 'crawlable-anchors', weight: 1, group: 'seo-crawl'},
        {id: 'is-crawlable', weight: 1, group: 'seo-crawl'},
        {id: 'robots-txt', weight: 1, group: 'seo-crawl'},
        {id: 'image-alt', weight: 1, group: 'seo-content'},
        {id: 'hreflang', weight: 1, group: 'seo-content'},
        {id: 'canonical', weight: 1, group: 'seo-content'},
        {id: 'font-size', weight: 1, group: 'seo-mobile'},
        {id: 'plugins', weight: 1, group: 'seo-content'},
        {id: 'tap-targets', weight: 1, group: 'seo-mobile'},
        // Manual audits
        {id: 'structured-data', weight: 0},
      ],
    },
    'pwa': {
      title: str_(UIStrings.pwaCategoryTitle),
      description: str_(UIStrings.pwaCategoryDescription),
      manualDescription: str_(UIStrings.pwaCategoryManualDescription),
      auditRefs: [
        // Installable
        {id: 'installable-manifest', weight: 2, group: 'pwa-installable'},
        // PWA Optimized
        {id: 'service-worker', weight: 1, group: 'pwa-optimized'},
        {id: 'redirects-http', weight: 2, group: 'pwa-optimized'},
        {id: 'splash-screen', weight: 1, group: 'pwa-optimized'},
        {id: 'themed-omnibox', weight: 1, group: 'pwa-optimized'},
        {id: 'content-width', weight: 1, group: 'pwa-optimized'},
        {id: 'viewport', weight: 2, group: 'pwa-optimized'},
        {id: 'apple-touch-icon', weight: 1, group: 'pwa-optimized'},
        {id: 'maskable-icon', weight: 1, group: 'pwa-optimized'},
        // Manual audits
        {id: 'pwa-cross-browser', weight: 0},
        {id: 'pwa-page-transitions', weight: 0},
        {id: 'pwa-each-page-has-url', weight: 0},
      ],
    },
  },
};

module.exports = defaultConfig;

// Use `defineProperty` so that the strings are accesible from original but ignored when we copy it
Object.defineProperty(module.exports, 'UIStrings', {
  enumerable: false,
  get: () => UIStrings,
});

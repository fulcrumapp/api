---
title: Introduction
excerpt: >-
  A collection of tools and utilities that complement the Fulcrum platform and
  help you get more out of your data.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---

Fulcrum provides a suite of companion utilities that extend the capabilities of the core platform. These tools are designed to streamline common workflows, simplify data management, and help field teams and administrators get more value from their Fulcrum data without requiring custom development.

> **Support notice:** These utilities are provided as supplementary tools and we are committed to supporting them to the best of our ability. However, they are maintained separately from the core Fulcrum platform and do not carry the same level of support, SLA guarantees, or release cadence as core Fulcrum features. If you encounter issues or have feedback, please reach out to our support team and we will do our best to assist.

## [Fulcrum Instaform](https://fulcrum-instaform.util.fulcrumapp.com/)

Rapidly convert existing paper or digital forms into Fulcrum apps using AI. Upload an image or PDF of your current data collection form — such as an inspection sheet, survey template, or field checklist — and Instaform will automatically extract all the fields and structure them into a Fulcrum app. You can review and fine-tune the extracted fields before publishing the app directly to your Fulcrum organization. This is ideal for organizations migrating from legacy paper-based workflows or spreadsheets to Fulcrum's mobile data collection platform.

## [Fulcrum Query Utility](https://query.util.fulcrumapp.com/)

A browser-based interface for Fulcrum's [Query API](https://developer.fulcrumapp.com/reference/query-introduction). Write and execute SQL queries against your Fulcrum data without needing a separate database client or API credentials setup. The Query Utility provides a convenient UI for exploring your records, running ad hoc reports, validating data quality, and prototyping queries that can later be integrated into downstream workflows or custom applications.

## [Fulcrum Explorer](https://explorer.util.fulcrumapp.com/)

A photo-first data exploration tool that gives you a visual way to browse and manage your Fulcrum records across multiple records simultaneously. Rather than navigating record by record in the standard editor, Explorer surfaces all your Fulcrum photos in a unified gallery view, making it easy to review field imagery, identify gaps in photo documentation, and quickly locate records by their associated images. Explorer also supports inline data editing and bulk field updates, making it useful for quality assurance and post-collection data cleanup.

## [Fulcrum Dispatcher](https://dispatcher.util.fulcrumapp.com/)

A map-driven bulk assignment and triage tool for Fulcrum records. Use the lasso selection tool to draw a region on the map and select a group of records, then update their status, project, or assignment all at once. Dispatcher is especially valuable for dispatch coordinators and project managers who need to reassign work orders, update job statuses after a site visit, or organize records into projects across a geographic area — all without opening each record individually.

## [Fulcrum Photo Grouper](https://photo-grouper.util.fulcrumapp.com/)

Automates the process of associating bulk photo uploads with the correct Fulcrum records based on GPS metadata. Upload a batch of photos — such as imagery captured by a drone or a field camera — and Photo Grouper reads the latitude and longitude from each photo's EXIF data to automatically attach it to the nearest matching Fulcrum record. This is particularly useful for drone survey workflows, environmental inspections, and any field operation where large volumes of geo-tagged imagery need to be linked to asset or site records in Fulcrum.

## [Fulcrum Shares Utility](https://shares.util.fulcrumapp.com/)

A centralized management interface for your Fulcrum shared views and shared reports. View, organize, and control all of your organization's public-facing data shares in one place, without navigating through individual records or apps in the main Fulcrum editor. This utility is useful for administrators who need to audit or revoke active shares, as well as for teams that regularly distribute shareable map views or report links to external stakeholders.

## [Classification Set Utility](https://classification-set-utility.util.fulcrumapp.com/)

Simplifies the creation and maintenance of Fulcrum classification sets, which are hierarchical choice lists used in Classification fields. Upload new classification sets from structured files or edit existing ones with a more ergonomic interface than what is available in the Fulcrum web platform. This utility is especially helpful when managing large or deeply nested classification trees — such as equipment type taxonomies, land use categories, or regulatory code lists — where bulk editing and visual tree navigation save significant time.

## [Fulcrum Data Viewer](https://data-viewer.util.fulcrumapp.com/)

A public-facing split-view data viewer powered by Fulcrum shared filters. Provide a Fulcrum shared filter URL and Data Viewer renders the matching records in a side-by-side map and detail view — no Fulcrum login required. This makes it easy to share live field data snapshots with clients, community stakeholders, or colleagues who don't have a Fulcrum account, without granting them access to your organization.

## [Fulcrum Deploy](http://fulcrum-deploy.util.fulcrumapp.com/)

A web-based tool for managing Fulcrum app configurations between sandbox and production environments. Fulcrum Deploy lets you pull production apps into sandbox for testing or modification, promote validated sandbox apps to production, and review a detailed diff of changes across form elements, metadata, scripts, and status fields before committing. It also supports rollback — restoring a prior production state back into sandbox — and provides a Change History tab for browsing previous versions and deployments. Optionally, production records can be copied into sandbox alongside the app definition.

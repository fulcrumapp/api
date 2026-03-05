---
title: Utilities
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
Fulcrum is designed to work seamlessly with a broad ecosystem of tools and utilities. Whether you need to import data, automate workflows, visualize your data in a GIS environment, or interact with the API from the command line, the resources below can help you extend the power of Fulcrum.

# Data Management

## [Fulcrum Importer](https://github.com/fulcrumapp/fulcrum-importer)

A command-line tool for importing CSV data into Fulcrum. Useful for bulk-loading existing datasets from spreadsheets or external systems into your Fulcrum apps.

## [Fulcrum Desktop](https://github.com/fulcrumapp/fulcrum-desktop)

Fulcrum Desktop is a local sync client that downloads your Fulcrum data to a local SQLite or PostgreSQL database. It supports offline access and incremental sync, making it ideal for advanced reporting and integration workflows.

# Automation & Integration

## [Zapier Integration](https://zapier.com/apps/fulcrum/integrations)

Fulcrum's Zapier integration lets you connect Fulcrum to thousands of other apps without writing any code. Automate workflows such as sending notifications, creating rows in Google Sheets, or triggering actions in project management tools whenever new records are created or updated in Fulcrum.

## [Fulcrum Webhooks](https://docs.fulcrumapp.com/docs/webhooks)

Use webhooks to receive real-time HTTP POST notifications when events occur in Fulcrum (e.g., record created, updated, or deleted). This allows you to build custom integrations with your own infrastructure or third-party services.

# GIS & Mapping

## [QGIS Fulcrum Plugin](https://github.com/fulcrumapp/fulcrum-qgis)

An open-source QGIS plugin that lets you connect directly to your Fulcrum account, view your apps on a map, and synchronize data between Fulcrum and QGIS. Ideal for GIS professionals who want to work with Fulcrum data in their existing GIS workflows.

## [ArcGIS Integration](https://help.fulcrumapp.com/en/articles/4028782-arcgis-integration)

Fulcrum integrates with Esri's ArcGIS platform, allowing you to sync your Fulcrum records with ArcGIS feature services. This enables real-time data sharing between Fulcrum field crews and desktop ArcGIS users.

# API Libraries

## [Fulcrum JavaScript](https://github.com/fulcrumapp/fulcrum-js)

An official JavaScript/Node.js client library for the Fulcrum REST API. Simplifies authentication and common API operations for web and server-side JavaScript applications.

## [Fulcrum Python](https://github.com/fulcrumapp/fulcrum-python)

An official Python client library for the Fulcrum REST API. Useful for data science workflows, scripting, and building Python-based integrations.

## [Fulcrum Ruby](https://github.com/fulcrumapp/fulcrum-ruby)

An official Ruby gem for interacting with the Fulcrum REST API. Ideal for Ruby on Rails applications and Ruby-based automation scripts.

# Reporting

## [Report Builder](https://docs.fulcrumapp.com/docs/reports-introduction)

Fulcrum's built-in Report Builder lets you generate PDF reports from your collected data using customizable templates powered by Mustache and HTML. Reports can be generated on-demand from the mobile app or via the API.

## [Query API](https://docs.fulcrumapp.com/reference#query-intro)

The Fulcrum Query API provides a SQL interface for retrieving and analyzing your data. Use it to power custom dashboards, feed business intelligence tools, or run ad-hoc queries against your entire dataset.

# Developer Tools

## [Fulcrum CLI](https://github.com/fulcrumapp/fulcrum-cli)

A command-line interface for interacting with the Fulcrum platform. Supports common operations such as exporting data, managing apps, and scripting repetitive tasks directly from your terminal.

## [Fulcrum Sync](https://github.com/fulcrumapp/fulcrum-sync)

Fulcrum Sync is a utility for synchronizing Fulcrum data to external databases. It supports PostgreSQL and SQLite backends and can be run on a schedule to keep a local mirror of your Fulcrum data up to date.

---
title: Desktop Sync
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Fulcrum Desktop is an experimental command line tool for intelligently syncing your Fulcrum Organization data to an on-site database. The local database is a complete API representation with search indexes and query tables, making it ideal for integrating Fulcrum with data driven applications, such as Business Intelligence (BI) and Geographic Information Systems (GIS).

> ❗️
>
> This application is still very much under active development and has been designed to support extensibility and customization via plugins, so expect changes, improvements, and additional functionality in the coming weeks and months. While we encourage developers to test out this experimental tool and provide feedback, it is not a first-class Fulcrum product and official support should not be expected.

# How it works

You first run the `setup` command to authenticate to your Fulcrum account and setup the local Fulcrum SQLite database. Next you can run the `sync` command to sync with your Fulcrum organization. This will build all the necessary database tables, indexes, views, etc. and sync down all of your Fulcrum resources, including forms, records, choice lists, classification sets, projects, members, and roles.

The internal *fulcrum.db* SQLite database is not very user-friendly, so you will likely want to install one of the database plugins.

# Installation

Fulcrum Desktop has installers for Windows (32-bit and 64-bit), macOS and Linux, which are available from the [releases page on GitHub](https://github.com/fulcrumapp/fulcrum-desktop/releases).

## Linux (Ubuntu x64)

```sh
curl -o- -L https://raw.githubusercontent.com/fulcrumapp/fulcrum-desktop/master/install.sh | sudo bash
```

* Command installation location: `/opt/Fulcrum/scripts/fulcrum`
* Plugin installation directory: `/home/username/.fulcrum/plugins`
* Internal SQLite database: `/home/username/.config/Fulcrum/data/fulcrum.db`
* Daily log files: `/home/username/.config/Fulcrum/log`

## macOS

Open the .dmg, drag the icon to *Applications*. That's it! While running, the program will auto-update if there's a new release available.

* Command installation location: `/usr/local/bin/fulcrum -> /Applications/Fulcrum.app/Contents/scripts/fulcrum`
* Plugin installation directory: `/Users/username/.fulcrum/plugins`
* Internal SQLite database: `/Users/username/Library/Application Support/Fulcrum/data/fulcrum.db`
* Daily log files: `/Users/username/Library/Application Support/Fulcrum/log`

## Windows

Install from the Setup .exe and follow the instructions. This will create a shortcut icon on your desktop (and open up a GUI window - *which is not currently functional* - you can close this window). Double-clicking the shortcut icon will open the GUI again; doing this also triggers the auto-updater. If there is an updated release available, it will be downloaded and installed. Windows users on older operating systems may experience a TLS issue - [please see this](https://github.com/fulcrumapp/fulcrum-desktop/issues/16#issuecomment-398659575) for a workaround to enable more modern versions of the protocol.

* Command installation location: `\Users\username\AppData\Local\Programs\Fulcrum\scripts\fulcrum.cmd`
* Plugin installation directory: `\Users\username\\.fulcrum\plugins`
* Internal SQLite database: `\Users\username\AppData\Local\Fulcrum\data\fulcrum.db`
* Daily log files: `\Users\username\AppData\Local\Fulcrum\log`

# Getting started

After installing the core command line tools, you should authenticate with your Fulcrum account to setup your local database, sync your Organization's data down, install one of the [database plugins](/dev/desktop/plugins#database-plugins), and then setup auto-syncing. You can authenticate to Fulcrum via username/password or API token.

## Setup the local Fulcrum database

**Note:** `--org` is now required when running fulcrum setup so that the role can be verified.

| OS                     | Command                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| macOS / Linux (prompt) | `fulcrum setup --org 'Organization Name'`                                           |
| macOS / Linux          | `fulcrum setup --org 'Organization Name' --email 'EMAIL' --password 'SECRET'`       |
| Windows                | `.\fulcrum.cmd setup --org "Organization Name" --email "EMAIL" --password "SECRET"` |
| All                    | `fulcrum setup --org 'Organization Name' --token '<token>'`                         |

## Sync your Organization

| OS            | Command                                        |
| ------------- | ---------------------------------------------- |
| macOS / Linux | `fulcrum sync --org 'Organization Name'`       |
| Windows       | `.\fulcrum.cmd sync --org "Organization Name"` |

**Note:** if you have already installed the PostgreSQL plugin (below), you will also need to pass any parameters that your connection requires.

Example: `fulcrum sync --org 'Organization Name' --pg-user 'myuser' --pg-password 'mypassword' --pg-database 'mydatabase'`

## Install the PostgreSQL database plugin

By default, the PostgreSQL plugin expects a database named *fulcrumapp* with the [PostGIS extension](http://www.postgis.net/) installed.

| OS            | Command                                        |
| ------------- | ---------------------------------------------- |
| macOS / Linux | `fulcrum install-plugin --name postgres`       |
| Windows       | `.\fulcrum.cmd install-plugin --name postgres` |

## Setup continuous sync

Continually sync the database to pull down changes from Fulcrum.

| OS            | Command                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| macOS / Linux | `fulcrum sync --org 'Organization Name' --pg-user 'myuser' --pg-password 'mypassword' --forever`        |
| Windows       | `.\fulcrum.cmd sync --org "Organization Name" --pg-user "myuser" --pg-password "mypassword"  --forever` |

*Windows seems to prefer double quotes with command parameters.*

# Command Reference

## Usage

| OS            | Command                      |
| ------------- | ---------------------------- |
| macOS / Linux | `fulcrum <cmd> [args]`       |
| Windows       | `.\fulcrum.cmd <cmd> [args]` |

## Options

| Option      | Description         | Type       |
| ----------- | ------------------- | ---------- |
| `--version` | Show version number | \[boolean] |
| `--help`    | Show help           | \[boolean] |

## Commands

All command line arguments are also configurable via environment variables, prefixed with `FULCRUM_`. e.g. setting `--home-path` from an environment variable using `FULCRUM_HOME_PATH`. Explicit CLI arguments win. e.g. `fulcrum setup --home-path <path>` (to set the file system location for data, config, plugins, etc.); required for `setup`, `sync`, and `install-plugin` if not set as an environment variable.

## setup

Setup the local Fulcrum database. Requires that the API token belong to an account owner.

Note: `setup` by default is run interactively on Linux/macOS, via prompts for email/password. Windows requires passing email/password parameters.

| Option            | Description                                | Required | Default |
| ----------------- | ------------------------------------------ | -------- | ------- |
| `--org`           | organization name                          | true     | na      |
| `--email`         | email associated with your Fulcrum account | true     | true    |
| `--password`      | password for your Fulcrum account          | true     | true    |
| `--token <token>` | skip email/password and use an API token   | false    | false   |

| OS            | Command                                               |
| ------------- | ----------------------------------------------------- |
| macOS / Linux | `fulcrum setup`                                       |
| Windows       | `.\fulcrum.cmd setup --email EMAIL --password SECRET` |

## sync

Sync an organization to the local database. Defaults to a one-time sync, but can continually sync (15 second intervals) using the `--forever` option.

| Option                           | Description                                                                                                                             | Required | Default |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `--org`                          | organization name                                                                                                                       | true     | na      |
| `--forever`                      | keep the sync running forever, every 15 seconds (default). Specify interval by including `--interval 30`, e.g. for a 30 second interval | false    | false   |
| `--clean`                        | start a clean sync, all data will be deleted before starting                                                                            | false    | false   |
| `--after-sync-command <command>` | run an arbitrary command after each sync                                                                                                | false    | false   |
| `--no-progress`                  | disable progress logs, automatically disabled if stdout isn't a tty                                                                     | false    | false   |
| `--simple-output`                | replace emoji-based status indicators with text-based                                                                                   | false    | false   |
| `--no-colors`                    | disable console colors, automatically disabled for dumb terminals                                                                       | false    | false   |
| `--form <id>`                    | filter by form ID, use multiple `--form` params for multiple forms                                                                      | false    | false   |

| OS            | Command                                        |
| ------------- | ---------------------------------------------- |
| macOS / Linux | `fulcrum sync --org 'Organization Name'`       |
| Windows       | `.\fulcrum.cmd sync --org "Organization Name"` |

*Windows seems to prefer double quotes with command parameters.*

## reset

Reset an organization.

| OS            | Command                                         |
| ------------- | ----------------------------------------------- |
| macOS / Linux | `fulcrum reset --org 'Organization Name'`       |
| Windows       | `.\fulcrum.cmd reset --org "Organization Name"` |

## install-plugin

Install a plugin.

| Option   | Description           | Required | Default |
| -------- | --------------------- | -------- | ------- |
| `--name` | the plugin name       | false    | na      |
| `--url`  | the URL to a git repo | false    | false   |

| OS            | Command                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------- |
| macOS / Linux | `fulcrum install-plugin --url https://github.com/fulcrumapp/fulcrum-desktop-postgres`       |
| Windows       | `.\fulcrum.cmd install-plugin --url https://github.com/fulcrumapp/fulcrum-desktop-postgres` |

## create-plugin

Create a new plugin.

| Option   | Description         | Required | Default |
| -------- | ------------------- | -------- | ------- |
| `--name` | the new plugin name | true     | na      |

| OS            | Command                                         |
| ------------- | ----------------------------------------------- |
| macOS / Linux | `fulcrum create-plugin --name 'MyPlugin'`       |
| Windows       | `.\fulcrum.cmd create-plugin --name "MyPlugin"` |

## update-plugins

Update all plugins.

| OS            | Command                        |
| ------------- | ------------------------------ |
| macOS / Linux | `fulcrum update-plugins`       |
| Windows       | `.\fulcrum.cmd update-plugins` |

## build-plugins

Build all plugins.

| OS            | Command                       |
| ------------- | ----------------------------- |
| macOS / Linux | `fulcrum build-plugins`       |
| Windows       | `.\fulcrum.cmd build-plugins` |

## watch-plugins

Watch and recompile all plugins.

| Option   | Description          | Required | Default |
| -------- | -------------------- | -------- | ------- |
| `--name` | plugin name to watch | false    | na      |

| OS            | Command                       |
| ------------- | ----------------------------- |
| macOS / Linux | `fulcrum watch-plugins`       |
| Windows       | `.\fulcrum.cmd watch-plugins` |

## query

Run a query in the local database.

| Option  | Description | Required | Default |
| ------- | ----------- | -------- | ------- |
| `--sql` | sql query   | true     | na      |

| OS            | Command                                                        |
| ------------- | -------------------------------------------------------------- |
| macOS / Linux | `fulcrum query --sql 'SELECT COUNT(*) FROM memberships'`       |
| Windows       | `.\fulcrum.cmd query --sql "SELECT COUNT(*) FROM memberships"` |

# Plugins

Fulcrum Desktop was designed to be easily extended via a plugin architecture. The core function of Desktop is an intelligent synching mechanism, which can be extended to build out custom integrations with databases, web services, and more.

## Database Plugins

Fulcrum Desktop syncs with an internal SQLite database, similar to the database embedded within the mobile applications. This internal *fulcrum.db* database is not very user-friendly, so you will likely want to install one of the database plugins, which include more user-friendly app record views.

### PostgreSQL

[PostgreSQL](https://www.postgresql.org/) is a popular and powerful, open source object-relational database management system (ORDBMS) with an emphasis on extensibility and standards compliance. Combined with the [PostGIS](http://postgis.net/) spatial database extension, Postgres powers Fulcrum's back-end database.

Once this plugin is installed, the `sync` command will keep your PostgreSQL database in sync with your Fulcrum Organization. [Source code on GitHub](https://github.com/fulcrumapp/fulcrum-desktop-postgres).

#### Options

| Option                                               | Description                                                                                                                                                | Required | Default                          |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------- |
| `--version`                                          | Show version number                                                                                                                                        | false    | na                               |
| `--help`                                             | Show help                                                                                                                                                  | false    | na                               |
| `--org`                                              | organization name                                                                                                                                          | true     | na                               |
| `--pg-host`                                          | postgresql server host                                                                                                                                     | false    | `localhost`                      |
| `--pg-port`                                          | postgresql server port                                                                                                                                     | false    | `5432`                           |
| `--pg-user`                                          | postgresql user                                                                                                                                            | false    | na                               |
| `--pg-password`                                      | postgresql password                                                                                                                                        | false    | na                               |
| `--pg-database`                                      | postgresql database name                                                                                                                                   | false    | `fulcrumapp`                     |
| `--pg-schema`                                        | postgresql schema for the data                                                                                                                             | false    | `public`                         |
| `--pg-schema-views`                                  | postgresql schema for the friendly views                                                                                                                   | false    | `public`                         |
| `--pg-before-function`                               | postgresql function to call before the sync starts. It's invoked as `SELECT function_name();`                                                              | false    | na                               |
| `--pg-after-function`                                | postgresql function to call after the sync finishes. It's invoked as `SELECT function_name();`                                                             | false    | na                               |
| `--pg-underscore-names` / `--no-pg-underscore-names` | create the views with underscored names instead of the app name                                                                                            | false    | `true` (underscored names = yes) |
| `--pg-custom-module`                                 | the path to a custom JavaScript module to load, see [example](https://github.com/fulcrumapp/fulcrum-desktop-postgres/blob/master/example/custom-module.js) | false    | na                               |

#### Install the plugin

| OS            | Command                                        |
| ------------- | ---------------------------------------------- |
| macOS / Linux | `fulcrum install-plugin --name postgres`       |
| Windows       | `.\fulcrum.cmd install-plugin --name postgres` |

#### Setup the database

Be sure you have a database already created with the PostGIS extension installed. You can name your database "fulcrumapp" to use the default settings, and execute the following query to enable PostGIS: `CREATE EXTENSION postgis;`

#### Keep the database in sync with your Organization

| OS            | Command                                                                             |
| ------------- | ----------------------------------------------------------------------------------- |
| macOS / Linux | `fulcrum sync --org 'Organization Name' --pg-database 'mydatabase' --forever`       |
| Windows       | `.\fulcrum.cmd sync --org "Organization Name" --pg-database "mydatabase" --forever` |

***

### GeoPackage

[GeoPackage](http://www.geopackage.org/) is an open, standards-based, platform-independent, portable, self-describing, compact format for transferring geospatial information. Built on the SQLite platform, the GeoPackage standard defines the schema for a GeoPackage, including table definitions, integrity assertions, format limitations, and content constraints.

Once this plugin is installed, the `sync` command will keep your GeoPackage database in sync with your Fulcrum Organization. [Source code on GitHub](https://github.com/fulcrumapp/fulcrum-desktop-geopackage).

#### Options

| Option                                                   | Description                                                                                                                                                                                                                 | Required        | Default |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------- |
| `--version`                                              | Show version number                                                                                                                                                                                                         | false           | na      |
| `--help`                                                 | Show help                                                                                                                                                                                                                   | false           | na      |
| `--org`                                                  | organization name                                                                                                                                                                                                           | true            | na      |
| `--gpkg-name`                                            | the name of the .gpkg file (not a full file path, just the name)                                                                                                                                                            | (org name)      | na      |
| `--gpkg-path`                                            | the path to the directory to create the .gpkg file                                                                                                                                                                          | (depends on OS) | na      |
| `--gpkg-drop`                                            | drop and re-create the tables                                                                                                                                                                                               | true            | na      |
| `--gpkg-underscore-names` / `--no-gpkg-underscore-names` | create the views with underscored names instead of the app name                                                                                                                                                             | false           | na      |
| `--gpkg-user-info` / `--no-gpkg-user-info`               | add user info to the app views (updated\_by\_email and created\_by\_email), incurs a significant performance penalty for large accounts. This data can still be joined via SQL if it's omitted.                             | true            | na      |
| `--gpkg-joined-names` / `--no-gpkg-joined-names`         | add the project name and assigned to email to the app views (\_assigned\_to\_email and \_project\_name), incurs a significant performance penalty for large accounts. This data can stil be joined via SQL if it's omitted. | true            | na      |

#### Install the plugin

| OS            | Command                                          |
| ------------- | ------------------------------------------------ |
| macOS / Linux | `fulcrum install-plugin --name geopackage`       |
| Windows       | `.\fulcrum.cmd install-plugin --name geopackage` |

#### Setup the database

| OS            | Command                                              |
| ------------- | ---------------------------------------------------- |
| macOS / Linux | `fulcrum geopackage --org 'Organization Name'`       |
| Windows       | `.\fulcrum.cmd geopackage --org "Organization Name"` |

This will create the following GeoPackage file:

| OS            | Path                                                                               |
| ------------- | ---------------------------------------------------------------------------------- |
| macOS / Linux | `/Users/username/.fulcrum/geopackage/Organization Name.gpkg`                       |
| Windows       | `\Users\username\AppData\Local\Programs\Fulcrum\geopackage\Organization Name.gpkg` |

#### Keep the database in sync with your Organization

| OS            | Command                                                  |
| ------------- | -------------------------------------------------------- |
| macOS / Linux | `fulcrum sync --org 'Organization Name' --forever`       |
| Windows       | `.\fulcrum.cmd sync --org "Organization Name" --forever` |

***

### MS SQL Server

[MS SQL Server](https://www.microsoft.com/en-us/sql-server/) is a popular relational database management system (RDBMS) developed by Microsoft.

Once this plugin is installed, the `sync` command will keep your MS SQL Server database in sync with your Fulcrum Organization. [Source code on GitHub](https://github.com/fulcrumapp/fulcrum-desktop-mssql).

#### Options

| Option                                                     | Description                                                                                                                                                    | Required | Default                          |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------- |
| `--version`                                                | Show version number                                                                                                                                            | false    | na                               |
| `--help`                                                   | Show help                                                                                                                                                      | false    | na                               |
| `--org`                                                    | organization name                                                                                                                                              | true     | na                               |
| `--mssql-connection-string`                                | MSSQL connection string (overrides all other connection parameters). Example: `mssql://username:password@localhost/database`. If on Azure, add `?encrypt=true` | false    | na                               |
| `--mssql-database`                                         | MSSQL database name                                                                                                                                            | false    | `fulcrumapp`                     |
| `--mssql-host`                                             | MSSQL server host                                                                                                                                              | false    | `localhost`                      |
| `--mssql-port`                                             | MSSQL server port                                                                                                                                              | false    | `1433`                           |
| `--mssql-user`                                             | MSSQL user                                                                                                                                                     | false    | na                               |
| `--mssql-password`                                         | MSSQL password                                                                                                                                                 | false    | na                               |
| `--mssql-schema`                                           | MSSQL schema for the data                                                                                                                                      | false    | `dbo`                            |
| `--mssql-schema-views`                                     | MSSQL schema for the friendly views                                                                                                                            | false    | `dbo`                            |
| `--mssql-underscore-names` / `--no-mssql-underscore-names` | create the views with underscored names instead of the app name                                                                                                | false    | `true` (underscored names = yes) |
| `--mssql-before-function`                                  | Stored procedure to call before the sync starts. It's invoked as `EXECUTE function_name;`                                                                      | false    | na                               |
| `--mssql-after-function`                                   | Stored procedure to call after the sync finishes. It's invoked as `EXECUTE function_name;`                                                                     | false    | na                               |

#### Install the plugin

| OS            | Command                                     |
| ------------- | ------------------------------------------- |
| macOS / Linux | `fulcrum install-plugin --name mssql`       |
| Windows       | `.\fulcrum.cmd install-plugin --name mssql` |

#### Setup the database

Be sure you have a database already created. You can name your database "fulcrumapp" to use the default settings. The plugin does not automatically create the database.

#### Keep the database in sync with your Organization

| OS            | Command                                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| macOS / Linux | `fulcrum sync --org 'Organization Name' --forever --mssql-user USERNAME --mssql-password PASSWORD --mssql-host 'localhost'`           |
| Windows       | `.\fulcrum.cmd sync --org "Organization Name" --forever --mssql-user "USERNAME" --mssql-password "PASSWORD" --mssql-host "localhost"` |

#### Note

If you come across this error while installing a plugin on older Windows operating systems - it may mean that your system needs support for [Transport Layer Security (TLS) 1.1 and TLS 1.2](https://support.microsoft.com/en-us/help/3140245/update-to-enable-tls-1-1-and-tls-1-2-as-default-secure-protocols-in-wi). Consider reviewing (particularly the **Easy fix** section and download) that page for a possible update.

![1374](https://files.readme.io/f7c6871-fd-tls-error.png "fd-tls-error.png")

***

## Media Plugins

In addition to syncing database records, Fulcrum Desktop supports intelligently downloading media files.

### Fulcrum Desktop Media

Concurrent file downloads and automatic retries for Fulcrum media files (photos, videos, audio, signatures) and associated track files for spatial video & audio (gpx, kml, geojson, json, srt).

#### Options

| Option          | Description                             | Required | Default            |
| --------------- | --------------------------------------- | -------- | ------------------ |
| `--version`     | Show version number                     | false    | na                 |
| `--help`        | Show help                               | false    | na                 |
| `--org`         | organization name                       | true     | na                 |
| `--media-path`  | media storage directory                 | false    | `~/.fulcrum/media` |
| `--concurrency` | concurrent downloads (between 1 and 10) | false    | na                 |

#### Install the plugin

| OS            | Command                                     |
| ------------- | ------------------------------------------- |
| macOS / Linux | `fulcrum install-plugin --name media`       |
| Windows       | `.\fulcrum.cmd install-plugin --name media` |

#### Download all media files for your Organization

| OS            | Command                                                                             |
| ------------- | ----------------------------------------------------------------------------------- |
| macOS / Linux | `fulcrum media --org 'Organization Name' --media-path /path/to/media/storage`       |
| Windows       | `.\fulcrum.cmd media --org "Organization Name" --media-path \path\to\media\storage` |

***

### Fulcrum Desktop S3

Sync media to your own [Amazon Simple Storage Service (Amazon S3)](https://aws.amazon.com/s3) bucket.

#### Options

| Option      | Description         | Required | Default |
| ----------- | ------------------- | -------- | ------- |
| `--version` | Show version number | false    | na      |
| `--help`    | Show help           | false    | na      |
| `--org`     | organization name   | true     | na      |

#### Install the plugin

| OS            | Command                                  |
| ------------- | ---------------------------------------- |
| macOS / Linux | `fulcrum install-plugin --name s3`       |
| Windows       | `.\fulcrum.cmd install-plugin --name s3` |

#### Sync media to S3

| OS            | Command                                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| macOS / Linux | `fulcrum sync --org "Organization Name" --s3-access-key-id "key" --s3-secret-access-key "secret" --s3-bucket "mybucket" --s3-region "region"`       |
| Windows       | `.\fulcrum.cmd sync --org "Organization Name" --s3-access-key-id "key" --s3-secret-access-key "secret" --s3-bucket "mybucket" --s3-region "region"` |

***

## Other Plugins

Other experimental plugins.

### Fulcrum Desktop Reports

Generate custom PDF reports from Fulcrum data. To customize reports, edit `template.ejs` or use the `--template` option to reference a custom `.ejs` embedded JavaScript template file. [Source code on GitHub](https://github.com/fulcrumapp/fulcrum-desktop-reports).

#### Options

| Option                  | Description                                                            | Required | Default                                                        |
| ----------------------- | ---------------------------------------------------------------------- | -------- | -------------------------------------------------------------- |
| `--version`             | show version number                                                    | false    | na                                                             |
| `--help`                | show help                                                              | false    | na                                                             |
| `--org`                 | organization name                                                      | true     | na                                                             |
| `--form`                | form name                                                              | false    | na                                                             |
| `--skip`                | skip form name, can be specified multiple times to skip multiple forms | false    | na                                                             |
| `--template`            | path to ejs template file                                              | false    | `~/.fulcrum/plugins/fulcrum-desktop-reports/dist/template.ejs` |
| `--header`              | path to header ejs template file                                       | false    | na                                                             |
| `--footer`              | path to footer ejs template file                                       | false    | na                                                             |
| `--reports-path`        | report storage directory                                               | false    | `~/.fulcrum/reports`                                           |
| `--media-path`          | media storage directory                                                | false    | `~/.fulcrum/media`                                             |
| `--file-name`           | file name                                                              | false    | na                                                             |
| `--concurrency`         | concurrent reports (between 1 and 10)                                  | false    | 5                                                              |
| `--repeatables`         | generate a PDF for each repeatable child record                        | false    | false                                                          |
| `--recurse`             | recursively print all child items in each PDF                          | false    | true                                                           |
| `--reports-wkhtmltopdf` | specify the path to the wkhtmltopdf binary                             | false    | na                                                             |

#### Install the plugin

| OS            | Command                                       |
| ------------- | --------------------------------------------- |
| macOS / Linux | `fulcrum install-plugin --name reports`       |
| Windows       | `.\fulcrum.cmd install-plugin --name reports` |

*Note: Users will need to install wkhtmltopdf separately from Fulcrum Desktop[https://wkhtmltopdf.org/downloads.html](https://wkhtmltopdf.org/downloads.html) and potentially specify the location of the binary. For example:* `.\fulcrum.cmd reports --org "Organization Name" --form "Form Name" --reports-wkhtmltopdf "C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe"`

#### Run reports

| OS            | Command                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------- |
| macOS / Linux | `fulcrum reports --org 'Organization Name' --form 'GeoBooze' --template custom.ejs`       |
| Windows       | `.\fulcrum.cmd reports --org "Organization Name" --form "GeoBooze" --template custom.ejs` |

#### Keep reports in sync

| OS            | Command                                        |
| ------------- | ---------------------------------------------- |
| macOS / Linux | `fulcrum sync --org 'Organization Name'`       |
| Windows       | `.\fulcrum.cmd sync --org "Organization Name"` |

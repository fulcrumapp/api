---
title: Fetch data from a Socrata service
excerpt: >-
  [Socrata](https://www.socrata.com/) is a popular cloud-based platform for
  enabling government organizations to make their data available online. Sites
  like [NYC OpenData](https://nycopendata.socrata.com/dashboard) and
  [medicare.gov](https://data.medicare.gov/data) leverage Socrata to provide
  access to tremendously valuable public datasets. While Socrata makes it easy
  to visualize and export these datasets, it also provides a powerful API for
  programmatically accessing this data. The [Socrata Open Data API
  (SODA)](https://dev.socrata.com/) has an SQL-like query language called the
  ["Socrata Query Language"](https://dev.socrata.com/docs/queries/) or “SoQL”.
  Datasets with location information can be spatially queried so you can
  retrieve information on the features near you.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
The example below demonstrates how to query for the 5 closest Nursing Homes from the [Nursing Home Provider Info table](https://data.medicare.gov/Nursing-Home-Compare/Provider-Info/4pq5-n9py) on the [data.medicare.gov](https://data.medicare.gov) site, which is powered by Socrata. **NOTE:** The [LATITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-latitude) and [LONGITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-longitude) functions will only return values if a record's geometry type is set to `Point`, and there is a [location](https://help.fulcrumapp.com/en/articles/2440341-what-are-the-various-location-data-values-in-the-record-metadata) set. Unless you have [enabled Lines and Polygons](https://help.fulcrumapp.com/en/articles/8404186-how-to-enable-lines-and-polygons-on-an-app) for your app, the `Point` type will be the only available geometry type for records in the app.

```js
var nearbyNursingHomes; // global variable to hold data returned by query

// listen for geometry changes
ON('change-geometry', function(event) {

  // build the url passing our location to the special SoQL `distance_in_meters` spatial function, including a "distance" column in miles
var options = {
    url: 'https://data.medicare.gov/resource/b27b-2uc7.json',
    qs: {
      '$order': "distance_in_meters(location, 'POINT (" + LONGITUDE() + " " + LATITUDE() + ")')",
      '$limit': 5,
      '$select': "*, distance_in_meters(location, 'POINT (" + LONGITUDE() + " " + LATITUDE() + ")') * 0.000621371 AS distance"
    }
  };

  // give the user a loading indicator while it's fetching the data from Socrata
  PROGRESS('Searching for nearby Nursing Homes...');

  // make the http request
  REQUEST(options, function(error, response, body) {
    PROGRESS(); // dismiss the loading indicator
    if (error) {
      ALERT('Error with request: ' + INSPECT(error));
    } else {
      var data = JSON.parse(body); // parse the JSON response
      var choices = []; // array holder for choices
      nearbyNursingHomes = data; // set the global variable with the data returned from the query
      // if data is returned, loop through the records and push them into the choice array
      if (data && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          choices.push({
            label: data[i].provider_name + ' (' + Number(data[i].distance).toFixed(1) + ' miles)',
            value: data[i].federal_provider_number // set the choice value to a unique value
          });
        }
        SETCHOICES('nearby_nursing_homes', choices);
      } else {
        ALERT('No data found.');
      }
    }
  });
});

// listen for the choice list change
ON('change', 'nearby_nursing_homes', function(event) {
  // loop through the list of nearby Nursing Homes
  for (var i = 0; i < nearbyNursingHomes.length; i++) {
    var nh = nearbyNursingHomes[i];
    // if the unique id matches our choice value, fill in the form values
    if (event.value && nh.federal_provider_number == event.value.choice_values[0]) {
      SETVALUE('nursing_home_name', nh.provider_name);
      SETVALUE('federal_provider_number', nh.federal_provider_number);
      SETVALUE('ownership_type', nh.ownership_type);
      SETVALUE('number_of_certified_beds', nh.number_of_certified_beds);
      SETVALUE('number_of_residents_in_certified_beds', nh.number_of_residents_in_certified_beds);
      SETVALUE('overall_rating', nh.overall_rating);
      SETVALUE('health_inspection_rating', nh.health_inspection_rating);
      SETVALUE('qm_rating', nh.qm_rating);
      SETVALUE('staffing_rating', nh.staffing_rating);
      SETVALUE('rn_staffing_rating', nh.rn_staffing_rating);
      SETVALUE('reported_cna_staffing_hours_per_resident_per_day', nh.reported_cna_staffing_hours_per_resident_per_day);
      SETVALUE('expected_cna_staffing_hours_per_resident_per_day', nh.expected_cna_staffing_hours_per_resident_per_day);
      SETVALUE('number_of_facility_reported_incidents', nh.number_of_facility_reported_incidents);
    }
  }
});
```